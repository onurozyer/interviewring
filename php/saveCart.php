<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$ID = $_POST['id'];
$cart = json_encode(json_decode($_POST['cart']));

$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$ID'"));
if(!$row['id'])
{
  mysql_query("INSERT INTO users(id) VALUES('".$ID."')");
}


mysql_query("UPDATE users set cart ='".$cart."' WHERE id='$ID'");

?>
