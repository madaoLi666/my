/* eslint-disable @typescript-eslint/camelcase */
import React, { Component } from "react";
import { Table, Button } from "antd";
import { get, set } from 'lodash';
import EditableCell from './TableEditableCell';
import { isArr } from '../../utils/func';
import styles from './index.less';

/* ============================================================================= */
interface MyTableProps {
  onChange: Function,
  dispatch?: Function,
  value: any,
  input_props: any,
}

interface MyTableState {
  selectedRowKeys: Array<number|string>,
  tableColumns: any,
  dataSource: any
}

export default class MyTable extends Component<MyTableProps,MyTableState> {
  constructor(props: MyTableProps) {
    super(props);
    this.state = {
      tableColumns: [],
      dataSource: [],
      selectedRowKeys: []
    };
  }

  // 因为要维护tableRow的状态，所有需要保存在本地
  componentDidUpdate(prevProps: MyTableProps) {

    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const { value } = this.props;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tableColumns: this.props.input_props.tableColumns,
        // 处理dataSource，为了dataSource拥有_key值,用于rowSelection
        dataSource: isArr(value) ? value.map((v:any, i:number) => ({...v, _key: i})) : [],
        selectedRowKeys: []
      })
    }
  }

  handleEdit = (val: any, key: string, index: number) => {
    const { onChange, dispatch } = this.props;
    const { dataSource } = this.state;
    set(dataSource[index], key, val);
    dispatch('tableEdit', dataSource[index]);

    /**
     * TODO
     *  如果在这里删除了_key，会导致选中一项变为全选中
     * */

    // 提交出去前删除使用的_key
    // for(let i = 0; i < dataSource.length ; i++){
    //   delete dataSource[i]._key;
    // }
    onChange(dataSource);
  };

  handleAdd = () => {
    const { tableColumns, dataSource } = this.state;
    const { onChange } = this.props;
    const newData = {};
    tableColumns.forEach((ele: {key:string, title: string}) => {
      newData[ele.key] = "";
    });
    const newValue = dataSource.map((v:any) => v);
    newValue.push(newData);
    onChange(newValue);
  }

  handleDelete = () => {
    const { selectedRowKeys, dataSource } = this.state;
    selectedRowKeys.forEach((key: number|string) => {
      for(let i = 0 ; i < dataSource.length ; i++){
        if(key === dataSource[i]._key){
          dataSource.splice(i,1);
          break;
        }
      }
    })
    // 提交出去前删除使用的_key
    // for(let i = 0 ; i < dataSource.length ; i++){
    //   delete dataSource[i]._key;
    // }
    this.props.onChange(dataSource);
  }

  handleRowSelectChange = (selectedRowKeys: Array<number|string>):void => {
    this.setState({selectedRowKeys});
  }

  // 对于二级表单的处理
  handleTabColumnsFormat = (tableColumns: Array<any>):any => {
    const { editable } = this.props.input_props;
    return tableColumns.map((v: any, i:number) => {
      if(v.key){
        return {
          ...v,
          dataIndex: v.key,
          render: (text: string, record: any, index: number) => editable ? (
            <EditableCell
              value={get(record ,v.key)}
              onChange={(val: any) => this.handleEdit(val, v.key, index)}
              editor={v.editor}
            />
          ) : (
            <span>{text || "-"}</span>
          )
        }
      }
      if(v.children){
        return {
          title: v.title,
          children: this.handleTabColumnsFormat(v.children)
        }
      }
      return {}
    })
  }

  render() {
    const { input_props } = this.props;
    let { tableColumns } = this.state;
    const { dataSource } = this.state;
    const { editable, hiddenBtn } = input_props;
    tableColumns = this.handleTabColumnsFormat(tableColumns);
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleRowSelectChange
    }
    return (
      <div>
        { editable && !hiddenBtn && (
          <div>
          <Button
            onClick={this.handleAdd}
          >新增</Button>
          <Button
            onClick={this.handleDelete}
          >删除
          </Button>
        </div>
        )}
        <Table
          className={styles['my-table']}
          rowSelection={editable && !hiddenBtn ? rowSelection : undefined}
          columns={tableColumns || []}
          dataSource={dataSource || []}
          rowKey={(record: any) => record._key}
          pagination={false}
        />
      </div>
    );
  }
}
