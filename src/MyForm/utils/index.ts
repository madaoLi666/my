/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import { FormConfig } from '../interface';
import { isBase, isArr, isObj, isNumber, isUndefinend } from './func';

const o: string = ".";
const a: string = "_";
const extra: RegExp = /\((.*)\)/;  // 用于匹配额外提取的同一层的key
const origin: RegExp = /(.*)\(/;   // 用于匹配(前的字符
const ALL: string = "*";

const OBJECT_KEY = ".";
const PLUS_KEY = "+";
// 考虑之后优化为多选
const EXTRA_REGEXP: RegExp = /\((.*)\)/;

interface TokenRuleArr {
  match: (str: string) => boolean,
  getRenderAction: Function,
  formatAction: Function
}

/* ========================== 重构getRenderData function ================================ */
/**
 * 使用字符串切割，不使用递归取值，优化一个速度的问题
 */
export function getRenderData(config: Array<FormConfig>, data: any): Array<FormConfig> {
  if (!data) return config;
  const rConfig = JSON.parse(JSON.stringify(config));
  for (let i = 0; i < rConfig.length; i++) {
    rConfig[i].value = getDataByPath(rConfig[i].key, data);
  }
  console.log(rConfig);
  return rConfig;
}

/**
 * 根据路径去获取数据，在最后一个数据会进入token函数取值
 * @param path 路径
 * @param data 数据
 */
function getDataByPath(path: string, data: any): any {
  const pathArr = path.split(OBJECT_KEY);
  let res: any = data;
  const len = pathArr.length;
  // 输入的第一个会有个点，pathArr[0]为"";
  for (let i = 1; i < len; i++) {
    // 这里写一个取值检查特殊符号的函数就行了
    if (i === len - 1) {
      res = getDataByToken(pathArr[i], res);
      continue;
    }
    res = res[pathArr[i]];
  }
  return res;
}

/**
 * 根据string识别出token进行取值
 * 不匹配规则就走默认的返回
 */
function getDataByToken(str: string, data: any) {
  for (let i = 0, len = tokenRuleArr.length; i < len; i++) {
    if (tokenRuleArr[i].match(str)) {
      return tokenRuleArr[i].getRenderAction(str, data);
    }
  }
  return data[str];
}

/**
 * token 责任链
 * 0 - 匹配 () 仅做一个圆括号的匹配 提取出一个对象
 *     prefixKey - 圆括号前的key
 * 1 - 匹配 +  提取出一个对象
 */
const tokenRuleArr: Array<TokenRuleArr> = [
  {
    match: (str: string) => EXTRA_REGEXP.test(str),
    getRenderAction: function (str: string, data: any): any {
      const regExpRes = EXTRA_REGEXP.exec(str);
      if (regExpRes) {
        const prefixKey = str.substring(0, regExpRes.index);
        const targetKey = prefixKey + regExpRes[1];
        if (!prefixKey) {
          console.warn("prefixKey is undefined of empty string");
          return data[str];
        }
        return {
          [prefixKey]: data[prefixKey],
          [targetKey]: data[targetKey]
        }
      }
      return data[str];
    },
    formatAction: function (str: string, data: any): any {
      return { [str]: data };
    }
  },
  {
    match: (str: string) => str.includes(PLUS_KEY),
    getRenderAction: function (str: string, data: any): any {
      const res: any = {};
      const strArr = str.split(PLUS_KEY);
      strArr.forEach((v: any) => {
        if (v) {
          res[v] = data[v];
        }
      });
      return res;
    },
    formatAction: function (str: string, data: any): any {
      return { [str]: data };
    }
  }
]

/* ============================== 重构 本地格式转为接口格式 ==================================== */
export function getFormData(data: { [key: string]: { value: any, path: string } }): any {
  const res: any = {};
  Object.keys(data).forEach((v: string) => {
    generateObjectByPath(
      data[v].path, data[v].value
    );
  });
  return data;
}

function generateObjectByPath(path: string, value: any): any {
  const pathArr = path.split(OBJECT_KEY);
  const len = pathArr.length;
  let res: any = value;
  // 从数组后端向前遍历，对最后的一个(len-1)这个才需要做匹配
  for (let i = len - 1; i > 0; i--) {
    if (i === len - 1) {
      res = formatByToken(pathArr[i], res);
      continue;
    }
    res = { [pathArr[i]]: res };
  }
  console.log(res);
}

function formatByToken(str: string, data: any): any {
  for (let i = 0, len = tokenRuleArr.length; i < len; i++) {
    if (tokenRuleArr[i].match(str)) {
      return tokenRuleArr[i].formatAction(str, data);
    }
  }
  return data;
}

/* ============================== 本地格式转为接口格式 ==================================== */
/**
 * 默认parentKey为数字是即生成数组
 * @param {string} parentKey 
 * @param {object|Array} data 
 */
function newObj(parentKey: string, currentKey: string, data: any) {
  if (!currentKey || !data) return {};
  let r: { [key: string]: any } = {};
  if (parentKey === "") {
    if (isNumber(currentKey)) {
      r = [];
      r[Number(currentKey)] = data;
    } else {
      if (extra.test(currentKey)) {
        const originKey = origin.exec(currentKey)[1];
        const extraKey = extra.exec(currentKey)[1];
        if (originKey !== null && extraKey !== null) {
          r[originKey] = data[originKey];
          r[originKey + extraKey] = data[originKey + extraKey];
        }
      } else {
        r[currentKey] = data;
      }
    }
  } else {
    if (isNumber(currentKey)) {
      const g: { [key: string]: any } = {};
      g[parentKey] = [];
      g[parentKey][Number(currentKey)] = data;
      r = _assign(r, toFormat(g));
    } else {
      const g: { [key: string]: any } = {};
      g[parentKey] = {};
      if (extra.test(currentKey)) {
        const originKey = origin.exec(currentKey)[1];
        const extraKey = extra.exec(currentKey)[1];
        if (originKey !== null && extraKey !== null) {
          g[parentKey][originKey] = data[originKey];
          g[parentKey][originKey + extraKey] = data[originKey + extraKey];
        }
        r = _assign(r, toFormat(g));
      } else {
        g[parentKey][currentKey] = data;
        r = _assign(r, toFormat(g));
      }
    }
  }
  return r;
}

/**
 * 2个参数必须为相同类型的参数
 * 因为转换出来的对象名称相同，直接使用Object.assign会导致覆盖
 * 所有需要此方法做合并处理（正常情况下是不会去重的，除非在转换的时候已经出现了重复）
 * 合并两个对象
 */
function _assign(mainData: any = {}, newData: any = {}): any {
  if (isObj(mainData) && isObj(newData)) {
    const mainKey = Object.keys(mainData);
    const newKey = Object.keys(newData);
    for (let i = 0; i < newKey.length; i++) {
      let flag = false;
      for (let j = 0; j < mainKey.length; j++) {
        const mk = mainKey[j];
        const nk = newKey[i];
        if (mk === nk) {
          flag = true;
          // 判别下一层是不是数组，做数组合并
          if (isArr(mainData[mk]) && isArr(newData[nk])) {
            const len = mainData[mk].length > newData[nk].length ? mainData[mk].length : newData[nk].length;
            for (let k = 0; k < len; k++) {
              mainData[mk][k] = _assign(mainData[mk][k], newData[nk][k])
            }
          } else if (isObj(mainData[mk]) && isObj(newData[mk])) {
            // default object
            mainData[mk] = _assign(mainData[mk], newData[nk]);
          } else if (isUndefinend(mainData[mk])) {
            mainData[mk] = newData[mk];
          }
        }
      }
      if (!flag) {
        mainData = {
          ...mainData,
          [newKey[i]]: newData[newKey[i]]
        }
      }
    }
  } else if (isUndefinend(newData)) {
    // mainData = newData;
  } else {
    console.error("其中一个参数不是对象||二者皆不为对象||两者数据类型不相同，不可以做合并操作");
  }
  return mainData;
}

/**
 * Convert custom data to server format data
 * oi - objectIndex
 * ai - arrayIndex
 */
function toFormat(data: { [key: string]: any }): object {
  let r = {};
  Object.keys(data).forEach(key => {
    // 合并 * 
    if (key === `.${ALL}`) {
      r = _assign(r, data[key]);
      return;
    }
    const oi = key.lastIndexOf(o);
    const ai = key.lastIndexOf(a);
    if (oi === ai) {
      console.warn('isolated data');
      r = _assign(r, newObj("", key, data[key]));
    } else if (oi === -1) {
      const currentKey = key.substring(ai + 1, key.length);
      const parentKey = key.substring(0, ai);
      r = _assign(r, newObj(parentKey, currentKey, data[key]));
    } else if (ai === -1) {
      const currentKey = key.substring(oi + 1, key.length);
      const parentKey = key.substring(0, oi);
      r = _assign(r, newObj(parentKey, currentKey, data[key]));
    } else if (oi < ai) {
      // 变成数组
      const currentKey = key.substring(ai + 1, key.length);
      const parentKey = key.substring(0, ai);
      r = _assign(r, newObj(parentKey, currentKey, data[key]));
    } else if (oi > ai) {
      const currentKey = key.substring(oi + 1, key.length);
      const parentKey = key.substring(0, oi);
      r = _assign(r, newObj(parentKey, currentKey, data[key]));
    }
  })
  return r;
}

function getFormData1(data: Array<{ value: any, path: string }>): object {
  let r = {};
  console.log(data);
  Object.keys(data).forEach((key: string) => {
    r = _assign(r, toFormat({
      [data[key].path]: data[key].value
    }));
  })
  return r;
}