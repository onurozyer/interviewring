<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './connect.php';
// Those two files can be included only if INCLUDE_CHECK is defined

session_name('interviewring');
// Starting the session

session_set_cookie_params(8*7*24*60*60);
// Making the cookie live for 8 weeks

session_start();
?>



<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interview Ring</title>
  <link href='./images/icon.png' rel='icon' type='image/x-icon'/> 
  <link rel="shortcut icon" href="./images/icon.png" type="image/x-icon" /> 

  <script type="text/javascript" src="http://platform.linkedin.com/in.js?async=true">
  </script>
  
  <script type="text/javascript">
    IN.init({
      api_key: 'i0q6gbockyju',
      authorize: true,
      scope: 'r_emailaddress,r_contactinfo,r_fullprofile',
      onLoad: "window.onLinkedInLoad"
    });
  </script>


  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-46969406-1', 'interviewring.com');
    ga('send', 'pageview');
    ga('require', 'ecommerce', 'ecommerce.js');
  </script>


  <!-- Sencha's EXTJS --> 
  <!--<script type="text/javascript" src="js/ext-4.2.1.883/ext-all-debug-w-comments.js"></script>--> 
  <script type="text/javascript" src="js/ext-4.2.1.883/ext-all.js"></script> 
  <link rel="stylesheet" type="text/css" href="js/ext-4.2.1.883/resources/css/ext-all.css" />


  <script type="text/javascript" src="js/jquery-1.4.2.min.js" ></script>
  <script type="text/javascript" src="js/jquery.tablesorter.js"></script>


  <link rel="stylesheet" type="text/css" href="css/coverflow.css">
  <script type="text/javascript" src="js/coverflowExtjs.js"></script>


  <!-- Page specific --> 
  <script type="text/javascript" src="js/interviewers.js"></script> 
  <script type="text/javascript" src="js/utils.js"></script>
  <link rel="stylesheet" type="text/css" href="css/tablesorter.css">
  <link rel="stylesheet" href="css/style.css" type="text/css">



  <script>

    var step = 1;
    var firstCalShow = true;



    function showHome(give)
    {
      document.getElementById("home").style.display = "";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(!give)
      {
      document.getElementById("step").src="./images/step1.png";

      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSearch();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showProfile();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showProfile();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showProfile();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
      }
      else
      {
      document.getElementById("step").src="./images/step1_helper.png";
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSelectServices();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showSelectAvailability();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
      }


    }

    function showSearch(arg, n)
    {
      if(!user[0] && 0)
      {
        Ext.MessageBox.show({
          title:    'Login Required',
          msg:      'You must first login to access this page',
          buttons:  Ext.MessageBox.OK,
          icon:     Ext.Msg.WARNING
        });

        return;
      }
      if(n) {step = n;}
 


      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "";
      document.getElementById("slider").style.display = "";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      document.getElementById("step").src="./images/step2.png";

      doSearch(arg || "");
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome();};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showProfile();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showProfile();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showProfile();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
    }

    function showProfile(n)
    {
      if(!user[0] && 0)
      {
        Ext.MessageBox.show({
          title:    'Login Required',
          msg:      'You must first login to access this page',
          buttons:  Ext.MessageBox.OK,
          icon:     Ext.Msg.WARNING
      });

        return;
      }
      if(n) {step = n;}

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      document.getElementById("step").src="./images/step3.png";

      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome();};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showProfile();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSearch();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showProfile();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
      loadHistory();
    }


    function showCheckOut()
    {
      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      document.getElementById("scrollbar").style.zIndex = 55;
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}
      loadCartItems("cartItems", false);
    }


    function showReturn()
    {

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}
      loadCartItems("cartItemsReturn", true);
      eraseAllCookies();
      waitLoading4();
      

    }


    function showShare(elID)
    {

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      waitLoading5();

    }


    function showRateMe()
    {

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "";
      document.getElementById("resultsForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      waitLoading6();

    }


    function showResultsForm()
    {

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("resultsForm").style.display = "";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      waitLoading7();

    }







    function showSelectServices(n)
    {
      if(!user[0] && 0)
      {
        Ext.MessageBox.show({
          title:    'Login Required',
          msg:      'You must first login to access this page',
          buttons:  Ext.MessageBox.OK,
          icon:     Ext.Msg.WARNING
      });

        return;
      }
      if(n) {step = n;}
      //console.log(step);

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("selectServices").style.display = "";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      document.getElementById("step").src="./images/step2_helper.png";

      showServices();
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome(true);};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showSelectAvailability();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};

      setGroup("infoConfidential", settings[user[0].inID]['identity']);

    }

    function showSelectAvailability(n)
    {
      if(n) {step = n;}

      document.getElementById("home").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "";
      document.getElementById("completeGiveHelp").style.display = "none";

      document.getElementById("step").src="./images/step3_helper.png";

      loadSchedule();
      dayNumber = today.getDay();
      dayIndex = today.getDate();
      monthIndex = today.getMonth()+1;
      year = today.getFullYear();

      populateAvailableTimes();
      disableAvailableTimesFromSchedule();

/*
      if(document.getElementById("showCal"))
      {
        if(document.getElementById("showCal").style.display == 'none' && firstCalShow)
        {
          showCalendar(document.getElementById("headerClearfix"));
        }
      }
      else {showCalendar(document.getElementById("headerClearfix"));}
      document.getElementById("showCal").style.display = 'none';
*/

      //var calEl = Ext.getCmp('myCalendar');
      //if(calEl) {calEl.update(calEl.activeDate, true);}
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome(true);};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSelectServices();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
      firstCalShow = false;
    }

    function showCompleteGiveHelp()
    {
      //showCalendar(document.getElementById("headerClearfix"));
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "";
      document.getElementById("step").src="./images/step3_helper.png";
      //console.log(JSON.stringify(mail));
      //console.log(user[0].inID);//FE77HfB5Pw
      $.ajax({url:"./saveData.php", 
              data: {id: user[0].inID, email: user[0].email, role: 'give', services: JSON.stringify(services), calendar: JSON.stringify(schedule), mail: JSON.stringify(mail) },
              type:'post',
              async:false
      });

      if(!productStore.getById(user[0].inID))
      {
        var myNewRecord = [
        {
          inID: user[0].inID,
          role: 'give',
          services: JSON.stringify(services),
          calendar: JSON.stringify(schedule)
        }];
        productStore.loadData(myNewRecord, true);
      }
      productStore.getById(user[0].inID).data.services = JSON.stringify(services);
      productStore.getById(user[0].inID).data.role = 'give';
      productStore.getById(user[0].inID).data.first = user[0].first;
      productStore.getById(user[0].inID).data.last = user[0].last;
      productStore.getById(user[0].inID).data.company = user[0].company;
      productStore.getById(user[0].inID).data.position = user[0].position;
      productStore.getById(user[0].inID).data.image = user[0].image;
      productStore.getById(user[0].inID).data.url = user[0].url;
    }







  </script>


