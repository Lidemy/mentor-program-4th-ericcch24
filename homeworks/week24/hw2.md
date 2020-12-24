## Redux middleware 是什麼？

- 在 action dispatch 後，進到 store 之前，Redux middleware 會負責將 action 經過一些處理再傳到 store（例如拿 API 資料等非同步操作）。
  例如當 action 是 function 而非物件時，Redux thunk 這個 middleware 就會就會先執行 dispatch 過來的 function，再傳往 store。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

- Client Side Render: 瀏覽器除了請求 HTML 之外也要等待請求 JS，還要等 React 處理網頁的內容（例如請求 API、將 component 放到 DOM 上），最後使用者才會看到完整的網頁內容。

* Server Side Render: 在第一次 render 時，網頁的內容會在 Server 端就處理完成，使用者就會先看到一個完整的網頁內容，而後續的頁面操作一樣交由 Javascript 處理。

* 兩者主要差別就是 SSR 在第一次 render 畫面時是由後端 server 處理。

* SSR 的優點在於因為在第一次 render 時網頁的完整內容就已經載入，因此有利於 SEO 的搜尋，也因為少了要等待請求 HTML 與 JS 的動作，而讓使用者從請求後到看見完整網頁的時間相較 CSR 有所減少。

## React 提供了哪些原生的方法讓你實作 SSR？

- SSR 實際 render 頁面的方式是向渲染伺服器請求 HTML，渲染伺服器會將 HTML 以字串的形式回傳，瀏覽器再解析其內容並呈現畫面。而 React 的 ReactDOMServer 提供了 `renderToString()` 的方法將 component 轉換成 HTML 字串，就可以在第一次 render 時從伺服器端產生 HTML。

* ReactDOMServer 另外還有提供以下方法：
  `renderToStaticMarkup()`: 與 `renderToString()` 類似，差別在於只適用於靜態網頁，無法讓頁面有互動性。
  `renderToNodeStream()`: 此方法會回傳一個 Readable Stream(只能在伺服器端使用)，然後輸出 HTML 字串。
  `renderToStaticNodeStream()`: 與 `renderToNodeStream()` 類似，差別在於只適用於靜態網頁，無法讓頁面有互動性。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

- Next.js: 內建 SSR 機制。

* Prerender: 將 Js 檔案 render 的內容存成靜態 HTML，搜尋引擎就可以爬到該 HTML 內容。
