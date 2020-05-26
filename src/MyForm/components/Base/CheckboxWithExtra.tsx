import React,{Component} from 'react';
import {Checkbox} from 'antd';
import { FormConfig } from '../../interface';
import MyComponent from '../index';
import styles from './CheckboxWithExtra.less';

interface CheckboxWithExtraProps {
  editors: Array<FormConfig>,
  checkboxValue: boolean,
  editorsValue: Array<any>,  // 以 {"0":"", "1": ""} 输入输出
  onChange: Function
}

export default class CheckboxWithExtra extends Component<CheckboxWithExtraProps>{

  handleChange = (value: any, name: string, index: number) => {
    const { checkboxValue, editorsValue, onChange } = this.props;
    if (name === "checkboxValue") {
      onChange({
        checkboxValue: value,
        editorsValue
      });
    } else if (name === "editorValue") {
      const newEditorsValue = editorsValue.map((editorValue:any) => editorValue);
      newEditorsValue[index] = value;
      onChange({
        checkboxValue,
        editorsValue: newEditorsValue
      })
    }
  }

  renderExtra = (editorsValue: Array<any>) => {
    const { editors = [] } = this.props;
    if (!editors || editors.length === 0) return null;
    return editors.map((editor: FormConfig, index: number) => {
      const RenderComponent = MyComponent[editor.input_type];
      return (
        <div key={index} className={styles['extra-editors']}>
          {editor.label ? (
            <span className={styles['extra-editors-label']}>{editor.label}</span>
          ) : null}
          <RenderComponent
            value={editorsValue === null ? null : editorsValue[index]}
            {...editor}
            onChange={(value: any) => this.handleChange(value, "editorValue", index)}
          />
          <span>{editor.unit}</span>
        </div>
      )
    })
  }

  render() {
    const { checkboxValue, editorsValue } = this.props;
    return (
      <div className={styles['checkox-with-extra']}>
        <Checkbox
          className={styles.checkbox}
          checked={checkboxValue}
          onChange={(e:any) => this.handleChange(e.target.checked, "checkboxValue", -1)}
        >{this.props.children}</Checkbox>
        {checkboxValue ? this.renderExtra(editorsValue) : null}
      </div>
    )
  }
}