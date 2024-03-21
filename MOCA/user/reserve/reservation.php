<?php
require_once 'config.php';
try {
    $PDO = new PDO($dsn, $user, $password);
    $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT username FROM users";
    $stmt = $PDO->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    exit('データベースに接続できませんでした。' . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if  ($_POST['customerid'] == '') {
        echo "err";
    } else { 
        $customerid = $_POST['customerid'];
        $class = $_POST['class'];
        $time = $_POST['enter_time'];

        $sql = "INSERT INTO reserve (id, class, time) VALUES (:customerid, :class, :time)";
        $stmt = $PDO->prepare($sql);
        $stmt->bindParam(':customerid', $customerid, PDO::PARAM_STR);
        $stmt->bindParam(':class', $class, PDO::PARAM_STR);
        $stmt->bindParam(':time', $time, PDO::PARAM_STR);
        $stmt->execute();

        echo "success";
    }
}


/*if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['customerid'])) {
        $customerid = $_POST['customerid'];
        $class = $_POST['class'];
        $time = $_POST['enter_time'];

        $sql = "INSERT INTO reserve (id, class, time) VALUES (:customerid, :class, :time)";
        $stmt = $PDO->prepare($sql);
        $stmt->bindParam(':customerid', $customerid, PDO::PARAM_STR);
        $stmt->bindParam(':class', $class, PDO::PARAM_STR);
        $stmt->bindParam(':time', $time, PDO::PARAM_STR);
        $stmt->execute();

        $message = "<h2>{$class}で{$time}の時間にお待ちしております。入場の際はQRコードを提示してください。</h2>";
    } else {
        $customerid = $_POST['customerid'];
        $class = $_POST['class'];
        $time = $_POST['enter_time'];

        $sql = "INSERT INTO reserve (id, class, time) VALUES (:customerid, :class, :time)";
        $stmt = $PDO->prepare($sql);
        $stmt->bindParam(':customerid', $customerid, PDO::PARAM_STR);
        $stmt->bindParam(':class', $class, PDO::PARAM_STR);
        $stmt->bindParam(':time', $time, PDO::PARAM_STR);
        $stmt->execute();

        $message = "<h2>こちらにアクセスしたあとに予約してください。到着時に本人確認ができなくなります。<br><a href='https://junzs.net/someyafes/user/userid/'>こちら</a>からQRコードを取得してください。</h2>";
    }
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>予約</title>
</head>
<body>
    <?php
    if ($customerid == "	
    <br />
    <b>Warning</b>:  Undefined array key ") {
        echo $message;
    }
    ?>
</body>
</html>
</html>
*/