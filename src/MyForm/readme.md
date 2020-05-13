## 自动化生成表单思路
    该工具将整个表单配置分为3个层级，分别为form，render，foremItem。再加上书写业务的page，共4个层级。
    1.form 用于初始化formHandler（初始化逻辑写在MyForm/form.js）
    2.render 根据配置布局渲染formItem 
    3.formItem，用于渲染编辑器以及业务组件  
    
## MyForm参数
> 生成表单入参

|name|description|format|ps|
|-----|-----|-----|-----|
|config|用于生成表单组件，赋值数据的配置|Array\<FormConfig>||
|getFormHandler|暴露formHandler方法|(func: object) => void||
|submitChange|表单下某项改变时是否进行提交的操作|boolean|默认的false|

## 配置文件格式
> config配置会用于数据的提取

- FormConfig

|name|description|format|ps|
|-----|-----|-----|-----|
|name|本项名称，用于操作get/set|string|`必填`|
|key|用于数据提取，以"."代表提取对象下一级，"\_"代表提取数组下元素|string|`必填`|
|input_type|组件类型|string|`必填`,详见components中index|
|label|输入组件label|string|默认为空|
|header_label|label是否在输入器上方，custom的嵌套类组件使用|boolean|默认为false|
|unit|输入组件单位|string|默认为空|
|span|输入组件占位|number|antd栅格标准|
|offset|输入组件间距|number|antd栅格标准|
|input_props|针对组件的option配置|input_props|详见下方描述|
|rules|验证规则|string或object|当配置为string是，可验证基本数据类型，请使用"\|"将需要验证的条件分离；当验证的数据类型为引用数据类型时，可以传入对象，定义对应的键名表明验证条件，见`例1-1`；默认为空|

- input_props

|name|description|format|ps|
|-----|-----|-----|-----|
|type|组件的子类型|string|组件名称全小写，使用下划线命名|
|`Input`|
|`Date`|
|format|date组件日期格式|string||
|`Select`|
|selectOptions|option配置,当type为multiple时渲染对象下的属性|{value:string\|number, label:stirng\|numbmer}|
|renderData|除default外，组件会根据renderData的字段自动提取对象的值。例如：['a'],组件会自动取出对象下a与aNote的值|Array<string\|{key:string,label:string}>||
|extraEditors|额外渲染的输入器,根据选中的value值渲染|Array<ExtraEditors>||
|`Checkbox`|
|type|提供default,multiple,custom三个形式|string|默认为default|
|radio|checkbox是否为单选，在multiple下可设置为false|boolean|默认为true|
|renderData|除default外，组件会根据renderData的字段自动提取对象的值。例如：['a'],组件会自动取出对象下a与aNote的值|Array<RenderData>||
|`Table`|
|editable|是否可编辑table|boolean||
|tableColumns|渲染tableColumns|{key:string, title: stirng, editor: FormConfig}|若editable为true且editor不为undefined，双击可修改表单值|
|`Custom`|
|config|下一级表单配置|Array\<FormConfig\>|嵌套表单|
|续待未完|

- RenderData

|name|description|format|ps|
|-----|-----|-----|-----|
|key|需要渲染键名|string|`必填`|
|label|渲染键名label值|string|在multiple模式下`必填`|
|options|使用custom模式下渲染选项|Array\<label:string,value:string\|number\|boolean\>|详见`例子1-2`|
|extraEditors|选择额外渲染的编辑器|Array\<key:string\|number\|boolean,editors:Array<FormConfig>>|


> 关于多个编辑器的保存格式：
> 若有2个编辑器，则数据会以{"0":"", "1":""}这样的形式输出到keyNote上

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

- 例1-2 checkbox渲染
```
const data = { // 需要渲染
    obj:{
        // a，b为勾选项
        a: true,
        aNote: "这是一个a备注",
        b: true    
        bNote: "这是一个b备注",
        // c为是否选项|枚举选项
        c: true    // enum|boolean
        cNote: "这是一个b备注"
    }
};

// 渲染出一组含a，b两项的输入框,选中后可以弹出输入框，输入框数据自动以{"0":"","1":""}抛出
{
    name: "obj-xxx", key: ".obj", input_type: "checkbox",
    input_props:{
        type: "multiple",
        renderData:[
            {
                key:"a",
                label:"a选项",
                extraEditors:[
                    {
                        key:"a", // 此处对应 键名 a
                        editors:[
                            {
                                name:"",
                                key: "",  
                                input_type:"input"
                            }
                        ]
                    }
                ]
            },
            {
                key:"b",
                label:"b选项",
                extraEditors:[
                    {key:"b", editors:[{name:"",key:"",input_type:"input"}]}
                ]
            }
        ]
    }
}

// 渲染c数据，有、无选项 或 emun
{
    name: "obj-ccc", key: ".obj", input_type: "checkbox",
    input_props: {
        type: "custom",
        renderData:[
            {
                key: "c", 
                label: "c", 
                options: [
                    {label:"有",value: true},
                    {label:"无",value: false},
                ],
                extraEditors: [
                    {
                        key: 1   // 对应options中的value
                        editors:[
                            {
                                name: "",
                                key: "",
                                input_props: "input"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

## formHandler方法描述

在form层会创建一个formHandler对象，对象中会包含渲染的每一项的操作方法以及form的操作方法

- formHandler

|name|description|format|ps|
|-----|-----|-----|-----|
|submit|提交表单|() => Promise|提供validCode和data两个参数||
|subscribe|订阅相关事件|(fieldName,eventName,callback)|订阅对应fieldName的event|
|dispatch|提交触发事件|(fieldName,eventName, args)|用于触发相关订阅事件|
|name|每一个子项的操作方法|<itemHanlder>|目前仅使用itemHandler下的actions中方法|

- itemHandler.action

|name|description|format|ps|
|-----|-----|-----|-----|
|getValue|设置value|(fieldName) => value|用于在页面获取子项的值|
|setValue|获取value|(value)|用于在页面设置子项的值|
|valid|用于触发验证|() => error|触发验证方法,error为boolean|

## 组件书写格式

- props（输入）

|name|description|format|ps|
|-----|-----|-----|-----|
|onChange|用于formItem中赋值的回调方法|||
|dispatch|formHandler中的diapatch，用于提交一个事件|||
|value|当前组件渲染的值|||
|input_props|当前组件配置值|||



