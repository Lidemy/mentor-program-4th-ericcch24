<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) 
  {
    header('Location: index.php?errCode=1');
    die('資料不齊全，請重新輸入');
  }

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }
  
  if(!$username) {
    die('未登入');
  }
  $content = $_POST['content'];

  if ($user['role'] === 'suspend') {
    header("Location: index.php");
    exit;
  }
  $sql = "INSERT INTO ericcch24_comments(username, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>
