<?php



$first_name = $_POST['first_name'];
$payer_email = $_POST['payer_email'];
$provider_emails = json_decode($_POST['provider_emails'], true);
$mc_gross = $_POST['mc_gross'];
$innerHTML = $_POST['innerHTML'];



#$payer_email = 'thurgood.jonathan@gmail.com';
#$innerHTML = '<div class="frame1"><div class="box2"><div id="cartItemsReturn0" title="jiBxVszS2Z:Wednesday January 15, 2014" style="padding-top: 4px; padding-left: 4px; width:197px; height:125px; text-align: left; color: #CCDF7D;">APPT: Onur Ozbek<br>12pm -- Career Coaching<br>1pm -- Career Coaching<br>2pm -- Career Coaching<br></div></div><span class="servicePrice">Wednesday January 15, 2014</span><div class="sidebar" style="position: relative; top: -120px; right: 24px;"><ul class="contact"><li style="padding: 0 0 0 0"><span class="contactEmail"></span></li><li style="padding: 0 0 0 0"><span class="contactIM"></span></li><li style="padding: 0 0 0 0"><span class="contactPhone"></span></li></ul></div></div></li><li><div class="frame1"><div class="box2"><div id="cartItemsReturn1" title="jiBxVszS2Z:Saturday January 18, 2014" style="padding-top: 4px; padding-left: 4px; width:197px; height:125px; text-align: left;">APPT: Onur Ozbek<br>4pm -- Career Coaching<br>5pm -- Career Coaching<br>6pm -- Career Coaching<br></div></div><span class="servicePrice">Saturday January 18, 2014</span><div class="sidebar" style="position: relative; top: -120px; right: 24px;"><ul class="contact"><li style="padding: 0 0 0 0"><span class="contactEmail"></span></li><li style="padding: 0 0 0 0"><span class="contactIM"></span></li><li style="padding: 0 0 0 0"><span class="contactPhone"></span></li></ul></div></div>';

#echo 'FIRST' . $first_name;


error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require_once('./PHPMailer_v5.1/class.phpmailer.php');
//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$mail             = new PHPMailer();


$body = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Helvetica Neue&quot;, &quot;Lucida Grande&quot;, &quot;Segoe UI&quot;, Arial, Helvetica, Verdana, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/splash2.png"/></div><div><h1>Thank you for choosing interviewring to handle your career services.</h1><h2>You and your service provider(s) have been sent this email with info regarding how to connect with one another</h2><h2>The interviewring team wishes you much success in your career and hopes to serve you again</h2></div><br><br><br><div><h1>TOTAL: $' . $mc_gross . '</h1></div>';
$body = $body . $innerHTML;
$body = $body . '</body></html>';



#$body = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Helvetica Neue&quot;, &quot;Lucida Grande&quot;, &quot;Segoe UI&quot;, Arial, Helvetica, Verdana, sans-serif;height: 0px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo4.png"/></div><div><h1>Thank you for choosing interviewring to handle your career services.</h1><h2>You and your service provider(s) have been sent this email with info regarding how to connect with one another</h2><h2>The interviewring team wishes you much success in your career and hopes to serve you again</h2></div><div class="frame1" style="border: 1px solid #CCCCCC; height: 130px;width: 203px;margin: 10px 10px 10px 10px;padding: 8px 8px 8px 8px;text-align: left;"><div class="box2" style="background-color: #333333;display: inline-block;-moz-box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);-webkit-box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3, MakeShdow=true, ShadowOpacity=0.80);-ms-filter: &quot;progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)&quot;;zoom: 1;margin-top: -14px;"><div id="cartItemsReturn0" title="jiBxVszS2Z:Wednesday January 15, 2014" style="padding-top: 4px;padding-left: 4px;width: 197px;height: 125px;text-align: left;color: #CCDF7D;display: block;position: relative;">APPT: Onur Ozbek<br>12pm -- Career Coaching<br>1pm -- Career Coaching<br>2pm -- Career Coaching<br></div></div><div style="text-align: center;"><span class="servicePrice" style="color: #F1FFAF;padding-left: 6px;padding-right: 6px;text-align: center;border-radius: 20px;background: #AECC2C;border: solid 0px #4A5612;">Wednesday January 15, 2014</span></div><div><a title="thurgood.jonathan@gmail.com" href="mailto:thurgood.jonathan@gmail.com?subject=interviewring.com career service appointment"><img src="http://www.interviewring.com/images/contactIconEmail.png" alt="IconEmail"/>thurgood.jonathan@gmail.com</a></div><div><a title="206.446.4800" href="sms:2064464800"><img src="http://www.interviewring.com/images/contactIconIM.png" alt="IconIM"/>206.446.4800</a></div><div><a title="206.446.4800" href="tel:206.446.4800"><img src="http://www.interviewring.com/images/contactIconPhone.png" alt="IconPhone"/>206.446.4800</a></div></div><div class="frame1" style="border: 1px solid #CCCCCC; height: 130px;width: 203px;margin: 10px 10px 10px 10px; padding: 8px 8px 8px 8px;text-align: left;"><div class="box2" style="background-color: #333333;display: inline-block;-moz-box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);-webkit-box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3, MakeShdow=true, ShadowOpacity=0.80);-ms-filter: &quot;progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)&quot;;zoom: 1;margin-top: -14px;"><div id="cartItemsReturn1" title="jiBxVszS2Z:Saturday January 18, 2014" style="padding-top: 4px;padding-left: 4px;width: 197px;height: 125px;text-align: left;color: #CCDF7D;display: block;position: relative;">APPT: Onur Ozbek<br>4pm -- Career Coaching<br>5pm -- Career Coaching<br>6pm -- Career Coaching<br></div></div><div style="text-align: center;"><span class="servicePrice" style="color: #F1FFAF;padding-left: 6px;padding-right: 6px;text-align: center;border-radius: 20px;background: #AECC2C;border: solid 0px #4A5612;">Saturday January 18, 2014</span></div><div><a title="thurgood.jonathan@gmail.com" href="mailto:thurgood.jonathan@gmail.com?subject=interviewring.com career service appointment"><img src="http://www.interviewring.com/images/contactIconEmail.png" alt="IconEmail"/>thurgood.jonathan@gmail.com</a></div><div><a title="206.446.4800" href="sms:2064464800"><img src="http://www.interviewring.com/images/contactIconIM.png" alt="IconIM"/>206.446.4800</a></div><div><a title="206.446.4800" href="tel:206.446.4800"><img src="http://www.interviewring.com/images/contactIconPhone.png" alt="IconPhone"/>206.446.4800</a></div></div></body></html>';





$mail->IsSMTP(); // telling the class to use SMTP
//$mail->Host     = "mail.yourdomain.com"; // SMTP server
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

$mail->Subject    = "Your Purchase from interviewring.com";

$mail->MsgHTML($body);

$mail->AddAddress($address, "Interviewring Appt.");
$address = $payer_email;
$mail->AddAddress($address, $first_name);

foreach ($provider_emails as $key => $value) 
{
  $mail->AddAddress($value, "");
}



$mail->Send();





?>
