import React from 'react';
import 'antd/dist/antd.css';

import HomeComponent from './Home/HomeComponent'

class BaseComponent extends React.Component {
   
    render() {
        return (
            <HomeComponent />
        );
    }
}

export default BaseComponent;
