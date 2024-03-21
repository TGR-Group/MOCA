<?php
require_once 'config.php';

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
session_start();
// usersのusernameカラムからクラスの名前を所得
$sql = "SELECT username FROM users";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$classList = $stmt->fetchAll(PDO::FETCH_COLUMN);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>予約画面</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <img src="logotext.jpg" alt="ロゴ" class="logo">
    <div class="container">
        <h1>クラスを選択してください</h1>
        <form action="next.php" method="POST">
            <select name="class">
                <?php foreach ($classList as $class): ?>
                    <option value="<?php echo $class; ?>"><?php echo $class; ?></option>
                <?php endforeach; ?>
            </select>
            <input type="submit" value="予約する">
        </form>
    </div>
</body>
</html>