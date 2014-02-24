<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$mail = json_encode(json_decode($_POST['mail']));

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


mysql_query("UPDATE users set mail ='".$mail."' WHERE id='$inID'");
?>
