## 自动化生成表单思路
    该工具将整个表单配置分为3个层级，分别为form，render，foremItem。再加上书写业务的page，共4个层级。
    1.form 用于初始化formHandler
    2.render 根据配置布局渲染formItem
    3.formItem，用于渲染编辑器以及业务组件  
    

## 配置文件格式
> config配置会用于数据的提取

- FormConfig

|name|description|format|ps|
|-----|-----|-----|-----|
|path|用于数据提取，以"."代表提取对象下一级，"\_"代表提取数组下元素|string||
|label|输入组件lable|string||
|unit|输入组件单位|string||
|span|输入组件占位|number|antd栅格标准|
|offset|输入组件间距|number|antd栅格标准|
|componentOption|针对组件的option配置|ComponentOption|详见下方描述|

- componentOption

|name|description|format|ps|
|-----|-----|-----|-----|
|type|组件的子类型|string|由每个组件自己定义|
|valid|验证规则|string或object|当配置为string是，可验证基本数据类型，请使用"\|"将需要验证的条件分离；当验证的数据类型为引用数据类型时，可以传入对象，定义对应的键名表明验证条件，见例1-1|
|date|
|format|date组件日期格式|string||
|select|
|selectOptions|选择器option配置|{value:string|number, label:stirng|numbmer|
|续待未完|

- 例1-1
```
const data = { // 需要验证的数据
    a:"1",
    b:"d"
};
// valid写法
const valid = {
    a:"required|number",
    b:"required"
}
```
若data为一个数组，则自动以valid规则校验数据中每项

## formHandler方法描述

在form层会创建一个formHandler对象，对象中会包含渲染的每一项的操作方法以及form的操作方法

- formHandler

|name|description|format|ps|
|-----|-----|-----|-----|
|submit|提交表单|() => Promise|提供validCode和data两个参数||
|subscribe|订阅相关事件|(fieldName,eventName,callback)|订阅对应fieldName的event|
|dispatch|提交触发事件|(fieldName,eventName, args)|用于触发相关订阅事件|
|.fieldName|每一个子项的操作方法|<itemHanlder>|目前仅使用itemHandler下的actions中方法|

- itemHandler.action

|name|description|format|ps|
|-----|-----|-----|-----|
|getValue|设置value|(fieldName) => value|用于在页面获取子项的值|
|setValue|获取value|(value)|用于在页面设置子项的值|
|valid|用于触发验证|() => error|触发验证方法,error为boolean|

## 组件书写格式

- props

|name|description|format|ps|
|-----|-----|-----|-----|
|onChange|用于formItem中赋值的回调方法|||
|dispatch|formHandler中的diapatch，用于提交一个事件|||
|value|当前组件渲染的值|||
componentOption|当前组件配置值|||



