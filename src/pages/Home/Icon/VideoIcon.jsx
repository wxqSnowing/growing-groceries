import React from 'react';
import { Icon } from 'antd';

const mySvg = () => (
    <svg t="1590858825606" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1793" width="35" height="35"><path d="M663.2 370.5H360.8l17.8-122.1h266.8z" fill="#FFD991" p-id="1794"></path><path d="M160.2 279.5h85.3v106h-85.3z" fill="#F7645C" p-id="1795"></path><path d="M111.7 316.9h800.6v458.7H111.7z" fill="#FFD991" p-id="1796"></path><path d="M512 546.3m-182.4 0a182.4 182.4 0 1 0 364.8 0 182.4 182.4 0 1 0-364.8 0Z" fill="#9AD19A" p-id="1797"></path><path d="M512 546.3m-129 0a129 129 0 1 0 258 0 129 129 0 1 0-258 0Z" fill="#E6F5FF" p-id="1798"></path><path d="M488.7 634.9c-32.1-8.4-57.3-33.7-65.5-65.9" fill="#E6F5FF" p-id="1799"></path><path d="M486.5 643.6c-35.3-9.3-62.9-37-71.9-72.3l17.4-4.4c7.4 29 30 51.8 59 59.4l-4.5 17.3zM794.3 376.5h75.3v18h-75.3z" fill="#384D68" p-id="1800"></path><path d="M512 737.7c105.5 0 191.4-85.9 191.4-191.4S617.5 354.9 512 354.9s-191.4 85.9-191.4 191.4S406.5 737.7 512 737.7z m0-364.8c95.6 0 173.4 77.8 173.4 173.4 0 95.6-77.8 173.4-173.4 173.4-95.6 0-173.4-77.8-173.4-173.4 0-95.6 77.8-173.4 173.4-173.4z" fill="#384D68" p-id="1801"></path><path d="M512 684.3c76.1 0 138-61.9 138-138s-61.9-138-138-138-138 61.9-138 138 61.9 138 138 138z m0-258c66.2 0 120 53.8 120 120s-53.8 120-120 120-120-53.8-120-120 53.8-120 120-120z" fill="#384D68" p-id="1802"></path><path d="M663.2 307.9l-10-68.6H370.8l-10 68.6H254.5v-37.4H151.2v37.4h-48.5v476.7h818.6V307.9H663.2z m-276.9-50.5h251.3L645 308H379l7.3-50.6z m-217.1 31.1h67.3v19.4h-67.3v-19.4z m734.1 340.3H699.4v18h203.9v119.8H120.7V646.8h203.9v-18H120.7V325.9h782.6v302.9z" fill="#384D68" p-id="1803"></path></svg>
);
const MyIcon = props => <Icon component={mySvg} {...props} />;

class VideoIcon extends React.Component {

    render() {
        return (
            <MyIcon> </MyIcon>
        );
    }
}

export default VideoIcon;