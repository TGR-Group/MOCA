<?php
require_once 'config.php';

session_start();
if (empty($_SESSION['userid'])) {
    header('Location: ../login/login.php');
    exit();
}

if (!isset($_GET['code']) || $_GET['code'] === '') {
    echo 'QRコードが指定されていません';
    exit;
}

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $code = $_GET['code'];
    $class = $_SESSION['username'];

    // QRコードに対応するユーザーをスキップする
    $sql = "UPDATE queue SET skipped = 1 WHERE code = :code AND class = :class AND enter IS NULL";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':code', $code);
    $stmt->bindParam(':class', $class);
    $stmt->execute();

    echo "<div class='container'>";
    echo "<p>ユーザーをスキップしました。</p>";
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
    <title>スキップ処理</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>