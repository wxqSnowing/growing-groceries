
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Timeline, Divider, Row, Col, Table } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import formatUTC from '../utils/util'

const { Header, Content, Footer } = Layout;

class DetailComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            data: [],
            workid: '1',
        };
    }

    init() {
        this.setState({ workid: this.props.location.query.workid })

        

        this.props.dispatch({
            type: 'userModel/queryCurrent',
            payload: {
                uid: '1'
            }
        }).then(() => {
            this.setState({
                userInfoData: this.props.userInfoData
            }, () => {
                console.log(this.state.userInfoData);
            })
        });


    }

    componentDidMount() {
        this.init()
    }


    render() {

        return (
            <Layout theme='light'>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col span={4} offset={1}><Link to={`/home`} className={styles.link}>首页</Link></Col>
                            {/* <Col offset={14}><span style={{color: 'white'}}>头像</span></Col> */}
                            <Col offset={15}><span style={{ color: 'white' }}>加入生活杂货铺的第3天</span></Col>
                            {/* <Col ><span><Badge count={5} style={{ marginTop: -8 }}>消息</Badge></span></Col> */}
                            {/* <Col><Link to={`/mine`} className={styles.link}>我的</Link></Col> */}
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        ------------详情展示---------
                        <div className={styles.home}>
                            <div className={styles.left}>
                                <div className={styles.intro}>
                                    {/* <div style={{ display: "flex", backgroundColor: '#a9e0f3' }}>
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

 */}

                                </div>
                                <div className={styles.timeinfo}>
                                    {/* <Timeline>
                                        {Array.isArray(this.state.timelineInfoData) && this.state.timelineInfoData.map(({ record, time }) => (
                                            <Timeline.Item color="#aad6b3" key={time}>{record + ' ' + time}</Timeline.Item>
                                        ))}
                                    </Timeline> */}
                                </div>
                            </div>
                            <div className={styles.right}>
                                {/* <Table
                                    loading={this.state.data.length > 0 ? false : true}
                                    rowKey="workid"
                                    columns={columns}
                                    dataSource={this.state.data}
                                >
                                </Table> */}
                            </div>

                        </div>

                    </Content>


                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ mineModel, userModel }) => ({
    timelineInfoData: mineModel.timelineInfoData,
    mineWorkData: mineModel.mineWorkData,
    userInfoData: userModel.userInfoData,

}))(DetailComponent);