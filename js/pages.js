    var step = 1;
    var firstCalShow = true;

    timezoneJS.timezone.zoneFileBasePath = '/TIMEZONE';
    timezoneJS.timezone.init();




    function showHome(give)
    {
      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(!give)
      {
      document.getElementById("step").src="./images/step1.png";
/*
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSearch();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showCheckOut();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
*/
      document.getElementById("step2").onclick=function() {showSearch();};
      document.getElementById("step3").onclick=function() {showCheckOut();};
      }
      else
      {
      document.getElementById("step").src="./images/step1_helper.png";
/*
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSelectServices();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showSelectAvailability();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
*/
      document.getElementById("step2").onclick=function() {showSelectServices();};
      document.getElementById("step3").onclick=function() {showSelectAvailability();};
      }

      //document.getElementById('explore').value = "Find interviewers from diverse industries and companies";
      //document.getElementById('explore').style.color = '#898989';
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
 
      document.getElementById('explore').value = '';


      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "";
      document.getElementById("slider").style.display = "";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      document.getElementById("step").src="./images/step2.png";


/*
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome();};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showCheckOut();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
*/
      document.getElementById("step1").onclick=function() {showHome();};
      document.getElementById("step2").onclick=function() {showSearch();};
      document.getElementById("step3").onclick=function() {showCheckOut();};


      populateFilters();
      collapseAllFilters();
      clearAllFilters();
      doSearch(arg || "");

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


      document.getElementById('explore').value = '';

      if(n) {step = n;}

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      //document.getElementById("step").src="./images/step3.png";
/*
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome();};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSearch();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
*/
      //document.getElementById("step1").onclick=function() {showHome();};
      //document.getElementById("step2").onclick=function() {showSearch();};

      populateFilters();
      collapseAllFilters();
      clearAllFilters();
      doHistory();
    }


    function showCheckOut()
    {
      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";


      document.getElementById("step").src="./images/step3.png";
/*
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome();};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSearch();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome();} else if(step==2){showSearch();} else if(step==3){showCheckOut();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
*/
      document.getElementById("step1").onclick=function() {showHome();};
      document.getElementById("step2").onclick=function() {showSearch();};
      document.getElementById("step3").onclick=function() {showCheckOut();};


      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      document.getElementById("scrollbar").style.zIndex = 55;
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      loadCartItems("cartItems", false);
    }


    function showReturn()
    {

      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      document.getElementById("getStarted").style.display='none';
      //document.getElementById("returnLogin").style.display='';

      waitLoading4();
    }


    function showShare(elID)
    {

      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      document.getElementById("getStarted").style.display='none';
      //document.getElementById("returnLogin").style.display='';

      waitLoading5();

    }


    function showRateMe()
    {

      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "";
      document.getElementById("feedbackForm").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      document.getElementById("getStarted").style.display='none';
      //document.getElementById("returnLogin").style.display='';

      waitLoading6();

    }


    function showFeedbackForm()
    {

      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("feedbackForm").style.display = "";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";

      if(document.getElementById("showCal")) {document.getElementById("showCal").style.display = 'none';}
      if(document.getElementById("apptScheduler")) {document.getElementById("apptScheduler").style.display='none';}
      if(document.getElementById("scrollbar")) {document.getElementById("scrollbar").style.zIndex = 55;}
      if(document.getElementById("screen")) {document.getElementById("screen").style.display='none';}

      document.getElementById("getStarted").style.display='none';
      //document.getElementById("returnLogin").style.display='';

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

      document.getElementById('explore').value = '';

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
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

/*
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome(true);};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step3").onmouseover=function() {this.style.cursor="pointer"; showSelectAvailability();};
      document.getElementById("step3").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step3").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 3;};
*/
      document.getElementById("step1").onclick=function() {showHome(true);};
      document.getElementById("step2").onclick=function() {showSelectServices();};
      document.getElementById("step3").onclick=function() {showSelectAvailability();};

      if(user[0].inID)
      {
        if(settings[user[0].inID])
        {
          setGroup("infoConfidential", settings[user[0].inID]['identity']);
        }
      }

    }

    function showSelectAvailability(n)
    {
      document.getElementById('explore').value = '';

      if(n) {step = n;}

      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "none";
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
      populateTimeZones();


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

/*
      document.getElementById("step1").onmouseover=function() {this.style.cursor="pointer"; showHome(true);};
      document.getElementById("step1").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step1").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 1;};
      document.getElementById("step2").onmouseover=function() {this.style.cursor="pointer"; showSelectServices();};
      document.getElementById("step2").onmouseout=function() {if(step==1){showHome(true);} else if(step==2){showSelectServices();} else if(step==3){showSelectAvailability();}};
      document.getElementById("step2").onclick=function() {this.onmouseover=""; this.onmouseout=""; step = 2;};
*/
      document.getElementById("step1").onclick=function() {showHome(true);};
      document.getElementById("step2").onclick=function() {showSelectServices();};
      document.getElementById("step3").onclick=function() {showSelectAvailability();};

      firstCalShow = false;
    }







    function showCompleteGiveHelp()
    {
      document.getElementById('explore').value = '';

      //showCalendar(document.getElementById("headerClearfix"));
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "";
      document.getElementById("step").src="./images/step3_helper.png";
      //console.log(JSON.stringify(mail));
      //console.log(user[0].inID);//FE77HfB5Pw

      var d = new Date();
      var tzOffset = d.getTimezoneOffset();


      //var dt = new timezoneJS.Date();
      //console.log(dt.getTimezoneOffset()); //=> 540
      //console.log(dt.getTimezone()); //=> 'Asia/Tokyo'
      //var zone = get_timezone_id();
      //console.log(zone);
      var e = document.getElementById("tzSelect");
      var tzName = e.options[e.selectedIndex].value;

      //console.log(tzName);

      var mailObj = {};
      mailObj.anyNew = newMail;
      mailObj.mail = mail;


      $.ajax({url:"./saveData.php", 
              data: {id: user[0].inID, linkedINprofile: Ext.JSON.encode(user[0].linkedINprofile), tzName: tzName, email: user[0].email, education: user[0].education, role: 'give', services: JSON.stringify(services), calendar: JSON.stringify(schedule), mail: JSON.stringify(mailObj), cart: JSON.stringify(cartItems) },
              type:'post',
              async:false
      });

      if(!productStore.getById(user[0].inID))
      {
        var myNewRecord = [
        {
          inID: user[0].inID,
          role: 'give',
          providedServices: JSON.stringify(services),
          calendar: JSON.stringify(schedule)
        }];
        productStore.loadData(myNewRecord, true);
      }
      productStore.getById(user[0].inID).data.calendar = JSON.stringify(schedule);
      productStore.getById(user[0].inID).data.providedServices = JSON.stringify(services);
      productStore.getById(user[0].inID).data.email = user[0].email;
      productStore.getById(user[0].inID).data.education = user[0].education;
      productStore.getById(user[0].inID).data.role = 'give';
      productStore.getById(user[0].inID).data.first = user[0].first;
      productStore.getById(user[0].inID).data.last = user[0].last;
      productStore.getById(user[0].inID).data.company = user[0].company;
      productStore.getById(user[0].inID).data.position = user[0].position;
      productStore.getById(user[0].inID).data.image = user[0].image;
      productStore.getById(user[0].inID).data.url = user[0].url;
    }



    function showHowItWorks()
    {
      document.getElementById("home").style.display = "none";
      document.getElementById("howItWorks").style.display = "";
      document.getElementById("search").style.display = "none";
      document.getElementById("slider").style.display = "none";
      document.getElementById("profile").style.display = "none";
      document.getElementById("checkOut").style.display = "none";
      document.getElementById("return").style.display = "none";
      document.getElementById("socialShare").style.display = "none";
      document.getElementById("rateMe").style.display = "none";
      document.getElementById("selectServices").style.display = "none";
      document.getElementById("selectAvailability").style.display = "none";
      document.getElementById("completeGiveHelp").style.display = "none";
    }

