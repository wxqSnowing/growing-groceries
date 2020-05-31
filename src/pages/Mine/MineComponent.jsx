
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Badge, Input, Tabs, List, Avatar } from 'antd';

import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

class MineComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
        };
    }

    init() {

    }

    componentDidMount() {
        this.init();
    }

    render() {

        return (
            <Layout theme='light'>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col span={4} offset={3}><Link to={`/home`} className={styles.link}>首页</Link></Col>
                            <Col offset={11}><span>头像</span></Col>
                            <Col ><span>加入我们的第3天</span></Col>
                            <Col ><span><Badge count={5} style={{ marginTop: -8 }}>消息</Badge></span></Col>
                            <Col><Link to={`/mine`} className={styles.link}>我的</Link></Col>
                        </Row>
                    </Header>

                    <Content className={styles.content}>

                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ homeModel }) => ({
    searchResult: homeModel.searchResult,
    siderInfoResult: homeModel.siderInfoResult,
    workData: homeModel.workData,
}))(MineComponent);