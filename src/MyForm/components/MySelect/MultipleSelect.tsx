/* eslint-disable @typescript-eslint/camelcase */
import React, { Component, ReactNode } from 'react';
import { Select } from 'antd';
import MyComponent from '../index';

const { Option } = Select;

interface MultipleSelectProps {
  options: Array<{
    label: string|number,
    value: string|number
  }>,
  onChange: Function,
  multiple: boolean,
  value: {
    selectValue: any,
    editorsValue: any
  },
  extraEditors: any
}

export default class MultipleSelect extends Component<MultipleSelectProps>{


  

  handleSelectChange = (val: any): void => {
    const { value, onChange } = this.props;
    onChange(val, value.editorsValue);
  }

  handleExtraChange = (val: any, key: string) => {
    const { value, onChange, multiple } = this.props;
    if(multiple){
      const newEditorValue = JSON.parse(JSON.stringify(value.editorsValue));
      const index = newEditorValue.findIndex((editorValue:{key:string,value:any}) => editorValue.key === key);
      if(index !== -1){
        newEditorValue[index].value = val;
      }else{
        newEditorValue.push({
          value: val,
          key
        })
      }
      onChange(value.selectValue, newEditorValue);
    }else{
      onChange(value.selectValue, val);
    }
  }

  renderOptions = (options: Array<{ label: string | number, value: string | number }>): ReactNode => {
    return options.map((opt: { label: string | number, value: string | number }) => (
      <Option
        key={opt.value}
        value={opt.value}
      >{opt.label}</Option>
    ))
  }

  renderExtra = (selectValue: any, editorsValue: any, extraEditors:Array<any>, multiple: boolean): Array<ReactNode> => {
    const extraEditorsDOM:Array<ReactNode> = [];
    if(!multiple){
      // 单选
      const index = extraEditors.findIndex((extraEditor: any ) => extraEditor.key === selectValue);
      if(index !== -1){
        for(let i = 0 ; i < extraEditors[index].editors.length ; i++){
          const { input_type, input_props = {} } = extraEditors[index].editors[i];
          const RenderComponent = MyComponent[input_type];
          extraEditorsDOM.push(
            <RenderComponent
              key={`r-${i}`}
              value={editorsValue}
              onChange={(value:any) => this.handleExtraChange(value, "")}
              {...input_props}
            />
          )
        }
      }
    }else{
      for(let j = 0; j < selectValue.length; j++){
        const index = extraEditors.findIndex((extraEditor: any) => extraEditor.key === selectValue[j]);
        const valueIndex = editorsValue.findIndex((editorValue: any) => editorValue.key === selectValue[j]);
        if(index !== -1 && valueIndex !== -1){
          for(let i = 0 ; i < extraEditors[index].editors.length ; i++){
            const { input_type, input_props = {} } = extraEditors[index].editors[i];
            const RenderComponent = MyComponent[input_type];
            extraEditorsDOM.push(
              <RenderComponent
                key={`m-${i}`}
                value={editorsValue[valueIndex].value}
                // 传出修改键名
                onChange={(value:any) => this.handleExtraChange(value, extraEditors[index].key)}
                {...input_props}
              />
            )
          }
        }
      }
    }
    return extraEditorsDOM;
  }

  render() {
    const { options = [], value, multiple = false, extraEditors = [] } = this.props;
    let {
      selectValue = (multiple ? [] : ""),
      editorsValue = (multiple ? [] : "")
    } = value;
    if(selectValue === "" && multiple){ selectValue = [] };
    if(editorsValue === "" && multiple){ editorsValue = [] };
    return (
      <div>
        <Select
          size="small"
          style={{ width: "100%" }}
          value={selectValue}
          allowClear
          showSearch
          onChange={this.handleSelectChange}
          mode={multiple ? "multiple" : undefined}
        >
          {this.renderOptions(options)}
        </Select>
        <div style={{marginTop: "16px"}}>
          {this.renderExtra(selectValue, editorsValue, extraEditors, multiple)}
        </div>
      </div>
    )
  }
}