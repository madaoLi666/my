import React from 'react';
import MyForm from './MyForm/index';
import config from './localdata/config';
import data from './localdata/data';
import styles from './Home.less';

import { getFormData} from './MyForm/utils';

interface HomeState{
  formHandler:{
    [key:string]: any
  },
  data: any,
  config: any
}


export default class Home extends React.Component<{},HomeState>{
  constructor(props:any){
    super(props);
    this.state = {
      formHandler: {
        
      },
      data: data,
      config: config
    }
  }

  componentDidUpdate(){
    console.log("Home componentDidUpdate");
  }

  changeData = () => {
    this.setState({
      data: {
        g:{
          id: 8,
          a: "12",
          aNote: "14"
        }
      }
    })
  }

  changeConfig = () => {
    this.setState({
      config: [
        {
          name: "g", key: ".g", input_type: "custom", span: 24,
          header_label: true,
          label: "G",
          input_props: {
            config: [
              {name: "id", key: ".id", input_type: "input", span: 6, hidden: true},
              {name: "b", key: ".b", input_type: "input", label: "测试输入3", span: 6,},
              {name: "bNote", key: ".bNote", input_type: "input", label: "测试输入4", span: 6,}
            ]
          }
        }
      ]
    })
  }

  handleSubmit = () => {
    this.state.formHandler.submit().then(({validCode, res}:any) => {
      console.log(getFormData(res));
    });
  }

  render(){
    const { data, config } = this.state;
    return(
      <div className={styles.container}>
        <MyForm
          config={config}
          value={data}
          getFormHandler={(formHandler:any) => this.setState({formHandler})}
          submitChange={false}
        />
        <button
          onClick={this.changeConfig}
          type="button"
        >改变配置</button>
        <button
          onClick={this.changeData}
          type="button"
        >改变数据</button>
        <button
          type="button"
          onClick={this.handleSubmit}
        >提交</button>
      </div>
    )
  }
}
