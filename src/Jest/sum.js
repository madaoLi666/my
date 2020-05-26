// function ay () {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(1);
//     },1000);
//   })
// }

// module.exports = ay;
const parenthesesReg = /\((.*)\)/;
const keyReg = /(.*)\(/;

function checkParentheses(key){
  if(parenthesesReg.test(key)){
    return keyReg.exec(key,"")[1] + parenthesesReg.exec(key,"")[1];
  //   return key.replace(parenthesesReg,"");
  }
  return false;
}

console.log(checkParentheses("a(Note)"))