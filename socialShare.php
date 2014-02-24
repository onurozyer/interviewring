<?php
    // get our URL query parameters
    $title = $_GET['title'];
    $id = $_GET['id'];
    $img = $_GET['img'];
    $imgBig = $_GET['imgBig'];
    $desc = $_GET['desc'];
    $pinit = $_GET['pinit'];
    $imgBig = rawurlencode($imgBig);

    $url = urlencode('http://www.jackshandsjillsheart.com');
    $media = urlencode('http://www.jackshandsjillsheart.com/jackshandsjillsheart/images/') . $imgBig;

    //if($pinit) $script = "<script type=\"text/javascript\" src=\"http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999)\"></script>";
    if($pinit) $script = "<script type=\"text/javascript\">window.location = \"http://pinterest.com/pin/create/button/?url=$url&media=$media&description=$desc\";</script>";
    //if($pinit) $script = "<a href=\"http://pinterest.com/pin/create/button/?url=$url&media=$media&description=$desc\" class=\"pin-it-button\" count-layout=\"horizontal\">Pin it</a><script type=\"text/javascript\" src=\"http://assets.pinterest.com/js/pinit.js\"></script>";
    else $script = "";

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title><?php echo $title;?></title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="title" content="<?php echo $title;?>" />
  <meta name="description" content="<?php echo $desc;?>" />
  <!-- the following line redirects to wherever we want the USER to land -->
  <!-- Facebook won't follow it. you may or may not actually want || need this. -->
  <!-- <meta http-equiv="refresh" content="1;URL=http://www.jackshandsjillsheart.com" /> -->
</head>
<body>
  <div style="text-align:center;">
    <p><?php echo $img;?></p>
    <p><?php echo $desc;?></p>
  </div>

  <?php echo $script;?>
<!-- <script type="text/javascript" src="http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999)"></script> -->


</body>
</html>