</head>


<body onresize="windowResize();">


  <div id="header">
    <div id="headerClearfix" class="clearfix">
      <div class="logo">
        <a><img src="images/logo4.png" alt="LOGO" height="110"></a>
      </div>
      <div class="login" id="login" style="display: none;">
        <a style="color:#d3e17f;" onmouseover='this.style.cursor="pointer"; this.style.color="#F1FFAF";' onmouseout='this.style.color="#d3e17f";' onclick="IN.User.authorize(); return true;">login/create account</a>
      </div>
      <div id="headercontent" style="display: none;">
      <img id="step" style="z-index: 34; height: 100px; position: relative; top: 20px; float: left; left: 10px;" src="./images/step1.png" alt="step" />
      <img id="step1" src="images/0.gif" alt="step1" style="position: absolute; top: 35px; margin-left: 20px; width: 80px; height: 70px; z-index: 35; border: solid 0px #ff0000;" onmouseover="this.style.cursor='pointer'; showHome();" onclick='showHome(); this.onmouseover="";'/>
      <img id="step2" src="images/0.gif" alt="step2" style="position: absolute; top: 35px; margin-left: 125px; width: 80px; height: 70px; z-index: 35; border: solid 0px #ff0000;" onmouseover="this.style.cursor='pointer'; showSearch();" onmouseout="showHome();" onclick='this.onmouseout=""; this.onmouseover="";'/>
      <img id="step3" src="images/0.gif" alt="step3" style="position: absolute; top: 35px; margin-left: 230px; width: 80px; height: 70px; z-index: 35; border: solid 0px #ff0000;" onmouseover="this.style.cursor='pointer'; showProfile();" onmouseout="showHome();" onclick='this.onmouseout=""; this.onmouseover="";'/>
      <div id="mailContainer" style=" position: relative; top: 58px; float: right; right: 100px; z-index: 60;" onmouseover="this.style.cursor='pointer'; document.getElementById('mail').style.display=''; document.getElementById('mailNewFlag').style.display ='none'; ellipsizeMailBoxes('mail');" onmouseout="document.getElementById('mail').style.display='none';">
        <img style="z-index: 34; height: 25px;" src="./images/mail.png" alt="mail"/>
        <div id="mailCount" style="position: relative; top: -27px; right: -5px; color: #F1FFAF; width: 20px; text-align: center; border-radius: 20px; background: #4A5612; border: solid 1px #3B440E; opacity: 0.9; filter: alpha(opacity=90);" onmouseover="this.style.cursor='pointer'; document.getElementById('mail').style.display=''; document.getElementById('mailNewFlag').style.display ='none';" onmouseout="document.getElementById('mail').style.display='none';">0</div>
        <div id="mailNewFlag" style="display: none; position: relative; top: -50px; right: -20px;" onmouseover="this.style.cursor='pointer'; document.getElementById('mail').style.display=''; document.getElementById('mailNewFlag').style.display ='none';" onmouseout="document.getElementById('mail').style.display='hidden';"><img src="images/warning.gif"/></div>
        <div id="mailLoading" style="display: none; position: absolute; top: 25px; left: -150px; z-index: 61;"><img src="./images/progressBar.png"/><img id="progressBall" src="./images/ball.png" style="position: absolute; top: 1px; margin-left: 1px;"/></div>
        <div id="mail" style="display: none; z-index: 60; position:absolute; top:27px; right: 0px; background: #73841D; border: solid 4px #96AF26; width: 316px; color: #CDDF7E; margin: 0px; max-height: 410px; overflow: auto;">
          <!--
          <div style="height: 60px; padding: 10px; border-bottom: solid 2px #CDDF7E; margin: 0px;">
            <img style="float:left;" src="http://s.c.lnkd.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_60x60_v1.png"/>
            <div style="margin-left: 10px; margin-bottom: 10px; float: left; width: 200px; height: 60px;" onclick="unEllipsizeMailBox(this);">Welcome to Interview Ring.  If you have not yet done so, take a moment and browse the vast resouces and services offered.  Thank you!</div>
          </div>
          <div style="height: 60px; padding: 10px; border-bottom: solid 2px #CDDF7E; margin: 0px;">
            <img style="float:left;" src="http://s.c.lnkd.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_60x60_v1.png"/>
            <div style="margin-left: 10px; margin-bottom: 10px; float: left; width: 200px; height: 60px;" onclick="unEllipsizeMailBox(this);">Your interview from Dr. Ross is now available for you.  Click <span style="color:#F1FFAF;" onmouseover='this.style.color="#9BA85F";' onmouseout='this.style.color="#F1FFAF";'onclick="showProfile(3);">here</span> to view it.  Thanks<br>-Interview Ring Team</div>
          </div>
          -->
        </div><!--<div id="mail">-->
      </div><!--<div id="mailContainer">-->
      <div style="z-index: 55; position: relative; top: 58px; float:right; right:20px;" onmouseover="this.style.cursor='pointer';" onclick="showCalendar(this.parentNode);">
        <img style="position: relative; height: 25px; border: solid 0px #000000;" src="./images/calendar.png" alt="calendar"/>
      </div>
      <div class="cart" onclick="showCheckOut();">
        <img id="cart" src="images/cart.png" alt="CART">
        <img id="cartItem" src="images/calendar.gif" class="cartItem" style="display: none;" alt="CART ITEM">
      </div>
      </div>
    </div><!--clearfix-->
  </div>




  <div id="header2">
    <div id="header2content" class="clearfix" style="display: none;">
      <ul class="navigation" style="position:relative; top: 0px; z-index: 40;">
	<li>
	  <a style="color:#d3e17f;" onmouseover='this.style.cursor="pointer"; this.style.color="#F1FFAF";' onmouseout='this.style.color="#d3e17f";' onclick='showSearch("Interviewing", 2);'>Interviewing</a>
	</li>
	<li>
	  <a style="color:#d3e17f;" onmouseover='this.style.cursor="pointer"; this.style.color="#F1FFAF";' onmouseout='this.style.color="#d3e17f";' onclick='showSearch("Resume", 2);'>Resume Critiquing</a>
        </li>
	<li>
	  <a style="color:#d3e17f;" onmouseover='this.style.cursor="pointer"; this.style.color="#F1FFAF";' onmouseout='this.style.color="#d3e17f";' onclick='showSearch("Tips", 2);'>Interview Tips</a>
	</li>
	<li>
	  <a style="color:#d3e17f;" onmouseover='this.style.cursor="pointer"; this.style.color="#F1FFAF";' onmouseout='this.style.color="#d3e17f";' onclick='showSearch("Coaching", 2);'>Career Coaching</a>
	</li>
      </ul>

      <div id="searchContainer" style="z-index: 30; position: relative; top: -150px; float: right; right: 145px; background: #96AF26; border-radius: 15px; height: 25px; width: 150px; padding: 5px; border: solid 4px #75891C;">
      <input id="sortInput" style="border-radius: 15px; width: 145px;" type=search results=20 autosave=50 name=s onclick="this.value = '';" onkeyup="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('sortInput').value,2)}, 500);" oninput="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('sortInput').value,2)}, 500);"/>
      </div>

    </div><!--clearfix-->
  </div><!--header-->
	




















  <div id="home" class="contents" style="margin-bottom: 0px; border: 0px solid #ff0000;">
    <div id="mainbox">
      <div class="clearfix">
        <img src="images/mainbox4.png" alt="main" width="958" style="position: absolute; top: 0px; z-index: 51;"/>
        <img src="images/mainbox3.png" alt="main" width="958" style="position: absolute; top: 0px; z-index: 51;"/>

	<div class="detail" style="border: 0px solid #ff0000;">
          <div style="position: absolute; top: 0px; float: left; left: 50px; width: 400px; height: 200px; z-index: 51;">
            <img src="./images/find_help.png" alt="find help"/>
            <div style="position: absolute; top: 45px; left: -60px; float:left; width: 300px; height: 230px; line-height:18px; font-size:18px; color:#787c6b; padding: 0px; padding-top: 10px; border: solid 0px #000000;">
              <ul style="padding: 0px;">
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Interview experience from companies you are interested in</li><br>
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Use your interviews as references</li><br>
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Your interviews will help you land a job</li><br>
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Find Career-Coaches, Trainers, Interviewing tips and Resume critques</li>
              </ul>
            </div>
          </div>

          <div class="a-button a-button-large" style="position: absolute; top: 0px; float: left; left: 60px; z-index: 51;" onclick='if(!user[0]) {window.role = "find"; IN.User.authorize();} else {showSearch("",2);}'>
            <span class="a-button-inner">
              <span class="a-button-text">Find Help</span>
            </span>
          </div>
          <div style="position: absolute; top: 240px; float: left; left: 354px; z-index: 51;"><img src="images/login-up-emboss.png" onmouseover="this.src='images/login-dn-emboss.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/login-up-emboss.png'" style="height: 30px;" onclick='if(!user[0]) {window.role = "find"; IN.User.authorize();} else {showSearch("",2);}' alt="login"/>
          </div>

          <div style="position: absolute; top: 0px; float: right; right: -350px; width: 400px; height: 200px; z-index: 51;">
            <img src="./images/give_help.png" alt="give help"/>
            <div style="position: absolute; top: 45px; left: 210px; float:left; width: 300px; height: 230px; line-height:18px; font-size:18px; color:#787c6b; padding: 0px; padding-top: 10px;">
              <ul style="padding: 0px;">
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Help your peers who want to work for your company</li><br>
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Build your network of new talents by interviewing them in-person</li><br>
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Improve your interviewing skills</li><br>
                <li class="benefits2 condensedFont bnfts1 bullets bulletItem">Get paid to support the next generation of talent</li>
              </ul>
            </div>
          </div>

          <div class="a-button a-button-large" style="position: absolute; top: 0px; float: right; right: -400px; z-index: 51;" onclick='if(!user[0]) {window.role = "give"; IN.User.authorize();} else {showSelectServices(2);}'>
            <span class="a-button-inner">
              <span class="a-button-text">Give Help</span>
            </span>
          </div>
          <div style="position: absolute; top: 240px; float: right; right: -106px; z-index: 51;"><img src="images/login-up-emboss.png" onmouseover="this.src='images/login-dn-emboss.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/login-up-emboss.png'" style="height: 30px;" onclick='if(!user[0]) {window.role = "give"; IN.User.authorize();} else {showSelectServices(2);}' alt="login"/>
          </div>
        </div><!--detail-->
      </div><!--clearfix-->


      <div class="highlight">
        <div class="featured" style="margin-top: 0px; margin-left: 4px; top: 285px;">
          <h2>Why Choose Us?</h2>
          <ul class="clearfix">
            <li>
	      <div id="wwo" class="frame1">
	        <div class="box">
	          <img src="images/meeting.jpg" alt="What We Offer" height="130" width="197" onmouseover="this.style.cursor='pointer'; this.parentNode.parentNode.style.backgroundImage='url(images/framesHi.png)';" onmouseout="this.parentNode.parentNode.style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.alt, document.getElementById('home'), true);"/>
	        </div>
	      </div>
	      <p>
	        <b onmouseover="this.style.cursor='pointer'; document.getElementById('wwo').style.backgroundImage='url(images/framesHi.png)'; showMore(this.innerHTML, document.getElementById('home'), false );" onmouseout="document.getElementById('wwo').style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.innerHTML, document.getElementById('home'), true );">what we offer</b>
	      </p>
            </li>
            <li>
	      <div id="wyg" class="frame1">
	        <div class="box">
	          <img src="images/handshake.jpg" alt="What You Get" height="130" width="197" onmouseover="this.style.cursor='pointer'; this.parentNode.parentNode.style.backgroundImage='url(images/framesHi.png)';" onmouseout="this.parentNode.parentNode.style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.alt, document.getElementById('home'), true );">
	        </div>
	      </div>
	      <p>
	        <b onmouseover="this.style.cursor='pointer'; document.getElementById('wyg').style.backgroundImage='url(images/framesHi.png)'; showMore(this.innerHTML, document.getElementById('home'), false );" onmouseout="document.getElementById('wyg').style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.innerHTML, document.getElementById('home'), true );">what you get</b>
	      </p>
            </li>
            <li>
              <div id="oc" class="frame1">
                <div class="box">
	          <img src="images/family-small.jpg" alt="Our Crowd" height="130" width="197" onmouseover="this.style.cursor='pointer'; this.parentNode.parentNode.style.backgroundImage='url(images/framesHi.png)';" onmouseout="this.parentNode.parentNode.style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.alt, document.getElementById('home'), true );">
	        </div>
              </div>
              <p>
	        <b onmouseover="this.style.cursor='pointer'; document.getElementById('oc').style.backgroundImage='url(images/framesHi.png)'; showMore(this.innerHTML, document.getElementById('home'), false );" onmouseout="document.getElementById('oc').style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.innerHTML, document.getElementById('home'), true );">Our 'crowd'</b>
              </p>
            </li>
            <li>
	      <div id="ep" class="frame1">
	        <div class="box">
	          <img src="images/smile.jpg" alt="Example Profile" height="130" width="197" onmouseover="this.style.cursor='pointer'; this.parentNode.parentNode.style.backgroundImage='url(images/framesHi.png)';" onmouseout="this.parentNode.parentNode.style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.alt, document.getElementById('home'), true );">
	        </div>
	      </div>
              <p>
	        <b onmouseover="this.style.cursor='pointer'; document.getElementById('ep').style.backgroundImage='url(images/framesHi.png)'; showMore(this.innerHTML, document.getElementById('home'), false );" onmouseout="document.getElementById('ep').style.backgroundImage='url(images/frames.png)';" onclick="showMore(this.innerHTML, document.getElementById('home'), true );">example profile</b>
	      </p>
            </li>
          </ul>
        </div><!--featured-->
      </div><!--highlight-->
    </div><!--mainbox-->
  </div><!--contents-->








  <div id="search" class="contents" style="display: none; margin-bottom: 0px; border: 0px solid #ff0000;">
    <div id="mainbox">
      <div class="clearfix">
        <img src="images/mainbox2.png" alt="main" width="958" style="position: absolute; top: 0px;"/>
	<div id="searchContent" class="detail2">
          <div id="infoContentsWrapper" style="position: absolute; top: 0px; float: left; left: 50px; width: 400px; height: 200px; border: solid 0px #ff0000; z-index: 52;">
	    <div id="infoContents" style="z-index: 52;">
	      <div class="clearfix">
	        <div class="sidebar">
		  <div>
		    <h2>Info</h2>
                    <div id="providerRating">
                    </div>
		    <ul class="contact">
		      <li>
		        <p>
			  <span class="name"></span> <em id="labelName"></em>
			</p>
	              </li>
		      <li>
			<p class="company"><span id="labelCompany"></span>
			</p>
		      </li>
		      <li>
			<p class="title"><span id="labelProfile"></span>
			</p>
		      </li>
		      <li>
			<p class="web">
			  <span id="labelLink"><a target="_blank" href="">linkedIn profile</a></span>
			</p>
		      </li>
		    </ul>
		  </div>
		</div><!--sidebar-->
	      </div><!--clearfix-->
	    </div><!--infoContents-->
	  </div><!--infoContentsWrapper-->

          <div style="position: absolute; top: -10px; float: right; right: -373px; width: 400px; height: 200px;">
              <img id="image" width="285" height="285" src="" alt="make appt" frameborder="0" onmouseover="document.getElementById('makeApptBlister').style.display='';"/>
          </div>

          <div style="position: absolute; top: -10px; float: right; right: -468px; z-index: 15;">
            <img src="images/mainbox-blister.png" alt="main blister" width="958"/>
          </div>

          <div style="position: absolute; top: -8px; float: right; right: -468px; z-index: 50;">
            <img src="images/spiral.png" alt="spiral" width="958"/>
          </div>

          <div id="slider">
          </div>

          <div id="makeApptBlister" style="position: absolute; top: -3px; float: right; right: -374px; z-index: 53;">
            <img src="images/makeApptBlister-up.png" alt="make appt blister" onmouseover="this.src='images/makeApptBlister-dn.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/makeApptBlister-up.png'" onclick="makeAppt();"/>
          </div>
            

        </div><!--searchContent-->


        <div id="apptScheduler" class="scheduler-header" style="display: none; width: 320px; z-index: 56; position: absolute; top: -90px; float: right; margin-left: 312px; color: #ffffff; border: solid 4px #2a2a2a;">
          <div style="position: absolute; float: right; right: 0px; padding: 4px;">
            <div class="close-up" onmouseover="this.style.cursor='pointer'; this.className='close-dn';" onmouseout="this.className='close-up';" onclick="this.parentNode.parentNode.style.display='none'; document.getElementById('scrollbar').style.zIndex = 55; if(document.getElementById('screen')) {document.getElementById('screen').style.display='none';}">
            </div>
          </div>
          <table style="width: 300px; color: #ffffff; padding: 0px;background-color:#73841D;"><td id="myApptHeader" class="scheduler-header" style="width: 300px; height: 30px;">Choose the hours and services for this appointment</td></table>
          <table id="myAppts" border="0" cellpadding="0" cellspacing="1" class="tablesorter" style="width: 300px;">
            <thead>
              <tr>
                <th style="width: 40px;">TIME</th>
                <th style="width: 120px;"><input type="checkbox" name="checkAll" value="" onclick="setGroup('apptTime', this.checked); getSubTotal();">APPOINTMENT</th>
                <th style="width: 140px;">SERVICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align:right;">6am</td>
                <td><input type="checkbox" name="apptTime" value="6am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="6am" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">7am</td>
                <td><input type="checkbox" name="apptTime" value="7am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="7am" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">8am</td>
                <td><input type="checkbox" name="apptTime" value="8am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="8am" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">9am</td>
                <td><input type="checkbox" name="apptTime" value="9am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="9am" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">10am</td>
                <td><input type="checkbox" name="apptTime" value="10am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="10am" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">11am</td>
                <td><input type="checkbox" name="apptTime" value="11am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="11am" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">12pm</td>
                <td><input type="checkbox" name="apptTime" value="12pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="12pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">1pm</td>
                <td><input type="checkbox" name="apptTime" value="1pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="1pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">2pm</td>
                <td><input type="checkbox" name="apptTime" value="2pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="2pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">3pm</td>
                <td><input type="checkbox" name="apptTime" value="3pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="3pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">4pm</td>
                <td><input type="checkbox" name="apptTime" value="4pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="4pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">5pm</td>
                <td><input type="checkbox" name="apptTime" value="5pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="5pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">6pm</td>
                <td><input type="checkbox" name="apptTime" value="6pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="6pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">7pm</td>
                <td><input type="checkbox" name="apptTime" value="7pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="7pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">8pm</td>
                <td><input type="checkbox" name="apptTime" value="8pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="8pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">9pm</td>
                <td><input type="checkbox" name="apptTime" value="9pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="9pm" style="width: 140px;" onchange="getSubTotal();"></select></td>
              </tr>
            </tbody>
          </table>

          <table style="width: 300px; color: #ffffff; padding: 0px;background-color:#73841D;" border="0" cellpadding="0" cellspacing="0">
            <td>
              <div class="scheduler-header" style="height: 35px;">
                <div class="a-button a-button-small" style="position: absolute; right: 24px; height: 35px;" onclick="applySchedule();">
                  <span class="a-button-inner" style="padding-top: 2px;">
                    <span class="a-button-text" style="margin-left: -20px;">Apply</span>
                  </span>
                </div>


