
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Icon, Timeline, Carousel, Row, Col, List, Card, Button, Badge } from 'antd';
import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies'
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;


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
            title: '',

            workData: {},
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

        this.props.dispatch({
            type: 'workModel/getWorkDetail',
            payload: {
                id: 1,
            }
        }).then(() => {
            this.setState({
                workData: this.props.workData,
            }, () => {
                console.log(this.state.workData);
            })
        });
    }

    onMenuClick = (event) => {
        const { key } = event;
        let pathName = this.state.menuData[key]
        this.props.history.push(pathName)
    };


    render() {

        return (
            <Layout theme='light'>
                <Sider
                    width={65}
                    style={{
                        theme: 'light',
                        height: '62vh',
                        position: 'fixed',
                        left: 0,
                        background: '#fff',
                        marginTop: 150,
                        zIndex: 1,
                        marginLeft: 10,
                        borderRadius: 5,
                        border: 1,
                        borderColor: 'gray'
                    }}
                >

                    <Menu
                        theme="light"
                        defaultSelectedKeys={['home']}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        mode="inline"
                        onClick={this.onMenuClick}
                        style={{borderRadius: 5}}
                        inlineIndent={16}
                    >
                        <Menu.Item key="excerpt" style={{fontSize: 1, textAlign: 'center'}}>摘录</Menu.Item>
                        <Menu.Item key="original" style={{fontSize: 1, textAlign: 'center'}}>原创</Menu.Item>
                        <Menu.Item key="notes" style={{fontSize: 1, textAlign: 'center'}}>随记</Menu.Item>
                        <Menu.Item key="album" style={{fontSize: 1, textAlign: 'center'}}>相册</Menu.Item>
                        <Menu.Item key="video" style={{fontSize: 1, textAlign: 'center'}}>视频</Menu.Item>
                        <Menu.Item key="music" style={{fontSize: 1, textAlign: 'center'}}>音乐</Menu.Item>
                        <Menu.Item key="draw" style={{fontSize: 1, textAlign: 'center'}}>绘画</Menu.Item>
                        <Menu.Item key="program" style={{fontSize: 1, textAlign: 'center'}}>编程</Menu.Item>
                        <Menu.Item key="game" style={{fontSize: 1, textAlign: 'center'}}>游戏</Menu.Item>
                        
                    </Menu>
                
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={10}
                            style={{ marginLeft: 1050 }}
                            type="flex"
                            
                        >
                            <Col><span><Badge count={5} style={{marginTop: -8}}>消息</Badge></span></Col>
                            <Col><span>历史</span></Col>
                            <Col><span>我的</span></Col>
                            <Col><Button style={{backgroundColor: '#a9e0f3', color: '#fff', border: 'none'}}>去创作</Button></Col>
                        </Row>
                    </Header>

                    <Content
                        style={{
                            background: '#fff',
                            minHeight: 530,
                            marginTop: 100,
                            marginLeft: 90,
                            width: 1100,
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

export default connect(({ homeModel, workModel }) => ({

    userInfoData: homeModel.userInfoData,
    timelineInfoData: homeModel.timelineInfoData,
    contentsInfoData: homeModel.contentsInfoData,
    summaryInfoData: homeModel.summaryInfoData,

    workData: workModel.workData
,

}))(HomeComponent);