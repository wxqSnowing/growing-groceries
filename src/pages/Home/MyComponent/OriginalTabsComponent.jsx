import React, { PureComponent } from 'react';
import { Layout, Menu, Card, Carousel, Row, Col, Button, Input, Tabs, List, Avatar, Anchor, message } from 'antd';
import styles from './original_tabs.css';
import formatUTC from '../../utils/util'
import './global.css';
const { TabPane } = Tabs;
class OriginalTabsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    static getDeliverStateFromProps(props, state) {
        // console.log(props, '------');
    }
    componentDidMount() {

    }

    componentDidUpdate() {

    }
    componentWillUnmount() {

    }
    render() {
        const { props, state } = this;
        const { rankWorkData,recommendWorkData } = props;

        return (
            <Tabs defaultActiveKey="1" className={styles.tabs}>
                <TabPane tab="原创排行" key="1">
                    <List
                        itemLayout="horizontal"
                        loading={rankWorkData.length > 0 ? false : true}
                        dataSource={rankWorkData}
                        className={styles.rank_list}
                        renderItem={(item,index) => (
                            <List.Item
                                className={styles.rank_item}
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.history.push(`/detail?workid=${item.workid}`)
                                }}
                            >
                                <span style={index===0?{color:'pink', fontSize: '3em'}:index===1?{color:'lightblue', fontSize: '2em'}:index===2?{color:'gray', fontSize: '1.5em'}:{color:'lightgray', fontSize: '1.5em'}}>{index+1}</span>
                                <label>{item.title}</label>
                                <label>{item.uid}</label>
                                <img src={item.image} alt=""/>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="更多推荐" key="2">
                    <List
                        itemLayout="horizontal"
                        loading={recommendWorkData.length > 0 ? false : true}
                        dataSource={recommendWorkData}
                        renderItem={item => (
                            <List.Item 
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.history.push(`/detail?workid=${item.workid}`)
                                }}
                            >
                                <List.Item.Meta
                                    title={item.title}
                                    avatar={<Avatar src={item.image} />}
                                    description={formatUTC(item.createtime)}
                                />
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        )
    }
}

export default OriginalTabsComponent;