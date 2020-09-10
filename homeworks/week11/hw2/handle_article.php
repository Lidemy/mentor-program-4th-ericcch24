<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['topic']) || empty($_POST['article'])) 
  {
    header('Location: edit.php?errCode=1&id='.$_GET["id"]);
    die('請輸入文章標題與內容');
  }

  $page = $_POST["page"];

  $id = NULL;
  if ($_GET) {
    $id = $_GET["id"];
  }

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  if(!$username) {
    die('未登入');
  }

  $topic = $_POST["topic"];
  $article = $_POST["article"];

  
  if ($id) {
    $sql = "UPDATE ericcch24_blog SET topic=?, article=? WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssis', $topic, $article, $id, $username);
  } else {
    $sql = "INSERT INTO ericcch24_blog(username, topic, article) VALUES(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $username, $topic, $article);
    /*
    SQL injection 測試
    $sql = sprintf(
      "INSERT INTO blog(username, topic, article) VALUES('%s', '%s', '%s')",
      $username,
      $topic,
      $article
    );
    $result = $conn->query($sql);
    */
  }
  

  $result = $stmt->execute();  
  if (!$result) {
    die($conn->error);
  }

  if ($id) {
    header("Location: " . $page);
    // 因為有幾個不同的頁面都可以連到編輯，所以編輯完之後統一設定回到上一頁比較合理
  } else {
    header("Location: index.php");
  }
?>
