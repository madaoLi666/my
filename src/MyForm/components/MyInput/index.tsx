/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Input, InputNumber } from 'antd';

interface MyInputProps {
  onChange: Function,
  dispatch?: Function,
  value: any,
  input_props: any
}

interface MyInputState {
  value: any
}

export default class MyInput extends React.Component<MyInputProps, MyInputState>{

  state = {
    value: ""
  }

  handleKeyDown = (e: any) => {
    e.target.keyEvent = true;
  }

  handleKeyUp = (e: any) => {
    const flag = e.target.isNeedPrevent;
    if (flag) return;
    this.props.onChange(this.state.value);
    e.target.keyEvent = false;
  }

  handleCompositionStart = (e: any) => {
    e.target.isNeedPrevent = true;
  }

  handleCompositionEnd = (e: any) => {
    e.target.isNeedPrevent = false;
  }

  handleChange = (e: any) => {
    // this.setState({value: e.target.value})
    this.props.onChange(e.target.value);
  }

  handleNumberChange = (value: any) => {
    this.props.onChange(value);
  }

  renderInput = () => {
    const { input_props = "default" } = this.props;
    if (input_props) {
      if (input_props.type === "textarea") {
        return (
          <Input.TextArea
            value={this.props.value}
            onChange={this.handleChange}
            // onKeyDown={this.handleKeyDown}
            // onKeyUp={this.handleKeyUp}
            // onCompositionStart={this.handleCompositionStart}
            // onCompositionEnd={this.handleCompositionEnd}
          />
        )
      } else if (input_props.type === "password") {
        return <Input.Password value={this.props.value} onChange={this.handleChange} />

      } else if (input_props.type === "text") {
        return <Input value={this.props.value} onChange={this.handleChange} />
      } else if(input_props.type === "number") {
        return <InputNumber value={this.props.value} onChange={this.handleNumberChange} />
      }
    }
    return <Input value={this.props.value} onChange={this.handleChange} />
  }

  render() {
    return (this.renderInput())
  }
}