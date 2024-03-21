<?php
require_once 'config.php';

session_start();
if (empty($_SESSION['userid'])) {
    header('Location: ../login/login.php');
    exit();
}

if (!isset($_POST['qr']) || $_POST['qr'] === '') {
    echo 'QRコードが読み取られません';
    exit;
}

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $code = $_POST['qr'];
    $class = $_SESSION['username'];

    // 読み取られたQRコードのユーザーのstart時間を取得
    $sql = "SELECT start FROM queue WHERE code = :code AND class = :class";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':code', $code);
    $stmt->bindParam(':class', $class);
    $stmt->execute();
    $scannedUserStart = $stmt->fetchColumn();

    // (読み取られたQRコードの人よりも先に並んでいる人)
    $sql = "SELECT q.code, q.skipped, c.number
            FROM queue q
            JOIN customer c ON q.code = c.customerid
            WHERE q.class = :class AND q.enter IS NULL AND q.leaving IS NULL AND q.start < :scannedUserStart
            ORDER BY q.start ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':class', $class);
    $stmt->bindParam(':scannedUserStart', $scannedUserStart);
    $stmt->execute();
    $waitingUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //skippedの値の定義
    $sql = "SELECT skipped FROM queue WHERE code = :code AND class = :class";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':code', $code);
    $stmt->bindParam(':class', $class);
    $stmt->execute();
    $scannedUserSkipped = $stmt->fetchColumn();

    // 読み取られたQRコードの人より先に並んでいるユーザーがいるかどうかを確認
    $hasEarlierUsers = !empty($waitingUsers);

    // 先に並んでいた人がskippedが1の場合は入場処理を許可する
    $allowEntry = true;
    foreach ($waitingUsers as $user) {
        if ($user['skipped'] !== 1) {
            $allowEntry = false;
            break;
        }
    }

    if ($scannedUserSkipped === 1) {
        echo "<div class='container'>";
        echo "<p>このユーザーは予約時間にきていません。予約された時間にお越しください。</p>";
        echo "<a href='index.php' class='back-btn'>戻る</a>";
        echo "</div>";
    } elseif ($scannedUserSkipped === 2) {
        // skipped=2の場合は入場処理　スキップを２にするのは時間指定予約の時間が近づいたら
        $sql = "UPDATE queue SET enter = NOW() WHERE code = :code AND class = :class AND skipped = 2 AND enter IS NULL";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':class', $class);
        $stmt->execute();

        echo "<div class='container'>";
        echo "<p>入場処理が完了しました。</p>";
        echo "<a href='index.php' class='back-btn'>戻る</a>";
        echo "</div>";
    } elseif (!$hasEarlierUsers || $allowEntry) {
        // skippedの値がNULLの場合かつは読み取られたQRコードの人より先に並んでいる人がいない場合、
        // もしくは先に並んでいる人全員がskip対象の場合は入場処理を行う
        $sql = "UPDATE queue SET enter = NOW() WHERE code = :code AND class = :class AND (skipped IS NULL OR skipped = 1) AND enter IS NULL";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':class', $class);
        $stmt->execute();

        echo "<div class='container'>";
        echo "<p>入場処理が完了しました。</p>";
        echo "<a href='index.php' class='back-btn'>戻る</a>";
        echo "</div>";
    } else {
        echo "<div class='container'>";
        echo "<p>skippedがNULLまたは2の人が先に並んでいるため、この人の入場処理は行われませんでした。</p>";
        echo "<a href='index.php' class='back-btn'>戻る</a>";
        echo "</div>";
    }

    echo "<h2>読み取られたQRコードの人より早く並んでいた人の一覧</h2>";
    echo "<ul>";
    foreach ($waitingUsers as $user) {
        $customerNumber = $user['number'];
        $isSkipped = ($user['skipped'] !== null) ? '✔' : '';
        echo "<li>$customerNumber $isSkipped";
        if ($user['skipped'] === null) {
            echo " <a href='skip.php?code={$user['code']}' class='skip-btn'>Skip</a>";
        }
        echo "</li>";
    }
    echo "</ul>";

} catch (PDOException $e) {
    exit('データベースに接続できませんでした。' . $e->getMessage());
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>入場処理</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>