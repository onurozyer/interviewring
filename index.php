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


<head>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
  <meta charset="UTF-8">
  <meta property="og:image" content="http://www.interviewring.com/images/share.jpg"/>
  <meta property="og:image:type" content="image/jpeg" />
  <title>Interview Ring</title>
  <link href='./images/x-icon.png' rel='icon' type='image/x-icon'/> 
  <link rel="shortcut icon" href="./images/x-icon.png" type="image/x-icon" />
<!--
  <link href='http://fonts.googleapis.com/css?family=Merriweather' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather:300' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Six+Caps' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Short+Stack|Arvo:400,700,400italic,700italic|Montserrat:400,700' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
-->

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600' rel='stylesheet' type='text/css'>

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
  <script type="text/javascript" src="js/jstz-1.0.4.js"></script>
  <script type="text/javascript" src="js/date.js"></script>
  <!--<script type="text/javascript" src="js/timeZone.js"></script>-->

  <link rel="stylesheet" type="text/css" href="css/coverflow.css">
  <script type="text/javascript" src="js/coverflowExtjs.js"></script>


  <!-- Page specific --> 
  <script type="text/javascript" src="js/interviewers.js"></script> 
  <script type="text/javascript" src="js/randlib.js"></script>
  <script type="text/javascript" src="js/utils.js"></script>
  <link rel="stylesheet" type="text/css" href="css/tablesorter.css">
  <link rel="stylesheet" href="css/style.css" type="text/css">



  <script type="text/javascript" src="js/pages.js"></script>



  <script type="text/javascript">
    $.ajaxSetup({ cache: false });
  </script>



</head>


<body onresize="windowResize();">


  <div id="header" class="a-button-inner-find" style="padding: 0px 4px 0px 4px;">
    <div id="headerClearfix" class="clearfix">
      <div class="logo">
        <a onclick="showHome();"><img src="images/logo.png" alt="LOGO" style="height: 50px; margin-top: -0px;"></a>
        <!--<a onclick="showHome();"><img src="images/huddle.png" alt="LOGO" style="height: 200px; margin-left: -30px; margin-top: 0px;"></a>-->
        <!--<a><img src="images/logo-ring.png" alt="LOGO" style="height: 130px;"</a>-->
        <!--<span style="margin-left: -90px; top: -20px;color:white;font-size:20px;">The Career Services Marketplace</span>-->
      </div>


      <div class="login" onmouseover='this.style.cursor="pointer"; showSettings(); document.getElementById("dropdown").className = "dropdown-dn";' onmouseout='document.getElementById("showSettingsContainer").style.display = "none"; document.getElementById("dropdown").className = "dropdown-up";'>
        <div id="login" style="position: relative; float:left;"><div onclick="IN.User.authorize(); return true;">login</div></div>
        <div style="position: relative; float:left; margin-left: 6px;">
          <div id="dropdown" class="dropdown-up" onmouseover='this.style.cursor="pointer"; this.className="dropdown-dn";' onmouseout='this.className="dropdown-up";'></div>
        </div>
        <div id="showSettingsContainer" style="display:none;">
          <div id="showSettings" class="show-settings darkGrey">
            <div id="showSettingsContent" class="showSettingsContent">

              <div style="padding:35px 4px 4px 4px;">
                <table class="x-window-default-lt unhovered" style="width:240px; color: #000000;" onclick='IN.User.logout();' onmouseover='this.className="x-window-default hovered";' onmouseout='this.className="x-window-default-lt unhovered";'>
                  <tr style="width: 240px;">
                    <td style="width:30px;"><img src="./images/logoff.png"/></td>
                    <td><input type="checkbox" id="logout" name="logout" /> <label for="logout" onmouseover='this.style.cursor="pointer";'>Log me out</label></td>
                  </tr>
                </table>
              </div>
              <hr style="margin-left: -4px; width: 250px;">
              <div style="padding:4px 4px 4px 4px;">
                <table class="x-window-default-lt unhovered" style="width:240px; color: #000000;" onclick='updateConfidentiality(!document.getElementById("infoConfidential").checked);' onmouseover='this.className="x-window-default hovered";' onmouseout='this.className="x-window-default-lt unhovered";'>
                  <tr style="width: 240px;">
                    <td style="width:30px;"><img src="./images/identity.png"/></td>
                    <td><input type="checkbox" id="infoConfidential" name="infoConfidential" /> <label for="infoConfidential" onmouseover='this.style.cursor="pointer";'>Identity confidential</label></td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>



<!--
                <table class="x-window-default" style="width:230px; color: #000000;">
                  <tr>
                    <td style="width:30px;"><img src="./images/identity.png"/></td>
                    <td><input type="checkbox" name="infoConfidential" style="color:#000000;" onclick="updateConfidentiality(this.checked);">Keep my identity confidential</input></td>
                  </tr>
                </table>
