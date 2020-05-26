import React, { Component } from 'react';
import { Checkbox } from 'antd';

interface GroupCheckboxProps {
  radio: boolean,
  value: any,
  options: Array<{ label: string | number, value: string | number | boolean }>,
  editors: Array<any>,
  onChange: Function,
}



export default class GroupCheckbox extends Component<GroupCheckboxProps>{

  handleChange = (val: any): void => {
    const { value, onChange, radio = true } = this.props;
    if (val.length !== 0) {
      if (radio) {
        // 单选
        if (value[0]) {
          onChange(val.filter(v => v !== value[0]));
        } else {
          onChange(val[0]);
        }
      } else {
        onChange(val);
      }
    } else {
      onChange(val);
    }
  }

  render() {
    const { value } = this.props;
    return (
      <Checkbox.Group
        options={this.props.options || []}
        onChange={this.handleChange}
        value={value}
      />
    )
  }
}