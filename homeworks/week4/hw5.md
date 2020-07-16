## 請以自己的話解釋 API 是什麼
* 假設 A 要跟 B 拿 B 的資料，B 要提供一個自己建立的 API 讓 A 可以透過這個 API 拿到資料，
也就是可以讓雙方互相傳遞資料的方式。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
* 403 Forbidden: 用戶端沒有權限可以 require，例如沒有授權，所以伺服器端那邊不會 response。
* 410 Gone: request 的內容已從伺服器端刪除。
* 511 Network Authentication Required: 表示用戶端需要進行身份驗證才能獲得網路的權限。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

* 回傳所有餐廳資料
  * GET | /foodplace |
  * 可用參數：_limit:限制回傳資料數量 | 範例：/foodplace?_limit=10 

* 回傳單一餐廳資料
  * GET | /foodplace/:id | 
  * 可用參數：無

* 刪除餐廳
  * delete | /foodplace/:id |
  * 可用參數：無

* 新增餐廳
  * post | /foodplace |
  * 可用參數：name: '餐廳名稱'

* 更改餐廳
  * patch | /foodplace/:id |
  * 可用參數：name: '餐廳名稱'
