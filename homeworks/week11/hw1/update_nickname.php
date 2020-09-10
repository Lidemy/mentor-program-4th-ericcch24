<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['nickname'])) 
  {
    header('Location: index.php?errCode=1');
    die('資料不齊全，請重新輸入');
  }

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  
  if(!$username) {
    die('未登入');
  }

  $nickname = $_POST['nickname'];
  $sql = "UPDATE ericcch24_users SET nickname=? WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>
