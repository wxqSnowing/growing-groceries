import React, { PureComponent } from 'react';
import { Card, Row, Col, Button } from 'antd';
import styles from './notes.css';
import NotesIcon from '../Icon/NotesIcon';
import './global.css';

class NotesComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '随记',
            change: '更多',
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
                    <Col span={2} className={styles.notes_icon}><NotesIcon />{title}</Col>
                    <Col span={3} offset={19}><Button onClick={onClickChange} className={styles.notes_more_btn}>{change}</Button></Col>
                </Row>}
                loading={data.length > 0 ? false : true}
                className={styles.notes_card}
                bordered={false}
            >
                {data.length > 0 && data.map((item) => (
                    <Card.Grid
                        key={item.workid}
                        className={styles.notes_card_gird}
                        onClick={(e) => {
                            onClickCard(item, e);
                        }}
                    >
                        <div className={styles.item_head}><label>《{item.title}》</label><span><label>浏览数{item.viewnums}</label></span></div>
                        <div className={styles.description}>{item.description}</div>
                    </Card.Grid>
                ))}
            </Card>
        )
    }
}

export default NotesComponent;