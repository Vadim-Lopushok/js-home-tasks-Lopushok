'use strict'

function isPal(string) {
  string = string.toLowerCase().replace(/\s/g, '');
  return string === string.split('').reverse().join('');
}

console.log(isPal('12321'));
console.log(isPal('А роза упала на лапу Азора'));
console.log(isPal('Вася'));
console.log(isPal('Anna'));

// 2 вариант с проверкой символов с первой половины строки с последовательным символом на другом конце строки. 

function isPal(string) {
  string = string.toLowerCase().replace(/\s/g, '');
  var s = Math.floor(string.length / 2);
  for (let i = 0; i < s; i++)
    if (string[i] !== string[string.length - i - 1]) {
      return false;
    }
  return true;
}

console.log(isPal('12321'));
console.log(isPal('А роза упала на лапу Азора'));
console.log(isPal('Вася'));
console.log(isPal('Anna'));