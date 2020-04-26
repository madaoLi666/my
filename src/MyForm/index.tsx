import React,{Component} from 'react';
import {Row, Col} from 'antd';
import {MyFormProp, MyFormState, FormConfig} from './interface';
import { createFormHandler} from './form.js';
import FormItem from './formItem';

import styles from './index.less';

import {validFun} from './utils/valid';

const defaultGutterConfig = {
  gutter: [0,16], // px
  justify: "left"
}
export function renderForm(config:Array<FormConfig> , formHandler:any, gridConfig:any = defaultGutterConfig){
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
        <Row 
          key={`row-${row}`} 
          {...gridConfig}
        >
            {spanArr}
        </Row>
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
          componentOption={config[i].componentOption}
          validate={config[i].componentOption.valid || []}
        />
      </Col>
    )
  }
  if(spanArr){
    formDom.push(<Row key={`row-${row}`} {...gridConfig}>{spanArr}</Row>)
  }
  return formDom;
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

  render(){
    return(
      <div className={styles['my-form']}>
        <div>
          {renderForm(this.props.config, this.state.formHandler)}
        </div>
      </div>
    )
  }
}