// TODO 用ts重写
function isArr(v){
  return Object.prototype.toString.call(v) === '[object Array]';
}

export function createFormHandler(config){
  if(!isArr(config)){
    throw new Error('expect array but'+ typeof config);
  }
  /**
   * @param {string} fieldName
   * @param {string} eventName
   * @param {function} cb
   * fieldName:{
   *   eventName:cb
   * }
   */
  var eventCallBacks = {}
  var formState = {
    validated: false,
  }

  var initField = function(config) {
    let r = {};
    config.forEach(v => {
      r = Object.assign(r, {
        [v.path]: {
          actions:{}, 
          effects:{}
        }
      })
    });
    return r;
  }
  

  var submit = function(){
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
    return {
      validCode: validCode,
      data: r
    };
  }

  var subscribe = function(fieldName, eventName, cb){
    if(fieldName in this){
      if(!eventCallBacks[fieldName]){
        eventCallBacks[fieldName] = {};
      }
      eventCallBacks[fieldName][eventName] = cb;
    }
  }

  var dispatch = function(fieldName, eventName, args){
    console.log(eventCallBacks);
    return eventCallBacks[fieldName][eventName](args);
  }

  var formHandler = {...initField(config)}
  formHandler.submit = submit;
  formHandler.subscribe = subscribe;
  formHandler.dispatch = dispatch;
  formHandler.formState = formState;
  return formHandler;
}
