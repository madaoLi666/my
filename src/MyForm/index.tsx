/* eslint-disable @typescript-eslint/camelcase */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { MyFormProp, MyFormState, FormConfig } from './interface';
import { createFormHandler } from './form.js';
import FormItem from './formItem';
import styles from './index.less';

const defaultGutterConfig = {
  gutter: [0, 4], // px
  justify: "start"
}
// TODO 后期应该考虑把这里的col和row换成自定义的样式实现
export function renderForm(config: Array<FormConfig>, formHandler: any, gridConfig: any = defaultGutterConfig) {
  console.log('rr');
  if (!config) throw new Error('config is undefined');
  if (Object.prototype.toString.call(config) !== '[object Array]') throw new Error(`Expect array but ${typeof config}`);

  let count = 0;    // 计算占比
  // let prevOffset = 0; 使用offset换行时，计算第i个元素用于上一行换行的offset数量
  let row = 0;
  const formDom = [];
  let spanArr = [];
  for (let i = 0; i < config.length; i++) {
    const { span = 24, offset = 0 } = config[i];
    const {
      label = "",
      unit = "",
      input_props = {},
      rules = "",
      key = "",
      is_new_row = false,
      name = "",
      header_label = false,
      hidden = false
    } = config[i];
    // if(config[i].hidden){
    //   // eslint-disable-next-line no-continue
    //   continue;
    // }
    if (!hidden) {
      count += span + offset;
    }
    if (count > 24 || is_new_row) {
      formDom.push(
        <Row
          key={`row-${row}`}
          {...gridConfig}
        >
          {spanArr}
        </Row>
      )
      spanArr = [];
      // 计算上一行换行的offset数量
      // prevOffset = 24 - count + (span + offset);
      // 减去上一行换行所用offset
      count = span + offset;
      // count = span + (offset - prevOffset);
      row += 1;
    }
    spanArr.push(
      <Col
        span={hidden ? 0 : span}
        offset={offset}
        key={`${config[i].name}|row-${row}|span-${count}`}
      >
        <FormItem
          // 更新时的报错问题
          actions={formHandler[config[i].name] ? formHandler[config[i].name].actions : {}}
          dispatch={formHandler.dispatch}
          subscribe={formHandler.subscribe}
          value={config[i].value}
          type={config[i].input_type}
          label={label}
          header_label={header_label}
          unit={unit}
          input_props={input_props}
          validate={rules}
          path={key}
          name={name}
          hidden={hidden}
        />
      </Col>
    )
  }
  if (spanArr) {
    formDom.push(<Row key={`row-${row}`} {...gridConfig}>{spanArr}</Row>)
  }
  return formDom;
}

export default class MyForm extends Component<MyFormProp, MyFormState>{
  constructor(props: MyFormProp) {
    super(props);
    this.state = {
      formHandler: createFormHandler(props.config, { submitChange: props.submitChange })
    }
  }

  componentDidMount() {
    const { getFormHandler } = this.props;
    if (getFormHandler) {
      getFormHandler(this.state.formHandler);
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { getFormHandler } = this.props;
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        formHandler: createFormHandler(this.props.config, { submitChange: this.props.submitChange })
      }, () => {
        if (getFormHandler) {
          getFormHandler(this.state.formHandler);
        }
      })
    }
  }

  render() {
    return (
      <div className={styles['my-form']}>
        <div>
          {renderForm(this.props.config, this.state.formHandler)}
        </div>
      </div>
    )
  }
}
