```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

1. 將 `obj.inner.hello()` 轉為 call 的形式變成 `obj.inner.hello.call(obj.inner)`，<br>
此時 this 就是 `obj.inner`，所以呼叫 `hello()` 就會印出 `obj.inner.value`的值，所以這邊是印出 `2`。

2. 將 `obj2.hello()` 轉為 call 的形式變成 `obj2.hello.call(obj2)`，又 `obj2 = obj.inner`，所以跟第一點一樣 this 就是 `obj.inner`，所以呼叫 `hello()` 就會印出 `obj.inner.value`的值，所以這邊還是印出 `2`。

3. 將 `hello()` 轉為 call 的形式變成 `hello.call()`，這時找不到 `this.value` 的值，所以印出 `undefined`

依序印出：
```
2
2
undefined
```