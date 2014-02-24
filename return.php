<?php

#$_POST = Array(
#'address_city' => 'escondido',
#'address_country' => 'United States',
#'address_country_code' => 'US',
#'address_name' => 'anne turner',
#'address_state' => 'CA',
#'first_name' => 'anne',
#'item_name1' => 'YW Manual 3 Lesson 42',
#'item_name2' => 'YW Manual 3 Lesson 44',
#'last_name' => 'turner',
#'mc_currency' => 'USD',
#'mc_fee' => '0.42',
#'mc_gross' => '4.00',
#'mc_gross_1' => '2.00',
#'mc_gross_2' => '2.00',
#'num_cart_items' => '2',
#'payer_email' => 'thurgood.jonathan@gmail.com',
#'payment_gross' => '4.00',
#'quantity1' => '1',
#'quantity2' => '1',
#'receiver_email' => 'cheri_baby@hotmail.com');



$first_name = $_POST['first_name'];
$payer_email = $_POST['payer_email'];
$mc_gross = $_POST['mc_gross'];

#echo 'FIRST' . $first_name;


$reg_ex = '/@/';
$replace_word = "."; 

#$payer_email = "thurgood.jonathan@gmail.com";
$payer_email = preg_replace($reg_ex, $replace_word, $payer_email);

$a = array();
foreach($_GET as $name => $value)
{
  //$value = '"'.$value.'"';
  //print "$name : $value<br>";
  if(preg_match("/zip/" ,$name)) {$zipFile = $value;}
  else {array_push($a, $value);}
}


if(count($a) <= 1)
{
  $zipFile = $a[0];
}


$reg_ex = '/\+/';
$replace_word = " "; 
$zipFile = preg_replace($reg_ex, $replace_word, $zipFile);


$items = array();
$quantity = array();
$price = array();
$total = 0;

ksort($_POST);
while (list($key,$value) = each($_POST))
{
  #printf("$key: $value\n");
  #echo "<br />";


  if(preg_match("/item_name/" ,$key))
  {
    #$key = preg_replace("/[0-9]$/","",$key);
    array_push($items, $value);
  }
  elseif(preg_match("/quantity/" ,$key))
  {
    #$key = preg_replace("/[0-9]$/","",$key);
    array_push($quantity, $value);
  }
  elseif(preg_match("/mc_gross_/" ,$key))
  {
    #$key = preg_replace("/[0-9]$/","",$key);
    array_push($price, $value);
  }
  elseif(preg_match("/amount_/" ,$key))
  {
    #$key = preg_replace("/[0-9]$/","",$key);
    array_push($price, $value);
    $total += $value;
  }
}





