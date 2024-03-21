<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <img src="../logo.jpg" alt="ロゴ" class="logo">
    <style>
     .logo {
        height: 100px; 
        width: auto; 
        margin-left: 20px; 
    }
    form {
    margin: 0 auto; 
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative; 
    width: fit-content; 
}

input[type="submit"] {

    background-color: #ff8c00;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
}
input[type="submit"]:hover {
    background-color: #ff8c00;
}
@media only screen and (max-width: 600px) {
    form {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    input[type="submit"] {
        width: 100%;
        padding: 15px;
    }
    .entertime {
        width: 100%;
    }
    select, input[type="time"] {
        width: 100%;
        font-size: 16px;
    }
    .logo {
        height: 50px; 
        width: auto; 
        margin-left: 5px; 
    }
}
    </style>

    <title>予約</title>
</head>
<body>
    <? session_start(); ?>
    <div class="form">
    <form action="reservation.php" method="POST">
        <input type="hidden" name="customerid" value="<?php echo @$_COOKIE['customerid'] ?? ''; ?>">
        <label for="class">行きたいクラス:</label>
        <select name="class" id="class">
            <?php
            require_once 'config.php';
                try {
                    $PDO = new PDO($dsn, $user, $password);
                    $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    $sql = "SELECT username FROM users";
                    $stmt = $PDO->prepare($sql);
                    $stmt->execute();
                    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    foreach ($rows as $row) {
                        echo "<option value='" . $row['username'] . "'>" . $row['username'] . "</option>";
                    }

                } catch (PDOException $e) {
                    exit('データベースに接続できませんでした。' . $e->getMessage());
                }
            ?>
        </select>
        <br>
        <div class="entertime">
            <label for="enter_time">予約時間</label>
            <input type="time" id="enter_time" name="enter_time" required>
        </div>
        <br>
        <input type="submit" value="予約する">
    </form>
    </div>
</body>
</html>