import React, { Component, ReactNode } from 'react';
import CheckboxWithExtra from '../Base/CheckboxWithExtra';
import styles from './MultipleCheckbox.less';

/**
 * 外部数据格式应为
 * {
 *  a: boolean,
 *  aNote: any,
 *  b: boolean,
 *  bNote: any
 * }
 */
interface MultipleCheckboxProps {
  // extraEditors: Array<any>,
  radio?: boolean,
  value: Array<{
    checkboxValue: any,
    editorsValue: any,
    key:string,
    label:string
  }>,
  // options: Array<{label:string|number, value: string|number|boolean}>,
  editors: Array<any>,
  onChange: Function
}

export default class MultipleCheckbox extends Component<MultipleCheckboxProps>{
  handleChange = (val: any, key: string) => {
    const { radio = true, value, onChange } = this.props;
    if (radio) {
      value.forEach((item: any) => {
        if (item.key === key) {
          onChange({
            checkboxValue: val.checkboxValue,
            editorsValue: val.editorsValue,
          }, item.key)
        } else {
          onChange({
            checkboxValue: false,
            editorsValue: "",
          }, item.key)
        }
      })
    } else {
      onChange(val, key)
    }
  }

  renderCheckbox = () => {
    const { value, editors = [] } = this.props;
    const renderDOM: Array<ReactNode> = [];
    for (let i = 0; i < value.length; i++) {
      const index = editors.findIndex((editor: any) => editor.key === value[i].key);
      renderDOM.push(
        <CheckboxWithExtra
          key={i}
          onChange={(val: any) => this.handleChange(val, value[i].key)}
          checkboxValue={value[i].checkboxValue}
          editorsValue={value[i].editorsValue}
          editors={index !== -1 ? editors[index].editors : []}
        >
          {value[i].label}
        </CheckboxWithExtra>
      )
    }
    return renderDOM;
  }

  render() {
    return <div className={styles['multiple-checkbox']}>
      {this.renderCheckbox()}
    </div>
  }
}