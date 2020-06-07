
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies';

const { Header, Content, Footer } = Layout;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginResult: false,
            username: '',
            password: '',
        };
    }

    init() {
    }

    componentDidMount() {
        this.init()
    }

    handleLoginSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'userModel/login',
                    payload: {
                        username: values.username,
                        password: values.password,
                    }
                }).then(() => {
                    this.setState({loginResult: this.props.loginResult},()=>{
                        if (this.state.loginResult.success) {
                            let uid = this.state.loginResult.data[0].uid;
                            if(values.remember){
                                cookie.save("isLogin", true);
                                cookie.save('username', values.username);
                                cookie.save("password", values.password);
                                cookie.save("uid", uid);
                            }
                            this.props.history.push(`/mine?uid=${uid}`);
                        }
                    }) 
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout theme='light'>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                            justify='start'
                        >
                            <Col span={3} offset={3}><span className={styles.span} onClick={() => { this.props.history.push('/home') }}>首页</span></Col>
                            {/* <Col span={3}><span className={styles.span}>注册</span></Col> */}
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        {/* <div className={styles.banner}></div> */}
                        {/* <div className={styles.title}>注册</div> */}
                        <Row gutter={24}
                            type="flex"
                        >
                            <Col span={8} offset={2} className={styles.left}>
                                {/* 左边 */}

                            </Col>
                            <Col span={12} offset={2} className={styles.right}>
                                <div className={styles.title}>登录</div>
                                <Form onSubmit={this.handleLoginSubmit} className={styles.login_form}>
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: '请输入用户名!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="请输入用户名"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入密码!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="请输入密码"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(<Checkbox>记住密码</Checkbox>)}
                                        {/* <a className={styles.login_form_forgot} href="">
                                            忘记密码
                                        </a> */}
                                        <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                                            登录
                                        </Button>
                                        <a href="/register">去注册</a>
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

const LoginComponent = Form.create({ name: 'login' })(Login);

export default connect(({ userModel }) => ({
    loginResult: userModel.loginResult,
}))(LoginComponent);