<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login_page.php");
    exit();
}

// If logged in, show the real HTML file
readfile("index_frontimg.html");
