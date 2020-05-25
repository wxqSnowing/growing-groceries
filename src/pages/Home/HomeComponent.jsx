
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Icon, Timeline, Carousel, Row, Col, List, Card } from 'antd';
import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies'
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class HomeComponent extends React.Component {

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
            title: ''
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
            type: 'homeModel/currentUserInfo',
        }).then(() => {
            this.setState({
                userInfoData: this.props.userInfoData
            }, () => {
                console.log(this.state.userInfoData);
            })
        });

        this.props.dispatch({
            type: 'homeModel/getTimelineInfo',
        }).then(() => {
            this.setState({
                timelineInfoData: this.props.timelineInfoData
            }, () => {
                console.log(this.state.timelineInfoData);
            })
        });

        this.props.dispatch({
            type: 'homeModel/contentsInfo',
        }).then(() => {
            this.setState({
                contentsInfoData: this.props.contentsInfoData,
                title: this.props.contentsInfoData.collect.notes[0].title,
            }, () => {
                console.log(this.state.contentsInfoData);
            })
        });

        this.props.dispatch({
            type: 'homeModel/getSummaryInfo',
        }).then(() => {
            this.setState({
                summaryInfoData: this.props.summaryInfoData,
            }, () => {
                console.log(this.state.summaryInfoData);
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
                            style={{ marginLeft: (1100 - (this.state.collapsed ? 80 : 200)) + 'px' }}
                            type="flex"
                        >
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
                        <Carousel autoplay className={styles.carousel}>
                            <div>
                                <img src={require('../../assets/imgs/1.jpeg')} alt="图片测试" style={{ width: (1280 - (this.state.collapsed ? 0 : 64)), height: 400 }} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/2.jpeg')} alt="图片测试" style={{ width: (1280 - (this.state.collapsed ? 0 : 64)), height: 400 }} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/3.jpeg')} alt="图片测试" style={{ width: (1280 - (this.state.collapsed ? 0 : 64)), height: 400 }} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/4.jpeg')} alt="图片测试" style={{ width: (1280 - (this.state.collapsed ? 0 : 64)), height: 400 }} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/5.jpeg')} alt="图片测试" style={{ width: (1280 - (this.state.collapsed ? 0 : 64)), height: 400 }} />
                            </div>
                        </Carousel>

                        <div className={styles.home}>
                            <div className={styles.left}>
                                <div className={styles.intro}>
                                    <div style={{ display: "flex", backgroundColor: '#a9e0f3' }}>
                                        <Row
                                            gutter={8}
                                            style={{
                                                margin: '8px 0',
                                            }}
                                            type="flex"
                                            align="middle"
                                        >
                                            <Col span={12}>
                                                <img src={require('../../assets/head.jpeg')} alt="图片测试" style={{ width: 200, height: 220 }} />
                                            </Col>
                                            <Col span={12} style={{ marginTop: 230 }}>

                                            </Col>
                                            <Col span={8}>
                                                <b >{this.state.userInfoData.username}</b>
                                            </Col>

                                        </Row>
                                        <Row gutter={12}
                                            style={{
                                                marginLeft: 30,
                                                marginTop: 8,
                                            }}
                                            type="flex"
                                        >
                                            <Col span={24}>
                                                专业：{this.state.userInfoData.major}
                                            </Col>
                                            <Col span={24}>
                                                星座：{this.state.userInfoData.constellatory}
                                            </Col>

                                            <Col span={24}>
                                                爱好：{this.state.userInfoData.hobby}
                                            </Col>
                                            <Col span={24}>
                                                签名：{this.state.userInfoData.autograph}
                                            </Col>
                                            <Col span={23}>
                                                地址：{this.state.userInfoData.address}
                                            </Col>
                                            <Col span={24}>
                                                邮箱：{this.state.userInfoData.email}
                                            </Col>
                                        </Row>

                                    </div>



                                </div>
                                <div className={styles.timeinfo}>
                                    <Timeline>
                                        {Array.isArray(this.state.timelineInfoData) && this.state.timelineInfoData.map(({ record, time }) => (
                                            <Timeline.Item color="#aad6b3" key={time}>{record + ' ' + time}</Timeline.Item>
                                        ))}
                                    </Timeline>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <List
                                    grid={{
                                        gutter: 16,
                                        // xs: 1,
                                        // sm: 2,
                                        // md: 4,
                                        lg: 5,
                                        // xl: 6,
                                        // xxl: 3,
                                    }}
                                    dataSource={this.state.summaryInfoData}
                                    renderItem={item => (
                                        <List.Item>
                                            <Card title={item.name} style={{backgroundColor: '#a9e0f3'}}>{item.total}篇</Card>
                                        </List.Item>
                                    )}
                                />
                            </div>

                        </div>



                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ homeModel }) => ({

    userInfoData: homeModel.userInfoData,
    timelineInfoData: homeModel.timelineInfoData,
    contentsInfoData: homeModel.contentsInfoData,
    summaryInfoData: homeModel.summaryInfoData,

}))(HomeComponent);