-->






      <div id="headercontent" style="display:none;">
      <div style="visibility:hidden;">
      <img id="step" style="z-index: 34; height: 90px; position: relative; top: 30px; float: left; left: 10px;" src="./images/step1.png" alt="step" />
      <img id="step1" src="images/0.gif" alt="step1" style="position: absolute; top: 45px; margin-left: 20px; width: 70px; height: 60px; z-index: 35; border: solid 0px #ff0000;" onmouseover="this.style.cursor='pointer';" onclick='showHome();'/>
      <img id="step2" src="images/0.gif" alt="step2" style="position: absolute; top: 45px; margin-left: 115px; width: 70px; height: 60px; z-index: 35; border: solid 0px #ff0000;" onmouseover="this.style.cursor='pointer';" onclick='showSearch();'/>
      <img id="step3" src="images/0.gif" alt="step3" style="position: absolute; top: 45px; margin-left: 210px; width: 70px; height: 60px; z-index: 35; border: solid 0px #ff0000;" onmouseover="this.style.cursor='pointer';" onclick='showCheckOut();'/>
      </div>


      <div style="position: relative; top: 23px; float: right; right: 180px; z-index: 61;" onmouseover="this.style.cursor='pointer';" onclick="showProfile();">
        <img id="feedback" src="images/history.png" alt="HISTORY"/>
        <div id="feedbackCount" style="position: relative; top: -12px; right: -24px; color: #FFFFFF; width: 16px; text-align: center;" onmouseover="this.style.cursor='pointer';">0</div>
      </div>

      <div id="mailContainer" style=" position: relative; top: 30px; float: right; right: 100px; z-index: 61;" onmouseover="this.style.cursor='pointer'; showMail();" onmouseout="document.getElementById('mail').style.display='none';">
        <img style="z-index: 34; height: 25px;" src="./images/mail.png" alt="mail"/>
        <div id="mailCount" style="position: relative; top: -22px; right: -5px; color: #FFFFFF; width: 20px; text-align: center;" onmouseover="this.style.cursor='pointer'; showMail();" onmouseout="document.getElementById('mail').style.display='none';">0</div>
        <div id="mailNewFlag" style="display: none; position: relative; top: -50px; right: -20px;" onmouseover="this.style.cursor='pointer'; showMail();" onmouseout="document.getElementById('mail').style.display='hidden';"><img src="images/warning.gif"/></div>
        <div id="mailLoading" style="display: none; position: absolute; top: 25px; left: -150px; z-index: 61;"><img src="./images/progressBar.png"/><img id="progressBall" src="./images/ball.png" style="position: absolute; top: 1px; margin-left: 1px;"/></div>
        <div id="mail" class="gradient-darkGray" style="display: none; z-index: 60; position:absolute; top:27px; right: 0px; width: 350px; color: #CDDF7E; margin: 0px; max-height: 410px; overflow: auto;">
        </div><!--<div id="mail">-->
      </div><!--<div id="mailContainer">-->

      <div style="z-index: 61; position: relative; top: 30px; float:right; right:20px;" onmouseover="this.style.cursor='pointer';" onclick="showCalendar(this.parentNode);">
        <img style="position: relative; height: 25px; border: solid 0px #000000;" src="./images/calendar.png" alt="calendar"/>
      </div>

      <div class="cart" style="top: 26px;" onclick="showCheckOut();">
        <img id="cart" src="images/cart.png" alt="CART">
        <img id="cartItem" src="images/calendar.gif" class="cartItem" style="display: none;" alt="CART ITEM">
      </div>

      </div>
    </div><!--clearfix-->
  </div>


  <!--<span style="position: absolute; top: 65px; left: 580px; line-height:18px; font-size:18px; color:#11bdc9;">Crowd-Sourced interview experience</span>-->


  <div id="header2">

    <div id="getStarted" class="clearfix" style="z-Index: 52; position: absolute; top: 70px; left: 456px; display:none;">
      <img src="./images/getStarted.png" style=""/>
    </div>





    <div id="header2content" class="clearfix">
<!--
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
      <div id="searchContainer" style="z-index: 30; position: relative; top: -90px; float: left; left: -220px; background: #666666; border-radius: 15px; height: 25px; width: 150px; padding: 5px; visibility:hidden;">
      <input id="sortInput" style="border-radius: 15px; width: 145px;" type=search results=20 autosave=50 name=s onclick="this.value = '';" onkeyup="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('sortInput').value,2)}, 500);" oninput="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('sortInput').value,2)}, 500);"/>
      </div>
-->

<!--
      <div id="exploreWrapper" style="position: relative; top: 5px; left: 130px; z-index: 30;">
        <input type="text" id="explore" class="explore" style="height: 50px; width: 655px; position: absolute; top:0px; left:0px;" value="FIND INTERVIEWERS FROM DIVERSE INDUSTRIES AND COMPANIES" onclick="this.value=''; this.style.color='#000000'; this.style.fontStyle='normal';" onkeyup="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('explore').value,2)}, 500);" oninput="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('explore').value,2)}, 500);"></input>
        <img class="gradient-darkGrey" src="./images/search.png" style="position: absolute; top:0px; left:662px;" onmouseover="this.style.cursor='pointer';" onclick="window.showSearch(document.getElementById('explore').value,2);"/>
      </div>
