import React,{Component} from 'react';
import {Checkbox} from 'antd';

import MyComponent from '../components/index';


// 附带编辑器的checkbox
interface CheckboxWithExtraProps {
  editors: Array<any>,
  checkboxValue: boolean,
  editorsValue: string,
  onChange: Function
}

export default class CheckboxWithExtra extends Component<CheckboxWithExtraProps>{
  // index 这个参数仅在extraEditor时使用
  handleChange = (value: any, name: string, index: number) => {
    const { checkboxValue, editorsValue, onChange } = this.props;
    if (name === "checkboxValue") {
      onChange({
        checkboxValue: value,
        editorsValue
      });
    } else if (name === "editorValue") {
      let newEditorsValue = editorsValue ? Object.assign(JSON.parse(editorsValue) || {}, { [index]: value }) : { [index]: value}
      onChange({
        checkboxValue,
        editorsValue: JSON.stringify(newEditorsValue)
      })
    }
  }
  // 当checkbox选中时，渲染额外的编辑器供其输入
  // 输出格式为 {"0":"", "1": ""}, 数字代表编辑器的顺序
  renderExtra = (editorValue: string) => {
    const { editors } = this.props;
    if (!editors || editors.length === 0) return null;
    let newEditorValue: any = {}
    if (editorValue) {
      newEditorValue = JSON.parse(editorValue);
    }
    return editors.map((v: any, index: number) => {
      const RenderComponent = MyComponent[v['input_type']];
      return (
        <div key={index}>
          <label>{v.label}</label>
          <RenderComponent
            value={newEditorValue[index]}
            {...v}
            onChange={(value: any) => this.handleChange(value, "editorValue", index)}
          />
          <span>{v.unit}</span>
        </div>
      )
    })
  }

  render() {
    const { checkboxValue, editorsValue } = this.props;
    return (
      <div>
        <Checkbox
          checked={checkboxValue}
          onChange={(e) => this.handleChange(e.target.checked, "checkboxValue", -1)}
        >{this.props.children}</Checkbox>
        {checkboxValue ? this.renderExtra(editorsValue) : null}
      </div>
    )
  }
}