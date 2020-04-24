import React,{Component} from 'react';
import moment from 'moment';
import { DatePicker, TimePicker} from 'antd';

interface MyDatePickerProp{
  onChange: Function,
  dispatch: Function,
  value: any,
  componentOption: any
}



const defaultType = "date";
// format需要做限制
const defaultFormat = "YYYY-MM-DD";
export default function MyDateTime(props: MyDatePickerProp){
  const handleChange = (value:any) => {
    console.log(value);
    props.onChange(value);
  }

  const renderDatePicker = () => {
    if(props.componentOption){
      const { type = defaultType, format = defaultFormat} = props.componentOption;
      let val;
      try{
        // 这个位置连对象都能转...没有什么意义
        val = moment(props.value);
      }catch(e){
        console.log('error');
        return <span>请检查输入值是否为常用日期/时间格式</span>
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