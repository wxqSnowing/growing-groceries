
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Icon, Timeline, Carousel, Row, Col } from 'antd';
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
            }
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

        const { dispatch } = this.props;
        if (dispatch) {
            dispatch({
                type: 'user/fetchCurrent',
            }).then(() => {
                this.setState({
                    data: this.props.currentUser
                })
            });
        }
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
                    trigger={<div style={{ backgroundColor: '#fff', color: '#a9e0f3' }}>{this.state.collapsed && <div>展开</div>}{!this.state.collapsed && <div>收起</div>}</div>}
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
                    <div className={styles.logo} />
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
                        style={{marginLeft: (1100-(this.state.collapsed?80:200))+'px'}}
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
                                <img src={require('../../assets/imgs/1.jpeg')} alt="图片测试" className={styles.img} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/2.jpeg')} alt="图片测试" className={styles.img} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/3.jpeg')} alt="图片测试" className={styles.img} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/4.jpeg')} alt="图片测试" className={styles.img} />
                            </div>
                            <div>
                                <img src={require('../../assets/imgs/5.jpeg')} alt="图片测试" className={styles.img} />
                            </div>
                        </Carousel>

                        <div className={styles.home}>
                            <div className={styles.left}>
                                <div className={styles.intro}>
                                    <div style={{ display: "flex", backgroundColor: '#a9e0f3'}}>
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
                                            <Col span={12} style={{marginTop: 230}}> 
                                               
                                            </Col>
                                            <Col span={8}> 
                                                <b>Shirley</b>
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
                                                专业：软件工程
                                            </Col>
                                            <Col span={24}> 
                                                星座：摩羯座
                                            </Col>
                                           
                                            <Col span={24}>
                                                爱好：听音乐，和朋友逛街
                                            </Col>
                                            <Col span={24}>
                                                签名：以梦为马，不负韶华
                                            </Col>
                                            <Col span={23}>
                                                地址：北京
                                            </Col>
                                            <Col span={24}>
                                                邮箱：707409166@qq.com
                                            </Col>
                                        </Row>

                                    </div>



                                </div>
                                <div className={styles.timeinfo}>
                                    <Timeline>
                                        <Timeline.Item color="#aad6b3">更新了个人信息 2020-05-24</Timeline.Item>
                                        <Timeline.Item color="#aad6b3">发布了一篇随记录 2020-05-24</Timeline.Item>
                                        <Timeline.Item color="#aad6b3">发布了视频  2020-05-24</Timeline.Item>
                                        <Timeline.Item color="#aad6b3">发布了第一篇原创 2020-05-24</Timeline.Item>
                                        <Timeline.Item color="#aad6b3">加入时间 2020-05-23</Timeline.Item>
                                    </Timeline>
                                </div>
                            </div>
                            <div className={styles.right}>

                                {this.state.data.group}
                            </div>

                        </div>



                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5 }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ user }) => ({
    currentUser: user.currentUser,
}))(HomeComponent);