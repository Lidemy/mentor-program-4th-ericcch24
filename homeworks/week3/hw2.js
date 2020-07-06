const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  // eslint-disable-next-line
  solve(lines);
});

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
// eslint-disable-next-line
function solve(lines) {
  const num = lines[0].split(' ');
  const a = Number(num[0]);
  const b = Number(num[1]);

  for (let i = a; i <= b; i += 1) {
    // eslint-disable-next-line
    if (isNarciss(i)) {
      console.log(i);
    }
  }

  function digits(n) {
    if (n === 0) return 1;
    let result = 0;
    while (n !== 0) {
      // eslint-disable-next-line
      n = Math.floor( n / 10);
      result += 1;
    }
    return result;
  }


  function isNarciss(n) {
    let m = n;
    const digitmon = digits(m);
    let sum = 0;
    while (m !== 0) {
      const numb = m % 10;
      sum += numb ** digitmon;
      m = Math.floor(m / 10);
    }
    if (sum === n) {
      return true;
    }
    return false;
  }
}
