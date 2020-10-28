/* eslint-disable no-alert */
const request = new XMLHttpRequest();
document
  .querySelector('.lottery')
  .addEventListener('click', () => {
    request.open('GET', '/game-prize', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        const cover = document.querySelector('.cover');
        const content = document.querySelector('h2');
        if (!data.prize_name) {
          alert('系統不穩定，請再試一次');
          return;
        }

        cover.style.background = `url(${data.image_URL}) center/cover no-repeat`;
        content.innerText = `${data.description}`;

        document.querySelector('.info').classList.add('hide');
        document.querySelector('.lottery-cover').classList.remove('hide');
      } else {
        alert('系統不穩定，請再試一次');
      }
    };
    request.onerror = () => {
      alert('系統不穩定，請再試一次');
    };

    request.send();
  });