if($payer_email)
{
  echo '<input type="hidden" id="first_name" name="first" value=\''.$payer_email.'\'>';
  $zipFile = $payer_email.'.zip';


  if(count($a) <= 1)
  {
    $zipFile = $a[0];
    $reg_ex = '/\+/';
    $replace_word = " "; 

    $zipFile = preg_replace($reg_ex, $replace_word, $zipFile);
  }


  error_reporting(E_STRICT);

  date_default_timezone_set('America/Toronto');

  require_once('./PHPMailer_v5.1/class.phpmailer.php');
  //include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

  $mail             = new PHPMailer();

  //$body           = file_get_contents('contents.html');
  //$body           = eregi_replace("[\]",'',$body);
  #$body = $first_name . ',<br>Thank you for your purchase!  We hope you enjoy it ;)<br><br>For your convenience here is a link to your purchase, which will be valid for 24 hours.  Right click on the following link and click "Save link as..." to save your purchase to your hard drive.<br><a style="font:bold 15px tahoma,arial,sans-serif; color:#A9B447;" href="www.jackshandsjillsheart.com/downloads/'.$zipFile.'"><img src="www.jackshandsjillsheart.com/jackshandsjillsheart/images/shopping_icon_24.png"/>Your Purchase</a><br><br><code style="color: #FFAADC;"> &#9829; </code>www.jackshandsjillsheart.com';

  #$body = '<html><head><link rel="stylesheet" type="text/css" href="http://www.jackshandsjillsheart.com/jackshandsjillsheart/jackshandsjillsheart.css"/></head><body><div id="tabs" style="height: 95%; width: 100%; top: 0;  margin: 0px; padding: 0px; background: #4A3324; background-image: url(http://www.jackshandsjillsheart.com/jackshandsjillsheart/images/background3.jpg); background-size: 100%"><div id="cartContainer" class="shoppingtcart corners"><center><div class="checkout"><b><p>Thank you $first_name</b></div></center><div id="sub_cartArea" class="shoppingSubTotalcart-area corners" style="float: right;"><font color=black>Total: </font>0.00';

  $body = '<html><head><link rel="stylesheet" type="text/css" href="www.jackshandsjillsheart.com/jackshandsjillsheart/jackshandsjillsheart.css"/></head><body><br><span style="white-space: pre;"><b>Thank you ';
  $body = $body . $first_name . '!';
  $body = $body . '</b></span><br><p><div id="tabs" style="height: 95%; width: 100%; top: 0;  margin: 0px; padding: 0px; background: #9b8671;"><div id="cartContainer" class="shoppingtcart corners"><div id="sub_cartArea" class="shoppingSubTotalcart-area corners" style="position: absolute; top:4px; float: right; white-space: pre;"><font color=black>Total: </font><span style="color:#A9B447;">$';
  $body = $body . $mc_gross;
  $body = $body . '  </span></div><br><br><span style="float: left; margin: 0px; margin-left: 10px; white-space: pre; color: #4A3324;">ITEM</span><span style="float: right; margin: 0px; margin-right: 35px; white-space: pre; color: #4A3324;">QTY     PRICE  </span><br><hr></div><div id="cartArea" class="shoppingcart-area corners" style="color: #4A3324; text-align: left; margin-top: 0px; height: 300px;"><div style="float: left; margin-left: 0px; position: relative; top: 10px;">';

  for($i = 0; $i < count($items); $i++)
  {
    $body = $body . "<code style='float: left; margin: 0px; margin-left: 10px; white-space: pre; color: #FFAADC;'>&hearts; </code>$items[$i]<br>";
    $ID = 'item_name' . $i;
    echo '<input type="hidden" id=\''.$ID.'\' name=\''.$ID.'\' value=\''.$items[$i].'\'>';
  }
  $body = $body . '</div><div style="white-space: pre; float: right; margin-right: 35px; position: relative; top: -5px;">';

  for($i = 0; $i < count($items); $i++)
  {
    $body = $body . "$quantity[$i]          \$$price[$i]<br>";
  }

  $body = $body . '</div></div></div></div><br><div>Did you know you only need to purchase this file, or any other digital file on this site, once to use for handouts, etc. even when printing it out multiple times?  We just ask that you don\'t redistribute the file in its digital form without permission.  Thank you!<br><br>For your convenience here is a link to your purchase, which will be valid for 24 hours.  Right click on the following link and click "Save link as..." to save your purchase to your hard drive.<br><a style="font:bold 15px tahoma,arial,sans-serif; color:#A9B447;" href="http://www.jackshandsjillsheart.com/downloads/'.$zipFile.'"><img src="www.jackshandsjillsheart.com/jackshandsjillsheart/images/shopping_icon_24.png"/>Your Purchase</a><br><br><code style="color: #FFAADC;"> &hearts; </code>www.jackshandsjillsheart.com</div></body></html>';










  $mail->IsSMTP(); // telling the class to use SMTP
  //$mail->Host     = "mail.yourdomain.com"; // SMTP server
  $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                             // 1 = errors and messages
                                             // 2 = messages only
  $mail->SMTPAuth   = true;                  // enable SMTP authentication
  $mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
  $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
  $mail->Port       = 465;                   // set the SMTP port for the GMAIL server
  $mail->Username   = "service@jackshandsjillsheart.com";  // GMAIL username
  $mail->Password   = "c-horse";             // GMAIL password

  $address = "service@jackshandsjillsheart.com";
  $mail->SetFrom($address, '');

  $mail->AddReplyTo($address, '');

  $mail->Subject    = "Your Purchase from jackshandsjillsheart.com";

  $mail->MsgHTML($body);

  $mail->AddAddress($address, "");
  $address = $_POST['payer_email'];
  $mail->AddAddress($address, "");

  $mail->Send();
}
else
{
  echo '<input type="hidden" id="first_name" name="first" value="">';
  $i = 1;
  foreach($_GET as $name => $value) {
    //print "$name : $value<br>";
    if(preg_match("/zip/" ,$name)) {$zipFile = $value;}
    if(preg_match("/file/",$name))
    {
      $ID = 'item_name' . $i++;
      echo '<input type="hidden" id=\''.$ID.'\' name=\''.$ID.'\' value=\''.$value.'\'>';
    }
  }
}

if($mc_gross)
{
  echo '<input type="hidden" id="mc_gross" name="gross" value=\''.$mc_gross.'\'>';
}
else
{
  echo '<input type="hidden" id="mc_gross" name="gross" value="0">';
}






