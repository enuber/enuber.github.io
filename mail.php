<!--
<?php
    $name = $_POST['name'];
    $email = $_POST['mail'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $verify = $_POST['mathProblem'];
    $from = 'From: My Contact Page'; 
    $to = 'erik.nuber@yahoo.com'; 
    $subject = 'New Contact Information';

    $body = "From: $name\n E-Mail: $email\n Phone: $phone\n Message:\n $message";

    if ($_POST['submit']) {
        if (mail ($to, $subject, $body, $from) && $verify == '3') { 
            echo '<p>Your message has been sent!</p>';
        } else { 
            echo '<p>Something went wrong, go back and try again!</p>'; 
        }
    } else if ($_POST['submit'] && $human != '3') {
        echo '<p>You answered the anti-spam question incorrectly!</p>';
    }
?>
-->

<?php
    $name = $_POST['user_name'];
//    $email = $_POST['user_email'];
    $email = $_POST['_replyto'];
    $phone = $_POST['user_phone'];
    $message = $_POST['user_message'];
    $verify = $_POST['user_math'];
    $from = 'From: My Contact Page'; 
    $to = 'erik.nuber@yahoo.com'; 
    $subject = 'New Contact Information';

    $body = "From: $name\n E-Mail: $email\n Phone: $phone\n Message:\n $message";

    if ($_POST['submit']) {
    if ($name != '' && $email != '') {
        if ($verify == '3') {				 
            if (mail ($to, $subject, $body, $from)) { 
	        echo '<p>Your message has been sent!</p>';
	    } else { 
	        echo '<p>Something went wrong, go back and try again!</p>'; 
	    } 
	} else if ($_POST['submit'] && $verify != '3') {
	    echo '<p>You answered the anti-spam question incorrectly!</p>';
	}
    } else {
        echo '<p>You need to fill in all required fields!!</p>';
    }
}
?>