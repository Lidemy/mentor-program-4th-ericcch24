## 什麼是 MVC？
把軟體相關系統分成三部分
* Model 負責資料相關的處理
* View 負責顯示的介面
* Controller 負責接收處理 request，以及處理協調 model 與 view 的 response

## 請寫下這週部署的心得
因為在看課跟寫作業花了太多時間，部署就選擇用好像相對簡單的 Heroku，一開始部署還算順利，結果要 push 的時候一直出錯，後來發現是 package.json 裡面 sequelize-cli 沒加到所以 sequelize 指令跑不了。

順利 push 看到網頁之後，我用 MySQLWorkbench 連接到 clearDB ，連接的時候就有點卡不過有順利連到，接著研究怎麼新增資料研究一陣子還是不知道怎用，就決定直接用 query 指令新增，就在新增完管理員資料想試試部落格的時候，資料庫居然莫名其妙斷線，不知道是在 MySQLWorkbench 那邊動到什麼東西。

花了一番功夫找解決方式，還好最後成功重新連線了！可喜可賀。而因為介面超不直覺要搞半天然後又把我資料庫弄斷線，所以怒刪 MySQLWorkbench，我都覺得 icon 那隻海豚在嘲諷我不會用＝＝，後來改用 sequel pro 連資料庫，新增資料什麼的就直覺多了。

整體來說比 w14 的部署來要容易許多，git push 上去就差不多了，之後有時間再回來學這週教的另一種部署方式。

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
用 Node.js 裝 express 套件寫，可以把檔案分工成 MVC 的架構就簡潔清楚許多，而 PHP 就大雜燴，處理資料、顯示等等包在同一頁寫，不過每個人喜好不同，PHP 這樣在同一個 route 就處理全部那個 route 相關的東西也是有他的方便之處。