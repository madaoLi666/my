interface ValidateRule{
  [key:string]: (val: any) => boolean
}

interface rulesModel{
  [key:string]: Array<string|rulesModel>
}

const SPLIT_KEY = "|";
function isBase(data: any):boolean{
  return typeof data !== "object";
}
function isStr(data:any):boolean{
  return Object.prototype.toString.call(data) === "[object String]";
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
  "required": "此输入值不可为空",
  "number": "请输入数字"
}

const validateRules: ValidateRule = {
  "required":function(val:any):boolean{
    return !!val;
  },
  "number":function(val:any):boolean{
    return /^[0-9]+$/.test(val);
  }
}

/**
 * 
 * @param {any} data 
 * @param {string|object|RegExp|null} rules
 * 输入规则
 * 1.基本数据类型校验rules格式 string
 * 2.引用数据类型校验rules格式 {}
 * 3.若输入的rule类型和data类型不相同，报错但可通过校验
 * TODO
 * 暂时写any 以后改类型
 */

export const validFun = function(data:any, rules:any):any{
  if(!rules) return "";
  let errorTip:any = "";
  // data 为 null时，typeof为object
  if(isStr(rules) && (isBase(data) || !data)){
    let ruleArr = rules.split(SPLIT_KEY);
    let isValid = true;
    for(let i = 0 ; i < ruleArr.length ; i++){
      isValid = validateRules[ruleArr[i]](data);
      if(!isValid){
        errorTip = errorText[ruleArr[i]];
        break;
      }
    }
  }else if(isObj(rules) && !isBase(data)){
    errorTip = Object.assign({}, rules);
    try{
      Object.keys(rules).forEach((key:string) => {
        errorTip[key] = "";
        errorTip[key] = validFun(data[key], rules[key]);
      });
    }catch(e){
      console.error(e);
    }
  }else if(isRegExp(rules) && (!isBase(data) || !data)){
    errorTip = rules.test(data) ? "" : `正则验证 ${rules} 不通过`;
  }else{
    console.error(`Type of rules is ${typeof rules}, but type of data is ${typeof data} `);
  }
  return errorTip;
}