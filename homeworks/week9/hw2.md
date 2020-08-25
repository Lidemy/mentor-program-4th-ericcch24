## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
* VARCHAR
  * 可以自己設定最大長度，須介於 1-65535 個 characters。
  * 如果只是要存一些單字或句子就可以使用。
* TEXT 
  * 最大長度「固定」是 65535 個 characters ，所以不能自己設定最大長度。
  * 所以 TEXT 可以存長度更長的內容，例如一篇文章。


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
* cookie 是可以儲存在瀏覽器的文字檔案，常用於辨識使用者資料或身份。
* 當客戶端發送 request 給 server，資料經 server 處理後，server 回傳 response，其中使用者登入資料的 cookie 會儲存在 header 內一起回傳。
* 瀏覽器接收到 response 後會將 cookie 儲存在瀏覽器內，並在之後發出 request 時會自動帶上符合 server 設置條件(位置、期限等)的 cookie。



## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
* 資料庫裡的會員密碼看得到，如果資料庫被入侵密碼就被看光光。
* 對於設定暱稱帳號密碼的內容沒有限制，所以使用者可能會輸入一些會影響到程式碼的字詞進而影響到資料庫與留言板，例如 html 標籤。

