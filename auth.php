<?php
session_start();

// Your credentials (you can change admin / 12345)
$valid_username = "admin";
$valid_password_hash = password_hash("12345", PASSWORD_DEFAULT);

// Read submitted values
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username === $valid_username && password_verify($password, $valid_password_hash)) {
    $_SESSION['logged_in'] = true;
    header("Location: gate.php");
    exit;
} else {
    header("Location: login_page.html?error=1");
    exit;
}
?>
