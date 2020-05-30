
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Icon, Timeline, Carousel, Row, Col, List, Card } from 'antd';
import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies'
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class AddComponent extends React.Component {

    rootSubmenuKeys = ['collect', 'bit'];

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            data: {},
            offsetWidth: "200px",
            openKeys: [''],
            menuData: {
                home: '/home',
                excerpt: '/collect/excerpt',
                original: '/collect/original',
                notes: '/collect/notes',
                video: '/bit/video',
                album: '/bit/album',
                about: '/about'
            },

            userInfoData: {},
            timelineInfoData: [],
            contentsInfoData: {},
            summaryInfoData: [],
            title: '',

            workData: {},
            result: '123',
            postRes: {},
            autograph: ''
        };
    }

    componentDidMount() {
        let collapsedStatus = cookie.load("collapsedStatus");
        if (typeof (collapsedStatus) !== 'undefined') {
            let flag = true;
            let offset = "80px";
            if (collapsedStatus === 'false') {
                flag = false;
                offset = "200px"
            }
            this.setState({
                collapsed: flag,
                offsetWidth: offset,
            })
        }
        this.props.dispatch({
            type: 'testModel/aTest',
            payload: {
                uid: '1'
            }
        }).then(() => {
            this.setState({
                result: this.props.result
            }, () => {
                console.log(this.state.result);
                this.setState({
                    autograph: this.state.result.data.autograph
                })
            })
        });

    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed }, () => {
            cookie.save("collapsedStatus", this.state.collapsed, { path: "/" });
            if (this.state.collapsed) {
                this.setState({ offsetWidth: '80px' })
            } else {
                this.setState({ offsetWidth: '200px' })
            }
        });
    };

    onMenuClick = (event) => {
        const { key } = event;
        let pathName = this.state.menuData[key]
        this.props.history.push(pathName)
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {

        return (
            <Layout theme='light'>
                <Sider
                    trigger={<div style={{ backgroundColor: '#fff', color: '#a9e0f3' }}>{this.state.collapsed && <Icon type="left" />}{!this.state.collapsed && <Icon type="right" />}</div>}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    style={{
                        theme: 'light',
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        background: '#fff'
                    }}
                >
                    <div className={styles.logo}>生活杂货铺</div>
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['home']}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        mode="inline"
                        onClick={this.onMenuClick}
                    >
                        <Menu.Item key="home">
                            <Icon type="home" />
                            <span>主页</span>
                        </Menu.Item>
                        <SubMenu
                            key="collect"
                            title={
                                <span>
                                    <Icon type="read" />
                                    <span>收集盒</span>
                                </span>
                            }
                        >
                            <Menu.Item key="excerpt">摘录</Menu.Item>
                            <Menu.Item key="original">原创</Menu.Item>
                            <Menu.Item key="notes">随记</Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="bit"
                            title={
                                <span>
                                    <Icon type="video-camera" />
                                    <span>点滴</span>
                                </span>
                            }
                        >
                            <Menu.Item key="album">相册</Menu.Item>
                            <Menu.Item key="video">视频</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="about">
                            <Icon type="coffee" />
                            <span>关于</span>
                        </Menu.Item>
                    </Menu>

                </Sider>
                <Layout style={{ marginLeft: this.state.offsetWidth }}>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff' }}>
                        <Row
                            gutter={8}
                            style={{ marginLeft: (1050 - (this.state.collapsed ? 80 : 200)) + 'px' }}
                            type="flex"
                        >
                            <Col><Link to='/create'>去创作</Link></Col>
                            <Col><span>消息</span></Col>
                            <Col><span>历史</span></Col>
                            <Col><span>我的</span></Col>
                        </Row>
                    </Header>

                    <Content
                        style={{
                            background: '#fff',
                            minHeight: 530,
                            marginTop: 64,
                        }}
                    >
                       去创作
                       <br></br>
                       {this.state.autograph}
                       <br></br>
                       {/* {this.state.postRes.message} */}
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ homeModel, testModel }) => ({

    userInfoData: homeModel.userInfoData,
    timelineInfoData: homeModel.timelineInfoData,
    contentsInfoData: homeModel.contentsInfoData,
    summaryInfoData: homeModel.summaryInfoData,

    result: testModel.result,
    // postRes: testModel.postRes,

}))(AddComponent);