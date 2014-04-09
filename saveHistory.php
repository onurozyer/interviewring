<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$history = json_encode(json_decode($_POST['history']));

$oldRole = '';
$oldHistory = '';
$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if($row['id'])
{
  $oldRole = $row['role'];
  $oldHistory = $row['history'];

  if($oldHistory && $oldHistory != '{}')
  {
    $reg_ex = '/\}/';
    $replace_word = ","; 
    $oldHistory = preg_replace($reg_ex, $replace_word, $oldHistory);

    if($oldHistory)
    {
      $reg_ex = '/\{/';
      $replace_word = ""; 
      $history = preg_replace($reg_ex, $replace_word, $history);
    }
  }

}
else
{
  mysql_query("INSERT INTO users(id) VALUES('".$inID."')");
}


$history = $oldHistory . $history;
mysql_query("UPDATE users set history ='".$history."' WHERE id='$inID'");

?>
