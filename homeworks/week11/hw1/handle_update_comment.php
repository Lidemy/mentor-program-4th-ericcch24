<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) 
  {
    header('Location: update_comment.php?errCode=1&id='.$_POST["id"]);
    die('資料不齊全，請重新輸入');
  }

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  
  if(!$username) {
    die('未登入');
  }

  $id = $_POST['id'];
  $content = $_POST["content"];
  $role = $_POST["role"]; 
  // 這邊也可以用 $user = getUserFromUsername($username); 來拿 role，
  // 就不用再 update_comment.php 那邊再多 input 一個 role

  if ($role === "admin") {
    $sql = "UPDATE ericcch24_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = "UPDATE ericcch24_comments SET content=? WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>
