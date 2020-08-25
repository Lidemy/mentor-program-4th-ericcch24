<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) 
  {
    header('Location: index.php?errCode=1');
    die('資料有缺，請重新輸入');
  }

  $user = getUserFromUsername($_SESSION['username']);
  $nickname = $user['nickname'];

  $content = $_POST['content'];
  $sql = sprintf(
    "INSERT INTO ericcch24_comments(nickname, content) VALUES('%s', '%s')",
    $nickname, 
    $content
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>
