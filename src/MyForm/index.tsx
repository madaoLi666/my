import React,{Component} from 'react';
import {Row, Col} from 'antd';
import {MyFormProp, MyFormState, FormConfig} from './interface';
import { createFormHandler} from './form.js';
import FormItem from './formItem'

export function renderForm(config:Array<FormConfig> , formHandler:any){
  if(!config) throw new Error('config is undefined');
  if(Object.prototype.toString.call(config) !== '[object Array]') throw new Error(`Expect array but ${typeof config}`);
  
  let count = 0;
  let row = 0;
  let formDom = [];
  let spanArr = [];
  for(let i = 0 ;i < config.length; i++){
    if(config[i].hidden){
      continue;
    }
    count += config[i].span + (config[i].offset || 0);
    if(count > 24){
      formDom.push(
        <Row key={`row-${row}`}>{spanArr}</Row>
      )
      spanArr = []; 
      count = config[i].span + (config[i].offset || 0);
      row += 1;
    }
    spanArr.push(
      <Col span={config[i].span} offset={config[i].offset} key={`row-${row}|span-${count}`}>
        <FormItem 
          actions={formHandler[config[i].path].actions} 
          dispatch={formHandler.dispatch}
          defaultValue={config[i].value}
          type={config[i].type}
          label={config[i].label}
        />
      </Col>
    )
  }
  if(spanArr){
    formDom.push(<Row key={`row-${row}`}>{spanArr}</Row>)
  }
  return (<div style={{width: '100%'}}>{formDom}</div>);
}



export default class MyForm extends Component<MyFormProp, MyFormState>{
  constructor(props:MyFormProp){
    super(props);
    this.state = {
      formHandler: createFormHandler(props.config)
    }
  }

  componentDidMount(){
    const { getFormHandler } = this.props;
    if(getFormHandler){
      getFormHandler(this.state.formHandler);
    }
  }

  // handleSubmit = () => {
    
  // }

  render(){
    return(
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          {renderForm(this.props.config, this.state.formHandler)}
        </div>
      </div>
    )
  }
}