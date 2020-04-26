import React,{ Component} from 'react';
import { Row, Col} from 'antd';
import MyComponents from './components/index';
import { FormItemProp, FormItemState } from './interface';

import {validFun} from './utils/valid';

import styles from './formItem.less';

function isBase(val:any):boolean{
  return val && typeof val !== "object";
}
export default class FormItem extends Component<FormItemProp,FormItemState>{
  constructor(props:FormItemProp){
    super(props);
    // value可能是个对象，error的格式应该与value相同，在组件渲染时候对error进行渲染
    this.state = {
      value: "",
      error: "",
      validate: [],
    }
    let self = this;
    if(props.actions){
      props.actions.getValue = function(){
        return self.state.value;
      };
      props.actions.setValue = function(val){
        self.setState({value: val});
      }
      props.actions.valid = function(){
        const error = validFun(self.state.value, props.validate||[]);
        self.setState({error: error})
        
        return error === "" || JSON.stringify(error) === "{}";
      }
    }
    // console.log(props);
  }

  componentDidMount(){
    this.setState({
      value: this.props.defaultValue,
      validate: this.props.validate || ""
    });
  }

  handleChange = (val:any) => {
    console.log(val);
    this.setState({value: val},() => {
      if(this.props.actions.setValue){
        this.props.actions.setValue(this.state.value);
      }else{
        console.error('缺失setValue Function');
      }
      if(this.props.actions.valid){
        this.props.actions.valid();
      }else{
        console.error('缺失valid Function');
      }
    });
  }

  render(){
    const { dispatch, type, label, componentOption } = this.props;
    const { value, error } = this.state;
    const MyComponent = MyComponents[type];
    return(
      <Row className={styles['form-item']}>
          {/* default 8:16 */}
          <Col span={8} className={styles['formItem-label']}>
            <label>{label}:</label>
          </Col>
          <Col span={16} className={styles['formItem-main']}>
            {MyComponent ? (
              <MyComponent
                onChange={this.handleChange}
                dispatch={dispatch}
                value={value}
                componentOption={componentOption}
                error={error}
              />
              ) : (
                <strong>
                  组件{type}不存在
                </strong>
              )}
          </Col>
          {/* 基本的组件的error统一在这里做，复杂的放入业务组件中 */}
          {isBase(error) ? (
            <Col offset={8} span={16} className={styles['formItem-error']}>
              {error}
            </Col>
          ) : null}
        </Row>
    )
  }
}