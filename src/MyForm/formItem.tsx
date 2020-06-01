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
    // console.log("FormItem constructor");
    // this.props.getActions({
    //   getValue: this.getValue,
    //   setValue: this.setValue,
    //   reset: this.reset,
    //   valid: this.valid
    // })
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      validate: this.props.validate || "",
      path: this.props.path
    });
    this.props.getActions({
      getValue: this.getValue,
      setValue: this.setValue,
      reset: this.reset,
      valid: this.valid
    })
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
      this.props.getActions({
        getValue: this.getValue,
        setValue: this.setValue,
        reset: this.reset,
        valid: this.valid
      })
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

  // 以下方法暴露给父类
  getValue = () => {
    return {
      value: this.state.value,
      path: this.state.path
    }
  }  
  
  setValue = (val: any) => {
    this.setState({ value: val });
  }

  reset = () => {
    if(!this.props.hidden){
      if(isObj(this.state.value)){
        this.setState({ value: {} },() => {
        });
      }else if(isArr(this.state.value)){
        this.setState({ value: [] });
      }else{
        this.setState({ value: null });
      }
    }
  }

  valid = () => {
    // 原本的验证
    const error = validFun(this.state.value, this.props.validate || "");
    // childrenError boolean
    let childrenError: any = true;
    if(this.props.type.indexOf("custom") !== -1){
      // 从组件中传出
      childrenError = this.childrenValid();
    }
    this.setState({ error });
    return isEmpty(error) && childrenError;
  }

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
