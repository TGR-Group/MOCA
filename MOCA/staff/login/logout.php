<?php
        session_start();
        unset($_SESSION['userid']);
        header('Location: login.php', 303);