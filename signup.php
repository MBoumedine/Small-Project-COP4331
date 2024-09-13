<?php
// signup.php
require '../config/db.php';

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON input
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true); // Convert the JSON input to an associative array

    // Extract the fields from the decoded JSON
    $username = $data['username'];
    $password = $data['password']; // Assuming this is already hashed in your frontend
    $email = $data['email'];
    $fullName = $data['fullName'];

    // Check if the username already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username already exists']);
        exit;
    }

    // Insert the new user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password, email, fullName) VALUES (:username, :password, :email, :fullName)");
    $stmt->execute([
        'username' => $username,
        'password' => $password,
        'email' => $email,
        'fullName' => $fullName
    ]);

    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
<?php
require '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the username already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username already exists']);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert the new user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
    $stmt->execute(['username' => $username, 'password' => $hashedPassword]);

    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
