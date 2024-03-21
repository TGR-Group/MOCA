<?php
echo $_POST['qr'];

if (!isset($_POST['qr'])  ||  $_POST['qr']===''){
    echo 'QRコードが読み取られません';
    exit;
}

require_once 'config.php';

try {
    $PDO = new PDO($dsn, $user, $password);
    $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $code = $_POST['qr'];
    $class = $_POST['class'];

    $sql = "INSERT INTO queue (class, code, start) VALUES (:class, :code, NOW())";
    $stmt = $PDO->prepare($sql);
    $stmt->bindValue(':class', $class, PDO::PARAM_STR);
    $stmt->bindValue(':code', $code, PDO::PARAM_STR);
    $stmt->execute();

    echo "<p>code: ".$code."</p>";
    echo "<p>class: ".$class."</p>";
    echo '<p>で登録しました。</p>';
} catch (PDOException $e) {
    exit('データベースに接続できませんでした。' . $e->getMessage());
}

?>
