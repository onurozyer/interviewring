<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

//require_once('./PHPMailer_v5.1/class.phpmailer.php');
//$mail             = new PHPMailer();

require './connect.php';



$result = mysql_query("SELECT * FROM users");
$str = '[';

#echo '{';
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
{
 #echo json_encode($row); echo ',';
 $str = $str . json_encode($row) . ',';
}

$str = substr_replace($str ,"",-1);
$str = $str . ']';
echo json_encode($str);
#echo '}';



?>