<!--
                <img src="images/applyBttn-up.png" alt="apply" onmouseover="this.src='images/applyBttn-dn.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/applyBttn-up.png'" onclick="applySchedule();" style="position: relative; float: right; margin-left: 10px; margin-right: 20px;"/>
-->

                <div id="servicesTotal" style="display: none; position: relative; float: left; margin-left: 4px; margin-top: 10px;">
                </div>
              </div>
            </td>
          </table>

        </div><!--scheduler-->



      </div><!--clearfix-->


      <div class="highlight">
        <div class="featured" style="margin-top: 0px; margin-left: 22px; top: 300px;">
          <h2>Services</h2>
          <ul class="clearfix" id="services">
          </ul>
        </div><!--featured-->
      </div><!--highlight-->
    </div><!--mainbox-->
  </div><!--contents-->

  <div id="screen" style="display: none;">
  </div>











  <div id="profile" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featuredH" style="top: 100px;">
            
            <div id="history" class="history">
            </div>
            <div id="formPage" class="formPage">
              <div style="height: 360px; width: 620px;"><h3 style="text-align: center; vertical-align: middle; line-height: 360px;">Click a service item on the left to see your results</h3></div>
            </div><!--formPage-->

          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->







  <div id="checkOut" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 60px;">
            <h1 id="Total">Total: $0.00</h1>
            <h2>Your Appointments</h2>
            <br>
            <div id="cartItems" class="history"></div>
            <div style="clear:both;"></div>
         </div><!--featured-->
        </div><!--clearfix-->
        <div style="position: absolute; top: 0px; margin-left: 275px;">
          <h2 style="color:#F1FFAF; margin-bottom: -10px;">Choose your method of payment</h2>
          <div class="a-button a-button-medium" title="paypal" style="float: left; margin-left: 125px; margin-bottom: -4px; margin-top: 8px;" onclick="makePayment(this.title);"><img class="a-button-inner a-button-text" src="./images/paypal-icon.png" style="height: 50px;"/></div>
          <!--<div style="float: left;"><img src="./images/paypal-icon.png" style="height: 50px; margin-left: 10px;"/></div>-->
        </div>
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->







  <div id="return" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 80px;">
            <h2>Thank you for choosing interviewring to handle your career services.</h2>
            <h3>You and your service provider(s) have been sent an email with info regarding how to connect with one another</h3>
            <h4 style="color:#555555;">The interviewring team wishes you much success in your career and hopes to serve you again</h4>
            <br>
            <div id="cartItemsReturn" class="history"></div>
            <div style="clear:both;"></div>
         </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->




  <div id="socialShare" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 100px;">
            <div id="share" class="formPage">
            </div>
          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->


  <div id="rateMe" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 100px;">
            <div id="rateFormImg" class="circular" style="margin-top: 60px;"></div>
            <div id="rateForm" class="formPage">
            </div>
          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->


  <div id="resultsForm" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 100px;">
            <div id="resultsFormImg" class="circular" style="margin-top: 60px;"></div>
            <div id="resultsFormForm" class="formPage">
            </div>
          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->





















  <div id="selectServices" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 180px;">

            <h2>Select the help you are willing & able to provide</h2>
            <ul class="clearfix" id="services">
              <li>
	        <div class="frame1">
	          <div class="box">
	            <img id="selectInterviewing" src="images/Interviewing.jpg" alt="interviewing" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/InterviewingOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Interviewing.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
	        </div>
	        <p>
	          <b>interviewing</b>
	        </p>
              </li>
              <li>
	        <div class="frame1">
	          <div class="box">
	            <img id="selectCoaching" src="images/Career%20Coaching.jpg" alt="career coaching" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Career%20CoachingOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Career%20Coaching.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
	        </div>
	        <p>
	          <b>career coaching</b>
	        </p>
              </li>
              <li>
                <div class="frame1">
                  <div class="box">
	            <img id="selectCritiquing" src="images/Resume%20Critiquing.jpg" alt="resume critiquing" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Resume%20CritiquingOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Resume%20Critiquing.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
                </div>
                <p>
	          <b>resume critiquing</b>
                </p>
              </li>
              <li>
	        <div class="frame1">
	          <div class="box">
	            <img id="selectTips" src="images/Interview%20Tips.jpg" alt="interview tips" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Interview%20TipsOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Interview%20Tips.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
	        </div>
                <p>
	          <b>interview tips</b>
	        </p>
              </li>
            </ul>



            <div style="position: relative; top: 10px; float: right;">
              <img src="images/scrollRight.png" alt="next" onmouseover="this.src='images/scrollRight_over.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/scrollRight.png'" onclick="showSelectAvailability(3);"/>
            </div>

            <div class="x-window-default" style="position: relative; top: -300px; float: left; color: #404040; padding-right: 10px;">
              <input type="checkbox" name="infoConfidential" onclick="updateConfidentiality(this.checked);">Keep my identity confidential</input>
            </div>

          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->











	








  <div id="selectAvailability" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 180px;">
            <h2>Select availability</h2>
            <div id="calendarWrap" style="z-index: 40; position: relative; top: 0px; float: left; margin-left: 30px;">
              <div id="calendar" style="width: 178px; background-color: #aecc2c; box-shadow: -10px 10px 12px #222222; border: solid 4px #2a2a2a;">
              </div>
            </div>

            <div id="scheduler" style="width: 220px; z-index: 35; position: absolute; top: -160px; float: left; margin-left: 260px; color: #ffffff; box-shadow: -10px 10px 12px #222222; border: solid 4px #2a2a2a;">


              <table style="width: 220px; color: #ffffff; padding: 0px;background-color:#73841D;"><tr class="scheduler-header" id="selectedDate" style="width: 220px;"></tr></table>

              <table id="tAppts" border="0" cellpadding="0" cellspacing="1" class="tablesorter" style="width: 220px;">
                <thead>
                  <tr>
                    <th style="width: 40px;">TIME</th>
                    <th><input type="checkbox" name="checkAll" value="" onclick="setGroup('checked', this.checked);">AVAILABLE?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-align:right;">6am</td>
                    <td><input type="checkbox" name="checked" value="6am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">7am</td>
                    <td><input type="checkbox" name="checked" value="7am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">8am</td>
                    <td><input type="checkbox" name="checked" value="8am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">9am</td>
                    <td><input type="checkbox" name="checked" value="9am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">10am</td>
                    <td><input type="checkbox" name="checked" value="10am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">11am</td>
                    <td><input type="checkbox" name="checked" value="11am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">12pm</td>
                    <td><input type="checkbox" name="checked" value="12pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">1pm</td>
                    <td><input type="checkbox" name="checked" value="1pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">2pm</td>
                    <td><input type="checkbox" name="checked" value="2pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">3pm</td>
                    <td><input type="checkbox" name="checked" value="3pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">4pm</td>
                    <td><input type="checkbox" name="checked" value="4pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">5pm</td>
                    <td><input type="checkbox" name="checked" value="5pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">6pm</td>
                    <td><input type="checkbox" name="checked" value="6pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">7pm</td>
                    <td><input type="checkbox" name="checked" value="7pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">8pm</td>
                    <td><input type="checkbox" name="checked" value="8pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right;">9pm</td>
                    <td><input type="checkbox" name="checked" value="9pm"></td>
                  </tr>
                </tbody>
              </table>

              <table style="width: 220px; color: #ffffff; padding: 0px;background-color:#73841D;" border="0" cellpadding="0" cellspacing="0">
                <td>
                  <div class="scheduler-header" style="height: 35px;">
                    <div class="a-button a-button-small" style="position: absolute; right: 10px; height: 35px;" onclick="applySelection();">
                      <span class="a-button-inner" style="padding-top: 2px;">
                        <span class="a-button-text" style="margin-left: -20px;">Apply</span>
                      </span>
                    </div>

