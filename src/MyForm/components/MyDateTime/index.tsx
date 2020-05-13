/* eslint-disable @typescript-eslint/camelcase */
import React,{Component} from 'react';
import moment from 'moment';
import { DatePicker, TimePicker} from 'antd';

interface MyDatePickerProp{
  onChange: Function,
  dispatch?: Function,
  value: any,
  input_props: any
}

const defaultType = "date";
// format需要做限制
const defaultFormat = "YYYY-MM-DD";

function isVaildDate(date: Date):boolean{
  return date instanceof Date && !isNaN(date.getTime());
}

export default function MyDateTime(props: MyDatePickerProp){
  const handleChange = (value:any) => {
    const { input_props = {} } = props;
    const { format = defaultFormat} = input_props;
    if(value){
      props.onChange(value.format(format));
    }else{
      props.onChange(value);
    }
  }

  const renderDatePicker = () => {
    const { input_props = {} } = props;
    if(input_props){
      const { type = defaultType, format = defaultFormat} = input_props;
      let val = props.value;
      if(props.value){
        // TODO 输入的可能是一个字符串，直接new Date解析不精准
        const date = new Date(props.value);
        if(!isVaildDate(date)){
          return <strong>日期/时间数据格式非法</strong>
        }
        val = moment(date);
      }
      if(type === "date"){
        return <DatePicker
          value={val}
          format={format}
          onChange={handleChange}
        />
      // eslint-disable-next-line no-else-return
      }else if(type === "time"){
        return <TimePicker
          value={val}
          format={format}
          onChange={handleChange}
        />
      }
    }
    return <strong>无input_props</strong>
  }

  return (
    renderDatePicker()
  )
}