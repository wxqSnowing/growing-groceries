
import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import styles from './index.css';
import './global.css';
import { Layout, Menu, Carousel, Row, Col, Button, Input, Anchor, message } from 'antd';
import { connect } from 'dva';
import cookie from 'react-cookies'
import * as MyConf from './global';

import ExcerptComponent from './MyComponent/ExcerptComponent';
import OriginalComponent from './MyComponent/OriginalComponent';
import OriginalTabsComponent from './MyComponent/OriginalTabsComponent';
import NotesComponent from './MyComponent/NotesComponent';
import AlbumComponent from './MyComponent/AlbumComponent';


const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Link } = Anchor;

const { menuList, debounce } = MyConf;

class HomeComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '四月',
            searchResult: [],
            imagesData: [],
            type: 'excerpt',
            workData: [],
            excerptWorkData: [],
            originalWorkData: [],
            notesWorkData: [],
            albumWorkData: [],
            videoWorkData: [],
            musicWorkData: [],
            drawWorkData: [],
            programWorkData: [],
            gameWorkData: [],
            messageData: [],
            historyData: [],
            rankWorkData: [],
            excerptRankData: [],
            recommendWorkData: [],
            excerptRecommendWorkData: [],

            excerptFollowData: [],
            isLogin: false,
            currentUser: {},
        };
    }

    static getDeliverStateFromProps(props, state) {

    }

    componentDidMount() {
        this.init();
    }

    async init() {
        // cookie.save("collapsedStatus", this.state.collapsed);
        //从cookie中查询当前是否登录
        let isLoginFlag = cookie.load("isLogin");
        if (typeof (isLoginFlag) !== 'undefined') {
            if (isLoginFlag === 'false') {
                this.setState({ isLogin: false })
            } else {
                this.setState({ isLogin: true })
            }
        }

        //获取siderImage信息
        this.props.dispatch({
            type: 'homeModel/getSiderInfo',
        }).then(() => {
            this.setState({
                imagesData: this.props.siderInfoResult,
            })
        })

        //获取作品信息

        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'excerpt',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                excerptWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'original',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                originalWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'notes',
                querycount: 3
            }
        }).then(() => {
            this.setState({
                notesWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'album',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                albumWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'video',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                videoWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'music',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                musicWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'draw',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                drawWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'program',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                programWorkData: this.props.workData,
            })
        })
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'game',
                querycount: 8
            }
        }).then(() => {
            this.setState({
                gameWorkData: this.props.workData,
            })
        })

        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfoByRank',
            payload: {
                type: 'excerpt',
                querycount: 5
            }
        }).then(() => {
            this.setState({
                excerptRankData: this.props.rankWorkData,
            })
        })

        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfoByRecommend',
            payload: {
                type: 'excerpt',
                querycount: 5
            }
        }).then(() => {
            this.setState({
                excerptRecommendWorkData: this.props.rankWorkData,
            })
        })

    }

    searchItemClick = ({ key }) => {
        this.props.history.push(`/detail?workid=${key}`);
        this.setState({
            searchResult: []
        })
    }

    changeContentClick = (e) => {
        e.preventDefault();
        let newType = e.target.id.split('_')[0]
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: newType
            }
        }).then(() => {
            if (newType === 'excerpt') {
                this.setState({
                    excerptWorkData: this.props.workData,
                })
            }
            if (newType === 'original') {
                this.setState({
                    originalWorkData: this.props.workData,
                })
            }
            if (newType === 'notes') {
                this.setState({
                    notesWorkData: this.props.workData,
                })
            }
            if (newType === 'album') {
                this.setState({
                    albumWorkData: this.props.workData,
                })
            }
            if (newType === 'video') {
                this.setState({
                    videoWorkData: this.props.workData,
                })
            }
            if (newType === 'music') {
                this.setState({
                    musicWorkData: this.props.workData,
                })
            }
            if (newType === 'draw') {
                this.setState({
                    drawWorkData: this.props.workData,
                })
            }
            if (newType === 'program') {
                this.setState({
                    programWorkData: this.props.workData,
                })
            }
            if (newType === 'game') {
                this.setState({
                    gameWorkData: this.props.workData,
                })
            }

        })
    }

    render() {
        const { props } = this;
        const _handle = value => {
            console.log(value);
            props.dispatch({
                type: 'homeModel/search',
                payload: {
                    queryKey: value
                }
            }).then(() => {
                this.setState({
                    searchResult: this.props.searchResult,
                })
            })
        };

        const debounceHandler = debounce(_handle, 500, false);
        const search = (e) => {
            debounceHandler(e.target.value);
        }
        return (
            <Layout theme='light' >
                <Sider
                    width={65}
                    className={styles.sider}
                >
                    <Anchor className={styles.menu} targetOffset={window.innerHeight / 2}>
                        {menuList.map(({ key, value, pathName }) =>
                            (<Link key={key} className={styles.item} href={`#${pathName}`} title={value}></Link>)
                        )}
                    </Anchor>
                </Sider>

                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col
                                span={8}
                                offset={4}
                            >
                                <Search
                                    className={styles.search}
                                    placeholder="四月"
                                    onSearch={search}
                                    onPressEnter={search}
                                    onKeyUp={search}
                                />
                                {this.state.searchResult.length > 0 && <Menu className={styles.search_menu}>
                                    {this.state.searchResult.map((item) => (<Menu.Item
                                        key={parseInt(item.workid)}
                                        className={styles.search_menu_item}
                                        onClick={this.searchItemClick}
                                    >
                                        {item.description}
                                    </Menu.Item>))}
                                </Menu>
                                }

                            </Col>
                            <Col span={2} offset={4} push={1}>{this.state.isLogin && <Button className={styles.create_btn} onClick={() => { this.props.history.push(`/mine?uid=${parseInt(cookie.load('uid'))}`) }}>我的</Button>}{!this.state.isLogin && <Button className={styles.create_btn} onClick={() => { this.props.history.push('/login') }}>登录</Button>}</Col>
                            <Col span={2} offset={1} push={1}><Button className={styles.create_btn} onClick={(e) => {
                                e.preventDefault();
                                if (this.state.isLogin) {
                                    this.props.history.push('/create');
                                } else {
                                    message.info('请先登录');
                                }
                            }}>去创作</Button></Col>
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        <Carousel autoplay className={styles.carousel} id='top'>
                            {this.state.imagesData.map((item) => (
                                <div key={item}>
                                    <img className={styles.img} src={require(`../../assets/imgs/${item.id}.jpeg`)} alt={item.alt} title={item.title} onClick={()=>{
                                        window.open('http://www.baidu.com')
                                    }}/>
                                </div>
                            ))}
                        </Carousel>

                        <div id='excerpt'>
                            <ExcerptComponent data={this.state.excerptWorkData} type={'excerpt'} {...props}></ExcerptComponent>
                        </div>
                        
                        <div id='original' style={{display:'flex'}}>
                            <OriginalComponent data={this.state.originalWorkData} {...props}></OriginalComponent>
                            <OriginalTabsComponent rankWorkData={this.state.rankWorkData} recommendWorkData={this.state.recommendWorkData} {...props}></OriginalTabsComponent>
                        </div>

                        <div id='notes'>
                            <NotesComponent data={this.state.notesWorkData} {...props}></NotesComponent>
                        </div>
                        <div id='album'>
                            <AlbumComponent data={this.state.albumWorkData} title="图片" {...props} ></AlbumComponent>
                        </div>
                        <div id='life'>
                            <AlbumComponent data={this.state.videoWorkData} title="生活" {...props} ></AlbumComponent>
                        </div>
                        <div id='music' >
                            <AlbumComponent data={this.state.musicWorkData} title="音乐" {...props} ></AlbumComponent>
                        </div>

                        <div id='draw' >
                            <AlbumComponent data={this.state.drawWorkData} title="绘画" {...props} ></AlbumComponent>
                        </div>

                        <div id='program' >
                            <AlbumComponent data={this.state.programWorkData} title="编程" {...props} ></AlbumComponent>
                        </div>

                        <div id='game' >
                            <AlbumComponent data={this.state.gameWorkData} title="游戏" {...props} ></AlbumComponent>
                        </div>
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
    rankWorkData: homeModel.rankWorkData,
    recommendWorkData: homeModel.recommendWorkData,
}))(HomeComponent);
