<?php
  session_start();
  require_once('conn.php');
  require_once("utils.php");

  if (empty($_POST['username']) ||
      empty($_POST['password'])) 
  {
    header('Location: login.php?errCode=1');
    die();
  }

  
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM ericcch24_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute(); // 這段只是執行然後判斷有沒有執行成功，後面還要再把結果取回
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result(); //要將 $stmt 的結果取回
  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    exit();
  }

  $row = $result->fetch_assoc();
  // num_rows 表示結果有幾筆資料
  if (password_verify($password, $row["password"])) {
    //登入成功
    /*
      1. 產生 session id (token)
      2. 把 username 寫入檔案
      3. set-cookie: session-id
    */
    $_SESSION['username'] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }

// strpos($conn->error) . "Duplicate entry" !== false 

/* 建立 token 並儲存
$token = generateToken();
$sql = sprintf(
  "INSERT INTO tokens(token, username) VALUES('%s', '%s')",
  $token,
  $username
);
$result = $conn->query($sql);
if (!$result) {
  die($conn->error);
}

//登入成功
$expire = time() + 3600 * 24 * 30;
setcookie('token', $token, $expire);
*/
?>


