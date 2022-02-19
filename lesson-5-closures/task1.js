'use strict'

var payJohn =  {
  fullName: 'John Smith',
  billsJohn: [124, 48, 268, 180, 42],
  tipsJohn: [],
  finalPaid: [],
  calcValueTip: function() {
    for (var i = 0; i < this.billsJohn.length; i++) {
      if (this.billsJohn[i] < 50) {
        this.tipsJohn.push((this.billsJohn[i] / 100) * 20);
      } else if (this.billsJohn[i] >= 50 && this.billsJohn <= 200) {
        this.tipsJohn.push((this.billsJohn[i] / 100) * 15);
      } else {
        this.tipsJohn.push((this.billsJohn[i] / 100) * 10);
      }
    }
    for (var i = 0; i < this.tipsJohn.length; i++) {
      this.finalPaid.push(this.tipsJohn[i] + this.billsJohn[i]);
    }
  }
}

payJohn.calcValueTip();
console.log('John tips: ' + payJohn.tipsJohn + '.' + '' + 'John Average: ' + payJohn.finalPaid + '');

var payMark = {
  fullName: 'Mark Smith',
  billsMark: [77, 375, 110, 45],
  tipsMark: [],
  finalPaid: [],
  calcValueTip: function() {
    for (var i = 0; i < this.billsMark.length; i++) {
      if (this.billsMark[i] < 100) {
        this.tipsMark.push((this.billsMark[i] / 100) * 20);
      } else if (this.billsMark[i] >= 100 && this.billsMark <= 300) {
        this.tipsMark.push((this.billsMark[i] / 100) * 15);
      } else {
        this.tipsMark.push((this.billsMark[i] / 100) * 25);
      }
    }
    for (var i = 0; i < this.tipsMark.length; i++) {
      this.finalPaid.push(this.tipsMark[i] + this.billsMark[i]);
    }
  }
}

payMark.calcValueTip();
console.log('Mark tips: ' + payMark.tipsMark + '.' + '' + 'John Average: ' + payMark.finalPaid + '');

function calcTips (averageTips) {
  var sum = 0;
  for (var i = 0; i < averageTips.length; i++) {
    sum += averageTips[i];
  }
  return sum / averageTips.length;
}

if (calcTips(payJohn.tipsJohn) > calcTips(payMark.tipsMark)) {
  console.log('John highest tips average');
} else if (calcTips(payMark.tipsMark) > calcTips(payJohn.tipsJohn)) {
  console.log('Mark highest tips average');
} else {
  console.log('Same tips average');
}