import MyInput from './MyInput';
import MyDateTime from './MyDateTime'
interface MyComponent{
  [key:string]: any
}

const MyComponent:MyComponent = {
  "input": MyInput,
  "date": MyDateTime
}

export default MyComponent