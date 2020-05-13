import React, { Component } from 'react';
import MyForm from '@/components/MyForm/index';

import { getRenderData } from '@/components/MyForm/utils';

interface MyCustomProps {
  onChange: Function,
  dispatch: Function,
  input_props: any,
  error: any,
  path: string,
  value: any
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

  componentDidUpdate() {
    const { formHandler } = this.state;
    const { onChange } = this.props;
    formHandler.subscribe("_global", "change", () => {
      formHandler.submit().then(({ validCode, res }: any) => {
        // TODO 是否加上validCode
        console.log(res);
        console.log(toFormat(res));
        // onChange(toFormat(res));
      })
    })
  }

  render() {
    const { config = [] } = this.props.input_props;
    const { value } = this.props;
    console.log(value);
    let myConfig: Array<any> = [];
    if (config) {
      myConfig = getRenderData(config, value);
    }
    return (
      <div style={{marginTop: "16px"}}>
        <MyForm
          config={myConfig}
          getFormHandler={(formHandler: any) => this.setState({ formHandler })}
          submitChange
        />
      </div>
    )
  }
} 