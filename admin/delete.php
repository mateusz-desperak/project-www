<?php
require "db.php";
require "auth.php";
$id = (int)($_GET["id"] ?? 0);
$stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
$stmt->execute([$id]);
header("Location: list.php");
exit;
