```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

```

1. `console.log(1)` 在 call stack 被執行後印出 `1`，執行完後 從 call stack 清空。
2. 所以先依序輸出為
```
1
3
5
```
3. `setTimeout(() => { console.log(2) }, 0)` 這段在 call stack 內執行時，setTimeout 會叫瀏覽器端的 thread 幫忙計時，倒數計時完畢之後整個 `() => { console.log(2) }` 會被丟到 callback queue 裡面排隊，等到 call stack 沒東西的時候，也就是`console.log(1)`, `console.log(3)`, `console.log(5)` 這三段程式碼都執行完之後，event loop 發現 call stack 沒東西，再將 callback queue 裡面排隊中的 function 丟回 call stack 執行。
4. 第一個 `setTiomeout` 執行完後換第二個，流程跟第 3 點一樣。
5. 所以最後依序輸出為 
```
1
3
5
2
4
```