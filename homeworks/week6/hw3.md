## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
* `<hr>`: 加入水平分隔線。
* `<strong></strong>`: 字變粗體。
* `<cite></cite>`: 引用參考資料。

## 請問什麼是盒模型（box modal）
可已把每個 html 的元素看成一個盒子，然後可以透過 css 來調整該盒子（元素）的各種屬性，例如寬高、padding等等。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
* ### block： 
  * 代表：`<div>`、`<h1>`、`<p>` 
  * 一個元素會佔滿一整行，不會併成一列。
  * 調什麼都可以，padding、寬高等等。
* ### inline:
  * 代表：`<span>`、`<a>`
  * 無法調整寬高與 padding，其寬度會依據內容長度來顯示。
* ### inline-block:
  * 代表：`<button>`、`<input>`、`<select>`
  * 對外像 inline 可併排，對內像 block 可調各種屬性。
  * 直接調整 css `display: inline-block;`
  * 與 block 的差別是可以併成一列。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
* **stasic**: 預設值，照順序定位。
* **relative**: 以相對位置定位，以原本的位置為原點來做移動，不會影響其他元素的位置。
* **fixed**: 相對於 viewport (瀏覽器視窗可見部分)定位，不管畫面如何滾動都會固定在設定的位置。
* **absolute**: 針對某個參考點（往上層找第一個 position『不是 static』 的元素）來進行定位，此時這個元素會脫離離正常的排版流程，此時若有其他元素則會無視使用 absolute 來定位的元素的存在，而直接遞補。