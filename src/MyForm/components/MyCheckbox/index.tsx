/* eslint-disable @typescript-eslint/camelcase */
import React, { Component, ReactNode } from 'react';
import { Checkbox } from 'antd';
import MultipleCheckbox from './MultipleCheckbox';
import CustomCheckbox from './CustomCheckbox';
import { getObjectFormArray, convertExtraEditors } from '../../utils/func';

interface MyCheckboxProps {
  onChange: Function;
  dispatch?: Function;
  value: any;
  input_props: CheckboxComponentProps;
}

interface CheckboxComponentProps {
  type?: string;
  radio?: boolean;
  renderData: Array<{
    key: string;
    label: string;
    options: Array<{
      label: string | number;
      value: string | number | boolean;
    }>;
    extraEditors: Array<{
      key: string | number | string;
      editors: Array<any>;
    }>;
  }>;
}

// 目前抛出的格式统一为{"0":"","1":""}

export default class MyCheckbox extends Component<MyCheckboxProps, any> {
  checkbox: { [key: string]: Function } = {
    "default": (input_props: CheckboxComponentProps, value: any, onChange: Function): ReactNode => {
      return <Checkbox checked={value} onChange={(e: any) => onChange(e.target.checked)} />;
    },
    "multiple": (input_props: CheckboxComponentProps, value: any, onChange: Function): ReactNode => {
      const editors:Array<any> = [];
      const r:any = input_props.renderData.map((item: { key: string, label: string, extraEditors:Array<any> }) => {
        if (value && item.key in value) {
          // 统一输入规范，所以在这个位置提取
          if(item.extraEditors){
            editors.push(item.extraEditors[0]);
          }
          return {
            checkboxValue: value[item.key],
            editorsValue: convertExtraEditors(value[`${item.key}Note`]),
            key: item.key,
            label: item.label,
          }
        }
        // console.error(`输入对象中找不到 ${item.key} || 输入对象值为空`);
        return false;
      }).filter((item: any) => !!item);
      const handleChange = (val: any, key: string) => {
        const newObj = {
          [key]: val.checkboxValue,
          [`${key}Note`]: JSON.stringify(getObjectFormArray(val.editorsValue))
        };
        onChange(Object.assign(value, newObj));
      }
      return <MultipleCheckbox
        value={r}
        onChange={handleChange}
        radio={input_props.radio}
        editors={editors}
      />
    },
    "custom": (input_props: CheckboxComponentProps, value: any, onChange: Function): ReactNode => {
      const { renderData, radio = true } = input_props;
      if (renderData.length !== 1) return <span>custom型checkbox中renderData长度为1</span>;
      let r: any = {
        checkboxValue: '',
        editorsValue: '',
        options: [],
      };
      if (value && renderData[0].key in value) {
        r = {
          checkboxValue: value[renderData[0].key],
          editorsValue: convertExtraEditors(value[`${renderData[0].key}Note`]),
          key: renderData[0].key,
        };
      }
      const handleChange = (val: any, key: string) => {
        const newObj = {
          [key]: val.checkboxValue,
          [`${key}Note`]: JSON.stringify(getObjectFormArray(val.editorsValue)),
        };
        onChange(Object.assign(value, newObj));
      };
      return (
        <CustomCheckbox
          value={r}
          onChange={handleChange}
          radio={radio}
          options={renderData[0].options}
          editors={renderData[0].extraEditors}
        />
      );
    },
  };

  renderCheckbox = () => {
    const { input_props, value, onChange } = this.props;
    const { type = 'default' } = input_props;
    return this.checkbox[type || 'default'](input_props, value, onChange);
  };

  render() {
    return <div>{this.renderCheckbox()}</div>;
  }
}
