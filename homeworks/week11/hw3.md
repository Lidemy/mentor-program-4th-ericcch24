## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
* 加密是一對一關係，一組明文密碼加密後得到的密文，該密文只會對應到其加密前的那組明文，所以如果被知道加密方式的話就可以順利從密文回推回去知道明文。
  * 明文 ->> 加密 ->> 密文
  * 密文 ->> 解密 ->> 明文

* 雜湊是多對一關係，所以得到一組密文後，就算知道雜湊的規則也不會知道是對應到哪個明文，因為有多個可能，但一個明文只會對應到一個雜湊過後的文字，常用於網站密碼。

* 而之所以要雜湊過後才存入資料庫，是因為這樣管理資料庫的人也只會看到雜湊過的亂碼而不會知道使用者的確切密碼，可以確保隱私與安全。

## `include`、`require`、`include_once`、`require_once` 的差別
* include & include_once: 兩者皆可以讓 php 拿到特定檔案裡面的內容，例如要使用該檔案裡面的函式之類。在使用 include 時如果要導入的檔案裡面也有使用 include 導入檔案，這樣同一個檔案就會導入兩次，這樣就會重複定義或命名一樣的變數或函式，而 include_once 的差別是只會將該檔案導入一次，可以避免上述情況發生。

* require & require_once: 與 include & include_once同樣都是拿取特定檔案裡面的內容，差別在於 include & include_once 在執行上遇到錯誤（例如找不到檔案）程式還是會繼續執行，而 require & require_once 如果遇到錯誤則會停止執行程式。

* 因此 require & require_onc 常用來導入靜態內容的程式碼，例如資料庫的登入資訊；而 include & include_once 則適合用來導入動態的程式碼，例如含有條件判斷式的內容。

## 請說明 SQL Injection 的攻擊原理以及防範方法
* 可以透過輸入內容來更改 SQL 的字串拼接，並直接影響資料庫的內容。例如 `INSERT INTO comments(nickname, content) VALUES('%s', '%s')`，這段的 VALUES 可以輸入任何內容，攻擊者就可以輸入 query 指令，例如：`VALUES(SELECT password FROM users WHERE id = 2, '%s')` 等等，這樣就會直接印出密碼。
* 將 SQL 指令用 prepared statement 執行，就會自動將輸入內容當成普通字串拼接起來，就不會把該內容辨識為程式碼去影響到資料庫。

##  請說明 XSS 的攻擊原理以及防範方法
* 可以在他人網站執行 Javascript，例如直接在留言輸入 html 標籤或是 JS 程式碼，php 會把這些文字解析成程式碼而不是單純的字串，直接影響到整個版面。因為可以執行 JS 所以可以做很多種惡意攻擊，例如將網站導到釣魚網站、用 document.cookie 直接拿到 session id。
* 用 htmlspecialchars 可以將一些特殊字元編碼成其他形式，就不會被解釋為程式碼。例如：& 變成 &amp;，< 變成 &lt;

## 請說明 CSRF 的攻擊原理以及防範方法

* Cross Site Request Forgery，攻擊者可以在不同 domain 底下讓使用者在不知道的情況下發出 request，因為瀏覽器會在使用者發送 resquest 到某個網域時順便把相關的 cookie 一起帶上，所以當使用者是在登入的狀態下的話，這個 request 就會有他的登入相關資訊，攻擊者便是利用 CSRF 的跨網域特性來讓使用者在其他無關的釣魚 domain 中發出 request 並帶上有私密資訊的 cookie，這時瀏覽器就會以為是使用者要發出這個 request，然後就被攻擊了。

* Double Submit Cookie：由 server 隨機產生一組 token 然後加在 form 上，而同時也在 client 端設置一個 cookie，其值與剛剛 server 產生的 token 相同。如此一來，當使用者本人發出 request，server 就可以依據這兩組 token 是不是一樣，來判斷是不是從相同的 domain 發出的 request。

