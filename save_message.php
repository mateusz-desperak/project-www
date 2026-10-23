<?php

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

$errors = [];
if (strlen($name) < 3) $errors[] = "Name must have at least 3 characters.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Email is invalid.";
if (strlen($message) < 10) $errors[] = "Message must have at least 10 characters.";
if (count($errors) > 0) {

    echo "<h1>Error</h1>";
    echo "<ul>";
    foreach ($errors as $e) echo "<li>" . htmlspecialchars($e) . "</li>";
    echo "</ul>";
    exit;
}


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

    $stmt = $pdo->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?,
?)");
    $stmt->execute([$name, $email, $message]);
    echo "<h1>Success</h1>";
    echo "<p>Message saved.</p>";
    echo "<p><a href='kontakt.html'>Back to contact</a></p>";
} catch (Exception $ex) {
    echo "<h1>Error</h1>";
    echo "<p>Database error.</p>";
}
