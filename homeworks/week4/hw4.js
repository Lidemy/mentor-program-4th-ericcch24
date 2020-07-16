const request = require('request');

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': '1oymoviz1aa1vi91cj12n1nisqs5ay',
    // eslint-disable-next-line
    'Accept': 'application/vnd.twitchtv.v5+json',
  },
};

request(options, (error, response, body) => {
  let data;
  try {
    data = JSON.parse(body);
    // eslint-disable-next-line
  } catch (error) {
    console.log('串接失敗', error);
  }

  for (let i = 0; i < data.top.length; i += 1) {
    console.log(`${data.top[i].viewers} ${data.top[i].game.name}`);
  }
});
