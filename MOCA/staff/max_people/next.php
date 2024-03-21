<?php

if (!isset($_POST['mp'])  ||  $_POST['mp']===''){
    echo '人数を設定してください';
    exit;
}

require_once 'config.php';
session_start();

try {
    $PDO = new PDO($dsn, $user, $password);
    $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $maxpeople = $_POST['mp'];
    $class = $_SESSION['username'];

    //$sql = "INSERT INTO queue (class, code) VALUES (:class, :code)";
    $sql = "INSERT INTO maxpeople (class,maxpeople) VALUES (:class, :maxpeople)";
    $stmt = $PDO->prepare($sql);
    $stmt->bindValue(':class', $class, PDO::PARAM_STR); // この行を追加
    $stmt->bindValue(':maxpeople', $maxpeople, PDO::PARAM_STR);
    $stmt->execute();

    echo "<p>最大人数: ".$maxpeople."</p>";
    echo "<p>class: ".$class."</p>";
    echo '<p>で登録しました。</p>';
} catch (PDOException $e) {
    exit('データベースに接続できませんでした。' . $e->getMessage());
}

?>
