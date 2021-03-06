## Webpack 是做什麼用的？可以不用它嗎？
* Webpack 是可以把各種模組資源（例如 Js, Css 甚至是圖片影片等等）經過 loader 的處理轉換，最後包在一起 (bundle) 讓瀏覽器可以使用的一種工具。
* 舉例來說，因為要在 node.js 上自己建立或是使用一些現成的模組，其使用的標準叫做 CommonJS，而瀏覽器並不支援，所以為了要讓瀏覽器可以支援這些模組規範，就可以用 webpack 來將程式碼打包轉換，瀏覽器就能用了，且 webpack 也能轉換打包一些原生瀏覽器不支援的模組，例如使用 npm、圖片等等。
* 所以因為原生瀏覽器的支援不同模組功能程度不佳，才需要用 webpack。

## gulp 跟 webpack 有什麼不一樣？
* gulp 是用來管理各種不同的 task 的工具，但沒辦法把 task 或資源做打包(bundle)。
* webpack 可以把不同類的資源經過對應的 loader 處理轉換之後再打包起來，而其主要功能是打包，不能像 gulp 可以導入「任何」task 來處理。
* 而兩者相似的地方在於他們都可以用來做資源的轉換（例如 Js 導入 babel，Sass 轉 Css），但 gulp 可以做的 task 又更多種。 

## CSS Selector 權重的計算方式為何？

* 權重大小依序排下來是：inline style > ID > Class > Element > *

* *: 0-0-0-0
* element: 0-0-0-1
* class, psuedo-class, attribute(例如[type:checkbox]): 0-0-1-0
* id: 0-1-0-0
* inline style attribute(寫在 html 行內的 style): 1-0-0-0
* !important: 可以蓋過全部

參考資料：https://ithelp.ithome.com.tw/articles/10196454