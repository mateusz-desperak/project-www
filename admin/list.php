<?php
require "db.php";
require "auth.php";

$stmt = $pdo->query("SELECT id, name, email, created_at FROM messages ORDER BY id
DESC");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Admin - Messages</title>
</head>

<body>
    <h1>Messages</h1>
    <table cellpadding="6">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        <?php foreach ($rows as $r): ?>
            <tr>
                <td><?= htmlspecialchars($r["id"]) ?></td>
                <td><?= htmlspecialchars($r["name"]) ?></td>
                <td><?= htmlspecialchars($r["email"]) ?></td>
                <td><?= htmlspecialchars($r["created_at"]) ?></td>
                <td>
                    <a href="view.php?id=<?= $r["id"] ?>">View</a>
                    <a href="edit.php?id=<?= $r["id"] ?>">Edit</a>
                    <a href="delete.php?id=<?= $r["id"] ?>" onclick="return confirm('Delete this message?')">Delete</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
    <p><a href="logout.php">Logout</a></p>
</body>

</html>