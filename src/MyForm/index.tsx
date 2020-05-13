/* eslint-disable @typescript-eslint/camelcase */
import React,{Component} from 'react';
import {Row, Col} from 'antd';
import {MyFormProp, MyFormState, FormConfig} from './interface';
import { createFormHandler} from './form.js';
import FormItem from './formItem';
import styles from './index.less';

const defaultGutterConfig = {
  gutter: [0,16], // px
  justify: "start"
}
// TODO 后期应该考虑把这里的col和row换成自定义的样式实现
// TODO 优化换行
export function renderForm(config:Array<FormConfig> , formHandler:any, gridConfig:any = defaultGutterConfig){
  if(!config) throw new Error('config is undefined');
  if(Object.prototype.toString.call(config) !== '[object Array]') throw new Error(`Expect array but ${typeof config}`);
  
  let count = 0;    // 计算占比
  // let prevOffset = 0; 使用offset换行时，计算第i个元素用于上一行换行的offset数量
  let row = 0;
  const formDom = [];
  let spanArr = [];
  for(let i = 0 ;i < config.length; i++){
    const { span = 24, offset = 0 } = config[i];
    const { label = "", unit = "", input_props = {}, rules = "" , key = "", is_new_ros = false, name = "", header_label = false} = config[i];
    if(config[i].hidden){
      // eslint-disable-next-line no-continue
      continue;
    }
    count += span + offset;
    if(count > 24 || is_new_ros){
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
      // prevOffset = 24 - count + (span + offset);
      // 减去上一行换行所用offset
      count = span + offset;
      // count = span + (offset - prevOffset);
      row += 1;
    }
    spanArr.push(
      <Col  
        span={span} 
        offset={offset} 
        // offset={spanArr.length === 0 ? offset - prevOffset : offset} 
        key={`row-${row}|span-${count}`}
      >
        <FormItem 
          actions={formHandler[config[i].name].actions} 
          dispatch={formHandler.dispatch}
          defaultValue={config[i].value}
          type={config[i].input_type}
          label={label}
          header_label={header_label}
          unit={unit}
          input_props={input_props}
          validate={rules}
          path={key}
          name={name}
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
      formHandler: createFormHandler(props.config, props.submitChange)
    }
  }

  componentDidMount(){
    const { getFormHandler } = this.props;
    if(getFormHandler){
      getFormHandler(this.state.formHandler);
    }
  }

  componentDidUpdate(prevProps:any, prevState: any){
    const { getFormHandler } = this.props;
    if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
      if(getFormHandler){
        getFormHandler(this.state.formHandler);
      }
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