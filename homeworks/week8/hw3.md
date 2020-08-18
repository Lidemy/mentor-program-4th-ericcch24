## 什麼是 Ajax？
* Asynchronous JavaScript and XML，可以讓我們在瀏覽器上透過 Javascript 交換資料的技術，其重點在於非同步的處理方式，可以讓 Javascript 發送 Request 之後，可以不等 Reponse 回傳就繼續執行接下來的程式。而在 Response 回傳之後，就可以透過 Callback Function把回傳的資料帶進來。

## 用 Ajax 與我們用表單送出資料的差別在哪？
* 表單：瀏覽器發送 request 資料到指定的網址，然後會直接 render 回傳的 respone 資料在頁面上，這時候頁面會更新。
* Ajax：與表單發送資料的差異是 Ajax 可以在拿取資料的時候，將回傳的結果透過 Javascript 來處理回傳的資料以及顯示在頁面的形式，而不是像表單直接渲染更新整個頁面。

## JSONP 是什麼？
* JSON with Padding，利用 `<script>` 在裡面放 API 的資料，再透過建立好的函式來拿取資料。其中 Server 端通常會提供一個 callback 的參數，client 端就可以直接將這個參數當作函式名稱，再透過這個函式來拿到回傳的資料。而缺點是這個方法發送 request 只能用 GET （直接附加網址）的方式。

## 要如何存取跨網域的 API？
* 透過 Cross-Origin Resource Sharing 跨來源資源共享的規範。當要取用不同網域的 API 時，Server 端必須要在 Response 的 Header 加上 `Access-Control-Allow-Origin` 的內容，如果裡面有包含現在這個發送 Request 的 Origin 的話，瀏覽器檢查之後通過，就可以順利接收到 Response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
* 因為在第四週的時候是利用 Node.js 來發送 Request 與接收 Response，因為中間過程沒有被瀏覽器的一些特殊內容與額外規則所限制（例如上一題的`Access-Control-Allow-Origin`，瀏覽器會把不同源的 API 回傳的 Response 擋住（安全性的原因），而 Node.js 沒有這些限制），所以發送接收就可以順利進行。
