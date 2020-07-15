const request = require('request');

const API_URL = 'https://lidemy-book-store.herokuapp.com';

request(`${API_URL}/books?_limit=10`, (error, response, body) => {
  let list;
  try {
    list = JSON.parse(body);
  } catch (err) {
    console.error('抓取失敗', err);
    return;
  }

  for (let i = 0; i < list.length; i += 1) {
    console.log(`${list[i].id} ${list[i].name}`);
  }
});
