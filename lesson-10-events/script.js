'use strict'
var dynArray = [
  {p: 'Для внесения вашего сайта в каталог, заполните форму:', name: 'form'},
  {label:'Разработчики: ',type:'text',name:'author',required:'true',class:'dynForm'},
  {label:'Название сайта: ',type:'text',name:'title',required:'true',class:'dynForm'},
  {label:'URL сайта: ',type:'text',name:'url',required:'true',class:'dynForm'},
  {label:'Дата запуска сайта: ',type:'text',name:'date',required:'true',class:'dynForm'},
  {label:'Посетителей в сутки: ',type:'text',name:'customers',required:'true',class:'dynForm'},
  {label:'E-mail для связи: ',type:'email',name:'mail',required:'true',class:'dynForm'},
  {label:'Рубрика каталога: ',type:'select',name:'catalog',options:[{value:'1',text:'бытовая техника'},{value:'2',text:'здоровье'},{value:'3',text:'домашний уют'}],class:'dynForm'},
  {label:'Размещение: ',type:'radio',name:'public',options:[{value:'1',text:'бесплатное '},{value:'2',text:'платное'},{value:'3',text:'VIP'}],class:'dynForm'},
  {label:'Разрешить отзывы ',type:'checkbox',name:'comments',checked:'true',class:'dynForm'},
  {label:'Описание сайта: ',type:'textarea',name:'description',class:'dynForm'},
  {value:'Опубликовать ',type:'submit'}
];

function dynForm(arr, form) {
  if (arr) {
    arr.forEach(dynFormInput);
  }
  function dynFormInput(element) {
    if (element.name == 'form') {
      var newTagElement = document.createElement('p');
      var newTextElement = document.createTextNode(element.p);
      newTagElement.appendChild(newTextElement);
      form.appendChild(newTagElement);
    }

    if (
      element.type == 'email' ||
      element.type == 'text'
    ) {
      var newTagElement = document.createElement('p');
      var newLabelElement = document.createElement('label');
      var newInputElement = document.createElement('input');
      var newTextElement = document.createTextNode(element.label);
      newInputElement.type = element.type;
      newInputElement.name = element.name;

      if (element.required) {
        newInputElement.required = true;
      }

      newInputElement.classList.add(element.class);
      newLabelElement.appendChild(newTextElement);
      newLabelElement.appendChild(newInputElement);
      newTagElement.appendChild(newLabelElement);
      form.appendChild(newTagElement);
    }

    if (element.type == 'submit') {
      var newTagElement = document.createElement('p');
      var newInputElement = document.createElement('input');
      newInputElement.type = element.type;
      newInputElement.value = element.value;

      newTagElement.appendChild(newInputElement);
      form.appendChild(newTagElement);
    }

    if (element.type == 'select') {
      var newTagElement = document.createElement('p');
      var newLabelElement = document.createElement('label');
      var newTextElement = document.createTextNode(element.label);
      var newSelectElement = document.createElement('select');
      newSelectElement.name = element.name;
      newSelectElement.classList.add(element.class);

      newLabelElement.appendChild(newTextElement);

      for (var i = 0; i < element.options.length; i++) {
        var newOptionElement = document.createElement('option');
        newOptionElement.value = element.options[i].value;
        var newTextElement = document.createTextNode(element.options[i].text);
        newOptionElement.appendChild(newTextElement);

        newSelectElement.appendChild(newOptionElement);
      }
      newLabelElement.appendChild(newSelectElement);
      newTagElement.appendChild(newLabelElement);
      form.appendChild(newTagElement);
    }
    if (element.type == 'radio') {
      var newTagElement = document.createElement('p');
      var newLabelElement = document.createElement('label');
      var newTextElement = document.createTextNode(element.label);
      newLabelElement.appendChild(newTextElement);
      newTagElement.appendChild(newLabelElement);

      for (var i = 0; i < element.options.length; i++) {
        var newRadioElement = document.createElement('input');
        newRadioElement.value = element.options[i].value;
        newRadioElement.type = 'radio';
        newRadioElement.name = element.name;
        var newLabelRElement = document.createElement('label');
        var newTextElement = document.createTextNode(element.options[i].text);
        newLabelRElement.appendChild(newRadioElement);
        newLabelRElement.appendChild(newTextElement);
        newTagElement.appendChild(newLabelRElement);
      }
      form.appendChild(newTagElement);
    }
    if (element.type == 'checkbox') {
      var newTagElement = document.createElement('p');
      var newLabelElement = document.createElement('label');
      var newTextElement = document.createTextNode(element.label);
      newLabelElement.appendChild(newTextElement);

      var newCheckElement = document.createElement('input');
      newCheckElement.type = 'checkbox';
      newCheckElement.name = element.name;
      element.checked
        ? (newCheckElement.checked = 'true')
        : (newCheckElement.checked = 'false');
      newLabelElement.appendChild(newCheckElement);
      newTagElement.appendChild(newLabelElement);
      form.appendChild(newTagElement);
    }
    if (element.type == 'textarea') {
      var newTagElement = document.createElement('p');
      var newLabelElement = document.createElement('label');
      var newTextElement = document.createTextNode(element.label);
      newLabelElement.appendChild(newTextElement);

      var newTextareaElement = document.createElement('textarea');
      newTextareaElement.name = element.name;
      newTextareaElement.classList.add(element.class);
      newLabelElement.appendChild(newTextareaElement);
      newTagElement.appendChild(newLabelElement);
      form.appendChild(newTagElement);
    }
  }
}

dynForm(dynArray,testForm);