## 跟你朋友介紹 Git

### 簡易比喻概念
* 當爛笑話更新了，要用 git 建立新版本並加入版本控制 `git add` ==> 等於你先建立一個暫時存放你剛剛更新的笑話的資料夾，笑話每更新一個版本就要多弄一個暫存的資料夾，然後把笑話放到裡面。為了避免不同版本名稱互相衝突難以辨別，git 會用看似亂數的東西當作資料夾名稱。
* 如果這個笑話不會在更動了 `.gitignore`，不想加入版本控制，那就不要加入資料夾。
* 新建版本 `git commit` 把暫存笑話的資料夾改名為你要的版本名稱 --> 也就是當笑話新版本建立好之後，把資料夾改成你要的名字。
* 如果要辨別最新版本的笑話 ==> 額外用一個新檔案來記錄保存。


--------------------
### Git 檢查狀態的指令
* `git status`: 查看目前版本控制的狀態，主要是看有哪些檔案還沒加入 stage、哪些檔案被 modified 修改過等等。
* `git log`: 查看各個版本的歷史紀錄，有 commit 的亂碼名稱、作者、日期以及版本名稱。
 
----------------
### 笑話版本控制建立
* Step 0: `git init` -- 讓此資料夾可以被 git 控制
* Step 1: `.gitignore` -- 用 `vim .gitignore` 忽略不想要加入版本控制的檔案，想像成此檔案被排除在資料夾外
* Step 2: `git add .` -- 將所有檔案加入版本控制，想像成把東西移入資料夾。**此步驟在每次有新笑話或修改時都要做一次**
* Step 3: `git commit -am "init"` 建立第一個commit，想像成建立一個新版本（建立新資料夾的概念） 

-----------------
### 笑話建立後
* 如果有**新增檔案**則需要先進行 Step 2 的 `git add .` 先加入版本控制再用 Step 3 commit
* `git commit -am "版本名稱"` 可將**修改過的現有檔案**加入版本控制然後 commit。
* `git diff` :可以看檔案修改的紀錄（與別的版本的差異）。 

-----------
### 用 GitHub 在網路上存放笑話
* GitHub 是一個可以在遠端存放 git 的地方，類似當你完成笑話的版本控制之後可以上傳到雲端保存的概念。
* **如何把笑話版本放上 github** -- `git remote add origin 菜哥的 github 網址` >> 然後 `git push -u origin master`
  * 註：**笑話 commit 完之後要 `git push` 才會同步推送至 github 上的 branch**


* **`git pull branch-name`** -- 把 github 遠端的 branch 資料拉來菜哥的電腦
  * **當 菜哥電腦的 git 有改動，就要 push 上去，而在 菜哥的 github 上有改動，就要pull下來，時時確保兩邊的同步狀態是良好習慣。**