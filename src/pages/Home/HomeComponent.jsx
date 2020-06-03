
import 'antd/dist/antd.css';
import styles from './index.css';
import './global.css';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Badge, Input, Tabs, List, Avatar } from 'antd';
import ExcerptIcon from './Icon/ExcerptIcon';
import OriginalIcon from './Icon/OriginalIcon';
import NotesIcon from './Icon/NotesIcon';
import AlbumIcon from './Icon/AlbumIcon';
import VideoIcon from './Icon/VideoIcon';
import MusicIcon from './Icon/MusicIcon';
import DrawIcon from './Icon/DrawIcon';
import ProgramIcon from './Icon/ProgramIcon';
import GameIcon from './Icon/GameIcon';

import React from 'react';
import { connect } from 'dva';
// import cookie from 'react-cookies'
import { Link } from 'umi';

import formatUTC from '../utils/util'

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

const menuList = [
    {
        key: 'excerpt',
        value: '摘录',
        pathName: 'excerpt'
    },
    {
        key: 'original',
        value: '原创',
        pathName: 'original'
    },
    {
        key: 'notes',
        value: '随记',
        pathName: 'notes'
    },
    {
        key: 'album',
        value: '相册',
        pathName: 'album'
    },
    {
        key: 'video',
        value: '视频',
        pathName: 'video'
    },
    {
        key: 'music',
        value: '音乐',
        pathName: 'music'
    },
    {
        key: 'draw',
        value: '绘画',
        pathName: 'draw'
    },
    {
        key: 'program',
        value: '编程',
        pathName: 'program'
    },
    {
        key: 'game',
        value: '游戏',
        pathName: 'game'
    },
    {
        key: 'top',
        value: 'ΛTop',
        pathName: 'excerpt'
    },
];

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            timelineInfoData: [],
            contentsInfoData: {},
            summaryInfoData: [],
            title: '',

            //数据初始化-----------------------------------
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
            //---------------------------------------------
            messageData: [],
            historyData: [],
            // --------------------------------------------
            rankWorkData: [],
            excerptRankData: [],
            excerptRecommendWorkData: [],
            recommendWorkData: [],
            excerptFollowData: [],
            // --------------------------------------------

        };
    }

    init() {
        //获取siderImage信息
        this.props.dispatch({
            type: 'homeModel/getSiderInfo',
        }).then(() => {
            this.setState({
                imagesData: this.props.siderInfoResult,
            })
        })

        //获取作品信息
        //
        this.props.dispatch({
            type: 'homeModel/getWorkInfo',
            payload: {
                type: 'excerpt'
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
                type: 'original'
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
                type: 'notes'
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
                type: 'album'
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
                type: 'video'
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
                type: 'music'
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
                type: 'draw'
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
                type: 'program'
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
                type: 'game'
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
                type: 'excerpt'
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
                type: 'excerpt'
            }
        }).then(() => {
            this.setState({
                excerptRecommendWorkData: this.props.rankWorkData,
            })
        })

    }

    componentDidMount() {
        this.init();
    }

    search = () => {
        this.props.dispatch({
            type: 'homeModel/search',
            payload: {
                queryKey: this.state.searchString
            }
        }).then(() => {
            this.setState({
                searchResult: this.props.searchResult,
            })
        })
    }

    searchItemClick = ({ key }) => {
        console.log('选择的workid是', key);
        this.setState({
            searchResult: []
        })
    }

    changeContentClick = (e) => {
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

        return (
            <Layout theme='light' style={{ minWidth: 1000 }}>
                <Sider
                    width={65}
                    className={styles.sider}
                >
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['home']}
                        className={styles.menu}
                        inlineIndent={0}
                    >
                        {menuList.map(({ key, value, pathName }) =>
                            (<Menu.Item key={key} className={styles.item}><a href={`#${pathName}`}>{value}</a></Menu.Item>)
                        )}
                    </Menu>
                </Sider>

                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            style={{ marginLeft: '30%' }}
                            type="flex"
                        >
                            <Col style={{ margin: 'auto' }}>
                                <Search
                                    style={{ width: 220, outline: 'none' }}
                                    placeholder="四月"
                                    onSearch={this.search}
                                    onPressEnter={this.search}
                                    onChange={(e) => {
                                        this.setState({ searchString: e.target.value }, () => {
                                            this.search()
                                        })
                                    }}
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
                            {/* <Col style={{ marginLeft: 200 }}><span><Badge count={5} style={{ marginTop: -8 }}>消息</Badge></span></Col> */}
                            {/* <Col><span>历史</span></Col> */}
                            <Col style={{ marginLeft: 200 }}><Link to={`/mine`} className={styles.link}>我的</Link></Col>
                            <Col><Button className={styles.create_btn} onClick={() => { this.props.history.push('/create') }}>去创作</Button></Col>
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        <Carousel autoplay className={styles.carousel}>
                            {this.state.imagesData.map((item) => (
                                <div key={item}>
                                    <img className={styles.img} src={require(`../../assets/imgs/${item.id}.jpeg`)} alt={item.alt} title={item.title} />
                                </div>
                            ))}
                        </Carousel>

                        <div id='excerpt' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><ExcerptIcon /></Col>
                                        <Col className={styles.card_title}>摘录</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='excerpt_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                    loading={this.state.excerptWorkData.length > 0 ? false : true}
                                >
                                    {this.state.excerptWorkData.length > 0 && this.state.excerptWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}
                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>
                            </div>
                        </div>

                        <div id='original' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>
                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><OriginalIcon /></Col>
                                        <Col className={styles.card_title}>原创</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='original_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >
                                    {this.state.originalWorkData.length > 0 && this.state.originalWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}

                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>

                        <div id='notes' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>
                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><NotesIcon /></Col>
                                        <Col className={styles.card_title}>随记</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='notes_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.notesWorkData.length > 0 && this.state.notesWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}

                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>

                        <div id='album' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><AlbumIcon /></Col>
                                        <Col className={styles.card_title}>相册</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='album_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.albumWorkData.length > 0 && this.state.albumWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}

                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>

                        <div id='video' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><VideoIcon /></Col>
                                        <Col className={styles.card_title}>视频</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='video_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.videoWorkData.length > 0 && this.state.videoWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}

                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>


                        <div id='music' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><MusicIcon /></Col>
                                        <Col className={styles.card_title}>音乐</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='music_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.musicWorkData.length > 0 && this.state.musicWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}

                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>


                        <div id='draw' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><DrawIcon /></Col>
                                        <Col className={styles.card_title}>绘画</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='draw_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.drawWorkData.length > 0 && this.state.drawWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}
                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>


                        <div id='program' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><ProgramIcon /></Col>
                                        <Col className={styles.card_title}>编程</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='program_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.programWorkData.length > 0 && this.state.programWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}

                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

                            </div>
                        </div>


                        <div id='game' style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>

                            <div className={styles.card}>
                                <Card
                                    title={<Row type="flex">
                                        <Col><GameIcon /></Col>
                                        <Col className={styles.card_title}>游戏</Col>
                                        <Col offset={19}><Button onClick={this.changeContentClick} id='game_change'>换一换</Button></Col>
                                        {/* <Col style={{ marginLeft: 5 }}><Button>更多></Button></Col> */}
                                    </Row>}
                                    bordered={false}
                                    style={{ width: 800, height: 480 }}
                                >

                                    {this.state.gameWorkData.length > 0 && this.state.gameWorkData.map((item) => (
                                        <Card.Grid key={item.workid} className={styles.card_gird}><img src={item.image} width="200" height="180"></img>{item.title}</Card.Grid>
                                    ))}
                                </Card>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <Tabs defaultActiveKey="1" style={{ width: 270 }}>
                                    <TabPane tab="排行" key="1">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRankData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRankData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    <TabPane tab="推荐" key="2">
                                        <List
                                            itemLayout="horizontal"
                                            loading={this.state.excerptRecommendWorkData.length > 0 ? false : true}
                                            dataSource={this.state.excerptRecommendWorkData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        avatar={<Avatar src={item.image} />}
                                                        description={formatUTC(item.createtime)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane>
                                    {/* <TabPane tab="关注" key="3">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.workData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </TabPane> */}
                                </Tabs>

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
    searchResult: homeModel.searchResult,
    siderInfoResult: homeModel.siderInfoResult,
    workData: homeModel.workData,
    rankWorkData: homeModel.rankWorkData,
    recommendWorkData: homeModel.recommendWorkData,
}))(HomeComponent);