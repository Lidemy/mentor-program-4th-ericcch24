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

  if ($user === NULL || $user['role'] !== 'admin') {
    header("Location: index.php");
    exit;
  } // 當身份不是管理員就跳回首頁

  $stmt = $conn->prepare(
    "SELECT ".
      "id, role, username, nickname ".
    "FROM ericcch24_users ORDER BY id DESC"
  );
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
  <title>身份管理</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
        <a class="board__btn" href="logout.php">登出</a>
        <a class="board__btn" href="index.php">回留言板</a>
        <h3>歡迎！<?php echo escape($user["nickname"]); ?>，您目前在身份管理頁面</h3>
    <div class="board__hr"></div>
    <div>身份說明：&emsp; admin = 管理員  &emsp; normal = 一般使用者 &emsp; suspend = 遭停權使用者</div><br>
    <?php
      if(!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        } else if ($code === '2'){
          $msg = '資料輸入錯誤';
        }
        echo '<h2 class="error">錯誤：' . $msg . '</h2>';
      }
    ?>
    <div class="user-topic">
      <span >ID</span>
      <span >身份</span>
      <span >暱稱</span>
      <span >帳號</span>
    </div>
    <section class="user__list">
      <?php
        while($row = $result->fetch_assoc()) {
      ?>
        <div class="user">
          <span><?php echo escape($row['id']);?></span>
          <span><?php echo escape($row['role']);?></span>
          <span><?php echo escape($row['nickname']); ?></span>
          <span><?php echo escape($row['username']); ?></span>
          <?php // 參考範例用建立三種身份<a href>連結的 GET 方式來改?>
          <div class="update">
            <a class="update__role">編輯身份</a>
            <form class="role hide" method="POST" action="handle_update_role.php">
              <input class="change__role" type="text" name="role" value="<?php echo $row["role"]; ?>" />
              <input class="change__role-btn" type="submit" /> 
              <input type="hidden" name="id" value="<?php echo $row["id"]; ?>">
            </form>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>
<script>
  let btn = document.querySelector(".user__list");
  btn.addEventListener("click", (e) => {
    const element = e.target.closest(".update__role");
    if (element) {
      element.nextElementSibling.classList.toggle("hide");
      // element.nextElementSibling -> element 同一層的下個元素，在這邊就是 span 的下一個元素 form 
    }
  })
</script>
</html> 