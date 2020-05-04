import React,{ Component, ReactNode} from 'react';
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
        const error = validFun(self.state.value, props.validate || "");
        self.setState({error: error});
        return error === "" || JSON.stringify(error) === "{}";
      }
    }
  }

  componentDidMount(){
    this.setState({
      value: this.props.defaultValue,
      validate: this.props.validate || ""
    });
  }

  handleChange = (val:any) => {
    this.setState({value: val},() => {
      console.log(val);
      if(this.props.actions){
        if(this.props.actions.setValue){
          this.props.actions.setValue(this.state.value);
        }else{
          console.error('缺失setValue Function');
        }
        // TODO 这个位置先将object/array的valid不在handlechange时触发，以后可以加入trigger去做响应
        if(this.props.actions.valid){
          if(typeof val === "object"){
            console.warn('校验对象为引用类型,暂时不做onChange校验');
          }else{
            this.props.actions.valid();
          }
        }else{
          console.error('缺失valid Function || ');
        }
      }
    });
  }

  // 渲染required星号
  renderAsterisk = (validate: string|object|RegExp|null):ReactNode => {
    let isRender = false;
    if(Object.prototype.toString.call(validate) === "[object String]"){
      isRender =  (validate as string).indexOf("required") !== -1;
    }
    return isRender ? <span style={{color: 'red'}}>*</span>: null
  }

  render(){
    const { dispatch, type, label, input_props, unit } = this.props;
    const { value, error, validate } = this.state;
    const MyComponent = MyComponents[type];
    return(
      // <Row className={styles['form-item']}>
      //     {/* default 8:16 
      //       * TODO 
      //       * config by user
      //       * make a function to calc it
      //       * 现在为了布局的简便，先将label和unit固定下来
      //       */}
      //     <Col span={8} className={styles['formItem-label']}>
      //       <label>
      //         {this.renderAsterisk(validate)}
      //         {label}:
      //       </label>
      //     </Col>
      //     <Col span={14} className={styles['formItem-main']}>
      //       {MyComponent ? (
      //         <MyComponent
      //           onChange={this.handleChange}
      //           dispatch={dispatch}
      //           value={value}
      //           input_props={input_props}
      //           error={error}
      //         />
      //         ) : (
      //           <strong>
      //             组件{type}不存在
      //           </strong>
      //         )}
      //     </Col>
      //     <Col span={2}>{unit}</Col>
      //     {/* 基本的组件的error统一在这里做，复杂的放入业务组件中 */}
      //     {isBase(error) ? (
      //       <Col offset={8} span={16} className={styles['formItem-error']}>
      //         {error}
      //       </Col>
      //     ) : null}
      //   </Row>
      <div>
        {/* 业务组件与通用组件样式区别 */}
        <div className={type.indexOf('b-') === -1 ? styles['form-item'] : styles['business-component']}>
          { label !== "" ? (
            <div className={styles['formItem-label']}>
            <label>
              {this.renderAsterisk(validate)}
              {label}:
            </label>
            </div>
          ) :null}
          <div className={styles['formItem-main']}>
            {MyComponent ? (
              <MyComponent
                onChange={this.handleChange}
                dispatch={dispatch}
                value={value}
                input_props={input_props}
                error={error}
              />
              ) : (
                <strong>
                  组件{type}不存在
                </strong>
              )}
          </div>
          {unit !== "" ? (
            <div className={styles['formItem-unit']}>
              {unit}
            </div>
          ):null}
        </div>
        {/* 基本的组件的error统一在这里做，复杂的放入业务组件中 */}
        {isBase(error) ? (
            <div className={styles['formItem-error']}>
              {error}
            </div>
          ) : null}
      </div>
    )
  }
}