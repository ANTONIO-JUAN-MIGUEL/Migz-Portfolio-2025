<?php
// Turn off error reporting to prevent header issues
error_reporting(0);

// Check if this is a POST request
if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit();
}

// Validate that all required fields are present
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
    header("Location: contact.html?status=error");
    exit();
}

// Sanitize input data
$name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: contact.html?status=error");
    exit();
}

// Check for empty fields
if (empty($name) || empty($email) || empty($message)) {
    header("Location: contact.html?status=error");
    exit();
}

// Email configuration
$to = "fizzwick8341@gmail.com";
$subject = "Portfolio Contact Form Message from " . $name;

// Create email headers
$headers = "From: noreply@yourportfolio.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Create email body
$body = "You have received a new message from your portfolio contact form:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Message:\n$message\n\n";
$body .= "---\n";
$body .= "Sent from: " . $_SERVER['HTTP_HOST'] . "\n";
$body .= "Time: " . date('Y-m-d H:i:s');

// Attempt to send email
try {
    if (mail($to, $subject, $body, $headers)) {
        header("Location: contact.html?status=success");
        exit();
    } else {
        header("Location: contact.html?status=error");
        exit();
    }
} catch (Exception $e) {
    header("Location: contact.html?status=error");
    exit();
}
?>