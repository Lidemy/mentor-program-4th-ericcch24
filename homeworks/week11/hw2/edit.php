<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = NULL;
  if ($_GET) {
    $id = intval($_GET["id"]);
  }
  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  if(!$username) {
    die('未登入');
  }

  
  $stmt = $conn->prepare(
    "SELECT * FROM ericcch24_blog WHERE id = ?"
  );
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }
  

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>


<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="list.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="admin.php">管理後台</a></li>
          <?php if($username) { ?>
            <li><a href="logout.php">登出</a></li>
          <?php } else { ?>
            <li><a href="login.php">登入</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
    <?php
      if(!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '請輸入文章標題與內容';
        } 
        echo '<h2 class="error">錯誤：' . $msg . '</h2>';
      }
    ?>
      <div class="edit-post">
        <?php if($username) { ?>
          <?php if($id) { ?>
            <form action="handle_article.php?id=<?php echo escape($row['id']) ?>" method="POST">
              <div class="edit-post__title">
                編輯文章：
              </div>
              <div class="edit-post__input-wrapper">
                <input class="edit-post__input" name="topic" value="<?php echo escape($row['topic']); ?>" />
              </div>
              <div class="edit-post__input-wrapper">
                <textarea rows="20" class="edit-post__content" name="article"><?php echo escape($row['article']); ?></textarea>
              </div>
              <div class="edit-post__btn-wrapper">
                  <input class="edit-post__btn" type="submit" value="送出">
              </div>
              <input type="hidden" name="page" value="<?php echo $_SERVER["HTTP_REFERER"] ?>">
            </form>
          <? } else { ?>
            <form action="handle_article.php" method="POST">
              <div class="edit-post__title">
                發表文章：
              </div>
              <div class="edit-post__input-wrapper">
                <input class="edit-post__input" name="topic" placeholder="請輸入文章標題" />
              </div>
              <div class="edit-post__input-wrapper">
                <textarea rows="20" class="edit-post__content" name="article"></textarea>
              </div>
              <div class="edit-post__btn-wrapper">
                <input class="edit-post__btn" type="submit" value="送出">
              </div>
            </form>
          <?php } ?>
        <?php } else { ?>
          <div class="error">請登入後繼續</div>
        <?php } ?>  
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>