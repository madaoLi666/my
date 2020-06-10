/* eslint-disable @typescript-eslint/camelcase */
import React, { Component } from 'react';
import moment, { Moment } from 'moment';
import { DatePicker, TimePicker } from 'antd';

interface MyDatePickerProp {
  onChange: Function;
  dispatch?: Function;
  value: any;
  input_props: any;
}

const defaultType = 'date';

const dateTypeString = 'date';
const timeTypeString = 'time';
// format需要做限制
const defaultDateFormat = 'YYYY-MM-DD';
const defaultTimeFormat = 'HH:mm:ss';

export default function MyDateTime(props: MyDatePickerProp) {
  const { input_props = {}, value = '' } = props;
  const { type = defaultType } = input_props;
  const { format = type === dateTypeString ? defaultDateFormat : defaultTimeFormat } = input_props;

  const handleChange = (val: any) => {
    if (val) {
      props.onChange(val.format(format));
    } else {
      props.onChange(val);
    }
  };

  const renderDatePicker = () => {
    if (!value || moment(value, format).isValid()) {
      const val: any = value ? moment(value, format) : '';
      // DatePicker、TimePicker在size上与其他组件有出入
      if (type === dateTypeString) {
        return <DatePicker size="small" value={val} format={format} onChange={handleChange} />;
      }
      if (type === timeTypeString) {
        return <TimePicker size="small" value={val} format={format} onChange={handleChange} />;
      }
      return <strong>组件类型非法</strong>;
    }
    return <strong>值类型格式非法</strong>;
  };

  return renderDatePicker();
}
