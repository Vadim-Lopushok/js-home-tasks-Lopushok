'use strict'

function TAJAXStorage() {

  var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  var storageA = {};
  var UpdateKeyWord;

  $.ajax(AjaxHandlerScript,
    {
      type: 'POST',
      dataType: 'json',
      data:{f: 'READ', n: 'vadzimDrinksProject'},
      success: DataLoaded,
      error: ErrorHandler
    });

  function DataLoaded(data) {
    if (data !== '') {
      storageA = JSON.parse(data.result)
      console.log('dataload: ' + data.result)
    } else if (data === '') {
      $.ajax(AjaxHandlerScript,
        {
          type: 'POST',
          dataType: 'json',
          data:{f: 'INSERT', n: 'vadzimDrinksProject', v: JSON.stringify(storageA)},
          success: DataI,
          error: ErrorHandler
        });
      function DataI(data) {
        console.log('Data: ' + data.result);
      }
    }
  }

  function saveValue(hash) {
    UpdateKeyWord = Math.random();
    $.ajax(AjaxHandlerScript,
      {
        type: 'POST',
        dataType: 'json',
        data:{f: 'LOCKGET', n: 'vadzimDrinksProject', p: UpdateKeyWord},
        cache: false,
        success: lockGetReady,
        error: ErrorHandler
      });
    function lockGetReady(data) {
      console.log('lockGetReady: ' + data.result)
      $.ajax(AjaxHandlerScript,
        {
          type: 'POST',
          dataType: 'json',
          data:{f: 'LOCKGET', n: 'vadzimDrinksProject', v: JSON.stringify(hash) , p: UpdateKeyWord},
          cache: false,
          success: updateReady,
          error: ErrorHandler
        });
      function updateReady(data) {
        console.log('update: ' + data.result)
      }
    }
  }

  function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  }


  TAJAXStorage.prototype.addValue = function (key, value) {
    storageA[key] = value;
    saveValue(storageA);
  }

  TAJAXStorage.prototype.getValue = function (key) {
    return storageA[key];
  }

  TAJAXStorage.prototype.deleteValue = function (key) {
    if (storageA[key]) {
      delete storageA[key];
      saveValue(storageA);
      return true;
    } else {
      return false;
    }
  }

  TAJAXStorage.prototype.getKeys = function () {
    return Object.keys(storageA);
  }
}




