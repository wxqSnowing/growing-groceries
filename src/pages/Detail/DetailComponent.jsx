
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
            workDetailData: {},
        };
    }

    init() {
        this.setState({ workid: this.props.location.query.workid }, ()=>{
            this.props.dispatch({
                type: 'workModel/getWorkDetail',
                payload: {
                    workid: this.state.workid
                }
            }).then(() => {
                this.setState({
                    workDetailData: this.props.workDetailData
                }, () => {
                    console.log(this.state.workDetailData[0].content);
                })
            });
        })
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
                        {this.state.workDetailData.length>0 &&<h2 dangerouslySetInnerHTML={{__html: this.state.workDetailData[0].title}} style={{textAlign: 'center'}}></h2>}
                        <div className={styles.home}>

                            {this.state.workDetailData.length>0 && <div dangerouslySetInnerHTML={{__html: this.state.workDetailData[0].content}}></div>}
                        </div>

                    </Content>


                    {/* <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer> */}
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ workModel, userModel }) => ({
    workDetailData: workModel.workDetailData,
    userInfoData: userModel.userInfoData,

}))(DetailComponent);