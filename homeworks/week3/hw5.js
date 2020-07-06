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
  function compare(a, b, p) {
    if (a === b) return 'DRAW';
    const lengthA = a.length;
    const lengthB = b.length;
    if (Number(p) === 1) {
      if (lengthA === lengthB) {
        return a > b ? 'A' : 'B';
      }
      return lengthA > lengthB ? 'A' : 'B';
    }
    if (Number(p) === -1) {
      if (lengthA === lengthB) {
        return a < b ? 'A' : 'B';
      }
      return lengthA < lengthB ? 'A' : 'B';
    }
    return compare;
  }
  for (let i = 1; i < lines.length; i += 1) {
    const [a, b, p] = lines[i].split(' ');
    console.log(compare(a, b, p));
  }
}
