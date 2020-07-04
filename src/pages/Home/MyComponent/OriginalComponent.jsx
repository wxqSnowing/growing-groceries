import React, { PureComponent } from 'react';
import { Card, Row, Col, Button } from 'antd';
import styles from './original.css';
import OriginalIcon from '../Icon/OriginalIcon';
import './global.css';

class OriginalComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '原创',
            change: '换一换',
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
        const { title, change } = state;
        const { data } = props;

        const onClickChange = () => {
            console.log('more');
        }

        const onClickCard = (item, e) => {
            console.log(item);
            props.history.push(`/detail?workid=${item.workid}`)
        }
        return (
            <Card
                title={<Row type="flex" align="bottom">
                    <Col span={2} className={styles.original_icon}><OriginalIcon />{title}</Col>
                    <Col span={3} offset={19}><Button onClick={onClickChange} className={styles.original_change_btn}>{change}</Button></Col>
                </Row>}
                loading={data.length > 0 ? false : true}
                className={styles.original_card}
                bordered={false}
            >
                {data.length > 0 && data.map((item) => (
                    <Card.Grid
                        key={item.workid}
                        className={styles.original_card_gird}
                        onClick={(e) => {
                            onClickCard(item, e);
                        }}
                    >        
                        <img className={styles.original_card_img} title={item.title} alt={item.title} src={item.image}></img>
                        <h5>《{item.title}》</h5>
                            <label>♡ {item.likenums}</label>
                            <label>浏览次数{item.viewnums}</label>
                        {/* <div>
                           
                        </div> */}
                    </Card.Grid>
                ))}
            </Card>
        )
    }
}

export default OriginalComponent;