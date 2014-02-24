<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';



$inID = $_POST['id'];

mysql_query("DELETE FROM `interviewring_users`.`users` WHERE `users`.`id` = '$inID'");

?>
