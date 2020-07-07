import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import OSS from 'ali-oss';
import { Form, Input, Button, Row, Col, Select, Upload, Icon } from 'antd'
import styles from './index.css';
import { connect } from 'dva';
import PicUploader from './PicUploader';
import cookie from 'react-cookies'

import { typeData, subtypeData, tagsData } from './myconf';

const { Option } = Select;


class MyEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            type: '',
            subtype: [],
            tags: [],
            content: '',
            image: 'http://image-bucket-6.oss-cn-beijing.aliyuncs.com/images/my_jyzhp_default.jpeg',
            uid: parseInt(cookie.load('uid')),
            publishResult: '',
            btnType: '发布',
            description: '',
            publishtype: 'create',
            workid: ''
        }
    }

    componentDidMount() {
        if (this.props.location && Object.keys(this.props.location.query).indexOf('workid') !== -1) {
            this.props.dispatch({
                type: 'workModel/getWorkDetail',
                payload: {
                    workid: this.props.location.query.workid,
                }
            }).then(() => {
                let work = this.props.workDetailData[0];
                this.setState({
                    workid: this.props.location.query.workid,
                    publishtype: 'edit',
                    title: work.title,
                    type: work.type,
                    subtype: work.subtype.split('#'),
                    tags: work.tags.split('#'),
                    content: work.content,
                    image: work.image,
                    description: work.description,
                }, () => {
                    setTimeout(() => {
                        this.props.form.setFieldsValue({
                            content: BraftEditor.createEditorState(this.state.content)
                        })
                    }, 1000)
                })
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({
                    title: values.title,
                    type: values.type,
                    subtype: values.subtype.join('#'),
                    tags: values.tags.join('#'),
                    image: this.state.image,
                    content: values.content.toHTML() // values.content.toHTML() or values.content.toRAW()
                }, () => {
                    if (this.state.publishtype === 'create') {
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
                                description: this.state.description,
                            }
                        }).then(() => {
                            this.setState({
                                publishResult: this.props.publishResult,
                            }, () => {
                                if (this.state.publishResult) {
                                    setTimeout(() => {
                                        let w = window.open('about:blank');
                                        w.location.href = `/mine?uid=${this.state.uid}`;
                                    }, 1000)
                                }
                            })
                        })
                    } else {
                        //编辑的方法
                        this.props.dispatch({
                            type: 'workModel/editWork',
                            payload: {
                                title: this.state.title,
                                type: this.state.type,
                                subtype: this.state.subtype,
                                tags: this.state.tags,
                                content: this.state.content,
                                image: this.state.image,
                                uid: this.state.uid,
                                description: this.state.description,
                                workid: this.state.workid
                            }
                        }).then(() => {
                            this.setState({
                                publishResult: this.props.publishResult,
                            }, () => {
                                if (this.state.publishResult) {
                                    setTimeout(() => {
                                        let w = window.open('about:blank');
                                        w.location.href = `/mine?uid=${this.state.uid}`;
                                    }, 1000)
                                }
                            })
                        })
                    }
                })
            }
        })
    }

    onChange = () => {
        console.log('onChange');
    }

    onFocus = () => {
        console.log('onFocus');
    }


    onBlur = () => {
        console.log('onBlur');
    }

    onSearch = () => {
        console.log('onSearch');
    }

    subtypeHandleChange = (value) => {
        console.log(`二级分类更新后 ${value}`);
    }

    tagsHandleChange = (value) => {
        console.log(`标签信息更新后 ${value}`);
    }

    imageHandleChange = (e) => {
        this.setState({ image: e }, () => {
            console.log(this.state.image)
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;


        const controls = [
            'undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
            'link', 'separator', 'hr', 'separator',
            // 'media',
            'separator',
            'clear'
        ];

        const beforeUpload = file => {
            console.log('-----------');
            const floder = 'images';
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                UploadToOss(this, floder, file)
                    .then(data => {
                        return data;
                    })
                    .then(data => {
                        console.log('--88889999----', data.res.requestUrls[0]);
                        this.props.form.setFieldsValue({
                            content: ContentUtils.insertMedias(this.props.form.getFieldValue('content'), [{
                                type: 'IMAGE',
                                url: data.res.requestUrls[0], // imgUrl 为上传成功后 后台返回的url地址
                            }])
                        })
                    });
            };
            return false;
        }

        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <Button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </Button>
                    </Upload>
                )
            }
        ];

        const client = self => {
            return new OSS({
                region: 'oss-cn-beijing',
                accessKeyId: 'LTAI4G9Z5w4dSo4LTWJTnsNX',
                accessKeySecret: 'jowuUUURmisYjdn3ZFKelQZtpCatXj',
                bucket: 'image-bucket-6',
            });
        };

        const uploadPath = (path, file) => {
            return `${path}/${file.name.split('.')[0]}-${file.uid}.${file.type.split('/')[1]}`;
        };

        const UploadToOss = (self, path, file) => {
            const url = uploadPath(path, file);
            const headers = {
                "Content-Type": "image/jpg"
            };
            return new Promise((resolve, reject) => {
                client(self)
                    .multipartUpload(url, file, { headers })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

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

        const uploadItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
        };

        return (
            <div className={styles.container}>
                <Form
                    onSubmit={this.handleSubmit}
                    labelAlign="left"
                    initialvalues={{ 'title': this.state.title }}
                >
                    <Form.Item
                        label="标题" {...itemLayout}
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                            initialValue: this.state.title
                        })(
                            <Input size="large" placeholder="请填写文章标题" style={{ border: '1px solid lightblue' }} />
                        )}
                    </Form.Item>
                    <Row gutter={24} style={{ width: '100%' }} type="flex">
                        <Col span={8} offset={-5}>
                            <Form.Item label="类别" {...oItemLayout}>
                                {getFieldDecorator('type', {
                                    rules: [{
                                        required: true,
                                        message: '请输入类别',
                                    }],
                                    initialValue: this.state.type
                                })(
                                    <Select
                                        showSearch
                                        placeholder="请选择类别"
                                        optionFilterProp="children"
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        onSearch={this.onSearch}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {typeData.length > 0 && typeData.map((item) => (<Option value={item.key} key={item.key}>{item.value}</Option>))}
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
                                    initialValue: this.state.subtype
                                })(
                                    <Select mode="tags" placeholder="请选择二级类别" onChange={this.subtypeHandleChange}>
                                        {subtypeData.length > 0 && subtypeData.map((item) => (<Option value={item.key} key={item.key}>{item.value}</Option>))}
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
                                    initialValue: this.state.tags
                                })(
                                    <Select mode="tags" placeholder="请输入标签" onChange={this.tagsHandleChange}>
                                        {tagsData.length > 0 && tagsData.map((item) => (<Option value={item.key} key={item.key}>{item.value}</Option>))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ width: '100%' }} type="flex">
                        <Col span={8} offset={-5}>
                            <Form.Item label="封面" {...uploadItemLayout} >
                                {getFieldDecorator('image', {
                                    rules: [{
                                        required: false,
                                        message: '请选择封面图',
                                    }],
                                    initialValue: this.state.image
                                })(
                                    <PicUploader fileName={this.state.image} imageHandleChange={this.imageHandleChange.bind(this)}></PicUploader>
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
                                        this.setState({ description: value.toText().replace(/[\r\n]/g, "") }, () => { callback() })
                                    }
                                }
                            }],
                            initialValue: BraftEditor.createEditorState(this.state.content) || ''
                        })(
                            <BraftEditor
                                className={styles.my_editor}
                                controls={controls}
                                extendControls={extendControls}
                                placeholder="请输入正文内容"
                                contentStyle={{ height: 400 }}
                            />
                        )}
                    </Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className={styles.sub_btn}>{this.state.btnType}</Button>
                </Form>
            </div>
        )

    }

}

export default connect(({ workModel }) => ({
    publishResult: workModel.publishResult,
}))(Form.create()(MyEditComponent))
