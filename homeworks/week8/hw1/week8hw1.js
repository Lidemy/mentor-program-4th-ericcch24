/* eslint-disable no-alert */
document
  .querySelector('.lottery')
  .addEventListener('click', () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        const cover = document.querySelector('.cover');
        const content = document.querySelector('h2');
        if (!data.prize) {
          alert('系統不穩定，請再試一次');
          return;
        }
        if (data.prize === 'FIRST') {
          cover.classList.add('first');
          content.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！';
        } else if (data.prize === 'SECOND') {
          cover.classList.add('second');
          content.innerText = '二獎！90 吋電視一台！';
        } else if (data.prize === 'THIRD') {
          cover.classList.add('third');
          content.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        } else if (data.prize === 'NONE') {
          cover.classList.add('none');
          content.innerText = '銘謝惠顧';
        }

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
/* eslint-enable no-alert */
