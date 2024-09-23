<?php
// delete_contact.php
require 'db.php'; // Database connection
// Ensure the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON input
    $jsonData = file_get_contents("php://input"); $data = json_decode($jsonData, 
    true); // Convert the JSON input to an associative array
    // Check if contact ID is provided
    if (isset($data['contactId'])) { $contact_id = $data['contactId'];
        // Prepare the SQL statement to delete the contact
        $stmt = $conn->prepare("DELETE FROM contacts WHERE contact_id = ?"); if ($stmt) {
            // Bind the ID parameter and execute the query
            $stmt->bind_param("i", $contact_id); if ($stmt->execute()) {
                // Return success response
                echo json_encode(['status' => 'success', 'message' => 'Contact 
                deleted successfully']);
            } else {
                // Handle query execution error
                echo json_encode(['status' => 'error', 'message' => 'Error deleting 
                contact']);
            }
            $stmt->close(); // Close the statement
        } else {
            // Handle preparation error
            echo json_encode(['status' => 'error', 'message' => 'Error preparing 
            SQL statement']);
        }
    } else {
        // Handle missing contact ID
        echo json_encode(['status' => 'error', 'message' => 'Missing contact ID']);
    }
} else {
    // Handle invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
$conn->close(); // Close the database connection
?>
