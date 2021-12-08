'use strict';

const store = f => () => f;

const read = store(4);
const value = read();
console.log(value); 

const string = store('Valera');
const StringValue = string();
console.log(StringValue);

module.exports = { store };
