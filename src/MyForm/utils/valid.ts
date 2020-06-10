interface ValidateRule {
  [key: string]: (val: any) => boolean
}

const SPLIT_KEY = "|";
function isBase(data: any): boolean {
  return typeof data !== "object";
}
function isStr(data: any): boolean {
  return Object.prototype.toString.call(data) === "[object String]";
}

function isArr(data: any): boolean {
  return Object.prototype.toString.call(data) === "[object Array]";
}

function isObj(data: any): boolean {
  return Object.prototype.toString.call(data) === '[object Object]';
}
function isRegExp(data: any): boolean {
  return data instanceof RegExp;
}

const errorText: { [key: string]: string } = {
  "required": "此输入值不可为空",
  "number": "请输入数字",
  "chinaID": "请输入格式正确的中国居民身份证",
  "telephone": "请输入正确的手机号码"
}

const validateRules: ValidateRule = {
  "required": function (val: any): boolean {
    return val !== undefined && val !== "" && val !== null;
  },
  "number": function (val: any): boolean {
    return /^[0-9]+$/.test(val);
  },
  "chinaID": function (val: any): boolean {
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val);
  },
  "telephone": function (val: any): boolean {
    // return /^((\+|00)86)?((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/.test(val);
    return /^((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/.test(val);
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

export const validFun = function validFun(data: any, rules: any): any {
  if (!rules) return "";
  let errorTip: any = "";
  // data 为 null时，typeof为object
  if (isStr(rules) && (isBase(data) || !data)) {
    const ruleArr = rules.split(SPLIT_KEY);
    let isValid = true;
    for (let i = 0; i < ruleArr.length; i++) {
      isValid = validateRules[ruleArr[i]](data);
      if (!isValid) {
        errorTip = errorText[ruleArr[i]];
        break;
      }
    }
  } else if (isObj(rules) && isObj(data)) {
    errorTip = Object.assign({}, rules);
    try {
      Object.keys(rules).forEach((key: string) => {
        errorTip[key] = "";
        errorTip[key] = validFun(data[key], rules[key]);
      });
    } catch (e) {
      console.error(e);
    }
  } else if (isRegExp(rules) && (!isBase(data) || !data)) {
    errorTip = rules.test(data) ? "" : `正则验证 ${rules} 不通过`;
  } else if (isObj(rules) && isArr(data)) {
    errorTip = data.map((v: any) => {
      const obj = Object.assign({}, v);
      Object.keys(obj).forEach((key: string) => {
        obj[key] = "";
      });
      return obj;
    });
    for (let i = 0; i < errorTip.length; i++) {
      errorTip[i] = validFun(data[i], rules);
    }
    console.log(errorTip);
  } else {
    console.error(`Type of rules is ${typeof rules}, but type of data is ${typeof data} `);
  }
  return errorTip;
}