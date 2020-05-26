// TODO 关于开放式存储的结果转换问题今天搞掂 5/11
/**
 *  入参 obj 形式 {"0": "1, ..."} 
 */
export function getArrayFormObject(obj: object): Array<any> {
  const resArr: Array<any> = [];
  let flag: boolean = true;
  Object.keys(obj).forEach((key: string) => {
    if (/^[0-9]+$/.test(key)) {
      resArr[Number(key)] = obj[key];
    } else {
      flag = false;
    }
  })
  if (!flag) {
    console.warn("开放式数据中存在非JSON结构化的存储方式");
  }
  return resArr;
}


/**
 * 
 * @return resObj {"0":"", "1": ""}
 */
export function getObjectFormArray(arr: Array<any>): object {
  const resObj: object = {};
  for (let i = 0; i < arr.length; i++) {
    resObj[i] = arr[i];
  }
  return resObj;
}



export function isBase(data: any): boolean {
  return typeof data !== "object";
}

export function isArr(data: any): boolean {
  return Object.prototype.toString.call(data) === "[object Array]";
}

export function isObj(data: any): boolean {
  return Object.prototype.toString.call(data) === '[object Object]';
}
export function isNumber(str: string): boolean {
  return /^[0-9]+$/.test(str);
}

export function isStringObj(data: any): boolean {
  let resObj: object = {};
  try {
    resObj = JSON.parse(data);
  } catch (e) {
    return false;
  }
  return Object.prototype.toString.call(resObj) === '[object Object]';
}

export function isUndefinend(data: any) {
  return Object.prototype.toString.call(data) === '[object Undefined]';
}

/**
 * 用于extraEditors的数据转换方法
 */
export function convertExtraEditors(editorsValue: string): Array<any> | string {
  let res: any = editorsValue;
  if (!res) {
    return [""];
  }
  try {
    res = getArrayFormObject(JSON.parse(editorsValue));
    return res;
  } catch (e) {
    console.warn('不可转为JSON字符串');
  }
  return [res];
}

/**
 * 判断 对象|数组|基本数据类型 中的值是否为空
 */
export function isEmpty(data: any): boolean {
  if (isBase(data)) {
    return data === "";
  }
  if (isObj(data)) {
    let flag = false;
    Object.keys(data).forEach((key: string) => {
      if (isEmpty(data[key])) {
        flag = true;
      }
    })
    return flag;
  }
  if (isArr(data)) {
    let flag = false;
    for (let i = 0; i < data.length; i++) {
      if (isEmpty(data[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  return false;
}

/**
 * 检测圆形括号
 * 移除括号并返回
 * 若无则返回false
 */

const parenthesesReg = /\((.*)\)/;
const keyReg = /(.*)\(/

export function replaceParentheses(key: string): Array<string> | boolean {
  if(parenthesesReg.test(key)){
    const patternKey = keyReg.exec(key)[1];
    return [patternKey, patternKey + parenthesesReg.exec(key)[1]];
  }
  return false;
}