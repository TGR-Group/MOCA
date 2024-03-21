<?php 

$err = '';
$errorpsw = "パスワードが違います";
$erroruser = "ユーザー名が違います";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    require_once 'config.php';
    try {
        $pdo = new PDO($dsn, $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
    
    
    session_start();
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // データベースからユーザー名を検索
    $sql = "SELECT * FROM users WHERE userid = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    //var_dump($row);
    
    if (!$row) {
        $err = 'ユーザーが見つかりません';
    } else if ($row['password'] !== $password) {
        $err = 'パスワードが違います';
    } else {
        // ログイン成功
        
        $_SESSION['username'] = $row['username'];
        $_SESSION['userid'] = $row['userid'];
 

        header('Location: ./', 303);
        exit();
    }

}  
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ログイン画面</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            width: 300px;
        }

        h2 {
            text-align: center;
            color: #333;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            color: #666;
        }

        .form-group input[type="text"],
        .form-group input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
            box-sizing: border-box;
        }

        .form-group input[type="submit"] {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 3px;
            background-color: #ff8c00;
            color: white;
            cursor: pointer;
            font-size: 16px;
        }

        .form-group input[type="submit"]:hover {
            background-color: #ff8c00;
        }

        .error {
            color: #d9534f;
            text-align: center;
        }
        .logo-container {
        text-align: center;
        margin-bottom: 20px;
    }

    .logo-container img {
        max-width: 150px; /* ロゴの最大幅を設定するとこ */
        height: auto; /* 高さは自動調整にした */
    }
</style>
    </style>
</head>
<body>
    <form action="" method="post">
        <div class="logo-container">
            <img src="../logotext.jpg" alt="ロゴ">
        </div>
    <form action="" method="post">
        <h2>ログイン</h2>
        <?php if ($err) { ?>
            <p class="error"><?= $err ?></p>
        <?php } ?>
        <div class="form-group">
            <label for="username">ユーザー名:</label>
            <input type="text" id="username" name="username">
        </div>
        <div class="form-group">
            <label for="password">パスワード:</label>
            <input type="password" id="password" name="password">
        </div>
        <div class="form-group">
            <input type="submit" value="ログイン">
        </div>
    </form>
</body>
</html>