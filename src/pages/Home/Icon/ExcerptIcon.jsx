import React from 'react';
import { Icon } from 'antd';

const mySvg = () => (
    <svg t="1590850009316" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1235" width="35" height="35"><path d="M512 832.9c-144.2 0-262.1-118-262.1-262.1l22.5-162.5h479.2l22.5 162.5c0 144.2-117.9 262.1-262.1 262.1z" fill="#FFD991" p-id="1236"></path><path d="M569.333 699.265l12.728-12.728 21.213 21.213-12.728 12.728zM638.784 629.862l12.732-12.726 21.21 21.22-12.732 12.725z" fill="#384D68" p-id="1237"></path><path d="M595.1 194.2l-93.2 73.5c-10.8 8.5-4.8 25.9 9 25.9h186.3c13.8 0 19.8-17.4 9-25.9L613 194.2c-5.2-4.1-12.7-4.1-17.9 0z" fill="#9AD19A" p-id="1238"></path><path d="M759.4 399.2H613v-96.7h84.2c10.2 0 18.9-6.2 22.2-15.8 3.3-9.6 0.3-19.9-7.7-26.1l-93.2-73.5c-8.6-6.8-20.5-6.8-29.1 0l-93.2 73.5c-8 6.3-11 16.5-7.7 26.1 3.3 9.6 12 15.8 22.2 15.8H595v96.7H405.7v-89.7l-143.1-68.6-7.8 16.2 132.9 63.7v78.4H264.6L241 569.5l-0.1 1.2c0 149.5 121.6 271.1 271.1 271.1s271.1-121.6 271.1-271.1l-23.7-171.5zM505.7 280.9c-0.4-1.1-1-3.9 1.8-6.1l13.3-10.5h79.8v-18h-56.9l57.1-45c1-0.8 2.2-1.2 3.4-1.2s2.4 0.4 3.4 1.2l93.2 73.5c2.8 2.2 2.2 5 1.8 6.1-0.4 1.1-1.7 3.7-5.2 3.7H510.9c-3.6 0-4.8-2.6-5.2-3.7z m6.3 543c-139.4 0-252.8-113.2-253.1-252.5l11.7-84.4h312.8v-18H273.1l7.2-51.8h463.5l21.4 154.2c-0.4 139.3-113.8 252.5-253.2 252.5z" fill="#384D68" p-id="1239"></path><path d="M613.5 469h62.7v18h-62.7z" fill="#384D68" p-id="1240"></path></svg>
);
const MyIcon = props => <Icon component={mySvg} {...props} />;

class ExcerptIcon extends React.Component {

    render() {
        return (
            <MyIcon> </MyIcon>
        );
    }
}

export default ExcerptIcon;