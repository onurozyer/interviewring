<?php
define('INCLUDE_CHECK',true);

error_reporting(E_STRICT);

date_default_timezone_set('America/Toronto');

require './php/connect.php';
// Those two files can be included only if INCLUDE_CHECK is defined

session_name('interviewring');
// Starting the session

session_set_cookie_params(8*7*24*60*60);
// Making the cookie live for 8 weeks

session_start();
?>

<!DOCTYPE html>
<!--[if IE 7]> <html lang="en" class="ie7"> <![endif]-->
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <link href='http://fonts.googleapis.com/css?family=Poiret+One|Ubuntu:300,700|Open+Sans&subset=latin,latin-ext,greek-ext' rel='stylesheet' type='text/css'>
    <title>Interview Ring</title>
    <link href='./img/x-icon.png' rel='shortcut icon' type='image/x-icon' />
    <link rel="shortcut icon" href="./img/x-icon.png" />
    <link href="./img/x-icon.png" rel="shortcut icon" type="image/vnd.microsoft.icon">
    <link href="./img/x-icon.png" rel="apple-touch-icon" type="image/png">

    <!-- Meta -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- CSS Global Compulsory-->
    <link type="text/css" rel="stylesheet" href="css/fonts.css" />
    <link type="text/css" rel="stylesheet" href="style.css" />
    <link type="text/css" rel="stylesheet" href="css/flexslider/flexslider.css" />
    <link type="text/css" rel="stylesheet" href="style_ical.css" />
    <link type="text/css" rel="stylesheet" href="css/cssslider/csslider.light.css"/>

    <script src="js/jquery/jquery.min.js"></script>
    <script src="js/jquery/jquery.widget.min.js"></script>
    <script src="js/metro.min.js"></script>
    <script src="js/jquery-ical.js" type="text/javascript" charset="utf-8"></script>

    <link href="js/prettify/prettify.css" rel="stylesheet">
    <!--<link href="css/docs.css" rel="stylesheet">-->
    <link href="css/iconFont.css" rel="stylesheet">

    <script type="text/javascript" src="js/jstz-1.0.4.js"></script>
    <script type="text/javascript" src="js/date.js"></script>
    <script type="text/javascript" src="js/flexslider/jquery.flexslider.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script> 
    <script src="js/utils.js"></script>

    <script src="js/application.js"></script>

    <script src="js/linkedin.js"></script>
    <script src="js/members.js"></script>

    <script src="js/pages.js"></script>

    <script type="text/javascript" src="http://platform.linkedin.com/in.js?async=true">
    </script>

    <script type="text/javascript">
        IN.init({
            api_key: 'i0q6gbockyju',
            authorize: true,
            scope: 'r_emailaddress,r_contactinfo,r_fullprofile',
            onLoad: "window.onLinkedInLoad"
        });

        function onLinkedInLoad() {
            IN.Event.on(IN, "auth", function () { onLinkedInLogin(document.getElementById('login')); });
            IN.Event.on(IN, "logout", function () { onLinkedInLogout(document.getElementById('login')); });
        }
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


    <script>

       $('#spinner').ajaxStart(function () {
          $(this).fadeIn('fast');
        }).ajaxStop(function () {
          $(this).stop().fadeOut('fast');
        });


        var app = new application();
        app.loadUsers();

        function doSearchInterviewers(arg) {
            if (!app.usersLoaded) {
                //console.log('Waiting...');
                countdown = setTimeout('doSearchInterviewers(arg)', 500);
            }
            else {
                arg = arg || document.getElementById('explore').value;
                document.getElementById('explore').value = arg;
                app.searchInterviewers(arg);
            }
        }


        function doShowProfile() {
            if (!app.usersLoaded) {
                //console.log('Waiting...');
                countdown = setTimeout('doShowProfile()', 500);
            }
            else {
                app.populateProfileItems();
            }
        }


        function doShowHistory() {
            if (!app.usersLoaded) {
                //console.log('Waiting...');
                countdown = setTimeout('doShowHistory()', 500);
            }
            else {
                app.populateHistoryItems();
            }
        }


  

    </script>


