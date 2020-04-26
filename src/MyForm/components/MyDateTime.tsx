import React,{Component} from 'react';
import moment from 'moment';
import { DatePicker, TimePicker} from 'antd';

interface MyDatePickerProp{
  onChange: Function,
  dispatch: Function,
  value: any,
  componentOption: any
}

/**
 * 不接收对象/数组
 */


const defaultType = "date";
// format需要做限制
const defaultFormat = "YYYY-MM-DD";

function isVaildDate(date: Date):boolean{
  return date instanceof Date && !isNaN(date.getTime());
}

export default function MyDateTime(props: MyDatePickerProp){
  const handleChange = (value:any) => {
    // console.log(value);
    props.onChange(value);
  }

  const renderDatePicker = () => {
    if(props.componentOption){
      const { type = defaultType, format = defaultFormat} = props.componentOption;
      let val = props.value;
      if(props.value){
        let date = new Date(props.value);
        if(!isVaildDate(date)){
          // return <span>数据{props.value}，格式非法</span>;
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
      }else if(type === "time"){
        return <TimePicker
          value={val}
          format={format}
          onChange={handleChange}
        />
      }
      return 
    }
  }

  return (
    renderDatePicker()
  )
}