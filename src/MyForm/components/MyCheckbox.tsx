import React, { Component, ReactNode } from 'react';
import { Checkbox, Col, Row } from 'antd';
import { ProgressPlugin } from 'webpack';
import MyComponent from '../components/index';

// TODO 这里的验证需要寻找其他办法
// TODO 这里之后应该要改为有custom渲染完所有的，使用其他三个type时都经过custom的方法去完成
interface MyCheckboxProps {
  onChange: Function,
  dispatch: Function,
  value: any,
  componentOption: CheckboxComponentProps
}

/**
 * type
 *  default  接收一个boolean
 *  whether  接收一个对象 {a:boolean,aNote:string} 互斥 默认true是展开input
 *  multiple 多个输入 接收 {a:boolean,aNode:string,b:boolean,bNote:string} 需要额外设置是否互斥
 *  custom   自定义模式
 */
interface CheckboxComponentProps {
  type: string,
  radio?: boolean
  extraEditors: any,
  renderData: Array<string>
}


/**
 * 1.单个checkbox
 * 2.两个checkbox，是否选项（仅在是选项时需要输入文字）
 * 3.多个checkbox，存在互斥（不存在互斥），选择时需要输入文字。有隐藏的需求
 */

/**
 * 关于额外弹出的输入框的数据保存形式
 * {"0":"","1":""} 方式保存
 */

const whetherConfig = [
  { label: "有", value: true },
  { label: "无", value: false }
]

export default class MyCheckbox extends Component<MyCheckboxProps, any> {
  constructor(props: MyCheckboxProps) {
    super(props);
    this.state = {
      value: ""
    };
  }

  checkbox: { [key: string]: Function } = {
    "default": function (componentOption: CheckboxComponentProps, value: any, onChange: Function): ReactNode {
      return <Checkbox
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    },
    "whether": function (componentOption: CheckboxComponentProps, value: any, onChange: Function): ReactNode {
      const { extraEditors } = componentOption;
      let checkboxValue = value[componentOption.renderData[0]];
      let editorsValue = value[`${componentOption.renderData[0]}Note`];
      // 转了格式，在这个位置转回来
      const handleChange = function(value:{checkboxValue:boolean, editorsValue:string}) {
        onChange({
          [componentOption.renderData[0]]: value.checkboxValue,
          [`${componentOption.renderData[0]}Note`]: value.editorsValue
        })
      }
      return <WhetherCheckbox
        value={{ checkboxValue, editorsValue }}
        onChange={handleChange}
        extraEditors={extraEditors}
      />;
    },
    "multiple": function(componentOption: CheckboxComponentProps, value: any, onChange: Function): ReactNode {
      return <div>a</div>
    }
  }

  renderCheckbox = () => {
    const { componentOption, value, onChange } = this.props;
    const { type } = componentOption;
    return this.checkbox[type || "default"](componentOption, value, onChange);
  }

  render() {
    return this.renderCheckbox()
  }
}

// 是否checkbox组件
interface WhetherCheckboxProps {
  value: {
    checkboxValue: boolean,
    editorsValue: string
  },
  onChange: Function,
  extraEditors: Array<any>
}

class WhetherCheckbox extends Component<WhetherCheckboxProps>{
  // 0 - 无  1 - 有
  handleChange = (e: any, type: number) => {
    const { onChange } = this.props;
    if(type === 0){
      onChange({
        checkboxValue: !e.target.checked,
        editorsValue: null
      });
    }else if(type === 1){
      // CheckboxWithExtra 这个组件传出的就是 {checkboxValue, editorsValue} 形式
      onChange(e);
    }
  }
  render() {
    const { value, extraEditors } = this.props;
    return (
      <div>
        <CheckboxWithExtra
          editors={extraEditors[0].editors}
          checkboxValue={value.checkboxValue}
          editorsValue={value.editorsValue}
          onChange={(val:any) => this.handleChange(val, 1)}
        >有</CheckboxWithExtra>
        <Checkbox
          checked={!value.checkboxValue}
          onChange={(e) => this.handleChange(e, 0)}
        >
          无
        </Checkbox>
      </div>
    )
  }
}



// 附带输入框的checkbox
interface CheckboxWithExtraProps {
  editors: Array<any>,
  checkboxValue: boolean,
  editorsValue: string,
  onChange: Function
}

class CheckboxWithExtra extends Component<CheckboxWithExtraProps>{
  // index 这个参数仅在extraEditor时使用
  handleChange = (value: any, name: string, index:number) => {
    const { checkboxValue, editorsValue, onChange } = this.props;
    if(name === "checkboxValue"){
      onChange({
        checkboxValue: value,
        editorsValue
      });
    }else if(name === "editorValue"){
      let newEditorsValue = Object.assign(JSON.parse(editorsValue) || {}, {[index]: value});
      onChange({
        checkboxValue,
        editorsValue: JSON.stringify(newEditorsValue)
      })
    }
  }
  renderExtra = (editorValue: string) => {
    const { editors } = this.props;
    if(!editors || editors.length === 0) return null;
    let newEditorValue:any = {}
    if(editorValue){
      newEditorValue = JSON.parse(editorValue);
    }
    return editors.map((v: any, index: number) => {
      const RenderComponent = MyComponent[v['type']];
      return (
        <div key={index}>
          <label>{v.label}</label>
          <RenderComponent
            value={newEditorValue[index]}
            {...v}
            onChange={(value:any) => this.handleChange(value, "editorValue", index)}
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