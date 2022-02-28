'use strict'

// 1 вар.

var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

function anClean(arr) {
  var bildObj = {};

  for (var i = 0; i < arr.length; i++) {
    var s = arr[i].toLowerCase().split('').sort().join('');
    bildObj[s] = arr[i];
  }

  return Object.values(bildObj);
}

console.log(anClean(arr));

// 2 вар.

function anClean(arr) {
  var charObj = {};
  arr = arr.toLowerCase().replace(/[^\w]/g);
  for (var char of arr) {
    charObj[char] = charObj[char] + 1 || 1;
  }
  return charObj;
}

function anagram(strA, strB) {
  var aCharObj = anClean(strA);
  var bCharObj = anClean(strB);

  if (Object.keys(aCharObj).length !== Object.keys(bCharObj).length) {
    return false;
  }
  
  for (var char in aCharObj) {
    if (aCharObj[char] !== bCharObj[char]) {
      return false;
    }
  }
  return true;
}