import React,{Component, ReactNode} from 'react';
import CheckboxWithExtra from '../Base/CheckboxWithExtra';
import styles from './CustomCheckbox.less';

interface CustomCheckboxProps{
  radio?: boolean,
  value: {
    checkboxValue: any,
    editorsValue: any,
    key:string,
  },
  options: Array<{label:string|number, value: string|number|boolean}>,
  editors: Array<any>,
  onChange: Function,
}

export default class CustomCheckbox extends Component<CustomCheckboxProps>{

  state = {
    // checkboxValue:""
  }

  handleChange = (val: any, key: string|number|boolean) => {
    const { onChange, radio, options } = this.props;
    onChange({
      checkboxValue: key,
      editorsValue: val.editorsValue
    },this.props.value.key)
    // if (radio) {
    //   options.forEach((opt: any) => {
    //     if (opt.value === key) {
    //       onChange({
    //         checkboxValue: val.checkboxValue,
    //         editorsValue: val.editorsValue,
    //       }, opt.key)
    //     } else {
    //       onChange({
    //         checkboxValue: false,
    //         editorsValue: "",
    //       }, opt.key)
    //     }
    //   })
    // } else {
    //   onChange(val, key)
    // }
  }

  renderCheckbox = () => {
    const { value, options = [], editors = [] } = this.props;
    const renderDOM: Array<ReactNode> = [];
    for(let i = 0; i < options.length ; i++){
      const index = editors.findIndex((editor:any) => editor.key === options[i].value);
      renderDOM.push(
        <CheckboxWithExtra
          key={i}
          onChange={(val:any) => this.handleChange(val, options[i].value)}
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