<!--
                    <img src="images/applyBttn-up.png" alt="apply" onmouseover="this.src='images/applyBttn-dn.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/applyBttn-up.png'" onclick="applySelection();" style="position: relative; float: right; margin-left: 10px; margin-right: 20px;"/>
-->

                  </div>
                </td>
              </table>

            </div><!--scheduler-->

            <div id="calendarWrap2" style="display: none; z-index: 35; position: relative; top: -25px; float: left; margin-left: 150px;">
              <h2>My Calendar</h2>
              <div id="calendar2" style="width: 178px; background-color: #aecc2c; border: solid 4px #2a2a2a; margin-top: -24px;">
              </div>
            </div>

            <div style="position: relative; top: 220px; float: right;">
              <img src="images/scrollRight.png" alt="next" onmouseover="this.src='images/scrollRight_over.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/scrollRight.png'" onclick="showCompleteGiveHelp();"/>
            </div>

          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->












  <div id="completeGiveHelp" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 180px;">

            <h2>Congratulations and Thank You!</h2>
            <br>
            <h3>Your services can now be searched for and utilized by all those seeking help</h3>
            <h3>You can view/modify your calendar at any time by clicking the 'My Calendar' icon in the upper right hand corner</h3>
            <br>
            <h3>See how <a style="color:#96AF26;" onmouseover='this.style.cursor="pointer"; this.style.color="#d3e17f";' onmouseout='this.style.color="#96AF26";' onclick='showSearch(user[0].inID, 2);'>you</a> appear when people search for you</h3>
            <br>
            <p>Thanks,
            <p>-The Interview Ring Staff

          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->












  <div id="footer">
    <div id="footnote">
      <div class="clearfix">
        <span style="position: relative; float: left; margin-left: 285px; margin-top: 30px; color: #75891C;">About Us</span>
        <img class="socialicon connect" src="images/linkedin-up.png" alt="linkedin" onmouseover="this.src='images/linkedin-dn.png'; this.style.cursor='pointer';"  onmouseout="this.src='images/linkedin-up.png'"/>
        <img class="socialicon connect" src="images/facebook-up.png" alt="facebook" onmouseover="this.src='images/facebook-dn.png'; this.style.cursor='pointer';"  onmouseout="this.src='images/facebook-up.png'"/>
        <img class="socialicon connect" src="images/google-up.png"   alt="google" onmouseover="this.src='images/google-dn.png';   this.style.cursor='pointer';"  onmouseout="this.src='images/google-up.png'"/>
        <img class="socialicon connect" src="images/twitter-up.png"  alt="twitter" onmouseover="this.src='images/twitter-dn.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/twitter-up.png'"/>
        <span style="position: relative; float: left; margin-top: 30px; color: #75891C;">Contact Us</span>
      </div>
    </div>

    <div class="clearfix">
      <div class="section">
	<h4>Latest News</h4>
	<p style="color: #73841D;">
          Launch of Interview Ring
	</p>
      </div>
      <div class="section contact">
        <h4>Contact Us</h4>
	<p style="color: #73841D;">
	  <span>Address:</span> Kirkland, WA
	</p>
	<p style="color: #73841D;">
	  <span>Phone:</span> 206.555.5555
	</p>
	<p style="color: #73841D;">
	  <span>Email:</span> info@interviewring.com
	</p>
      </div>
      <div class="section">
        <h4>SEND US A MESSAGE</h4>
        <p style="color: #73841D;">
	  Questions/Comments
	</p>
	<a href="http://www.interviewring.com/contact/" >Click to send us an email</a>
      </div>
    </div>
	
    <div id="footnote">
      <div class="clearfix">
	<p>
	  © Copyright 2013 Interview Ring. All Rights Reserved.
	</p>
      </div>
    </div>

  </div>









 <script type="text/javascript">