-->

      <div id="exploreWrapper" style="position: absolute; top: 75px; z-index: 30; font-size: 32px; line-height: 32px; text-align: center; margin-left: 110px;">
      <div>
        <input type="text" id="explore" class="explore" style="height: 32px; width: 700px; position: relative; align-self: center;top:0px; display: inline;margin: 0 auto;" value="Search For Interviewers..." onclick="this.value=''; this.style.color='#000000'; this.style.fontStyle='normal';" onkeyup="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('explore').value,2)}, 500);" oninput="if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){window.showSearch(document.getElementById('explore').value,2)}, 500);">
        <img class="gradient-darkGrey" src="./images/search.png" style="position: relative; top: 10px; cursor: pointer; height: 30px; width: 34px; margin: 0px 0px 1px -11px; display: inline-block;" onmouseover="this.style.cursor='pointer';" onclick="window.showSearch(document.getElementById('explore').value,2);">
      </div>
      </div>






      <!--<div id="returnLogin" style="display: none; z-Index: 65; position: relative; top: -53px; left: 600px;">-->
      <div id="returnLogin" style="display: none; visibility: hidden; z-Index: 65; position: relative; top: 360px; left: 310px;">
        <div class="a-button a-button-large" onclick='IN.User.authorize();'>
          <span class="a-button-inner" style="padding-top: 15px;">
            <span class="a-button-text">Login</span>
          </span>
        </div>
      </div>


    </div><!--clearfix-->
  </div><!--header-->
	


















  <div id="home" class="contents" style="margin-bottom: 0px; border: 0px solid #ff0000;">
    <div id="mainbox" style="border: 1px solid transparent">
      <div class="clearfix">
        
        <!--
        <img src="images/mainbox4.png" alt="main" width="958" style="position: absolute; top: 0px; z-index: 51;"/>
        <img src="images/mainbox3.png" alt="main" width="958" style="position: absolute; top: 0px; z-index: 51;"/>
        -->

          <div class="a-button a-button-xlarge" style="position: absolute; top: 10px; left: -15px; z-index: 56;" onclick='if(!user[0]) {window.role = "find"; IN.User.authorize();} else {showSearch("",2);}'>
            <span class="a-button-inner-find">

              <span class="a-button-text" style="color: #000000; font-size: 34px; line-height: 38px; font-weight: 400;">Find Interviewers</span>

              <ul style="padding: 0px 0 0 0; line-height:18px; font-size:18px; font-weight: 400; text-align: left; color: #000000;">
                <li class="bulletItem">Connect with professionals from top companies</li><br>
                <li class="bulletItem">Gain interview experience with mock interviews</li><br>
                <li class="bulletItem">Get feedback and share the results</li><br>
              </ul>

            </span>
            <img class="pointer" src="./images/linkedin-logo.png" style="position:absolute; bottom:0px; left: 150px;"/>
          </div>


          <div class="a-button a-button-xlarge" style="position: absolute; top: 10px; left: 490px; z-index: 56;" onclick='if(!user[0]) {window.role = "give"; IN.User.authorize();} else {showSelectServices(2);}'>
            <span class="a-button-inner-find">
              <span class="a-button-text" style="color: #000000; font-size: 34px; line-height: 38px; font-weight: 400;">Be an Interviewer</span>

              <ul style="padding: 0px 0 0 0; line-height:18px; font-size:18px; font-weight: 400; text-align: left; color: #000000;">
                <li class="bulletItem">Expand your network with new talents</li><br>
                <li class="bulletItem">Help new talents by interviewing them</li><br>
                <li class="bulletItem">Give feedback and promote the talents you like</li><br>
              </ul>

            </span>
            <img class="pointer" src="./images/linkedin-logo.png" style="position:absolute; bottom:0px; left: 150px;"/>
          </div>


        </div><!--detail-->


        <div class="next-button" style="margin-top:270px; z-index:65;">
          <div class="site-width">
            <div class="toggle">
              <div class="button">
                <a onmouseover="this.style.cursor='pointer';" onclick='showHowItWorks();'>
                  <span id="howItWorksText" class="open">How it Works</span>
                </a>
              </div>
            </div>
          </div>
        </div>


        <div class="clearfix" style="overflow: hidden; width: 600px; height: 263px; margin-top: 35px; border: 1px solid; border-color: #777777 #444444 #222222; box-shadow: 5px 10px 12px #222222;">
          <iframe width="600" height="265" src="//www.youtube.com/embed/-URR4IL0jEI?wmode=opaque&autoplay=0&rel=0" frameborder="0" allowfullscreen></iframe>
        </div>



      </div><!--clearfix-->
    </div><!--mainbox-->
  </div><!--contents-->







  <div id="howItWorks" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 0px;">
            <div id="howItWorksContainer" style="margin: 0 atuo;">
              <img src="./images/howItWorksHorizontal.png" style="margin: 0 atuo;"/>
              <div style="overflow: hidden; width: 450px; height: 263px; position: absolute; top: 350px; margin-left: 240px;">
                <iframe width="450" height="265" src="//www.youtube.com/embed/-URR4IL0jEI?wmode=opaque&autoplay=0&rel=0" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
            <div class="a-button a-button-small" title="paypal" style="height: 39px; float: left; margin-left: 86px; margin-top: -275px;" onclick='if(!user[0]) {window.role = "find"; IN.User.authorize();} else {showSearch("",2);}'><img class="a-button-inner a-button-text" src="./images/signIN.png" style="height: 28px; padding-right: 2px;"/></div>
            <div class="a-button a-button-small" title="paypal" style="height: 39px; float: left; margin-left: 86px; margin-top: -90px;" onclick='if(!user[0]) {window.role = "give"; IN.User.authorize();} else {showSelectServices(2);}'><img class="a-button-inner a-button-text" src="./images/signIN.png" style="height: 28px; padding-right: 2px;"/></div>
          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->









  <div id="search" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 20px; margin-left: -28px;">
            <div id="searchItems" class="historyItems x-window-default-lt"></div>
            <div style="clear:both;"></div>

