import { isEmpty } from './utils/func';

function isArr(v){
  return Object.prototype.toString.call(v) === '[object Array]';
}

export function createFormHandler(config, {submitChange}){
  if(!isArr(config)){
    throw new Error(`expect array but${typeof config}`);
  }
  /**
   * @param {string} fieldName
   * @param {string} eventName
   * @param {function} cb
   * fieldName:{
   *   eventName:cb
   * }
   */

  const eventCallBacks = {

  }
  const formState = {
    validateCode: false,
    submitChange
  }

  // c - config
  const initField = function(c) {
    let r = {};
    c.forEach(v => {
      r = Object.assign(r, {
        [v.name]: {
          actions:{},
          effects:{}
        }
      })
    });
    return r;
  }

  const submit = function() {
    let r = {}
    let validCode = true;
    Object.keys(formHandler).forEach(key => {
      if(formHandler[key].actions){
        if(typeof formHandler[key].actions.getValue === "function"){
          r = Object.assign(r, {[key]: formHandler[key].actions.getValue()});
        }
        if(typeof formHandler[key].actions.valid === "function"){
          const result = formHandler[key].actions.valid();
          if(!result && validCode){
            validCode = false;
          }
        }
      }
    })
    return new Promise(resolve => {
      resolve({validCode,res: r})
    })
  }

  const reset = function() {
    Object.keys(formHandler).forEach(key => {
      if(formHandler[key].actions){
        if(formHandler[key].actions.reset){
          formHandler[key].actions.reset();
        }
      }
    })
  }

  // TODO 所有的valid方法需要整改
  const valid = function() {
    let validCode = true;
    const keyArr = Object.keys(formHandler);
    for(let i = 0 ; i < keyArr.length ; i++){
      if(formHandler[keyArr[i]].actions && typeof formHandler[keyArr[i]].actions.valid === "function"){
        if(!formHandler[keyArr[i]].actions.valid()){
          validCode = false;
          break;
        }
      }
    }
    return validCode;
  }


  const subscribe = function(fieldName, eventName, cb) {
    // if(fieldName in this || fieldName === "_global"){
    // 这里使用this会导致subscribe传给组件后this丢失
    if(fieldName in formHandler || fieldName === "_global"){
      if(!eventCallBacks[fieldName]){
        eventCallBacks[fieldName] = {};
      }
      if(!eventCallBacks[fieldName][eventName]){
        eventCallBacks[fieldName][eventName] = [];
      }
      let flag = true;
      for(let i = 0 ; i < eventCallBacks[fieldName][eventName].length ;i++){
        if(cb === eventCallBacks[fieldName][eventName][i]){
          flag = false;
          break;
        }
      }
      if(flag){
        eventCallBacks[fieldName][eventName].push(cb);
      }

    }
  }

  const dispatch = function(fieldName, eventName, args) {
    if(fieldName !== "_global" && submitChange){
      dispatch("_global", "change");
      // return;
    }

    if(!Object.prototype.hasOwnProperty.call(eventCallBacks, fieldName)) {
      console.warn(`fieldName ${fieldName} not found in eventCallBacks Object`);
      return;
    }
    const eventObject = eventCallBacks[fieldName];

    const eventQueue = eventObject[eventName];
    if(!eventQueue || eventQueue.length === 0){
      console.warn(`fieldName ${eventName} not found in ${fieldName} Event Object || eventQueue's length is 0`);
      return;
    }
    eventQueue.forEach(func => {
      func(args);
    })
  }

  const formHandler = {...initField(config)}
  formHandler.submit = submit;
  formHandler.valid = valid;
  formHandler.reset = reset;
  formHandler.subscribe = subscribe;
  formHandler.dispatch = dispatch;
  formHandler.formState = formState;
  return formHandler;
}
