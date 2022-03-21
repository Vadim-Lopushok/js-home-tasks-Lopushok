'use strict';

window.onload = function () {
  var drinkStorage = new hashStorage();
  var listInfo = document.querySelector('.list');

  var add = document.querySelector('.buttons .add-coctail');
  add.onclick = function () {
    var key = prompt('Введите название напитка', '');
    var value = (function () {
      value = {};
      value.alcohol = confirm('Напиток алкогольный?');
      value.recept = prompt('Напишите рецепт','');
      return value;
    })();

    console.log(drinkStorage);
    return drinkStorage.addValue(key, value);
  };

  var info = document.querySelector('.buttons .info-coctail');
  info.onclick = function () {
    var key = prompt('Введите название напитка', '');
    var value = drinkStorage.getValue(key);
    var answer = `\nНапиток: ${key}; \nАлкогольный: ${value.alcohol ? 'Да' : 'Нет'}; \nРецепт приготовления: ${value.recept}.`;
    listInfo.innerHTML = answer;
  };

  var del = document.querySelector('.buttons .delete-coctail');
  del.onclick = function () {
    var key = prompt('Введите название напитка','');
    listInfo.innerHTML = drinkStorage.deleteValue(key);
  };
  
  var list = document.querySelector('.buttons .all-coctails');
  list.onclick = function () {
    listInfo.innerHTML = drinkStorage.getKeys().join(';\n');
  };
}