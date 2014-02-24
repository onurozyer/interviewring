<?php 
error_reporting(E_ALL ^ E_NOTICE); 
//$email = $_GET['ipn_email']; 
$address = $_GET['ipn_email'];

$header = ""; 
$emailtext = ""; 
 

date_default_timezone_set('America/Toronto');

require_once('./PHPMailer_v5.1/class.phpmailer.php');

$mail             = new PHPMailer();


$mail->IsSMTP(); // telling the class to use SMTP
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
$mail->Port       = 465;                   // set the SMTP port for the GMAIL server
$mail->Username   = "service@jackshandsjillsheart.com";  // GMAIL username
$mail->Password   = "c-horse";            // GMAIL password



$mail->SetFrom($address, '');

$mail->AddReplyTo($address, '');

$mail->Subject    = "Transaction";

$address = "service@jackshandsjillsheart.com";










// Read the post from PayPal and add 'cmd' 
$req = 'cmd=_notify-validate'; 
if(function_exists('get_magic_quotes_gpc')) 
  { $get_magic_quotes_exits = true;} 
foreach ($_POST as $key => $value) 
  // Handle escape characters, which depends on setting of magic quotes 
  { if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) 
    {$value = urlencode(stripslashes($value)); 
  } else { 
    $value = urlencode($value); 
  }  
  $req .= "&$key=$value";  
} 
// Post back to PayPal to validate 
$header .= "POST /cgi-bin/webscr HTTP/1.0\r\n"; 
$header .= "Content-Type: application/x-www-form-urlencoded\r\n"; 
$header .= "Content-Length: " . strlen($req) . "\r\n\r\n"; 
$fp = fsockopen ('www.paypal.com', 80, $errno, $errstr, 30); 
 
$myFile = "orders.txt";
$fh = fopen($myFile, 'a') or die("can't open file");
fwrite($fh, "\n\n");
fwrite($fh, date('D dS M, Y h:i a'));

// Process validation from PayPal 
if (!$fp)
{ // HTTP ERROR  
}
else
{ 
  // NO HTTP ERROR  
  fputs ($fp, $header . $req); 
  while (!feof($fp))
  { 
    $res = fgets ($fp, 1024); 
    if (strcmp ($res, "VERIFIED") == 0)
    { 
      // TODO: 
      // Check the payment_status is Completed 
      // Check that txn_id has not been previously processed 
      // Check that receiver_email is your Primary PayPal email 
      // Check that payment_amount/payment_currency are correct 
      // Process payment 
     
      // If 'VERIFIED', send an email of IPN variables and values to the 
      // specified email address

      $tbody = "VERIFIED IPN" . "\n\n";
      $ebody = "VERIFIED IPN" . "<br><br><hr>";
      ksort($_POST);
      foreach ($_POST as $key => $value)
      { 
        $tbody .= $key . " = " .$value ."\n"; 
        $ebody .= $key . " = " .$value ."<br>"; 
      } 
      $tbody .= "\n\n" . $req;
      $ebody .= "<br><br>" . $req;
      $mail->MsgHTML($ebody);
      $mail->AddAddress($address, "");

      //mail($email, "Live-VERIFIED IPN", $tbody . "\n\n" . $req); 
    }
    else if (strcmp ($res, "INVALID") == 0)
    { 
      // If 'INVALID', send an email. TODO: Log for manual investigation. 
      $tbody = "INVALID IPN" . "\n\n";
      $ebody = "INVALID IPN" . "<br><br><hr>";
      ksort($_POST);
      foreach ($_POST as $key => $value)
      { 
        $tbody .= $key . " = " .$value ."\n"; 
        $ebody .= $key . " = " .$value ."<br>"; 
      }
      $tbody .= "\n\n" . $req;
      $ebody .= "<br><br>" . $req;
      $mail->MsgHTML($ebody);
      $mail->AddAddress($address, "");
      //mail($email, "Live-INVALID IPN", $tbody . "\n\n" . $req); 
    }
    fwrite($fh, $tbody); 
  }
}
$mail->Send();
fclose($fh);
fclose($fp);

exit;
?> 
