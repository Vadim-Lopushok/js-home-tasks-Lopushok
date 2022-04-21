function tLocalStorage(keyName) {
  var self = this;

  self.pHash = {};

  var localHash;
  if (localStorage.getItem(keyName)) {
    if (keyName === "DRINKS") {
      localHash = JSON.parse(localStorage.DRINKS);
      self.lsHash = localHash;
    }
  }

  self.addValue = function(key, value) {
    self.pHash[key] = value;
  }

  self.getValue = function(key) {
    if (key in self.pHash) {
      return self.pHash[key];
    } else {
      return undefined;
    }
  }

  self.deleteValue = function(key) {
    if (key in self.pHash) {
      delete self.pHash[key];
      return true;
    } else {
      return false;
    }
  }

  self.getKeys = function() {
    var keys = [];
    for (var key in self.pHash) {
      keys.push(' ' + key);
    }

    return keys;
  }

  self.store = function() {
    localStorage.setItem(keyName, JSON.stringify(self.pHash));
  }
}