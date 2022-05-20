//получение контента в соответствии с хэшом в адресной строке
function getContent() {
  let URLHash = window.location.hash;
  URLHash = URLHash.slice(1);
  let url = `pages/${URLHash}.html`;
  sendRequest('GET', url, "text")
    .then(buildPage)
    .catch(err => console.log(`ошибка при получении страницы (${err})`));
}


//получение списка статей
let listOfArticles = getListOfArticles();
function getListOfArticles() {
  const jsonUrl = "pages/pages-list.json";
  sendRequest('GET', jsonUrl, 'json')
    .then(data => listOfArticles = data)
    .catch(err => console.log(`ошибка при получении списка статей + (${err})`));
}


//вывод информации на страницу
function buildPage(data) {
  document.querySelector('.article').innerHTML = data;
  const linkToList = document.querySelector('.link-to-list');
  const articleBox = document.querySelector('.article');
  const listBox = document.querySelector('.list-of-articles');

  //переключаем содержимое страницы
  switch (window.location.hash) {
    case "#main":
      linkToList.style.display = 'block';
      articleBox.style.display = 'block';
      listBox.style.display = 'none';
      articleBox.style.width = '100%';
      break;
    case '#list':
      linkToList.style.display = 'none';
      articleBox.style.display = 'none';
      listBox.style.display = 'flex';
      listBox.style.width = '100%';
      displayListOfArticles(listOfArticles, listBox);
      break;
    default:
      linkToList.style.display = 'block';
      listBox.style.display = 'block';
      listBox.style.width = '200px';
      articleBox.style.width = 'calc(100% - 200px)';
      articleBox.style.display = 'block';
      displayListOfArticles(listOfArticles, listBox);
  }
}

//формирование списка статей
function displayListOfArticles(data, box) {
  box.innerHTML = '';
  let charCode;
  for (let key in data) {
    if(window.location.hash === "#list") {
      box.style.overflow = 'inherit';
      box.style.width = '100%';
      if (!charCode) {
        charCode = 1040;
        box.innerHTML += '<h3>A</h3>';
      } else if (key.charCodeAt(0) !== charCode) {
        charCode = key.charCodeAt(0);
        box.innerHTML += `<h3>${String.fromCharCode(charCode)}</h3>`;
      }
    } else {
      box.style.overflow = 'auto';
      box.style.width = '200px';
    }
    let a = document.createElement('a');
    a.innerText = key;
    a.href = "#" + data[key];
    box.appendChild(a);
    box.addEventListener('click', (e) =>{
      document.title = e.target.innerText;
    })
  }
}

//ajax запрос
function sendRequest(method, url, dataType) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = dataType;

    xhr.onload = () => {
      if(xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.send();
  });
}

window.onhashchange = getContent;

window.onload = () => {
  getContent();
  document.querySelector('.header').onclick = (e) => {
    document.title = e.target.innerText;
    window.location.hash = 'main';
  };
  document.querySelector('.link-to-list').onclick = (e) => {
    document.title = e.target.innerText;
    window.location.hash = 'list';
  };
};

//установить хэш, если отсутствует
if(!window.location.hash) {
  window.location.hash = 'main';
}