
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Badge, Input, Tabs, List, Avatar } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import MyEditComponent from './MyEditComponent';

const { Header, Content, Footer, Sider } = Layout;
const {TextArea} = Input;

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
            uid: '1',
            publishResult: '',
        };
    }

    init() {
        this.props.dispatch({
            type: 'homeModel/publishWork',
            payload: {
                // title=wxq&type=wxq&subtype=wxq&tags=wxq&content=wxq;wxq;wxq&image=1.jpeg&uid=1
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
            })
        })
    }

    componentDidMount() {
        this.init();
    }

    render() {

        return (
            <Layout theme='light'>
                <Layout style={{ width: '100%', backgroundColor: 'white'}}>
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

                    <Content style={{ width: '100%', marginTop: 5}}>
                        <MyEditComponent></MyEditComponent>
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ homeModel }) => ({
    workData: homeModel.workData,
    publishResult: homeModel.publishResult,
}))(AddComponent);