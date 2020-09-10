<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id'])) 
  {
    header('Location: update_comment.php?errCode=1');
    die('資料不齊全，請重新輸入');
  }

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  
  if(!$username) {
    die('未登入');
  }


  $id = $_GET['id'];
  $role = $_GET['role'];

  if ($role === "admin") {
    $sql = "UPDATE ericcch24_comments SET is_deleted=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = "UPDATE ericcch24_comments SET is_deleted=1 WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>
