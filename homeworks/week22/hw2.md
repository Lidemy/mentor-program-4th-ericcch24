## 請列出 React 內建的所有 hook，並大概講解功能是什麼

- `useState`: 用來儲存與修改 conponent 的 state，一但 state 有變動時就會更新畫面。

- `useEffect`: 此 hook 中第一個參數帶入的函式會在「畫面渲染完成後」被呼叫，也可在第二個參數設定變數組成的陣列，`useEffect` 就會在變數改變時才會被呼叫。

- `useContext`: 用 `React.createContext` 建立一個 Context 物件，而 `<Context.Provider value={}>` 可以存取該物件的值，讓被他包住的底下的 component 都可以透過 `useContext` 存取到 context 的值，就不用每一層都傳一次 props。

* `useReducer`: 當 state 太多或是邏輯複雜時使用，在 `useReducer` 傳入處理函式與初始值，會回傳處理後的 state 以及可以透過參數來和處理函式溝通的 dispatch。

* `useCallback`: 在 `useCallback` 傳入一個 callback 函式與 dependencies 陣列，該 callback 函式便只會在依賴 dependencies 改變時才會重新建立。

* `useMemo`: 在 `useMemo` 傳入一個 callback 函式與 dependencies 陣列，該 callback 函式便只會在依賴 dependencies 改變時才會執行。
* `useRef`: 會回傳一個 mutable 的物件，`.current` 屬性為傳入 `useRef` 的初始值，無論節點如何改變，React 都會將其 .current 屬性設為相應的 DOM 節點。

* `useImperativeHandle`: 在使用 ref 屬性時可以向父 component 暴露自定義的 instance 的值。

* `useLayoutEffect`: 與 `useEffect` 相似，差別在 `useLayoutEffect` 是在畫面渲染前執行。

* `useDebugValue`: 可以用來在 React DevTools 中顯示自定義 hook 的標籤。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

- `constructor()`: 在 component 建立前先對 state 做初始化。
- `render`: 在每次 props 或是 state 被改變時，都會被執行一次。
- `static getDerivedStateFromProps()`: 回傳一個物件來表示回傳一個物件來表示要更新的 state 或是 表示不需要更新的 null。
- `componentDidMount()`: 在 component 被 mount 之後執行，適合用來進行串接 API 等網路相關處理。
- `shouldComponentUpdate()`: 在 render 前比較 props 或 state 是否有更新。
- `getSnapshotBeforeUpdate()`: 在 DOM 改變前被觸發來拿取資料，並 return 值給 `componentDidUpdate()`。
- `componentDidUpdate()`: 在 component 更新更新完成並 render 完之後執行，會比較 props 或 state 的狀態差異。
- `componentWillUnmount()`: 在 component 要從 DOM 被移除之前進行，用於清理 component 中的遺留的資料。
- `componentDidCatch()`: 當 component 發生錯誤時被觸發，可以捕捉 child component 發生的錯誤。

已不建議使用：

- `componentWillMount()`: 在第一次 `render()` 執行之前就先被執行。
- `componentWillReceiveProps()`: 在 component 每次接收到 props 的更新時執行。
- `componentWillUpdate()`: 在 component 準備更新，執行 render 前執行。

## 請問 class component 與 function component 的差別是什麼？

- class component 是以 class 的語法來實作的 component，function component 則是以函式形式來建構 component。

- 其中最大的差異在 props 的傳遞，在 class component 中因為 this 的 mutable 可變特性，component 會隨著會隨著時間推移而找到最新的 props。而 function component 由於是以閉包的方式在管理狀態， React 中 Props 是 immutable 不可變的特性，所以只會拿取到最一開始的 props。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

- uncontrolled component: component 的值由 DOM 來處理，client 端可以直接輸入值來更改資料。
- controlled component: component 的值受到 react 控制，只能透過改變 state 來重新渲染 component。