</head>
<body>

    <div id="spinner">
      <img src="img/ajaxLoader.gif" alt="Loading..."/>
    </div>

    <header>
        <div class="header-top">
            <div class="header-container">
                <div class="logo-div">
                    <a href="#"><img src="img/logo_white.png" alt="logo" /></a>
                </div>
                <div class="top-menu-div">
                    <ul class="nav">
                        <li class="menu-item-1"><a onclick="showHome();">home</a></li>
                        <li class="menu-item-2"><a onclick="showProfile();">my account</a></li>
                        <li class="menu-item-3"><a onclick="showHistory();">my history</a></li>
                        <li class="menu-item-4" id="login"><a onclick="IN.User.authorize();">sign in</a></li>
                    </ul>
                </div>
                <div class="search-form-div">
                    <div class="form-search">
                        <input id="explore" type="text" class="input-xxlarge" placeholder="search for interviewers" onkeyup='if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){if(document.getElementById("profile").style.display == "none") {window.showFindInterviews(document.getElementById("explore").value,2);} else {window.showProfile(document.getElementById("explore").value,2);}}, 500);' oninput='if(window.mytimeout) window.clearTimeout(window.mytimeout); window.mytimeout = window.setTimeout(function(){if(document.getElementById("profile").style.display == "none") {window.showFindInterviews(document.getElementById("explore").value,2);} else {window.showProfile(document.getElementById("explore").value,2);}}, 500);'>
                        <img class="btn" onclick='if(document.getElementById("profile").style.display == "none") {window.showFindInterviews(document.getElementById("explore").value,2);} else {window.showProfile(document.getElementById("explore").value,2);}'></img>
                    </div>
                </div>
            </div>


            <div id="filterSortBar" class="holder" style="margin-top: 0px; display:none;">
                    <div class="filters-div-content">
                        <div style="float: left; width: 120px; font-size: 46px;">filters</div>
                        <div class="filter">
                            <select id="filter_price" onchange="doSearchInterviewers();">
                                <option value="price">price</option>
                                <option value="FREE">FREE</option>
                                <option value='$0.01-49/hr'>$0.01-49/hr</option>
                                <option value='$50-99/hr'>$50-99/hr</option>
                                <option value='$100-149/hr'>$100-149/hr</option>
                                <option value='$150-199/hr'>$150-199/hr</option>
                                <option value='$200-249/hr'>$200-249/hr</option>
                                <option value='$250+/hr'>$250+/hr</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="filter_services" onchange="doSearchInterviewers();">
                                <option value="services">services</option>
                                <option value="Remote Interview">remote interview</option>
                                <option value="In-person Interview">in person interview</option>
                                <option value="Resume Review">resume review</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="filter_experience" onchange="doSearchInterviewers();">
                                <option value="experience">experience</option>
                                <option value="40+ years">40+ years</option>
                                <option value="30-39 years">30-39 years</option>
                                <option value="20-29 years">20-29 years</option>
                                <option value="10-19 years">10-19 years</option>
                                <option value="5-9 years">5-9 years</option>
                                <option value="0-4 years">0-4 years</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="filter_rating" onchange="doSearchInterviewers();">
                                <option value="rating">rating</option>
                                <option value="5 star">5 star</option>
                                <option value="4 star">4 star</option>
                                <option value="3 star">3 star</option>
                                <option value="2 star">2 star</option>
                                <option value="1 star">1 star</option>
                                <option value="0 star">0 star</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="filter_company" onchange="doSearchInterviewers();">
                                <option value="company">company</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="filter_industry" onchange="doSearchInterviewers();">
                                <option value="industry">industry</option>
                            </select>
                        </div>


                    <div style="float: left; width: 90px; font-size: 46px; margin-left: 50px;">sort</div>
                    <div class="filter">
                        <select id="sortSearch" onchange="doSearchInterviewers();">
                            <option value="company">company</option>
                            <option value="rating">rating</option>
                            <option value="price">price</option>
                            <option value="experience">experience</option>
                        </select>
                    </div>
                    <!--<div class="be-interviewer-button-div">
                        <button>be an interviewer ?</button>
                    </div>
                    <div class="ask-be-interviewer-div">would you like to </div>-->

                </div><!--filters-div-content-->
            </div><!--filterSortBar-->



            <div id="historyFilterSortBar" class="holder" style="margin-top: 0px; display:none;">
                    <div class="filters-div-content">
                        <div style="float: left; width: 120px; font-size: 46px;">filters</div>
                        <div class="filter">
                            <select id="historyFilter_status" onchange="doShowHistory();">
                                <option value="status">status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="waiting feedback">Waiting Feedback</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="historyFilter_date" onchange="doShowHistory();">
                                <option value="date">date</option>
                                <option value="< 1 month ago">< 1 month ago</option>
                                <option value="1-3 months ago">1-3 months ago</option>
                                <option value="4-6 months ago">4-6 months ago</option>
                                <option value="7-12 months ago">7-12 months ago</option>
                                <option value="> 1 year ago">> 1 year ago</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select id="historyFilter_company" onchange="doShowHistory();">
                                <option value="company">company</option>
                            </select>
                        </div>


                    <div style="float: left; width: 90px; font-size: 46px; margin-left: 50px;">sort</div>
                    <div class="filter">
                        <select id="sortSearch" onchange="doShowHistory();">
                            <option value="status">status</option>
                            <option value="date">date</option>
                            <option value="company">company</option>
                        </select>
                    </div>
                    <!--<div class="be-interviewer-button-div">
                        <button>be an interviewer ?</button>
                    </div>
                    <div class="ask-be-interviewer-div">would you like to </div>-->

                </div><!--filters-div-content-->
            </div><!--historyFilterSortBar-->




        </div>
    </header>



    <div class="holder-top">

      <!--HOME-->
      <div id="home" class="main-page-top-div">

        <!--HOW IT WORKS-->
        <div class="main-page-photo-div">
          <div class="main-page-video-div">
            <div class="how-it-works-div">how it works?</div>
            <iframe class="video-frame" width="100%" height="306" src="http://www.youtube.com/embed/kk00IAP7cqw?rel=0" frameborder="0" allowfullscreen="1"></iframe>
            <div>
              <button class="main-page-signin-linkedin">
                <div class="main-page-signin-linkedin-content-div">
                  <div class="box-2-3-left">
                    sign in with
                  </div>
                  <div class="box-2-3-right">
                    <img src="img/linkedinsiyah.png" style="height:38px; width:152px;" alt="linkedin" />
                  </div>
                </div>
              </button>
            </div>
          </div><!--main-page-video-div--> 
        </div><!--main-page-photo-div-->
       
        <!--ABOUT-->
        <div class="container-about">
          <div class="about-parent">
            <div class="about-left-div">
              <div class="about-title-div">find interviewers</div>
              <div class="about-bullets">
                <p>&nbsp;&nbsp;Connect with professionals from top companies</p>
                <p>&nbsp;&nbsp;Gain interview experience with mock interviews</p>
                <p>&nbsp;&nbsp;Get feedback and share the results</p>
              </div>
            </div><!--about-left-div-->
            <div class="about-right-div">
              <div class="about-title-div">be an interviewer</div>
              <div class="about-bullets about-bullets-right">
                <p>&nbsp;&nbsp;Expand your network with new talents</p>
                <p>&nbsp;&nbsp;Help new talents by interviewing them</p>
                <p>&nbsp;&nbsp;feedback and promote the talents you like</p>
              </div>
            </div><!--about-right-div-->
          </div><!--about-parent-->
        </div><!--container-about-->

        <!--TESTIMONIALS-->
        <div class="testimonials-main-div">
          <div class="testimonials-container-div">
            <div class="testimonials-title-div">testimonials</div>
            <div class="three-testimonials-div">

              <div class="testimonial-div">
                <div class="testimonial-image-div">
                  <img src="img/test-1.png" alt="test" />
                </div>
                <div class="testimonial-text-div">
                  <p class="quote"> Pellentesque et pulvinar enim. Quisque at tempor ligula. Donec ut purus sed tortor malesuada.</p>
                  <p class="name">Davie Johnson</p>
                  <p class="ash">Art Director /<span> lorem ipsum</span></p>
                </div>
              </div>

              <div class="testimonial-div">
                <div class="testimonial-image-div">
                  <img src="img/test-2.png" alt="test" />
                </div>
                <div class="testimonial-text-div">
                  <p class="quote"> Pellentesque et pulvinar enim. Quisque at tempor ligula. Donec ut purus sed tortor malesuada.</p>
                  <p class="name">Davie Johnson</p>
                  <p class="ash">Art Director /<span> lorem ipsum</span></p>
                </div>
              </div>

              <div class="testimonial-div">
                <div class="testimonial-image-div">
                  <img src="img/test-3.png" alt="test" />
                </div>
                <div class="testimonial-text-div">
                  <p class="quote"> Pellentesque et pulvinar enim. Quisque at tempor ligula. Donec ut purus sed tortor malesuada.</p>
                  <p class="name">Davie Johnson</p>
                  <p class="ash">Art Director /<span> lorem ipsum</span></p>
                </div>
              </div>
            </div><!--three-testimonials-div-->
          </div><!--testimonials-container-div-->
        </div><!--testimonials-main-div-->

      </div><!--main-page-top-div-->
      <!--HOME-->

      <!--FIND INTERVIEWS-->
      <div id="findInterviews" style="display:none; margin-top: 100px;">
          <div id="searchItems" class="main-container">
          </div>
      </div>
      <!--FIND INTERVIEWS-->

      <!--GIVE INTERVIEWS-->
      <div id="giveInterviews" style="display:none; margin-top: 100px;">
      </div>
      <!--GIVE INTERVIEWS-->

      <!--HOW IT WORKS-->
      <div id="howItWorks" style="display:none;">
      </div>
      <!--HOW IT WORKS-->

      <!--SLIDER-->
      <div id="slider" style="display:none;">
      </div>
      <!--SLIDER-->

      <!--PROFILE-->
      <div id="profile" style="display:none; margin-top: -0px;">
          <div id="profileItems" class="main-container">
          </div>
      </div>
      <!--PROFILE-->

      <!--HISTORY-->
      <div id="history" style="display:none; margin-top: -0px;">
          <div id="historyItems" class="main-container">
          </div>
      </div>
      <!--HISTORY-->

      <!--CHECK OUT-->
      <div id="checkOut" style="display:none;">

                <div id="scheduleItems" class="main-container">
                  <div id="schedule-page-interviewer-card" class="schedule-page-interviewer-card" style="margin-top: -0px;">
                  </div>
                  <div class="csslider">
                    <input type="radio" name="slides" id="slides_1" checked />
                    <input type="radio" name="slides" id="slides_2" />
                    <input type="radio" name="slides" id="slides_3" />
                    <input type="radio" name="slides" id="slides_4" />
                    <input type="radio" name="slides" id="slides_N" />
                    <ul>
                        <li>
                            <div class="schedule-page-card-div css-slider-card-div">
                                <div class="sc-left">
                                    <div class="ic-left-name">
                                        1 - select a service
                                    </div>
                                    <div class="sc-left-info">
                                        <div class="sc-left-info-title">
                                            <p style="text-transform: uppercase; font-weight: bold;">description of services</p>
                                        </div>
                                        <div id="scheduleDescription_remoteinterview" style="display:none;">
                                          <p style="font-weight: bold;">remote interview</p>You will be meeting with your mock interviwer online with A or B services.
                                          You can allocate your time on solely being interviwed or ask about specifics of the interview process.
                                          Having tips about a particular company's interviewing process is always helpful.
                                        </div>
                                        <div id="scheduleDescription_inpersoninterview" style="display:none;">
                                          <p style="font-weight: bold;">in-person interview around <span class="description-emphasis" id="scheduleLocality">redmond wa</span></p>You will meet with your mock interviewer in a place of your choice.
                                          You can allocate your time on solely being interviwed or ask about specifics of the interview process.
                                          Having tips about a particular company's interviewing process is always helpful.
                                        </div>
                                        <div id="scheduleDescription_resumereview" style="display:none;">
                                          <p style="font-weight: bold;">resume review ( ready in <span class="description-emphasis">4</span> days ! ) </p>Resume is your gateway to interviews. Preparing a good one is a burden. You will get help
                                          with spesifics of your CV, you will get feedback and specially prepare your resume for he companies and positions you aim for.
                                        </div>
                                        <div class="select-service-combobox-div">
                                            <select id="selectServiceComboBox">
                                                <option value="na">select a service...</option>
                                                <option value="ri">remote interview $250/hr</option>
                                                <option value="im">in-person interview $150/hr</option>
                                                <option value="rr">resume review $100/hr</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="schedule-page-card-div css-slider-card-div">
                                <div class="sc-left">
                                    <div class="ic-left-name">
                                        2 - upload your CV
                                    </div>
                                    <div class="sc-left-info">
                                        <div class="uploader-div">
					  <input type="file" id="uploadFile" name="uploadFile" onchange="startRead();"/><br>
                                          <span id="uploadButtonText"><span>
                                        </div>
                                        <div class="uploader-notice">don't feel like you are ready ?</div>
                                        <div class="uploader-notice">you can skip this step and upload your CV to your account later on</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="schedule-page-card-div css-slider-card-div" style="overflow: hidden;">
                                <div class="sc-left">
                                    <div class="ic-left-name">
                                        3 - pick a date
                                    </div>
                                    <div class="sc-left-info">
                                        <div class="sc-left-info-title">
                                            <div class="pick-a-date-title-left">
                                                <p><b>green means available</b></p>
                                            </div>
                                            <div class="pick-a-date-title-right">
                                                <p>your interviewer's timezone is <span id="scheduleTimezone" class="description-emphasis">pacific</span></p>
                                            </div>
                                        </div>
                                        <div class="sc-left-calendar-time-div">
                                            <div class="sc-left-calendar-div">
                                              <div id="calContainer">
                                                <div id="scheduleCal">
                                                </div>
                                              </div>
                                            </div>
                                            <div id="scheduleTime" class="sc-left-time-selection-div" style="margin-top: -50px;">
                                                <input type="radio" name="group1" value="7-8-AM"> 7:00 AM - 8:00 AM<br />
                                                <input type="radio" name="group2" value="8-9-AM"> 8:00 AM - 9:00 AM<br />
                                                <input type="radio" name="group3" value="9-10-AM"> 9:00 AM - 10:00 AM<br />
                                                <input type="radio" name="group4" value="10-11"> 10:00 AM - 11:00 AM<br />
                                                <input type="radio" name="group5" value="11-12"> 11:00 AM - 12:00 PM<br />
                                                <input type="radio" name="group6" value="12-8"> 12:00 PM - 1:00 PM<br />
                                                <input type="radio" name="group7" value="1-2"> 1:00 PM - 2:00 PM<br />
                                                <input type="radio" name="group8" value="2-3"> 2:00 PM - 3:00 PM<br />
                                                <input type="radio" name="group9" value="3-4"> 3:00 PM - 4:00 PM<br />
                                                <input type="radio" name="group10" value="4-5"> 4:00 PM - 5:00 PM<br />
                                                <input type="radio" name="group11" value="5-6"> 5:00 PM - 6:00 PM<br />
                                                <input type="radio" name="group12" value="6-7"> 6:00 PM - 7:00 PM<br />
                                                <input type="radio" name="group13" value="7-8"> 7:00 PM - 8:00 PM<br />
                                                <input type="radio" name="group14" value="8-9"> 8:00 PM - 9:00 PM<br />
                                            </div>
                                            <!--<div class="sc-left-schedule-button-div">
                                                <button class="sc-left-schedule-button">schedule</button>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="css-slider-card-div">
                                <div class="sc-left">
                                    <div class="ic-left-name">
                                        4 - payment
                                    </div>
                                    <div class="payment-divs">
                                        <div class="payment-card-left-div">
                                            <div id="payment-card-amount" class="payment-card-amount">2 hours of in person interview - $ 380</div>
                                        </div>
                                        <div class="payment-card-right-div">
                                            <div>
                                                <button class="sc-right-send" onclick='app.makePayment("paypal");'>pay with paypal</button>
                                            </div>
                                            <div class="paypal-image-div">
                                                <img alt="paypal logo" src="img/paypal.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="arrows">
                        <label for="slides_1"></label>
                        <label for="slides_2"></label>
                        <label for="slides_3"></label>
                        <label for="slides_4"></label>
                    </div>
                    <!--<div class="navigation">
                        <div>
                            <label for="slides_1"></label>
                            <label for="slides_2"></label>
                            <label for="slides_3"></label>
                            <label for="slides_4"></label>
                            <label for="slides_N"></label>
                        </div>
                    </div>-->
                </div>
                <div id="schedule-page-reviews" class="schedule-page-card-div">
                </div>
                </div>

      </div>
      <!--CHECK OUT-->

      <!--RETURN-->
      <div id="return" style="display:none;">
      </div>
      <!--RETURN-->

      <!--SOCIAL SHARE-->
      <div id="socialShare" style="display:none;">
      </div>
      <!--SOCIAL SHARE-->

      <!--RATE ME-->
      <div id="rateMe" style="display:none;">
      </div>
      <!--RATE ME-->

      <!--FEEDBACK FORM-->
      <div id="feedbackForm" style="display:none;">
      </div>
      <!--FEEDBACK FORM-->

      <!--SELECT SERVICES-->
      <div id="selectServices" style="display:none;">
      </div>
      <!--SELECT SERVICES-->

      <!--SELECT AVAILABILITY-->
      <div id="selectAvailability" style="display:none;">
      </div>
      <!--SELECT AVAILABILITY-->

      <!--COMPLETE GIVE HELP-->
      <div id="completeGiveHelp" style="display:none;">
      </div>
      <!--COMPLETE GIVE HELP-->

    </div><!--container-->




    <footer>
        <div class="holder-bottom">
            <div class="footer-section footer-section-1">
                <h6>Explore</h6>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Terms of Use Privacy</a></li>
                </ul>
            </div>
            <div class="footer-section footer-section-2">
                <h6>Sign Up</h6>
                <button class="footer-button">interviewer signup</button>
                <button class="footer-button">recruiter signup</button>
            </div>
            <div class="footer-section footer-section-3">
                <h6>Stay in touch</h6>
                <div class="share">
                    <ul>
                        <li class="fb"><a href="#">Facebook</a></li>
                        <li class="tw"><a href="#">Twitter</a></li>
                        <li class="in"><a href="#">Linkedin</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-section footer-section-4">
                <h6>Contact Us</h6>
                <form action="#">
                    <input type="text" placeholder="your name" />
                    <input type="email" placeholder="your e-mail" />
                    <button class="footer-button">contact us</button>
                </form>
            </div>
        </div>
    </footer>
    <!--<script type="text/javascript" src="js/flexslider/jquery.flexslider.js"></script>-->
    <!--<script type="text/javascript" src="js/custom.js"></script>-->

