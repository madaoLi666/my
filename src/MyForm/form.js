function isArr(v){
  return Object.prototype.toString.call(v) === '[object Array]';
}

export function createFormHandler(config, submitChange){
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

  const eventCallBacks = {}
  const formState = {
    validated: false,
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
    Object.keys(this).forEach(key => {
      if(this[key].actions){
        if(typeof this[key].actions.getValue === "function"){
          r = Object.assign(r, {[key]: this[key].actions.getValue()});
        }
        if(typeof this[key].actions.valid === "function"){
          const result = this[key].actions.valid();
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

  const subscribe = function(fieldName, eventName, cb) {
    if(fieldName in this || fieldName === "_global"){
      if(!eventCallBacks[fieldName]){
        eventCallBacks[fieldName] = {};
      }
      eventCallBacks[fieldName][eventName] = cb;
    }
  }

  const dispatch = function(fieldName, eventName, args) {
    try{
      if(fieldName !== "_global" && submitChange){
        dispatch("_global", "change");
      }
      return eventCallBacks[fieldName][eventName](args);
    }catch(e){
      // console.warn(e);
    }
  }

  const formHandler = {...initField(config)}
  formHandler.submit = submit;
  formHandler.subscribe = subscribe;
  formHandler.dispatch = dispatch;
  formHandler.formState = formState;
  return formHandler;
}
