<?php
require "db.php";
require "auth.php";

$id = (int)($_GET["id"] ?? 0);
$stmt = $pdo->prepare("SELECT * FROM messages WHERE id = ?");
$stmt->execute([$id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$row) {
    die("Not found.");
}
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>View</title>
</head>

<body>
    <h1>Message #<?= htmlspecialchars($row["id"]) ?></h1>
    <p><b>Name:</b> <?= htmlspecialchars($row["name"]) ?></p>
    <p><b>Email:</b> <?= htmlspecialchars($row["email"]) ?></p>
    <p><b>Date:</b> <?= htmlspecialchars($row["created_at"]) ?></p>
    <p><b>Message:</b><br><?= nl2br(htmlspecialchars($row["message"])) ?></p>
    <p><a href="list.php">Back</a></p>
    <p><a href="logout.php">Logout</a></p>
</body>

</html>