const request = require('request');

const args = process.argv;

request(`https://restcountries.eu/rest/v2/name/${args[2]}`, (error, response, body) => {
  let data;
  try {
    data = JSON.parse(body);
    // eslint-disable-next-line
  } catch (error) {
    console.log('抓取失敗:', error);
  }
  if (response.statusCode === 404) {
    console.log('找不到國家資訊');
  }

  for (let i = 0; i < data.length; i += 1) {
    console.log('============');
    console.log(`國家：${data[i].name}`);
    console.log(`首都：${data[i].capital}`);
    console.log(`貨幣：${data[i].currencies[0].code}`);
    console.log(`國碼：${data[i].callingCodes[0]}`);
  }
});
