<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');


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

  if (empty($_POST['role'])) 
  {
    header('Location: role_admin.php?errCode=1');
    die('資料不齊全，請重新輸入');
  }

  
  if ($_POST['role'] !== 'admin' &&
      $_POST['role'] !== 'normal' && 
      $_POST['role'] !== 'suspend') 
  {
    header('Location: role_admin.php?errCode=2');
    die('資料有誤，請重新輸入');
  } // 只能輸入三種身份
  

  $id = $_POST['id'];
  $role = $_POST["role"];
  $sql = "UPDATE ericcch24_users SET role=? WHERE id=? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: role_admin.php");
?>
