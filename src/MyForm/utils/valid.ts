interface ValidateRule{
  [key:string]: (val: any) => boolean
}

interface rulesModel{
  [key:string]: Array<string|rulesModel>
}


function isBase(data: any):boolean{
  return typeof data !== "object";
}

function isArr(data: any):boolean{
  return Object.prototype.toString.call(data) === "[object Array]";
}

function isObj(data:any):boolean{
  return Object.prototype.toString.call(data) === '[object Object]';
}
function isRegExp(data: any):boolean{
  return data instanceof RegExp;
}

const errorText:{[key:string]:string} = {
  "required": "此输入值不可为空"
}

const validateRules: ValidateRule = {
  "required":function(val:any){
    return !!val;
  }
}

/**
 * 
 * @param data 
 * @param rules
 * 1.规则以 数组 的形式送入此函数，数组每项元素为并行校验
 * 2.规则以 字符串|对象 形式送入函数
 */

export const validFun = function(data:any, rules:any):any{
  if(!rules) return "";
  if(isArr(rules)){
    // 数组
    let r = {};
    for(const item of rules){
      r = Object.assign(r, validFun(data, item));
    }
    return r;
  }else if(isObj(rules)){
    // 对象
    let r = {};
    for(const key in rules){
      r = Object.assign(r, {[key]: validFun(data[key], rules[key])});
    }
    return r;
  }
  if(isRegExp(rules)){
    return rules.test(data) ? "" : "正则验证不通过";
  }else{
    return validateRules[rules](data) ? "" : errorText[rules];
  }
}