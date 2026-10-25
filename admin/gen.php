<?php
// Uruchom ten plik raz w przeglądarce, skopiuj wynik i usuń ten plik
$hash = password_hash("admin123", PASSWORD_DEFAULT);
echo $hash;
?>