</body>

<script>



//$(window).load(function() {
//  $('.flexslider').flexslider({
//    animation: "slide"
//  });
//});


    $(function () {
        var cal = $("#providerCal").calendar({
            format: 'dd.mm.yyyy', //default 'yyyy-mm-dd'
            multiSelect: false, //default true (multi select date)
            startMode: 'day', //year, month, day
            //date: string, //the init calendar date (example: '2013-01-01' or '2012-01')
            locale: 'en', // 'ru', 'ua', 'fr' or 'en', default is $.Metro.currentLocale
            otherDays: true, // show days for previous and next months,
            weekStart: 0, //start week from sunday - 0 or monday - 1
            //getDates: function(d){...}, // see example below
            click: function (d) {
                //console.log('SELECTED: ' + d);
                var split = d.split(".");
                var year = parseInt(split[2], 10);
                var month = parseInt(split[1], 10);
                var day = parseInt(split[0], 10);

                //console.log(year+'/'+month+'/'+day);

                var dtPRV = new timezoneJS.Date(year, month - 1, day);
                //console.log(app.DAYS[dtPRV.getDay()]);

                var opts = new Array();
                opts[0] = 'Just this ' + app.DAYS[dtPRV.getDay()] + ' (' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear() + ')';
                opts[1] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getFullYear();
                opts[2] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + dtPRV.getFullYear();
                addOptions("calSelect", opts);

            } // fired when user clicked on day, in "d" stored date
        });
    })


</script>

</html>
