/* eslint-disable react/no-unused-state */
/* eslint-disable @typescript-eslint/camelcase */
import React, { Component, ReactNode } from 'react';
import MyComponents from './components/index';
import { FormItemProp, FormItemState } from './interface';
import { validFun } from './utils/valid';
import { isEmpty, isObj, isArr } from './utils/func';
import styles from './formItem.less';

function isBase(val: any): boolean {
  return val && typeof val !== "object";
}
export default class FormItem extends Component<FormItemProp, FormItemState>{
  constructor(props: FormItemProp) {
    super(props);
    // value可能是个对象，error的格式应该与value相同，在组件渲染时候对error进行渲染
    this.state = {
      value: "",
      error: "",
      path: "",
      validate: [],
    }
    const self = this;
    if (props.actions) {
      props.actions.getValue = function getValue() {
        // 可以考虑在这个位置做一个拦截提交
        if(self.state.path === ".*" && props.input_props.type === "custom"){
          const key = props.input_props.renderData[0].key;
          return {
            value: {
              [key]: self.state.value[key],
              [`${key}Note`]: self.state.value[`${key}Note`]
            },
            path: self.state.path
          }
        }
        return {
          value: self.state.value,
          path: self.state.path
        }
      };
      props.actions.setValue = function setValue(val) {
        self.setState({ value: val });
      }
      props.actions.reset = function reset() {
        if(props.hidden){
          return;
        }
        if(isObj(self.state.value)){
          self.setState({ value: {} },() => {
          });
        }else if(isArr(self.state.value)){
          self.setState({ value: [] });
        }else{
          self.setState({ value: null });
        }
      }
      props.actions.valid = function valid() {
        const error = validFun(self.state.value, props.validate || "");
        // childrenError boolean
        let childrenError: any = true;
        if(props.type.indexOf("custom") !== -1){
          childrenError = self.childrenValid();
        }
        self.setState({ error });
        return isEmpty(error) && childrenError;
      }
    }
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      validate: this.props.validate || "",
      path: this.props.path
    });
  }
  
  // 外部页面更新引发
  componentDidUpdate(prevProps: FormItemProp) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        value: this.props.value,
        validate: this.props.validate || "",
        path: this.props.path
      });
    }
  }

  // 获取组件内部的自己的验证方法
  getChildrenValid = (func: any) => {
    if(func){
      this.childrenValid = func;
    }
  }

  // 承载组件的验证方法 - 相当于一个别名/引用
  childrenValid = () => {
    return true;
  }

  handleChange = (val: any, error: any = "") => {
    const { name, dispatch, hidden } = this.props;
    if(hidden){
      return;
    }
    this.setState({ value: val }, () => {
      if (name) { dispatch(name, "change", val); }
      const err = validFun(this.state.value, this.props.validate || "");
      this.setState({error: err || error});
    });
  }

  /**
   * 这个dispatch默认会使用本组件渲染的路径
   */
  handleDispatch = (eventName: string, args: any) => {
    const { name, dispatch } = this.props;
    dispatch(name, eventName, args);
  }



  // 渲染required星号
  renderAsterisk = (validate: string | object | RegExp | null): ReactNode => {
    let isRender = false;
    if (Object.prototype.toString.call(validate) === "[object String]") {
      isRender = (validate as string).indexOf("required") !== -1;
    }
    return isRender ? <span style={{ color: 'red' }}>*</span> : null
  }

  // renderHeader = () => {
  //   const { header_label, label } = this.props;
  //   const { validate } = this.state;
  //   return 
  // }

  render() {
    const { subscribe, type, label, input_props, unit, header_label } = this.props;
    const { value, error, validate } = this.state;
    const MyComponent = MyComponents[type];
    return (
      <div>
        {label !== "" && header_label ? (
          <div className={styles['form-item-header-label']}>
            <h1>
              <span>
                {this.renderAsterisk(validate)}{label}
              </span>
            </h1>
          </div>
        ) : null}
        <div className={styles['form-item']}>
          {label !== "" && !header_label ? (
            <div className={styles['form-item-inline-label']}>
              <label>{this.renderAsterisk(validate)}{label}:</label>
            </div>
          ) : null}
          {/*
            * full-main 代表label为header形式出现
            * main      label在同一行
            */}
          <div className={header_label ? styles['form-item-full-main'] : styles['form-item-main']}>
            {MyComponent ? (
              <MyComponent
                onChange={this.handleChange}
                dispatch={this.handleDispatch}
                // subscribe仅在一些 业务组件/内嵌表单组件 中使用
                subscribe={subscribe}
                value={value}
                input_props={input_props}
                error={error}
                getValidFun={this.getChildrenValid}
              />
            ) : (
                <strong>
                  组件{type}不存在
                </strong>
              )}
          </div>
          {unit !== "" ? (
            <div className={styles['form-item-unit']}>
              {unit}
            </div>
          ) : null}
        </div>
        {/* 基本的组件的error统一在这里做，复杂的放入业务组件中 */}
        {isBase(error) ? (
          <div className={styles['form-item-error']}>
            {error}
          </div>
        ) : null}
      </div>
    )
  }
}
