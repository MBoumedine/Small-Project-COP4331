<?php
$host = 'localhost';
$db = 'contact_db';
$user = 'root';
$pass = 'qLlKGa=!AB4q';
//$charset = 'utf8mb4';

//$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
//$options = [
//    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
//    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
//    PDO::ATTR_EMULATE_PREPARES   => false,
//];

try {
    $conn = new mysqli($host, $user, $pass, $db);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

?>
