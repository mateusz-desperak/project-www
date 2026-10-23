<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	http_response_code(405);
	exit("Method not allowed.");
}

$name = trim(is_string($_POST["name"] ?? null) ? $_POST["name"] : "");
$email = trim(is_string($_POST["email"] ?? null) ? $_POST["email"] : "");
$date = trim(is_string($_POST["date"] ?? null) ? $_POST["date"] : "");
$time = trim(is_string($_POST["time"] ?? null) ? $_POST["time"] : "");
$guestsInput = trim(is_string($_POST["guests"] ?? null) ? $_POST["guests"] : "");
$tableType = trim(is_string($_POST["tableType"] ?? null) ? $_POST["tableType"] : "");
$notes = trim(is_string($_POST["notes"] ?? null) ? $_POST["notes"] : "");

$errors = [];
$nameLength = function_exists("mb_strlen") ? mb_strlen($name, "UTF-8") : strlen($name);
if ($nameLength < 3) {
	$errors[] = "Imię i nazwisko musi mieć co najmniej 3 znaki.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$errors[] = "Podany adres e-mail jest nieprawidłowy.";
}

$dateObject = DateTime::createFromFormat("!Y-m-d", $date);
if (!$dateObject || $dateObject->format("Y-m-d") !== $date) {
	$errors[] = "Podana data jest nieprawidłowa.";
}
if (!preg_match("/^(?:[01]\d|2[0-3]):[0-5]\d$/", $time)) {
	$errors[] = "Podana godzina jest nieprawidłowa.";
}
if (!ctype_digit($guestsInput) || (int) $guestsInput < 1 || (int) $guestsInput > 10) {
	$errors[] = "Liczba osób musi wynosić od 1 do 10.";
}
if (!in_array($tableType, ["window", "garden", "standard"], true)) {
	$errors[] = "Wybierz prawidłowy rodzaj stolika.";
}
if (strlen($notes) > 2000) {
	$errors[] = "Uwagi mogą mieć maksymalnie 2000 znaków.";
}

if ($errors) {
	http_response_code(400);
	echo "<h1>Błąd</h1><ul>";
	foreach ($errors as $error) {
		echo "<li>" . htmlspecialchars($error, ENT_QUOTES, "UTF-8") . "</li>";
	}
	echo "</ul><p><a href='javascript:history.back()'>Wróć do formularza</a></p>";
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
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	]);

	$stmt = $pdo->prepare(
		"INSERT INTO reservations (name, email, reservation_date, reservation_time, guests, table_type, notes)
		 VALUES (?, ?, ?, ?, ?, ?, ?)"
	);
	$stmt->execute([$name, $email, $date, $time, (int) $guestsInput, $tableType, $notes]);

	echo "<h1>Gotowe!</h1>";
	echo "<p>Rezerwacja została zapisana.</p>";
	echo "<p><a href='rezerwacja.html'>Wróć do formularza</a></p>";
} catch (PDOException $exception) {
	http_response_code(500);
	echo "<h1>Błąd</h1>";
	echo "<p>Nie udało się zapisać rezerwacji. Spróbuj ponownie później.</p>";
}
?>
