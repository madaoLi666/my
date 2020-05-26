import MyInput from './MyInput';
import MyDateTime from './MyDateTime'
import MySelect from './MySelect'
import MyCheckbox from './MyCheckbox'
import MyTable from './MyTable';

import SimpleObject from './SimpleObject';

import MyCustom from './MyCustom';
import ArrayCustom from './MyCustom/ArrayCustom'

import AddressCascader from './business/Address/AddressCascader';
// import AddressCascader from './business/CascaderAddress';

interface MyComponent{
  [key:string]: any
}

const MyComponent:MyComponent = {
  "input": MyInput,
  "date": MyDateTime,
  "select": MySelect,
  "checkbox": MyCheckbox,
  "table": MyTable,

  "simpleobject": SimpleObject,

  "custom": MyCustom,
  "array-custom": ArrayCustom,
  // 业务类组件
  "addressCascader": AddressCascader

}

export default MyComponent
