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
-- データベース: `junzs_schoolfes`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- テーブルのデータのダンプ `class`
--

INSERT INTO `class` (`id`, `name`) VALUES
(1, '1年1組'),
(2, '1年2組'),
(3, '1年3組'),
(4, '1年4組'),
(5, '1年5組'),
(6, '1年6組'),
(7, '1年7組'),
(8, '2年1組'),
(9, '2年2組'),
(10, '2年3組'),
(11, '2年4組'),
(12, '2年5組'),
(13, '2年6組'),
(14, '2年7組'),
(15, '3年1組'),
(16, '3年2組'),
(17, '3年3組'),
(18, '3年4組'),
(19, '3年5組'),
(20, '3年6組'),
(21, '3年7組');

-- --------------------------------------------------------

--
-- テーブルの構造 `customer`
--

CREATE TABLE `customer` (
  `number` int(80) NOT NULL,
  `customerid` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- テーブルのデータのダンプ `customer`
--

INSERT INTO `customer` (`number`, `customerid`) VALUES
(54, 'e2632da435ab6adb290a26fab299d0ec'),
(55, '22ba9bcaebe28d94b817de463a24fe8e'),
(56, '5aa8b2b73b6656fbd150da1d67089ef3'),
(57, '2d8022de66cc5e142a4f3e937545865b'),
(58, '50a37a18973b0fd64a97d412743ca8a2'),
(59, 'bc54d0932ed55bb25bf24ba3f25bcb78'),
(60, '3e05ee08eec2bdbfc1891609e42034ee'),
(61, '2636759ac9efa11b102625bf1629ff71'),
(62, '8d4bda10b2f57f71ab0860f3a711dd7c'),
(63, '6cb595198516e876d50ee356d78011a5'),
(64, '952287cc5c91db3462204ecedf85e1b9');

-- --------------------------------------------------------

--
-- テーブルの構造 `maxpeople`
--

CREATE TABLE `maxpeople` (
  `id` int(255) NOT NULL,
  `class` varchar(80) NOT NULL,
  `maxpeople` int(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- テーブルのデータのダンプ `maxpeople`
--

INSERT INTO `maxpeople` (`id`, `class`, `maxpeople`) VALUES
(1, '1年6組', 3),
(2, '1年1組', 3);

-- --------------------------------------------------------

--
-- テーブルの構造 `queue`
--

CREATE TABLE `queue` (
  `id` int(11) NOT NULL,
  `class` text NOT NULL,
  `code` varchar(80) NOT NULL,
  `skipped` int(80) DEFAULT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `enter` timestamp NULL DEFAULT NULL,
  `leaving` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `queue`
--

INSERT INTO `queue` (`id`, `class`, `code`, `skipped`, `start`, `enter`, `leaving`) VALUES
(44, '1年1組', '例', NULL, '2024-02-10 04:28:06', '2024-03-11 12:00:18', '2024-03-21 00:53:54'),
(47, '1年1組', 'testuser', NULL, '2024-03-13 08:33:23', '2024-03-14 12:00:30', NULL),
(50, '1年1組', 'tutumin', NULL, '2024-03-14 08:08:10', NULL, NULL),
(52, '1年1組', '2636759ac9efa11b102625bf1629ff71', NULL, '2024-03-15 06:51:15', NULL, NULL),
(53, '1年1組', '2636759ac9efa11b102625bf1629ff71', NULL, '2024-03-15 06:59:51', NULL, NULL),
(54, '1年1組', '2636759ac9efa11b102625bf1629ff71', NULL, '2024-03-15 07:00:10', NULL, NULL),
(55, '1年1組', '2636759ac9efa11b102625bf1629ff71', NULL, '2024-03-15 07:00:13', NULL, NULL),
(56, '1年1組', '2636759ac9efa11b102625bf1629ff71', NULL, '2024-03-15 07:00:14', NULL, NULL),
(57, '1年1組', '2636759ac9efa11b102625bf1629ff71', NULL, '2024-03-15 07:01:11', NULL, NULL),
(58, '1年1組', '8d4bda10b2f57f71ab0860f3a711dd7c', NULL, '2024-03-15 07:03:09', NULL, NULL),
(59, '1年1組', '6cb595198516e876d50ee356d78011a5', NULL, '2024-03-15 07:13:18', NULL, NULL),
(60, '1年1組', 'ohayo', NULL, '2024-03-21 00:53:10', NULL, NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `reserve`
--

CREATE TABLE `reserve` (
  `count` int(11) NOT NULL,
  `id` varchar(80) NOT NULL,
  `class` text NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- テーブルのデータのダンプ `reserve`
--

INSERT INTO `reserve` (`count`, `id`, `class`, `time`) VALUES
(27, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '20:12:00'),
(28, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '20:14:00'),
(29, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '20:14:00'),
(30, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '20:14:00'),
(31, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '00:14:00'),
(33, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '00:14:00'),
(35, '', '1年1組', '22:00:00'),
(36, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '21:32:00'),
(37, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '21:53:00'),
(38, '4a9204c2a8bda7727eda8e339e935c95', '1年1組', '21:53:00'),
(39, 'b23cbbe10091aefab03387bb3e1e5d26', '1年1組', '23:00:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `userid` varchar(80) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`userid`, `username`, `password`, `url`) VALUES
('someyafes1_1', '1年1組', '2o204s0mey@fes11', 'https://github.com/'),
('someyafes1_2', '1年2組', '2o204s0mey@fes12', ''),
('someyafes1_3', '1年3組', '2o204s0mey@fes13', ''),
('someyafes1_4', '1年4組', '2o204s0mey@fes14', ''),
('someyafes1_5', '1年5組', '2o204s0mey@fes15', ''),
('someyafes1_6', '1年6組', '2o204s0mey@fes16', ''),
('someyafes1_7', '1年7組', '2o204s0mey@fes17', ''),
('someyafes2_1', '2年1組', '2o204s0mey@fes21', ''),
('someyafes2_2', '2年2組', '2o204s0mey@fes22', ''),
('someyafes2_3', '2年3組', '2o204s0mey@fes23', ''),
('someyafes2_4', '2年4組', '2o204s0mey@fes24', ''),
('someyafes2_5', '2年5組', '2o204s0mey@fes25', ''),
('someyafes2_6', '2年6組', '2o204s0mey@fes26', ''),
('someyafes2_7', '2年7組', '2o204s0mey@fes27', ''),
('someyafes3_1', '3年1組', '2o204s0mey@fes31', ''),
('someyafes3_2', '3年2組', '2o204s0mey@fes32', ''),
('someyafes3_3', '3年3組', '2o204s0mey@fes33', ''),
('someyafes3_4', '3年4組', '2o204s0mey@fes34', ''),
('someyafes3_5', '3年5組', '2o204s0mey@fes35', ''),
('someyafes3_6', '3年6組', '2o204s0mey@fes36', ''),
('someyafes3_7', '3年7組', '2o204s0mey@fes37', ''),
('testuser', 'テストユーザー', 'testpswd', '');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerid`),
  ADD UNIQUE KEY `number` (`number`,`customerid`);

--
-- テーブルのインデックス `maxpeople`
--
ALTER TABLE `maxpeople`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `reserve`
--
ALTER TABLE `reserve`
  ADD PRIMARY KEY (`count`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- テーブルの AUTO_INCREMENT `customer`
--
ALTER TABLE `customer`
  MODIFY `number` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- テーブルの AUTO_INCREMENT `maxpeople`
--
ALTER TABLE `maxpeople`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `queue`
--
ALTER TABLE `queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- テーブルの AUTO_INCREMENT `reserve`
--
ALTER TABLE `reserve`
  MODIFY `count` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
