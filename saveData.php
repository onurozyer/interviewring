<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$linkedINprofile = $_POST['linkedINprofile'];
$tzOffset = $_POST['tzOffset'];
$email = $_POST['email'];
$education = $_POST['education'];
$role = $_POST['role'];
$services = json_encode(json_decode($_POST['services']));
$calendar = json_encode(json_decode($_POST['calendar']));
$mail = json_encode(json_decode($_POST['mail']));
$cart = json_encode(json_decode($_POST['cart']));
#$mail = 'hello';
#$mail = $_POST['mail'];
#$mail = json_encode($_POST['mail']);
#$mail = json_decode($_POST['mail']);


#$mail = mysql_real_escape_string(stripslashes($mail));
$mail = mysql_real_escape_string($mail);
$linkedINprofile = mysql_real_escape_string($linkedINprofile);


$linkedINprofile = preg_replace('/^\"\"$/', '', $linkedINprofile);


$oldRole = '';
#$oldServices = '';
#$oldCalendar = '';
#$oldMail = '';
#
#
$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if($row['id'])
{
  $oldRole = $row['role'];
#  $oldServices = $row['services'];
#  $oldCalendar = $row['calendar'];
#  $oldMail = $row['mail'];
}
else
{
  mysql_query("INSERT INTO users(id) VALUES('".$inID."')");
}

#if($role != $oldRole) {$role = "both";}
#$services = $oldServices . $services;
#$calendar = $oldCalendar . $calendar;

mysql_query("UPDATE users set linkedINprofile ='".$linkedINprofile."' WHERE id='$inID'");
mysql_query("UPDATE users set tzOffset ='".$tzOffset."' WHERE id='$inID'");
mysql_query("UPDATE users set email ='".$email."' WHERE id='$inID'");
mysql_query("UPDATE users set education ='".$education."' WHERE id='$inID'");
mysql_query("UPDATE users set role ='".$role."' WHERE id='$inID'");
mysql_query("UPDATE users set services ='".$services."' WHERE id='$inID'");
mysql_query("UPDATE users set calendar ='".$calendar."' WHERE id='$inID'");
mysql_query("UPDATE users set mail ='".$mail."' WHERE id='$inID'");
mysql_query("UPDATE users set cart ='".$cart."' WHERE id='$inID'");

?>
