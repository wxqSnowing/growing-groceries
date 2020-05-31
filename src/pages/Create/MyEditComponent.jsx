import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Row, Col, Select, Upload, message, Icon} from 'antd'
import styles from './index.css';
import { connect } from 'dva';
import PicturesWall from './PicturesWall';

const { Option } = Select;

const typeData = [
    {
        key: 'excerpt',
        value: '摘录',
    },
    {
        key: 'original',
        value: '原创',
    },
    {
        key: 'notes',
        value: '随记',
    },
    {
        key: 'album',
        value: '相册',
    },
    {
        key: 'video',
        value: '视频',
    },
    {
        key: 'music',
        value: '音乐',
    },
    {
        key: 'draw',
        value: '绘画',
    },
    {
        key: 'program',
        value: '编程',
    },
    {
        key: 'game',
        value: '游戏',
    },
];

const subtypeData = [
    {
        key: 'life',
        value: '生活',
    },
    {
        key: 'famous',
        value: '名家',
    },
    {
        key: 'c',
        value: 'C语言',
    },
    {
        key: 'c_plus',
        value: 'C++',
    },
    {
        key: 'Arena_Of_Valor',
        value: '王者荣耀',
    },
];

const tagsData = [
    {
        key: '2D',
        value: '二次元',
    },
];

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

    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({
                    title: values.title,
                    type: values.type,
                    subtype: values.subtype.join('#'),
                    tags: values.tags.join('#'),
                    image: values.image?"1.jpeg":"2.jpeg",
                    content: values.content.toHTML() // values.content.toHTML() or values.content.toRAW()
                }, ()=>{
                    this.props.dispatch({
                        type: 'workModel/publishWork',
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
                                    let w=window.open('about:blank');
                                    w.location.href='/mine';
                                    // window.open("/mine", "_self");
                                }, 1000)
                            }
                        })
                    })
                })
            }
        })
    }

    onChange = ()=>{
        console.log('onChange');
    }

    onFocus = ()=>{
        console.log('onFocus');
    }
    

    onBlur = ()=>{
        console.log('onBlur');
    }

    onSearch = ()=>{
        console.log('onSearch');
    }

    subtypeHandleChange = (value)=>{
        console.log(`二级分类更新后 ${value}`);
    }

    tagsHandleChange = (value)=>{
        console.log(`标签信息更新后 ${value}`);
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
                                <Select 
                                    showSearch
                                    placeholder="请选择类别"
                                    // style={{ width: '70%' }}
                                    optionFilterProp="children"
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {typeData.length>0 && typeData.map((item)=>(<Option value={item.key} key={item.key}>{item.value}</Option>))}
                                </Select>
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
                                <Select mode="tags" placeholder="请选择二级类别" onChange={this.subtypeHandleChange}>
                                    {subtypeData.length>0 && subtypeData.map((item)=>(<Option value={item.key} key={item.key}>{item.value}</Option>))}
                                </Select>
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
                                <Select mode="tags" placeholder="请选择二级类别" onChange={this.tagsHandleChange}>
                                    {tagsData.length>0 && tagsData.map((item)=>(<Option value={item.key} key={item.key}>{item.value}</Option>))}
                                </Select>
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
                               <PicturesWall></PicturesWall>
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

export default connect(({ workModel }) => ({
    publishResult: workModel.publishResult,
})) (Form.create()(MyEditComponent))