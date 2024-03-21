<?php
require_once 'config.php';
session_start();

if (!isset($_POST['class']) || $_POST['class'] === '') {
    echo 'クラスが選択されていません';
    exit;
}
try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $class = $_POST['class'];
    $start = date('Y-m-d H:i:s');
    $code = $_COOKIE['customerid'];
    // queueテーブルにデータを挿入
    $sql = "INSERT INTO queue (class, start, code) VALUES (:class, :start, :code)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':class', $class);
    $stmt->bindParam(':start', $start);
    $stmt->bindParam(':code', $code);
    $stmt->execute();
    echo "<div class='container'>";
    echo "<p>予約が完了しました。</p>";
    echo "<a href='index.php' class='back-btn'>戻る</a>";
    echo "</div>";
} catch (PDOException $e) {
    exit('データベースに接続できませんでした。' . $e->getMessage());
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>予約処理</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>