<?php
    $name = $_POST['name'];
    $visitor_mail = $_POST['email'];
    $message =$_POST['message'];

    $email_from = "Portfolio Contact Form";

    $email_subject = "New message";

    $email_body = "Username: $name\n".
                    "Email id: $visitor_mail\n".
                        "Message: $message\n";
    
    $to = "ssworkmail22@gmail.com";
    $headers = "From: $email_from \r\n";
    $headers .= "Reply-to: $visitor_mail \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: contact.html");


?>