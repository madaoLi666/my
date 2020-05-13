/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Input } from 'antd';

interface MyInputProps {
  onChange: Function,
  dispatch?: Function,
  value: any,
  input_props: any
}

export default class MyInput extends React.Component<MyInputProps>{
  handleChange = (e: any) => {
    this.props.onChange(e.target.value)
  }

  renderInput = () => {
    const { input_props = "default" } = this.props;
    if (input_props) {
      if (input_props.type === "textarea") {
        return <Input.TextArea value={this.props.value} onChange={this.handleChange} />
      } else if (input_props.type === "password") {
        return <Input.Password value={this.props.value} onChange={this.handleChange} />
      } else if (input_props.type === "text") {
        return <Input value={this.props.value} onChange={this.handleChange} />
      }
    }
    return <Input value={this.props.value} onChange={this.handleChange} />
  }

  render() {
    return (this.renderInput())
  }
}