<div class="next-button" style="position: relative; top: 30px; left: 12px;">
  <div class="site-width">
    <div class="toggle">
      <div class="button buttonNext">
        <a onmouseover="this.style.cursor='pointer';" onclick="showCheckOut();">
          <span class="open">Next ></span>
          <span class="hotspot"></span>
        </a>
      </div>
      <div class="button buttonPrev">
        <a onmouseover="this.style.cursor='pointer';" onclick="showHome();">
          <span class="open">< Prev</span>
          <span class="hotspot"></span>
        </a>
      </div>
    </div>
  </div>
</div>


         </div><!--featured-->
        </div><!--clearfix-->
        <div class="x-window-default" style="position: absolute; top: -10px; margin-left: 0px; width: 940px; height: 50px;">
          <div style="position: absolute; top: 0px; margin: 10px auto; width: 675px;">
            <h2 id="resultsSearch" style="color: #000000;">Search Results:</h2>
          </div>
          <div style="position: absolute; top: 41px; margin-left: 0px; width: 100px;">
            <h2 style="color:#333333;">Sort:</h2>
          </div>
          <select id="sortSearch" name="sortSearch" onchange="doSearch();" style="position: absolute; top: 35px; margin-left: 70px; width: 100px;">
            <option value="company">Company</option>
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
            <option value="price">Price</option>
          </select>

          <div style="position: absolute; top: 6px; margin-left: 300px; width: 120px; color: #555;">
            <input type="checkbox" name="clearAllSearchFilters" onclick='this.checked=false; clearAllFilters(); doSearch(); document.getElementById("searchFilterList").innerHTML = "[]";' style="color:#555;"/>Clear All Filters
            <span id="searchFilterList" style="position:absolute; top:4px; left: 114px; width:400px;">[]</span>
          </div>

          <div style="position: absolute; top: 41px; margin-left: 300px; width: 100px;">
            <h2 style="color:#333333;">Filter:</h2>
          </div>
          <div style="position: absolute; top: 34px; margin-left: 385px; width: 675px;">

            <div class="connect" onmouseover="showFilter('industry');" onmouseout="showFilter('industry');">
              <div class="filter">Industry
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="industry"></div>
	    </div>
            <div class="connect" onmouseover="showFilter('company');" onmouseout="showFilter('company');">
              <div class="filter">Company
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="company"></div>
	    </div>
            <div class="connect" onmouseover="showFilter('rating');" onmouseout="showFilter('rating');">
              <div class="filter">Rating
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="rating"></div>
	    </div>
            <div class="connect" onmouseover="showFilter('experience');" onmouseout="showFilter('experience');">
              <div class="filter">Experience
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="experience"></div>
	    </div>
            <div class="connect" onmouseover="showFilter('services');" onmouseout="showFilter('services');">
              <div class="filter">Services
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="services"></div>
	    </div>
            <div class="connect" onmouseover="showFilter('price');" onmouseout="showFilter('price');">
              <div class="filter">Price
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="price"></div>
	    </div>

          </div>
        </div>




        <div id="apptScheduler" class="scheduler-header gradient-darkGray" style="display: none; width: 320px; z-index: 56; position: absolute; top: -90px; float: right; margin-left: 312px; color: #ffffff;">
          <div style="position: absolute; float: right; right: 0px; padding: 4px;">
            <div class="close-up" onmouseover="this.style.cursor='pointer'; this.className='close-dn';" onmouseout="this.className='close-up';" onclick="this.parentNode.parentNode.style.display='none'; document.getElementById('scrollbar').style.zIndex = 55; if(document.getElementById('screen')) {document.getElementById('screen').style.display='none';}">
            </div>
          </div>
          <table style="width: 300px; color: #ffffff; padding: 0px;"><td id="myApptHeader" class="scheduler-header gradient-grey" style="width: 300px; height: 30px;">Choose the hours/services for this appointment</td></table>
          <table id="myAppts" border="0" cellpadding="0" cellspacing="0" class="tablesorter" style="width: 300px;">
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
                <td><select name="selectService" title="6am" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">7am</td>
                <td><input type="checkbox" name="apptTime" value="7am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="7am" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">8am</td>
                <td><input type="checkbox" name="apptTime" value="8am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="8am" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">9am</td>
                <td><input type="checkbox" name="apptTime" value="9am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="9am" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">10am</td>
                <td><input type="checkbox" name="apptTime" value="10am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="10am" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">11am</td>
                <td><input type="checkbox" name="apptTime" value="11am" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="11am" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">12pm</td>
                <td><input type="checkbox" name="apptTime" value="12pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="12pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">1pm</td>
                <td><input type="checkbox" name="apptTime" value="1pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="1pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">2pm</td>
                <td><input type="checkbox" name="apptTime" value="2pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="2pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">3pm</td>
                <td><input type="checkbox" name="apptTime" value="3pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="3pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">4pm</td>
                <td><input type="checkbox" name="apptTime" value="4pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="4pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">5pm</td>
                <td><input type="checkbox" name="apptTime" value="5pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="5pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">6pm</td>
                <td><input type="checkbox" name="apptTime" value="6pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="6pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">7pm</td>
                <td><input type="checkbox" name="apptTime" value="7pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="7pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">8pm</td>
                <td><input type="checkbox" name="apptTime" value="8pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="8pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
              <tr>
                <td style="text-align:right;">9pm</td>
                <td><input type="checkbox" name="apptTime" value="9pm" onchange="getSubTotal();"></td>
                <td><select name="selectService" title="9pm" style="width: 140px;" onchange="setCheckbox('apptTime', this.title); getSubTotal();"></select></td>
              </tr>
            </tbody>
          </table>

          <table style="width: 300px; color: #ffffff; padding: 0px;background-color:#73841D;" border="0" cellpadding="0" cellspacing="0">
            <td>
              <div class="scheduler-header gradient-gray" style="height: 35px;">
                <div class="a-button a-button-small" style="position: absolute; right: 28px; height: 35px;" onclick="applySchedule();">
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






      </div><!--hightlight-->
    </div><!--mainbox-->
    <div id="quickLinks" class="quickLinks"></div>

  </div><!--content-->









  <div id="XXsearchXX" class="contents" style="display: none; margin-bottom: 0px; border: 0px solid #ff0000;">
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
			  <span class="name"></span> <em id="labelName" style="width: 310px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"></em>
			</p>
	              </li>
		      <li>
			<p class="company"><span id="labelCompany" style="width: 310px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"></span>
			</p>
		      </li>
		      <li>
			<p class="title"><span id="labelProfile" style="width: 310px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"></span>
			</p>
		      </li>
		      <li>
			<p class="web"><span id="labelLink" style="width: 310px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;"><a target="_blank" href="">linkedIn profile</a></span>
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





      </div><!--clearfix-->


      <div class="highlight">
        <div class="featured" style="margin-top: 0px; margin-left: 22px; top: 300px;">
          <h2>Services</h2>
          <ul class="clearfix" id="servicesAvailable">
          </ul>
        </div><!--featured-->
      </div><!--highlight-->
    </div><!--mainbox-->
  </div><!--contents-->

  <div id="screen" style="display: none;">
  </div>











  <div id="profileXX" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featuredH" style="top: 100px;">
            
            <div id="history" class="history">
            </div>
            <div id="formPage" class="formPage gradient-ltblue">
              <div style="height: 360px; width: 620px;"><h3 style="text-align: center; vertical-align: middle; line-height: 360px;">Click a service item on the left to see your results</h3></div>
            </div><!--formPage-->

          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->


  <div id="profile" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div id="featuredHistoryItems" class="featured" style="top: 20px; margin-left: -28px;">
            <div id="historyItems" class="historyItems x-window-default-lt"></div>
            <div style="clear:both;"></div>


            <div class="next-button" style="position: relative; top: 30px; left: 12px;">
              <div class="site-width">
                <div class="toggle">
                  <div class="button buttonPrev">
                    <a onmouseover="this.style.cursor='pointer';" onclick="showHome();">
                      <span class="open">< Prev</span>
                      <span class="hotspot"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>


         </div><!--featured-->
        </div><!--clearfix-->
        <div class="x-window-default" style="position: absolute; top: -10px; margin-left: 0px; width: 940px; height: 50px;">
          <div style="position: absolute; top: 0px; margin: 10px auto; width: 675px;">
            <h2 id="resultsHistory" style="color: #000000;">History Items:</h2>
          </div>
          <div style="position: absolute; top: 41px; margin-left: 0px; width: 100px;">
            <h2 style="color:#333333;">Sort:</h2>
          </div>
          <select id="sortHistory" name="sortHistory" onchange="doHistory();" style="position: absolute; top: 35px; margin-left: 70px; width: 100px;">
            <option value="status">Status</option>
            <option value="date">Date</option>
            <option value="company">Company</option>
          </select>

          <div style="position: absolute; top: 6px; margin-left: 300px; width: 120px; color: #555;">
            <input type="checkbox" name="clearAllHistoryFilters" onclick='this.checked=false; clearAllFilters(); doHistory(); document.getElementById("historyFilterList").innerHTML = "[]";' style="color:#555;"/>Clear All Filters
            <span id="historyFilterList" style="position:absolute; top:4px; left: 114px; width:400px;">[]</span>
          </div>

          <div style="position: absolute; top: 41px; margin-left: 300px; width: 100px;">
            <h2 style="color:#333333;">Filter:</h2>
          </div>
          <div style="position: absolute; top: 34px; margin-left: 385px; width: 675px;">

            <div class="connect" onmouseover="showHistoryFilter('status');" onmouseout="showHistoryFilter('status');">
              <div class="filter">Status
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="status"></div>
	    </div>
            <div class="connect" onmouseover="showHistoryFilter('date');" onmouseout="showHistoryFilter('date');">
              <div class="filter">Date
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="date"></div>
	    </div>
            <div class="connect" onmouseover="showHistoryFilter('companyH');" onmouseout="showHistoryFilter('companyH');">
              <div class="filter">Company
                <div class="expand-arrow" style="width: 15px; position: relative; top: -24px; float: right; margin-left: -4px;">
                </div>
              </div>
	      <div class="filterSelection" id="companyH"></div>
	    </div>

          </div>
        </div>
      </div><!--hightlight-->
    </div><!--mainbox-->
    <div id="quickLinks" class="quickLinks"></div>

  </div><!--content-->








  <div id="checkOut" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">

          <div class="featured" style="top: 80px; margin-left: -8px;">
            <h1 id="Total" style="visibility: hidden; margin-bottom: -25px;"></h1>
            <hr>
            <h2 style="margin-bottom: -13px; text-align: center; color: #c2c2c2;">Your Appointments</h2>
            <br>
            <div id="cartItems" class="history x-window-default-lt" style=" height: 340px;"><h1 class="clearfix" style="margin-top: 100px; text-align: center;">Your Cart is Empty</h1></div>
            <div style="clear:both;"></div>


	    <div class="next-button" style="position: relative; top: 30px; left: -16px; left: -8px;">
	      <div class="site-width">
	        <div class="toggle">
		  <div class="button buttonPrev">
		    <a onmouseover="this.style.cursor='pointer';" onclick="showSearch();">
		      <span class="open">< Prev</span>
		      <span class="hotspot"></span>
		    </a>
		  </div>	    
		</div>
	      </div>
	    </div>

         </div><!--featured-->
        </div><!--clearfix-->

        <div id="checkOutCallToAction" class="darkGrey" style="display:none; position: absolute; top: -10px; margin-left: 225px; width: 500px; height: 110px; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; border: 2px solid; border-color: #777777 #444444 #222222;">
          <h2 id="checkOutCallToActionHeader" style="color:#FFFFFF; padding: 4px; width: 400px; margin-top: 0px; margin-bottom: -0px; margin-left: 50px; white-space:pre;">       Confirm your appointment(s)</h2>
          <div id="checkOutCallToActionButtons" style="margin-left: 4px; display:none;">
            <div class="a-button a-button-medium" title="paypal" style="float: left; margin-left: 15px; margin-bottom: -4px; margin-top: 8px;" onclick="makePayment(this.title);"><img class="a-button-inner a-button-text" src="./images/paypal-icon.png" style="height: 50px;"/></div>
            <div class="a-button a-button-medium inactive" title="google" style="float: left; margin-left: 15px; margin-bottom: -4px; margin-top: 8px;" onclick="makePayment(this.title);"><img class="a-button-inner a-button-text" src="./images/google-icon.png" style="height: 50px;"/></div>
            <div class="a-button a-button-medium inactive" title="amazon" style="float: left; margin-left: 15px; margin-bottom: -4px; margin-top: 8px;" onclick="makePayment(this.title);"><img class="a-button-inner a-button-text" src="./images/amazon-icon.png" style="height: 50px;"/></div>
          </div>

          <div id="checkOutCallToActionConfirm" style="margin-left: 4px;">
            <div id="checkOutCallToActionConfirmButton" class="a-button a-button-medium inactive" title="confirm" style="float: left; margin-left: 170px; margin-bottom: -4px; margin-top: 8px;" onclick="makePayment(this.title);"><span class="a-button-inner a-button-text" style="height: 40px; padding-top: 26px;">Confirm</span></div>
          </div>

        </div><!--checkOutCallToAction-->

	<div id="promoCodeContainer" style="display: none; position: absolute; top: 24px; left: 10px;">
	  <span style="position: absolute; top: 2px; left: 20px; color:black; z-index: 9999;">Promo Code?</span>
          <div id="promoCode"></div>
        </div>

        <div id="uploadResume" class="upload a-button a-button-medium" style="position: absolute; top: 24px; right: 10px;">
          <span id="uploadButtonText" class="a-button-inner a-button-text" style="position: absolute; top: 0px; height: 61px; width: 180px; padding: 22px 4px 4px 0px; margin: 0px auto; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">Upload Resume</span>
          <input type="file" id="uploadFile" name="uploadFile" onchange="startRead();"/>
        </div>



      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->







  <div id="return" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 80px;">
            <div id="messageReturn" class="featured">
            </div>
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
            <div id="share" class="formPage gradient-ltblue">
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
            <div id="rateForm" class="formPage gradient-ltblue">
            </div>
          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->


  <div id="feedbackForm" class="contents" style="display: none; margin-bottom: 0px; border: solid 0px #ff0000;">
    <div id="mainbox">
      <div class="highlight">
        <div class="clearfix">
          <div class="featured" style="top: 100px;">
            <div id="feedbackFormImg" class="circular" style="margin-top: 60px;"></div>
            <div id="feedbackFormForm" class="formPage gradient-ltblue">
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
            <ul class="clearfix" id="servicesAvailable">
              <li>
	        <div class="frame1">
	          <div class="box">
	            <img id="selectInPersonInterview" src="images/In-person%20Interview.jpg" alt="in-person interview" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/In-person%20InterviewOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/In-person%20Interview.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
	        </div>
	        <p>
	          <b>in-person interview</b>
	        </p>
              </li>
              <li>
	        <div class="frame1">
	          <div class="box">
	            <img id="selectRemoteInterview" src="images/Remote%20Interview.jpg" alt="remote interview" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Remote%20InterviewOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Remote%20Interview.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
	        </div>
	        <p>
	          <b>remote interview</b>
	        </p>
              </li>
              <li>
	        <div class="frame1">
	          <div class="box">
	            <img id="selectCoaching" src="images/Interview%20Mentoring.jpg" alt="interview mentoring" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Interview%20MentoringOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Interview%20Mentoring.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
	        </div>
	        <p>
	          <b>interview mentoring</b>
	        </p>
              </li>
              <li>
                <div class="frame1">
                  <div class="box">
	            <img id="selectCritiquing" src="images/Resume%20Review.jpg" alt="resume review" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Resume%20ReviewOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Resume%20Review.jpg";' onclick='serviceClicked(this, true);'>
	          </div>
                </div>
                <p>
	          <b>resume review</b>
                </p>
              </li>
            </ul>


