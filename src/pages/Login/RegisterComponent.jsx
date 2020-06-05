
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Row, Col, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';

const { Header, Content, Footer } = Layout;

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            data: [],
            delWorkResult: '',
        };
    }

    init() {
    }

    componentDidMount() {
        this.init()
    }


    render() {
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
                        <div className={styles.title}>注册</div>
                        <Row gutter={24}
                            type="flex"
                        >
                            <Col span={12} className={styles.left}>
                                左边
                            </Col>
                            <Col span={12} className={styles.right}>
                                右边
                            </Col>
                        </Row>
                    </Content>

                    <Footer className={styles.footer}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ mineModel, userModel, workModel }) => ({
    timelineInfoData: mineModel.timelineInfoData,
    mineWorkData: mineModel.mineWorkData,
    userInfoData: userModel.userInfoData,
    delWorkResult: workModel.delWorkResult,

}))(RegisterComponent);