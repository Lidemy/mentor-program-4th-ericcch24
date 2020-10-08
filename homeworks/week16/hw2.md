```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

因為 for 迴圈不在 function 裡面，所以這邊的 `i` 是全域變數。
&emsp;

每個迴圈開頭的 `console.log('i: ' + i)` 會先在 call stack 被執行，所以每執行一次迴圈會依序印出：
```
i: 0
i: 1
i: 2
i: 3
i: 4
```

而 `setTimeout(() => { console.log(i) }, i * 1000)` 這段在 call stack 內執行時，setTimeout 會叫瀏覽器端的 thread 幫忙計時，倒數計時完畢之後整個 `() => { console.log(i) }` 會被丟到 callback queue 裡面排隊，
&emsp;

最後等到每個迴圈第一行的 `console.log('i: ' + i)` 執行完後 call stack 被清空之後（這時候迴圈已經跑完），event loop 再將 callback queue 裡面排隊中的 function 依序丟回 call stack 執行。
&emsp;

而當 setTimeout 的 `{ console.log(i) }` 在被 event loop 丟回 call stack 執行的時候，因為迴圈已經跑到 i = 5 結束，所以這時存取到的變數 `i` 就是 `5`，再配合之前 `setTimeout` 設定的 `i * 1000` 參數，依序是 0, 1, 2, 3, 4 秒，所以每一個 `{ console.log(i) }` 都會隔一秒印出 5，總共印出五個。<br>

所以最後依序印出：
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```




