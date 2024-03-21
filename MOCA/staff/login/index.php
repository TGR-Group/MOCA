<?php
/*ほかのページでログインに飛ばす

issetで存在の有無を確認
useridがなければログインページにとばす

ログアウト処理
unsetでuseridを消す
ログインページに飛ばす
*/
 require_once 'config.php';
 try {
     $pdo = new PDO($dsn, $user, $password);
     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 } catch (PDOException $e) {
     echo 'Connection failed: ' . $e->getMessage();
 }


session_start();
if(empty($_SESSION['userid'])) {
    header('Location: login.php');
    exit();
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理ページ</title>
    <style>
/*ログアウトボタン以外*/

.action-buttons input[type="submit"] {
    width: 80%; /* ボタンの幅を調整 */
    margin: 20px auto; /* 上下の余白を20px、左右の余白を自動で中央揃えに */
    padding: 15px 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #ff8c00; 
    color: white;
    display: block; /* ブロック要素として表示 */
}


.action-buttons input[type="submit"]:hover {
    background-color: #ff8c00; 
}


.logout-button {
    padding: 5px 10px;
    background-color: #d9534f; 
    color: white;
    font-size: 14px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #c9302c; 
}

header {
        position: fixed; 
        top: 0;
        left: 0;
        width: 100%;
        background: #fff; /*背景色*/
        padding: 10px 0; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 軽い影を追加 */
        z-index: 1000; 
    }

    .logo {
        height: 100px; /* ロゴの高さ */
        width: auto; /* 幅は自動調整 */
        margin-left: 20px; /* 左の余白 */
    }
</style>
<img src="../logotext.jpg" alt="ロゴ" class="logo">
</head>
<body>
<?
echo 'こんにちは！ ' . $_SESSION['username'] . 'さん';
?>
<div class="action-buttons">
    <form action="../queue/index.php" method="post">
        <input type="submit" value="待ち行列用">
    </form>
    <form action="../enter/index.php" method="post">
        <input type="submit" value="入場用">
    </form>
    <form action="../leave/index.php" method="post">
        <input type="submit" value="退場用">
    </form>
</div>
    <form action="logout.php" method="post" class="logout-form">
    <input type="submit" name="logout" value="ログアウト" class="logout-button">
</form>
</form>
</body>
</html>







