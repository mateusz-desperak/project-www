<?php

require "db.php";
require "auth.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = (int)($_POST["id"] ?? 0);
    $message = trim($_POST["message"] ?? "");

    if ($id > 0 && strlen($message) >= 5) {
        $stmt = $pdo->prepare("UPDATE messages SET message = ? WHERE id = ?");
        $stmt->execute([$message, $id]);
    }

    header("Location: list.php");
    exit;
}

$id = (int)($_GET["id"] ?? 0);

$stmt = $pdo->prepare("SELECT * FROM messages WHERE id = ?");
$stmt->execute([$id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    die("Message not found.");
}
?>
<!doctype html>
<html lang="pl">
<head>
    <meta charset="utf-8">
    <title>Edit Message</title>
</head>
<body>
    <h1>Edit Message #<?= htmlspecialchars($row["id"]) ?></h1>
    
    <p><b>Name:</b> <?= htmlspecialchars($row["name"]) ?></p>
    <p><b>Email:</b> <?= htmlspecialchars($row["email"]) ?></p>


    <form method="POST" action="edit.php">

        <input type="hidden" name="id" value="<?= htmlspecialchars($row["id"]) ?>">
        
        <div>
            <label for="message"><b>Message:</b></label><br>
            <textarea id="message" name="message" rows="5" cols="40" required minlength="5"><?= htmlspecialchars($row["message"]) ?></textarea>
        </div>
        <br>
        <button type="submit">Save Changes</button>
        <a href="list.php">Cancel</a>
    </form>
    <p><a href="logout.php">Logout</a></p>
</body>
</html>