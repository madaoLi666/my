/* eslint-disable @typescript-eslint/camelcase */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { getRenderData } from './utils/index';
import { MyFormProp, MyFormState, FormConfig } from './interface';
import { createFormHandler } from './form.js';
import FormItem from './formItem';
import styles from './index.less';

const defaultGutterConfig = {
  gutter: [0, 4], // px
  justify: "start"
}

export default class MyForm extends Component<MyFormProp, MyFormState>{
  constructor(props: MyFormProp) {
    super(props);
    this.state = {
      formHandler: {},
      myConfig: []
    }
  }

  componentDidMount() {
    const { getFormHandler, config, value, submitChange } = this.props;
    this.setState({
      myConfig: getRenderData(config, value),
      formHandler: createFormHandler(getRenderData(config, value), { submitChange })
    }, () => {
      if (getFormHandler) {
        getFormHandler(this.state.formHandler);
      }
    })
  }

  // componentWillUpdate(nextProps: MyFormProp, nextState: MyFormState) {
  //   const { config, value, submitChange } = nextProps;
  //   if (JSON.stringify(this.props.config) !== JSON.stringify(nextProps.config)
  //     || JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)
  //   ) {
  //     this.setState({
  //       myConfig: getRenderData(config, value),
  //       formHandler: createFormHandler(getRenderData(config, value), { submitChange })
  //     })
  //     return true;
  //   }
  //   return false;
  // }

  // 没有新建formHandler 只是增加了其中的键值
  componentDidUpdate(prevProps: MyFormProp, prevState: MyFormState) {
    const { getFormHandler, config, value, submitChange } = this.props;
    if (!this.props.config || !this.props.value) {
      return;
    }
    // 数据不同
    if (JSON.stringify(this.props.value) !== JSON.stringify(prevProps.value)) {
      this.setState({ myConfig: getRenderData(config, value) })
    }
    // 配置不同
    if (JSON.stringify(this.props.config) !== JSON.stringify(prevProps.config)) {
      this.setState({
        myConfig: getRenderData(config, value),
        formHandler: createFormHandler(getRenderData(config, value), { submitChange })
      })
    }
    if (JSON.stringify(prevState.formHandler.uuid) !== JSON.stringify(this.state.formHandler.uuid)) {
      if (getFormHandler) {
        getFormHandler(this.state.formHandler);
      }
    }
  }

  renderForm = (config: Array<FormConfig>, formHandler: any, gridConfig: any = defaultGutterConfig) => {
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
        row += 1;
      }
      spanArr.push(
        <Col
          span={hidden ? 0 : span}
          offset={offset}
          key={`${config[i].name}|row-${row}|span-${count}`}
        >
          <FormItem
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
            getActions={(functions: any) => this.handlerGetActions(config[i].name, functions)}
          />
        </Col>
      )
    }
    if (spanArr) {
      formDom.push(<Row key={`row-${row}`} {...gridConfig}>{spanArr}</Row>)
    }
    return formDom;
  }

  handlerGetActions = (name: string, actions: any) => {
    const { formHandler } = this.state;
    if (!formHandler[name] || !formHandler[name].actions) {
      formHandler[name] = {};
      formHandler[name].actions = {};
    }
    formHandler[name].actions = actions;
    this.setState({ formHandler })
  }

  render() {
    const { myConfig = [], formHandler = {} } = this.state;
    return (
      <div className={styles['my-form']}>
        <div>
          {
            (myConfig.length !== 0 && Object.keys(formHandler).length !== 0)
              ? this.renderForm(myConfig, formHandler)
              : null
          }
        </div>
      </div>
    )
  }
}
