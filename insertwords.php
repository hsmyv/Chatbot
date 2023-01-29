<?php
$conn = mysqli_connect("localhost", "root", "", "chatbot")
or die("Couldn't connect to database");

// Check connection
if (!$conn) {
die("Connection failed: " . mysqli_connect_error());
}

if(isset($_POST['submit'])) {
$text = $_POST['text'];
$response = $_POST['response'];

// Prepare an insert statement
$sql = "INSERT INTO messages (text, response) VALUES (?, ?)";

if ($stmt = mysqli_prepare($conn, $sql)) {
// Bind variables to the prepared statement as parameters
mysqli_stmt_bind_param($stmt, "ss", $text, $response);

// Attempt to execute the prepared statement
if (mysqli_stmt_execute($stmt)) {
echo "Record inserted successfully.";
} else {
echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
}

// Close statement
mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($conn);
?>

<html>

<head>
    <title>Insert Record into MySQL Database</title>
</head>

<body>
    <form method="post">
        <input type="text" name="text" placeholder="Text">
        <input type="text" name="response" placeholder="response">
        <input type="submit" name="submit" value="Submit">
    </form>
</body>

</html>