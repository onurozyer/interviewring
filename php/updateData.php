<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$linkedINprofile = $_POST['linkedINprofile'];
$email = $_POST['email'];
$education = $_POST['education'];

$linkedINprofile = mysql_real_escape_string($linkedINprofile);
$linkedINprofile = preg_replace('/^\"\"$/', '', $linkedINprofile);


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


mysql_query("UPDATE users set linkedINprofile ='".$linkedINprofile."' WHERE id='$inID'");
mysql_query("UPDATE users set email ='".$email."' WHERE id='$inID'");
mysql_query("UPDATE users set education ='".$education."' WHERE id='$inID'");

?>
