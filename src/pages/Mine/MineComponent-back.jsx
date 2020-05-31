
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Form, Timeline, Carousel, Row, Col, List, Card, Button, Badge, Input } from 'antd';
import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies'
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class MineComponent extends React.Component {

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
        };
    }

    init(){
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

    componentDidMount() {
       this.init()
    }



    render() {

        return (
            <Layout theme='light'>
               
                <Layout style={{ marginLeft: this.state.offsetWidth }}>
                    <Content className={styles.content}>
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
                                                <img src={require('../../assets/head.jpeg')} alt="头像" style={{ width: 200, height: 220 }} />
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
                                        lg: 5,
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
                    
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed?80:200)}}>Snow Blog ©2020 Created by Shirly</Footer>
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

}))(MineComponent);