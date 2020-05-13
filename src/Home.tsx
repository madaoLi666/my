import React from 'react';
import MyForm from './MyForm/index';
import config from './localdata/config';
import data from './localdata/data';
import styles from './Home.less';

import { getRenderData, getFormData} from '@/MyForm/utils';

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


  componentDidUpdate(){
    const { formHandler } = this.state;
    formHandler.subscribe("lmp", "change", (val: any) => {
      formHandler['sureEdd'].actions.setValue("2020-01-01");
    });
    // console.log(formHandler);
  }


  handleSubmit = () => {
    this.state.formHandler.submit().then(({validCode, res}:any) => {
      console.log(res);
      console.log(getFormData(res));
      // if(!validCode){
      // }
    });
  }

  render(){
    const myConfig = getRenderData(config, data);
    // 不要再页面render中尝试取formHandler的值，因为这个时候formItem初始化还没有完成
    return(
      <div className={styles.container}>
        <MyForm
          config={myConfig}
          getFormHandler={(formHandler:any) => this.setState({formHandler})}
          submitChange={false}
        />
        <button
          // onClick={() => this.state.formHandler.submit()}
          type="button"
          onClick={this.handleSubmit}
        >提交</button>
      </div>
    )
  }
}
