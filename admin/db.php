<?php
// admin/db.php
$host = "localhost";
$db = "web_project";
$user = "root";
$pass = "";
$charset = "utf8mb4";
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
try {
 $pdo = new PDO($dsn, $user, $pass, [
 PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
 ]);
} catch (Exception $ex) {
 die("Database connection error.");
}
?>