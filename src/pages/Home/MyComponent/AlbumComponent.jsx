import React, { PureComponent } from 'react';
import { Card, Row, Col, Button } from 'antd';
import styles from './excerpt.css';
import AlbumIcon from '../Icon/AlbumIcon';
import './global.css';

class AlbumComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '相册',
            more: '进入专题',
            data: [],
        }
    }
    static getDeliverStateFromProps(props, state) {
        // console.log(props, '------');
    }
    componentDidMount() {

    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('update');
    //     return null;
    // }
    componentDidUpdate() {

    }
    componentWillUnmount() {

    }
    render() {
        const { props, state } = this;
        const { more } = state;
        const { data, title } = props;

        const onClickMore = () => {
            console.log('more');
        }

        const onClickCard = (item, e) => {
            console.log(item);
            props.history.push(`/detail?workid=${item.workid}`)
        }
        return (
            <Card
                title={<Row type="flex" align="bottom">
                    <Col span={2} className={styles.excerpt_icon}><AlbumIcon />{title}</Col>
                    <Col span={3} offset={19}><Button onClick={onClickMore} className={styles.excerpt_more_btn}>{more}</Button></Col>
                </Row>}
                loading={data.length > 0 ? false : true}
                className={styles.excerpt_card}
                bordered={false}
            >
                {data.length > 0 && data.map((item) => (
                    <Card.Grid
                        key={item.workid}
                        className={styles.excerpt_card_gird}
                        onClick={(e) => {
                            onClickCard(item, e);
                        }}
                    >
                        <img className={styles.excerpt_care_img} title={item.title} alt={item.title} src={item.image} ></img>
                    <div className={styles.excerpt_care_div}><h5>《{item.title}》</h5><span>{item.tags}</span><span>{item.subtype}</span><div>{item.description?item.description:'test'}</div><span>——{item.uid}</span></div>
                        <label>♡ {item.likenums}</label><label>浏览次数{item.viewnums}</label>
                    </Card.Grid>
                ))}
            </Card>
        )
    }
}

export default AlbumComponent;