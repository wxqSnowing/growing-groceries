
import 'antd/dist/antd.css';
import styles from './index.css';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import React from 'react';

import { connect } from 'dva'; 
import { Link } from 'umi';
import cookie from 'react-cookies'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class AboutComponent extends React.Component {
    
    rootSubmenuKeys = ['collect', 'bit'];

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            data: {},
            openKeys: [''],
            menuData: {
                home: '/home',
                excerpt: '/collect/excerpt',
                original: '/collect/original',
                notes: '/collect/notes',
                video: '/bit/video',
                album: '/bit/album',
                about: '/about'
            }
        };
    }

    componentDidMount(){
        let collapsedStatus = cookie.load("collapsedStatus");
        if(typeof(collapsedStatus)!=='undefined'){
            let flag = true;
            if(collapsedStatus==='false'){
                flag = false;
            }
            this.setState({
                collapsed: flag
            })
        }

        const { dispatch } = this.props;
        if (dispatch) {
          dispatch({
            type: 'user/fetchCurrent',
          }).then(()=>{
              this.setState({
                  data: this.props.currentUser
              })
          });
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        },()=>{
            cookie.save("collapsedStatus", this.state.collapsed, {path:"/"});
        });
    };

    onMenuClick = (event) => {
        const { key } = event;
        let pathName = this.state.menuData[key]
        this.props.history.push(pathName)
      };


    render() {
        // const {loading, currentUser} = this.props;
        
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ background: '#fff'}}>
                    <div className={styles.logo} />
                    <Menu theme="light" defaultSelectedKeys={['about']} onOpenChange={this.onOpenChange} mode="inline" onClick={this.onMenuClick}>
                        <Menu.Item key="home">
                            <Icon type="home" />
                            <span>主页</span>
                        </Menu.Item>
                        <SubMenu
                            key="collect"
                            title={
                                <span>
                                    <Icon type="read" />
                                    <span>收集盒</span>
                                </span>
                            }
                        >
                            <Menu.Item key="excerpt">摘录</Menu.Item>
                            <Menu.Item key="original">原创</Menu.Item>
                            <Menu.Item key="notes">随记</Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="bit"
                            title={
                                <span>
                                    <Icon type="video-camera" />
                                    <span>点滴</span>
                                </span>
                            }
                        >
                            <Menu.Item key="album">相册</Menu.Item>
                            <Menu.Item key="video">视频</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="about">
                            <Icon type="coffee" />
                            <span>关于</span>
                        </Menu.Item>
                    </Menu>

                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>

                    <Breadcrumb style={{ margin: '16px 16px' }}>
                        <BreadcrumbItem>关于</BreadcrumbItem>
                        <BreadcrumbItem><Link to='/about'>联系方式</Link></BreadcrumbItem>
                    </Breadcrumb>


                    <Content
                        style={{
                            margin: '8px 16px',
                            padding: 16,
                            background: '#fff',
                            minHeight: 500,
                        }}
                    >
                        关于
                        {this.state.data.group}
              </Content>
                    <Footer style={{ textAlign: 'center', fontSize: 5 }}>Snow Blog ©2020 Created by Shirly</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(({ user }) => ({
    currentUser: user.currentUser,
  }))(AboutComponent);