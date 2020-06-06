
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Input, Icon, Row, Col, List, Avatar, Button, Switch, message} from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import formatUTC from '../utils/util';
import cookie from 'react-cookies'

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

class DetailComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            data: [],
            workid: '1',
            uid: 1,
            workDetailData: {},
            commentData: [],
            //
            comment: '',
            isAnonymous: false,

        };
    }

    init() {
        this.setState({ workid: this.props.location.query.workid }, () => {
            this.props.dispatch({
                type: 'workModel/getWorkDetail',
                payload: {
                    workid: this.state.workid
                }
            }).then(() => {
                this.setState({
                    workDetailData: this.props.workDetailData
                }, () => {
                    // console.log(this.state.workDetailData[0].content);
                })
            });

            this.props.dispatch({
                type: 'commentModel/queryCommentByWorkId',
                payload: {
                    workid: this.state.workid
                }
            }).then(() => {
                this.setState({
                    commentData: this.props.commentData
                }, () => {
                    // console.log(this.state.commentData);
                })
            });
        })
    }

    componentDidMount() {
        this.init()
    }

    publishCommentClick = () => {
        if((typeof(cookie.load('isLogin'))!='undefined' && cookie.load('isLogin'))||this.state.isAnonymous){
            this.props.dispatch({
                type: 'commentModel/publishCommentByWorkId',
                payload: {
                    workid: this.state.workid,
                    uid: this.state.isAnonymous?0: this.state.uid,
                    comment: this.state.comment
                }
            }).then(
                setTimeout(()=>{
                    this.props.dispatch({
                        type: 'commentModel/queryCommentByWorkId',
                        payload: {
                            workid: this.state.workid
                        }
                    }).then(() => {
                        this.setState({
                            commentData: this.props.commentData
                        }, () => {
                            console.log(this.state.commentData);
                        })
                    })
                }, 1000)
            )
        }else{
            message.info('请先登录');
        }
        
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
                            <Col span={4} offset={1}><Link to={`/home`} className={styles.span}>首页</Link></Col>
                            {/* <Col offset={14}><span style={{color: 'white'}}>头像</span></Col> */}
                            {/* <Col offset={15}><span style={{ color: 'white' }}>加入生活杂货铺的第3天</span></Col> */}
                            {/* <Col ><span><Badge count={5} style={{ marginTop: -8 }}>消息</Badge></span></Col> */}
                            {/* <Col><Link to={`/mine`} className={styles.link}>我的</Link></Col> */}
                        </Row>
                    </Header>

                    <Content className={styles.content}>
                        {this.state.workDetailData.length > 0 && <h2 dangerouslySetInnerHTML={{ __html: this.state.workDetailData[0].title }} style={{ textAlign: 'center', color: 'lightblue', marginTop: 10 }}></h2>}
                        <div className={styles.description}>
                            {this.state.workDetailData.length > 0 && <div dangerouslySetInnerHTML={{ __html: this.state.workDetailData[0].content }}></div>}
                        </div>
                        <div className={styles.comment}>
                            <Row
                                gutter={24}
                                type="flex"
                            >
                                <Col span={1}>
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col span={18}>
                                    <TextArea
                                        rows={4}
                                        onChange={(e)=>{
                                            this.setState({comment: e.target.value})
                                        }}
                                    >

                                    </TextArea>
                                </Col>
                                <Col span={4} offset={1} style={{margin: 'auto 0'}}>
                                    <Button style={{display: 'block'}} onClick={this.publishCommentClick}>发表评论</Button>
                                    <Row type='flex' style={{marginTop: 10}}>
                                        <Col >是否匿名:</Col>
                                        <Col>
                                            <Switch style={{marginLeft: 10}} onChange={(value)=>{
                                                this.setState({isAnonymous: value});
                                            }} defaultChecked={false} checkedChildren={'是'} unCheckedChildren={'否'}></Switch>
                                        </Col>
                                    </Row>
                                    
                                </Col>
                            </Row>
                            {this.state.commentData.length > 0 && <List
                                itemLayout="vertical"
                                dataSource={this.state.commentData}
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <span style={{ marginLeft: '4em' }}>
                                                {formatUTC(item.createtime)}
                                                <Icon type='like-o' style={{ marginLeft: '1em' }} /> {item.good}
                                            </span>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.uid===0?'匿名':item.uid}
                                        />
                                        <span style={{ marginLeft: '4em' }}>{item.comment}</span>
                                    </List.Item>
                                )}
                            />
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ workModel, userModel, commentModel }) => ({
    workDetailData: workModel.workDetailData,
    userInfoData: userModel.userInfoData,
    commentData: commentModel.commentData,

}))(DetailComponent);