/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import MyForm from '../../index';

import { getFormData } from '../../utils';

interface MyCustomProps {
  onChange: Function,
  dispatch: Function,
  subscribe: Function
  input_props: any,
  error: any,
  value: any,

  getValidFun: any
}

interface MyCustomState {
  formHandler: {
    [key: string]: any
  }
}

// 这里的formHandler不与业务页面的formHandler合并；这里需要一个方法对外抛出change的事件
export default class MyCustom extends Component<MyCustomProps, MyCustomState>{
  constructor(props: MyCustomProps) {
    super(props);
    this.state = {
      formHandler: {}
    };
  }

  componentDidUpdate(prevProps: MyCustomProps, prevStata: MyCustomState) {
    const { formHandler } = this.state;
    const { onChange, subscribe } = this.props;
    if (JSON.stringify(this.props.input_props.config) !== JSON.stringify(prevProps.input_props.config)
      || this.state.formHandler.uuid !== prevStata.formHandler.uuid
    ){
      if (subscribe) {
        subscribe("_global", "reset", () => {
          formHandler.reset();
        })
      }
      // change时的校验动作
      if(formHandler.subscribe){
        formHandler.subscribe("_global", "change", () => {
          formHandler.submit().then(({ validCode, res }: any) => {
            onChange(getFormData(res));
          })
        });
      }
    }
    if (this.props.getValidFun) {
      this.props.getValidFun(formHandler.valid);
    }
  }

  render() {
    const { config = [] } = this.props.input_props;
    const { value = {} } = this.props;
    return (
      <div style={{ marginTop: "16px" }}>
        <MyForm
          config={config}
          value={value}
          getFormHandler={(formHandler: any) => this.setState({ formHandler })}
          submitChange={true}
        />
      </div>
    )
  }
} 