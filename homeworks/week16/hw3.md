```javascript
var a = 1
function fn(){
  console.log(a) 
  var a = 5
  console.log(a) 
  a++
  var a
  fn2() 
  console.log(a) 
  function fn2(){
    console.log(a) 
    a = 20
    b = 100
  }
}
fn()
console.log(a) 
a = 10
console.log(a) 
console.log(b) 
```

### EC, VO 執行程序：<br>
進入 EC 時，放入 VO 的順序：參數 -> function -> 變數

1. 初始化，建立 global EC：

```
global EC
global VO: {
  fn: function
  a: undefined
}
```
2. 開始執行程式碼：<br>
```
global EC
global VO: {
  fn: function
  a: 1 // var a = 1
}
```
3. 呼叫 `fn()` 建立 fn EC，初始化 fn VO：
```
fn EC
fn VO {
  fn2: function
  a: undefined
}
```
4. 執行 `fn()`：
```
fn EC
fn VO {
  fn2: function
  a: 5 // var a = 5
}
```
5. 執行 `a++`：
```
fn EC
fn VO {
  fn2: function
  a: 6 // var a = 6
}
```

6. 建立 `fn2()` EC：
```
fn2 EC
fn2 VO: {

}
```
7. 執行 `fn2()` 的 `console.log(a)`，往上層找到 a = 6。
&emsp;

8. 執行 `fn2()` 的 `a = 20`，因為 fn2 VO 沒有 a，所以找上層找到 `fn()` VO 的 a：
```
fn EC
fn VO {
  fn2: function
  a: 20 // fn2() 內找不到 a，往上層改
}
```
9. 執行 `fn2()` 的 `b = 100`，因為每一層 VO 都找不到 b，所以設為全域變數：
```
global EC
global VO: {
  fn: function
  a: 1 
  b: 100
}
```

10. 執行 `a = 10`，global VO 改變：
```
global EC
global VO: {
  fn: function
  a: 10
  b: 100
}
```

### 註解：
```javascript
var a = 1
fn() // function 提升
function fn(){
  var a // var 提升
  console.log(a) // undefined，流程 3
  a = 5
  console.log(a) // 5，流程 4
  a++ // 此時 a = 6，流程 5
  var a
  fn2() // 6
  console.log(a) // 執行 fn2() 之後，a = 20，流程 8
  function fn2(){
    // 往上層找到 a = 6 
    console.log(a) // 6，流程 7
    a = 20
    b = 100 // 往上層找都沒有 b, 就設為全域變數，流程 9

  }
}
console.log(a) // 1 全域變數
a = 10
console.log(a) // 10，流程 10
console.log(b) // 100，流程 10
```

依序輸出為：
```
undefined
5
6
20
1
10
100
```