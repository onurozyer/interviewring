<?php

define('INCLUDE_CHECK',true);
error_reporting(E_STRICT);
date_default_timezone_set('America/Toronto');
require './connect.php';

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$cc_list = json_decode($_POST['cc_list'], true);
$MsgHTML = $_POST['MsgHTML'];
$AltBody = $_POST['MsgTEXT'];
$inID = $_POST['id'];
$attachResume = $_POST['attachResume'];


if($attachResume)
{
  $row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));

  $resume = $row['resume'];
  $myarray = explode(",", $resume);
  $type = $myarray[0];
  $resume = $myarray[1];

  $temp = base64_decode($resume);
  $resume = $temp;

  $ext = '.txt';
  if     (strpos($type,'application/rtf'))                            {$ext = '.rtf';}
  elseif (strpos($type,'application/msword'))                         {$ext = '.doc';}
  elseif (strpos($type,'wordprocessing'))                             {$ext = '.docx';}
  elseif (strpos($type,'application/pdf'))                            {$ext = '.pdf';}
  elseif (strpos($type,'application/vnd.oasis.opendocument.text'))    {$ext = '.odt';}
  elseif (strpos($type,'application/vnd.sun.xml.writer'))             {$ext = '.sxw';}
  elseif (strpos($type,'application/vnd.ms-works'))                   {$ext = '.wps';}
  elseif (strpos($type,'application/vnd.wordperfect'))                {$ext = '.wpd';}
  elseif (strpos($type,'text/html'))                                  {$ext = '.html';}
  elseif (strpos($type,'text/plain'))                                 {$ext = '.txt';}

  $filename = 'resume' . $ext;

  $fp = fopen($filename, 'w');
  fwrite($fp, $resume);
  fclose($fp);
}



error_reporting(E_STRICT);
date_default_timezone_set('America/Toronto');
require_once('./PHPMailer_v5.1/class.phpmailer.php');
//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$mail             = new PHPMailer();
$mail->IsSMTP(); // telling the class to use SMTP
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
$mail->Port       = 465;                   // set the SMTP port for the GMAIL server
$mail->Username   = "info@interviewring.com";  // GMAIL username
$mail->Password   = "ttjozo123";             // GMAIL password

$address = "info@interviewring.com";
$mail->SetFrom($address, 'Interviewring Appt.');

$mail->AddReplyTo($address, 'Interviewring Appt.');

$mail->Subject = $subject;

$mail->MsgHTML($MsgHTML);
$mail->AltBody = $MsgTEXT;

$mail->AddAddress($address, "Interviewring Appt.");
$address = $email;
$mail->AddAddress($address, $name);

foreach ($cc_list as $key => $value) 
{
  $mail->AddAddress($value, "");
}

if($attachResume)
{
  $mail->addAttachment($filename);
}

$mail->Send();





?>
