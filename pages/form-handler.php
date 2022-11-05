<?php

    
    if (isset($_Post['btn-send'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        $to = 'ssworkmail22@gmail.com';
        $subject = 'New Form Submission';
        
        if(mail($to,$subject,$message,$email))
        {
            echo 'success';
        }
        else{
            echo "Failed";
        }
    }

?>