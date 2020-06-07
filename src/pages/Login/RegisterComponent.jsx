
import 'antd/dist/antd.css';
import styles from './index.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout } from 'antd';
import React from 'react';
import { connect } from 'dva';

const { Header, Content, Footer } = Layout;

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerResult: '',
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    init() {
    }

    componentDidMount() {
        this.init()
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('输入的信息: ', values);
                this.props.dispatch({
                    type: 'userModel/register',
                    payload: {
                        username: values.username,
                        pwd: values.pwd,
                        email: values.email,
                        mobile: values.mobile
                    }
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('pwd')) {
            callback('请两次密码输入一致');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Layout theme='light' className={styles.bg}>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                            justify='start'
                        >
                            <Col span={3} offset={3}><span className={styles.span} onClick={() => { this.props.history.push('/home') }}>首页</span></Col>
                            <Col span={3}><span className={styles.span} onClick={() => { this.props.history.push('/login') }}>登录</span></Col>
                        </Row>
                    </Header>

                   
                    <Content className={styles.content}>
                        <Row gutter={24}
                            type="flex"
                            style={{marginTop: 50}}
                        >
                            <Col span={12} offset={5}>
                                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                    <Form.Item
                                        label={
                                            <span>
                                                昵称
                                            </span>
                                        }
                                    >
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="密码" >
                                        {getFieldDecorator('pwd', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入密码',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password />)}
                                    </Form.Item>
                                    <Form.Item label="确认密码">
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '确认密码',
                                                },
                                                {
                                                    validator: this.compareToFirstPassword,
                                                },
                                            ],
                                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                    </Form.Item>

                                    <Form.Item label="邮箱">
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    type: 'email',
                                                    message: '请输入正确的邮箱',
                                                },
                                                {
                                                    required: false,
                                                    message: '请输入邮箱',
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>

                                    <Form.Item label="手机号码">
                                        {getFieldDecorator('mobile', {
                                            rules: [{ required: false, message: '请输入手机号码' }],
                                        })(<Input style={{ width: '100%' }} />)}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button className={styles.login_form} htmlType="submit">
                                            注册
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </Col>
                        </Row>
                    </Content>

                    <Footer className={styles.footer}>Snow Blog ©2020 Created by Shirly</Footer>
    


                </Layout>
            </Layout>
        );
    }
}

const RegisterComponent = Form.create({ name: 'register' })(Register);

export default connect(({ userModel }) => ({
    registerResult: userModel.registerResult,
}))(RegisterComponent);