## 為什麼我們需要 Redux？

當資料的 state 數量多且複雜時，會需要一個統一方便管理的工具來方便處理各個 state。
另外有些 state 比較難以決定要存在哪個 React component 中，這時候就可以用 Redux 來存 state，例如一些在不同的 component 都會使用到的 global 的 state。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

- Redux 是在 javascript 的應用程式中可以用來管理與存放 state 的地方。

* Redux 元件：
  - action: 表示要改變的資料的類型與內容。
  - reducer: 負責處理 action，並依據接收到的 action 來產生新的 state 的內容。
  - store: 儲存與管理 state 的地方。

- 當我們想要在某個動作發生時來改變 state，例如按按鈕，程式會 dispatch 指定的 action 到 Redux store，store 會依據原先的 state 與傳過來的 action 來執行內部的 reducer，然後產生一個新的 state，最後 render 到 UI 上。

## 該怎麼把 React 跟 Redux 串起來？

- Redux Hook 方式：

  - 在 app 最上層中的 `<Provider store={store}>` 傳入 store
  - `useSelector()` 用來拿取存在 store 裡面的資料。
  - `useDispatch()` 用來 dispatch 需要的 action。

- Connect 方式：
  連結 component 與 Redux，將 state 與 dispatch 作爲 props 傳到 dumb component，該 component 就可以使用這些 props。
