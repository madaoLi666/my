import MyInput from './MyInput';
import MyDateTime from './MyDateTime'
import MySelect from './MySelect'

import BusinessFetuses from './business/fetuses';
interface MyComponent{
  [key:string]: any
}

const MyComponent:MyComponent = {
  "input": MyInput,
  "date": MyDateTime,
  "select": MySelect,



  "b-fetuses": BusinessFetuses
}

export default MyComponent