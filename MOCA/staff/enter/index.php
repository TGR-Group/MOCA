<?php
require_once 'config.php';

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

session_start();
if (empty($_SESSION['userid'])) {
    header('Location: ../login/login.php');
    exit();
}

$class = $_SESSION['username'];

// クラスの最大収容人数を取得
$sql = "SELECT maxpeople FROM maxpeople WHERE class = :class";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':class', $class);
$stmt->execute();
$maxPeople = $stmt->fetchColumn();

// 現在の入場人数を取得
$sql = "SELECT COUNT(*) as current_people FROM queue WHERE class = :class AND enter IS NOT NULL AND leaving IS NULL";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':class', $class);
$stmt->execute();
$currentPeople = $stmt->fetchColumn();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>入場用</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <img src="../logotext.jpg" alt="ロゴ" class="logo">
    <div id="wrapper">
        <video id="video" autoplay muted playsinline></video>
        <canvas id="camera-canvas"></canvas>
        <canvas id="rect-canvas"></canvas><br>
    </div>
    <div class="form">
        <form id="entry-form" action="next.php" method="post">
            QRコード: <input type="text" id="qr-msg" name="qr" value="">
            <br><?php
            echo '' . $_SESSION['username'] . 'としてログイン中';
            ?>
            <input type="hidden" id="username" name="class" value="<?php echo htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8'); ?>">
            <?php
            // 入場可能かどうかの判断
            if ($currentPeople >= $maxPeople) {
                echo "<p>入場できません。最大収容人数を超えています。</p>";
            }
            ?>
            <div id="status-message"></div>
            <input type="submit" id="submit-btn" value="入場">
        </form>
    </div>
    <script src="./jsQR.js"></script>
    <script src="./script.js"></script>
</body>
</html>