import * as React from 'react';
import {Input} from 'antd'
import MyForm from './MyForm/index';
import config from './localdata/config';
import data from './localdata/data';
import { getRenderData } from './MyForm/utils';

import './Home.css';

export default class Home extends React.Component{

  render(){
    const myConfig = getRenderData(config, data);
    console.log(myConfig);
    return(
      <div>
        <MyForm
          config={myConfig}
        />
      </div>
    )
  }
}
