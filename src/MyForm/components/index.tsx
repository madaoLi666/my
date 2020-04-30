import MyInput from './MyInput';
import MyDateTime from './MyDateTime'
import MySelect from './MySelect'
import MyCheckbox from './MyCheckbox'
import MyTable from './MyTable';

import BusinessFetuses from './business/fetuses';
interface MyComponent{
  [key:string]: any
}

const MyComponent:MyComponent = {
  "input": MyInput,
  "date": MyDateTime,
  "select": MySelect,
  "checkbox": MyCheckbox,
  "table": MyTable,

  "b-fetuses": BusinessFetuses
}

export default MyComponent