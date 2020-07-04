import React,{Component} from 'react';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Badge, Input, Tabs, List, Avatar } from 'antd';
import MyEditComponent from './MyEditComponent';
import styles from './index.css';
import { connect } from 'dva';
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

class EditComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            workId: '',
            work: '',
        };
    }

    componentDidMount(){
        console.log(this.props.location.query.workid);
        this.setState({
            workId: this.props.location.query.workid,
        },()=>{
            //需要把数据加载上
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
                            {/* <Col offset={14}><span className={styles.link}>头像</span></Col> */}
                            {/* <Col offset={15}><span className={styles.link}>加入我们的第3天</span></Col> */}
                            {/* <Col ><span><Badge count={5} style={{ marginTop: -8 }}>消息</Badge></span></Col> */}
                            <Col><Link to={`/mine?uid=${this.state.uid}`} className={styles.link}>我的</Link></Col>
                        </Row>
                    </Header>

                    <Content style={{ width: '100%', marginTop: 5 }}>
                        <MyEditComponent {...this.props}></MyEditComponent>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer> */}
                </Layout>
            </Layout>
        )
    }
}
export default EditComponent;