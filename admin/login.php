<?php
session_start();
$err = "";

$stored_hash = '$2y$10$c3HoKcKi3FySn.ConM3vYewPTx1/2.7pOJlEdQhRRDtcPbg45pOxC'; 


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $login = trim($_POST["login"] ?? "");
    $pass = trim($_POST["password"] ?? "");

    if ($login === "admin" && password_verify($pass, $stored_hash)) {
        $_SESSION["user"] = $login;
        header("Location: list.php");
        exit;
    } else {
        $err = "Wrong login or password.";
    }
}
?>
<!doctype html>
<html lang="pl">
<head>
    <meta charset="utf-8">
    <title>Admin login</title>
</head>
<body>
    <h1>Admin login</h1>
    
    <?php if ($err): ?>
        <p style="color:red;"><?= htmlspecialchars($err) ?></p>
    <?php endif; ?>

    <form method="POST">
        <label>Login</label><br>
        <input name="login" type="text" required><br><br>
        
        <label>Password</label><br>
        <input name="password" type="password" required><br><br>
        
        <button type="submit">Login</button>
    </form>
</body>
</html>