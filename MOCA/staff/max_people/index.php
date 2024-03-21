<?php 

require_once 'config.php';
session_start();
try {
    $PDO = new PDO($dsn, $user, $password);
    $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM `class`";
    $stmt = $PDO->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);


} catch (PDOException $e) {
    exit('データベースに接続できませんでした。' . $e->getMessage());

}
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最大収容人数設定ページ</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .container {
            @apply max-w-5xl mx-auto px-4;
        }
        body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        main {
            flex-grow: 1;
        }
        footer {
            margin-top: auto;
        }
    </style>
</head>
<body class="bg-gray-100">
    <header class="bg-white shadow-md sticky top-0 z-10">
        <nav class="container py-4 flex justify-between items-center">
            <a href="https://junzs.net">
                <img src="../logotext.jpg" alt="ロゴ" class="w-40 h-auto">
            </a>
        </nav>
    </header>

    <main class="container py-8 flex justify-center">
        <div class="max-w-md w-full">
            <h1 class="text-3xl font-bold mb-4 text-center">最大収容人数設定</h1>
            <form action="next.php" method="POST" class="bg-white shadow-md rounded-lg p-6">
                <div class="mb-4">
                    <label for="mp" class="block text-gray-700 font-bold mb-2">最大収容人数</label>
                    <select name="mp" id="mp" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <?php
                        for ($i = 1; $i <= 100; $i++) {
                            echo "<option value='{$i}'>{$i}</option>";
                        }
                        ?>
                    </select>
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    送信
                </button>
            </form>
        </div>
    </main>

    <footer class="bg-gray-800 text-white py-8">
        <div class="container">
            <p class="text-center">&copy; 2023 Your Company. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>