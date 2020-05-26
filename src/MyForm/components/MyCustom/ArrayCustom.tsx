/* eslint-disable @typescript-eslint/camelcase */
import React, { Component, ReactNode } from 'react';
import { Button, Tooltip } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import MyCustom from './index';
import styles from './ArrayCustom.less';

interface ArrayCustomProps {
  onChange: Function,
  dispatch: Function,
  value: Array<any>,
  input_props: any,
  error: any,
}

interface ArrayCustomState {
  value: Array<any>,
  error: Array<any>
}

export default class ArrayCustom extends Component<ArrayCustomProps, ArrayCustomState>{
  constructor(props: ArrayCustomProps) {
    super(props);
    this.state = {
      value: [],
      error: []
    }
  }

  componentDidMount() {
    this.mapPropsToState();
  }

  componentDidUpdate(prevProps: ArrayCustomProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.mapPropsToState();
    }
  }

  handleChange = (val: any, index: number): void => {
    const { value = [], onChange } = this.props;
    const newValue = JSON.parse(JSON.stringify(value));
    newValue[index] = val;
    onChange(newValue);
  }

  renderArrayCustomForm = (): ReactNode => {
    const { dispatch, error = [], input_props = {}, value = [] } = this.props;
    const { config = [] } = input_props;
    if (!value || config.length === 0 || value.length === 0) {
      return null;
    }
    return value.map((val: any, index: number) => (
      <div className={styles['array-form']} key={`array-custom-${index}`}>
        <div className={styles.title}>
          <div>
            <span>
              记录{index + 1}
            </span>
          </div>

          {/* <div>
            <Button
              onClick={() => this.handleDelete(index)}
            >删除</Button>
          </div> */}
        </div>
        <div className={styles.main}>
          <div className={styles.custom}>
            <MyCustom
              onChange={(singleValue: any) => this.handleChange(singleValue, index)}
              dispatch={dispatch}
              input_props={input_props}
              error={null}
              value={val}
              getValidFun={() => { }}
              subscribe={() => { }}
            />
          </div>
          <div className={styles['delete-btn']}>
            <Tooltip title="删除">
              <Button
                shape="circle"
                danger
                type="link"
                icon={<MinusCircleOutlined />}
                onClick={() => this.handleDelete(index)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    ))
  }

  handleAdd = () => {
    const { value = [], input_props = {}, onChange } = this.props;
    const { config = [] } = input_props;
    /**
     * TODO 复合字段是否可以正常赋值
     *  这里config取item中的key，去第一个点后的第一个字段
     *  有可能存在复合的字段
     */
    const emptyItem = {};
    config.forEach((item: any) => {
      const { key }: { key: string } = item;
      const newKey = key.substring(1, key.length);
      // arraySplitKey & objectSplitKey
      const nextSplitKeyIndex = newKey.search(/[\.]|[\_]/);
      if (nextSplitKeyIndex !== -1) {
        emptyItem[newKey.substring(0, nextSplitKeyIndex)] = "";
      } else {
        emptyItem[newKey] = null;
      }
    });
    value.push(emptyItem);
    onChange(value)
  }

  handleDelete = (index: number): void => {
    const { value, onChange } = this.props;
    value.splice(index, 1);
    onChange(value);
  }

  mapPropsToState = (): void => {
    const { value, error } = this.props;
    this.setState({ value, error });
  }

  render() {
    return (
      <div className={styles['array-custom']}>
        <div className={styles['add-btn']}>
          <Button
            type="primary"
            onClick={this.handleAdd}
          >添加</Button>
        </div>
        <div>
          {this.renderArrayCustomForm()}
        </div>
      </div>
    )
  }
}
