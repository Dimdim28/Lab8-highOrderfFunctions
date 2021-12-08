'use strict';

const contract2 = (fn, ...types) => (...args) => {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const def = types[i];
    const name = def.name.toLowerCase();
    if (typeof arg !== name) {
      throw new TypeError(`Argument type ${name} expected`);
    }
  }
  const res = fn(...args);
  const def = types[args.length - 1];
  const name = def.name.toLowerCase();
  if (typeof res !== name) {
    throw new TypeError(`Result type ${name} expected`);
  }
  return res;
};
const contract3 = (fn, ...types) => (...args) => {
  const typeResFn = types.pop();//взяли последний элемент  типов
  const resFn = fn(...args);// создали функцию fn от передаваемых  параметров
  let isMatch = (args.length <= types.length) && (typeof(resFn) === typeof(typeResFn()));// сравнили (длинну массива аргументов и массива типов) и (тип массива аргументов и последнего элемента типов)
  if (isMatch) { //  если тру
    for (const i in args) {
      if (typeof(args[i]) !== typeof(types[i]())) {
        isMatch = false;
        break;
      }
    }
  }
  if (isMatch) return resFn;   //  если тру то вернет ресфн
  else throw new TypeError('Argument types mismatch');
};
const contract = (fn, ...types) => (...args) => {
  const typeResFn = types.pop();
  const resFn = fn(...args);
  let isMatch = (args.length <= types.length) && (typeof(resFn) === typeof(typeResFn()));
  if (isMatch) {
    for (const i in args) {
      if (typeof(args[i]) !== typeof(types[i]())) {
        isMatch = false;
        break;
      }
    }
  }
  if (isMatch) return resFn;
  else throw new TypeError('Argument types mismatch');
}; 

const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);
const res = addNumbers(2, 3);
console.dir(res); // Output: 5


const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
const res2 = concatStrings('Hello ', 'world!');
console.dir(res2); // Output: Hello world!



module.exports = { contract };
