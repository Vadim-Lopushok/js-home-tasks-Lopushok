'use strict';

function hashStorage() {
  this.storage = {};
}

hashStorage.prototype.addValue = function (key, value) {
  this.storage[key] = value;
};

hashStorage.prototype.getValue = function (key) {
  if (key in this.storage) {
    return this.storage[key];
  }
  return undefined;
};

hashStorage.prototype.deleteValue = function (key) {
  if (key in this.storage) {
    delete this.storage[key];
    return true;
  }
  return false;
};

hashStorage.prototype.getKeys = function () {
  return Object.keys(this.storage);
};