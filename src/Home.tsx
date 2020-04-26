import * as React from 'react';
import {Input} from 'antd'
import MyForm from './MyForm/index';
import config from './localdata/config';
import data from './localdata/data';
import { getRenderData } from './MyForm/utils';

import './Home.css';

interface HomeState{
  formHandler:{
    [key:string]: any
  }
}


export default class Home extends React.Component<{},HomeState>{
  constructor(props:any){
    super(props);
    this.state = {
      formHandler: {
        
      }
    }
  }

  handleSubmit = () => {
    const res = this.state.formHandler.submit();
    console.log(res);
  }

  render(){
    const myConfig = getRenderData(config, data);
    // 不要再页面render中尝试取formHandler的值，因为这个时候formItem初始化还没有完成
    return(
      <div>
        <MyForm
          config={myConfig}
          getFormHandler={(formHandler) => this.setState({formHandler})}
        />
        <button
          // onClick={() => this.state.formHandler.submit()}
          onClick={this.handleSubmit}
        >提交</button>
      </div>
    )
  }
}
