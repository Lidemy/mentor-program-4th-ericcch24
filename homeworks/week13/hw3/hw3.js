/* eslint-disable quote-props */
function getGamesPromise() {
  return fetch('https://api.twitch.tv/kraken/games/top?limit=5', {
    method: 'GET',
    headers: {
      'Client-ID': '1oymoviz1aa1vi91cj12n1nisqs5ay',
      'Accept': 'application/vnd.twitchtv.v5+json',
    },
  }).then(response => response.json());
}

async function getGames(cb) {
  try {
    await getGamesPromise().then((json) => {
      cb(json);
    });
  } catch (err) {
    console.log(err);
  }
}


function getStreamsPromise(name) {
  return fetch(`https://api.twitch.tv/kraken/streams/?game=${encodeURIComponent(name)}`, {
    method: 'GET',
    headers: {
      'Client-ID': '1oymoviz1aa1vi91cj12n1nisqs5ay',
      'Accept': 'application/vnd.twitchtv.v5+json',
    },
  }).then(response => response.json());
}

async function getStreams(name, cb) {
  try {
    await getStreamsPromise(name).then((json) => {
      cb(json);
    });
  } catch (err) {
    console.log(err);
  }
}

function appendStreams(topLive) {
  const container = document.querySelector('.stream');
  for (let i = 0; i < 20; i += 1) {
    const div = document.createElement('div');
    div.classList.add('stream__box');
    div.innerHTML = `
    <img class="picture" src="${topLive.streams[i].preview.medium}"></img>
    <div class="user">
      <img class="avatar" src="${topLive.streams[i].channel.logo}"></img>
      <div class="word">
        <div class="content">${topLive.streams[i].channel.status}</div>
        <div class="name">${topLive.streams[i].channel.name}</div>
      </div>
    </div>
    `;
    container.appendChild(div);
  }
}

function addEmptyBox() {
  const box = document.createElement('div');
  box.classList.add('stream__box__empty');
  document.querySelector('.stream').appendChild(box);
}

getGames((games) => {
  const topGames = games.top.map(game => game.game.name);
  for (let i = 0; i < topGames.length; i += 1) {
    const list = document.createElement('li');
    list.innerHTML = topGames[i];
    document.querySelector('.navbar__list').appendChild(list);
  }
});

document
  .querySelector('.navbar__list')
  .addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
      const text = e.target.innerText;
      document.querySelector('.game-page__topic').innerText = text;
      document.querySelector('.stream').innerHTML = '';
      getStreams(text, (data) => {
        appendStreams(data);
        addEmptyBox();
        addEmptyBox();
      });
    }
  });
/* eslint-enable quote-props */
