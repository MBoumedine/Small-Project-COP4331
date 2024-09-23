<?php
// update_contact.php
require 'db.php'; // Database connection

// Ensure the request method is POST        
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON input
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true); // Convert the JSON input to an associative array

    // Check if required fields are present
    if (isset($data['contact_id'], $data['name'], $data['email'], $data['phone_number'])) {
        // Extract the fields from the decoded JSON
        $name = $data['name'];
        $phone_number = $data['phone_number'];
        $contact_id = $data['contact_id'];
        $email = $data['email'];

        // Prepare the SQL statement for updating the contact
        $stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ?, phone_number = ? WHERE contact_id = ?");
        if ($stmt) {
            // Bind the parameters and execute the query
            $stmt->bind_param("sssi", $name, $email, $phone_number, $contact_id);

            if ($stmt->execute()) {
                // Return success response
                echo json_encode(['status' => 'success', 'message' => 'Contact updated successfully']);
            } else {
                // Handle query execution error
                echo json_encode(['status' => 'error', 'message' => 'Error updating contact']);
            }

            $stmt->close(); // Close the statement
        } else {
            // Handle preparation error
            echo json_encode(['status' => 'error', 'message' => 'Error preparing SQL statement']);
        }
    } else {
        // Handle missing required fields
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    }
} else {
    // Handle invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$conn->close(); // Close the database connection
?>