?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Jack's Hands, Jill's Heart</title>
    <meta name="description" content="Jack's Hands, Jill's Heart--Items artistically crafted from the heart!" /> 
    <meta name="keywords" content="lds, LDS, Nursery, Nursery Program, primary, lds primary, primary chorister, young womens, young mens, YW, YM, Relief Society, Seminary, LDS Clipart, Sharing Time Ideas, Activity Days, Ward Activities, Object Lessons, Stories, Thoughts, Poems, Lesson Helps, Music, Video Clips, Articles of Faith, Family Home Evening, FHE Ideas, Games, Youth Activity Ideas" /> 


    <script type="text/javascript" src="./jackshandsjillsheart/ext-base.js"></script>  
    <script type="text/javascript" src="./jackshandsjillsheart/ext-all.js"></script>
    <script type="text/javascript" src="./jackshandsjillsheart/productStore.js"></script> 

    <!-- Page specific layout css -->
    <link rel="stylesheet" type="text/css" href="./jackshandsjillsheart/jackshandsjillsheart.css" />		
    <link href='./jackshandsjillsheart/images/icon.ico' rel='icon' type='image/x-icon'/>
    <link rel="shortcut icon" href="./jackshandsjillsheart/images/icon.ico" type="image/x-icon" />



    <script type="text/javascript">
      
      function currencyFormatted(amount)
      {
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
      }



      function createCookie(name,value,days)
      {
        if (days)
        {
          var date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
        }
        else {var expires = "";}
        document.cookie = name+"="+value+expires+"; path=/";
      }


      function readCookie(name)
      {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++)
        {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
      }

      function eraseCookie(name) {createCookie(name,"",-1);}



      function autodownload()
      {
        var hash = (window.location.href.split("?")[1] || "");
        //alert(document.getElementById('first_name').value);
        if(document.getElementById('first_name').value) {hash += 'zip=' + document.getElementById('first_name').value + '.zip';}
        var total = 0;
        if(document.getElementById('mc_gross').value)
        {
          total = document.getElementById('mc_gross').value;
          document.getElementById('sub_cartArea').innerHTML = '<font color=black>Total: </font>$' + currencyFormatted(total) + ' ';
        }


        var re = new RegExp("item_name", "gi");
        //alert(products[0].prodID);
        var theInputs = document.getElementsByTagName('input');
        for(var y=0; y<theInputs.length; y++)
        {
          //alert(theInputs[y].name);
          if((theInputs[y].name).match(re))
          {
	    //alert(theInputs[y].value);
            productStore.data.each(function(item, index, totalItems)
            {
              var file = item.get('image');
              var img = file.split(/\//);
              file = img.pop();
              file = file.replace(/-wm/, "");
              if( item.get('description') == theInputs[y].value || file == theInputs[y].value)
              {
                //alert(item.get('prodID'));
                eraseCookie(item.get('prodID'));
              }
            }); 
	  }
        }
        //alert("HASH: " + hash);
        window.location = "http://www.jackshandsjillsheart.com/download.php?" + hash;
      }

    </script>
  
  </head>

  <body onload="javascript:autodownload(); return false;">

    <div id="tabs" style="height: 95%; width: 100%; top: 0;  margin: 0px; padding: 0px; background: transparent; background-size: 100%">
    <div id="cartContainer" class="shoppingtcart corners">
      <center><div class="checkout"><b>Thank you
      <?php if($first_name){print ", $first_name";}?></b><br><br><br></div></center>
      <div id="sub_cartArea" class="corners" style="margin: 10px; padding: 3px; border:1px solid #232416; background: #685642; color: #FFEF66; font:bold 11px tahoma,arial,sans-serif; float: right;"><font color=black>Total: </font>$0.00 </div>
      <div id="cartArea0" class="corners" style="margin-right: 10px; padding: 3px; border:1px solid #232416; background: #685642; color: #FFEF66; font:bold 11px tahoma,arial,sans-serif; float: right; width: 955px;">

        <span style="float: left; margin-left: 10px; color: #4A3324;">ITEM</span><span style="float: right; margin: 0px; margin-right: 35px; color: #4A3324;">QTY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PRICE</span>
      </div>
      <div id="cartArea" class="corners" style="margin-right: 10px; padding: 3px; border:1px solid #232416; background: #685642; color: #FFEF66; font:bold 11px tahoma,arial,sans-serif; float: right; height: 68%; width: 955px;">
        <div style="float: left; margin-left: 2px; position: relative; top: 0px;">
<?php

  for($i = 0; $i < count($items); $i++)
  {
    print "<code style='color: #FFAADC;'> &#9829; </code>$items[$i]<br>";
  }
?>
       </div>
       <div style="float: right; padding-top: -20px; margin: 0px; margin-right: 35px; position: relative; top: 0px;"> 
<?php

  for($i = 0; $i < count($items); $i++)
  {
    print "$quantity[$i]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\$$price[$i]<br>";
  }
?>
        </div>
      </div>
      <div class="checkout"><p style="margin: 0px; margin-left: 15px; white-space: pre;">Your <?php echo '<a style="color:#A9B447;" href="downloads/'.$zipFile.'">'; ?>purchase</a> should download automatically.<p style="margin: 0px; margin-left: 15px; white-space: pre;">If not, right click on the following link and click 'Save link as...' to download your <?php echo '<a style="color:#A9B447;" href="downloads/'.$zipFile.'">'; ?>purchase</a>.<p><p style="margin: 0px; margin-left: 15px; white-space: pre;"><?php echo '<a style="font:bold 15px tahoma,arial,sans-serif; color:#A9B447;" href="downloads/'.$zipFile.'">'; ?><img src="./jackshandsjillsheart/images/shopping_icon_24.png" border="0"/>Your Purchase</a></div>   
  </div>
  </div>
  </body>
</html>
    
