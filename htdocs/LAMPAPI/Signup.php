<?php
	$inData = getRequestInfo();
	
	// Extract username and password from the request
	$username = $inData["username"];
	$password = $inData["password"];

	// Database connection
	$conn = new mysqli("localhost", "root", "qLlKGa=!AB4q", "contact_db");
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else
	{
		// Prepare the SQL statement to insert user signup information (username and password)
		$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
		$stmt->bind_param("ss", $username, $password);  // Bind parameters: both are strings
		
		// Execute the query
		if ($stmt->execute())
		{
			returnWithError(""); // Return success (no error)
		}
		else
		{
			returnWithError("Error inserting user information");
		}

		$stmt->close();
		$conn->close();
	}

	// Function to get the request input
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	// Function to return a JSON response
	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	// Function to return error messages
	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
?>
