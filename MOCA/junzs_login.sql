-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost
-- 生成日時: 2024 年 3 月 21 日 18:07
-- サーバのバージョン： 10.5.22-MariaDB-log
-- PHP のバージョン: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `junzs_login`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `userid` varchar(80) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`userid`, `username`, `password`) VALUES
('someyafes1_1', '1年1組', '2o204s0mey@fes11'),
('someyafes1_2', '1年2組', '2o204s0mey@fes12'),
('someyafes1_3', '1年3組', '2o204s0mey@fes13'),
('someyafes1_4', '1年4組', '2o204s0mey@fes14'),
('someyafes1_5', '1年5組', '2o204s0mey@fes15'),
('someyafes1_6', '1年6組', '2o204s0mey@fes16'),
('someyafes1_7', '1年7組', '2o204s0mey@fes17'),
('someyafes2_1', '2年1組', '2o204s0mey@fes21'),
('someyafes2_2', '2年2組', '2o204s0mey@fes22'),
('someyafes2_3', '2年3組', '2o204s0mey@fes23'),
('someyafes2_4', '2年4組', '2o204s0mey@fes24'),
('someyafes2_5', '2年5組', '2o204s0mey@fes25'),
('someyafes2_6', '2年6組', '2o204s0mey@fes26'),
('someyafes2_7', '2年7組', '2o204s0mey@fes27'),
('someyafes3_1', '3年1組', '2o204s0mey@fes31'),
('someyafes3_2', '3年2組', '2o204s0mey@fes32'),
('someyafes3_3', '3年3組', '2o204s0mey@fes33'),
('someyafes3_4', '3年4組', '2o204s0mey@fes34'),
('someyafes3_5', '3年5組', '2o204s0mey@fes35'),
('someyafes3_6', '3年6組', '2o204s0mey@fes36'),
('someyafes3_7', '3年7組', '2o204s0mey@fes37'),
('testuser', 'テストユーザー', 'testpswd');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
