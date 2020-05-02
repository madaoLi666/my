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
// TODO 后期应该考虑把这里的col和row换成自定义的样式实现
export function renderForm(config:Array<FormConfig> , formHandler:any, gridConfig:any = defaultGutterConfig){
  if(!config) throw new Error('config is undefined');
  if(Object.prototype.toString.call(config) !== '[object Array]') throw new Error(`Expect array but ${typeof config}`);
  
  let count = 0;    // 计算占比
  let prevOffset = 0; // 使用offset换行时，计算第i个元素用于上一行换行的offset数量
  let row = 0;
  let formDom = [];
  let spanArr = [];
  for(let i = 0 ;i < config.length; i++){
    if(config[i].hidden){
      continue;
    }
    count += config[i].span + config[i].offset;
    // console.log(count);
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
      // 计算上一行换行的offset数量
      prevOffset = 24 - count + (config[i].span + config[i].offset);
      // 减去上一行换行所用offset
      count = config[i].span + (config[i].offset - prevOffset);
      row += 1;
    }
    spanArr.push(
      <Col 
        span={config[i].span} 
        // 同上一条注释
        offset={spanArr.length === 0 ? config[i].offset - prevOffset : config[i].offset} 
        key={`row-${row}|span-${count}`}
      >
        <FormItem 
          actions={formHandler[config[i].key].actions} 
          dispatch={formHandler.dispatch}
          defaultValue={config[i].value}
          type={config[i].input_type}
          label={config[i].label}
          unit={config[i].unit}
          input_props={config[i].input_props}
          validate={config[i].rules || ""}
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