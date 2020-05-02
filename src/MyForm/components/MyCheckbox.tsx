import React, { Component, ReactNode } from 'react';
import { Checkbox, Col, Row } from 'antd';
import CheckboxWithExtra from './CheckboxWithExtra';
import MyComponent from '../components/index';

// TODO 4/30 今天！！！ 要重构一下
// TODO 这里的验证需要寻找其他办法
// TODO 这里之后应该要改为有custom渲染完所有的，使用其他三个type时都经过custom的方法去完成
interface MyCheckboxProps {
  onChange: Function,
  dispatch: Function,
  value: any,
  input_props: CheckboxComponentProps
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
  renderData: Array<{ key: string, label: string }>
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


export default class MyCheckbox extends Component<MyCheckboxProps, any> {
  constructor(props: MyCheckboxProps) {
    super(props);
    this.state = {
      value: ""
    };
  }

  checkbox: { [key: string]: Function } = {
    "default": function (input_props: CheckboxComponentProps, value: any, onChange: Function): ReactNode {
      return <Checkbox
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    },
    "whether": function (input_props: CheckboxComponentProps, value: any, onChange: Function): ReactNode {
      const { extraEditors } = input_props;
      let checkboxValue = value[input_props.renderData[0].key];
      let editorsValue = value[`${input_props.renderData[0].key}Note`];
      // 转了格式，在这个位置转回来
      const handleChange = function (value: { checkboxValue: boolean, editorsValue: string }) {
        onChange({
          [input_props.renderData[0].key]: value.checkboxValue,
          [`${input_props.renderData[0].key}Note`]: value.editorsValue
        })
      }
      return <WhetherCheckbox
        value={{ checkboxValue, editorsValue }}
        onChange={handleChange}
        extraEditors={extraEditors}
      />;
    },
    "multiple": function (input_props: CheckboxComponentProps, value: any, onChange: Function): ReactNode {
      const r = input_props.renderData.map((v: any) => ({
        checkboxValue: value[v.key],
        editorsValue: value[`${v.key}Note`],
        key: v.key,
        label: v.label
      }));
      const handleChange = function (val: any, key: string) {
        console.log(val);
        let newObj = {
          [key]: val.checkboxValue,
          [key + 'Note']: val.editorsValue
        };
        onChange(Object.assign(value, newObj));
      }
      return <MultipleCheckbox
        value={r}
        onChange={handleChange}
        radio={input_props.radio || true}
        extraEditors={input_props.extraEditors}
      />
    }
  }

  renderCheckbox = () => {
    const { input_props, value, onChange } = this.props;
    const { type } = input_props;
    return this.checkbox[type || "default"](input_props, value, onChange);
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
    if (type === 0) {
      onChange({
        checkboxValue: !e.target.checked,
        editorsValue: null
      });
    } else if (type === 1) {
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
          onChange={(val: any) => this.handleChange(val, 1)}
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


interface MultipleCheckboxProps {
  extraEditors: Array<any>,
  radio: boolean,
  value: Array<any>
  onChange: Function
}

class MultipleCheckbox extends Component<MultipleCheckboxProps>{


  handleChange = (val: any, key: string) => {
    const { radio, value, onChange } = this.props;
    // 互斥逻辑
    if (radio) {
      value.forEach((v:any) => {
        if(v.key === key){
          onChange({
            checkboxValue: val.checkboxValue,
            editorsValue: val.editorsValue,
          },key)
        }else{
          onChange({
            checkboxValue: false,
            editorsValue: "",
          },v.key)
        }
      })
    } else {
      onChange(val, key)
    }
  }

  renderCheckbox = () => {
    const { value, extraEditors } = this.props;
    let renderDOM: Array<ReactNode> = [];
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < extraEditors.length; j++) {
        if (value[i].key === extraEditors[j].key) {
          renderDOM.push(
            <CheckboxWithExtra
              key={`${i}-${j}`}
              onChange={(val: any) => this.handleChange(val, value[i].key)}
              checkboxValue={value[i].checkboxValue}
              editorsValue={value[i].editorsValue}
              editors={extraEditors[j].editors}
            >
              {value[i].label}
            </CheckboxWithExtra>
          )
          break;
        }
        if (j === extraEditors.length - 1) {
          renderDOM.push(
            <Checkbox
              key={`${i}-${j}`}
              onChange={(e) => this.handleChange({ checkboxValue: e.target.checked }, value[i].key)}
              checked={value[i].checkboxValue}
            >
              {value[i].label}
            </Checkbox>
          )
        }
      }
    }
    return renderDOM;
  }

  render() {
    return <div>
      {this.renderCheckbox()}
    </div>
  }
}
