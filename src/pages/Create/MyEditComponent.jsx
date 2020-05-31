import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Row, Col} from 'antd'
import styles from './index.css';
import { connect } from 'dva';

class MyEditComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            title: 'moon',
            type: 'excerpt',
            subtype: 'life',
            tags: 'moon',
            content: 'moon today',
            image: '1.jpeg',
            uid: '1',
            publishResult: '',
        }
    }

    componentDidMount() {
        // 异步设置编辑器内容
        // setTimeout(() => {
        //     this.props.form.setFieldsValue({
        //         content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
        //     })
        // }, 1000)

    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({
                    title: values.title,
                    type: values.type,
                    subtype: values.subtype,
                    tags: values.tags,
                    image: values.image,
                    content: values.content.toHTML() // values.content.toHTML() or values.content.toRAW()
                }, ()=>{
                    this.props.dispatch({
                        type: 'homeModel/publishWork',
                        payload: {
                            title: this.state.title,
                            type: this.state.type,
                            subtype: this.state.subtype,
                            tags: this.state.tags,
                            content: this.state.content,
                            image: this.state.image,
                            uid: this.state.uid,
                        }
                    }).then(() => {
                        this.setState({
                            publishResult: this.props.publishResult,
                        },()=>{
                            if(this.state.publishResult){
                                setTimeout(()=>{
                                    // let w=window.open('about:blank');
                                    // w.location.href='/mine';
                                    window.open("/mine", "_self");
                                }, 1000)
                            }
                        })
                    })
                })
            }
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']
        const itemLayout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 22 },
        };
        const oItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };

        const wItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };

        return (
            <div className={styles.container}>
                <Form onSubmit={this.handleSubmit} labelAlign="left">
                    <Form.Item label="标题" {...itemLayout}>
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input size="large" placeholder="请输入标题" />
                        )}
                    </Form.Item>
                    <Row gutter={24} style={{width:'100%'}} type="flex">
                        <Col span={8} offset={-5}>
                            <Form.Item label="类别" {...oItemLayout}>
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true,
                                    message: '请输入类别',
                                }],
                            })(
                                <Input size="large" placeholder="请输入类别" />
                            )}
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="二级类别" {...wItemLayout}>
                            {getFieldDecorator('subtype', {
                                rules: [{
                                    required: true,
                                    message: '请输入二级类别',
                                }],
                            })(
                                <Input size="large" placeholder="请输入二级类别" />
                            )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item label="标签" {...oItemLayout}>
                        {getFieldDecorator('tags', {
                            rules: [{
                                required: true,
                                message: '请输入标签',
                            }],
                        })(
                            <Input size="large" placeholder="请输入标签" />
                        )}
                    </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{width:'100%'}} type="flex">
                        <Col span={8} offset={-5}>
                            <Form.Item label="封面" {...oItemLayout}>
                            {getFieldDecorator('image', {
                                rules: [{
                                    required: true,
                                    message: '请选择封面图',
                                }],
                            })(
                                <Input size="large" placeholder="请选择封面图" />
                            )}
                        </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="正文" {...itemLayout}>
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('请输入正文内容')
                                    } else {
                                        callback()
                                    }
                                }
                            }],
                        })(
                            <BraftEditor
                                className={styles.my_editor}
                                controls={controls}
                                placeholder="请输入正文内容"
                                contentStyle={{ height: 400 }}
                            />
                        )}
                    </Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className={styles.sub_btn}>发布</Button>
                </Form>
            </div>
        )

    }

}

export default connect(({ homeModel }) => ({
    workData: homeModel.workData,
    publishResult: homeModel.publishResult,
})) (Form.create()(MyEditComponent))