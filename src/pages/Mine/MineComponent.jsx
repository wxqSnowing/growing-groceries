
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Divider, Row, Col, Table, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import formatUTC from '../utils/util'
import cookie from 'react-cookies'
import {menuList} from '../Home/global'
import {typeData, subtypeData, tagsData} from '../Create/myconf'


const { Header, Content, Footer } = Layout;

class MineComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            data: [],
            delWorkResult: '',
            timelineInfoData: [],
            uid: parseInt(cookie.load('uid')) || 0,
            day: 1,
        };
    }

    init() {
        this.setState({
            uid: parseInt(this.props.location.query.uid),
        }, () => {
            this.props.dispatch({
                type: 'mineModel/getMineWork',
                payload: {
                    uid: this.state.uid
                }
            }).then(() => {
                this.setState({
                    data: this.props.mineWorkData
                }, () => {
                    // console.log(this.state.mineWorkData);
                })
            });

            this.props.dispatch({
                type: 'userModel/queryCurrent',
                payload: {
                    uid: this.state.uid
                }
            }).then(() => {
                this.setState({
                    userInfoData: this.props.userInfoData,
                    day: this.props.userInfoData.regdate
                }, () => {
                    // console.log(this.state.userInfoData);
                })
            });

            this.props.dispatch({
                type: 'mineModel/getTimelineInfo',
            }).then(() => {
                this.setState({
                    timelineInfoData: this.props.timelineInfoData
                }, () => {
                    // console.log(this.state.timelineInfoData);
                })
            });
        })
    }

    componentDidMount() {
        this.init()
    }

    logout = (e) => {
        e.preventDefault();
        cookie.remove('uid');
        cookie.remove('password');
        cookie.remove('username');
        cookie.remove('isLogin');
        this.props.history.push(`/home`);
    }


    render() {
        const columns = [
            {
                title: () => (<span style={{ color: 'lightblue' }}>文章标题</span>),
                dataIndex: 'title',
                width: '20%',
                key: 'title',
                render: (text, record, index)=>{
                    return (<h3>{text}</h3>)
                }
            },
            {
                title: () => (<span style={{ color: 'lightblue' }}>分类</span>),
                dataIndex: 'type',
                width: '10%',
                key: 'type',
                render: (text, record, index) => {
                    for (let i in menuList) {
                        if (menuList[i].key === text) {
                            return (<span>{menuList[i].value}</span>)
                        }
                    }
                    return (<span>暂无</span>)
                }
            },
            {
                key: 'subtype',
                title: () => (<span style={{ color: 'lightblue' }}>二级分类</span>),
                width: '15%',
                dataIndex: 'subtype',
                render:(text, record, index)=>{
                    let arr = text.split('#');
                    let str = '';
                    for (let i in arr) {
                        for(let j in subtypeData){
                            if (subtypeData[j].key === arr[i]) {
                                str += subtypeData[i].value;
                                if(i<=arr.length-2)
                                    str+='、';
                            }
                        }
                    }
                    return (<label>
                        {str}
                    </label>)
                }
            },
            {
                title: () => (<span style={{ color: 'lightblue' }}>标签</span>),
                width: '15%',
                dataIndex: 'tags',
                key: 'tags',
                render:(text, record, index)=>{
                    let arr = text.split('#');
                    let str = '';
                    for (let i in arr) {
                        for(let j in tagsData){
                            if (tagsData[j].key === arr[i]) {
                                str += tagsData[i].value;
                                if(i<=arr.length-2)
                                    str+='、';
                            }else{
                                str += arr[j];
                                if(i<=arr.length-2)
                                    str+='、';
                            }
                        }
                    }
                    return (<label>
                        {str}
                    </label>)
                }
            },
            {
                title: () => (<span style={{ color: 'lightblue' }}>创建时间</span>),
                width: '10%',
                dataIndex: 'createtime',
                key: 'createtime',
                render: (text, record, index) => (
                    <span>{formatUTC(text)}</span>
                )
            },
            {
                title: () => (<span style={{ color: 'lightblue' }}>更新时间</span>),
                width: '10%',
                dataIndex: 'updatetime',
                key: 'updatetime',
                render: (text, record, index) => (
                    <span>{formatUTC(text)}</span>
                )
            },
            {
                title: () => (<span style={{ color: 'lightblue' }}>操作</span>),
                width: '20%',
                dataIndex: 'op',
                key: 'op',
                render: (text, record) => (
                    <span>
                        <Button style={{ color: 'lightblue', border: '0 solid white' }} onClick={(e) => {
                            e.preventDefault();
                            this.props.history.push(`/detail?workid=${record.workid}`)
                        }}>查看</Button>
                        <Divider type="vertical" />
                        <Button style={{ color: 'lightpink', border: '0 solid white' }} onClick={(e) => {
                            e.preventDefault();
                            this.props.history.push(`/edit?workid=${record.workid}`)
                            console.log('--编辑-----')
                        }}>编辑</Button>
                        <Divider type="vertical" />
                        <Button style={{ color: 'lightblue', border: '0 solid white' }} onClick={(e) => {
                            e.preventDefault();
                            console.log('--删除-----');
                            this.props.dispatch({
                                type: 'workModel/delteWorkById',
                                payload: {
                                    workid: record.workid
                                }
                            })
                                .then(() => {
                                    this.setState({
                                        delWorkResult: this.props.delWorkResult,
                                    });

                                    this.props.dispatch({
                                        type: 'mineModel/getMineWork',
                                        payload: {
                                            uid: this.state.uid
                                        }
                                    }).then(() => {
                                        this.setState({
                                            data: this.props.mineWorkData
                                        }, () => {
                                            console.log(this.state.mineWorkData);
                                        })
                                    });
                                })
                        }}>删除</Button>
                    </span>
                )
            },
        ]

        return (
            <Layout theme='light'>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col span={4} offset={1}><Link to={`/home`} className={styles.link}>首页</Link></Col>
                            <Col span={4} offset={1}><Link to={`/create`} className={styles.link}>去创作</Link></Col>
                            <Col offset={8}><span style={{ color: 'red' }}>加入生活杂货铺{Math.floor(((new Date().getTime()) - (new Date(this.state.day).getTime())) / (24 * 1000 * 3600))}天{}</span></Col>
                            <Col><Button className={styles.loginout_btn} onClick={this.logout}>退出</Button></Col>
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        <div className={styles.intro}>
                            <Row
                                gutter={24}
                                className={styles.info_left}
                            >
                                <Col span={24}>
                                    <img src={require('../../assets/head.jpeg')} alt="头像" />
                                </Col>
                            </Row>
                            <Row gutter={24}
                                className={styles.info_right}
                                type="flex"
                            >
                                <Col span={24}>
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        className={styles.row}
                                    >
                                        <Col span={24}>
                                            昵称：<label className={styles.username_item}>{this.state.userInfoData.username}</label>
                                        </Col>
                                    </Row>
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        className={styles.row}
                                    >
                                        <Col span={8}>
                                            专业：{this.state.userInfoData.major || '暂无'}
                                        </Col>
                                        <Col span={8}>
                                            星座：{this.state.userInfoData.constellatory || '暂无'}
                                        </Col>

                                        <Col span={8}>
                                            爱好：{this.state.userInfoData.hobby || '暂无'}
                                        </Col>
                                    </Row>
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        className={styles.row}
                                    >
                                        <Col span={8}>
                                            签名：{this.state.userInfoData.autograph || '暂无'}
                                        </Col>
                                        <Col span={8}>
                                            地址：{this.state.userInfoData.address || '暂无'}
                                        </Col>
                                        <Col span={8}>
                                            邮箱：{this.state.userInfoData.email || '暂无'}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.wrok_table}>
                            <Table
                                loading={(this.state.data.length) > 0 ? false : true}
                                rowKey="workid"
                                columns={columns}
                                dataSource={this.state.data}
                            >
                            </Table>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ mineModel, userModel, workModel }) => ({
    timelineInfoData: mineModel.timelineInfoData,
    mineWorkData: mineModel.mineWorkData,
    userInfoData: userModel.userInfoData,
    delWorkResult: workModel.delWorkResult,

}))(MineComponent);