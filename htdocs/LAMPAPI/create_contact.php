<?php
ini_set('display_errors', 1);
// create_contact.php
require 'db.php'; // Database connection

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON input
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true); // Convert the JSON input to an associative array
    
    // Check if required fields are present in the input data
    if (isset($data['user_id'], $data['name'], $data['phone_number'], $data['email'])) {
        // Extract the fields from the decoded JSON
        $name = $data['name'];
        $phone_number = $data['phone_number'];
        $email = $data['email'];
        $user_id = $data["user_id"];
        //echo json_encode(['status' => 'success', 'message' => $user_id]);

        // Prepare the SQL statement for inserting the contact
        $stmt = $conn->prepare("INSERT INTO contacts (user_id, name, phone_number, email) VALUES (?, ?, ?, ?)");
        if ($stmt) {
            // Bind the parameters and execute the query
            $stmt->bind_param("isss", $user_id, $name, $phone_number, $email); // User ID as integer, other fields as strings

            if ($stmt->execute()) {
                // Return success response
                echo json_encode(['status' => 'success', 'message' => 'Contact created successfully']);
            } else {
                // Handle query execution error
                echo json_encode(['status' => 'error', 'message' => 'Error creating contact']);
            }

            $stmt->close(); // Close the statement
        } else {
            // Handle preparation error
            echo json_encode(['status' => 'error', 'message' => 'Error preparing SQL statement']);
        }
    } else {
        // If required fields are missing in the input
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
} else {
    // Handle invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$conn->close(); // Close the database connection
?>
