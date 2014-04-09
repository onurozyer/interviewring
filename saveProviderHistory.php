<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$providerHistory = json_encode(json_decode($_POST['providerHistory']));

$oldRole = '';
$oldHistory = '';
$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if($row['id'])
{
  $oldRole = $row['role'];
  $oldHistory = $row['providerHistory'];

  if($oldHistory && $oldHistory != '{}')
  {
    $reg_ex = '/\}/';
    $replace_word = ","; 
    $oldHistory = preg_replace($reg_ex, $replace_word, $oldHistory);

    if($oldHistory)
    {
      $reg_ex = '/\{/';
      $replace_word = ""; 
      $providerHistory = preg_replace($reg_ex, $replace_word, $providerHistory);
    }
  }

}
else
{
  mysql_query("INSERT INTO users(id) VALUES('".$inID."')");
}


$providerHistory = $oldHistory . $providerHistory;
mysql_query("UPDATE users set providerHistory ='".$providerHistory."' WHERE id='$inID'");

?>
