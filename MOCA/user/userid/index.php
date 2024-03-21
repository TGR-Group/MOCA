<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ユーザーID</title>
    <img src="../logo.jpg" alt="ロゴ" class="logo">
    <style>
    .logo {
        height: 100px; 
        width: auto; 
        margin-left: 20px; 
    }


    h2 {
        font-size: 1.5em;
        color: #333;
        text-align: center;
    }

    .qrcode {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    @media only screen and (max-width: 600px) {
    .logo {
        height: 50px; 
        width: auto; 
        margin-left: 5px; 
    }
}
.ptag {
    text-align: center;
}



    </style>
</head>
<body>
    <?php
        require_once 'config.php';
        session_start();
    
        if (!isset($_COOKIE['customerid'])) {
            $customerid = bin2hex(random_bytes(16));
            $userid = $customerid;
            setcookie('customerid', $customerid, time() + 60*60*24, "/");
  
        
            try {
                $PDO = new PDO($dsn, $user, $password);
                $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                $sql = "INSERT INTO customer (customerid) VALUES (:customerid)";
                $stmt = $PDO->prepare($sql);
                $stmt->bindParam(':customerid', $customerid);
                $stmt->execute();
            } catch (PDOException $e) {
                exit('データベースに接続できませんでした。' . $e->getMessage());
            }
        } else {
            $userid = $_COOKIE['customerid'];
        }
        
        $qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" .urlencode($userid);
    ?>
    <br>
    <div class="h2">
    <h2>あなたのQRコード</h2><br>
    </div>
        <div class="ptag">
        <p>スタッフに提示してください</p>
        </div>
            <div class="qrcode">
            <img src="<?php echo $qrCodeUrl; ?>" alt="QR Code">
            </div>
</body>
</html>