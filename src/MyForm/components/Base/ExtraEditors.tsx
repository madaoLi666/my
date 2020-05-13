import React, { Component } from 'react';
import { FormConfig } from '../../interface';
import MyComponent from '../index';

interface ExtraEditorsProps {
  editorsValue: string,
  extraEditors: Array<FormConfig>, // 以{"0":"a","1":"a"}输出输入
  onChange: Function
}

export default class ExtraEditors extends Component<ExtraEditorsProps>{
  renderEditors = () => {
    const { editorsValue, extraEditors } = this.props;
    let newEditorValue: any = {}
    if (editorsValue) {
      newEditorValue = JSON.parse(editorsValue);
    }
    return extraEditors.map((editor: FormConfig, index: number) => {
      const RenderComponent = MyComponent[editor.input_type];
      return (
        <div key={index}>
          <span>{editor.label}</span>
          <RenderComponent
            value={newEditorValue[index]}
            {...editor}
            onChange={(val: any) => this.handleChange(val, index)}
          />
          <span>{editor.unit}</span>
        </div>
      )
    })
  }

  handleChange = (val: any, index: number) => {
    const { onChange } = this.props;
    const { editorsValue } = this.props;
    let newEditorValue: any = {}
    if (editorsValue) {
      newEditorValue = JSON.parse(editorsValue);
    }
    newEditorValue[index] = val;
    onChange(JSON.stringify(newEditorValue));
  }

  render() {
    return <div>
      {this.renderEditors()}
    </div>
  }
}