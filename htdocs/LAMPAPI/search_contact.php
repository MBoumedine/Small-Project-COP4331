<?php
ini_set('display_errors', 1);
// search_contact.php

// Include database configuration file for database connection
require 'db.php';

// Ensure the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the search query from the URL parameters, defaulting to an empty string
    $query = isset($_GET['q']) ? $_GET['q'] : '';
    // Get the user id from the URL parameters, defaulting to 0
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 0;

    // Prepare the SQL statement for searching contacts with LIKE for partial matches
    //$stmt = $conn->prepare("SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? OR phone_number LIKE ?");
    $stmt = $conn->prepare("SELECT * FROM contacts WHERE user_id = ? AND (name LIKE ? OR email LIKE ? OR phone_number LIKE ?)");

    // Check if the statement was prepared successfully
    if ($stmt) {
        // Create a LIKE query pattern with wildcards for matching
        $like_query = "%" . $query . "%";

        // Bind the search query to the prepared statement (3 parameters for fullName, email, number)
        $stmt->bind_param("isss", $user_id, $like_query, $like_query, $like_query);
        // Execute the prepared statement
        if ($stmt->execute()) {
            // Get the result of the executed statement
            $result = $stmt->get_result();
            // Initialize an array to hold the matching contacts
            $contacts = [];

            // Fetch all matching records from the result set
            while ($row = $result->fetch_assoc()) {
                $contacts[] = $row; // Add each contact to the array
            }

            // Check if any contacts were found
        if (count($contacts) > 0) {
            // Return the search results as a JSON object with status and contacts
            echo json_encode(['status' => 'success', 'contacts' => $contacts]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No contacts found']);
        }
        } else {
            // Handle error if the query execution fails
            echo json_encode(['status' => 'error', 'message' => 'Error executing search query']);
        }

        // Close the prepared statement to free resources
        $stmt->close();
    } else {
        // Handle error if statement preparation fails
        echo json_encode(['status' => 'error', 'message' => 'Error preparing SQL statement']);
    }
} else {
    // Handle case where request method is not GET
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

// Close the database connection
$conn->close();
?>