<!--
            <div style="position: relative; top: 10px; float: right;">
              <img src="images/scrollRight.png" alt="next" onmouseover="this.src='images/scrollRight_over.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/scrollRight.png'" onclick="showSelectAvailability(3);"/>
            </div>
-->

<div class="next-button" style="position: relative; top: 50px;">
  <div class="site-width">
    <div class="toggle">
      <div class="button buttonNext">
        <a onmouseover="this.style.cursor='pointer';" onclick="showSelectAvailability(3);">
          <span class="open">Next ></span>
          <span class="hotspot"></span>
        </a>
      </div>
      <div class="button buttonPrev">
        <a onmouseover="this.style.cursor='pointer';" onclick="showHome();">
          <span class="open">< Prev</span>
          <span class="hotspot"></span>
        </a>
      </div>
    </div>
  </div>
</div>

            <div class="x-window-default" style="position: relative; top: -340px; float: left; color: #000000; padding-right: 10px;">
              <input type="checkbox" name="infoConfidential" style="color: #000000;" onclick="updateConfidentiality(this.checked);">Keep my identity confidential</input>
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


            <div id="timeZoneSelect" style="z-index: 35; position: absolute; top: -100px; margin-left: 200px;">
              <h2>Select your timezone</h2>
              <div style="width: 182px; padding: 0px; margin-top: 0px; box-shadow: -10px 10px 12px #222222; border: solid 1px #2a2a2a;">
                <select id="tzSelect" name="tzSelect"></select>
              </div>
            </div>

            <div id="calendarWrap" style="z-index: 40; position: absolute; top: 0px; margin-left: 200px;">
              <h2>Select availability</h2>
              <div id="calendar" style="width: 178px; background-color: #aecc2c; box-shadow: -10px 10px 12px #222222; border: solid 4px #2a2a2a;">
              </div>
            </div>

            <div id="scheduler" class="gradient-darkGrey" style="width: 220px; z-index: 35; position: absolute; top: -160px; margin-left: 480px; color: #ffffff; box-shadow: -10px 10px 12px #222222;">


              <!--<table style="width: 220px; color: #ffffff; padding: 0px;"><tr class="scheduler-header gradient-darkGrey" id="selectedDate" style="width: 220px; padding: 4px;"></tr></table>-->
              <div style="width: 220px; color: #ffffff; padding: 0px;"><div class="scheduler-header gradient-darkGrey" id="selectedDate" style="width: 210px; padding: 4px;"></div></div>

              <table id="tAppts" border="0" cellpadding="0" cellspacing="0" class="tablesorter" style="width: 220px;">
                <thead class="gradient-ltblue">
                  <tr>
                    <th style="width: 40px;">TIME</th>
                    <th><input type="checkbox" name="checkAll" value="" onclick="setGroup('checked', this.checked);">AVAILABLE?</th>
                  </tr>
                </thead>
                <tbody>
