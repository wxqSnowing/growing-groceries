import React,{Component} from 'react';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Badge, Input, Tabs, List, Avatar } from 'antd';
import MyEditComponent from './MyEditComponent';
import styles from './index.css';
import { connect } from 'dva';
import { Link } from 'umi';
import BraftEditor from 'braft-editor'

const { Header, Content, Footer, Sider } = Layout;

class EditComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            workid: '',
            work: 'ttt',
        };
    }

    componentDidMount(){
        this.setState({
            workid: this.props.location.query.workid,
        },()=>{
            this.props.dispatch({
                type: 'workModel/getWorkDetail',
                payload: {
                    workid: this.state.workid
                }
            }).then(()=>{
                this.setState({work: this.props.workDetailData[0]},()=>{

                })
            })
        })
    }

    render(){
        return (
            <Layout theme='light'>
                <Layout style={{ width: '100%', backgroundColor: 'white' }}>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col span={4} offset={1}><Link to={`/home`} className={styles.link}>首页</Link></Col>
                            <Col><Link to={`/mine?uid=${this.state.uid}`} className={styles.link}>我的</Link></Col>
                        </Row>
                    </Header>

                    <Content style={{ width: '100%', marginTop: 30 }}>
                        <MyEditComponent {...this.props}></MyEditComponent>
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginTop:30, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(({ workModel, userModel }) => ({
    workDetailData: workModel.workDetailData,
    userInfoData: userModel.userInfoData,
}))(EditComponent);