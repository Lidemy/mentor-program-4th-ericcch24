<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id'])) 
  {
    header('Location: admin.php');
    die('資料不齊全，請重新輸入');
  }

  $id = $_GET['id'];
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  if(!$username) {
    die('未登入');
  }


  $sql = "UPDATE ericcch24_blog SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>