<!-- 
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">6am</td>
                    <td><input type="checkbox" name="checked" value="6am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">7am</td>
                    <td><input type="checkbox" name="checked" value="7am"></td>
                  </tr>
-->
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">8am</td>
                    <td><input type="checkbox" name="checked" value="8am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">9am</td>
                    <td><input type="checkbox" name="checked" value="9am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">10am</td>
                    <td><input type="checkbox" name="checked" value="10am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">11am</td>
                    <td><input type="checkbox" name="checked" value="11am"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">12pm</td>
                    <td><input type="checkbox" name="checked" value="12pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">1pm</td>
                    <td><input type="checkbox" name="checked" value="1pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">2pm</td>
                    <td><input type="checkbox" name="checked" value="2pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">3pm</td>
                    <td><input type="checkbox" name="checked" value="3pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">4pm</td>
                    <td><input type="checkbox" name="checked" value="4pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">5pm</td>
                    <td><input type="checkbox" name="checked" value="5pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">6pm</td>
                    <td><input type="checkbox" name="checked" value="6pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">7pm</td>
                    <td><input type="checkbox" name="checked" value="7pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">8pm</td>
                    <td><input type="checkbox" name="checked" value="8pm"></td>
                  </tr>
                  <tr>
                    <td style="text-align:right; padding-right: 4px;">9pm</td>
                    <td><input type="checkbox" name="checked" value="9pm"></td>
                  </tr>
                </tbody>
              </table>

              <table style="width: 220px; color: #ffffff; padding: 0px;background-color:#73841D;" border="0" cellpadding="0" cellspacing="0">
                <td>
                  <div class="scheduler-header gradient-darkGrey" style="height: 35px;">
                    <div class="a-button a-button-small" style="position: absolute; right: 10px; height: 35px;" onclick="applySelection();">
                      <span class="a-button-inner" style="padding-top: 0px;">
                        <span class="a-button-text" style="margin-left: -20px; padding-top: -10px;">Apply</span>
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



