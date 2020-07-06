import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Badge, Input, Tabs, List, Avatar } from 'antd';

import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import cookie from 'react-cookies';
import MyEditComponent from './MyEditComponent';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

class AddComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // userInfoData: {},
            title: 'moon',
            type: 'excerpt',
            subtype: 'life',
            tags: 'moon',
            content: 'moon today',
            image: '1.jpeg',
            uid: 0,
            publishResult: '',
        };
    }

    init() {
        this.setState({
            uid: parseInt(cookie.load('uid')) || 0,
        })
    }

    componentDidMount() {
        this.init();
    }

    render() {

        return (
            <Layout theme='light'>
                <Layout style={{ width: '100%', backgroundColor: 'white' }}>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col span={2}><Link to={`/home`} className={styles.link}>首页</Link></Col>
                            <Col span={2} offset={1}><Link to={`/mine?uid=${this.state.uid}`} className={styles.link}>我的</Link></Col>
                        </Row>
                    </Header>

                    <Content style={{ width: '100%', marginTop: 30 }}>
                        <MyEditComponent></MyEditComponent>
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginTop:30, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ homeModel }) => ({
    workData: homeModel.workData,
}))(AddComponent);