$(function()
{
  $("#tAppts").tablesorter({ widgets: ['zebra'], headers: { 0:{sorter: false}, 1:{sorter: false}} })
  $("#myAppts").tablesorter({ widgets: ['zebra'], headers: { 0:{sorter: false}, 1:{sorter: false}, 2:{sorter: false}} })
});


    Ext.DatePicker.prototype.minDate = today;
    Ext.form.DateField.prototype.minValue = today;
    Ext.DatePicker.prototype.minText = 'Please pick a date in the future';
    Ext.form.DateField.prototype.minText = 'Please pick a date in the future';

    dayNumber = today.getDay();
    dayIndex = today.getDate();
    monthIndex = today.getMonth()+1;
    year = today.getFullYear();

    populateAvailableTimes();
    disableAvailableTimesFromSchedule();


    var _set_day = document.getElementById('selectedDate');
    var day = dayNames[today.getDay()] + ', ' + monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
    _set_day.innerHTML = 'Selections apply to:<br>' + '<input type="radio" name="days" id="justThisDay"/>' + day + '<br>' + '<input type="radio" name="days" id="thisDayAllMonth"/>All ' + dayNames[today.getDay()] + 's in ' + monthNames[today.getMonth()] + ' ' + today.getFullYear() + '<br>' + '<input type="radio" name="days" id="thisDayAll"/>All ' + dayNames[today.getDay()] + 's in ' + today.getFullYear();
    document.getElementById('justThisDay').checked=true;

    var tDay = pad(today.getDate(), 2) + "/" + pad(today.getMonth()+1,2) + "/" + today.getFullYear();
    dateArray = [tDay];