<!--
            <div style="position: relative; top: 220px; float: right;">
              <img src="images/scrollRight.png" alt="next" onmouseover="this.src='images/scrollRight_over.png';  this.style.cursor='pointer';"  onmouseout="this.src='images/scrollRight.png'" onclick="showCompleteGiveHelp();"/>
            </div>
-->

<div class="next-button" style="position: relative; top: 269px;">
  <div class="site-width">
    <div class="toggle">
      <div class="button buttonNext">
        <a onmouseover="this.style.cursor='pointer';" onclick="showCompleteGiveHelp();">
          <span class="open">Next ></span>
          <span class="hotspot"></span>
        </a>
      </div>
      <div class="button buttonPrev" style="margin-left: 0px;">
        <a onmouseover="this.style.cursor='pointer';" onclick="showSelectServices();">
          <span class="open">< Prev</span>
          <span class="hotspot"></span>
        </a>
      </div>
    </div>
  </div>
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
            <h3>See how <a style="color:#788699;" onmouseover='this.style.cursor="pointer"; this.style.color="#64707F";' onmouseout='this.style.color="#788699";' onclick='showSearch(user[0].inID, 2);'>you</a> appear when people search for you</h3>
            <br>
            <p>Thanks,
            <p>-The Interview Ring Staff

          </div><!--featured-->
        </div><!--clearfix-->
      </div><!--hightlight-->
    </div><!--mainbox-->
  </div><!--content-->












  <div id="footer">
    <!--<div id="footnote" class="a-button-inner-find clearfix">-->
    <div id="footnote" class="clearfix">
      <div class="clearfix">
      <div style="float: right;">
        <span style="position: relative; float: left; margin-top: 30px; color: #788699;">About Us</span>


        <div class="a-button a-button-xsmall connect" style="margin-right: -6px; margin-top: 22px;" onclick=''><span class="a-button-inner" style="padding-top: 0px;"><img class="socialicon" style="margin-left:-32px; padding:0;" src="images/linkedin.png" alt="linkedin"/></span></div>
        <div class="a-button a-button-xsmall connect" style="margin-right: -6px; margin-top: 22px;" onclick=''><span class="a-button-inner" style="padding-top: 0px;"><img class="socialicon" style="margin-left:-32px; padding:0;" src="images/facebook.png" alt="facebook"/></span></div>
        <div class="a-button a-button-xsmall connect" style="margin-right: -6px; margin-top: 22px;" onclick=''><span class="a-button-inner" style="padding-top: 0px;"><img class="socialicon" style="margin-left:-32px; padding:0;" src="images/google.png" alt="google"/></span></div>
        <div class="a-button a-button-xsmall connect" style="margin-right: 6px; margin-top: 22px;" onclick=''><span class="a-button-inner" style="padding-top: 0px;"><img class="socialicon" style="margin-left:-32px; padding:0;" src="images/twitter.png" alt="twitter"/></span></div>


        <span style="position: relative; float: right; margin-top: 30px; color: #788699;">Contact Us</span>
      </div>
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
                  //window.add(time, appt, name);
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
