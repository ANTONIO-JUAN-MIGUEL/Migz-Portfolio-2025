<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "fizzwick8341@gmail.com"; // Replace with your actual email
    $subject = "Portfolio Contact Form Message";

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $headers = "From: $email\r\nReply-To: $email\r\n";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p style='color: green;'>Message sent successfully. Thank you!</p>";
    } else {
        echo "<p style='color: red;'>Failed to send the message. Please try again.</p>";
    }
} else {
    header("Location: contact.php");
}
?>