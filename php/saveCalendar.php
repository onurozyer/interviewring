<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$calendar = json_encode(json_decode($_POST['calendar']));

$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if(!$row['id'])
{
  mysql_query("INSERT INTO users(id) VALUES('".$inID."')");
}


mysql_query("UPDATE users set calendar ='".$calendar."' WHERE id='$inID'");

?>
