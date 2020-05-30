import React from 'react';
import { Icon } from 'antd';

const mySvg = () => (
    <svg t="1590858418442" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1514" width="35" height="35"><path d="M512 719c228.6 0 414-185.4 414-414H98c0 228.6 185.4 414 414 414z" fill="#9AD19A" p-id="1515"></path><path d="M512 675.5c204.6 0 370.5-165.9 370.5-370.5h-741c0 204.6 165.9 370.5 370.5 370.5z" fill="#F7645C" p-id="1516"></path><path d="M891.5 296H89v9c0 233.2 189.8 423 423 423s423-189.8 423-423v-9h-43.5z m-18.1 18C868.6 509.2 708.3 666.5 512 666.5S155.4 509.2 150.6 314h722.8zM512 710c-220.3 0-400.1-176.8-404.9-396h25.6c4.8 205.1 173 370.5 379.3 370.5S886.5 519.1 891.3 314h25.6C912.1 533.2 732.3 710 512 710z" fill="#384D68" p-id="1517"></path><path d="M244.61 391.318l17.536-17.536 12.727 12.728-17.536 17.536zM595.048 384.24l17.536-17.535 12.728 12.727-17.537 17.536zM692.621 531.898l17.536-17.536 12.728 12.728-17.536 17.536zM451.045 505.622l17.536-17.536 12.728 12.727-17.536 17.537zM375.91 386.5l12.723-12.731 17.541 17.53-12.724 12.732zM321.757 496.619l12.728-12.728 17.536 17.536-12.728 12.728zM469.65 611.505l12.728-12.728 17.536 17.536-12.728 12.728zM590.23 476.418l12.728-12.728 17.536 17.536-12.728 12.728zM793.376 370.662l12.728-12.728 17.536 17.537-12.728 12.727zM603.826 582.716l12.727-12.728 17.536 17.536-12.727 12.728z" fill="#384D68" p-id="1518"></path></svg>
);
const MyIcon = props => <Icon component={mySvg} {...props} />;

class NotesIcon extends React.Component {

    render() {
        return (
            <MyIcon> </MyIcon>
        );
    }
}

export default NotesIcon;