/* eslint-disable @typescript-eslint/camelcase */
import React, { Component, ReactNode } from 'react';
import { Select } from 'antd';
import ExtraEditors from './Base/ExtraEditors';

const { Option } = Select;
interface MySelectProps {
  onChange: Function,
  dispatch?: Function,
  value: any,
  input_props: SelectComponentProps
}

interface SelectComponentProps {
  type?: string,
  selectOptions?: Array<{ value: string | number, label: string | number }>,
  renderData?: Array<{ key: string, label: string }>,
  extraEditors: any,
  radio?: boolean
}

export default class MySelect extends Component<MySelectProps, {}>{
  select: { [key: string]: Function } = {
    "default": (input_props: SelectComponentProps, value: any, onChange: Function) => {
      const { selectOptions = [] } = input_props;
      const options = selectOptions?.map((v: { label: string | number, value: string | number }) => (
        <Option
          value={v.value}
          key={v.value}
        >{v.label}</Option>
      ));
      return (
        <Select
          style={{ width: '100%' }}
          onChange={(val, _options) => onChange(val)}
          showSearch
          value={value}
        >{options}</Select>
      )
    },
    "multiple": (input_props: SelectComponentProps, value: any, onChange: Function) => {
      const { renderData = [], extraEditors = [], radio = true } = input_props;
      // 将需要渲染的key转格式传入MultipleSelect
      const valueArr = renderData.map((item: { key: string, label: string }) => {
        if (value && item.key in value) {
          return {
            // selectValue是一个boolean值
            // value形如 {a:boolean,aNote:any}
            selectValue: value[item.key] || false,
            editorsValue: value[`${item.key}Note`] || "",
            key: item.key,
            label: item.label
          }
        }
        // console.error(`输入对象中找不到 ${item.key} || 输入对象值为空`);
        return false;
      }).filter((item: any) => !!item);
      // handleChange 这一步把格式转回来
      const handleChange = (val: any, key: string) => {
        const newObj = {
          [key]: val.selectValue,
          [`${key}Note`]: val.editorsValue
        };
        onChange(Object.assign(value, newObj));
      }
      return <MultipleSelect
        value={valueArr}
        radio={radio}
        extraEditors={extraEditors}
        onChange={handleChange}
      />
    }
  }

  renderSelect = () => {
    const { input_props = {}, value, onChange } = this.props;
    const { type = "default" } = input_props;
    return this.select[type](input_props, value, onChange);
  }


  render() {
    return this.renderSelect()
  }
}

interface MultipleSelectProps {
  value: Array<{
    selectValue: boolean,
    editorsValue: string,
    key: string | number,
    label: string | number
  }>,
  radio?: boolean,
  extraEditors?: Array<any>,
  onChange: Function
}

class MultipleSelect extends Component<MultipleSelectProps>{
  renderExtra = (value: Array<{ selectValue: boolean, editorsValue: string, key: string | number, label: string | number }>, extraEditors: Array<any>) => {
    const renderDom: Array<ReactNode> = [];
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < extraEditors.length; j++) {
        if (value[i].selectValue && value[i].key === extraEditors[j].key) {
          renderDom.push(<ExtraEditors
            key={`${i}-${j}`}
            editorsValue={value[i].editorsValue}
            extraEditors={extraEditors[j].editors}
            onChange={(val: any) => this.handleChange(val, "editorsValue", value[i].key)}
          />)
        }
      }
    }
    return renderDom;
  }

  renderSelect = () => {
    const { value, extraEditors = [], radio = true } = this.props;
    const options = value.map((v: { key: string | number, label: string | number }) => (
      <Option
        value={v.key}
        key={v.key}
      >{v.label}</Option>
    ));
    return (
      <div>
        <Select
          mode={radio ? undefined : "multiple"}
          style={{ width: '100%' }}
          onChange={(val: any) => this.handleChange(val, "selectValue", "")}
          showSearch
          value={value.filter((item: { selectValue: boolean }) => item.selectValue)
            .map((item: { key: string | number }) => item.key)}
        >{options}</Select>
        {this.renderExtra(value, extraEditors)}
      </div >
    )
  }

  // 参数中的key仅在editors使用
  handleChange = (val: any, name: string, key: string | number) => {
    const { onChange, radio, value } = this.props;
    if (name === "selectValue") {
      if (radio) {
        // val's type is string
        value.forEach((item: any) => {
          if (val === item.key) {
            onChange({
              selectValue: true,
              editorsValue: item.editorsValue
            }, item.key)
          } else {
            onChange({
              selectValue: false,
              editorsValue: ""
            }, item.key)
          }
        })
      } else {
        // val's type is Array<string>
        value.forEach((item: any) => {
          let flag = false;
          for (let i = 0; i < val.length; i++) {
            if (item.key === val[i]) {
              flag = true;
              break;
            }
          }
          if (flag) {
            onChange({
              selectValue: true,
              editorsValue: item.editorsValue
            }, item.key);
          } else {
            onChange({
              selectValue: false,
              editorsValue: ""
            }, item.key);
          }
        })
      }
    } else if (name === "editorsValue") {
      const i = value.findIndex((item: any) => item.key === key);
      onChange({
        selectValue: value[i].selectValue,
        editorsValue: val
      }, key);
    }
  }

  render() {
    return (
      <div>
        {this.renderSelect()}
      </div>
    )
  }
}
