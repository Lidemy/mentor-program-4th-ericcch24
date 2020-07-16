const request = require('request');

const API_URL = 'https://lidemy-book-store.herokuapp.com';
// const process = require('process');
const args = process.argv;

function listBooks() {
  // eslint-disable-next-line
  request(`${API_URL}/books?_limit=20`, (error, response, body) => {
    let list;
    try {
      list = JSON.parse(body);
      // eslint-disable-next-line
    } catch (error) {
      console.log('失敗:', error);
    }
    for (let i = 0; i < list.length; i += 1) {
      console.log(`${list[i].id} ${list[i].name}`);
    }
  });
}

function readBook(id) {
  // eslint-disable-next-line
  request(`${API_URL}/books/${id}`, (error, response, body) => {
    let book;
    try {
      book = JSON.parse(body);
      // eslint-disable-next-line
    } catch (error) {
      console.log('取得失敗:', error);
    }
    console.log(`${book.id} ${book.name}`);
  });
}

function deleteBook(id) {
  // eslint-disable-next-line
  request.delete(`${API_URL}/books/${id}`, (error, response, body) => {
    if (error) {
      console.log('刪除失敗', error);
    }
    console.log('刪除成功');
  });
}

function createBook(bookName) {
  request.post({
    url: `${API_URL}/books/`,
    form: {
      name: bookName,
    },
    // eslint-disable-next-line
  }, (error, response, body) => {
    if (error) {
      console.log('新增失敗', error);
    }
    console.log('新增成功');
  });
}

function updateBook(id, bookName) {
  request.patch({
    url: `${API_URL}/books/${id}`,
    form: {
      name: bookName,
    },
    // eslint-disable-next-line
  }, (error, response, body) => {
    let book;
    try {
      book = JSON.parse(body);
      // eslint-disable-next-line
    } catch (error) {
      console.log('更改失敗:', error);
    }
    console.log(`${book.id} ${book.name} 更改成功`);
  });
}

switch (args[2]) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(args[3]);
    break;
  case 'delete':
    deleteBook(args[3]);
    break;
  case 'create':
    createBook(args[3]);
    break;
  case 'update':
    updateBook(args[3], args[4]);
    break;
  default:
    console.log('請輸入正確指令');
}
