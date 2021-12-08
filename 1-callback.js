'use strict';

const obj = { a: 1, b: 2, c: 3 };
      

const iterate = (obj, callback) => {
    const allKeys = Object.keys(obj);
    for( const key of allKeys){
        const value = obj[key];
        callback(key,value,obj);
    }
}

iterate(obj, (key, value, object) => {
  console.log(`${key}, ${value},  ${object}`);
});

module.exports = { iterate };
