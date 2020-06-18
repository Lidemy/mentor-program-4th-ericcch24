## 交作業流程
1. 將課程的 GitHub clone 到自己的電腦
2. 開一的新的 branch -- `git branch homeworkweek1`
3. 切換到剛剛新開的 branch -- `git checkout homeworkweek1`
4. 寫作業
5. 若有新增檔案要先加入 git -- `git add .`
5. 寫完作業後 commit -- `git commit -am "week1 finish"`
6. 把本地的 branch 推到個人課程的 GitHub -- `git push origin homeworkweek1`
7. 在個人 GitHub 介面點 compare & pull request，打敘述然後create pull request
8. 到學習系統上新增作業，貼上PR連結，並確認兩個要求後，送出助教改完之後會 merge
10. 在本地切到 master 的 branch -- `git checkout master`
11. 將遠端的 master 同步至我的 master -- `git pull origin master`
12. 刪除本地的 homeworkweek1 branch -- `git branch -d homeworkweek1`
13. `git branch -v` `git log` 檢查一下即完成
-------
#### 簡易流程
1. 建立新 branch
2. 在新 branch 上寫作業
3. push branch 
4. pull request
5. 學習系統上傳 PR 連結
7. 助教改完後 pull origin master
8. 刪掉本地新 branch
9. 檢查

![](https://i.imgur.com/HKLi6Ql.png)