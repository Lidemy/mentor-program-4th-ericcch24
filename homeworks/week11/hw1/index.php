<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  /*
  1. 從 cookie 裡面讀取 PHPSESSID(token)
  2. 從檔案裡面讀取 session id 的內容
  3. 放到 $_SESSION
  */
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }
  
  $page = 1;
  if (!empty($_GET["page"])) {
    $page = intval($_GET["page"]); // 字串轉數字
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    "SELECT ".
      "C.id as id, C.content as content, ".
      "C.created_at as created_at, U.nickname as nickname, U.username as username, U.role as role ".
    "FROM ericcch24_comments as C ".
    "left join ericcch24_users as U on C.username = U.username ". 
    "WHERE C.is_deleted IS NULL ".
    "ORDER BY C.id DESC ".
    "LIMIT ? OFFSET ? "
  );
  $stmt->bind_param("ii", $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
      <?php if (!$username) { ?>
        <div class="bottons">    
            <a class="board__btn" href="register.php">註冊</a>
            <a class="board__btn" href="login.php">登入</a>
        </div>
      <?php } else { ?>
        <a class="board__btn" href="logout.php">登出</a>
        <span class="board__btn update-nickname">編輯暱稱</span>
        <form class="hide board_nickname-form board__new-comment-form" method="POST" action="update_nickname.php">
          <div class="board__nickname">
            <span>更改暱稱：</span>
            <input type="text" name="nickname" />
          </div>
          <input class="board__submit-btn" type="submit" value="編輯">
        </form>
          <?php if ($user["role"] === "admin") { ?>
            <a class="board__btn" href="role_admin.php">管理身份</a>
          <?php } ?>
        <h3>歡迎！<?php echo escape($user["nickname"]); ?></h3>
      <?php } ?>
    <h1 class="board__title">Comments</h1>
    <?php
      if(!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        }
        echo '<h2 class="error">錯誤：' . $msg . '</h2>';
      }
    ?>
    
    <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
      <textarea name="content" rows="5"></textarea>
       <?php if ($username) { ?>
        <?php if ($user["role"] === "suspend") { ?>
          <h3>您的帳號已被停權，無法發布留言</h3>
        <?php } else {?>
          <input class="board__submit-btn" type="submit" />
        <?php } ?>
      <?php } else { ?>
        <h3>請登入以發布留言</h3>
      <?php } ?>
    </form>
    <div class="board__hr"></div>
    <?php if ($username && $user["role"] === "admin") { ?>
      <section>
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
          <div class="card">
            <div class="card__avatar"></div>
            <div class="card__body">
              <div class="card__info">
                <span class="card__author">
                  <?php echo escape($row['nickname']); ?>
                  (@<?php echo escape($row['username']); ?>)
                </span>
                <span class="card__time">
                  <?php echo escape($row['created_at']);?>
                </span>
                <a href="update_comment.php?id=<?php echo escape($row["id"]) ?>">編輯</a>
                <a href="delete_comment.php?id=<?php echo escape($row["id"]) ?>&role=<?php echo escape($user["role"]) ?>">刪除</a>
              </div>
              <p class="card__content"><?php echo escape($row['content']);?></p>
            </div>
          </div>
        <?php } ?>        
      </section>
    <?php } else {?>
      <section>
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
          <div class="card">
            <div class="card__avatar"></div>
            <div class="card__body">
              <div class="card__info">
                <span class="card__author">
                  <?php echo escape($row['nickname']); ?>
                  (@<?php echo escape($row['username']); ?>)
                </span>
                <span class="card__time">
                  <?php echo escape($row['created_at']);?>
                </span>
                <?php if ($row["username"] === $username) { ?>
                  <a href="update_comment.php?id=<?php echo escape($row["id"]) ?>">編輯</a>
                  <a href="delete_comment.php?id=<?php echo escape($row["id"]) ?>">刪除</a>
                <?php } ?>
              </div>
              <p class="card__content"><?php echo escape($row['content']);?></p>
            </div>
          </div>
        <?php } ?>        
      </section>
    <?php } ?>  
    <div class="board__hr"></div>
    <?php
      $stmt = $conn->prepare(
      "select count(id) as count from ericcch24_comments where is_deleted IS NULL"
      );
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row["count"];
      $total_page = ceil($count / $items_per_page);

    ?>
    <div class="page-info">
      <span>總共有 <?php echo $count; ?> 筆留言，頁數：</span>
      <span><?php echo escape($page); ?> / <?php echo escape($total_page); ?></span>
    </div>
    <div class="paginator">
      <?php if ($page !== 1) { ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo escape($page - 1); ?>">上一頁</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a href="index.php?page=<?php echo escape($page + 1); ?>">下一頁</a>
        <a href="index.php?page=<?php echo escape($total_page); ?>">最後一頁</a>
      <?php } ?>
    </div>
  </main>
</body>
<script>
  let btn = document.querySelector(".update-nickname")
  btn.addEventListener('click', function() {
    let form = document.querySelector(".board_nickname-form")
    form.classList.toggle("hide")
  })
</script>
</html> 