// define the calendar.
    var dp = new Ext.DatePicker({
      renderTo: 'calendar',
      listeners: {
            'select': function(date_picker, date){
                // our form element.
                //var _frm = document.getElementById('date_picker_form');
                // date value form inpuit
                var _set_day = document.getElementById('selectedDate');
                //var sch = document.getElementById('labelName').innerHTML;
                //var sch = initStr[curr].label.description;
                // set value and submit.
                dayNumber = date.getDay();
                dayIndex = date.getDate();
                monthIndex = date.getMonth()+1;
                year = date.getFullYear();
                var day = dayNames[date.getDay()] + ', ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
                _set_day.innerHTML = 'Selections apply to:<br>' + '<input type="radio" name="days" id="justThisDay"/>' + day + '<br>' + '<input type="radio" name="days" id="thisDayAllMonth"/>All ' + dayNames[date.getDay()] + 's in ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + '<br>' + '<input type="radio" name="days" id="thisDayAll"/>All ' + dayNames[date.getDay()] + 's in ' + date.getFullYear();
                //console.log(_set_day.innerHTML);
                document.getElementById('justThisDay').checked=true;
                populateAvailableTimes();
                disableAvailableTimesFromSchedule();

                var id = readCookie(day);
                if(id)
                {
                  var num = id.split(':');
                  var time = num[0];
                  var appt = num[1];
                  var name = num[2];
                  //alert(num);
                  //alert("ITEM: " + prod);
                  //var img = item.get('image');
                  window.add(time, appt, name);
                }
	      
                document.getElementById('scheduler').style.display="";
                //document.getElementById('grayOutBackground').style.display="";
                //_frm.submit();
            }
        },
        style: 'opacity: 1; filter: alpha(opacity=100); color: #666666;',
        //html: src,

        //disabledDays: [0],
        disabledDaysText: 'I don\'t interview on this day.  Sorry!',
        showToday: false
    });







</script>





</body>
</html>
