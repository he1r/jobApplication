-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2022 at 12:27 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lufthansa`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `job_id` int(100) NOT NULL,
  `application_reason` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `job_id`, `application_reason`) VALUES
(1, 1, 8, 'to see if this works'),
(2, 1, 9, 'tttt'),
(3, 14, 8, 'this is to test user application'),
(4, 1, 9, 'because i like this job :)'),
(5, 11, 8, 'its a test :)');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `id` int(11) NOT NULL,
  `jobListingID` int(110) NOT NULL,
  `userId` int(110) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`id`, `jobListingID`, `userId`) VALUES
(32, 21, 1),
(33, 8, 1),
(34, 8, 11);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `Job_Title` varchar(250) NOT NULL,
  `Job_Category` varchar(250) NOT NULL,
  `Job_Description` text NOT NULL,
  `Job_Skill` varchar(250) NOT NULL,
  `Job_Price` int(250) NOT NULL,
  `Created_Date` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `user_id`, `Job_Title`, `Job_Category`, `Job_Description`, `Job_Skill`, `Job_Price`, `Created_Date`) VALUES
(8, 1, 'zzzz', 'Health Science', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\\\\\'s standard dummy text ever since the 1500s', 'ReactJS', 2000, '23/7/2022'),
(9, 11, 'this is heirs job tittle', 'Health Science', 'this is heirs job description that is being used to test if the your jobs page is working properly', 'medicine ', 2222, '23/7/2022'),
(20, 1, 'this is a test job tittle', 'Business and Finance', 'this is a job test description', 'aaaa', 231, '26/7/2022'),
(21, 1, 'this is a test job tittle', 'Business and Finance', 'this is a job test description', 'aaaa', 231, '26/7/2022');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `First_Name` varchar(110) NOT NULL,
  `Surname` varchar(110) NOT NULL,
  `Birthday` varchar(250) NOT NULL,
  `Email` varchar(110) NOT NULL,
  `Password` varchar(110) NOT NULL,
  `Role` varchar(110) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `First_Name`, `Surname`, `Birthday`, `Email`, `Password`, `Role`) VALUES
(1, 'klajdi', 'test', '2002-06-22', 'admin@gmail.com', 'adminKlajdi22@', 'recruiter'),
(11, 'heir', 'user', '2002-06-22', 'user@gmail.com', 'userKlajdi22@', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
