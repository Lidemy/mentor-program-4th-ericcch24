## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
* Domain Name System: 負責處理 domain name（請求的網址）與實際 IP 位置的轉換的系統，因為瀏覽器需要辨識 IP 位置才能找到網域。
* 對 google 來說好處是很多人使用他們的系統的話，就可以拿到大量使用者的上網行為，可以做廣告投放之類的使用，或是收集使用者輸入的域名來改善搜尋引擎。
* 對大眾的好處是因為有 google 會維護系統且在域名與 ip 的資料對應上比較完整，所以在 domain name 的解析上能夠更快速更穩定，讓上網的體驗是良好的狀態。

參考資料：<br>
* [Google公共DNS IP地址，快速、安全的DNS伺服器：8.8.8.8與8.8.4.4(含iPv6)](https://johnpam11.pixnet.net/blog/post/120463420-google%E5%85%AC%E5%85%B1dns-ip%E5%9C%B0%E5%9D%80%EF%BC%8C%E5%BF%AB%E9%80%9F%E3%80%81%E5%AE%89%E5%85%A8%E7%9A%84dns%E4%BC%BA%E6%9C%8D%E5%99%A8%EF%BC%9A)
## 什麼是資料庫的 lock？為什麼我們需要 lock？
* 將某一筆資料 lock 住的話，在進行 query 操作時就可以確保不會有其他的 query 來同時操作這筆資料。
* 在 race condition （例如兩個 request 要同時執行同一個query）發生的時候，因為該資料被 lock 住所以一次只會有一個 query 可以操作，其他的要等待先到的 query 操作完成才能繼續，如此就可以避免例如掉購物網站賣東西的超賣問題。
* 但因為某筆資料被鎖住，其他後面才來的操作就需要等待，進而會有額外效能的損耗。

## NoSQL 跟 SQL 的差別在哪裡？
* 因為 SQL 需要以比較嚴謹的的方式（表格）來儲存資料，而且資料之間要有明確的關聯，但在資料很大量且難以察覺其之間關聯的時候，要用這種嚴謹的方式處理資料就比較困難，所以需要 NoSQL。
* NoSQL 不支援 JOIN，且不需要以固定的結構來儲存資料，通常是以 key-value （類似 JSON 格式）來儲存，因此有很大的彈性空間來處理資料，適合用來儲存關聯較弱或結構不固定的資料。

參考資料：<br>
* [什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)
* [SQL/NoSQL是什麼？認識資料庫管理系統DBMS](https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction)
## 資料庫的 ACID 是什麼？
為了確保一個 Transaction 可以完整且正確的執行，需要符合 ACID 四個特性：
1. 原子性 atomicity：一個 Transaction 的所有操作只能全部完成或是全部失敗，不能斷在中間任何地方。
2. 一致性 consistency：Transaction 開始到結束之後，資料的完整性一致。
3. 隔離性 isolation：資料庫允許多筆不同的 Transaction 同時進行，隔離性確保他們之間不會在 Transaction 完全結束前不會互相影響。
4. 持久性 durability：Transaction 結束之後，資料會永久保存不會消失，也不會因為系統異常而改變。
參考資料：<br>
* [ACID wiki](https://zh.wikipedia.org/wiki/ACID)
* [SQL 大小事](https://medium.com/@totoroLiu/%E8%B3%87%E6%96%99%E5%BA%AB-acid-bb87324035a8)




