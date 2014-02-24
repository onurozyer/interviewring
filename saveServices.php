<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$services = json_encode(json_decode($_POST['services']));

$oldRole = '';
$oldHistory = '';
$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if($row['id'])
{
  $oldRole = $row['role'];
  $oldHistory = $row['history'];

  $reg_ex = '/\}/';
  $replace_word = ","; 
  $oldHistory = preg_replace($reg_ex, $replace_word, $oldHistory);

  if($oldHistory)
  {
    $reg_ex = '/\{/';
    $replace_word = ""; 
    $services = preg_replace($reg_ex, $replace_word, $services);
  }

}
else
{
  mysql_query("INSERT INTO users(id) VALUES('".$inID."')");
}


$services = $oldHistory . $services;
mysql_query("UPDATE users set history ='".$services."' WHERE id='$inID'");

?>
