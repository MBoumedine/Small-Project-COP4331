<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:38643");
// login.php
require '../config/db.php';

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON input
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true); // Convert the JSON input to an associative array

    // Extract the fields from the decoded JSON
    $username = $data['username'];
    $password = $data['password']; // Assuming the password is hashed in your frontend

    // Find the user by username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
        exit;
    }

    // Fetch the user data
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify the password (assuming hashed passwords)
    if ($password === $user['password']) {
        echo json_encode(['status' => 'success', 'message' => 'Login successful']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
<?php
require '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Find the user by username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
        exit;
    }

    // Fetch the user data
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify the password
    if (password_verify($password, $user['password'])) {
        echo json_encode(['status' => 'success', 'message' => 'Login successful']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
