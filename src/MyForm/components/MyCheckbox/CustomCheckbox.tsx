import React, { Component, ReactNode } from 'react';
import CheckboxWithExtra from '../Base/CheckboxWithExtra';
import styles from './CustomCheckbox.less';

/**
 * 这个类型本来就是互斥的
 * 外部数据格式应为
 * {
 *  key: enum|boolean
 *  keyNote: any
 * }
 * 
 */
interface CustomCheckboxProps {
  radio?: boolean,
  value: {
    checkboxValue: any,
    editorsValue: any,
    key: string,
  },
  options: Array<{ label: string | number, value: string | number | boolean }>,
  editors: Array<any>,
  onChange: Function,
}

export default class CustomCheckbox extends Component<CustomCheckboxProps>{

  handleChange = (val: any, key: string | number | boolean) => {
    const { onChange } = this.props;
    // 反选问题
    if (!val.checkboxValue) {
      onChange({
        checkboxValue: null,
        editorsValue: val.editorsValue
      }, this.props.value.key)
    } else {
      onChange({
        checkboxValue: key,
        editorsValue: val.editorsValue
      }, this.props.value.key)
    }
  }

  renderCheckbox = () => {
    const { value, options = [], editors = [] } = this.props;
    const renderDOM: Array<ReactNode> = [];
    for (let i = 0; i < options.length; i++) {
      const index = editors.findIndex((editor: any) => editor.key === options[i].value);
      renderDOM.push(
        <CheckboxWithExtra
          key={i}
          onChange={(val: any) => this.handleChange(val, options[i].value)}
          checkboxValue={value.checkboxValue === options[i].value}
          editorsValue={value.editorsValue}
          editors={index !== -1 ? editors[index].editors : []}
        >
          {options[i].label}
        </CheckboxWithExtra>
      )
    }
    return renderDOM;
  }

  render() {
    return <div className={styles['custom-checkbox']}>
      {this.renderCheckbox()}
    </div>
  }
}