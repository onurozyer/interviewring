<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$resume = $_POST['resume'];


$temp = base64_decode($resume);
$myarray = explode(",", $temp);
$resume = $myarray[1];
$resume = $temp;
$resume = $_POST['resume'];

$oldRole = '';
$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if($row['id'])
{
  $oldRole = $row['role'];
}
else
{
  mysql_query("INSERT INTO users(id) VALUES('".$inID."')");
}


mysql_query("UPDATE users set resume ='".$resume."' WHERE id='$inID'");
?>
