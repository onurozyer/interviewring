<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];
$row = mysql_fetch_assoc(mysql_query("SELECT * FROM users WHERE id='$inID'"));
if($row['id'])
{
  echo 'false';
}
else
{
  echo 'true';
}


?>
