
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Divider, Row, Col, Table, Button, Drawer, Form, Input } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import formatUTC from '../utils/util'
import cookie from 'react-cookies'
import { menuList } from '../Home/global'
import { typeData, subtypeData, tagsData } from '../Create/myconf'

const { Header, Content, Footer } = Layout;
const {TextArea} = Input;

class Mine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            data: [],
            delWorkResult: '',
            timelineInfoData: [],
            uid: parseInt(cookie.load('uid')) || 0,
            day: 1,
            drawerVisible: false,
            username: '',
            hobby: '',
            constellatory: '',
            major: '',
            email: '',
            mobile: '',
            address: '',
            autograph: ''
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
                    day: this.props.userInfoData.regdate,
                    username: this.props.userInfoData.username,
                    hobby: this.props.userInfoData.hobby,
                    constellatory: this.props.userInfoData.constellatory,
                    major: this.props.userInfoData.major,
                    email: this.props.userInfoData.email,
                    mobile: this.props.userInfoData.mobile,
                    address: this.props.userInfoData.address,
                    autograph: this.props.userInfoData.autograph
                }, () => {
                })
            });

            // this.props.dispatch({
            //     type: 'mineModel/getTimelineInfo',
            // }).then(() => {
            //     this.setState({
            //         timelineInfoData: this.props.timelineInfoData
            //     }, () => {
            //     })
            // });
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

    onClickEdit = (e) => {
        console.log('edit basic info');
        this.setState({
            drawerVisible: true,
        });
    }
    onClickCloseDrawer = (e) => {
        if(e.target.id==='update_confirm'){
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('输入的信息: ', values);
                    this.props.dispatch({
                        type: 'userModel/updateBasciInfo',
                        payload: {
                            username: values.username,
                            hobby: values.hobby,
                            constellatory: values.constellatory,
                            major: values.major,
                            email: values.email,
                            mobile: values.mobile,
                            address: values.address,
                            autograph: values.autograph,
                            uid: this.state.uid
                        }
                    }).then(()=>{

            this.props.dispatch({
                type: 'userModel/queryCurrent',
                payload: {
                    uid: this.state.uid
                }
            }).then(() => {
                this.setState({
                    userInfoData: this.props.userInfoData,
                    day: this.props.userInfoData.regdate,
                    username: this.props.userInfoData.username,
                    hobby: this.props.userInfoData.hobby,
                    constellatory: this.props.userInfoData.constellatory,
                    major: this.props.userInfoData.major,
                    email: this.props.userInfoData.email,
                    mobile: this.props.userInfoData.mobile,
                    address: this.props.userInfoData.address,
                    autograph: this.props.userInfoData.autograph
                }, () => {
                })
            });
                    })
                }
            });
        }
        this.setState({
            drawerVisible: false,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: () => (<span style={{ color: 'lightblue' }}>文章标题</span>),
                dataIndex: 'title',
                width: '20%',
                key: 'title',
                render: (text, record, index) => {
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
                render: (text, record, index) => {
                    let arr = text.split('#');
                    let str = '';
                    for (let i in arr) {
                        for (let j in subtypeData) {
                            if (subtypeData[j].key === arr[i]) {
                                str += subtypeData[i].value;
                                if (i <= arr.length - 2)
                                    str += '、';
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
                render: (text, record, index) => {
                    let arr = text.split('#');
                    let str = '';
                    for (let i in arr) {
                        for (let j in tagsData) {
                            if (tagsData[j].key === arr[i]) {
                                str += tagsData[i].value;
                                if (i <= arr.length - 2)
                                    str += '、';
                            } else {
                                str += arr[j];
                                if (i <= arr.length - 2)
                                    str += '、';
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
        ];

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        return (
            <Layout theme='light'>
                <Layout>
                    <Header className={styles.header}>
                        <Row
                            gutter={24}
                            type="flex"
                        >
                            <Col span={2} ><Link to={`/home`} className={styles.link}>首页</Link></Col>
                            <Col span={2} offset={1}><Link to={`/create`} className={styles.link}>去创作</Link></Col>
                            <Col offset={13} span={4}><span style={{ color: 'red' }}>加入生活杂货铺{Math.floor(((new Date().getTime()) - (new Date(this.state.day).getTime())) / (24 * 1000 * 3600))}天{}</span></Col>
                            <Col span={2}><Button className={styles.loginout_btn} onClick={this.logout}>退出</Button></Col>
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
                                        <Col span={21}>
                                            昵称：<label className={styles.username_item}>{this.state.userInfoData.username}</label>
                                        </Col>
                                        <Col span={3}><Button className={styles.edit_btn} onClick={this.onClickEdit}>编辑</Button></Col>
                                    </Row>
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        className={styles.row}
                                    >
                                        <Col span={6}>
                                            爱好：{this.state.userInfoData.hobby || '暂无'}
                                        </Col>
                                        <Col span={6}>
                                            星座：{this.state.userInfoData.constellatory || '暂无'}
                                        </Col>
                                        <Col span={6}>
                                            专业：{this.state.userInfoData.major || '暂无'}
                                        </Col>
                                        <Col span={6}>
                                            电话：{this.state.userInfoData.mobile || '暂无'}
                                        </Col>
                                        
                                    </Row>
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        className={styles.row}
                                    >
                                        <Col span={6}>
                                            地址：{this.state.userInfoData.address || '暂无'}
                                        </Col>
                                        <Col span={6}>
                                            邮箱：{this.state.userInfoData.email || '暂无'}
                                        </Col>
                                        <Col span={12}>
                                            签名：{this.state.userInfoData.autograph || '暂无'}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.wrok_table}>
                            <Table
                                rowKey="workid"
                                columns={columns}
                                dataSource={this.state.data}
                            >
                            </Table>
                        </div>
                    </Content>

                    <Drawer
                        title="个人信息"
                        width={400}
                        onClose={this.onClickCloseDrawer}
                        visible={this.state.drawerVisible}
                        bodyStyle={{ paddingBottom: 20}}
                    >
                        <Form
                            {...formItemLayout}
                        >
                           <Form.Item 
                                label="昵称"
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ 
                                        required: true, message: '请输入您的昵称' 
                                    }],
                                    initialValue: this.state.username
                                })(<Input placeholder="请输入您的昵称" />)}
                            </Form.Item>

                            <Form.Item 
                                label="爱好"
                            >
                                {getFieldDecorator('hobby', {
                                    rules: [{ 
                                        required: false, message: '请输入您的爱好' 
                                    }],
                                    initialValue: this.state.hobby
                                })(<Input placeholder="请输入您的爱好" />)}
                            </Form.Item>

                            <Form.Item 
                                label="星座"
                            >
                                {getFieldDecorator('constellatory', {
                                    rules: [{ 
                                        required: false, message: '请输入您的星座' 
                                    }],
                                    initialValue: this.state.constellatory
                                })(<Input placeholder="请输入您的星座" />)}
                            </Form.Item>

                            <Form.Item 
                                label="专业"
                            >
                                {getFieldDecorator('major', {
                                    rules: [{ 
                                        required: false, message: '请输入您的专业' 
                                    }],
                                    initialValue: this.state.major
                                })(<Input placeholder="请输入您的专业" />)}
                            </Form.Item>

                            <Form.Item 
                                label="邮箱"
                            >
                                {getFieldDecorator('email', {
                                    rules: [{ 
                                        required: false, message: '请输入您的邮箱' 
                                    }],
                                    initialValue: this.state.email
                                })(<Input placeholder="请输入您的邮箱" />)}
                            </Form.Item>
                            <Form.Item 
                                label="电话"
                            >
                                {getFieldDecorator('mobile', {
                                    rules: [{ 
                                        required: false, message: '请输入您的联系方式' 
                                    }],
                                    initialValue: this.state.mobile
                                })(<Input placeholder="请输入您的联系方式" />)}
                            </Form.Item>                    
                            <Form.Item 
                                label="地址"
                            >
                                {getFieldDecorator('address', {
                                    rules: [{ 
                                        required: false, message: '请输入您的地址' 
                                    }],
                                    initialValue: this.state.address
                                })(<Input placeholder="请输入您的地址" />)}
                            </Form.Item>
                            <Form.Item 
                                label="签名"
                            >
                                {getFieldDecorator('autograph', {
                                    rules: [{ 
                                        required: false, message: '请输入您的签名' 
                                    }],
                                    initialValue: this.state.autograph
                                })(<TextArea placeholder="请输入您的签名" />)}
                            </Form.Item>
                         </Form>
                        <div
                            className={styles.basci_info_edit}
                        >
                            <Button onClick={this.onClickCloseDrawer} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button id="update_confirm" onClick={this.onClickCloseDrawer} type="primary">
                                提交
                            </Button>
                        </div>
                    </Drawer>

                    <Footer style={{ textAlign: 'center', fontSize: 5, marginLeft: -(this.state.collapsed ? 80 : 200) }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}
const MineComponent = Form.create({ name: 'mine' })(Mine);
export default connect(({ mineModel, userModel, workModel }) => ({
    mineWorkData: mineModel.mineWorkData,
    userInfoData: userModel.userInfoData,
    delWorkResult: workModel.delWorkResult,
}))(MineComponent);