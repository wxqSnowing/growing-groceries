
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Card, Timeline, Carousel, Row, Col, List, Button, Badge, Input } from 'antd';
import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies'
import { Link } from 'umi';

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

const menuList = [
    {
        key: 'excerpt',
        value: '摘录',
        pathName: '/collect/excerpt'
    },
    {
        key: 'original',
        value: '原创',
        pathName: '/collect/excerpt'
    },
    {
        key: 'notes',
        value: '随记',
        pathName: '/collect/excerpt'
    },
    {
        key: 'album',
        value: '相册',
        pathName: '/collect/excerpt'
    },
    {
        key: 'video',
        value: '视频',
        pathName: '/collect/excerpt'
    },
    {
        key: 'music',
        value: '音乐',
        pathName: '/collect/excerpt'
    },
    {
        key: 'draw',
        value: '绘画',
        pathName: '/collect/excerpt'
    },
    {
        key: 'program',
        value: '编程',
        pathName: '/collect/excerpt'
    },
    {
        key: 'game',
        value: '游戏',
        pathName: '/collect/excerpt'
    },
    {
        key: 'top',
        value: 'ΛTop'
    },
];

const imageNames = ['1', '2', '3', '4', '5'];

class HomeComponent extends React.Component {

    rootSubmenuKeys = ['collect', 'bit'];

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            timelineInfoData: [],
            contentsInfoData: {},
            summaryInfoData: [],
            title: '',
            workData: {},

            //数据初始化
            searchString: '四月',
            searchResult: [],
            messageData: [],
            historyData: [],
            imagesData: [],
        };
    }

    init() {
       
    }

    componentDidMount() {
        this.init();
    }


    onMenuClick = (event) => {
        const { key } = event;
        if (key === 'top') {
            console.log('回到最顶端');
        }
        else {
            for (let i in menuList) {
                if (menuList[i].key === key) {
                    let pathName = menuList[i].pathName;
                    this.props.history.push(pathName)
                }
            }
        }
    };

    search = () => {
        this.props.dispatch({
            type: 'homeModel/search',
            payload: {
                queryKey: this.state.searchString
            }
        }).then(()=>{
            this.setState({
                searchResult: this.props.searchResult,
            })
        })
    }


    render() {

        return (
            <Layout theme='light'>
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
                        onClick={this.onMenuClick}
                    >
                        {menuList.map(({ key, value }) =>
                            (<Menu.Item key={key} className={styles.item}>{value}</Menu.Item>)
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
                                    placeholder="你是人间最美四月天"
                                    onSearch={this.search}
                                    onPressEnter={this.search}
                                    onChange={(e)=>{
                                        this.setState({searchString: e.target.value}, ()=>{
                                            this.search()
                                        })
                                    }}
                                />
                            </Col>
                            <Col style={{ marginLeft: 200 }}><span><Badge count={5} style={{ marginTop: -8 }}>消息</Badge></span></Col>
                            <Col><span>历史</span></Col>
                            <Col><Link to={`/mine`} className={styles.link}>我的</Link></Col>
                            <Col><Button className={styles.create_btn} onClick={() => { this.props.history.push('/create') }}>去创作</Button></Col>
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        <Carousel autoplay className={styles.carousel}>
                            {imageNames.map((item) => (
                                <div key={item}>
                                    <img src={require(`../../assets/imgs/${item}.jpeg`)} alt="图片测试" className={styles.img} />
                                </div>
                            ))}
                        </Carousel>

                        <div style={{ display: 'flex' , marginTop: 10, marginLeft: 10}}>
                            <div className={styles.card}>
                                <Card
                                    title={'test'}
                                    id={'test'}
                                    bordered={false}
                                    style={{ width: 700, height:500 }}
                                >
                                    123
                            </Card>
                            </div>
                        </div>

                        <br></br>
                        <br></br>
                        <br></br>

                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ homeModel}) => ({
    searchResult: homeModel.searchResult,
}))(HomeComponent);