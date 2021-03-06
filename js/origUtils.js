//Need to bulletproof productStore.getById and document.getElementById like in 'loadCartItems'

var formItems = {"communication skills":"","technical knowledge":"","seniority level":"","overall feedback":""};

var filters = {"industry":"", "company":"", "rating":['5 star','4 star','3 star','2 star', '1 star', '0 star'], "experience":['40+ years', '30-39 years', '20-29 years', '10-19 years', '5-9 years', '0-4 years'], "services":['In-person Interview','Remote Interview','Interview Mentoring','Resume Review'], "price":['FREE', '$0.01-49/hr', '$50-99/hr', '$100-149/hr' , '$150-199/hr', '$200-249/hr', '$250+/hr']};

var historyFilters = {"status":['Scheduled','Waiting Feedback','Completed'], "date":['< 1 month ago', '1-3 months ago', '4-6 months ago', '7-12 months ago', '> 1 year ago'], "companyH":""};

var historyType = '';

linkedINlogin = false;


var filterCounts = {};
filterCounts.industry = {};
filterCounts.company = {};
filterCounts.rating = {};
filterCounts.experience = {};
filterCounts.services = {};
filterCounts.price = {};

var paymentReturn = false;
var socialShareReturn = false;
var rateReturn = false;
var feedbackReturn = false;
var returnParameters = {};

var gStars = 0;
var subTotals = {};
var subTotalsSaved = {};
var total = 0;
var curr = 0;
var initStr = new Array();
var historyItemKeyArray = new Array();
var scrolled = 0;
var scrollHeight = 200;

var loading;
var lockScroll = 0;
var linkedinLoaded = false;
var scheduleLoaded = false;
var servicesLoaded = false;
var usersLoaded = false;
var mailLoaded = false;

var user = {};
var services = {};
var schedule = {};
var mail = {};
var newMail = false;
var settings = {};
//var history = {};
var mailMessage = new Array();

var currUserID = new Array();
var userList = {};
//var madeAppts = {};

var currSelectedSchedule = {};

var cartItems = {};
var cartItemsReturn = {};

//var dateArray = ["10/25/2013","10/27/2013","10/29/2013","10/30/2013"];
var dateArray = [];
var dayArray = [];
var dayNumber;
var dayIndex;
var monthIndex;
var year;


window.isDirty = false;
window.role = '';
window.newUser;

var dayNames = [
		   "Sunday",
		   "Monday",
		   "Tuesday",
		   "Wednesday",
		   "Thursday",
		   "Friday",
		   "Saturday"
               ];

var monthNames = [ 
		     "January",
		     "February",
		     "March",
		     "April",
		     "May",
		     "June",
		     "July",
		     "August",
		     "September",
		     "October",
		     "November",
		     "December"
		 ];


var today = new Date();
var tomorrow = new Date();
today.setDate(today.getDate()+0);   
tomorrow.setDate(today.getDate()+1);   




/*
// define the calendar.
    var dp2 = new Ext.DatePicker({
        //renderTo: 'calendar2',
        id: 'myCal',
        style: 'opacity: 1; filter: alpha(opacity=100); color: #666666;',
        format:"d/m/Y",
        disabledDates:["^(?!"+dateArray.join("|")+").*$"],
        disabledDatesText:"I'm not available this day",
        minText: "",
        showToday: false
    });



Ext.override(Ext.getCmp('myCal'), {
    fullUpdate: function(date){
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;


        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function(cell, cls){
            value = +eDate.clearTime(current, true);
            //console.log(current);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if(value == today){
                cls += ' ' + me.todayCls;
                cell.title = me.todayText;
                
                // Extra element for ARIA purposes
                me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                    tag:'span',
                    cls: Ext.baseCSSPrefix + 'hide-clip',
                    html:me.todayText
                }, true);
            }
            if(value == newDate) {
                cls += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
                if (visible && me.floating) {
                    Ext.fly(cell.firstChild).focus(50);
                }
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                cell.title = me.minText;
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1){
                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format){
                formatValue = eDate.dateFormat(current, format);
                if(ddMatch.test(formatValue)){
                    cell.title = ddText.replace('%0', formatValue);
                    cls += ' ' + disabledCls;
                }
            }
            cell.className = cls + ' ' + me.cellCls;
        };

        for(; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
        //console.log("HERE");
        for (var day in schedule)
        {
	  //console.log(day);
          var title = schedule[day];
          addSchedule(me, day, title);
        }
    }
});
*/



  function waitUsersLoaded()
  {
    if(!usersLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitUsersLoaded()', 500);
    }
    else {loadInfoFromLinkedIn();}
  }

  


  function waitLoading()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading()', 500);
    }
    else {showSearch("",2);}
  }

  function waitLoading2()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading2()', 500);
    }
    else {showSelectServices(2);}
  }

  function waitLoading3()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading3()', 500);
    }
    else
    {
      var role = productStore.getById(user[0].inID).data.role;
      //console.log("ROLE: " + role + " CURR: " + window.role);
      if(paymentReturn || socialShareReturn || rateReturn || feedbackReturn) {return false;}
      if(window.role == 'find')      {showSearch("",2);}
      else if(window.role == 'give') {showSelectServices(2);}
      else if (role == 'find')       {showSearch("",2);}
      else if( role == 'give')       {showSelectServices(2);}
    }
  }

  function waitLoading4()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading4()', 500);
    }
    else {serviceReturn();}
  }

  function waitLoading5()
  {
    if(!usersLoaded)
    {
      countdown = setTimeout('waitLoading5()', 500);
    }
    else {populateShareElement();}
  }

  function waitLoading6()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading6()', 500);
    }
    //else {populateRateForm();}
    else {historyType = 'interviewee'; window.showProfile(); pingProvider();}
  }

  function waitLoading7()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading7()', 500);
    }
    //else {populateFeedbackForm();}
    else
    {
      historyType = 'interviewer';
      window.showProfile();
      //historyClicked('{}', JSONKey, ID, false);
      doFeedback();
    }
  }

  function waitLoading8()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      //console.log("user[0]: " + user[0] + " user[0].inID: " + user[0].inID + " productStore.getById(user[0].inID): " + productStore.getById(user[0].inID) + " usersLoaded: " + usersLoaded + " linkedinLoaded: " + linkedinLoaded + " linkedINlogin: " + linkedINlogin);
      countdown = setTimeout('waitLoading8()', 500);
    }
    else {loadMail(); populateSideBarMenu();}
  }

  function waitLoading9()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading9()', 500);
    }
    else {loadFeedbackCount();}
  }

  function waitLoading10()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading10()', 500);
    }
    else {window.showSearch(document.getElementById('explore').value,2);}
  }

  function waitLoading11()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading11()', 500);
    }
    else
    {
      window.showProfile();

      var JSONKey = returnParameters.KEY ;
      var ID = returnParameters.ID;

      var feedback = {};
      var JSONStr = '';

      if(productStore.getById(ID))
      {
        feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
        JSONStr = Ext.JSON.encode(feedback[JSONKey]);
        //console.log(JSONKey);
      }

      var split = JSONKey.split(/\:/);
      var myID = split[0];
      var day = split[1];
      
      //console.log(myID + '==' + user[0].inID);
      if(feedback[JSONKey])
      {
        historyClicked(JSONStr,JSONKey,ID,false);
      }
    }
  }


  function waitLoading12()
  {
    if(!user[0] || !productStore.getById(user[0].inID) || !usersLoaded || !linkedinLoaded || !linkedINlogin)
    {
      countdown = setTimeout('waitLoading12()', 500);
    }
    else {loadCartAtStartup();}
  }




var inProfile;

//<!-- NOTE: be sure to set onLoad: onLinkedInLoad -->
/*
    function onLinkedInLoad() {
      IN.Event.on(IN, "auth", function() {onLinkedInLogin(); waitUsersLoaded(); if(window.role == 'find') {waitLoading();} else if(window.role == 'give') {waitLoading2();} document.getElementById("headercontent").style.display=''; document.getElementById("header2content").style.display=''; document.getElementById("login").style.display=''; document.getElementById("getStarted").style.display='none'; document.getElementById("returnLogin").style.display='none'; waitLoading3();  });
      IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
    }
*/
    function onLinkedInLoad() {
      IN.Event.on(IN, "auth", function() {onLinkedInLogin(); waitUsersLoaded(); document.getElementById("headercontent").style.display=''; document.getElementById("header2content").style.display=''; document.getElementById("login").style.display=''; document.getElementById("getStarted").style.display='none'; document.getElementById("returnLogin").style.display='none'; waitLoading3();  });
      IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
    }


  function loadInfoFromLinkedIn()
  {
    //console.log('loadInfoFromLinkedIn');
    loading = productStore.getCount();
    //console.log(loading);
    var data = {};
    data._total = 0;
    data.values = {};
    productStore.data.each(function(item, index, totalItems)
    {
      //console.log("PUSHING: " + item.get('inID'));
      currUserID.push(item.get('inID'));
      userList[item.get('inID')] = true;
      if(productStore.getById(item.get('inID')))
      {
        if(productStore.getById(item.get('inID')).data.linkedINprofile)
	{
          data.values[item.get('inID')] = productStore.getById(item.get('inID')).data.linkedINprofile ? Ext.JSON.decode(productStore.getById(item.get('inID')).data.linkedINprofile) : {};
          data._total++;
	}
      }
      

      //console.log(item.get('inID'));
      //console.log(productStore.getById(item.get('inID')).data.inID);
    }); //productStore.data.each

    if(!currUserID.length) {return;}

    //console.log("LOGGED IN: " + linkedINlogin);
    if(linkedINlogin && 0)
    {
      IN.API.Profile(currUserID)
        .fields(["id", "firstName", "lastName", "pictureUrls::(original)", "pictureUrl", "publicProfileUrl", "headline", "location:(name)", "industry", "summary", "positions"])
        .result(function(result) {loadUserData(result); })
        .error(function(err) {alert('LinkedIn API error<br>' + err + '<br>Please reload the page');});//.error(function(err)
    }
    else
    {
      //console.log("DATA: " + data.values + "SIZE: " + Object.size(data.values));
      if(Object.size(data.values)) {loadUserData(data);}
    }

  } //loadInfoFromLinkedIn()




  function loadUserData(result) 
  {
    //console.log('loadUserData');

    filterCounts.industry = {};
    filterCounts.company = {};
    filterCounts.rating = {};
    filterCounts.experience = {};
    filterCounts.services = {};
    filterCounts.price = {};

    filters.industry = new Array();
    filters.company = new Array();

    //console.log(result);
    //console.log("TOTAL: " + result['_total']);

      for(var key in result.values)
      {
        //console.log("KEY: " + key + " = " + result.values[key]); console.log(result.values[key]);
        var profile = result.values[key];
        //console.log("FOUND: " + profile.id);
        delete userList[profile.id];
        //if(result.values[key]) {console.log(result.values[key].headline);}
 
        //console.log(profile);

        var inID = profile.id;
        var first = profile.firstName;
        var last = profile.lastName;
        var summary = '';
        var tenure = 0;
        var totalTenure = new Array();
        var company = '--';
        var position = '--';
        var industry = '--';
        var email = profile.emailAddress;
        var imAccount = '';
        var phoneNumber = '';
        var summary = '--';
        var tenure = 0;
        var company = '--';
        var position = '--';
        var image = profile.pictureUrls.values ? profile.pictureUrls.values[0] : "./images/ghost.png";
        var url = profile.publicProfileUrl;
        var education = '';

        if(profile.educations.values)
        {
          for(var i = 0; i < profile.educations.values.length; i++)
	  {
	    education += profile.educations.values[i].schoolName + ' [' + profile.educations.values[i].degree + ' ' + profile.educations.values[i].fieldOfStudy + ']' + '<br>';
	  }
        }


        if(profile.positions.values)
        {
	  summary = JSON.stringify(profile.positions.values[0].summary) || '--';
          summary = summary.replace(/\\n/g, '<br />');
          summary = summary.replace(/\\t/g, '  ');

          var d = new Date();
          var c = d.getFullYear();
          if(profile.positions.values[0].startDate) {tenure = c - (profile.positions.values[0].startDate.year || d.getFullYear());}

          company = profile.positions.values[0].company.name || '--';
          position = profile.positions.values[0].title || '--';
 
          //for(var i = 0; i < profile.positions.values.length; i++) {console.log(profile.positions.values[i].company.name);}
        }
        if(profile.imAccounts.values)
        {
          for(var i = 0; i < profile.imAccounts.values.length; i++)
	  {
	    //console.log(profile.imAccounts.values[i].type.name);
            if(profile.imAccounts.values[i].type == 'skype') {imAccount = profile.imAccounts.values[i].type.name;}
	  }
          if(!imAccount) {imAccount = profile.imAccounts.values[0].type.name;}
        }
        if(profile.phoneNumbers.values)
        {
          for(var i = 0; i < profile.phoneNumbers.values.length; i++)
	  {
	    //console.log(profile.phoneNumbers.values[i].type.number);
            if(profile.phoneNumbers.values[i].type == 'mobile') {phoneNumber = profile.phoneNumbers.values[i].type.number;}
	  }
          if(!phoneNumber) {phoneNumber = profile.phoneNumbers.values[0].type.number;}
        }

        //document.getElementById("loginbadge").innerHTML = '';
        //document.getElementById("companyBox").innerHTML = profile.positions.values[0].company.name;
        //document.getElementById("titleBox").innerHTML = profile.positions.values[0].title;
        //document.getElementById("bioBox").innerHTML = summary;
        //document.getElementById("tenureBox").innerHTML = tenure + ' years';

        //document.getElementById("picture-url").style.backgroundImage="url(\'" + pictureUrl + "\')";
        //document.getElementById("firstName").innerHTML = profile.firstName;
        //createCookie('INID', profile.id);
        //inID = profile.id;
        //console.log("PUSHING");





        if(profile.summary) {summary = JSON.stringify(profile.summary);}

        
        //console.log(profile.positions);
        if(profile.positions.values)
        {
          //console.log(profile);
          for(var i = 0; i < profile.positions.values.length; i++)
	  {
            var d = new Date();
            var c = d.getFullYear();
            var endDate = {};
            endDate.year = c;
            if(profile.positions.values[i].endDate) {endDate.year = profile.positions.values[i].endDate.year;}
            if(profile.positions.values[i].startDate) {tenure = endDate.year - profile.positions.values[i].startDate.year;}

            if(!totalTenure[profile.positions.values[i].company.name]) {totalTenure[profile.positions.values[i].company.name] = 0;} totalTenure[profile.positions.values[i].company.name] += parseInt(tenure,10);
            if(!totalTenure[profile.positions.values[i].company.industry]) {totalTenure[profile.positions.values[i].company.industry] = 0;} totalTenure[profile.positions.values[i].company.industry] += parseInt(tenure,10);
            if(!totalTenure[profile.positions.values[i].title]) {totalTenure[profile.positions.values[i].title] = 0;} totalTenure[profile.positions.values[i].title] += parseInt(tenure,10);

            summary += JSON.stringify(profile.positions.values[i].summary);

	  }

          //summary = JSON.stringify(profile.positions.values[0].summary);
          summary = summary.replace(/\\n/g, '<br />');
          summary = summary.replace(/\\t/g, '  ');

          var d = new Date();
          var c = d.getFullYear();
          if(profile.positions.values[0].startDate) {tenure = c - profile.positions.values[0].startDate.year;} else {tenure = 0;}

          company = profile.positions.values[0].company.name || '--';
          industry = profile.positions.values[0].company.industry || '--';
          position = profile.positions.values[0].title || '--';

        }
        //console.log(company);


        //TODO: NEED TO MOVE TO POST FILTER
        var services = productStore.getById(inID).data.providedServices ? Ext.JSON.decode(productStore.getById(inID).data.providedServices) : {};
        var numServices = Object.size(services);

	if(numServices && (productStore.getById(inID).data.role === 'give' || productStore.getById(inID).data.role === 'both'))
	{

        var found = 0;
        if(!filters.industry) {filters.industry = new Array();}
        for(var i = 0; i < filters.industry.length; i++) {if(filters.industry[i] === industry) found++;}
        if(!found) {filters.industry.push(industry);}


        found = 0;
        if(!filters.company)  {filters.company = new Array();}
        for(var i = 0; i < filters.company.length; i++) {if(filters.company[i] === company) found++;}
        if(!found) {filters.company.push(company);}

        if(!filterCounts.industry[industry]) filterCounts.industry[industry] = 0;
        if(!filterCounts.company[company]) filterCounts.company[company] = 0;

        filterCounts.industry[industry]++;
        filterCounts.company[company]++;


        // --Services--
        var LO = 999999;
        var HI = 0;
	//var serviceItems = new Array();
        //services = productStore.getById(inID).data.providedServices ? Ext.JSON.decode(productStore.getById(inID).data.providedServices) : {};
        for (var key in services)
        {
	  //serviceItems.push(key);
          if(!filterCounts.services[key]) filterCounts.services[key] = 0;
          filterCounts.services[key]++;
          if(parseFloat(services[key].price) < LO) {LO = parseFloat(services[key].price);}
          if(parseFloat(services[key].price) > HI) {HI = parseFloat(services[key].price);}
        }

        // --Rating --
        var ratingObj = productStore.getById(inID).data.reviews ? Ext.JSON.decode(productStore.getById(inID).data.reviews) : {};
        var rating = Math.ceil(ratingObj.average) || 0;






        for(var key in filters)
	{

	  if(key == 'price')
	  {
	    //console.log("PRICE");
	    var items = filters[key];
	    for(var i = 0; i < items.length; i++)
	    {
	      var item = items[i];
              //console.log(item);
	      item = item.replace('/hr','');
	      item = item.replace(/\$/g,'');
              item = item.replace('FREE', '0');
              item = item.replace('+', '-999999');
	      var split = item.split('-');
	      var priceLO = parseFloat(split[0]);
              var priceHI = parseFloat(split[1]) || parseFloat('0');
              //console.log(LO + "->" + " LO: " + priceLO + " HI: " + priceHI);
	      if(LO >= priceLO && LO <= priceHI)
              {
		productStore.getById(inID).data.price = items[i];
		if(!filterCounts.price[items[i]]) filterCounts.price[items[i]] = 0;
		filterCounts.price[items[i]]++;
	      }
	    }
	    //console.log("SET TO: " + productStore.getById(inID).data.price);
	  }
	  else if(key == 'rating')
	  {
	    //console.log("PRICE");
	    var items = filters[key];
	    for(var i = 0; i < items.length; i++)
	    {
	      var item = items[i];
              //console.log(item);
	      item = item.replace(/\s*star/,'');
	      var star = parseInt(item,10);
              //console.log(LO + "->" + " LO: " + priceLO + " HI: " + priceHI);
	      if(rating == star)
	      {
		productStore.getById(inID).data.rating = items[i];
		if(!filterCounts.rating[items[i]]) filterCounts.rating[items[i]] = 0;
		filterCounts.rating[items[i]]++;
	      }
	    }
	    //console.log("SET TO: " + productStore.getById(inID).data.rating);
	  }
	  else if(key == 'experience')
	  {
	    //console.log("EXPERIENCE");
	    var items = filters[key];
	    for(var i = 0; i < items.length; i++)
	    {
	      var item = items[i];
              //console.log(item);
	      item = item.replace(/\s*years/,'');
	      var split = item.split('-');
	      var expLO = parseFloat(split[0]);
              var expHI = parseFloat(split[1]) || parseFloat('0');
              var experience = parseInt(totalTenure[industry],10) || 0;
              //console.log(experience + "->" + " LO: " + expLO + " HI: " + expHI);
	      if(experience >= expLO && experience <= expHI)
	      {
		productStore.getById(inID).data.experience = items[i];
		if(!filterCounts.experience[items[i]]) filterCounts.experience[items[i]] = 0;
		filterCounts.experience[items[i]]++;
	      }
	    }
	    //console.log("SET TO: " + productStore.getById(inID).data.experience);
	  }


	}

        //if(!serviceItems.length) {filterCounts.price = {};}
	}


	/*
	var serviceItems = new Array();
        services = productStore.getById(inID).data.providedServices ? Ext.JSON.decode(productStore.getById(inID).data.providedServices) : {};
        for (var key in services)
        {
	  serviceItems.push(key);
	}
        productStore.getById(inID).data.services = serviceItems;
	*/




        //console.log(inID);
        //console.log(first);
        //console.log(profile.positions.values[0].company.name);
        productStore.getById(inID).data.first = first
        productStore.getById(inID).data.last = last;
        productStore.getById(inID).data.company = company;
        productStore.getById(inID).data.companyTenure = totalTenure[company];
        productStore.getById(inID).data.industry = industry;
        productStore.getById(inID).data.industryTenure = totalTenure[industry];
        productStore.getById(inID).data.position = position;
        productStore.getById(inID).data.summary = summary;
	productStore.getById(inID).data.email = email;
	productStore.getById(inID).data.education = education;
        productStore.getById(inID).data.imAccount = imAccount;
        productStore.getById(inID).data.phoneNumber = phoneNumber;
        productStore.getById(inID).data.image = profile.pictureUrls.values ? profile.pictureUrls.values[0] : "./images/ghost.png";
        productStore.getById(inID).data.imageSmall = profile.pictureUrl || "./images/ghostSmall.png";
        productStore.getById(inID).data.url = profile.publicProfileUrl;
        productStore.getById(inID).data.isDirty = false;
        
        //console.log(profile.id);
        //console.log(productStore.getById(inID).data.company);
        //console.log(productStore.getById(inID).data.image);
        loading--;
        //console.log(loading);
      }//for(var key in result.values)

      //Delete any invalid id's
      for(var key in userList)
      {
	if(linkedINlogin)
        {
          //console.log("Removing record: " + key);
	  if(productStore.getById(key)) {productStore.remove(productStore.getById(key));}
	}
        for(var index = 0; index < initStr.length; index++)
        {
 
          var ID = initStr[index].id;
          //console.log("ID: " + ID);

          if(ID === key) {delete initStr[index];}
	}
        if(0)
	  {
        productStore.remove(productStore.getById(key));
        $.ajax({url:"./deleteUser.php", 
          data: {id: key},
          type:'post',
          async:false
        });
	  }
      }

      filters.industry = filters.industry ? filters.industry.sort() : {};
      filters.company = filters.company ? filters.company.sort() : {};

      linkedinLoaded = true & linkedINlogin;
  }









    function onLinkedInLogout() {
      setLoginBadge(false);
      window.location="index.php";
    }

    function onLinkedInLogin() {
      // we pass field selectors as a single parameter (array of strings)
      IN.API.Profile("me")
	.fields(["emailAddress", "imAccounts", "phoneNumbers", "id", "firstName", "lastName", "pictureUrls::(original)", "pictureUrl", "publicProfileUrl", "headline", "location:(name)", "industry", "summary", "positions", "educations"])
      .result(function(result) {
        inProfile = result.values[0];
        setLoginBadge(result.values[0]);
      })
      .error(function(err) {
          alert('LinkedIn API error<br>' + err + '<br>Please reload the page');
      });
    }

    function setLoginBadge(profile)
    {
      linkedINlogin = true;
      if (!profile) {
        profHTML = '<a href="#" onclick="IN.User.authorize(); return true;">login</a>';
        services = {};
        schedule = {};
        mail = {};
        initStr = [];
        scheduleLoaded = false;
        servicesLoaded = false;
        mailLoaded = false;
        productStore.removeAll(true);
        window.location.href = "";
      }
      else
      {
        var pictureUrl = profile.pictureUrl || "http://static02.linkedin.com/scds/common/u/img/icon/icon_no_photo_80x80.png";

        //profHTML = 'Welcome ' + profile.firstName + ' ' + ' <div onclick="IN.User.logout();"><img src="images/logoutLittle-up.png" style="height: 25px;" onmouseover="this.src=\'images/logoutLittle-dn.png\';" onmouseout="this.src=\'images/logoutLittle-up.png\';"/></div><div style="position: absolute; top: 0px; left: 80px;"><div class="dropdown-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'dropdown-dn\';" onmouseout="this.className=\'dropdown-up\';" onclick="showSettings();"></div></div>';
        profHTML = 'Welcome ' + profile.firstName + ' ';
      }

      document.getElementById("login").innerHTML = profHTML;

      //console.log(profile);
      //console.log("EMAIL: " + profile.emailAddress);
      var inID = profile.id;
      var first = profile.firstName;
      var last = profile.lastName;
      var email = profile.emailAddress;
      var imAccount = '';
      var phoneNumber = '';
      var summary = '--';
      var tenure = 0;
      var company = '--';
      var position = '--';
      var image = profile.pictureUrls.values ? profile.pictureUrls.values[0] : "./images/ghost.png";
      var url = profile.publicProfileUrl;
      var education = '';

      if(profile.educations.values)
      {
        for(var i = 0; i < profile.educations.values.length; i++)
	{
	  education += profile.educations.values[i].schoolName + ' [' + profile.educations.values[i].degree + ' ' + profile.educations.values[i].fieldOfStudy + ']' + '<br>';
	}
      }


      if(profile.positions.values)
      {
	summary = JSON.stringify(profile.positions.values[0].summary) || '--';
        summary = summary.replace(/\\n/g, '<br />');
        summary = summary.replace(/\\t/g, '  ');

        var d = new Date();
        var c = d.getFullYear();
        if(profile.positions.values[0].startDate) {tenure = c - (profile.positions.values[0].startDate.year || d.getFullYear());}

        company = profile.positions.values[0].company.name || '--';
        position = profile.positions.values[0].title || '--';
 
        //for(var i = 0; i < profile.positions.values.length; i++) {console.log(profile.positions.values[i].company.name);}
      }
      if(profile.imAccounts.values)
      {
        for(var i = 0; i < profile.imAccounts.values.length; i++)
	{
	  //console.log(profile.imAccounts.values[i].type.name);
          if(profile.imAccounts.values[i].type == 'skype') {imAccount = profile.imAccounts.values[i].type.name;}
	}
        if(!imAccount) {imAccount = profile.imAccounts.values[0].type.name;}
      }
      if(profile.phoneNumbers.values)
      {
        for(var i = 0; i < profile.phoneNumbers.values.length; i++)
	{
	  //console.log(profile.phoneNumbers.values[i].type.number);
          if(profile.phoneNumbers.values[i].type == 'mobile') {phoneNumber = profile.phoneNumbers.values[i].type.number;}
	}
        if(!phoneNumber) {phoneNumber = profile.phoneNumbers.values[0].type.number;}
      }

      //document.getElementById("loginbadge").innerHTML = '';
      //document.getElementById("companyBox").innerHTML = profile.positions.values[0].company.name;
      //document.getElementById("titleBox").innerHTML = profile.positions.values[0].title;
      //document.getElementById("bioBox").innerHTML = summary;
      //document.getElementById("tenureBox").innerHTML = tenure + ' years';

      //document.getElementById("picture-url").style.backgroundImage="url(\'" + pictureUrl + "\')";
      //document.getElementById("firstName").innerHTML = profile.firstName;
      //createCookie('INID', profile.id);
      //inID = profile.id;
      //console.log("PUSHING");



      $.ajax({
        url: "./isNewUser.php",
	data: {id: inID},
        cache: false,
	type:'post',
	async:false,
	success: function(response){window.newUser = (response==='true') ? true : false;}
      });

      //console.log("NEW USER: " + window.newUser);

      if(window.newUser)
      {
        var d = new Date()
        var tzOffset = d.getTimezoneOffset();
        //var tzName = get_timezone_id();

        var tzName = jstz.determine().name(); // Determines the time zone of the browser client
        //console.log(tzName);


        var mailObj = {};
        mailObj.anyNew = newMail;
        mailObj.mail = mail;


        $.ajax({url:"./saveData.php", 
              data: {id: inID, linkedINprofile: Ext.JSON.encode(profile), tzName: tzName, role: window.role, services: JSON.stringify(services), calendar: JSON.stringify(schedule), mail: JSON.stringify(mailObj), cart: JSON.stringify(cartItems) },
              type:'post',
	      async:false,
	      success: function(response){var myNewRecord = [{ inID: inID,linkedINprofile: JSON.stringify(profile),tzName: tzName,role: window.role}]; productStore.loadData(myNewRecord, true);}
        });
      }
      else
      {
        $.ajax({url:"./updateData.php", 
	      data: {id: inID, linkedINprofile: Ext.JSON.encode(profile) },
              type:'post',
              async:true
        });
      }

      //user.push({inID: inID, linkedINprofile: profile, first: first, last: last, company: company, position: position, image: image, url: url, email: email, imAccount: imAccount, phoneNumber: phoneNumber, education: education});


        var myNewRecord = [
        {
          inID: inID,
          linkedINprofile: profile
        }];
        productStore.loadData(myNewRecord, true);


        productStore.getById(inID).data.first = first
        productStore.getById(inID).data.last = last;
        productStore.getById(inID).data.company = company;
        productStore.getById(inID).data.position = position;
        productStore.getById(inID).data.education = education;
	productStore.getById(inID).data.email = email;
        productStore.getById(inID).data.imAccount = imAccount;
        productStore.getById(inID).data.phoneNumber = phoneNumber;
        productStore.getById(inID).data.image = image;
        productStore.getById(inID).data.url = url;
        productStore.getById(inID).data.isDirty = false;





      if(!settings[inID]) {settings[inID] = {};}

      waitLoading8();  //loadMail()
      //loadSchedule();
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
    var replacement = '\n'
    value = value.replace(new RegExp(replacement, 'g'), '->');
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
  function deleteCookie(name) {createCookie(name,"",-1);}


  function listCookies()
  {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += theCookies[i-1] + "\n";
    }
    return aString;
  }




window.back2ascii = function(dat)
{
  var i,j,k,len=dat.length
  var ary3 = new Array ();              // output array (b)
  j = 0;                              // output array index
  for (i=0; i<len; i++)
  {             // hex format
    k = dat[i];
    ary3[j++]=B64.charAt(k>>4)+B64.charAt(k&15);
  }
  return ary3.join("");               // len-char hash of aray
}

window.applyDiscount = function (validCode, code)
{
  if(!validCode)
  {
    if(Object.size(subTotalsSaved))
    {
      //console.log(getTotal(subTotalsSaved));
      subTotals = JSON.parse(JSON.stringify(subTotalsSaved));
      subTotalsSaved = {};
    }
  }
  else
  {
    if(code == 1)
    {
    }
    else if(code == 2)
    {
    }
    else if(code == 3)
    {
      if(!Object.size(subTotalsSaved)) {subTotalsSaved = JSON.parse(JSON.stringify(subTotals));}
      //console.log("SIZE: " + Object.size(subTotalsSaved));
      subTotals = {};
    }
    else
    {
    }
  }
  total = getTotal(subTotals);
  document.getElementById("Total").innerHTML = "TOTAL: $" + currencyFormatted(total);

  if(total != 0)
  {
    //Ext.get("promoCodeContainer").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionHeader").innerHTML = 'Choose your method of payment';
    document.getElementById("checkOutCallToActionConfirm").style.display = 'none';
    document.getElementById("checkOutCallToActionButtons").style.display = '';
  }
  else                       
  {
    //Ext.get("promoCodeContainer").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionHeader").innerHTML = 'Confirm your appointment(s)';
    document.getElementById("checkOutCallToActionConfirm").style.display = '';
    document.getElementById("checkOutCallToActionButtons").style.display = 'none';
  }
  if(Object.size(cartItems))
  {
    Ext.get("cartItem").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium";
    document.getElementById("checkOutCallToAction").style.display = '';
    document.getElementById("Total").style.visibility = '';
  }
  else
  {
    Ext.get("cartItem").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium inactive";
    document.getElementById("checkOutCallToAction").style.display = 'none';
    document.getElementById("Total").style.visibility = 'hidden';
    document.getElementById("cartItems").innerHTML = '<h1 class="clearfix" style="margin-top: 100px; text-align: center;">Your Cart is Empty</h1>';
  }



}






Ext.onReady(function()
{



//console.log(window.location.href);
var hash = decodeURI((window.location.href.split("?")[1] || ""));
//console.log("HASH: " + hash);

/*
var temp = hash.split("=") || "";
var addr = temp.shift();
var temp = temp.join("=");
var tag = temp.split("&") || "";
*/

var tag = hash.split("&") || "";
var addr = tag.shift();



//console.log("ADDR: " + addr);
//console.log("TAG: " + tag);
//console.log(tag);

if(addr == 'return')
{
  var key;
  var item;

  var ID;
  var CODE = '';

  for(var i = 0; i < tag.length; i++)
  {
    if(!tag[i]) {continue;}
    key = decodeURI(tag[i].split("=")[0]);
    item = decodeURI(tag[i].split("=")[1]);

    if(key == 'ID') {ID = item;}
    else if(key == 'CODE') {CODE = item;}
  }
  rateReturn = true;
  returnParameters.ID = ID;
  returnParameters.CODE = CODE;

  paymentReturn = true;
  window.showReturn();
}
else if(addr == 'share')
{
  var key;
  var item;

  var JSONKey;
  var ID;

  for(var i = 0; i < tag.length; i++)
  {
    if(!tag[i]) {continue;}
    key = decodeURI(tag[i].split("=")[0]);
    item = decodeURI(tag[i].split("=")[1]);
    item = decodeURIComponent((item+'').replace(/\+/g, '%20'));
    //console.log(item);

    if(key == 'KEY') {JSONKey = item;}
    else if(key == 'ID') {ID = item;}
  }
  socialShareReturn = true;
  returnParameters.KEY = JSONKey;
  returnParameters.ID = ID;

  window.showShare();
}
else if(addr == 'rate')
{
  var key;
  var item;

  var JSONKey;
  var ID;

  for(var i = 0; i < tag.length; i++)
  {
    if(!tag[i]) {continue;}
    key = decodeURI(tag[i].split("=")[0]);
    item = decodeURI(tag[i].split("=")[1]);
    if(key == 'KEY') {JSONKey = item;}
    else if(key == 'ID') {ID = item;}
  }
  rateReturn = true;
  returnParameters.KEY = JSONKey;
  returnParameters.ID = ID;

  //window.showRateMe();
  waitLoading6();
}

else if(addr == 'feedback')
{
  var key;
  var item;

  var JSONKey;
  var ID;

  for(var i = 0; i < tag.length; i++)
  {
    if(!tag[i]) {continue;}
    key = decodeURI(tag[i].split("=")[0]);
    item = decodeURI(tag[i].split("=")[1]);

    if(key == 'KEY') {JSONKey = item;}
    else if(key == 'ID') {ID = item;}
  }
  feedbackReturn = true;
  returnParameters.KEY = JSONKey;
  returnParameters.ID = ID;

  //window.showFeedbackForm();
  waitLoading7();
}

else if(addr == 'showFeedback')
{
  var key;
  var item;

  var JSONKey;
  var ID;

  for(var i = 0; i < tag.length; i++)
  {
    if(!tag[i]) {continue;}
    key = decodeURI(tag[i].split("=")[0]);
    item = decodeURI(tag[i].split("=")[1]);
    item = decodeURIComponent((item+'').replace(/\+/g, '%20'));
    //console.log(item);

    if(key == 'KEY') {JSONKey = item;}
    else if(key == 'ID') {ID = item;}
  }
  socialShareReturn = true;
  returnParameters.KEY = JSONKey;
  returnParameters.ID = ID;

  waitLoading11();
}

      



//var val = 'TEST';
//console.log(back2ascii(Hash2(FixUTF(val),12)));



var coupons = new Array
(// place to put coupon codes
  "1",                         // 1st coupon hash - comma seperated
  "2",                         // 2nd coupon hash - add all you want
  "d763de7bebe37b645c595558",  // 3rd coupon hash
  "d763de7bebe37b645c595558"   // 4th coupon hash
);


Ext.apply(Ext.form.VTypes, {

    validate : function(val, field)
    {
      var match = false;
      var index=99, cv=Hash2(FixUTF(val),12);  // calc hash of input
      cv = back2ascii(cv);                     // convert to display format
      for (var i=0; i<coupons.length; i++)
      {
	//alert(cv + ' ' + coupons[i]);
        if (cv == coupons[i]) {match = true; index = i;}
      }
      applyDiscount(match, index);
      return (match);
    },
    validateText : 'no match'
});




Ext.create('Ext.form.Panel', {
  renderTo: 'promoCode',
  title: 'Promo Code?',
  bodyPadding: 5,
  width: 150,
  height: 60,
  defaultType: 'textfield',
  items: [{
        fieldLabel: 'Code',
        labelWidth: 30,
        name: 'promoForm',
	id: 'promoForm',
	value: '',
        vtype: 'validate'
  }]
});

 

window.validateCoupon = function(val)
{
  var match = false;
  var index=99, cv=Hash2(FixUTF(val),12);  // calc hash of input
  cv = back2ascii(cv);                     // convert to display format
  for (var i=0; i<coupons.length; i++)
  {
    //alert(cv + ' ' + coupons[i]);
    if (cv == coupons[i]) {match = true; index = i;}
  }
  applyDiscount(match, index);
  return (match);
}



        var scrollbar = document.createElement("div");
        scrollbar.className = "scrollbar";
        scrollbar.id = "scrollbar";
        scrollbar.style.width = 320 + 'px';
        scrollbar.innerHTML = '<img class="opaque50" src="images/scrollLeft.png" style="position: absolute; left: -40px; height: 30px;" onclick="next();" onmouseover="this.style.cursor = \'pointer\'; this.src=\'images/scrollLeft_over.png\';" onmouseout="this.src=\'images/scrollLeft.png\';"/><img class="opaque50" src="images/scrollRight.png" style="position: absolute; right: -40px; height: 30px;" onclick="prev();" onmouseover="this.style.cursor = \'pointer\'; this.src=\'images/scrollRight_over.png\';" onmouseout="this.src=\'images/scrollRight.png\';"/>';

        var slider = document.createElement("div");
        slider.className = "slider";

        var first = document.createElement("div");
        first.className = "first";
        //first.innerHTML = "1";

        var last = document.createElement("div");
        last.className = "last";
        last.style.left = 304 + "px";
        //last.innerHTML = "1";

        var positionFirst = document.createElement("div");
        positionFirst.className = "position";
        positionFirst.style.color = "#73841D";
        //positionFirst.style.backgroundColor = "#cccccc";
        positionFirst.style.position = "absolute";
        positionFirst.style.top = -2 + "px";
        positionFirst.style.left = -2 + "px";
        positionFirst.style.width = 20 + "px";
        positionFirst.style.textAlign = "center";
        positionFirst.style.fontSize = 12 + "px";
        positionFirst.innerHTML = "1";

        var positionLast = document.createElement("div");
        positionLast.className = "position";
        positionLast.style.color = "#73841D";
        //positionLast.style.backgroundColor = "#cccccc";
        positionLast.style.position = "absolute";
        positionLast.style.top = -2 + "px";
        positionLast.style.left = -2 + "px";
        positionLast.style.width = 20 + "px";
        positionLast.style.textAlign = "center";
        positionLast.style.fontSize = 12 + "px";
        positionLast.innerHTML = "1";


        var position = document.createElement("div");
        position.className = "position";
        position.style.color = "#4A5612";
        //position.style.backgroundColor = "#cccccc";
        position.style.position = "absolute";
        position.style.top = -9 + "px";
        position.style.left = -2 + "px";
        position.style.width = 20 + "px";
        position.style.textAlign = "center";
        position.style.fontSize = 12 + "px";



        var searchResults = document.createElement("div");
        searchResults.id = "searchResults";
        searchResults.className = "x-window-default";
        searchResults.style.color = "#4A5612";
        //searchResults.style.backgroundColor = "#cccccc";
        searchResults.style.position = "absolute";
        searchResults.style.top = 0 + "px";
        searchResults.style.left = -1 + "px";
        searchResults.style.width = 313 + "px";
        searchResults.style.textAlign = "center";
        searchResults.style.fontSize = 16 + "px";
        //searchResults.style.border = 1 + "px solid #ff0000";
        //searchResults.innerHTML = "4 Results Found";




	slider.style.top = 0 + "px";
        first.style.position = "absolute";
        last.style.position = "absolute";
	first.style.top = 0 + "px";
	last.style.top = 0 + "px";


        first.appendChild(positionFirst);
        last.appendChild(positionLast);
        scrollbar.appendChild(first);
        scrollbar.appendChild(last);

        slider.appendChild(position);
        scrollbar.appendChild(slider);
        scrollbar.appendChild(searchResults);

        scrollbar.style.top = 280 + 'px';
        scrollbar.style.left = 230 + 'px';
        //scrollbar.style.background = "transparent";
        //alert(parseInt((this.holderWidth / 2) - this.center,10) + 'px');
        //this.scrollbar.style.width = 500 + 'px';
        //this.scrollbar.style.height = 20 + 'px';
        //this.scrollbar.style.border = "1px solid #FF0000";

	if(document.getElementById('slider')) {document.getElementById('slider').appendChild(scrollbar);}



  window.loadSearchItems = function (exp)
  {

    //console.log(productStore.getById(user[0].inID).data.role);
    //if(!productStore.getById(user[0].inID).data.role) {exp = '--NULL--';}
    //if(productStore.getById(user[0].inID).data.role != 'give') {exp = '--NULL--';}

    //console.log('loadSearchItems');
    var regExp = exp || ".";
    regExp = regExp.replace(/\s+/g, "|");
    var matchRE = new RegExp(regExp, "i");
    //console.log(regExp);

    initStr = [];
    curr = 0;

    productStore.data.each(function(item, index, totalItems)
    {

      //console.log(item.get('linkedINprofile'));
      //console.log((!item.get('linkedINprofile') && !linkedINlogin));
      if(item.get('role') !== 'give' && item.get('role') !== 'both' || (!item.get('linkedINprofile') && !linkedINlogin)) {return;}

      var inID = item.get('inID');
      //console.log(inID);
      //if(inID == user[0].inID && item.get('role') == 'find') {return true;}
      //console.log(inID);
      var first = item.get('first') || '';
      var last = item.get('last') || '';
      var company = item.get('company') || '';
      var position = item.get('position') || '';
      var industry = item.get('industry') || '';
      var summary = item.get('summary') || '';

      //console.log(first);
      //if(!first || !last || !company || !industry || !summary) {return;}
      //var summary = "Mixed Signal Design SAR ADC IP for next-gen touch screen controller PSoC 3 and PSoC 5 Chip Integration Test Vector Development and Fault Grading Developed system ROM firmware in M8C assembly for extending the life of flash memory and performed mixed Signal Verification";

      var preps = /(\s|^|>)((aboard|about|above|across|after|against|along|amid|among|anti|around|before|behind|below|beneath|beside|besides|between|beyond|concerning|considering|despite|down|during|except|excepting|excluding|following|from|inside|into|like|minus|near|onto|opposite|outside|over|past|plus|regarding|round|save|since|than|that|this|through|toward|towards|under|underneath|unlike|until|upon|versus|with|within|without)\s)+/gi;
  				


      //var preps = /(\s|^|>)((aboard|about|above|across|after|against|along|amid|among|anti|around|as|at|before|behind|below|beneath|beside|besides|between|beyond|but|by|concerning|considering|despite|down|during|except|excepting|excluding|following|for|from|in|inside|into|like|minus|near|of|off|on|onto|opposite|outside|over|past|per|plus|regarding|round|save|since|than|through|to|toward|towards|under|underneath|unlike|until|up|upon|versus|via|with|within|without)\s)+/gi;


      var smallwords = /(\s|^)(([a-zA-Z-_(]{1,2}(\'|�)*[a-zA-Z-_,;]{0,1}?\s)+)/gi; // words with 3 or less characters
  				

     //console.log(summary);

     // replace prepositions (greater than 3 characters)
     //summary = summary.replace(preps, function(contents, p1, p2) {return p1 + p2.replace(/\s/gi, '');});
     summary = summary.replace(preps, ' ');

     // replace small words
     //summary = summary.replace(smallwords, function(contents, p1, p2) {return p1 + p2.replace(/\s/g, '');});
     summary = summary.replace(smallwords, ' ');
     //console.log(summary);


      //console.log(first);
      var services;
      if(item.get('providedServices')) {services = item.get('providedServices') ? Ext.JSON.decode(item.get('providedServices')) : {};}

      var found = first.match(matchRE);
      found += last.match(matchRE);
      found += company.match(matchRE);
      found += position.match(matchRE);
      found += industry.match(matchRE);
      found += summary.match(matchRE);
      if(inID == regExp) {found++;}
      for (var key in services)
      {
        //console.log("REGEX: " + regExp + " KEY: " + key);
        found += key.match(matchRE);
      }
      image = './images/ghost.png';
      image = 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';
      
      var numServices = Object.size(services);
      if(found && numServices)
      //if(found)
      {
        //initStr.push({src: image, label: {description: item.get('first') + ' ' + item.get('last'), price: item.get('last'), url: item.get('url'), high: image, id: item.get('inID'), company: item.get('company') || 'Amazon'}});
        initStr.push({id: item.get('inID')}); 
      }
    }); //productStore.data.each

    applyFilters();
    initStr.sort(sortfunction)
    populateSearchItems();
			   //populateFilters();
    if(exp) {pruneFilters();}
			   //showLabel(curr);
			   //setSliderPosition(curr);
  } //loadSearchItems()


function sortfunction(a, b)
{
  //Compare "a" and "b" in some fashion, and return <0, 0, or >0
  //Less than 0: Sort "a" to be a lower index than "b"
  //Zero: "a" and "b" should be considered equal, and no sorting performed.
  //Greater than 0: Sort "b" to be a lower index than "a".

  var e = document.getElementById("sortSearch");
  var opt = e.options[e.selectedIndex].value;
  
  if(opt == 'company')
  {
    if(productStore.getById(a.id).data.company < productStore.getById(b.id).data.company) {return -1;}
    if(productStore.getById(a.id).data.company > productStore.getById(b.id).data.company) {return 1;}
    return 0;
  }
  else if(opt == 'rating')
  {
    var ratingObj = productStore.getById(a.id).data.reviews ? Ext.JSON.decode(productStore.getById(a.id).data.reviews) : {};
    var arating = Math.ceil(ratingObj.average) || 0;
    var areviews = ratingObj.total || 0;
    var ratingObj = productStore.getById(b.id).data.reviews ? Ext.JSON.decode(productStore.getById(b.id).data.reviews) : {};
    var brating = Math.ceil(ratingObj.average) || 0;
    var breviews = ratingObj.total || 0;

    if(arating == brating)
    {
      return (areviews < breviews);
    }
    else
    {
      return (arating < brating);
    }
  }
  else if(opt == 'experience')
  {
    return (productStore.getById(a.id).data.industryTenure < productStore.getById(b.id).data.industryTenure);
  }
  else if(opt == 'price')
  {
    var aLO = 9999999;
    var aHI = 0;
    var bLO = 9999999;
    var bHI = 0;


    // --Services--
    services = productStore.getById(a.id).data.providedServices ? Ext.JSON.decode(productStore.getById(a.id).data.providedServices) : {};
    for (var key in services)
    {
      if(parseFloat(services[key].price) < aLO) {aLO = parseFloat(services[key].price);}
      if(parseFloat(services[key].price) > aHI) {aHI = parseFloat(services[key].price);}
    }
    // --Services--
    services = productStore.getById(b.id).data.providedServices ? Ext.JSON.decode(productStore.getById(b.id).data.providedServices) : {};
    for (var key in services)
    {
      if(parseFloat(services[key].price) < bLO) {bLO = parseFloat(services[key].price);}
      if(parseFloat(services[key].price) > bHI) {bHI = parseFloat(services[key].price);}
    }

    //console.log("aLO: " + aLO + " bLO: " + bLO);
    return (aLO - bLO);
  }


}







  window.prev = function(n)
  {
    if(lockScroll) {return;}
    curr += (n || 1);
    if(curr > initStr.length-1) {curr = initStr.length-1;}
    else
    {
      showLabel(curr);
      setSliderPosition(curr);
    }
  } //prev()
	
  window.next = function(n)
  {
    if(lockScroll) {return;}
    curr -= (n || 1);
    if(curr < 0) {curr = 0;}
    else
    {
      showLabel(curr);
      setSliderPosition(curr);
    }
  } //next()


  var setSliderPosition = function (relPos)
        {
            //alert(this.numItems + " " + this.scrollbar.style.width);
            //var el = document.getElementById('page');
            //alert(el.style.width);
            //var width = parseInt(el.style.width,10);
            var width = parseInt(scrollbar.style.width,10);
            //alert(width);
            //alert(initStr.length);
            if (initStr.length > 1)
            {
              var sPos = (((relPos - (initStr.length-1)/2)) / ((initStr.length-1)/2));
              //sPos = (sPos * width / 4.2) + (width / 4.2);
              sPos = (sPos * width / 2.1) + (width / 2.1);
	      //var sPos = (relPos / this.numItems)* 300;
            }
            else
            {
	      var sPos = (0.5 * 1);
            }
            //alert(sPos);


            var hPos;
            var theta0 = 180 / (initStr.length-1);
            var theta = (theta0 * (relPos));
            var r = 154.0;
            var x;
            var y;
 
 
            //console.log(Math.cos(theta * (Math.PI/180)));
            if(theta > 90) {theta = (theta0 * ((initStr.length-1) - relPos));}

            x = (r * Math.cos(theta * (Math.PI/180)));
            y = Math.abs(r * Math.sin(theta * (Math.PI/180)));

            var diff = r-x;
            //console.log('theta: ' + theta + ' x: ' + diff + ' y: ' +  y);

            x = ((theta0 * relPos) > (90 + 0)) ? (x + (r+0)) : (r - x);
 
            //console.log('theta: ' + theta + ' x: ' + x + ' y: ' +  y);

            if(relPos == 0 || relPos == initStr.length-1) {y+=15;}

            slider.style.marginLeft = x + 'px';
            slider.style.marginTop = y + 'px';

            slider.style.marginLeft = sPos + 'px';
            slider.style.marginTop = 0 + 'px';
            position.style.marginLeft = sPos + 'px';


            relPos = Math.round(relPos);
            if((relPos + 1) < 10)
	    {
              //position.innerHTML = '' + (relPos + 1) + '/' + (initStr.length);
              position.innerHTML = '' + (relPos + 1);
	    }
            else
	    {
              //position.innerHTML = (relPos + 1) + '/' + (initStr.length);
              position.innerHTML = (relPos + 1);
	    }
            //this.slider.style.top = this.Scrollbar.center.y - this.scrollbar.center.y +"px";
            positionLast.innerHTML = initStr.length;

  }


  window.showServiceInfo = function(JSONStr, elID)
  {
    //console.log("showServiceInfo");
    
    JSONStr = decodeURI(JSONStr);
    var service = Ext.JSON.decode(JSONStr);
    var parent = document.getElementById(elID);
    var childID = "serviceInfo_" + elID;

    if(!document.getElementById(childID))
    {
      var infoStr = '<div class="serviceInfoPopup">';
      var post = '';
      var pre = '';
      for (var info in service)
      {
	pre = (info == 'price') ? '$' : '';
	post = (info == 'price') ? ' /hr' : (info == 'radius') ? ' miles' : '';
        infoStr += '<label>' + info + ': </label><span>' + pre + service[info] + post + '</span>';
        //console.log(infoStr);
      }
      infoStr += '</div>';

      var window = document.createElement("div");
      window.className = "gradient-darkGrey";
      window.style.position = 'absolute';
      window.style.top = 96 + 'px';
      window.style.width = 198 + 'px';
      window.style.height = 100 + 'px';
      window.id = childID;
      window.innerHTML = infoStr;

      parent.appendChild(window);
    }
    else
    {
      if(document.getElementById(childID).style.display == 'none') {document.getElementById(childID).style.display='';}
      else                                                         {document.getElementById(childID).style.display='none';}
    }
  }


  window.showServiceInfo2 = function(ID, key, elID)
  {
    console.log("showServiceInfo");
    
    var parent = document.getElementById(elID);
    var infoStr = '<div class="serviceDetails">';
    var services = {};
    if(productStore.getById(ID)) {services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};}
    for (var info in services[key])
    {
      infoStr += '<label>' + info + '</label><span>' + services[key][info] + '</span><br>';
      console.log(infoStr);
    }
    infoStr += '</div>';

    var window = document.createElement("div");
    window.className = "x-window-default";
    window.id = "serviceInfo";
    window.innerHTML = infoStr;

    parent.appendChild(window);
    
  }




  function populateSearchItems()
  {
    //console.log('populateSearchItems');
    var services = {};
    var imgID = '';

    document.getElementById("searchItems").innerHTML = '';
    document.getElementById("resultsSearch").innerHTML = 'Search Results: ' + initStr.length;

    for(var index = 0; index < initStr.length; index++)
    {
      //var ID = initStr[n].label.id;
      var ID = initStr[index].id;
      //console.log(ID);

      //console.log(new Date().getTime());


      var feedbackObj = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
      var numFeedbacks = Object.size(feedbackObj);
      var interviewsStr = '<div style="position: absolute; top: 6px; width: 200px; color: #555;">Interviews: ' + numFeedbacks + '</div>';

      var charityCoins = productStore.getById(ID).data.coins ? Ext.JSON.decode(productStore.getById(ID).data.coins || 0) : 0;
      var charityCoinStr = '<div style="position: absolute; top: 30px; width: 200px; color: #555;"><img style="float:left; position: absolute; top:4px;" src="./images/coins.png"/><span style="position:absolute; top: -12px; left: -2px;">Charity Coins</span><span style="position:absolute; top:28px; left: 0px; width: 36px; text-align: center; border: 0px solid #00ff00;">' + charityCoins + '</span></div>';


      // --Rating--
      var ratingStr = '';
      var ratingObj = productStore.getById(ID).data.reviews ? Ext.JSON.decode(productStore.getById(ID).data.reviews) : {};

      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      //console.log(ratingObj.comments);
      if(!rating) {rating = 0;}





      var ratingStr = '<div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(Ext.JSON.encode(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
      ratingStr += '<div style="right: -6px;">';
      for(var i = rating; i < 5; i++)
      {
        ratingStr += '<img src="images/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        ratingStr += '<img src="images/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '</div></div><div style="color: #555; text-align: right; position: absolute; top: 15px; right: 0px;">' + rates + ' Reviews</div></div>';






      // --Name--
      var first = productStore.getById(ID).data.first;
      var last = productStore.getById(ID).data.last;
      var url = productStore.getById(ID).data.url;
      var link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a href="' + url + '" target="_blank" style="font-size:12px; font-weight:700; text-align: center;">LinkedIn Profile</a><hr></div>';
      var label = first + ' ' + last;

      // --Services--
      services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};
      //console.log(services);
      var help = '<div style="position: absolute; top: 244px; text-align: left; color: #333; font-weight: 600;">';
      for (var key in services)
      {
        //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
        var split = key.split(' ');
        imgID = 'service' + split.pop();
        //console.log("SETTING: " + imgID);
        //help += '<li><div class="frame1"><div class="box"><img id="' + imgID + '" src="' + 'images/' + key + '.jpg' + '" alt="' + key + '" height="130" width="197" onmouseover=\"this.style.cursor=\'pointer\'; this.parentNode.parentNode.style.backgroundImage=\'url(images/framesHi.png)\'; this.src=\'' + 'images/' + key + 'Over.jpg' + '\';\" onmouseout=\"this.parentNode.parentNode.style.backgroundImage=\'url(images/frames.png)\'; this.src=\'' + 'images/' + key + '.jpg\';\" onclick=\"serviceClicked(this, false);\"/></div><span class="servicePrice">$' + services[key] + '/hr</span></div><p><b>' + key + '</b></p></li>';
	//TODO
        var matchRE = new RegExp("In-person", "i");
        var inPerson = key.match(matchRE);
        if(inPerson)
	{
          //var fnParams = '\'' + ID + '\',\'' + key + '\',\'' + 'searchItem' + index + '\'';
          var fnParams = '\'' + encodeURI(Ext.JSON.encode(services[key])) + '\',\'' + 'searchItem' + index + '\'';
          //var fnParams = '\'' + (Ext.JSON.encode(services[key])) + '\',\"' + 'searchItem' + index + '\"';
          //console.log(fnParams);
          help += '<div style="width: 200px;" onmouseover="showServiceInfo(' + fnParams + ');" onmouseout="showServiceInfo(' + fnParams + ');"><span style="float: left;">' + key + '*</span><span style="float: right;">$' + services[key].price + '/hr</span></div><br>';
	}
        else
	{
          help += '<div style="width: 200px;"><span style="float: left;">' + key + '</span><span style="float: right;">$' + services[key].price + '/hr</span></div><br>';
	}
      }
      help += '</div>';
      //console.log(help);

      // --Company--
      var company =  productStore.getById(ID).data.company || "";
      var companyTenure =  productStore.getById(ID).data.companyTenure || 0;

      // --Industry--
      var indsutry =  productStore.getById(ID).data.industry || "";
      var industryTenure =  productStore.getById(ID).data.industryTenure || 0;

      // --Position--
      var position =  productStore.getById(ID).data.position || "";

      var education = productStore.getById(ID).data.education || "";
      //  Only display most recent education
      var split = education.split('<br>');
      education = split[0];

      // --Image--
      var image = productStore.getById(ID).data.imageSmall || "./images/ghostSmall.png";
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

      if(settings[ID]['identity']) {label = ""; image = "./images/ghostSmall.png"; link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a target="_blank" style="font-size:12px; font-weight:100; text-align: center;">--</a><hr></div>';}


      /*
    }
    else
    {
      // --Name--
      var first = "--";
      var last = "--";
      var url = "#";
      var link = '--';
      var label = first + ' ' + last;

      // --Offerings--
      var services = "";
      //var help = '<li><div class="frame1"><div class="box"><img src="' + 'images/null.jpg' + '" alt="No Results" height="130" width="197"></div></div><p><b>' + 'No Results' + '</b></p></li>';

      //console.log(help);

      // --Company--
      var company =  "--";
      var companyTenure = "--";

      // --Industry--
      var indsutry =  "--";
      var industryTenure = "--";

      // --Position--
      var position =  "--";

      var education = "--";

      // --Image--
      var image = "images/noresults.png";
      document.getElementById("providerRating").innerHTML = "";

    }
      */

    var window = document.createElement("div");
    window.className = "searchItem";
    window.id = "searchItem" + index;
    window.onclick = function() {makeAppt(this.id);};

    var itemImage = document.createElement("div");
    itemImage.className = "circular-small";
    itemImage.style.background = 'url(' + image + ') no-repeat center center';
    //itemImage.style.background = 'url(' + image + ') no-repeat';
    window.appendChild(itemImage);


    var itemInfoWrapper = document.createElement("div");
    itemInfoWrapper.id = "itemInfoWrapper" + index;
    itemInfoWrapper.style.height = 110 + 'px';
    //itemInfoWrapper.style.height = 60 + 'px';
    itemInfoWrapper.style.overflow = 'hidden';
    itemInfoWrapper.style.marginTop = -18 + "px";
    //itemInfoWrapper.style.border = "1px solid #00ff00";
    
    var itemName = document.createElement("div");
    itemName.innerHTML = '<span style="font-size:14px; font-weight:bold;">' + label + '</span>';
    itemInfoWrapper.appendChild(itemName);

    var itemPosition = document.createElement("div");
    //itemPosition.style.textAlign = "left";
    itemPosition.innerHTML = position;
    itemInfoWrapper.appendChild(itemPosition);

    var itemCompany = document.createElement("div");
    //itemCompany.style.textAlign = "left";
    itemCompany.innerHTML = company + '<br>Tenure: ' + companyTenure + 'yrs, Experience: ' + industryTenure + 'yrs';
    itemInfoWrapper.appendChild(itemCompany);

    var itemEducation = document.createElement("div");
    //itemEducation.style.textAlign = "left";
    itemEducation.innerHTML = education;
    itemInfoWrapper.appendChild(itemEducation);


    window.appendChild(itemInfoWrapper);



    var itemLink = document.createElement("div");
    itemLink.innerHTML = link;
    window.appendChild(itemLink);

    var numInterviews = document.createElement("div");
    numInterviews.innerHTML = interviewsStr;
    numInterviews.style.textAlign = 'left';
    window.appendChild(numInterviews);

    var numCharityCoins = document.createElement("div");
    numCharityCoins.innerHTML = charityCoinStr;
    numCharityCoins.style.textAlign = 'left';
    window.appendChild(numCharityCoins);

    var itemRating = document.createElement("div");
    itemRating.innerHTML = ratingStr;
    window.appendChild(itemRating);

    var itemServices = document.createElement("div");
    itemServices.innerHTML = help;
    window.appendChild(itemServices);

    document.getElementById("searchItems").appendChild(window);


    var childID = "full_itemInfoWrapper" + index;
    var popup = document.createElement("div");
    popup.className = "darkBlue";
    popup.onmouseout=function() { document.getElementById(this.id).style.display = 'none'; }; 
    popup.style.position = 'absolute';
    popup.style.top = 96 + 'px';
    popup.style.width = 200 + 'px';
    popup.style.height = 206 + 'px';
    popup.style.display = 'none';
    popup.id = childID;
    popup.innerHTML = itemInfoWrapper.innerHTML;
    window.appendChild(popup);




    }




    for(var index = 0; index < initStr.length; index++)
    {
      var overallHeight = document.getElementById("itemInfoWrapper" + index).offsetHeight
      //console.log(overallHeight);
      var otherSiblingHeights = getHeightsOfPreviousSiblings("itemInfoWrapper" + index);
      //console.log(otherSiblingHeights);
      var remainingHeight = overallHeight - otherSiblingHeights;
      //console.log(remainingHeight);
      document.getElementById("itemInfoWrapper" + index).lastChild.style.height = remainingHeight + 'px';
      if(document.getElementById("itemInfoWrapper" + index).lastChild.scrollHeight > remainingHeight)
      {
        document.getElementById("itemInfoWrapper" + index).onmouseover=function() { event = event || window.event; event.stopPropagation(); event.cancelBubble = true; document.getElementById("full_" + this.id).style.display= ''; }; 
        //document.getElementById("full_itemInfoWrapper" + index).onmouseout=function() { document.getElementById(this.id).style.display = 'none'; }; 
	//console.log(document.getElementById("itemInfoWrapper" + index).lastChild.innerHTML);
	//console.log(document.getElementById("itemInfoWrapper" + index).lastChild.id);
        //ellipsizeTextBox("itemInfoWrapper" + index);
        ellipsizeTextBoxToHeightByElement(document.getElementById("itemInfoWrapper" + index).lastChild)
      }
    }




    //if(!initStr.length) {return;}

    //var quickLinks = document.createElement("div");
    //quickLinks.id = "quickLinks";
    //quickLinks.className = "quickLinks";
    var quickLinks = document.getElementById("quickLinks");

    if(!quickLinks.innerHTML)
    {

    



    var qlIndustry = document.createElement("div");
    qlIndustry.id = "qlIndustry";
    qlIndustry.className = "qlHeader";
    qlIndustry.innerHTML = "<h3>INDUSTRY</h3>";

    var qlCompany = document.createElement("div");
    qlCompany.id = "qlCompany";
    qlCompany.className = "qlHeader";
    qlCompany.innerHTML = "<h3>COMPANY</h3>";

    var qlRating = document.createElement("div");
    qlRating.id = "qlRating";
    qlRating.className = "qlHeader";
    qlRating.innerHTML = "<h3>RATING</h3>";

    var qlExperience = document.createElement("div");
    qlExperience.id = "qlExperience";
    qlExperience.className = "qlHeader";
    qlExperience.innerHTML = "<h3>EXPERIENCE</h3>";

    var qlServices = document.createElement("div");
    qlServices.id = "qlServices";
    qlServices.className = "qlHeader";
    qlServices.innerHTML = "<h3>SERVICES</h3>";

    var qlPrice = document.createElement("div");
    qlPrice.id = "qlPrice";
    qlPrice.className = "qlHeader";
    qlPrice.innerHTML = "<h3>PRICE</h3>";

    quickLinks.appendChild(qlIndustry);
    quickLinks.appendChild(qlCompany);
    quickLinks.appendChild(qlRating);
    quickLinks.appendChild(qlExperience);
    quickLinks.appendChild(qlServices);
    quickLinks.appendChild(qlPrice);





    for(var key in filterCounts)
    {
      //console.log("" + key);
      var elID = 'ql' + key.capitalize(); 
      //console.log(elID);
      var el = document.getElementById(elID);
      var innerHTML = '<div class="qlSection">';
      var sorted_keys = Object.keys(filterCounts[key]).sort(sortFilters);
      for(var i = 0; i < sorted_keys.length; i++)
      {
	var item = sorted_keys[i];
	//console.log("  " + item + " (" + filterCounts[key][item] + ")");
        innerHTML += '<span onmouseover="this.style.cursor=\'pointer\';" onclick="doQuickLink(\'' + key + '\',\'' + item + '\'); addFilterTypeToList(\'' + key + "Filter" + '\', \'' + "searchFilterList" + '\');">' + '  ' + item + ' (' + filterCounts[key][item] + ')</span><br>';
      }
      el.innerHTML += innerHTML + '</div>';
    }
    }

  }





function getHeightsOfPreviousSiblings(id)
{
  var cummHeight = 0;
  x=document.getElementById(id).lastChild;
  //console.log(x.innerHTML);
  x=x.previousSibling;
  while (x)
  {
    //console.log(x);
    //console.log("NODE TYPE: " + x.nodeType);
    if(x.nodeType==1)
    {
      //console.log(x.offsetHeight);
      cummHeight += x.offsetHeight;
    }
    x=x.previousSibling;
  }
  return cummHeight;
}


function sortFilters(a, b)
{
  //Compare "a" and "b" in some fashion, and return <0, 0, or >0
  //Less than 0: Sort "a" to be a lower index than "b"
  //Zero: "a" and "b" should be considered equal, and no sorting performed.
  //Greater than 0: Sort "b" to be a lower index than "a".

  var reFREE = new RegExp("FREE", "i");
  var reSTAR = new RegExp("Star", "i");

  if(a.match(reFREE)) {return -1;}
  if(b.match(reFREE)) {return 1;}
  if(a.match(reSTAR)) {return a - b;}
  return a > b;

}






















  window.showLabel = function(n)
  {

    var services = {};
    var imgID = '';
    //console.log(initStr.length);
    //if(Ext.get("labelName"))      {Ext.get("labelName").stopFx();}
    //if(Ext.get("labelOfferings")) {Ext.get("labelOfferings").stopFx();}







    if(document.getElementById("ratingsContainer")) {document.getElementById("ratingsContainer").style.display="none";}
    if(document.getElementById("calContainer")) {document.getElementById("calContainer").style.display="none";}
    if(document.getElementById("infoContents")) {document.getElementById("infoContents").style.display="";}

    if(initStr.length)
    {
      //var ID = initStr[n].label.id;
      var ID = initStr[n].id;
      //console.log(ID);

      //console.log(new Date().getTime());

      // --Rating--
      var ratingStr = '';
      var ratingObj = productStore.getById(ID).data.reviews ? Ext.JSON.decode(productStore.getById(ID).data.reviews) : {};

      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      //console.log(ratingObj.comments);
      if(!rating) {rating = 0;}

      var ratingStr = '<div onmouseover="this.style.cursor=\'pointer\';" onclick="showRatings(\'' + encodeURI(Ext.JSON.encode(ratingObj.comments)) + ',this.parentNode.parentNode.id)' + ',\'' + ID + '\');"><img src="images/starBoard.png" style="z-index: 20; position: absolute; top: 10px; left:150px;"/>';
      for(var i = rating; i < 5; i++)
      {
        ratingStr += '<img src="images/emptyStar.png" style="z-index: 19; position: relative; top: -28px; left: -30px; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        ratingStr += '<img src="images/filledStar.png" style="z-index: 19; position: relative; top: -28px; left: -30px; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '<span style="position: absolute; top: 10px; left: 270px; font-size:9px; color:#606060; white-space: pre;">' + rates + ' ratings</span></div>';
      document.getElementById("providerRating").innerHTML = ratingStr;





      // --Name--
      var first = productStore.getById(ID).data.first;
      var last = productStore.getById(ID).data.last;
      var url = productStore.getById(ID).data.url;
      var link = '<a href="' + url + '" target="_blank" style="color: #75891C; font-size:12px; font-weight:700;">LinkedIn Profile</a>';
      var label = first + ' ' + last;

      // --Services--
      services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};
      //console.log(services);
      var help = '';
      for (var key in services)
      {
        //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
        var split = key.split(' ');
        imgID = 'service' + split.pop();
        //console.log("SETTING: " + imgID);
        help += '<li><div class="frame1"><div class="box"><img id="' + imgID + '" src="' + 'images/' + key + '.jpg' + '" alt="' + key + '" height="130" width="197" onmouseover=\"this.style.cursor=\'pointer\'; this.parentNode.parentNode.style.backgroundImage=\'url(images/framesHi.png)\'; this.src=\'' + 'images/' + key + 'Over.jpg' + '\';\" onmouseout=\"this.parentNode.parentNode.style.backgroundImage=\'url(images/frames.png)\'; this.src=\'' + 'images/' + key + '.jpg\';\" onclick=\"serviceClicked(this, false);\"/></div><span class="servicePrice">$' + services[key] + '/hr</span></div><p><b>' + key + '</b></p></li>';
      }
      //console.log(help);

      // --Company--
      var company =  productStore.getById(ID).data.company || "Amazon";
      var companyTenure =  productStore.getById(ID).data.companyTenure || 0;

      // --Industry--
      var indsutry =  productStore.getById(ID).data.industry || "";
      var industryTenure =  productStore.getById(ID).data.industryTenure || 0;

      // --Position--
      var position =  productStore.getById(ID).data.position || "Employee";

      // --Image--
      var image = productStore.getById(ID).data.image || "./images/ghost.png";
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

      if(settings[ID]['identity']) {label = "Confidential"; image = "./images/ghost.png"; link = "Confidential";}



    }
    else
    {
      // --Name--
      var first = "--";
      var last = "--";
      var url = "#";
      var link = '--';
      var label = first + ' ' + last;

      // --Offerings--
      var services = "";
      var help = '<li><div class="frame1"><div class="box"><img src="' + 'images/null.jpg' + '" alt="No Results" height="130" width="197"></div></div><p><b>' + 'No Results' + '</b></p></li>';

      //console.log(help);

      // --Company--
      var company =  "--";
      var companyTenure = "--";

      // --Industry--
      var indsutry =  "--";
      var industryTenure = "--";

      // --Position--
      var position =  "--";

      // --Image--
      var image = "images/noresults.png";
      document.getElementById("providerRating").innerHTML = "";

    }



    if(Ext.get("labelName"))
    {
      Ext.get("labelName").fadeOut({opacity: 0.2, easing: 'easeIn', duration: 100, callback: function() {document.getElementById('labelName').innerHTML = label;} });
      Ext.get("labelCompany").fadeOut({opacity: 0.3, easing: 'easeIn', duration: 100, callback: function() {document.getElementById('labelCompany').innerHTML = company + ' (' + companyTenure + 'yrs, Industry: ' + industryTenure + 'yrs)';} });
      Ext.get("labelProfile").fadeOut({opacity: 0.3, easing: 'easeIn', duration: 100, callback: function() {document.getElementById('labelProfile').innerHTML = position;} });
      Ext.get("labelLink").fadeOut({opacity: 0.3, easing: 'easeIn', duration: 100, callback: function() {document.getElementById('labelLink').innerHTML = link;} });
      Ext.get("image").fadeOut({opacity: 0.3, easing: 'easeIn', duration: 100, callback: function() {document.getElementById('image').src = image;} });

      Ext.get("servicesAvailable").fadeOut({opacity: 0.3, easing: 'easeIn', duration: 100, callback: function() {document.getElementById('servicesAvailable').innerHTML = help;} });


      Ext.get("labelName").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
      Ext.get("labelCompany").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
      Ext.get("labelProfile").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
      Ext.get("labelLink").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
      Ext.get("image").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});

      //Ext.get("services").fadeIn({opacity: 1, easing: 'easeIn', duration: 500, callback: function() {if(Object.size(services) == 1){var el = document.getElementById(imgID); el.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; serviceClicked(el,false);}}   });
      Ext.get("servicesAvailable").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
    }

    


  } //showLabel()

/*
window.sort = function(regExp)
{
  //alert(regExp);
  if(regExp == "") {regExp = ".";}
  regExp = regExp.replace(/\s+/g, "|");
  var matchRE = new RegExp(regExp, "i");
  
  var last = curr-1;
  if(last < 1) {last = 1;}
  var ID = initStr[curr].label.id;
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var services;
  if(productStore.getById(ID).data.providedServices) {services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};}

  var found = first.match(matchRE);
  found += last.match(matchRE);
  for (var key in services)
  {
    found += key.match(matchRE);
  }

  //console.log('ID: ' + ID + '->' + found);

  if(!found)
  {
    return 0;
  }
  else
  {
    return 1;
  }
}
*/




  window.scrollPage = function()
  {
    el = Ext.fly("scrollCurl");


    //el.stopFx();
    if(!scrolled)
    {
      el.shift({ y: scrollStart + scrollHeight - 130, duration: 1000});
    }
    else
    {
      el.shift({ y: scrollStart, duration: 250});
    }


    el = Ext.fly("scrollPage");

    if(!scrolled)
    {
      el.animate({
        duration: 900,
        from: {
          height: 0
         },
        to: {
          height: scrollHeight-130
         }
      });
    }
    else
    {
      el.animate({
        duration: 250,
        from: {
          height: scrollHeight-130
         },
        to: {
          height: 0
         }
      });
    }



    if(!scrolled)
    {
       Ext.get("scrollPageContent").fadeIn({opacity: 1, easing: 'easeIn', duration: 1500});
    }
    else
    {
       Ext.get("scrollPageContent").fadeOut({opacity: 0, easing: 'easeIn', duration: 100});
    }


    var el = document.getElementById("doScroll");
    var html = el.innerHTML;
    //console.log(html);
    if(!scrolled)
    {
      html = html.replace(/Down/g, "Up");
    }
    else
    {
      html = html.replace(/Up/g, "Down");
    }
    el.innerHTML = html;



    if(!scrolled)
    {
      scrolled = 1;
    }
    else
    {
      scrolled = 0;
    }



  }









/*
window.add = function(time, appt, name)
{
  var el = document.getElementById("tAppts");
  var tds = el.getElementsByTagName("td");
  var matchRE = new RegExp(time, "i");


  for (var i = 0; i < tds.length; i++)
  {
    var html = tds[i].innerHTML;
    if(html.match(matchRE))
    {
      //console.log(html);
      tds[i+1].innerHTML = '<span class="calItem">' + appt + '</span>';
    }
  }
  addAppointment();  
}







window.addAppointment = function()
{
  var el = document.getElementById("tAppts");
  var tds = el.getElementsByTagName("td");
  var matchRE = new RegExp("calItem", "i");
  var appts = document.getElementById("scrollPageContent").innerHTML;
  //console.log(appts);
  if(!appts.isPrintable()) {appts = '<p style="color:#c89c23; font-size:12px;">Appointments</p>';}
  //console.log(appts);

  for (var i = 0; i < tds.length; i++)
  {
    var html = tds[i].innerHTML;
    if(html.match(matchRE))
    {
      //console.log(html);
      var time = tds[i-1].innerHTML;
      var arr = html.split(">");
      var appt = arr[1];
      arr = appt.split("<");
      appt = arr[0];
      //console.log(appt);
      var date = document.getElementById('selectedDate').innerHTML;
      arr = date.split("<");
      date = arr[0];
      //console.log(date);
      var add = '<p>' + date + '<br>' + time + ' ' + appt + ' with ' + '<a href="' + initStr[curr].label.url + '">' + initStr[curr].label.description + '</a></p>';
      //console.log(add);
      appts += add;
      createCookie(date, time + ':' + appt + ':' + initStr[curr].label.description, 30);

    }
  }

  document.getElementById("scrollPageContent").innerHTML = appts;
  //var rect = document.getElementById("scrollPageContent").getBoundingClientRect();
  scrollHeight = document.getElementById("scrollPageContent").clientHeight + 130;
  //console.log(scrollHeight);
  if(!scrolled)
  {
    scrollPage();
    setTimeout('scrollPage()', 5000);
  }
  else
  {
    scrollPage();
    scrollPage();
  }
  
}
*/








//var rect = document.getElementById("scrollCurl").getBoundingClientRect();
//var scrollStart = rect.top;


  //var rect = document.getElementById("scrollPageContent").getBoundingClientRect();
  //scrollHeight = document.getElementById("scrollPageContent").clientHeight + rect.top;

  
  
  //loadSearchItems();

  //loadSchedule();
  showCalendar(document.getElementById("headerClearfix"));
  document.getElementById("showCal").style.display = 'none';

  var calEl = Ext.getCmp('myCalendar');
  if(calEl) {calEl.update(calEl.activeDate, true);}


  //showLabel(curr);
  //setSliderPosition(curr);

  loadUsers();
  loadInfoFromLinkedIn();

  waitLoading9();
  //Load Cart Items if any
  waitLoading12();

  windowResize();

}); //End Ext.onReady




var loopCount;
var countdown;
var dir = 0;

function countdown_init(dir)
{
    loopMax = 60;
    loopCount = loopMax;
    countdown_trigger();
}

function countdown_trigger()
{
    if(loopCount > 0)
    {
        var x = Math.sin(loopCount) * 5;
        var y = Math.sin(loopCount);
        //if(dir) {x = 0;} else {y = 0;}
        var t = Math.cos(loopCount) * 100;
        document.body.style.backgroundPosition = x + 'px ' + y + 'px';
        t = loopCount < (loopCount/2) ? loopCount + 0 : loopMax - loopCount + 0;
        countdown = setTimeout('countdown_trigger()', t*6);
        loopCount--;
    }
}

function countdown_clear()
{
    clearTimeout(countdown);
}



String.prototype.capitalize = function()
{
  return this.charAt(0).toUpperCase() + this.slice(1);
}


String.prototype.isPrintable=function()
{
  var re=/[^ -~]/;
  return !re.test(this);
}



function ellipsizeTextBoxToHeightByElement(el)
{
  //console.log("ID: " + id);
  //var el = document.getElementById(id);
  var keep = el.innerHTML;
  //console.log(keep);
  //return;
  //i = 1000;
  //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
  while(el.scrollHeight > el.offsetHeight)
  {
    el.innerHTML = keep;
    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
    keep = el.innerHTML;
    el.innerHTML = el.innerHTML + "... [MORE]";
    //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
    //i--;
  }
  //console.log(el.innerHTML);   
}




function ellipsizeTextBox(id)
{
  //console.log("ID: " + id);
  var el = document.getElementById(id);
  if(!el) {return;}
  var keep = el.innerHTML;
  //console.log(keep);
  //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
  while(el.scrollHeight > el.offsetHeight)
  {
    el.innerHTML = keep;
    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
    keep = el.innerHTML;
    el.innerHTML = el.innerHTML + "... [MORE]";
    //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
  }
  //console.log(el.innerHTML);   
}


function ellipsizeCartItems(id, email)
{
  var el = document.getElementById(id);
  var child = el.firstChild;

  while(child)
  {
    while(child && child.nodeType !== 1){child = child.nextSibling;}
    if(child)
    {
      //child.style.height = 60 + 'px';
      var contentEl = child.getElementsByTagName('div');
      //console.log(contentEl[2].innerHTML);
      //contentEl[2].style.height = 60 + 'px';

      setTimeout(function(contentEl) {
        return function()
        {
          if(email) {if(contentEl[1]) {ellipsizeTextBox(contentEl[1].id);}}
          else      {if(contentEl[3]) {ellipsizeTextBox(contentEl[3].id);}}
        }
      }(contentEl), 0);
      child = child.nextSibling;
    }
  }
}




function ellipsizeMailBox(el, idx)
{
  //var el = document.getElementById(id);

  var ball = document.getElementById("progressBall");
  //ellipsizeMailBox(contentEl[0], idx++)
  var mLeft = 1 + ((idx % 5) * 8);
  //console.log("MLEFT: " + mLeft);
  ball.style.marginLeft = parseInt(mLeft,10) + 'px';

  var keep = el.innerHTML;
  //console.log("WORKING ON MAIL: " + idx);
  if(!mailMessage[idx]) {mailMessage[idx] = keep};
  //mailMessage[idx] = keep;
  //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
  while(el.scrollHeight > el.offsetHeight)
  {
    el.innerHTML = keep;
    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
    keep = el.innerHTML;
    el.innerHTML = el.innerHTML + "... [MORE]";
  }   
}

function getMailIndex(el)
{
  var parent = el.parentNode;
  var id = parent.id;
  var index = id.replace("mail","");
  return parseInt(index,10);
}

function getMailIndexOLD(el)
{
  var parent = el.parentNode;
  var imgSibling = parent.getElementsByTagName('img');
  var sibling = imgSibling[0];
  var grandparent = el.parentNode.parentNode;
  var imgs = grandparent.getElementsByTagName('img');
  //console.log("IMGS: " + imgs.length);
  for(var i = 0; i < imgs.length; i++)
  {
    if(imgs[i] == sibling) {return i;}
  }
  return 0;
}




function getNumericStyleProperty(style, prop){
    return parseInt(style.getPropertyValue(prop),10) ;
}

function element_position(e) {
    var x = 0, y = 0;
    var inner = true ;
    do {
        //console.log("ID: " + e.id);
        x += e.offsetLeft;
        y += e.offsetTop;
        var style = getComputedStyle(e,null) ;
        var borderTop = getNumericStyleProperty(style,"border-top-width") ;
        var borderLeft = getNumericStyleProperty(style,"border-left-width") ;
        y += borderTop ;
        x += borderLeft ;
        if (inner){
          var paddingTop = getNumericStyleProperty(style,"padding-top") ;
          var paddingLeft = getNumericStyleProperty(style,"padding-left") ;
          y += paddingTop ;
          x += paddingLeft ;
        }
        inner = false ;
    } while (e = e.offsetParent);
    return { x: x, y: y };
}



function single_element_position(e) {
    var x = 0, y = 0;
    var inner = true ;
    //do {
    //console.log("ID: " + e.id);
        x += e.offsetLeft;
        y += e.offsetTop;
        var style = getComputedStyle(e,null) ;
        var borderTop = getNumericStyleProperty(style,"border-top-width") ;
        var borderLeft = getNumericStyleProperty(style,"border-left-width") ;
        y += borderTop ;
        x += borderLeft ;
        if (inner){
          var paddingTop = getNumericStyleProperty(style,"padding-top") ;
          var paddingLeft = getNumericStyleProperty(style,"padding-left") ;
          y += paddingTop ;
          x += paddingLeft ;
        }
        inner = false ;
	//} while (e = e.offsetParent);
    return { x: x, y: y };
}



function unEllipsizeMailBox(el)
{
  //console.log(el.parentNode.id);
  var idx = getMailIndex(el);
  //console.log(idx);
  el.innerHTML = mailMessage[idx];
  var height = el.parentNode.style.height;
  height =  parseInt(height.replace("px",""),10);
  height+=2;
  el.parentNode.style.height = el.scrollHeight + 'px';

  var maxHeight = document.getElementById('mail').style.maxHeight;
  maxHeight = parseInt(maxHeight.replace("px",""),10);
  //console.log(maxHeight);
  var scrollHeight = document.getElementById('mail').scrollHeight;
  var scrollTop = document.getElementById('mail').scrollTop;
  //console.log(scrollHeight);
  //console.log(scrollTop);

  var p = element_position(el);
  //var p = single_element_position(el);
  //console.log("X: " + p.x + " Y: " + p.y);

  var e = e || window.event;
  var target = e.target || e.srcElement;
  //console.log(e);
  //console.log(target);
  target = target.parentNode.parentNode;
  //console.log(target);


  var x = e.pageX - p.x;
  var y = e.pageY - p.y;
  var rect = target.getBoundingClientRect();
  var offsetX = e.clientX - rect.left;
  var offsetY = e.clientY - rect.top;

  //console.log("Y: " + p.y);
  //console.log("Y: " + y);
  //console.log("FULL: " + scrollHeight);
  //console.log("e.pageY: " + e.pageY);
  //console.log("e.clientY: " + e.clientY);
  //console.log("rect.top: " + rect.top);
  //console.log("offsetY: " + offsetY);
  
  var diff = el.scrollHeight - height;
  //console.log("DIFF: " + diff);

  var position = 0;
  for(var i = 1; i < idx-1; i++) {position+=height;}
  if(idx) {position += el.scrollHeight;}

  position = idx*height;
  var percent =  (position) / scrollHeight;
  var top = (percent * scrollHeight);
  top = document.getElementById('mail').scrollTop + (e.clientY - maxHeight);
  //console.log("HEIGHT: " + height);
  //console.log("PERCENTAGE: " + percent);
  //console.log("TOP: " + top);
  //console.log(document.getElementById('mail').scrollOffset);

  //console.log((offsetY + el.scrollHeight));
  var scroll = (maxHeight < (offsetY + el.scrollHeight));
  top = document.getElementById('mail').scrollTop + ((offsetY + el.scrollHeight) - maxHeight);

  //console.log("X: " + x + " Y: " + y);
  //console.log("X: " + offsetX + " Y: " + offsetY);
  //if(maxHeight < scrollHeight) {console.log("NEED TO DO SOMETHING"); document.getElementById('mail').scrollTop = top;}
  //if(maxHeight < e.clientY) {document.getElementById('mail').scrollTop = top;}
  if(scroll) {document.getElementById('mail').scrollTop = top;}
}



function ellipsizeMailBoxes(id)
{
  //console.log("ellipsizeMailBoxes");
  var el = document.getElementById(id);
  var child = el.firstChild;
  var idx = 0;

  if(Object.size(mail)) {document.getElementById('mailLoading').style.display = '';}
  while(child)
  {
    while(child && child.nodeType !== 1){child = child.nextSibling;}
    if(child)
    {
      child.style.height = 60 + 'px';
      var contentEl = child.getElementsByTagName('div');
      //console.log(contentEl[0].innerHTML);

      setTimeout(function(contentEl) {
        return function()
        {
          ellipsizeMailBox(contentEl[0], idx++);
          var size = Object.size(mail);
          var complete = parseInt(size,10) == idx;

          if(complete) {document.getElementById('mailLoading').style.display = 'none';}
        }
      }(contentEl), 0);
      child = child.nextSibling;
    }
  }
}






function renumberMailBoxes(id)
{
  var el = document.getElementById(id);
  var child = el.firstChild;
  var idx = 0;

  while(child)
  {
    while(child && child.nodeType !== 1){child = child.nextSibling;}
    if(child)
    {
      var contentEl = child.getElementsByTagName('div');
      //console.log("MY ID: " + contentEl[0].parentNode.id);
      contentEl[0].parentNode.id = 'mail' + idx++;
      child = child.nextSibling;
    }
  }
}









function populateSideBarMenu ()
{
  var sideBarMenu = document.getElementById("sideBarMenu");
  if(!sideBarMenu.innerHTML)
  {
    var sbInterviewer = document.createElement("div");
    sbInterviewer.id = "sbInterviewer";
    sbInterviewer.className = "qlHeader";
    sbInterviewer.innerHTML = "<h3>INTERVIEWER PROFILE</h3>";

    var sbInterviewee = document.createElement("div");
    sbInterviewee.id = "sbInterviewee";
    sbInterviewee.className = "qlHeader";
    sbInterviewee.innerHTML = "<h3>INTERVIEWEE PROFILE</h3>";

    var sbInterviewerTools = document.createElement("div");
    sbInterviewerTools.id = "sbInterviewerTools";
    sbInterviewerTools.className = "qlHeader";
    sbInterviewerTools.innerHTML = "<h3>INTERVIEWER TOOLS</h3>";

    var sbInterviewerInfo = document.createElement("div");
    sbInterviewerInfo.id = "sbInterviewerInfo";
    sbInterviewerInfo.className = "qlHeader";
    sbInterviewerInfo.innerHTML = "<h3>INTERVIEWER INFO</h3>";


    // ----INTERVIEWEE----
    if(productStore.getById(user[0].inID).data.role == 'find' || productStore.getById(user[0].inID).data.role == 'both')
    {
      sideBarMenu.appendChild(sbInterviewee);

      var statusObj = getHistoryStatuses();

      var elID = 'sbInterviewee'; 
      //console.log(elID);
      var el = document.getElementById(elID);
      var innerHTML = '<div class="qlSection">';
      //var sorted_keys = Object.keys(filters.services).sort(window.sortFilters);
      for(var i = 0; i < historyFilters.status.length; i++)
      {
        var item = historyFilters.status[i];
        var key = 'status';
	//console.log(item);
        innerHTML += '<span onmouseover="this.style.cursor=\'pointer\';" onclick="doHistoryQuickLink(\'' + key + '\',\'' + item + '\',\'interviewee\'); addFilterTypeToList(\'' + key + "Filter" + '\', \'' + "historyFilterList" + '\');">' + '  ' + item + ' (' + statusObj[item] + ')</span><br>';
      }
      el.innerHTML += innerHTML + '</div>';
    }


    // ----INTERVIEWER----
    if(productStore.getById(user[0].inID).data.role == 'give' || productStore.getById(user[0].inID).data.role == 'both')
    {
      sideBarMenu.appendChild(sbInterviewer);

      var statusObj = getProviderHistoryStatuses();

      var elID = 'sbInterviewer'; 
      //console.log(elID);
      var el = document.getElementById(elID);
      var innerHTML = '<div class="qlSection">';
      //var sorted_keys = Object.keys(filters.services).sort(window.sortFilters);
      for(var i = 0; i < historyFilters.status.length; i++)
      {
        var item = historyFilters.status[i];
        var key = 'status';
	//console.log(item);
        innerHTML += '<span onmouseover="this.style.cursor=\'pointer\';" onclick="doHistoryQuickLink(\'' + key + '\',\'' + item + '\',\'interviewer\'); addFilterTypeToList(\'' + key + "Filter" + '\', \'' + "historyFilterList" + '\');">' + '  ' + item + ' (' + statusObj[item] + ')</span><br>';
      }
      el.innerHTML += innerHTML + '</div>';

      //INFO
      sideBarMenu.appendChild(sbInterviewerInfo);
      var elID = 'sbInterviewerInfo'; 
      //console.log(elID);
      var el = document.getElementById(elID);
      var charityCoins = productStore.getById(user[0].inID).data.coins ? Ext.JSON.decode(productStore.getById(user[0].inID).data.coins || 0) : 0;
      var charityCoinStr = '<div style="position: relative; color: #555;" title="Services performed for free earn you Charity Coins"><span>Charity Coins</span><img src="./images/coins.png"/><span style="position: absolute; top: 40px; left: 1px; width: 36px; text-align: center; border: 0px solid #00ff00;">' + charityCoins + '</span></div>';


      var innerHTML = '<div class="qlSection" style="max-height: 220px;">';

      innerHTML += charityCoinStr + '<br>';

      innerHTML += '<input type="checkbox" name="sbInfoConfidential" style="color: #000000;" onclick="updateConfidentiality(this.checked);">Anonymous</input><br><br>';

      innerHTML += '<div class="a-button a-button-medium" style="z-index: 1000; height: 35px;" onclick="showSelectServices();"><span class="a-button-inner a-button-text" style="padding-top: 12px; font-size: 11px; line-height: 11px;">Create/Edit Service</span></div><br>';

      var invitations = 20;
      innerHTML += '<div class="a-button a-button-medium" style="z-index: 1000; height: 35px; margin-top: 10px;" onclick="inviteOthers();"><span class="a-button-inner a-button-text" style="padding-top: 12px; font-size: 11px; line-height: 11px;">Send Invite (' + invitations + ' left)</span></div>';




      //<div class="a-button a-button-medium" style="height: 35px;" onclick="showSelectServices();"><span class="a-button-inner" style="padding-top: 10px;"><span class="a-button-text" style="margin-left: 0px; padding-top: 0px; font-size: 11px; line-height: 21px;">Create/Edit Service</span></span></div>';

      el.innerHTML += innerHTML + '</div>';

      if(user[0].inID)
      {
        if(settings[user[0].inID])
        {
          setGroup("sbInfoConfidential", settings[user[0].inID]['identity']);
        }
      }




      //TOOLS
      sideBarMenu.appendChild(sbInterviewerTools);
      var elID = 'sbInterviewerTools'; 
      //console.log(elID);
      var el = document.getElementById(elID);
      var innerHTML = '<div class="qlSection">';
      innerHTML += '<a style="color: #555;" href="http://www.circuitmirror.com" target="_blank">Analog Schematic Drawing</a><br><a style="color: #555;" href="http://www.circuitmirror.com/whiteboard" target="_blank">Whiteboard</a>';
      el.innerHTML += innerHTML + '</div>';
    }








  }
}
















function doSearch(arg)
{
  //console.log(window.location.href);
  //var hash = (window.location.href.split("?")[1] || "");
  //var tag = arg || hash.split("=")[1] || "";
  //hash = hash.split("\.")[0] || "";
  //console.log(hash);
  //console.log(tag);

  arg = arg || document.getElementById('explore').value;
  document.getElementById('explore').value = arg;
  loadSearchItems(arg);
  document.getElementById('explore').focus();

  searchResults.innerHTML = initStr.length + ' Results Found';
  Ext.get("searchResults").fadeIn({opacity: 1.0, easing: 'easeIn', duration: 1000});
  Ext.get("searchResults").fadeOut({opacity: 0.0, easing: 'easeIn', duration: 3000});

  
}



function showServices()
{
  if(servicesLoaded) {return;}
  //console.log(user[0].inID);
  if(!productStore.getById(user[0].inID)) {return;}
  //if(productStore.getById(user[0].inID).data.role != 'find')
  if(1)
  {
    var services = productStore.getById(user[0].inID).data.providedServices ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providedServices) : {};
    //console.log(services);
    for (var key in services)
    {
      //console.log(key);
      var matchRE = new RegExp("In-person", "i");
      var interview = key.match(matchRE);

      var matchRE = new RegExp("Remote", "i");
      var remote = key.match(matchRE);

      var matchRE = new RegExp("Mentor|Coach", "i");
      var coaching = key.match(matchRE);

      var matchRE = new RegExp("Review|Critique", "i");
      var critiquing = key.match(matchRE);

      var matchRE = new RegExp("Tips", "i");
      var tips = key.match(matchRE);


      
      if(interview)
      {
        var el = document.getElementById('selectInPersonInterview');
        el.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)";
        serviceClicked(el,false,services[key].price);
      }
      else if(remote)
      {
        var el = document.getElementById('selectRemoteInterview');
	el.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)";
	serviceClicked(el,false,services[key].price);
      }
      else if(coaching)
      {
        var el = document.getElementById('selectCoaching');
	el.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)";
	serviceClicked(el,false,services[key].price);
      }
      else if(critiquing)
      {
	var el = document.getElementById('selectCritiquing');
	el.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)";
	serviceClicked(el,false,services[key].price);
      }
      else if(tips)
      {
	var el = document.getElementById('selectTips');
	el.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)";
	serviceClicked(el,false,services[key].price);
      }
      
    }
  }
  servicesLoaded = true;
}



function getServices(inID)
{
  var servicesClicked = new Array();
  if(!productStore.getById(inID)) {return;}
  var services = productStore.getById(inID).data.providedServices ? Ext.JSON.decode(productStore.getById(inID).data.providedServices) : {};
  //console.log(services);
  for (var key in services)
  {
    servicesClicked.push(key);
  }
  return servicesClicked;
}

function getClickedServices(inID, force)
{
  var servicesClicked = new Array();
  if(!productStore.getById(inID)) {return;}
  //if(productStore.getById(inID).data.role != 'find')
  if(1)
  {
    var services = productStore.getById(inID).data.providedServices ? Ext.JSON.decode(productStore.getById(inID).data.providedServices) : {};
    //console.log(services);
    for (var key in services)
    {
      //console.log(key);
      var matchRE = new RegExp("In-person", "i");
      var interview = key.match(matchRE);

      var matchRE = new RegExp("Remote", "i");
      var remote = key.match(matchRE);

      var matchRE = new RegExp("Mentor", "i");
      var coaching = key.match(matchRE);

      var matchRE = new RegExp("Review", "i");
      var critiquing = key.match(matchRE);

      var matchRE = new RegExp("Tips", "i");
      var tips = key.match(matchRE);

      if(interview)
      {
        var el = document.getElementById('serviceInPersonInterview');
        var file = decodeURI(el.src);
        var img = file.split(/\//);
        file = img.pop();
        img = file.split(/\./);
        file = img.shift();
        file = file.replace(/Over/, "");
        //console.log(file);

        var matchRE = new RegExp("Selected", "i");
        if(file.match(matchRE) || force)
        {
          servicesClicked.push("Interview");
	}
      }
      else if(remote)
      {
        var el = document.getElementById('serviceRemoteInterview');
        var file = decodeURI(el.src);
        //console.log(file);
        var img = file.split(/\//);
        file = img.pop();
        img = file.split(/\./);
        file = img.shift();
        file = file.replace(/Over/, "");
        //console.log(file);

        var matchRE = new RegExp("Selected", "i");
        if(file.match(matchRE) || force)
        {
          servicesClicked.push("Remote Interview");
	}
      }
      else if(coaching)
      {
        var el = document.getElementById('serviceCoaching');
        var file = decodeURI(el.src);
        //console.log(file);
        var img = file.split(/\//);
        file = img.pop();
        img = file.split(/\./);
        file = img.shift();
        file = file.replace(/Over/, "");
        //console.log(file);

        var matchRE = new RegExp("Selected", "i");
        if(file.match(matchRE) || force)
        {
          servicesClicked.push("Interview Mentoring");
	}
      }
      else if(critiquing)
      {
	var el = document.getElementById('serviceCritiquing');
        var file = decodeURI(el.src);
        var img = file.split(/\//);
        file = img.pop();
        img = file.split(/\./);
        file = img.shift();
        file = file.replace(/Over/, "");
        //console.log(file);

        var matchRE = new RegExp("Selected", "i");
        if(file.match(matchRE) || force)
        {
          servicesClicked.push("Resume Review");
	}
      }
      else if(tips)
      {
	var el = document.getElementById('serviceTips');
        var file = decodeURI(el.src);
        var img = file.split(/\//);
        file = img.pop();
        img = file.split(/\./);
        file = img.shift();
        file = file.replace(/Over/, "");
        //console.log(file);

        var matchRE = new RegExp("Selected", "i");
        if(file.match(matchRE) || force)
        {
          servicesClicked.push("Interview Tips");
	}
      }
    }
  }
  return servicesClicked;
}



function updateRadiusConversion(mi)
{
  var km = (mi * 1.60934).toFixed(1);
  document.getElementById("radiusConversion").innerHTML = mi + ' miles = ' + km +' kilometers';
}

function serviceClicked(el, getPrice, price)
{
  var file = el.src;
  var img = file.split(/\//);
  file = img.pop();
  img = file.split(/\./);
  file = img.shift();
  file = file.replace(/Over/, "");
  //console.log(file);

  var matchRE = new RegExp("Selected", "i");
  if(file.match(matchRE))
  {
    file = file.replace(/Selected/, "");
    el.src = "images/" + file + ".jpg";
    el.onmouseover=function() { this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/" + file + "Over.jpg"; }; 
    el.onmouseout=function() { this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/" + file + ".jpg"; };
    if(getPrice) {delete services[decodeURI(file)];}
    var servicePrice = document.getElementById(file + "_servicePrice");
    if(servicePrice && getPrice) {el.parentNode.parentNode.removeChild(servicePrice);}

    if(document.getElementById(file + "_serviceInfo")) {el.parentNode.parentNode.removeChild(document.getElementById(file + "_serviceInfo"));}


    if(document.getElementById("makeApptBlister") && !getNumServices())
    {
      var blister = document.getElementById("makeApptBlister");
      //blister.style.display = "none";
      if(document.getElementById("ratingsContainer")) {document.getElementById("ratingsContainer").style.display="none";}
      if(document.getElementById("calContainer")) {document.getElementById("calContainer").style.display="none";}
      if(document.getElementById("infoContents")) {document.getElementById("infoContents").style.display="";}
      lockScroll = 0;
    }
  }
  else
  {
    //console.log(file);
    el.src = "images/" + file + "Selected.jpg";
    el.onmouseout=function() {} ;
    el.onmouseover=function() {} ;
    //services[decodeURI(file)] = true;
    //console.log(el.src);
    var matchRE = new RegExp("In-person", "i");
    var inPerson = file.match(matchRE);
    

    if(price)
    {
      var servicePrice = document.createElement("span");
      servicePrice.id = file + "_servicePrice";
      servicePrice.className = "servicePrice";
      servicePrice.innerHTML = '$' + price + '/hr';
      servicePrice.style.marginTop = 0 + "px";
      el.parentNode.parentNode.appendChild(servicePrice);
      if(!services[decodeURI(file)]) {services[decodeURI(file)] = {};}
      services[decodeURI(file)].price = price;
    }
    if(inPerson)
    {
      var providedServices = productStore.getById(user[0].inID).data.providedServices ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providedServices) : {};
      var locality = providedServices[decodeURI(file)].locality || '';
      var province = providedServices[decodeURI(file)].province || '';
      var postalCode = providedServices[decodeURI(file)].postalCode || '';
      var radius = providedServices[decodeURI(file)].radius || 0;

      var serviceInfo = document.createElement("span");
      serviceInfo.id = file + "_serviceInfo";
      serviceInfo.className = "serviceInfo";
      serviceInfo.innerHTML = 'Within ' + radius + ' miles of<br>' + locality + ', ' + province + ' ' + postalCode + '<br>';
      el.parentNode.parentNode.appendChild(serviceInfo);
    }


    if(getPrice)
    {
      var matchRE = new RegExp("In-person", "i");
      var inPerson = file.match(matchRE);
      var msg = '<div class="serviceDetails">Please enter the amount you will charge, in U.S. Dollars, per hour for this service (Enter 0 for no charge).<br /><br /><label for="servicePriceText">US Dollars $:</label><input id="servicePriceText" name="servicePriceText" type="textbox"/>';
      if(inPerson)
      {
	msg += '<br><label for="serviceLocalityText">City/Locality:</label><input id="serviceLocalityText" name="serviceLocalityText" type="textbox"/>';
	msg += '<br><label for="serviceProvinceText">State/Province/Region:</label><input id="serviceProvinceText" name="serviceProvinceText" type="textbox"/>';
	msg += '<br><label for="servicePostalCodeText">Zip/Postal Code:</label><input id="servicePostalCodeText" name="servicePostalCodeText" type="textbox"/>';
	msg += '<br><label for="serviceRadiusText">Service Radius:</label><select id="serviceRadiusText" name="serviceRadiusText" onclick="updateRadiusConversion(this.value);"><option value="0">0 miles</option><option value="5">5 miles</option><option value="10">10 miles</option><option value="25">25 miles</option><option value="50">50 miles</option><option value="100">100 miles</option></select><span id="radiusConversion">1 mile = 1.6 kilometers</span>';
      }
      msg += '</div>';


      var mbox = Ext.Msg.show({
        title:    'Charge for this Service?',
        msg:      msg,
        buttons:  Ext.MessageBox.OKCANCEL,
        icon: Ext.Msg.QUESTION,
	defaultFocus: 'price', 
	callback: function(btn, text, cfg )
        {
          if( btn == 'ok')
          {
            if(isNaN(Ext.get('servicePriceText').getValue()))
	    {
              var newMsg = cfg.msg.match(/error/) ? cfg.msg : '<span style="color:red;" class="error">' + 'You must enter a valid number' + '</span>' + '<br><br>' + cfg.msg;
              Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
	    }
            var price = currencyFormatted(Math.abs(Ext.get('servicePriceText').getValue()));
            //console.log(price);
            if(!services[decodeURI(file)]) {services[decodeURI(file)] = {};}
            if(inPerson)
	    {
              var locality = Ext.get('serviceLocalityText').getValue();
              var province = Ext.get('serviceProvinceText').getValue();
              var postalCode = Ext.get('servicePostalCodeText').getValue();
              var radius = Ext.get('serviceRadiusText').getValue();

              if(!locality || !province || !postalCode)
	      {
                var newMsg = cfg.msg.match(/error/) ? cfg.msg : '<span style="color:red;" class="error">' + 'You must completely fill out all items' + '</span>' + '<br><br>' + cfg.msg;
                Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
	      }

              if(document.getElementById(file + "_serviceInfo")) {el.parentNode.parentNode.removeChild(document.getElementById(file + "_serviceInfo"));}
              var serviceInfo = document.createElement("span");
              serviceInfo.id = file + "_serviceInfo";
              serviceInfo.className = "serviceInfo";
              serviceInfo.innerHTML = 'Within ' + radius + ' miles of<br>' + locality + ', ' + province + ' ' + postalCode + '<br>';
              el.parentNode.parentNode.appendChild(serviceInfo);


              services[decodeURI(file)].locality = locality;
              services[decodeURI(file)].province = province;
              services[decodeURI(file)].postalCode = postalCode;
              services[decodeURI(file)].radius = radius;
	    }
            var servicePrice = document.createElement("span");
            servicePrice.id = file + "_servicePrice";
            servicePrice.className = "servicePrice";
            servicePrice.innerHTML = '$' + price + '/hr';
            servicePrice.style.marginTop = 0 + "px";
            services[decodeURI(file)].price = price;

            if(document.getElementById(file + "_servicePrice")) {el.parentNode.parentNode.removeChild(document.getElementById(file + "_servicePrice"));}
            el.parentNode.parentNode.appendChild(servicePrice);
          }
          else {serviceClicked(el, true);}
        }
      });
      //msgBox.show();
      //document.getElementById('price').focus();
      //mbox.afterrender = function(this, eOpts) {var f = Ext.get('price'); f.focus.defer(500, f);}
      //mbox.on("show", function() {
      //		console.log("RENDERED");
      //});
    }//if(getPrice)

    if(document.getElementById("makeApptBlister"))
    {
      var blister = document.getElementById("makeApptBlister");
      blister.style.display = "";
      //lockScroll = 1;
    }
  }

}






function getNumServices()
{
  var num = 0;
  for (var key in services)
  {
    //console.log('KEY: ' + key + ' = ' + services[key]);
    if(services[key]) {num++;}
  }
  return num;
}

function convertTimeTo24(time)
{
  //console.log("CONVERT TIME: " + time);
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1].toUpperCase();
  if(AMPM == "PM" && hours<12) hours = hours+12;
  if(AMPM == "AM" && hours==12) hours = hours-12;
  var sHours = pad(hours.toString(),2);
  var sMinutes = pad(minutes.toString(),2);
  //console.log(sHours + ":" + sMinutes);
  return {hour: sHours, minute: sMinutes};
}


function convertTimeTo12(time)
{
  //console.log("CONVERT TIME: " + time);
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = '';
  if(hours<12) {AMPM = 'am';}
  else if(hours==24) {AMPM = 'am'; hours = hours-12;}
  else if(hours==12) {AMPM = 'pm';}
  else {AMPM = 'pm'; hours = hours-12;}
  //if(hours == 0) {hours = 24;}
  var sHours = pad(hours.toString(),2);
  var sMinutes = pad(minutes.toString(),2);
  //console.log(sHours + ":" + sMinutes);
  return {hour: sHours, minute: sMinutes, ampm: AMPM};
}


function localizeTime(inID, time, thisDayIndex, thisMonthIndex, thisYear)
{
  //console.log("LOCALIZETIME: " + time);

  var tzPRV = productStore.getById(inID).data.tzName;
  var tzUSR = productStore.getById(user[0].inID).data.tzName;

  var day = parseInt(thisDayIndex,10);
  var month = parseInt(thisMonthIndex-1,10);
  day = pad(day, 2);
  month = pad(month, 2);
  var year = thisYear;

  var timeStr = Number(time.match(/^(\d+)/)[1]) + ':00' + ' ' + time.match(/([ap]m)/);
  timeStr = timeStr.replace(/\,[ap]m$/,'');
  //console.log(timeStr);
  var timeObj = convertTimeTo24(timeStr);
  var hour = timeObj.hour;
  var minute = timeObj.minute;
  
  //console.log(year + ' ' + month + ' ' + day + ' ' + hour + ' ' + minute);

  var dtPRV = new timezoneJS.Date(year, month, day, hour, minute, tzPRV);
  var utcPRV = dtPRV.getTime();
  var dtUSR = new timezoneJS.Date(utcPRV, tzUSR);  //PRV hour directly converted to USR hour

  var localHour = pad(parseInt(dtUSR.getHours(),10),2);
  var localMinutes = pad(parseInt(dtUSR.getMinutes(),10),2);
  var localTimeStr = localHour + ':' + localMinutes;
  //console.log(localTimeStr);

  var timeObj = convertTimeTo12(localTimeStr);
  var hour = timeObj.hour;
  var minute = timeObj.minute;
  var ampm = timeObj.ampm;
  localTimeStr = hour + ':' + minute + ampm;
  //console.log(hour + ':' + minute + ampm);
  return {dateObj: dtUSR, localTimeStr: localTimeStr};
}




function localizeApptScheduler(inID)
{
  var table = document.getElementById("myAppts");
  for (var i = 1, row; row = table.rows[i]; i++)
  {

    var localTimeObj = localizeTime(inID, row.cells[1].innerHTML, dayIndex, monthIndex, year);
    var localTime = localTimeObj.localTimeStr;
    row.cells[1].innerHTML = localTime;

    if(i == 1)
    {
      var date = localTimeObj.dateObj;
      var tzUSR = productStore.getById(user[0].inID).data.tzName;
      var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
      var headerDate = document.getElementById("myApptHeaderDate");
      headerDate.innerHTML = dayNames[date.getDay()] + '  ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';
    }


    //row.cells[1].firstChild.value = localTime;

    /*
    for (var j = 0, col; col = row.cells[j]; j++)
    {
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      if(j==0) {console.log("ROW[" + i + "]COL[" + j + "] = " + col.innerHTML);}
      if(j==1) {console.log("ROW[" + i + "]COL[" + j + "] = " + col.firstChild.value);}
    }  
    */
  }
}



function unlocalizeApptScheduler()
{
  var table = document.getElementById("myAppts");
  for (var i = 1, row; row = table.rows[i]; i++)
  {

    row.cells[1].innerHTML = row.cells[0].firstChild.value;

    /*
    for (var j = 0, col; col = row.cells[j]; j++)
    {
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      if(j==0) {console.log("ROW[" + i + "]COL[" + j + "] = " + col.innerHTML);}
      if(j==1) {console.log("ROW[" + i + "]COL[" + j + "] = " + col.firstChild.value);}
    }  
    */
  }
}







function localizeSch(sch, inID, thisDayIndex, thisMonthIndex, thisYear)
{
  var isAPPT = true;
  var isAVAIL = false;
  var returnStr = "";
  var dateStr = "";

  //console.log(inID);
  var split = sch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);

    if(appt) {isAVAIL = false; isAPPT = true; continue;}
    else if(avail) {isAPPT = false; isAVAIL = true; continue;}
    if(isAVAIL)
    {
      if(split[i] && split[i].match(/([ap]m)/))
      {
        //console.log(split[i]);
        var localTimeObj = localizeTime(inID, split[i], thisDayIndex, thisMonthIndex, thisYear);
        var localTime = localTimeObj.localTimeStr;
        if(!dateStr)
        {
          var date = localTimeObj.dateObj;
          var tzUSR = productStore.getById(inID).data.tzName;
          var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
          dateStr = dayNames[date.getDay()] + '  ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';
	}
        //console.log(localTime);
        split[i] = localTime;
        //console.log(split[i]);
      }
    }
    if(isAPPT)
    {
      if(split[i])
      {
	var apptSplit = split[i].split(/\s*--\s*/);
        if(!apptSplit[0].match(/([ap]m)/)) {continue;}
        //console.log(apptSplit[0]);
        var localTimeObj = localizeTime(inID, apptSplit[0], thisDayIndex, thisMonthIndex, thisYear);
        var localTime = localTimeObj.localTimeStr;
        if(!dateStr)
        {
          var date = localTimeObj.dateObj;
          var tzUSR = productStore.getById(inID).data.tzName;
          var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
          dateStr = dayNames[date.getDay()] + '  ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';
	}
        //console.log(localTime);
        apptSplit[0] = localTime;
	split[i] = apptSplit.join(" -- ");
      }
    }
  }
  return {sch: split.join('<br>'), dateStr: dateStr};
}


function convertCartItemKeys(items)
{
  var itemsWithConvertedKeys = {};

  for(var key in items)
  {
    var split = key.split(/\:/);
    var day = split[1];
    var thisAppt = items[key];

    var date = {};
    date = getDateIndexes(day);

    var d = date.dayIndex;
    var m = date.monthIndex;
    var y = date.year;
    d = pad(d, 2);
    m = pad(m, 2);
    var tDay = d + "/" + m + "/" + y;

    itemsWithConvertedKeys[tDay] = thisAppt;
  }
  return itemsWithConvertedKeys;
}


function showApptScheduler(sch, selected, oldSch)
{
  var r = document.getElementsByName("apptTime");
  for (var i = 0; i < r.length; i++)
  {
    r[i].checked = false;
  }

  var inID = initStr[curr].id;
  localizeApptScheduler(inID);

  var controlValue = {};
  //var split = sch.split('\n');
  var split = sch.split('<br>');
  split.shift();
  for(var i = 0; i < split.length; i++) {controlValue[split[i]] = true;}
  enableGroup("apptTime");
  enableGroup("selectService");
  addOptions("selectService", selected);
  disableGroup("apptTime", controlValue);
  disableGroup("selectService", controlValue);

  //Show previously selected options
  //setGroupsFromSchedule("apptTime", "selectService", schedule);
  setGroupsFromSchedule("apptTime", "selectService", productStore.getById(user[0].inID).data.calendar ? Ext.JSON.decode(productStore.getById(user[0].inID).data.calendar) : {});
  if(Object.size(cartItems))
  {
    var cartItemsSchedule = convertCartItemKeys(cartItems);
    setGroupsFromSchedule("apptTime", "selectService", cartItemsSchedule);
  }

  //Disable previously scheduled hours from other providers
  //disableGroupsFromSchedule("apptTime", "selectService", schedule);
  disableGroupsFromSchedule("apptTime", "selectService", productStore.getById(user[0].inID).data.calendar ? Ext.JSON.decode(productStore.getById(user[0].inID).data.calendar) : {});

  getSubTotal();

  document.getElementById("apptScheduler").style.display = '';
  document.getElementById("scrollbar").style.zIndex = 40;
  document.getElementById("screen").style.display = '';
  windowResize();
}





function scheduleThisDay(cal)
{
  //console.log(cal.id);


  if(!linkedINlogin || !user[0])
  {
    Ext.MessageBox.show({
      title:    'Login Required',
      msg:      '<span>You must first login before making appointments</span><br><br><span class="pointer" onclick="IN.User.authorize();">Login using your linkedIN account</span>',
      buttons:  Ext.MessageBox.OK,
      icon:     Ext.Msg.WARNING
    });
    return;
  }



  
  curr = parseInt(cal.id.replace("currCalendar",""), 10);
  //var ID = initStr[curr].label.id;
  var ID = initStr[curr].id;
  var selected = new Array();
  var services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};
  var numServices = Object.size(services);
  //selected = getClickedServices(ID);
  selected = getServices(ID);
  var numSelected = selected.length;
  if(!numSelected)
  {
    var forced = true;
    //selected = getClickedServices(ID,forced);
    selected = getServices(ID);
  }
  //console.log(numSelected);

  
  //If none selected show all services
  //else show only selected services



  if(!numSelected && 0)
  {
    Ext.MessageBox.show({
      title:    'Service Selection Required',
      msg:      'You must first select the service for which you are tyring to schedule',
      buttons:  Ext.MessageBox.OK,
      icon:     Ext.Msg.WARNING
    });
    return;
  }
  else if(numSelected > 1 && 0)
  {
    Ext.MessageBox.show({
      title:    'Too many services',
      msg:      'You must only select the single service for which you are tyring to schedule',
      buttons:  Ext.MessageBox.OK,
      icon:     Ext.Msg.WARNING
    });
    return;
  }

  if(document.getElementById("ratingsContainer")) {document.getElementById("ratingsContainer").style.display="none";}

  
  if(document.getElementById("showCal"))
  {
    if(document.getElementById("showCal").style.display == 'none' && firstCalShow)
    {
      showCalendar(document.getElementById("headerClearfix"));
      document.getElementById("showCal").style.display = 'none';
    }
  }
  else {showCalendar(document.getElementById("headerClearfix")); document.getElementById("showCal").style.display = 'none';}
  


  day = pad(dayIndex, 2);
  month = pad(monthIndex, 2);
  //console.log(day + " " + month);

  var tDay = day + "/" + month + "/" + year;
  //var sch = getSchedule(cal, tDay);
  var sch = getSchedule(ID, tDay);
  //console.log(sch);

  var split = sch.split('\n');
  split.shift();
  var numSlots = split.length-1;


  if(numSelected > numSlots && 0)
  {
    Ext.MessageBox.show({
      title:    'Too many services',
      msg:      'You must only select the number of services that can fit into the schedule<br>Services selected: ' + numSelected + '<br>Available hourly slots: ' + numSlots,
      buttons:  Ext.MessageBox.OK,
      icon:     Ext.Msg.WARNING
    });
    return;
  }


  //var oldSch = getSchedule(Ext.getCmp('myCalendar'), tDay);
  var oldSch = getSchedule(user[0].inID, tDay);
  //console.log(oldSch);

  showApptScheduler(sch, selected, oldSch);


  //makeApptThisDay(dayIndex, monthIndex, year);

  //var calEl = Ext.getCmp('myCalendar');
  //if(calEl) {calEl.update(calEl.activeDate, true);}

}



function applySchedule()
{
  var thisAppt = makeApptThisDay(dayIndex, monthIndex, year);
  var apptDay = dayNames[dayNumber] + ' ' + monthNames[monthIndex-1] + ' ' + dayIndex + ', ' + year;
  var ID = initStr[curr].id;
  var day = dayIndex;
  var month = monthIndex;
  day = pad(day, 2);
  month = pad(month, 2);

  var tDay = day + "/" + month + "/" + year;


  if(thisAppt)
  {
    cartItems[ID + ':' + apptDay] = thisAppt;
  }
  else
  {
    delete cartItems[ID + ':' + apptDay];
  }
  saveCartItem(user[0].inID, cartItems);

  //TTJ
  subTotals[ID+tDay] = getSubTotalFromSch(thisAppt, ID);
  //console.log('['+ID+tDay+'] = ' + getSubTotalFromSch(thisAppt, ID));
  total = getTotal(subTotals);

  total = getTotalFromCartItems(cartItems);

  //console.log("TOTAL: " + total);

  var calEl = Ext.getCmp('myCalendar');
  if(calEl) {calEl.update(calEl.activeDate, true);}

  var parent = document.getElementById("headerClearfix");
  if(! document.getElementById("showApptAdded"))
  {
    var window = document.createElement("div");
    window.className = "show-cal darkGrey";
    window.id = "showApptAdded";

    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.style.display=\'none\';"></div>';
    close.style.position = "absolute";
    close.style.zIndex = 100;
    close.style.float = "right";
    close.style.right = 0 + "px";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);

    var content = document.createElement("div");
    content.className = "showApptAddedContent";
    content.id = "showApptAddedContent";
    window.appendChild(content);

    parent.appendChild(window);
  }
  else
  {
    if(thisAppt)
    {
      document.getElementById("showApptAdded").style.display = "";
    }
  }
  if(thisAppt)
  {
     var lsObj = localizeSch(thisAppt, ID, dayIndex, monthIndex, year);
     localDay = lsObj.dateStr;

    thisAppt = lsObj.sch;
    document.getElementById("showApptAddedContent").innerHTML = '<span style="color:#ffffff; font: bold 14px/14px Arial, Helvetica, sans-serif;">Appointment made</span><br><br>' + '<span style="color:#DAFF38; font: bold 11px/11px Arial, Helvetica, sans-serif;">' + thisAppt + '</span>';
    addMailMessage(ID, 'YOU HAVE AN APPOINTMENT FOR:<br>' + localDay + '<br>' + thisAppt, true, true);
  }
  else
  {
    document.getElementById("showApptAddedContent").innerHTML = '<span style="color:#ffffff; font: bold 14px/14px Arial, Helvetica, sans-serif;">Appointment cleared</span><br><br>' + '<span style="color:#DAFF38; font: bold 11px/11px Arial, Helvetica, sans-serif;">' + thisAppt + '</span>';
    addMailMessage(ID, 'YOU CLEARED YOUR APPOINTMENT FOR:<br>' + apptDay + '<br>' + thisAppt, true, true);
  }
  Ext.get("showApptAdded").fadeIn({opacity: 1.0, easing: 'easeIn', duration: 100});
  Ext.get("showApptAdded").fadeOut({opacity: 0.0, easing: 'easeIn', duration: 1000});


  if(total != 0)
  {
    Ext.get("promoCodeContainer").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionHeader").innerHTML = 'Choose your method of payment';
    document.getElementById("checkOutCallToActionConfirm").style.display = 'none';
    document.getElementById("checkOutCallToActionButtons").style.display = '';
  }
  else                       
  {
    Ext.get("promoCodeContainer").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionHeader").innerHTML = 'Confirm your appointment(s)';
    document.getElementById("checkOutCallToActionConfirm").style.display = '';
    document.getElementById("checkOutCallToActionButtons").style.display = 'none';
  }
  if(Object.size(cartItems))
  {
    Ext.get("cartItem").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium";
    document.getElementById("checkOutCallToAction").style.display = '';
    document.getElementById("Total").style.visibility = '';
  }
  else
  {
    Ext.get("cartItem").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium inactive";
    document.getElementById("checkOutCallToAction").style.display = 'none';
    document.getElementById("Total").style.visibility = 'hidden';
    document.getElementById("cartItems").innerHTML = '<h1 class="clearfix" style="margin-top: 100px; text-align: center;">Your Cart is Empty</h1>';
  }

  unlocalizeApptScheduler();
  document.getElementById("apptScheduler").style.display = 'none';
  document.getElementById("scrollbar").style.zIndex = 40;
  document.getElementById("screen").style.display = 'none';
  windowResize();


}




function makeAppt(id)
{

  //console.log('makeAppt' + "(" + id + ")");
  var index = parseInt(id.replace("searchItem",''),10);
  curr = index;
  var ID = initStr[index].id;
  // --Name--
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;


  if(!document.getElementById("calContainer" + index))
  {

    var container = document.createElement("div");
    container.id = "calContainer" + index;
    container.className = "calContainer";
    container.style.marginRight = 0 + "px";
    container.style.marginTop = 0 + "px";
    //container.style.zIndex = 55;

    var nameToDisplay = settings[ID]['identity'] ? 'Confidential' : name;
    var title = document.createElement("div");
    title.id = "calTitle";
    title.innerHTML = '<div class="sidebar"><ul class="contact"><li><p><span class="name"></span><em id="labelName">' + nameToDisplay + '\'s' + ' calendar</em></p></li></ul></div>';
    title.style.marginTop = 20 + "px";
    //container.appendChild(title);

    var dismiss = document.createElement("div");
    dismiss.style.position = "absolute";
    dismiss.style.top = 10 + 'px';
    dismiss.style.right = 10 + 'px';
    dismiss.innerHTML = '<div class="closeLarge-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'closeLarge-dn\';" onmouseout="this.className=\'closeLarge-up\';" onclick="this.parentNode.parentNode.style.display=\'none\'; unlocalizeApptScheduler(); document.getElementById(\'apptScheduler\').style.display=\'none\'; document.getElementById(\'scrollbar\').style.zIndex = 55; if(document.getElementById(\'screen\')) {document.getElementById(\'screen\').style.display=\'none\';} document.getElementById(\'infoContents\').style.display=\'\';"></div>';
    //container.appendChild(dismiss);
   

    var window = document.createElement("div");
    window.className = "showCurrCal darkGrey";
    window.id = "showCurrCal" + index;
    window.style.left = 0 + "px";
    window.style.marginTop = 0 + "px";
    //window.style.zIndex = 55;
    

    // 
    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; this.parentNode.parentNode.parentNode.style.display=\'none\'; unlocalizeApptScheduler(); document.getElementById(\'apptScheduler\').style.display=\'none\'; document.getElementById(\'scrollbar\').style.zIndex = 55; if(document.getElementById(\'screen\')) {document.getElementById(\'screen\').style.display=\'none\';} document.getElementById(\'infoContents\').style.display=\'\'; return false;"></div>';
    close.style.position = "absolute";
    close.style.zIndex = 100;
    close.style.float = "right";
    close.style.right = 0 + "px";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);


    var content = document.createElement("div");
    content.className = "showCalContent";
    content.id = "showCurrCalContent" + index;
    //content.style.zIndex = 100;
    window.appendChild(content);

    container.appendChild(window);
    document.getElementById(id).appendChild(container);
    

  }
  else
  {
    //document.getElementById("calTitle").innerHTML = '<div class="sidebar"><ul class="contact"><li><p><span class="name"></span><em id="labelName">' + first + ' ' + last + '\'s' + ' calendar</em></p></li></ul></div>';
    document.getElementById("calContainer" + index).style.display = "";
  }



  loadSelectedSchedule(ID);

  if(Ext.getCmp('currCalendar' + index)) {Ext.getCmp('currCalendar' + index).destroy();}
  // define the calendar.
    var currCal = new Ext.DatePicker({
        //renderTo: 'calendar2',
        listeners: {
            'select': function(date_picker, date){
	    //console.log("HERE");
              dayNumber = date.getDay();
              dayIndex = date.getDate();
              monthIndex = date.getMonth()+1;
              year = date.getFullYear();
              //console.log('YEAR: ' + year);

              var header = document.getElementById("myApptHeader");
              header.innerHTML = '<div style="font-size: 14px; line-height: 16px; font-weight: 700; color:#ffffff;"><span id="myApptHeaderDate" style="position: absolute; top: 10px; width: 295px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">' + dayNames[date.getDay()] + '  ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + '</span>' + '<span style="position: absolute; top: 30px; font-size: 12px; line-height: 16px; font-weight: 400;">Choose the hours/services for this appointment</span></div>';

              scheduleThisDay(date_picker);
              //console.log("SELECTED");
              //console.log(date_picker.isVisible());
           }
        },
        id: 'currCalendar' + index,
        style: 'opacity: 1; filter: alpha(opacity=100); color: #666666;',
        format:"d/m/Y",
        disabledDates:["^(?!"+dateArray.join("|")+").*$"],
        disabledDatesText:"I'm not available this day",
        minText: "",
        showToday: false
    });



Ext.override(Ext.getCmp('currCalendar' + index), {
    fullUpdate: function(date){
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;


        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function(cell, cls){
            value = +eDate.clearTime(current, true);
            //console.log(current);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if(value == today){
                cls += ' ' + me.todayCls;
                cell.title = me.todayText;
                
                // Extra element for ARIA purposes
                me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                    tag:'span',
                    cls: Ext.baseCSSPrefix + 'hide-clip',
                    html:me.todayText
                }, true);
            }
            if(value == newDate) {
                cls += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
                if (visible && me.floating) {
                    Ext.fly(cell.firstChild).focus(50);
                }
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                cell.title = me.minText;
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1){
                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format){
                formatValue = eDate.dateFormat(current, format);
                if(ddMatch.test(formatValue)){
                    cell.title = ddText.replace('%0', formatValue);
                    cls += ' ' + disabledCls;
                }
            }
            cell.className = cls + ' ' + me.cellCls;
        };

        for(; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
        //console.log("HERE");
        //console.log(me.id);
        var index = parseInt(me.id.replace("currCalendar",""),10);
        curr = index;
        var ID = initStr[index].id;
        //console.log(ID);
        loadSelectedSchedule(ID);
        for (var day in currSelectedSchedule)
        {
	  //console.log(day);
          var title = currSelectedSchedule[day];
          //console.log("DAY: " + day + " SCH: " + title);
          addSchedule(me, day, title);
        }
    }
});
    var tDay = pad(today.getDate(), 2) + "/" + pad(today.getMonth()+1,2) + "/" + today.getFullYear()-1;
    //console.log(tDay);
    dateArray = [tDay];

    currCal.setDisabledDates(["^(?!"+dateArray.join("|")+").*$"]);
    currCal.render('showCurrCalContent' + index);

}






function showRatings(JSONStr, index, elID, id)
{

  //console.log(index);
  //console.log(elID);
  curr = index;
  JSONStr = decodeURI(JSONStr);
  var comments = Ext.JSON.decode(JSONStr);
  if(!Object.size(comments)) {return;}

  var ID = id ? id : initStr[curr].id;
  // --Name--
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;

  var ratingsContainer = 'ratingsContainer_' + document.getElementById(elID).parentNode.id;
  //console.log(ratingsContainer);

  if(document.getElementById(elID))
  {
    var el = document.getElementById(elID);
    if(document.getElementById(elID))
    {
      el = document.getElementById(elID).parentNode;
      //console.log(el.id);
      if(!document.getElementById(ratingsContainer))
      {
        //console.log("CREATING NEW...");
        var container = document.createElement("div");
        container.id = ratingsContainer;
        container.className = "x-window-default";
        container.style.position = "absolute";
        container.style.width = 360 + "px";
        container.style.height = 260 + "px";
        container.style.left = (index % 4) * 175 + "px";
        container.style.marginTop = 100 + "px";
        //container.style.margin = "0px auto";
        //container.style.zIndex = 55;

        var nameToDisplay = settings[ID]['identity'] ? 'Confidential' : name;
        var title = document.createElement("div");
        title.id = "ratingsTitle";
        title.innerHTML = '<div class="sidebar"><ul class="contact"><li><p><span class="name"></span><em id="labelName">' + nameToDisplay + '\'s' + ' ratings</em></p></li></ul></div>';
        title.style.marginTop = 0 + "px";
        container.appendChild(title);


        var dismiss = document.createElement("div");
        dismiss.style.position = "absolute";
        dismiss.style.top = 10 + 'px';
        dismiss.style.right = 10 + 'px';
        dismiss.innerHTML = '<div class="closeLarge-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'closeLarge-dn\';" onmouseout="this.className=\'closeLarge-up\';" onclick="this.parentNode.parentNode.style.display=\'none\'; unlocalizeApptScheduler(); document.getElementById(\'apptScheduler\').style.display=\'none\'; document.getElementById(\'scrollbar\').style.zIndex = 55; if(document.getElementById(\'screen\')) {document.getElementById(\'screen\').style.display=\'none\';} document.getElementById(\'infoContents\').style.display=\'\';"></div>';
        container.appendChild(dismiss);


        var window = document.createElement("div");
        window.className = "gradient-darkGrey showCurrRating";
        window.id = "showCurrRating";
        window.style.left = 10 + "px";
        window.style.marginTop = -20 + "px";
        //window.style.zIndex = 55;
    

        // 
        var close = document.createElement("div");
        close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.parentNode.style.display=\'none\'; document.getElementById(\'infoContents\').style.display=\'\';"></div>';
        close.style.position = "absolute";
        close.style.zIndex = 100;
        close.style.float = "right";
        close.style.right = 0 + "px";
        close.style.marginRight = 0 + "px";
        close.style.padding = 4 + "px";
        //window.appendChild(close);


        var content = document.createElement("div");
        content.className = "showRatingContent";
        content.id = "showCurrRatingContent";
        //content.style.zIndex = 100;
        window.appendChild(content);

        container.appendChild(window);
        el.appendChild(container);
    

      }
      else
      {
        document.getElementById("ratingsTitle").innerHTML = '<div class="sidebar"><ul class="contact"><li><p><span class="name"></span><em id="labelName">' + name + '\'s' + ' ratings</em></p></li></ul></div>';
        document.getElementById(ratingsContainer).style.left = (index % 4) * 175 + "px";
        document.getElementById(ratingsContainer).style.display = "";
      }
    }
    var innerHTML = '';
    for (var key in comments)
    {
      var inID = key.split(/:/)[0];
      var timeStamp = key.split(/:/)[1];
      var rating = comments[key].split(/:/)[0];
      var comment = comments[key].split(/:/)[1];
      //console.log(inID);
      //console.log(timeStamp);
      //console.log(rating);
      //console.log(comment);

      var first = productStore.getById(inID).data.first;
      var last = productStore.getById(inID).data.last;
      var name = first + ' ' + last;



      var  commentDate = new Date(+timeStamp);
      var year =  commentDate.getFullYear();
      var month =  monthNames[commentDate.getMonth()+1];
      var weekDay = dayNames[commentDate.getDay()];
      var day =  commentDate.getDate();
      var hours =  commentDate.getHours();
      var minutes =  commentDate.getMinutes();
      var seconds =  commentDate.getSeconds();

      var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year; 

      var ratingStr = '<div style="z-index: 100; height: 20px; position: relative; top: -2px; float: right; right:0px; padding: 2px;border: 0px solid #ff0000;">';
      for(var i = rating; i < 5; i++)
      {
        ratingStr += '<img src="images/starEmpty.png" style="z-index: 99; position: relative; top: 0px; left: 0px; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        ratingStr += '<img src="images/star.png" style="z-index: 99; position: relative; top: 0px; left: 0px; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '</div>';


      innerHTML += '<br><div class="ratingComment gradient-ltblue"><div class="x-window-default"><span style="color: #FFFFFF; font-size: 14px; font-weight: bold;">' + dateStr + '</span><br><span style="color: #444444;">' + name + '</span></div>' + ratingStr + '<span style="display: block; margin-top: 20px;">' + comment + '</span></div>';

    }
    document.getElementById("showCurrRatingContent").innerHTML = innerHTML;
  }
}






function addOptions(groupName, selected)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    removeChildren(r[i]);
    for(var j = 0; j < selected.length; j++)
    {
      var opt = document.createElement('option');
      opt.value = selected[j];
      opt.innerHTML = selected[j];
      if(!r[i].disabled) {r[i].appendChild(opt);}
    }
    /*
    //<option value="" disabled selected>Select your option</option>
    var opt = document.createElement('option');
    opt.value = '';
    opt.disabled = true;
    opt.selected = true;
    opt.innerHTML = 'Select...';
    if(!r[i].disabled) {r[i].appendChild(opt);}
    */
  }
}


function disableGroup(groupName, controlValue)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    r[i].disabled = false;
    var control = r[i].title ? r[i].title : r[i].value;
    //console.log(r[i].title + " = " + controlValue[control]);
    r[i].disabled = controlValue[control] ? false : true;
  }
}



function enableGroup(groupName)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    r[i].disabled = false;
  }
}



function setGroup(groupName, controlValue)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    if(!r[i].disabled) {r[i].checked = controlValue ? true : false;}
  }
}

function getGroup(groupName, controlValue)
{
  var itemStr = '';
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    //if(r[i].checked == controlValue) {itemStr += r[i].value + '\n';}
    if(r[i].checked == controlValue) {itemStr += r[i].value + '<br>';}
  }
  return itemStr ? itemStr : '';
}


function getGroupSelections(checkbox, combobox, controlValue)
{
  var itemStr = '';

  var check = document.getElementsByName(checkbox);
  var combo = document.getElementsByName(combobox);


  for (var i = 0; i < check.length; i++)
  {
    //console.log(check[i].value);
    if((check[i].checked == controlValue) && (!check[i].disabled)) {itemStr += check[i].value + ' -- ' + combo[i].options[combo[i].selectedIndex].text + '<br>';}
  }
  //console.log("ITEMSTR: " + itemStr);
  return itemStr;
}



function getSubTotal()
{

  var subTotal = 0;
  var ID = initStr[curr].id;
  //console.log(ID);

  // --Services--
  var services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};

  var sch = getGroupSelections('apptTime', 'selectService', true);
  var split = sch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    var currService = split[i];
    currService = currService.replace(/.*\s\-\-\s/,'');
    //console.log(currService);
    subTotal += parseFloat(services[currService].price);
    //console.log(subTotal);
  }
  var sTotal = document.getElementById("servicesTotal");
  //var split = sTotal.innerHTML;
  //var oldSubTotal = parseFloat(split.split(": $")[1]);
  //console.log("OLD: " + oldSubTotal);
  //console.log("SUB: " + subTotal);
  //if(!isNaN(oldSubTotal)) {total += parseFloat(subTotal - oldSubTotal);}
  //console.log(total);
  //console.log("TOTAL: $" + currencyFormatted(total));
  sTotal.innerHTML = "SubTotal: $" + currencyFormatted(subTotal);
  sTotal.style.display = '';
}


function getSubTotalFromSch(sch, ID)
{

  var subTotal = 0;
  //console.log(ID);

  // --Services--
  var services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};

  //var sch = getGroupSelections('apptTime', 'selectService', true);
  var split = sch.split('<br>');
  for(var i = 1; i < split.length; i++)
  {
    var currService = split[i];
    currService = currService.replace(/.*\s\-\-\s/,'');
    //console.log(currService);
    if(services[currService]) {subTotal += parseFloat(services[currService].price);}
    //console.log(subTotal);
  }
  return parseFloat(subTotal);
  //var sTotal = document.getElementById("servicesTotal");
  //var split = sTotal.innerHTML;
  //var oldSubTotal = parseFloat(split.split(": $")[1]);
  //console.log(oldSubTotal);
  //console.log(subTotal);
  //if(!isNaN(oldSubTotal)) {total += parseFloat(subTotal - oldSubTotal);}
  //console.log(total);
  //console.log("TOTAL: $" + currencyFormatted(total));
  //sTotal.innerHTML = "SubTotal: $" + currencyFormatted(subTotal);
  //sTotal.style.display = '';
}




function getTotal(subTotals)
{
  var currTotal = 0;
  for (var key in subTotals)
  {
    currTotal += parseFloat(subTotals[key]);
  }
  return currTotal;
}



function removeChildren(el)
{
  //console.log("ID: " + id);
  var cell = el;
  if(!cell) {return;}
  if ( cell.hasChildNodes() )
  {
    while ( cell.childNodes.length >= 1 )
    {
      cell.removeChild( cell.firstChild );       
    } 
  }
}



function getZones()
{
  var timeZoneNames = new Array();
  $.getJSON("js/timeZoneNames.json", function(data, Status, xhr )
  {
    //console.log(Status);
    //console.log(data);
    // data is a JavaScript object now. Handle it as such
    //console.log("OK");
    var zoneObj = data.main.en.dates.timeZoneNames.zone;
    //console.log(zoneObj);
    for(zone in zoneObj)
    {
      for(name in zoneObj[zone])
      {
        //console.log(zone + '/' + name);
        timeZoneNames.push(zone + '/' + name);
      }
    }
    addOptions("tzSelect", timeZoneNames);

    var zoneGuess = jstz.determine().name(); // Determines the time zone of the browser client
    //console.log(zoneGuess);
    setGroupFromTimeZone("tzSelect", zoneGuess);

  });
}


function populateTimeZones()
{

  var zones = getZones();
}


function populateAvailableTimes()
{
  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  enableGroup('checked');
  setGroup('checked', false);

  for (var key in schedule)
  {
    //console.log("-->KEY: " + key + " = " + schedule[key]);
    var split = key.split('/');
    var d = parseInt(split[0], 10);
    var m = parseInt(split[1], 10);
    var y = parseInt(split[2], 10);
    //console.log('-->DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
    if(d == dayIndex && m == monthIndex && y == year)
    {
      //console.log('MATCH');
      var split = schedule[key].split('<br>');
      for(var i = 1; i < split.length-1; i++)
      {
        //console.log(split[i]);
        var r = document.getElementsByName('checked');
        for (var j = 0; j < r.length; j++)
        {
          //console.log(r[j].value + " <-> " + split[i]);
          if(r[j].value == split[i]) {r[j].checked = true;}
        }
      }
    }
  }
}


function disableAvailableTimesFromSchedule()
{

  var check = document.getElementsByName('checked');

  var isAPPT = false;
  var isAVAIL = false;

  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  //setGroup(checkbox, false);
  enableGroup("checked");
  for (var key in schedule)
  {
    //console.log("-->KEY: " + key + " = " + schedule[key]);
    var split = key.split('/');
    var d = parseInt(split[0], 10);
    var m = parseInt(split[1], 10);
    var y = parseInt(split[2], 10);
    //console.log('-->DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
    if(d == dayIndex && m == monthIndex && y == year)
    {
      //console.log('MATCH');
      var split = schedule[key].split('<br>');
      for(var i = 0; i < split.length-1; i++)
      {
        //console.log(split[i]);
        var matchRE = new RegExp("APPT", "i");
        var appt = split[i].match(matchRE);
        var matchRE = new RegExp("AVAILABLE", "i");
        var avail = split[i].match(matchRE);

        if(appt) {isAPPT = true; provider = split[i].split(/\:\s*/)[1];}
        else if(avail) {isAppt = false;}
        if(!isAPPT) {continue;}

        for (var j = 0; j < check.length; j++)
        {
          var value = split[i].split(' ')[0];
          var service = split[i].split(' -- ')[1];
          //console.log(check[j].value + " <-> " + value + " : " + name);
          //if(check[j].value == value) {check[j].checked = true;}//combo[i].options[combo[i].selectedIndex].text
          if(check[j].value == value) {check[j].disabled = true;}
        }
      }
    }
  }
}






function setGroupFromTimeZone(combobox, timeZone)
{

  var combo = document.getElementsByName(combobox);

  //var comboItems = {};

  for (var j = 0; j < combo[0].options.length; j++)
  {
    if(combo[0].options[j])
    {
      //console.log("COMBO: " + combo[0].options[j].text + ' === ' + timeZone);
      if(combo[0].options[j].text === timeZone) {combo[0].selectedIndex = j; continue;}
      //comboItems[combo[j].options[j].text] = j;
    }
  }

  //combo[j].selectedIndex = comboItems[timeZone];}
}


function setCheckbox(checkbox, title)
{
  var r = document.getElementsByName(checkbox);
  for (var i = 0; i < r.length; i++)
  {
    if(r[i].value === title) {r[i].checked = true;}
  }
}






function setGroupsFromSchedule(checkbox, combobox, schedule)
{

  //console.log(schedule);
  var check = document.getElementsByName(checkbox);
  var combo = document.getElementsByName(combobox);

  var comboItems = {};

  for (var j = 0; j < combo.length; j++)
  {
    if(combo[j].options[j])
    {
      //console.log("COMBO: " + combo[j].options[j].text);
      comboItems[combo[j].options[j].text] = j;
    }
  }

  var isAPPT = false;
  var isAVAIL = false;
  var provider = "";
  var ID = initStr[curr].id;
  //console.log(ID);
  // --Name--
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;
  //console.log(name);

  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  //enableGroup(checkbox);
  setGroup(checkbox, false);
  for (var key in schedule)
  {
    //console.log("-->KEY: " + key + " = " + schedule[key]);
    var split = key.split('/');
    var d = parseInt(split[0], 10);
    var m = parseInt(split[1], 10);
    var y = parseInt(split[2], 10);
    //console.log('-->DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
    if(d == dayIndex && m == monthIndex && y == year)
    {
      //console.log('MATCH');
      var split = schedule[key].split('<br>');
      for(var i = 0; i < split.length-1; i++)
      {
        //console.log(split[i]);
        var matchRE = new RegExp("APPT", "i");
        var appt = split[i].match(matchRE);
        var matchRE = new RegExp("AVAILABLE", "i");
        var avail = split[i].match(matchRE);

        if(appt) {isAPPT = true; provider = split[i].split(/\:\s*/)[1];}
        else if(avail) {isAppt = false;}
        //console.log(name + '==' + provider);
        if(!isAPPT || name != provider) {continue;}

        //console.log(name + '==' + provider);
        for (var j = 0; j < check.length; j++)
        {
          var value = split[i].split(' ')[0];
          var service = split[i].split(' -- ')[1];
          //console.log(check[j].value + " <-> " + value + " : " + service + " [" + comboItems[service] + "]");
          //if(check[j].value == value) {check[j].checked = true;}//combo[i].options[combo[i].selectedIndex].text
          if(check[j].value == value) {check[j].disabled = false; check[j].checked = true; combo[j].disabled = false; combo[j].selectedIndex = comboItems[service];}
        }
      }
    }
  }
}




function disableGroupsFromSchedule(checkbox, combobox, schedule)
{

  var check = document.getElementsByName(checkbox);
  var combo = document.getElementsByName(combobox);

  var comboItems = {};

  for (var j = 0; j < combo.length; j++)
  {
    if(combo[j].options[j])
    {
      //console.log("COMBO: " + combo[j].options[j].text);
      comboItems[combo[j].options[j].text] = j;
    }
  }

  var isAPPT = false;
  var isAVAIL = false;
  var provider = "";
  var ID = initStr[curr].id;
  // --Name--
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;

  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  //setGroup(checkbox, false);
  for (var key in schedule)
  {
    //console.log("-->KEY: " + key + " = " + schedule[key]);
    var split = key.split('/');
    var d = parseInt(split[0], 10);
    var m = parseInt(split[1], 10);
    var y = parseInt(split[2], 10);
    //console.log('-->DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
    if(d == dayIndex && m == monthIndex && y == year)
    {
      //console.log('MATCH');
      var split = schedule[key].split('<br>');
      for(var i = 0; i < split.length-1; i++)
      {
        //console.log(split[i]);
        var matchRE = new RegExp("APPT", "i");
        var appt = split[i].match(matchRE);
        var matchRE = new RegExp("AVAILABLE", "i");
        var avail = split[i].match(matchRE);

        if(appt) {isAPPT = true; provider = split[i].split(/\:\s*/)[1];}
        else if(avail) {isAppt = false;}
        //console.log(name + '==' + provider);
        if(!isAPPT || name == provider) {continue;}

        for (var j = 0; j < check.length; j++)
        {
          var value = split[i].split(' ')[0];
          var service = split[i].split(' -- ')[1];
          //console.log(check[j].value + " <-> " + value + " : " + name);
          //if(check[j].value == value) {check[j].checked = true;}//combo[i].options[combo[i].selectedIndex].text
          if(check[j].value == value) {check[j].checked = true; check[j].disabled = true; combo[j].disabled = true;}
        }
      }
    }
  }
}




function applySelection()
{
  var itemStr = '';
  var thisAppt = '';
  var apptDay = dayNames[dayNumber] + ' ' + monthNames[monthIndex-1] + ' ' + dayIndex + ', ' + year;

  var r = document.getElementsByName('days');
  for (var i = 0; i < r.length; i++)
  {
    if(r[i].checked == true) {itemStr = r[i].id;}
  }
  var r = document.getElementsByName('checked');
  for (var i = 0; i < r.length; i++)
  {
    if(r[i].checked == true) {thisAppt += r[i].value + '<br>';}
  }
  //console.log(itemStr);
  //console.log(thisAppt);
  if(itemStr == 'justThisDay') {makeDatesAvailableThisDay(dayIndex, monthIndex, year); apptDay = dayNames[dayNumber] + ' ' + monthNames[monthIndex-1] + ' ' + dayIndex + ', ' + year;}
  else if(itemStr == 'thisDayAllMonth') {makeDatesAvailableThisMonth(dayIndex, monthIndex, year); apptDay = "All " + dayNames[dayNumber] + '\'s in ' + monthNames[monthIndex-1] + ' ' + year;}
  else if(itemStr == 'thisDayAll') {makeDayAvailable(dayIndex, monthIndex, year, dayNumber); apptDay = "All " + dayNames[dayNumber] + '\'s ' + 'in ' + year;}

  var calEl = Ext.getCmp('myCalendar');
  if(calEl) {calEl.update(calEl.activeDate, true);}



  var parent = document.getElementById("headerClearfix");
  if(! document.getElementById("showApptAdded"))
  {
    var window = document.createElement("div");
    window.className = "show-cal darkGrey";
    window.id = "showApptAdded";

    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.style.display=\'none\';"></div>';
    close.style.position = "absolute";
    close.style.zIndex = 100;
    close.style.float = "right";
    close.style.right = 0 + "px";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);

    var content = document.createElement("div");
    content.className = "showApptAddedContent";
    content.id = "showApptAddedContent";
    window.appendChild(content);

    parent.appendChild(window);
  }
  else
  {
    if(thisAppt)
    {
      document.getElementById("showApptAdded").style.display = "";
    }
  }
  if(thisAppt)
  {
    document.getElementById("showApptAddedContent").innerHTML = '<span style="color:#ffffff; font: bold 14px/14px Arial, Helvetica, sans-serif;">Availability added</span><br><br>' + '<span style="color:#DAFF38; font: bold;">' + apptDay + '<br><br>' + thisAppt + '</span>';
    addMailMessage(user[0].inID, 'YOU HAVE ADDED AVAILABILITY FOR:<br>' + apptDay + '<br>' + thisAppt, true, true);
  }
  else
  {
    document.getElementById("showApptAddedContent").innerHTML = '<span style="color:#ffffff; font: bold 14px/14px Arial, Helvetica, sans-serif;">Availability cleared</span><br><br>' + '<span style="color:#DAFF38; font: bold;">' + apptDay + '<br><br>' + thisAppt + '</span>';
    addMailMessage(user[0].inID, 'YOU CLEARED YOUR AVAILABILITY FOR:<br>' + apptDay + '<br>' + thisAppt, true, true);
  }
  Ext.get("showApptAdded").fadeIn({opacity: 1.0, easing: 'easeIn', duration: 100});
  Ext.get("showApptAdded").fadeOut({opacity: 0.0, easing: 'easeIn', duration: 3000});


  productStore.getById(user[0].inID).data.calendar = JSON.stringify(schedule);


}


//Value parameter - required. All other parameters are optional.
function isDate(value, sepVal, dayIdx, monthIdx, yearIdx)
{
  try {
        //Change the below values to determine which format of date you wish to check. It is set to dd/mm/yyyy by default.
        var DayIndex = dayIdx !== undefined ? dayIdx : 0; 
        var MonthIndex = monthIdx !== undefined ? monthIdx : 1;
        var YearIndex = yearIdx !== undefined ? yearIdx : 2;
 
        value = value.replace(/-/g, "/").replace(/\./g, "/"); 
        var SplitValue = value.split(sepVal || "/");

        //console.log(SplitValue[DayIndex]);
        //console.log(SplitValue[MonthIndex]);
        //console.log(SplitValue[YearIndex]);
        var OK = true;
        if (!(SplitValue[DayIndex].length == 1 || SplitValue[DayIndex].length == 2))
        {
          OK = false;
        }
        if (OK && !(SplitValue[MonthIndex].length == 1 || SplitValue[MonthIndex].length == 2))
        {
          OK = false;
        }
        if (OK && SplitValue[YearIndex].length != 4)
        {
          OK = false;
        }
        //console.log(OK);
        if (OK)
        {
          var Day = parseInt(SplitValue[DayIndex], 10);
          var Month = parseInt(SplitValue[MonthIndex], 10);
          var Year = parseInt(SplitValue[YearIndex], 10);
          //console.log(Day + "/" + Month + "/" + Year);
 
          if (OK = ((Year > 1900) && (Year >= new Date().getFullYear())))
          {
            if (OK = (Month <= 12 && Month > 0))
            {
	      //console.log(OK);
              var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));   
                    
              if(OK = Day > 0)
              {
                if (Month == 2)
                {  
                  OK = LeapYear ? Day <= 29 : Day <= 28;
                } 
                else
                {
                  if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11))
		  {
                    OK = Day <= 30;
                  }
                  else
		  {
                    OK = Day <= 31;
                  }
                }
              }
            }
          }
        }
        //console.log(OK);
        return OK;
      }//try
      catch (e)
      {
        return false;
      }
} 





function addSchedule(me, day, title)
{
  var cells = me.cells,
  t,
  cls       = me.selectedCls,
  cellItems = cells.elements,
  c,
  cLen      = cellItems.length,
  eDate = Ext.Date,
  cell;

        
  for (c = 0; c < cLen; c++)
  {
    cell = Ext.fly(cellItems[c]);
    
    //console.log(cell.dom.firstChild.dateValue);
    var myDate = new Date(cell.dom.firstChild.dateValue);
    //console.log(eDate.format(myDate, 'd/m/Y'));
    var cellDay = eDate.format(myDate, 'd/m/Y');
    //console.log(cellDay + " <-> " + tDay);
    //console.log(cellItems[c].className);
    var cellClass = cellItems[c].className;
    if (cellDay == day)
    {
      //console.log(cellDay);
      title = title.replace(/\<br\>/g, "\n");
      //if(cellItems[c].title) {title = cellItems[c].title + "\n\n" + title;}
      //title = title.replace(me.disabledDatesText, '');
      //title = title.replace(/^\n\n/, '');
      if(0 && cellDay == '26/12/2013')
      {
        //console.log("NEW TITLE: " + title);
      }
      cellItems[c].title = title ? title : me.disabledDatesText;
      cellItems[c].className = title ? me.cellCls : me.disabledCellCls + ' ' + me.cellCls;
    }
  }
}




function getSchedule(ID, day)
{
  var calendar = productStore.getById(ID).data.calendar ? Ext.JSON.decode(productStore.getById(ID).data.calendar) : {};
  //console.log(calendar);
  return calendar[day];
}

function getScheduleOLD(me, day)
{
  var cells = me.cells,
  t,
  cls       = me.selectedCls,
  cellItems = cells.elements,
  c,
  cLen      = cellItems.length,
  eDate = Ext.Date,
  cell;

        
  for (c = 0; c < cLen; c++)
  {
    cell = Ext.fly(cellItems[c]);
    
    //console.log(cell.dom.firstChild.dateValue);
    var myDate = new Date(cell.dom.firstChild.dateValue);
    //console.log(eDate.format(myDate, 'd/m/Y'));
    var cellDay = eDate.format(myDate, 'd/m/Y');
    //console.log(cellDay + " <-> " + tDay);
    //console.log(cellItems[c].className);
    var cellClass = cellItems[c].className;
    if (cellDay == day)
    {
      //console.log("MATCH");
      //title = title.replace(/\<br\>/g, "\n");
      return cellItems[c].title;
      //cellItems[c].className = title ? me.cellCls : me.disabledCellCls + ' ' + me.cellCls;
    }
  }
}




function makeDayAvailable(day, month, year, dayOffset)
{
  //console.log('dayOffset: ' + dayOffset);
  day = pad(day, 2);
  month = pad(month, 2);

  var tDay = day + "/" + month + "/" + year;
  //console.log(tDay);
  var currDay = day;
  var currMonth = month;

  //rewind day to beginning of month
  while(isDate(tDay))
  {
    currDay = makeDatesAvailableThisMonth(currDay, currMonth, year);
    var now = new Date(year,currMonth,1);
    var firstDay=now.getDay();
    //console.log('firstDay: ' + firstDay);
    currDay=1+(dayOffset-firstDay+7)%7;
    currDay = pad(currDay, 2);
    currMonth = parseInt(currMonth, 10) + 1;
    currMonth = pad(currMonth, 2);
    //console.log(currDay + " " + currMonth);
    tDay = currDay + "/" + currMonth + "/" + year;
    //console.log('makeDayAvailable ' + tDay);
    //dp2.showNextMonth();
  }
}


function makeDatesAvailableThisMonth(day, month, year)
{
  var calendar = Ext.getCmp('myCalendar');
  day = pad(day, 2);
  month = pad(month, 2);

  var tDay = day + "/" + month + "/" + year;
  //console.log('makeDatesAvailableThisMonth ' + tDay);
  var currDay = day;

  //console.log('TODAY: ' + today.getDate());
  var thisDate = today.getDate();
  var thisMonth = today.getMonth()+1;
  var thisYear = today.getFullYear();
  var calMinDate = (year <= thisYear && month <= thisMonth) ? thisDate : 0;

  //rewind day to beginning of month
  while(isDate(tDay) && currDay >= calMinDate)
  {
    //dp2.updatedDay = tDay;
    //dp2.update(dp2.activeDate, true);
    currDay = parseInt(currDay, 10) - 7;
    currDay = pad(currDay, 2);
    //console.log(day + " " + month);
    tDay = currDay + "/" + month + "/" + year;
    //console.log(tDay);
  }
  currDay = parseInt(currDay, 10) + 7;
  currDay = pad(currDay, 2);
  //console.log(day + " " + month);
  tDay = currDay + "/" + month + "/" + year;
  
  var sch = getGroup('checked', true);
  //var customTitle = "AVAILABLE:\n" + sch;
  var customTitle = "AVAILABLE:<br>" + sch;

  while(isDate(tDay))
  {
    //dateArray.push(tDay);
    //console.log(tDay);
    //dp2.updatedDay = tDay;
    if(sch)
    {
      schedule[tDay] = customTitle;
      createCookie(tDay, customTitle);
      addSchedule(calendar, tDay, customTitle);
    }
    else
    {
      schedule[tDay] = '';
      deleteCookie(tDay);
      addSchedule(calendar, tDay, '');
    }

    //console.log('ActiveDate: ' + dp2.activeDate);
    //dp2.update(dp2.activeDate, false);
    currDay = parseInt(currDay, 10) + 7;
    currDay = pad(currDay, 2);
    //console.log(day + " " + month);
    tDay = currDay + "/" + month + "/" + year;
    //console.log(tDay);
  }

  //var regExp = ["^(?!"+dateArray.join("|")+").*$"];
  //console.log(regExp);
  //dp2.setDisabledDates(regExp);

  return currDay;
}


function removeOldSchByName(oldSch, name)
{


  var isAPPT = false;
  var isAVAIL = false;
  var provider = "";
  var returnStr = "";
  var removedSch = "";

  var split = oldSch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    //console.log("BEFORE: " + split[i]);
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);

    if(appt) {isAPPT = true; provider = split[i].split(/\:\s*/)[1];}
    else if(avail) {isAppt = false;}
    if(isAPPT && name == provider) {removedSch += split[i] + '<br>'; split[i] = '';}
    //console.log("AFTER: " + split[i]);
    returnStr = returnStr + split[i] + '<br>';
  }
  //console.log(returnStr);
  returnStr = returnStr.replace(/(\<br\>){3,}/gi, '<br><br>');
  returnStr = returnStr.replace(/(\<br\>\<br\>)$/, '<br>');
  //console.log(returnStr);
  //return returnStr;
  return { sch: returnStr, removed: removedSch };

}



function makeUnavailable(oldSch, sch)
{
  //console.log("makeUnavailable");
  //console.log("OLD: " + oldSch);
  //console.log("NEW: " + sch);

  var isAPPT = false;
  var isAVAIL = false;
  var returnStr = "";
  var time = [];

  var split = sch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    time.push(split[i].split(' -- ')[0]);
  }  

  var split = oldSch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    //console.log("BEFORE: " + split[i]);
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);

    if(appt) {isAVAIL = false;}
    else if(avail) {isAVAIL = true;}
    if(isAVAIL)
    {
      for(var j = 0; j < time.length; j++)
      {
        //console.log(time[j] + ' <-> ' + split[i]);
	if(time[j] == split[i]) {split[i] = '';}
      }
      //}
      //console.log("AFTER: " + split[i]);
      returnStr = returnStr + split[i] + '<br>';
    }
  }
  //console.log(returnStr);
  returnStr = returnStr.replace(/(\<br\>){2,}/gi, '<br>');
  returnStr = returnStr.replace(/(\<br\>\<br\>)$/, '<br>');
  //console.log(returnStr);
  return returnStr;
}






function combineSchedules(oldSch, sch)
{
  //console.log("makeAvailable");
  //console.log("OLD: " + oldSch);
  //console.log("NEW: " + sch);

  var isAPPT = false;
  var isAVAIL = false;
  var returnStr = "";
  var time = [];

  console.log("OLD: " + oldSch);
  console.log("NEW: " + sch);

  var split = oldSch.split('APPT:');
  var oldAVAIL = split.shift();
  var oldAPPTS = split.join('APPT:');
  oldAPPTS.replace(/^\s*/,'');
  if(oldAPPTS && !oldAPPTS.match(/^APPT/)) {oldAPPTS = "APPT:" + oldAPPTS;}

  var split = sch.split('APPT:');
  var schAVAIL = split.shift();
  var schAPPTS = split.join('APPT:');
  schAPPTS.replace(/^\s*/,'');
  if(schAPPTS && !schAPPTS.match(/^APPT/)) {schAPPTS = "APPT:" + schAPPTS;}

  if(sch) {returnStr = "AVAILABLE:<br>" + sch;}
  returnStr = returnStr + '<br><br>' + oldAPPTS + '<br><br>' + schAPPTS;
  //console.log(returnStr);
  returnStr = returnStr.replace(/(\<br\>){3,}/gi, '<br><br>');
  returnStr = returnStr.replace(/(\<br\>\<br\>)$/, '<br>');
  //console.log(returnStr);
  return returnStr;
}






function makeAvailable(oldSch, sch)
{
  //console.log("makeAvailable");
  //console.log("OLD: " + oldSch);
  //console.log("NEW: " + sch);

  var isAPPT = false;
  var isAVAIL = false;
  var returnStr = "";
  var time = [];

  var split = sch.split('<br>');
  if(split[0].match("APPT")) {split.shift();}
  for(var i = 0; i < split.length-1; i++)
  {
    time.push(split[i].split(' -- ')[0]);
  }  

  var split = oldSch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    //console.log("BEFORE: " + split[i]);
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);
    var toAdd = '';

    if(appt) {isAVAIL = false;}
    else if(avail) {isAVAIL = true;}
    if(isAVAIL)
    {
      for(var j = 0; j < time.length; j++)
      {
        //console.log(time[j] + ' <-> ' + split[i]);
        if(isTimeLessThan(time[j], split[i])) {/*console.log("TRUE");*/ toAdd += time[j] + '<br>'; time[j] = '';}
	//if(time[j] == split[i]) {split[i] = '';}
      }
      //}
      //console.log("AFTER: " + split[i]);
      returnStr = returnStr + toAdd + split[i] + '<br>';
    }
  }
  if(Object.size(time))
  {
    //console.log("MORE LEFT");
    for(var j = 0; j < time.length; j++) {if(!time[j]) {time.splice(j,1);}}
    for(var j = 0; j < time.length; j++) {returnStr += time[j] + '<br>';}
    
  }
  //console.log(returnStr);
  returnStr = returnStr.replace(/(\<br\>){2,}/gi, '<br>');
  returnStr = returnStr.replace(/(\<br\>\<br\>)$/, '<br>');
  //console.log(returnStr);
  return returnStr;
}



function isTimeLessThan(t1, t2)
{
  var matchAM = new RegExp("am", "i");
  var matchPM = new RegExp("pm", "i");
  var number = {};
  t1 = t1.replace("12pm","12am");
  t2 = t2.replace("12pm","12am");
  //console.log("T1: " + t1);
  //console.log("T2: " + t2);
  
  if(!(t1.match(matchPM) || t1.match(matchAM))) {return false;}
  if(!(t2.match(matchPM) || t2.match(matchAM))) {return false;}
  

  if(t1.match(matchPM) && t2.match(matchAM)) {return false;}

  var bothAM = (t1.match(matchAM) && t2.match(matchAM));
  var bothPM = (t1.match(matchPM) && t2.match(matchPM));
  number.t1 = parseInt(t1.split(/[ap]m/)[0],10);
  number.t2 = parseInt(t2.split(/[ap]m/)[0],10);
  if(bothAM || bothPM)
  {
    if(number.t1 < number.t2) {return true;}
    else {return false;}
  }
  else //(t1.match(matchAM) && t2.match(matchPM)
  {
    return true;
  }
}


function makeApptThisDay(day, month, year, cal)
{
  //console.log("makeApptThisDay");
  var calendar
  var calID = cal || 'myCalendar';
  calendar = Ext.getCmp(calID);
  day = pad(day, 2);
  month = pad(month, 2);
  //console.log(day + " " + month);

  var tDay = day + "/" + month + "/" + year;
  //dateArray.push(tDay);
  //dp2.updatedDay = tDay;
  //dp2.update(dp2.activeDate, true);

  //console.log(tDay);
  //var regExp = ["^(?!"+dateArray.join("|")+").*$"];
  //console.log(regExp);
  var sch = getGroupSelections('apptTime', 'selectService', true);
  //console.log("NEW: " + sch);
  //TO DELETE
  //sch = "7am";  
  //console.log("PREVIOUS TXT: " + getSchedule(Ext.getCmp('myCalendar'), tDay));
  var thisAppt = '';



  var ID = initStr[curr].id;
  // --Name--
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  var providersSch = '';

  //var oldSch = getSchedule(Ext.getCmp('myCalendar'), tDay);
  var oldSch = getSchedule(user[0].inID, tDay);
  oldSch = oldSch ? oldSch.replace(/\n/g, '<br>') : '';
  if(sch)
  {
    var nameToDisplay = settings[ID]['identity'] ? 'Confidential' : name;
    thisAppt = 'APPT: ' + nameToDisplay + '<br>' + sch;
    providersSch = sch;
    //console.log("OLD: " + oldSch + " NEW: " + sch);
    temp = removeOldSchByName(oldSch, name);
    oldSch = temp.sch;
    removed = temp.removed;
    //console.log(removed);

    //TODO: localize just the appts.
    var lsObj = localizeSch(thisAppt, ID, day, month, year);
    var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;
    sch = oldSch + '<br>' + localizedAppt;
  }
  else
  {
    temp = removeOldSchByName(oldSch, name);
    oldSch = temp.sch;
    removed = temp.removed;
    sch = oldSch;
  }

  updateSchedule(ID, tDay, myName, providersSch)
  //console.log(sch);
  //var customTitle = "AVAILABLE:\n" + sch;
  var customTitle = sch;

  if(sch)
  {
    schedule[tDay] = customTitle;
    createCookie(tDay, customTitle);
    addSchedule(calendar, tDay, customTitle);
  }
  else
  {
    schedule[tDay] = '';
    deleteCookie(tDay);
    addSchedule(calendar, tDay, '');
  }
  productStore.getById(user[0].inID).data.calendar = JSON.stringify(schedule);
  return thisAppt;
}







function makeDatesAvailableThisDay(day, month, year, cal)
{

  var calendar
  var calID = cal || 'myCalendar';
  calendar = Ext.getCmp(calID);
  day = pad(day, 2);
  month = pad(month, 2);
  //console.log(day + " " + month);

  var tDay = day + "/" + month + "/" + year;

  var oldSch = schedule[tDay];
  console.log(oldSch);


  //dateArray.push(tDay);
  //dp2.updatedDay = tDay;
  //dp2.update(dp2.activeDate, true);

  //console.log(tDay);
  //var regExp = ["^(?!"+dateArray.join("|")+").*$"];
  //console.log(regExp);
  var sch = getGroup('checked', true);


  sch = combineSchedules(oldSch, sch);
  //console.log(sch);


  //var customTitle = "AVAILABLE:\n" + sch;
  //var customTitle = "AVAILABLE:<br>" + sch;
  var customTitle = sch;

    if(sch)
    {
      schedule[tDay] = customTitle;
      createCookie(tDay, customTitle);
      addSchedule(calendar, tDay, customTitle);
    }
    else
    {
      schedule[tDay] = '';
      deleteCookie(tDay);
      addSchedule(calendar, tDay, '');
    }

  //dp2.setDisabledDates(regExp);
}


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

function pad(number, length, padChar)
{
  padChar = padChar || '0';
  var str = '' + number;
  while (str.length < length) {str = padChar + str;}
  return str;
}


function showMore(id, parent, clicked)
{
  //console.log(id);
 
  if(! document.getElementById("showMore") && clicked)
  {
    var window = document.createElement("div");
    window.className = "show-more";
    window.id = "showMore";

    var title = document.createElement("div");
    title.className = "showMoreTitle";
    title.id = "showMoreTitle";
    window.appendChild(title);

    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.style.display=\'none\';"></div>';
    //close.style.height = 15 + "px";
    close.style.position = "absolute";
    close.style.zIndex = 100;
    close.style.float = "right";
    close.style.right = 0 + "px";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);



    var content = document.createElement("div");
    content.className = "showMoreContent";
    content.id = "showMoreContent";

    window.appendChild(content);

    parent.appendChild(window);
  }
  else if(clicked)
  {
    document.getElementById("showMore").style.display = 'block';
  }
  var title = document.getElementById("showMoreTitle");
  var content = document.getElementById("showMoreContent");
  if(!title || !content) {return;}

  var titleStr = '';
  var contentStr = '';

  var matchRE = new RegExp("get", "i");
  var get = id.match(matchRE);

  var matchRE = new RegExp("offer", "i");
  var offer = id.match(matchRE);

  var matchRE = new RegExp("crowd", "i");
  var crowd = id.match(matchRE);

  var matchRE = new RegExp("profile", "i");
  var profile = id.match(matchRE);

  if(offer)
  {
    titleStr = 'what we offer';
    contentStr = '<div><div class="clearfix"><div class="sidebar" style="width: 875px; margin-left: 12px;"><div style="text-align: center;"><h2>A very unique and extremely effective way to connect talents and recruiters</h2></div><ul style="width: 850px;"><li style="width: 850px;">We at InterviewRing think it is time to tear down some of the walls that exist between those seeking careers and those deciding who those careers will go to<br><br>InterviewRing offers a unique platform, which brings those seeking help along their career journey and those seeking to fill positions in their industries, together where in an open \'marketplace\' like environment, each can get exactly what they have come for<br><br>Whether you have come here to further your own career or futher the career of another, come and do a little \'shopping\'<br><br>We guarantee you will walk away with exactly what you need</li></ul></div></div></div>';
  }
  else if(get)
  {
    titleStr = 'what you get';
    contentStr = '<div><div class="clearfix"><div class="sidebar" style="width: 415px; margin-left: 12px;"><div><h2>Finding Help</h2></div><ul><li>Access to all the services provided by our \'crowd\'</li><li>Ability to share your interview results with those seeking talent.<br>Promote your successes via social networks and on this site to help you on your career path.<br>Keep your practice runs private.  Use them as learning experiences which will make you that much more capable your next time.</li><li>Practice interviews with the people of your choice and in the companies you desire</li><li>Build your network in the industry of your choice and gain inside advantages that will propel you to where you want to be</li></ul></div><div class="main" style="min-height: 430px; width: 0px;"><div class="sidebar"style="width: 415px; margin-left: -12px;"><div><h2>Giving Help</h2></div><ul><li>Access to the profiles of all the talents</li><li>Quickly search and find candidates which meet your specific requirements and see how they have performed in interviews and have been ranked by professionals before deciding to engage with them</li><li>Sharpen your own interviewing skills</li><li>Get paid to help the future of your industry</li></ul></div></div></div></div>';
  }
  else if(crowd)
  {
    titleStr = 'our \'crowd\'';
    contentStr = '<div><div class="clearfix"><div class="sidebar" style="width: 875px; margin-left: 12px;"><div style="text-align: center;"><h2>Our \'Crowd\' is YOU</h2></div><img src="images/our crowd.png" alt="Our Crowd" height="130" width="197" style="margin: 0 auto 0;"/><ul style="width: 850px;"><li style="width: 850px;">Our members comprise our \'crowd\' As someone seeking help or someone giving help you can access all of our members profiles and see all that they have made public or shared with you<br><br>Our members profiles show who they have interviewed with and how they did, what services they provide, and much more.  Click <code onmouseover="this.style.cursor=\'pointer\';" onclick="showMore(\'profile\', document.getElementById(\'contents\'), false );">here</code> to see an example profile</li></ul></div></div></div>';
  }
  else if(profile)
  {
    titleStr = 'example profile';
    contentStr = 'This is an example profile:';
  }

  title.innerHTML = titleStr;
  content.innerHTML = contentStr;

}






function showCalendar(parent)
{
  //console.log('HERE');
  loadSchedule();
  if(! document.getElementById("showCal"))
  {
    var window = document.createElement("div");
    window.className = "show-cal darkGrey";
    window.id = "showCal";
    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.style.display=\'none\';"></div>';
    close.style.position = "absolute";
    close.style.zIndex = 100;
    close.style.float = "right";
    close.style.right = 0 + "px";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);

    var gear = document.createElement("div");
    gear.innerHTML = '<div id="calGear" class="gear-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'gear-dn\';" onmouseout="this.className=\'gear-up\';"></div>';
    gear.style.position = "absolute";
    gear.style.float = "right";
    gear.style.right = 0 + "px";
    gear.style.padding = 4 + "px";
    gear.style.paddingTop = 40 + "px";
    gear.style.clear = "both";
    window.appendChild(gear);

    var content = document.createElement("div");
    content.className = "showCalContent";
    content.id = "showCalContent";
    window.appendChild(content);

    parent.appendChild(window);
    
    document.getElementById("calGear").onclick = function() {if(productStore.getById(user[0].inID).data.role !== "find") {showSelectAvailability();} else {showSearch();} return false;};


// define the calendar.
    var myCal = new Ext.DatePicker({
        //renderTo: 'calendar2',
        id: 'myCalendar',
        style: 'opacity: 1; filter: alpha(opacity=100); color: #666666;',
        format:"d/m/Y",
        disabledDates:["^(?!"+dateArray.join("|")+").*$"],
        disabledDatesText:"I'm not available this day",
        minText: "",
        showToday: false
    });



Ext.override(Ext.getCmp('myCalendar'), {
    fullUpdate: function(date){
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;


        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function(cell, cls){
            value = +eDate.clearTime(current, true);
            //console.log(current);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if(value == today){
                cls += ' ' + me.todayCls;
                cell.title = me.todayText;
                
                // Extra element for ARIA purposes
                me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                    tag:'span',
                    cls: Ext.baseCSSPrefix + 'hide-clip',
                    html:me.todayText
                }, true);
            }
            if(value == newDate) {
                cls += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
                if (visible && me.floating) {
                    Ext.fly(cell.firstChild).focus(50);
                }
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                cell.title = me.minText;
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1){
                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format){
                formatValue = eDate.dateFormat(current, format);
                if(ddMatch.test(formatValue)){
                    cell.title = ddText.replace('%0', formatValue);
                    cls += ' ' + disabledCls;
                }
            }
            cell.className = cls + ' ' + me.cellCls;
        };

        for(; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
        //console.log("HERE");
        for (var day in schedule)
        {
	  //console.log(day);
	  /*
          var split = day.split('/');
          var d = parseInt(split[0], 10);
          var m = parseInt(split[1], 10);
          var y = parseInt(split[2], 10);
          var lsObj = localizeSch(schedule[day], user[0].inID, d, m, y);
          var title = lsObj.dateStr + '<br>' + lsObj.sch;
	  */
          var title = schedule[day];
          //console.log("DAY: " + day + " SCH: " + title);
          addSchedule(me, day, title);
        }
    }
});

    var tDay = pad(today.getDate(), 2) + "/" + pad(today.getMonth()+1,2) + "/" + today.getFullYear()-1;
    //console.log(tDay);
    dateArray = [tDay];

    myCal.setDisabledDates(["^(?!"+dateArray.join("|")+").*$"]);
    myCal.render('showCalContent');
  }
  else if(document.getElementById("showCal").style.display != 'none')
  {
    document.getElementById("showCal").style.display = 'none';
  }
  else
  {
    document.getElementById("showCal").style.display = 'block';
  }
  var calEl = Ext.getCmp('myCalendar');
  if(calEl) {calEl.update(calEl.activeDate, true);}
}






function loadUsers()
{
  //console.log('loadUsers');
  $.ajaxSetup({ cache: false });

  $.ajax({url:"loadData.php",type:'get',async:false,success:function(result){
      //console.log(result + " " + result.length);
      if(result.length <= 3) {return;}
      var obj = Ext.JSON.decode(result, false);

      //console.log(result[0].id);
      //console.log(obj);
      obj = Ext.JSON.decode(obj, false);
      //console.log(obj[0].id);
      //console.log(obj[1].id);


      var inID;
      var linkedINprofile;
      var tzName;
      var email;
      var education;
      var role;
      var providedServices;
      var calendar;
      var mail;
      var privacy;
      var cart;
      var providerHistory_;
      var history_;
      var feedback;
      var reviews;
      var coins;
      var resume;


      for(var i=0;i < obj.length;i++)
      {
	//console.log(obj[i].id);
        inID = obj[i].id;
        linkedINprofile = obj[i].linkedINprofile;
        tzName = obj[i].tzName;
        //email = obj[i].email;
        //education = obj[i].education;
        role = obj[i].role;
        providedServices = obj[i].services;
        calendar = obj[i].calendar;
        mail = obj[i].mail;
        privacy = obj[i].privacy;
        cart = obj[i].cart;
        providerHistory_ = obj[i].providerHistory;
        history_ = obj[i].history;
        feedback = obj[i].feedback;
        reviews = obj[i].rating;
        coins = obj[i].coins;
        resume = obj[i].resume;

        //console.log(resume);
        var temp = resume.split(/\,/)[1];
        if(temp) {resume = decodeBase64(temp);}
        //console.log("BTOA: " + temp);
        //console.log(privacy);
        settings[inID] = privacy ? Ext.JSON.decode(privacy) : {};
        
        //console.log("LOADING: " + inID);
        var myNewRecord = [
        {
          inID: inID,
          linkedINprofile: linkedINprofile,
          tzName: tzName,
          //email: email,
          //education: education,
          role: role,
          providedServices: providedServices,
          calendar: calendar,
          mail: mail,
          privacy: privacy,
          cart: cart,
          providerHistory: providerHistory_,
          history: history_,
          feedback: feedback,
          reviews: reviews,
          coins: coins,
          resume: resume
        }];
        productStore.loadData(myNewRecord, true);
        //console.log("LOADED ID: " + inID);
      }//for

      usersLoaded = true;
    }//function
  });
  //console.log("users loaded");
}


function loadSchedule()
{
  if(scheduleLoaded) {return;}
  if(!user[0]) {return;}
  if(!productStore.getById(user[0].inID)) {return;}
  //if(productStore.getById(user[0].inID).data.role != 'find')
  if(1)
  {
    var calendar = productStore.getById(user[0].inID).data.calendar ? Ext.JSON.decode(productStore.getById(user[0].inID).data.calendar) : {};
    //console.log(calendar);
    for (var key in calendar)
    {
      //console.log("KEY: " + key + " = " + calendar[key]);

      var split = key.split('/');
      var d = parseInt(split[0], 10);
      var m = parseInt(split[1], 10);
      var y = parseInt(split[2], 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x<t)
      {
	//deleteCookie(key);
	//console.log('NEED TO DELETE COOKIE: ' + key);
      }
      else
      {

        //sch = sch.replace(/\s/g, "");
        //sch = sch.replace("SCHEDULE:->", "");
        //sch = sch.replace(/\-\>/g, "\n");

        //console.log('ADDING: ' + key + '\n' + calendar[key]);
        schedule[key] = calendar[key];
      }
    }//for (var key in calendar)
  }//if(productStore.getById(user[0].inID).data.role != 'find')
  productStore.getById(user[0].inID).data.calendar = JSON.stringify(schedule);
  scheduleLoaded = true;
}




function loadSelectedSchedule(inID)
{
  //console.log("loadSelectedSchedule");
  if(!productStore.getById(inID)) {return;}
  //if(productStore.getById(user[0].inID).data.role != 'find')
  if(1)
  {
    //console.log(productStore.getById(inID).data.email);
    currSelectedSchedule = {};
    currSelectedScheduleOrig = {};
    var calendar = productStore.getById(inID).data.calendar ? Ext.JSON.decode(productStore.getById(inID).data.calendar) : {};
    //console.log(calendar);
    for (var key in calendar)
    {
      //console.log("KEY: " + key + " = " + calendar[key]);

      var split = key.split('/');
      var d = parseInt(split[0], 10);
      var m = parseInt(split[1], 10);
      var y = parseInt(split[2], 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x<t)
      {
	//deleteCookie(key);
	//console.log('NEED TO DELETE COOKIE: ' + key);
      }
      else
      {

        //sch = sch.replace(/\s/g, "");
        //sch = sch.replace("SCHEDULE:->", "");
        //sch = sch.replace(/\-\>/g, "\n");

        //console.log('ADDING: ' + key + '\n' + calendar[key]);
        var currSch = hideOtherPeople(calendar[key], inID);
        //console.log(currSch);
        var lsObj = localizeSch(calendar[key], inID, d, m, y);
        currSch = lsObj.dateStr + '<br>' + lsObj.sch;
        //console.log(currSch);
        currSelectedSchedule[key] = currSch;

        currSelectedScheduleOrig[key] = calendar[key];
      }
    }//for (var key in calendar)
  }//if(productStore.getById(user[0].inID).data.role != 'find')
  productStore.getById(inID).data.calendar = JSON.stringify(currSelectedScheduleOrig);
}


function hideOtherPeople(appt, ID)
{
  if(ID === user[0].inID) {return appt;}
  
  var split = appt.split('<br>');

  // --Name--
  var first = productStore.getById(ID) ? productStore.getById(ID).data.first : '--';
  var last = productStore.getById(ID) ? productStore.getById(ID).data.last : '--';
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.first : '--';
  var myLast = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.last : '--';
  var myName = myFirst + ' ' + myLast;

  for(var i = 0; i < split.length; i++)
  {
    if(split[i].indexOf('APPT') != -1)
    {
      //console.log(split[i]);
      var apptName = split[i].replace('APPT: ', '');
      if(myName != apptName)
      {
	split[i] = 'APPT:';
      }
    }
  }
  return split.join('<br>');
}


function updateSchedule(id, day, name, sch)
{
  //console.log("updateSchedule");
  //console.log("ID: " + id);
  //console.log("DAY: " + day);
  //console.log("NAME: " + name);
  //console.log("SCH: " + sch);
  var calendar = productStore.getById(id).data.calendar ? Ext.JSON.decode(productStore.getById(id).data.calendar) : {};
  var oldSch = calendar[day];
  //console.log("OLD: " + oldSch);

  if(oldSch)
  {
  var removed;
  var temp;
  temp = removeOldSchByName(oldSch, name);
  oldSch = temp.sch;
  removed = temp.removed;
  //console.log("REMOVED: " + removed);
  //console.log("OLD: " + oldSch);
  if(sch)
  {
    //console.log("OLD: " + oldSch);
    oldSch = makeAvailable(oldSch, removed);
    //console.log("OLD: " + oldSch);
    oldSch = makeUnavailable(oldSch, sch);
    //console.log("OLD: " + oldSch);
    
    //thisAppt = 'APPT: ' + settings[id]['identity'] ? 'Confidential' : name + '<br>' + sch;
    var thisAppt = 'APPT: ' + name + '<br>' + sch;
    sch = oldSch + '<br>' + thisAppt;
  }
  else
  {
    oldSch = makeAvailable(oldSch, removed);
    sch = oldSch;
  }
  }
  else
  {
    var thisAppt = 'APPT: ' + name + '<br>' + sch;
    sch = thisAppt;
  }
  //console.log("SCH: " + sch);
  calendar[day] = sch;
  productStore.getById(id).data.calendar = JSON.stringify(calendar);
  //console.log(productStore.getById(id).data.calendar);
  productStore.getById(id).data.isDirty = true;

  //For Provider ONLY
  currSelectedSchedule[day] = sch;
  
  var calEl = Ext.getCmp('currCalendar' + curr);
  if(calEl) {calEl.update(calEl.activeDate, true);}

}







/*
          <div style="height: 60px; padding: 10px; border-bottom: solid 2px #CDDF7E; margin: 0px;">
            <img style="float:left;" src="./images/ghost.png"/>
            <div style="margin-left: 10px; margin-bottom: 10px; float: left; width: 200px; height: 60px;" onclick="unEllipsizeMailBox(this);">Welcome to Interview Ring.  If you have not yet done so, take a moment and browse the vast resouces and services offered.  Thank you!</div>
          </div>
          <div style="height: 60px; padding: 10px; border-bottom: solid 2px #CDDF7E; margin: 0px;">
            <img style="float:left;" src="./images/ghost.png"/>
            <div style="margin-left: 10px; margin-bottom: 10px; float: left; width: 200px; height: 60px;" onclick="unEllipsizeMailBox(this);">Your interview from Dr. Ross is now available for you.  Click <span style="color:#F1FFAF;" onmouseover='this.style.color="#9BA85F";' onmouseout='this.style.color="#F1FFAF";'onclick="showProfile(3);">here</span> to view it.  Thanks<br>-Interview Ring Team</div>
          </div>
*/





function removeMail(id)
{
  //console.log("KEY TO BE REMOVED: " + id);
  //console.log(mail[id]);
  delete mail[id];
  var idx = parseInt(id.replace("mail",""),10);
  delete mailMessage[idx];
  for(var i = idx; i < mailMessage.length-1; i++)
  {
    //console.log((i) + '<=' + (i+1));
    mail['mail' + i] = mail['mail' + (i+1)];
    delete mail['mail' + (i+1)];

    mailMessage[i] = mailMessage[i+1];
    delete mailMessage[i+1];
  }
  renumberMailBoxes('mail');
  //mail[id] = "GONE";
  //console.log(mail[id]);
  //console.log('SIZE: ' + Object.size(mail));

  //console.log("Saving Mail...");

  saveMail(user[0].inID, newMail, mail);

}



function loadMail()
{
  //console.log("loadMail");
  if(mailLoaded) {return;}
  if(!user[0]) {return;}
  //console.log("NEW USER: " + window.newUser);
  if(!productStore.getById(user[0].inID) || window.newUser)
  {
    addMailMessage('interviewring', 'Welcome ' + user[0].first + ' to Interview Ring.  If you have not yet done so, take a moment and browse the vast resouces and services offered.<br>Thank you!<br>-Interview Ring Team', true, true);
    //mail['mail0'] = 'Welcome ' + user[0].first + ' to Interview Ring.  If you have not yet done so, take a moment and browse the vast resouces and services offered.<br>Thank you!<br>-Interview Ring Team';
    //document.getElementById('mailCount').innerHTML = 1;
    var myNewRecord = [
    {
      inID: user[0].inID,
      role: window.role,
      services: JSON.stringify(services),
      calendar: JSON.stringify(schedule),
      mail: JSON.stringify(mail)
    }];
    productStore.loadData(myNewRecord, true);
    productStore.getById(user[0].inID).data.first = user[0].first;
    productStore.getById(user[0].inID).data.last = user[0].last;
    productStore.getById(user[0].inID).data.company = user[0].company;
    productStore.getById(user[0].inID).data.position = user[0].position;
  }
  if(!productStore.getById(user[0].inID)) {return;}

  //var messages = Ext.JSON.decode(productStore.getById(user[0].inID).data.mail);
  var mailObj = productStore.getById(user[0].inID).data.mail ? Ext.JSON.decode(productStore.getById(user[0].inID).data.mail) : {};
  newMail = mailObj.anyNew;
  var msgs = mailObj.mail;
  //console.log(messages);
  //for (var key in messages)
  for (var key in msgs)
  {

    var search = /\((ID=[_\-0-9a-zA-Z^)]+)\)/;
    var ID = msgs[key].match(new RegExp(search));
    var msg = msgs[key].replace(new RegExp(search), '');

    //console.log(ID);

    var search = /\(ID=([_\-0-9a-zA-Z^)]+)\)/;
    if(ID) {ID = ID[0].match(new RegExp(search))[1];}
    //ID = ID[0].replace('ID=', ''); 

    //console.log("ID: " + ID);
    //console.log("MSG: " + msg);


    addMailMessage(ID, msg, newMail, false);
  }//for (var key in calendar)

  mailLoaded = true;
}



function saveCartItem(inID, cartItems)
{
  //console.log("Saving cart...");

  $.ajax({url:"./saveCart.php", 
       data: {id: inID, cart: JSON.stringify(cartItems) },
       type:'post',
       async:true
    });
}




function saveMail(inID, flag, mailMsgs)
{
  //console.log("Saving mail..." + mailMsgs);
  var mailObj = {};
  mailObj.anyNew = flag;
  mailObj.mail = mailMsgs;

  $.ajax({url:"./saveMail.php", 
       data: {id: inID, mail: JSON.stringify(mailObj) },
       type:'post',
       async:true
    });
}



function showMail()
{
  if(parseInt(document.getElementById('mailCount').innerHTML,10))
  {
    document.getElementById('mail').style.display='';
    document.getElementById('mailNewFlag').style.display ='none';
    newMail = false;
    saveMail(user[0].inID, newMail, mail);
    ellipsizeMailBoxes('mail');
  }
}



function addMailMessage(sender, msg, flag, save)
{

  //console.log(sender);
  var size = Object.size(mail);
  var id = 'mail' + parseInt(parseInt(size,10)+0,10);
  mail[id] = '(ID=' + sender + ')' + msg;

  if(save) {saveMail(user[0].inID, flag, mail);}

  //console.log(sender);
  var senderImg = '';
  if(sender=='interviewring')
  {
    senderImg = './images/mailLogo.png';
  }
  else
  {
    if(productStore.getById(sender))
    {
      senderImg = productStore.getById(sender).data.image || "./images/ghost.png";
    }
    else {senderImg = "./images/ghost.png";}
  }
  
  //console.log(id);
  var mailContainer = document.getElementById('mail');


  //console.log('ADDING: ' + key + '\n' + messages[key]);
  //mail[decodeURI(key)] = messages[key];
  //console.log(mail[key]);
  var container = document.createElement("div");
  container.className = "mailWrapper gradient-dkblue";
  container.id = id;
  mailContainer.appendChild(container);

  var image = document.createElement("img");
  image.className = "mailImage";
  image.src = senderImg;
  container.appendChild(image);
  var content = document.createElement("div");
  content.className = "mailContent";
  content.onclick = function() {unEllipsizeMailBox(this);};
  //content.innerHTML = messages[key];
  content.innerHTML = msg;
  container.appendChild(content);
  var close = document.createElement("div");
  close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); removeMail(this.parentNode.parentNode.id); document.getElementById(\'mailCount\').innerHTML = parseInt(document.getElementById(\'mailCount\').innerHTML,10)-1; if(!parseInt(document.getElementById(\'mailCount\').innerHTML,10)) {document.getElementById(\'mail\').style.display=\'none\';}"></div>';
  close.style.left = 306 + "px";
  close.style.marginTop = -6 + "px";
  //close.style.padding = -2 + "px";
  close.style.position = "absolute";
  //close.style.top = 0 + "px";
  container.appendChild(close);



  document.getElementById('mailCount').innerHTML = size+1;
  if(flag) {document.getElementById('mailNewFlag').style.display ='';}

}




function loadScheduleOLD()
{
  var cookieStr = listCookies();
  //console.log("COOKIESTR: " + cookieStr);
  var cookieList = cookieStr.split('\n');
  for(var i=0;i < cookieList.length;i+=1)
  {
    var str = cookieList[i];
    var cookie = str.split('=');
    for(var j=0;j < cookie.length-1;j+=2)
    {
      var day = cookie[j];
      var sch = cookie[j+1];
      day = day.replace(/\s/g, "");
      var split = day.split('/');
      var d = parseInt(split[0], 10);
      var m = parseInt(split[1], 10);
      var y = parseInt(split[2], 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x<t)
      {
	deleteCookie(day);
	//console.log('NEED TO DELETE COOKIE: ' + day);
      }
      else
      {

        sch = sch.replace(/\s/g, "");
        //sch = sch.replace("SCHEDULE:->", "");
        sch = sch.replace(/\-\>/g, "\n");

        //console.log('ADDING: ' + day + '\n' + sch);
        schedule[day] = sch;
      }
    }
  }

}




function serviceReturn()
{
  var msgEl = document.getElementById("messageReturn");

  loadCartItems("cartItemsReturn", true);
  if(Object.size(cartItemsReturn))
  {
    msgEl.innerHTML = '<h2>Thank you for choosing interviewring to handle your career services.</h2><h3>You and your service provider(s) have been sent an email with info regarding how to connect with one another.</h3><h4 style="color:#555555;">The interviewring team wishes you much success in your career and hopes to serve you again.</h4><br>';

    sendNotificationEmail();
    eraseAllCookies();
    saveCartItem(returnParameters.ID, {});

    
    for (var key in cartItemsReturn)
    {
      var split = key.split(/\:/);
      var ID = split[0];
      var day = split[1];
      var thisAppt = cartItemsReturn[key];

      var split = thisAppt.split('<br>');
      split.shift();
      thisAppt = split.join('<br>');


      var date = {};
      date = getDateIndexes(day);

      var d = date.dayIndex;
      var m = date.monthIndex;
      var y = date.year;
      d = pad(d, 2);
      m = pad(m, 2);
      var tDay = d + "/" + m + "/" + y;

      // --Name--
      var first = productStore.getById(ID) ? productStore.getById(ID).data.first : '--';
      var last = productStore.getById(ID) ? productStore.getById(ID).data.last : '--';
      var name = first + ' ' + last;

      var myFirst = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.first : '--';
      var myLast = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.last : '--';
      var myName = myFirst + ' ' + myLast;

      //My schedule
      updateSchedule(user[0].inID, tDay, name, thisAppt);
      $.ajax({url:"./saveCalendar.php", 
              data: {id: user[0].inID, calendar: productStore.getById(user[0].inID).data.calendar },
              type:'post',
              async:true
      });


      //Provider schedule
      thisAppt = changeNameForAppt(thisAppt, ID)
      updateSchedule(ID, tDay, myName, thisAppt);
      $.ajax({url:"./saveCalendar.php", 
              data: {id: ID, calendar: productStore.getById(ID).data.calendar },
              type:'post',
              async:true
      });
    }
  }
  else
  {
    msgEl.innerHTML = '<img src="./images/404.png" style="height: 380px; display: inline-block; margin-right: 300px;"/>';
  }
}



function loadCartItems(id, isReturn)
{
  var elID = id || "cartItems";
  var help = '';
  var idx = 0;
  var email = '';


  if(isReturn)
  {
    cartItems = {};
    //console.log(returnParameters.ID);
    if(productStore.getById(returnParameters.ID))
    {
      var result = productStore.getById(returnParameters.ID).data.cart;
      if(result.length > 2)
      {
        cartItems = productStore.getById(returnParameters.ID).data.cart ? Ext.JSON.decode(productStore.getById(returnParameters.ID).data.cart) : {};
      }
    }
  }


  if(!Object.size(cartItems)) {return;}


  for (var key in cartItems)
  {
    //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
    var cartID = elID + idx;
    var closeCartID = 'close' + elID + idx;
    var blisterCartID = 'blister' + elID + idx;
    var emailCartID = elID + 'email' + idx;
    var blisterEmailCartID = 'blister' + elID + 'email' + idx;
    idx++;

    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];

    var date = {};
    date = getDateIndexes(day);

    var d = date.dayIndex;
    var m = date.monthIndex;
    var y = date.year;


    var image = (productStore.getById(ID) && settings[ID]['identity'] != true) ? productStore.getById(ID).data.image || "./images/ghost.png" : "./images/ghost.png";
    //console.log("ID: " + split[1]);
    //console.log("SETTING: " + imgID);

    //console.log("KEY: " + key + " ITEM: " + cartItems[key]);


    // --Name--
    var first = productStore.getById(ID) ? productStore.getById(ID).data.first : '--';
    var last = productStore.getById(ID) ? productStore.getById(ID).data.last : '--';
    var name = first + ' ' + last;

    //console.log(user[0].inID);
    //console.log(productStore.getById(user[0].inID).data.first);

    var myFirst = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.first : '--';
    var myLast = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.last : '--';
    var myName = myFirst + ' ' + myLast;

    var lsObj = localizeSch(cartItems[key],ID,d,m,y);
    localDay = lsObj.dateStr;

    //console.log(localDay);

    if(!isReturn)
    {
      help += '<li><div class="frame1"><div class="box2" style="background: #A0A0A0;"><div id="' + cartID + '" title="' + key + '" style="padding-top: 4px; padding-left: 6px; width:197px; height:125px; text-align: center; background: url(' + image + '); background-size: cover; opacity: 0.5; filter: alpha(opacity=50); color: #F1FFAF;"></div></div><span class="servicePrice">' + localDay + '</span></div><div id="' + blisterCartID + '" style="border: 0px solid #000; position: relative; padding-top: 4px; padding-left: 4px; width:197px; height:125px; text-align: left; top:-154px;left:8px;">' + lsObj.sch + '</div><div id="' + closeCartID + '" class="close-up" style="position: relative; top: -282px; left: 195px;" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.style.display=\'none\'; removeCartItem(\'' + key + '\', \'' + ID + '\');"></div></li>';
    }
    else
    {
      help += '<li><div class="frame1"><div class="box2" style="background: #A0A0A0;"><div id="' + cartID + '" title="' + key + '" style="padding-top: 4px; padding-left: 6px; width:197px; height:125px; text-align: center; background: url(' + image + '); background-size: cover; opacity: 0.5; filter: alpha(opacity=50); color: #F1FFAF;"></div></div><span class="servicePrice">' + localDay + '</span></div><div id="' + blisterCartID + '" style="border: 0px solid #000; position: relative; padding-top: 4px; padding-left: 4px; width:197px; height:125px; text-align: left; top:-154px;left:8px;">' + lsObj.sch + '</div></li>';

      email += '<div class="frame1" style="background-color: #E0E0E0;border: 1px solid #CCCCCC; width: 203px;margin: 10px 10px 10px 10px;padding: 8px 8px 8px 8px;text-align: center;"><div class="box2" style="background-color: #333333;display: inline-block;-moz-box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);-webkit-box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);box-shadow: 0 0 1px 3px rgba(207, 207, 207, 0.6);filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3, MakeShdow=true, ShadowOpacity=0.80);-ms-filter: &quot;progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)&quot;;zoom: 1;margin-top: -14px;"><div id="' + emailCartID + '" title="' + key + '" style="padding: 4px;width: 197px; height: 125px; text-align: center; color: #F1FFAF; display: block;position: relative;"><img src="' + image + '" style="width: 189px; height: 113px;"/></div></div><div style="margin-bottom: 10px; text-align: center;"><span class="servicePrice" style="color: #F1FFAF;padding-left: 6px;padding-right: 6px;text-align: center;border-radius: 20px;background: #AECC2C;border: solid 0px #4A5612;">' + day + '</span></div><div id="' + blisterEmailCartID + '" style="border: 0px solid #000; position: absolute; padding-top: 4px; padding-left: 4px; width:197px; height:125px; text-align: center; top:-154px;left:8px;">' + cartItems[key] + '<hr><a href="http://www.interviewring.com/?feedback&KEY=' + user[0].inID + ':' + day + '" target="_blank" style="font-size: 16px;">Give ' + myFirst + ' feedback</a><br><a href="http://www.interviewring.com/?rate&ID=' + ID + '&KEY=' + key + '" target="_blank" style="font-size: 16px;">Rate ' + first + '</a></div><div><a>' + ID + '</a></div></div>';
    }
  }
  document.getElementById(elID).innerHTML = help;
  ellipsizeCartItems(elID);

  if(!document.getElementById("hiddenEmailBody"))
  {
    var hiddenEmailBody = document.createElement("div");
    hiddenEmailBody.id = 'hiddenEmailBody';
    //hiddenEmailBody.style.visibility = 'hidden';
    document.body.appendChild(hiddenEmailBody);
    hiddenEmailBody.style.display = 'none';
    hiddenEmailBody.style.position = 'absolute';
    hiddenEmailBody.style.top = 0 + 'px';
    hiddenEmailBody.style.left = 0 + 'px';
  }
  document.getElementById("hiddenEmailBody").innerHTML = email;
  //ellipsizeCartItems("hiddenEmailBody", true);
  

  if(!isReturn)
  {
    document.getElementById("Total").innerHTML = "TOTAL: $" + currencyFormatted(total);
  }


  else {cartItemsReturn = cartItems; cartItems = {};}
  
}



//<a href="http://www.interviewring.com/?feedback&KEY=' + user[0].inID + ':' + day + '" target="_blank">Give ' + myFirst + ' feedback</a><br><a href="http://www.interviewring.com/?rate&ID=' + ID + '" target="_blank">Rate ' + first + '</a></div><div><a>' + ID + '</a>
function getEmailList(str)
{
  var userEmail = str;
  var providerEmail = str;
  var emails = {};
  var titles = str.match(/title\s*=\s*\".*?\"/g);
  var frames = str.split(/<div class=\"frame1\"/g);
  for(var i = 0; i < titles.length; i++)
  {
    var tmp = titles[i];
    tmp = tmp.replace(/title\s*=\s*\"/,'');
    tmp = tmp.replace(/\"/g,'');
    var split = tmp.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var replace = '';
    //console.log("ID: '" + ID + "'");
    if(productStore.getById(ID))
    {
      if(productStore.getById(ID).data.email)
      {
        if(!emails[ID]) emails[ID] = '';
        if(!emails[user[0].inID]) emails[user[0].inID] = '';
        //console.log("EMAIL: " + emails[i]);


        userEmail = '<div class="frame1"' + frames[i+1];
        var search = '<div><a>' + ID + '</a></div>';
        replace = '<div><a title="' + productStore.getById(ID).data.email + '" href="mailto:' + productStore.getById(ID).data.email + '?subject=interviewring.com career service appointment"><img src="http://www.interviewring.com/images/contactIconEmail.png" alt="IconEmail"/>' + productStore.getById(ID).data.email + '</a></div>';
        userEmail = userEmail.replace(new RegExp(search, 'g'), replace);

        var search = '<a.*Give.*feedback</a>';
        replace = '';
        userEmail = userEmail.replace(new RegExp(search, 'g'), replace);

        //Strip out appt and replace with localized version
        search = 'APPT:.*<hr><br>';
        var appt = userEmail.match(new RegExp(search))[0];
        appt = appt.split('<hr>')[0];
        //console.log("MATCH: " + appt);

        var date = {};
        date = getDateIndexes(day);

        var d = date.dayIndex;
        var m = date.monthIndex;
        var y = date.year;


        appt = localizeSch(appt, ID, d, m, y).sch;
        //console.log("LOCALIZED: " + appt);
        appt = appt + '<hr><br>';
        
        replace = appt;
        userEmail = userEmail.replace(new RegExp(search, 'g'), replace);

        emails[user[0].inID] += userEmail;



        providerEmail = '<div class="frame1"' + frames[i+1];
        var search = '<div><a>' + ID + '</a></div>';
        replace = '<div><a title="' + productStore.getById(user[0].inID).data.email + '" href="mailto:' + productStore.getById(user[0].inID).data.email + '?subject=interviewring.com career service appointment"><img src="http://www.interviewring.com/images/contactIconEmail.png" alt="IconEmail"/>' + productStore.getById(user[0].inID).data.email + '</a></div>';
        providerEmail = providerEmail.replace(new RegExp(search, 'g'), replace);

        var search = '<br><a.*Rate ' + productStore.getById(ID).data.first + '</a>';
        replace = '';
        providerEmail = providerEmail.replace(new RegExp(search, 'g'), replace);

        var search = '<img src=\".*\" style=\"width';
        replace = '<img src="' + productStore.getById(user[0].inID).data.image + '" style="width';
        providerEmail = providerEmail.replace(new RegExp(search, 'g'), replace);


        emails[ID] += providerEmail;
      }
    }
  }
  
  return {emails: emails, userEmail: userEmail, providerEmail: providerEmail};
}




function getTotalFromEmail(str)
{

  //console.log(str);
  var returnSubs = {};
  //<div id="cartItemsReturn1" title="jiBx
  var appts = str.split(/cartItemsReturn[0-9]+/);
  appts.shift();

  var titles = str.match(/title\s*=\s*\".*?\"/g);
  for(var i = 0; i < titles.length; i++)
  {
    var tmp = titles[i];
    tmp = tmp.replace(/title\s*=\s*\"/,'');
    tmp = tmp.replace(/\"/g,'');
    var split = tmp.split(/\:/);
    var ID = split[0];
    var day = split[1];
    //console.log("DAY: " + day);

    //console.log("DIV: " + appts[i]);
    //var thisAppt = appts[i].match(/<div\s+id\s*=\s*\"cartItemsReturn[0-9]+\".*?>(.*?)<\/div>/)[1];
    var thisAppt = appts[i].match(/title.*?>(.*?)<\/div>/)[1];
    //console.log("thisAppt: " + thisAppt);


    returnSubs[ID+day] = getSubTotalFromSch(thisAppt, ID);
  }
  return getTotal(returnSubs);

}



function getTotalFromCartItems(items, myID)
{
  var returnSubs = {};
  for (var key in items)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    myID = myID || ID;
    var day = split[1];
    var thisAppt = items[key];
    //console.log("thisAppt: " + thisAppt);

    if(ID === myID) {returnSubs[ID+day] = getSubTotalFromSch(thisAppt, ID);}
  }
  return getTotal(returnSubs);
}





function changeNameForAppt(email, myID)
{
  var first = productStore.getById(myID).data.first;
  var last = productStore.getById(myID).data.last;
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  email = email.replace(new RegExp(name, 'g'), myName);
  return email;
}



function getMyItemsFromCartItems(items, myID)
{

  var first = productStore.getById(myID).data.first;
  var last = productStore.getById(myID).data.last;
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  var myItems = {};
  for (var key in items)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    myID = myID || ID;
    var day = split[1];
    var thisAppt = items[key];
    //console.log("thisAppt: " + thisAppt);

    if(ID === myID)
    {
      var newKey = user[0].inID + ':' + day;
      thisAppt = thisAppt.replace(new RegExp(name, 'g'), myName);
      myItems[newKey] = thisAppt;
    }
  }
  return myItems;
}



function updateBackgroundImages(items)
{
  var elID = "cartItemsReturn";
  var idx = 0;
  for (var key in items)
  {
    //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
    var cartID = elID + idx;
    var closeCartID = 'close' + elID + idx;
    var blisterCartID = 'blister' + elID + idx;
    var emailCartID = elID + 'email' + idx;
    var blisterEmailCartID = 'blister' + elID + 'email' + idx;
    idx++;

    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var image = productStore.getById(ID) ? productStore.getById(ID).data.image || "./images/ghost.png" : "./images/ghost.png";
    document.getElementById(cartID).style.background = 'url(' + image + ')';
    document.getElementById(cartID).style.backgroundSize = 'cover';
    //document.getElementById(emailCartID).style.background = 'url(' + image + ')';
    //document.getElementById(emailCartID).style.backgroundSize = 197 + 'px';
  }
}





function sendNotificationEmail()
{
  var tmp = {};
  var emails = {};
  var userEmail;
  var providerEmail;

  updateBackgroundImages(cartItemsReturn);
  var returnTotal = currencyFormatted(getTotalFromCartItems(cartItemsReturn));

  if(window.validateCoupon(returnParameters.CODE))
  {
    returnTotal = total;
  }
  //console.log("TOTAL: " + returnTotal);

  tmp = getEmailList(document.getElementById("hiddenEmailBody").innerHTML);
  emails = tmp.emails;
  userEmail = tmp.userEmail;
  providerEmail = tmp.providerEmail;

  userEmail = emails[user[0].inID];
  delete emails[user[0].inID];

  //console.log(userEmail);

  var userHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>Thank you for choosing interviewring to handle your career services.</h1><h2>You and your service provider(s) have been sent this email with info regarding how to connect with one another.</h2><h2>The interviewring team wishes you much success in your career and hopes to serve you again.</h2></div><br><br><br><div><h1>TOTAL: $' + returnTotal + '</h1></div>' + userEmail + '</body></html>';

  //console.log("USER: " + user[0].first + " (" + user[0].email + "): " + userHTML);


  $.ajax({url:"./saveHistory.php", 
       data: {id: user[0].inID, history: JSON.stringify(cartItemsReturn) },
       type:'post',
       async:true
  });


  if(1)
    {
  //User Email
  $.ajax({url:"./email.php", 
    //data: {name: user[0].first, email: user[0].email, cc_list: '', subject: "Your Purchase from interviewring.com", MsgHTML: userHTML},
    data: {id: user[0].inID, name: user[0].first, email: user[0].email, from: 'The InterviewRing Team', subject: "Your Purchase from interviewring.com", MsgHTML: userHTML, attachResume: '0'},
    type:'post',
    async:false
  });
    }

  for(var ID in emails)
  { 

    var justMyItems = getMyItemsFromCartItems(cartItemsReturn, ID);
    $.ajax({url:"./saveProviderHistory.php", 
       data: {id: ID, providerHistory: JSON.stringify(justMyItems) },
       type:'post',
       async:false
    });



    var first = productStore.getById(ID).data.first;
    var email = productStore.getById(ID).data.email;
    var providerEmail = changeNameForAppt(emails[ID], ID);
    //console.log(first + "->" + providerEmail);  
    var serviceTotal = currencyFormatted(getTotalFromCartItems(cartItemsReturn, ID));
    var processingPercent = 0.15;
    var processingFee = currencyFormatted(parseFloat(serviceTotal) * processingPercent);
    var payout = currencyFormatted(parseFloat(serviceTotal) - parseFloat(processingFee));

    var providerHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>Congratulations!</h1><h2>Your service has been selected to help advance someone\'s career.</h2><h2>The interviewring team wishes to thank you for providing this service and giving of your time and talents so freely.</h2></div><br><br><br><div><h1>TOTAL: $' + serviceTotal + '</h1>';
    if(parseFloat(serviceTotal)) {providerHTML += '<h2>Upon completing the service and providing feedback you will get $' + payout + '  (' + serviceTotal + ' - ' + processingFee + '*)  *processing fee (' + parseFloat(processingPercent * 100.00) + '%)</h2>';}
    providerHTML += '</div><h2>Next Steps: Contact <a href="mailto:' + user[0].email + '?Subject=InterviewRing%20Appointment" target="_top">' + user[0].first + '</a><br>Please ensure that you can contact ' + user[0].first + ' before the day of the service.<br>Please share all the details of the service day. i.e. meeting location, if in person, or details of remote service tools like google hangouts address, skype address or the like.<br>After completion of the service be sure to provide feedback via the link below or logging into interviewring.com and finding this appointment in your history<br>Thanks again!<br></h2>';
    providerHTML += '</div>' + providerEmail + '</body></html>';

    //console.log("PROVIDER: " + first + " (" + email + "): " + providerHTML);

    if(1)
      {
    var attach = productStore.getById(user[0].inID).data.resume ? '1' : '0';
    //var MsgTEXT = getPlainText(emails[id]);
    //Provider Email
    $.ajax({url:"./email.php", 
      //data: {name: first, email: email, cc_list: '', subject: "Your scheduled appointment via interviewring.com", MsgHTML: providerHTML},
      data: {id: user[0].inID, name: first, email: email, from: 'InterviewRing Appointment', subject: "Your scheduled appointment via interviewring.com", MsgHTML: providerHTML, attachResume: attach},
      type:'post',
      async:false
    });
      }
  }




}





function loadCartAtStartup()
{
  cartItems = productStore.getById(user[0].inID).data.cart ? Ext.JSON.decode(productStore.getById(user[0].inID).data.cart) : {};

  //If user had items in their cart load them up
  if(Object.size(cartItems))
  {
    for (var key in cartItems)
    {
      var split = key.split(/\:/);
      var ID = split[0];
      var day = split[1];
      var thisAppt = cartItems[key];


      var date = {};
      date = getDateIndexes(day);

      var d = date.dayIndex;
      var m = date.monthIndex;
      var y = date.year;
      d = pad(d, 2);
      m = pad(m, 2);
      var tDay = d + "/" + m + "/" + y;

      subTotals[ID+tDay] = getSubTotalFromSch(thisAppt, ID);
      subTotalsSaved[key] = getSubTotalFromSch(thisAppt, ID);
      //console.log(getSubTotalFromSch(thisAppt, ID));
    }
    total = getTotal(subTotals);
    //console.log(total);


    //console.log("ITEMS IN CART");
    total = getTotalFromCartItems(cartItems);
    //console.log(total);

    document.getElementById("Total").innerHTML = "TOTAL: $" + currencyFormatted(total);

    if(total != 0)
    {
      Ext.get("promoCodeContainer").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
      document.getElementById("checkOutCallToActionHeader").innerHTML = 'Choose your method of payment';
      document.getElementById("checkOutCallToActionConfirm").style.display = 'none';
      document.getElementById("checkOutCallToActionButtons").style.display = '';
    }
    else                       
    {
      Ext.get("promoCodeContainer").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
      document.getElementById("checkOutCallToActionHeader").innerHTML = 'Confirm your appointment(s)';
      document.getElementById("checkOutCallToActionConfirm").style.display = '';
      document.getElementById("checkOutCallToActionButtons").style.display = 'none';
    }
    if(Object.size(cartItems))
    {
      Ext.get("cartItem").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
      document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium";
      document.getElementById("checkOutCallToAction").style.display = '';
      document.getElementById("Total").style.visibility = '';
    }
    else
    {
      Ext.get("cartItem").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
      document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium inactive";
      document.getElementById("checkOutCallToAction").style.display = 'none';
      document.getElementById("Total").style.visibility = 'hidden';
      document.getElementById("cartItems").innerHTML = '<h1 class="clearfix" style="margin-top: 100px; text-align: center;">Your Cart is Empty</h1>';
    }
    loadCartItems();
  }
}





function removeCartItem(key, ID)
{
  //console.log(cartItems[key]);
  //console.log(ID);
  var removedSch = cartItems[key];
  delete cartItems[key];
  delete subTotals[key];
  delete subTotalsSaved[key];
  // = getSubTotalFromSch(thisAppt, ID);

  saveCartItem(user[0].inID, cartItems);


  var date = {};
  date = getDateIndexes(key);

  var day = date.dayIndex;
  var month = date.monthIndex;
  var year = date.year;
  var calendar
  var calID = 'myCalendar';
  calendar = Ext.getCmp(calID);
  day = pad(day, 2);
  month = pad(month, 2);
  //console.log(day + " " + month);

  var tDay = day + "/" + month + "/" + year;
  //console.log(tDay);



  var sch = "";  
  var thisAppt = '';
  // --Name--
  var first = productStore.getById(ID) ? productStore.getById(ID).data.first : '--';
  var last = productStore.getById(ID) ? productStore.getById(ID).data.last : '--';
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.first : '--';
  var myLast = productStore.getById(user[0].inID) ? productStore.getById(user[0].inID).data.last : '--';
  var myName = myFirst + ' ' + myLast;

  var providersSch = '';
  var temp;
  var removed;

  //var oldSch = getSchedule(Ext.getCmp('myCalendar'), tDay);
  var oldSch = getSchedule(user[0].inID, tDay);
  //console.log("OLD SCH: " + oldSch);
  oldSch = oldSch.replace(/\n/g, '<br>');

  //console.log("OLD SCH: " + oldSch);

  //console.log("SCH: " + sch);
  if(sch)
  {
    var nameToDisplay = settings[ID]['identity'] ? 'Confidential' : name;
    thisAppt = 'APPT: ' + nameToDisplay + '<br>' + sch;
    providersSch = sch;
    temp = removeOldSchByName(oldSch, name);
    oldSch = temp.sch;
    removed = temp.removed;
    sch = oldSch + '<br>' + thisAppt;
  }
  else
  {
    temp = removeOldSchByName(oldSch, name);
    oldSch = temp.sch;
    removed = temp.removed;
    sch = oldSch;
  }

  updateSchedule(ID, tDay, myName, providersSch)
  //console.log(sch);
  //var customTitle = "AVAILABLE:\n" + sch;
  var customTitle = sch;

  if(sch)
  {
    schedule[tDay] = customTitle;
    createCookie(tDay, customTitle);
    addSchedule(calendar, tDay, customTitle);
  }
  else
  {
    schedule[tDay] = '';
    deleteCookie(tDay);
    addSchedule(calendar, tDay, '');
  }
  productStore.getById(user[0].inID).data.calendar = JSON.stringify(schedule);

  //console.log("SUB: " + subTotals[ID+tDay]);
  subTotals[ID+tDay] -= getSubTotalFromSch(removedSch, ID);
  //console.log("SUB: " + subTotals[ID+tDay]);
  total = getTotal(subTotals);

  total = getTotalFromCartItems(cartItems);

  document.getElementById("Total").innerHTML = "TOTAL: $" + currencyFormatted(total);

  //  if(!Object.size(cartItems)) {document.getElementById("cartItem").style.display = 'none';}
  if(total != 0)
  {
    Ext.get("promoCodeContainer").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionHeader").innerHTML = 'Choose your method of payment';
    document.getElementById("checkOutCallToActionConfirm").style.display = 'none';
    document.getElementById("checkOutCallToActionButtons").style.display = '';
  }
  else                       
  {
    Ext.get("promoCodeContainer").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionHeader").innerHTML = 'Confirm your appointment(s)';
    document.getElementById("checkOutCallToActionConfirm").style.display = '';
    document.getElementById("checkOutCallToActionButtons").style.display = 'none';
  }
  if(Object.size(cartItems))
  {
    Ext.get("cartItem").fadeIn({opacity: 1, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium";
    document.getElementById("checkOutCallToAction").style.display = '';
    document.getElementById("Total").style.visibility = '';
  }
  else
  {
    Ext.get("cartItem").fadeOut({opacity: 0, easing: 'easeIn', duration: 1000});
    document.getElementById("checkOutCallToActionConfirmButton").className="a-button a-button-medium inactive";
    document.getElementById("checkOutCallToAction").style.display = 'none';
    document.getElementById("Total").style.visibility = 'hidden';
    document.getElementById("cartItems").innerHTML = '<h1 class="clearfix" style="margin-top: 100px; text-align: center;">Your Cart is Empty</h1>';
  }

}



function historyAvailable()
{
  var historyItems = {};
  if(productStore.getById(user[0].inID))
  {
    var result = productStore.getById(user[0].inID).data.history;
    if(result)
    {
      if(result.length > 2)
      {
        historyItems = productStore.getById(user[0].inID).data.history ? Ext.JSON.decode(productStore.getById(user[0].inID).data.history) : {};
      }
    }
  }

  var items = 0;
  var withFeedback = 0;
  for (var key in historyItems)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];

    items++;
    //console.log(ID);
    var feedback = {};
    if(productStore.getById(ID))
    {
      var result = productStore.getById(ID).data.feedback;
      if(result.length > 2)
      {
        feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
      }
    }
    var fbKey = user[0].inID + ':' + day;

    if(feedback[fbKey])
    {
      withFeedback++;
    }
  }
  return {items: items, withFeedback: withFeedback};
}




function providerHistoryAvailable()
{
  var historyItems = {};
  if(productStore.getById(user[0].inID))
  {
    var result = productStore.getById(user[0].inID).data.providerHistory;
    if(result)
    {
      if(result.length > 2)
      {
        historyItems = productStore.getById(user[0].inID).data.providerHistory ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providerHistory) : {};
      }
    }
  }

  var items = 0;
  var withFeedback = 0;
  for (var key in historyItems)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];

    items++;
    //console.log(ID);
    var feedback = {};
    if(productStore.getById(ID))
    {
      var result = productStore.getById(user[0].inID).data.feedback;
      if(result.length > 2)
      {
        feedback = productStore.getById(user[0].inID).data.feedback ? Ext.JSON.decode(productStore.getById(user[0].inID).data.feedback) : {};
      }
    }
    var fbKey = user[0].inID + ':' + day;

    if(feedback[fbKey])
    {
      withFeedback++;
    }
  }
  return {items: items, withFeedback: withFeedback};
}





function loadFeedbackCount()
{
  if(document.getElementById("feedbackCount"))
  {
    var items = 0;
    if(productStore.getById(user[0].inID).data.role=='find') {items = historyAvailable().items;}
    if(productStore.getById(user[0].inID).data.role=='give') {items = providerHistoryAvailable().items;}
    if(productStore.getById(user[0].inID).data.role=='both') {items = historyAvailable().items + providerHistoryAvailable().items;}
    document.getElementById("feedbackCount").innerHTML = items;
  }
}


function XXloadHistoryXX()
{
  var elID = "history";
  var help = '';
  var idx = 0;
  var historyItems = {};
  historyItems = productStore.getById(user[0].inID).data.history ? Ext.JSON.decode(productStore.getById(user[0].inID).data.history) : {};


  for (var key in historyItems)
  {
    //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
    var historyID = elID + idx;
    var closeHistoryID = 'close' + elID + idx;
    var blisterHistoryID = 'blister' + elID + idx;
    idx++;

    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var image = productStore.getById(ID).data.image || "./images/ghost.png";

    //console.log(ID);
    var feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
    var fbKey = user[0].inID + ':' + day;
    //console.log(fbKey);
    //if(feedback[fbKey]) {console.log(feedback[fbKey]['knowledge']);}
    //console.log("ID: " + split[1]);
    //console.log("SETTING: " + imgID);
    //console.log("STR: " + Ext.JSON.encode(feedback[fbKey]));
    if(feedback[fbKey])
    {
      help += '<li><div class="frame1"><div class="box2" style="background: #808080;"><div id="' + historyID + '" title="' + key + '" style="padding-top: 4px; padding-left: 6px; width:197px; height:125px; text-align: center; background: url(' + image + '); background-size: cover; opacity: 0.5; filter: alpha(opacity=50); color: #F1FFAF;"></div></div><span class="servicePrice">' + day + '</span></div><div id="' + blisterHistoryID + '" style="border: 0px solid #000; position: relative; padding-top: 4px; padding-left: 4px; width:197px; height:125px; text-align: center; top:-154px;left:8px; margin-bottom: -100px;" onmouseover=\"this.style.cursor=\'pointer\'; this.parentNode.firstChild.style.backgroundImage=\'url(images/framesHi.png)\';\" onmouseout=\"this.parentNode.firstChild.style.backgroundImage=\'url(images/frames.png)\';\" onclick=\"historyClicked(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\');\">' + historyItems[key] + '</div></li>';
    }
    else
    {
      help += '<li><div class="frame1"><div class="box2" style="background: #808080;"><div id="' + historyID + '" title="' + key + '" style="padding-top: 4px; padding-left: 6px; width:197px; height:125px; text-align: center; background: url(' + image + '); background-size: cover; opacity: 0.5; filter: alpha(opacity=50); color: #F1FFAF;"></div></div><span class="servicePrice">' + day + '</span></div><div id="' + blisterHistoryID + '" title="Feedback not yet available" style="border: 0px solid #000; position: relative; padding-top: 4px; padding-left: 0px; width:197px; height:125px; text-align: center; top:-154px;left:8px; margin-bottom: -100px;">' + '<p>FEEDBACK NOT AVAILABLE</p>' + historyItems[key] + '</div></li>';
    }
  }

  if(!help) {help = '<h2>You Have no History</h2>';}
  document.getElementById(elID).innerHTML = help;
  ellipsizeCartItems(elID);


}







function getHistoryStatuses()
{

  var historyItems = {};
  historyItems = productStore.getById(user[0].inID).data.history ? Ext.JSON.decode(productStore.getById(user[0].inID).data.history) : {};

  var scheduled = 0;
  var waiting = 0;
  var completed = 0;

  for (var key in historyItems)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var status = '';
    var dateFilter = '';
    var company =  productStore.getById(ID).data.company || "";
    var feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
    var fbKey = user[0].inID + ':' + day;
    if(feedback[fbKey])
    {
      completed++;
    }
    else
    {
      //console.log(day);
      var date = {};
      date = getDateIndexes(day);

      var d = parseInt(date.dayIndex, 10);
      var m = parseInt(date.monthIndex, 10);
      var y = parseInt(date.year, 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x>t)
      {
        scheduled++;
      }
      else
      {
        waiting++;
      }
    }
  }
  return {'Scheduled': scheduled, 'Waiting Feedback': waiting, 'Completed': completed};
}





function getProviderHistoryStatuses()
{

  var historyItems = {};
  historyItems = productStore.getById(user[0].inID).data.providerHistory ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providerHistory) : {};

  var scheduled = 0;
  var waiting = 0;
  var completed = 0;

  for (var key in historyItems)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var status = '';
    var dateFilter = '';
    var company =  productStore.getById(ID).data.company || "";
    var feedback = productStore.getById(user[0].inID).data.feedback ? Ext.JSON.decode(productStore.getById(user[0].inID).data.feedback) : {};
    //var fbKey = user[0].inID + ':' + day;
    var fbKey = ID + ':' + day;
    //console.log("FBKEY: " + fbKey);
    if(feedback[fbKey])
    {
      //console.log("HERE");
      completed++;
    }
    else
    {
      //console.log(day);
      var date = {};
      date = getDateIndexes(day);

      var d = parseInt(date.dayIndex, 10);
      var m = parseInt(date.monthIndex, 10);
      var y = parseInt(date.year, 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x>t)
      {
        scheduled++;
      }
      else
      {
        waiting++;
      }
    }
  }
  return {'Scheduled': scheduled, 'Waiting Feedback': waiting, 'Completed': completed};
}






  function doHistory(arg)
  {
    //console.log('doHistory');
    arg = arg || document.getElementById('explore').value;
    document.getElementById('explore').value = arg;

    historyItemKeyArray = [];
    document.getElementById("historyItems").innerHTML = '';

    loadHistory(arg);
    //loadProviderHistory(arg);
    historyType = 'interviewee';
  }


  function doProviderHistory(arg)
  {
    //console.log('doHistory');
    arg = arg || document.getElementById('explore').value;
    document.getElementById('explore').value = arg;

    historyItemKeyArray = [];
    document.getElementById("historyItems").innerHTML = '';
    loadProviderHistory(arg);
    historyType = 'interviewer';
  }






  function loadHistory(exp)
  {

    //console.log('loadHistory');
    var regExp = exp || ".";
    regExp = regExp.replace(/\s+/g, "|");
    var matchRE = new RegExp(regExp, "i");
    //console.log(regExp);

    //historyItemKeyArray = [];
    var companies = new Array();
    var historyItems = {};
    historyItems = productStore.getById(user[0].inID).data.history ? Ext.JSON.decode(productStore.getById(user[0].inID).data.history) : {};


    for (var key in historyItems)
    {
      var split = key.split(/\:/);
      var ID = split[0];
      var day = split[1];
      var status = '';
      var dateFilter = '';


      var first = productStore.getById(ID).data.first || "";
      var last = productStore.getById(ID).data.last || "";
      var company = productStore.getById(ID).data.company || "";
      var position = productStore.getById(ID).data.position || "";
      var industry = productStore.getById(ID).data.industry || "";
      //var summary = productStore.getById(ID).data.summary || "";


      var feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
      var fbKey = user[0].inID + ':' + day;
      if(feedback[fbKey])
      {
        status = 'Completed';
      }
      else
      {
        //console.log(day);

        var date = {};
        date = getDateIndexes(day);

        var d = parseInt(date.dayIndex, 10);
        var m = parseInt(date.monthIndex, 10);
        var y = parseInt(date.year, 10);
        //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
        var x=new Date();
        x.setFullYear(y,m-1,d);
        var t = new Date();

        if (x>t)
        {
          status = 'Scheduled';
        }
        else
        {
          status = 'Waiting Feedback';
        }
      }

      //"date":['< 1 month ago', '1-3 months ago', '4-6 months ago', '7-12 months ago', '> 1 year ago']
      var date = {};
      date = getDateIndexes(day);

      var d = parseInt(date.dayIndex, 10);
      var m = parseInt(date.monthIndex, 10);
      var y = parseInt(date.year, 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);


      //'< 1 month ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 1);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '< 1 month ago';}

      //'1-3 months ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 3);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '1-3 months ago';}

      //'4-6 months ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 6);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '4-6 months ago';}

      //'7-12 months ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 12);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '7-12 months ago';}

      //'> 1 year ago'
      if(!dateFilter) {dateFilter = '> 1 year ago';}

      //console.log(dateFilter);


      var found = first.match(matchRE);
      found += last.match(matchRE);
      found += company.match(matchRE);
      found += position.match(matchRE);
      found += industry.match(matchRE);
      //found += summary.match(matchRE);
      found += status.match(matchRE);
      found += dateFilter.match(matchRE);
      if(ID == regExp) {found++;}
      //console.log("FOUND: " + found);
      if(found)
      {
        historyItemKeyArray.push({key: key, id: ID, day: day, status: status, companyH: company, date: dateFilter});
        var found = 0;
        for(var i = 0; i < companies.length; i++) {if(companies[i] === company) found++;}
        if(!found) {companies.push(company);}
      }

    }
    historyFilters.companyH = companies ? companies.sort() : {};
    //populateFilters();

    applyHistoryFilters();
    historyItemKeyArray.sort(sortHistoryFunction)
    populateHistoryItems();

    if(exp) {pruneHistoryFilters();}

  } //loadHistory()






  function loadProviderHistory(exp)
  {

    //console.log('loadHistory');
    var regExp = exp || ".";
    regExp = regExp.replace(/\s+/g, "|");
    var matchRE = new RegExp(regExp, "i");
    //console.log(regExp);

    //historyItemKeyArray = [];
    var companies = new Array();
    var historyItems = {};
    historyItems = productStore.getById(user[0].inID).data.providerHistory ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providerHistory) : {};


    for (var key in historyItems)
    {
      var split = key.split(/\:/);
      var ID = split[0];
      var day = split[1];
      var status = '';
      var dateFilter = '';

      var first = productStore.getById(ID).data.first || "";
      var last = productStore.getById(ID).data.last || "";
      var company = productStore.getById(ID).data.company || "";
      var position = productStore.getById(ID).data.position || "";
      var industry = productStore.getById(ID).data.industry || "";
      //var summary = productStore.getById(ID).data.summary || "";


      var feedback = productStore.getById(user[0].inID).data.feedback ? Ext.JSON.decode(productStore.getById(user[0].inID).data.feedback) : {};
      //var fbKey = user[0].inID + ':' + day;
      var fbKey = ID + ':' + day;
      //console.log("FBKEY: " + fbKey);
      if(feedback[fbKey])
      {
        //console.log("HERE");
        status = 'Completed';
      }
      else
      {
        //console.log(day);

        var date = {};
        date = getDateIndexes(day);

        var d = parseInt(date.dayIndex, 10);
        var m = parseInt(date.monthIndex, 10);
        var y = parseInt(date.year, 10);
        //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
        var x=new Date();
        x.setFullYear(y,m-1,d);
        var t = new Date();

        if (x>t)
        {
          status = 'Scheduled';
        }
        else
        {
          status = 'Waiting Feedback';
        }
      }

      //"date":['< 1 month ago', '1-3 months ago', '4-6 months ago', '7-12 months ago', '> 1 year ago']
      var date = {};
      date = getDateIndexes(day);

      var d = parseInt(date.dayIndex, 10);
      var m = parseInt(date.monthIndex, 10);
      var y = parseInt(date.year, 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);


      //'< 1 month ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 1);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '< 1 month ago';}

      //'1-3 months ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 3);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '1-3 months ago';}

      //'4-6 months ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 6);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '4-6 months ago';}

      //'7-12 months ago'
      var y = new Date();
      y.setMonth(y.getMonth() - 12);
      var year =  y.getFullYear();
      var month =  monthNames[y.getMonth()];
      var weekDay = dayNames[y.getDay()];
      var dayIndex = y.getDate();
      var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
      //console.log(y.getMonth()+1);
      //console.log("DAY: " + day + " FUTURE: " + futureDay);
      if(x > y && !dateFilter) {dateFilter = '7-12 months ago';}

      //'> 1 year ago'
      if(!dateFilter) {dateFilter = '> 1 year ago';}

      //console.log(dateFilter);

      var found = first.match(matchRE);
      found += last.match(matchRE);
      found += company.match(matchRE);
      found += position.match(matchRE);
      found += industry.match(matchRE);
      //found += summary.match(matchRE);
      found += status.match(matchRE);
      found += dateFilter.match(matchRE);
      if(ID == regExp) {found++;}
      //console.log("FOUND: " + found);
      if(found)
      {
        historyItemKeyArray.push({key: key, id: ID, day: day, status: status, companyH: company, date: dateFilter});
        var found = 0;
        for(var i = 0; i < companies.length; i++) {if(companies[i] === company) found++;}
        if(!found) {companies.push(company);}
      }

    }
    historyFilters.companyH = companies ? companies.sort() : {};
    //populateFilters();

    applyHistoryFilters();
    historyItemKeyArray.sort(sortHistoryFunction)
    populateProviderHistoryItems();

    if(exp) {pruneHistoryFilters();}

  } //loadProviderHistory()






function sortHistoryFunction(a, b)
{
  //Compare "a" and "b" in some fashion, and return <0, 0, or >0
  //Less than 0: Sort "a" to be a lower index than "b"
  //Zero: "a" and "b" should be considered equal, and no sorting performed.
  //Greater than 0: Sort "b" to be a lower index than "a".

  var e = document.getElementById("sortHistory");
  var opt = e.options[e.selectedIndex].value;
  //console.log(opt);  

  if(opt == 'company')
  {
    if(productStore.getById(a.id).data.company < productStore.getById(b.id).data.company) {return -1;}
    if(productStore.getById(a.id).data.company > productStore.getById(b.id).data.company) {return 1;}
    return 0;
  }
  else if(opt == 'status')
  {
    //console.log(a.status + " > " + b.status);
    return a.status > b.status;
  }
  else if(opt == 'date')
  {
    var date = {};
    date = getDateIndexes(a.day);
    var d = parseInt(date.dayIndex, 10);
    var m = parseInt(date.monthIndex, 10);
    var y = parseInt(date.year, 10);
    //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
    var aDate = new Date();
    aDate.setFullYear(y,m-1,d);

    date = getDateIndexes(b.day);
    var d = parseInt(date.dayIndex, 10);
    var m = parseInt(date.monthIndex, 10);
    var y = parseInt(date.year, 10);
    //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
    var bDate = new Date();
    bDate.setFullYear(y,m-1,d);

    if (aDate < bDate) {return -1;}
    else if(aDate > bDate) {return 1;}
    else {return 0;}
  }


}



function applyHistoryFilters()
{
  var filterType = 'and';

  var checkedFilters = {};
  var toSave = {};
  var atLeastOneChecked = false;
  var filtered = new Array();

  for(var key in historyFilters)
  {
    //console.log("FILTER: " + key);
    var filterName = key + 'Filter';
    if(!checkedFilters[key]) {checkedFilters[key] = {};}
    var r = document.getElementsByName(filterName);
    for (var i = 0; i < r.length; i++)
    {
      var value = r[i].value;
      checkedFilters[key][value] = r[i].checked;
      //console.log("ADDING -> KEY: " + key + " VALUE: " + value + " = " + checkedFilters[key][value]);
      atLeastOneChecked |= r[i].checked;
    }
  }

  if(!atLeastOneChecked) {return;}

  if(filterType == 'and')
  {
    for(var key in historyFilters)
    {
      atLeastOneChecked = false;
      for(var value in checkedFilters[key])
      {
        //console.log("--KEY: " + key + " VALUE: " + value + " = " + checkedFilters[key][value]);
	atLeastOneChecked |= checkedFilters[key][value];
      }
      if(!atLeastOneChecked)
      {
        for(var value in checkedFilters[key])
        {
	  checkedFilters[key][value] = true;
        }
      }
    }
  }

  for(var j = 0; j < historyItemKeyArray.length; j++)
  {
    var ID = historyItemKeyArray[j].id;
    toSave[j] = (filterType == 'and') ? true : false;
    //console.log("\n\nID: " + ID);
    for(var key in historyFilters)
    {
      //console.log("--KEY: " + key);
      var value = historyItemKeyArray[j][key];
      var found = false;
      var currValue = (key != 'services') ? value : 'services';
      //console.log("CURRVALUE: " + currValue);
      if(key == 'services')
      {
        var services;
        if(productStore.getById(ID)) {services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};}

        for (var service in services)
        {
          //console.log("REGEX: " + regExp + " KEY: " + key);
          for(var checked in checkedFilters[key])
          {
	    if(checkedFilters[key][checked])
	    {
	      //console.log("OFFERED: " + service + " CHECKED: " + checked);
              if(service == checked) {found = true;}
	    }
	  }
        }
	checkedFilters[key][currValue] = found;
      }



      //console.log("--VALUE: " + currValue);
      if(typeof checkedFilters[key][currValue] !== "undefined")
      {
        //console.log("----KEY: " + key + " VALUE: " + currValue + " = " + checkedFilters[key][currValue]);
        if(filterType == 'and')
          toSave[j] &= checkedFilters[key][currValue];
        else
          toSave[j] |= checkedFilters[key][currValue];
      }
      //console.log("--TO SAVE: " + ID + "->" + toSave[ID]);
    }
  }

  for(var key in toSave)
  {
    if(toSave[key]) {filtered.push(historyItemKeyArray[key]);}//      historyItemKeyArray.push({key: key, id: ID, day: day, status: status}); 

  }
  historyItemKeyArray = filtered;
}




function populateHistoryItems()
{
  var companies = new Array();
  var elID = "historyItems";
  var help = '';
  var index = 0;
  var historyItems = {};
  historyItems = productStore.getById(user[0].inID).data.history ? Ext.JSON.decode(productStore.getById(user[0].inID).data.history) : {};


  //document.getElementById("historyItems").innerHTML = '';
  document.getElementById("resultsHistory").innerHTML = 'History Items: ' + historyItemKeyArray.length;




  for(index = 0; index < historyItemKeyArray.length; index++)
  {
    var key = historyItemKeyArray[index].key;

    //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
    var historyID = elID + index;
    var closeHistoryID = 'close' + elID + index;
    var blisterHistoryID = 'blister' + elID + index;

    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var image = productStore.getById(ID).data.image || "./images/ghost.png";


    var date = {};
    date = getDateIndexes(day);

    var d = parseInt(date.dayIndex, 10);
    var m = parseInt(date.monthIndex, 10);
    var y = parseInt(date.year, 10);



    var link = '';

    split = historyItems[key].split('<br>');
    split.shift();
    var appt = split.join('<br>');

    //console.log(ID);
    var feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
    var fbKey = user[0].inID + ':' + day;


    //console.log(fbKey);
    //if(feedback[fbKey]) {console.log(feedback[fbKey]['knowledge']);}
    //console.log("ID: " + split[1]);
    //console.log("SETTING: " + imgID);
    //console.log("STR: " + Ext.JSON.encode(feedback[fbKey]));
    if(feedback[fbKey])
    {
      link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:green;"> Completed</span></span><hr></div>';
    }
    else
    {
      //console.log(day);

      var date = {};
      date = getDateIndexes(day);

      var d = parseInt(date.dayIndex, 10);
      var m = parseInt(date.monthIndex, 10);
      var y = parseInt(date.year, 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x>t)
      {
        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:yellow;"> Scheduled</span></span><hr></div>';
      }
      else
      {
        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:red;"> Waiting Feedback</span></span><hr></div>';
      }
    }





      // --Rating--
      var ratingStr = '';
      var ratingObj = productStore.getById(ID).data.reviews ? Ext.JSON.decode(productStore.getById(ID).data.reviews) : {};

      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      //console.log(ratingObj.comments);
      if(!rating) {rating = 0;}





      var ratingStr = '<div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(Ext.JSON.encode(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
      ratingStr += '<div style="right: -6px;">';
      for(var i = rating; i < 5; i++)
      {
        ratingStr += '<img src="images/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        ratingStr += '<img src="images/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '</div></div><div style="color: #555; text-align: right; position: absolute; top: 15px; right: 0px;">' + rates + ' Reviews</div></div>';






      // --Name--
      var first = productStore.getById(ID).data.first;
      var last = productStore.getById(ID).data.last;
      var url = productStore.getById(ID).data.url;
      var label = first + ' ' + last;
      //console.log(label);

      var lsObj = localizeSch(appt,ID,d,m,y);
      localDay = lsObj.dateStr;

      // --Services--
      services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};
      //console.log(services);
      var help = '<div style="position: absolute; top: 244px; text-align: left; color: #444; font-weight: lighter; width: 200px;"><div style="font-weight: bold; text-align: left; width: 200px;">' + localDay + '</div>' + lsObj.sch;
      help += '</div>';
      //console.log(help);

      // --Company--
      var company =  productStore.getById(ID).data.company || "";
      var found = 0;
      for(var i = 0; i < companies.length; i++) {if(companies[i] === company) found++;}
      if(!found) {companies.push(company);}
      var companyTenure =  productStore.getById(ID).data.companyTenure || 0;

      // --Industry--
      var indsutry =  productStore.getById(ID).data.industry || "";
      var industryTenure =  productStore.getById(ID).data.industryTenure || 0;

      // --Position--
      var position =  productStore.getById(ID).data.position || "";

      var education = productStore.getById(ID).data.education || "";
      //  Only display most recent education
      var split = education.split('<br>');
      education = split[0];

      // --Image--
      var image = productStore.getById(ID).data.imageSmall || "./images/ghostSmall.png";
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

      if(settings[ID]['identity']) {label = ""; image = "./images/ghostSmall.png";}



    var wrapper = document.createElement("div");




    var window = document.createElement("div");
    window.className = "historyItem";
    window.id = "historyItem" + index;
 

    //if(link.match('Completed'))      {window.onclick = function() {viewFeedback();}  ;}


    //onclick = new Function('show_photo(' + path + ',' + description + ')')


    if(link.match('Completed'))      {window.onclick = new Function( 'historyClicked(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}
    else if(link.match('Waiting'))   {window.onclick = new Function( 'pingProvider(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}
    //else if(link.match('Scheduled')) {window.onclick = function() {cancelService();} ;}


    

    var itemImage = document.createElement("div");
    itemImage.className = "circular-small";
    itemImage.style.background = 'url(' + image + ') no-repeat center center';
    //itemImage.style.background = 'url(' + image + ') no-repeat';
    window.appendChild(itemImage);
    
    var itemName = document.createElement("div");
    itemName.innerHTML = '<span style="font-size:14px; font-weight:bold;">' + label + '</span>';
    itemName.style.marginTop = -18 + "px";
    window.appendChild(itemName);

    var itemPosition = document.createElement("div");
    itemPosition.innerHTML = position;
    window.appendChild(itemPosition);

    var itemCompany = document.createElement("div");
    itemCompany.innerHTML = company + '<br>Tenure: ' + companyTenure + 'yrs, Experience: ' + industryTenure + 'yrs';
    window.appendChild(itemCompany);

    var itemEducation = document.createElement("div");
    itemEducation.innerHTML = education;
    window.appendChild(itemEducation);

    var itemLink = document.createElement("div");
    itemLink.innerHTML = link;
    window.appendChild(itemLink);

    var itemRating = document.createElement("div");
    itemRating.innerHTML = ratingStr;
    window.appendChild(itemRating);

    var itemServices = document.createElement("div");
    itemServices.innerHTML = help;
    window.appendChild(itemServices);





    var info = document.createElement("div");



    wrapper.appendChild(window);
    wrapper.appendChild(info);


    document.getElementById(elID).appendChild(window);

  }

  if(!help) {help = '<h2>You Have no History</h2>';}
  //document.getElementById(elID).innerHTML = help;
  //ellipsizeCartItems(elID);
  historyFilters.companyH = companies ? companies.sort() : {};

}








function populateProviderHistoryItems()
{
  var companies = new Array();
  var elID = "historyItems";
  var help = '';
  var index = 0;
  var historyItems = {};
  historyItems = productStore.getById(user[0].inID).data.providerHistory ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providerHistory) : {};


  //document.getElementById("historyItems").innerHTML = '';
  document.getElementById("resultsHistory").innerHTML = 'History Items: ' + historyItemKeyArray.length;




  for(index = 0; index < historyItemKeyArray.length; index++)
  {
    var key = historyItemKeyArray[index].key;

    //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
    var historyID = elID + index;
    var closeHistoryID = 'close' + elID + index;
    var blisterHistoryID = 'blister' + elID + index;

    var split = key.split(/\:/);
    var ID = split[0];
    var day = split[1];
    var image = productStore.getById(ID).data.image || "./images/ghost.png";

    var date = {};
    date = getDateIndexes(day);

    var d = parseInt(date.dayIndex, 10);
    var m = parseInt(date.monthIndex, 10);
    var y = parseInt(date.year, 10);

    var link = '';
   
    if(!historyItems[key]) {continue;}

    split = historyItems[key].split('<br>');
    split.shift();
    var appt = split.join('<br>');

    //console.log(ID);
    var feedback = productStore.getById(user[0].inID).data.feedback ? Ext.JSON.decode(productStore.getById(user[0].inID).data.feedback) : {};
    var fbKey = ID + ':' + day;


    //console.log("FBKey: " + fbKey);
    //if(feedback[fbKey]) {console.log(feedback[fbKey]['knowledge']);}
    //console.log("ID: " + split[1]);
    //console.log("SETTING: " + imgID);
    //console.log("STR: " + Ext.JSON.encode(feedback[fbKey]));
    if(feedback[fbKey])
    {
      link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:green;"> Completed</span></span><hr></div>';
    }
    else
    {
      //console.log(day);

      var date = {};
      date = getDateIndexes(day);

      var d = parseInt(date.dayIndex, 10);
      var m = parseInt(date.monthIndex, 10);
      var y = parseInt(date.year, 10);
      //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
      var x=new Date();
      x.setFullYear(y,m-1,d);
      var t = new Date();

      if (x>t)
      {
        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:yellow;"> Scheduled</span></span><hr></div>';
      }
      else
      {
        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:red;"> Waiting Feedback</span></span><hr></div>';
      }
    }





      // --Rating--
      var ratingStr = '';
      var ratingObj = productStore.getById(ID).data.reviews ? Ext.JSON.decode(productStore.getById(ID).data.reviews) : {};

      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      //console.log(ratingObj.comments);
      if(!rating) {rating = 0;}





      var ratingStr = '<div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(Ext.JSON.encode(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
      ratingStr += '<div style="right: -6px;">';
      for(var i = rating; i < 5; i++)
      {
        ratingStr += '<img src="images/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        ratingStr += '<img src="images/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '</div></div><div style="color: #555; text-align: right; position: absolute; top: 15px; right: 0px;">' + rates + ' Reviews</div></div>';






      // --Name--
      var first = productStore.getById(ID).data.first;
      var last = productStore.getById(ID).data.last;
      var url = productStore.getById(ID).data.url;
      var label = first + ' ' + last;
      //console.log(label);

      var lsObj = localizeSch(appt,ID,d,m,y);
      localDay = lsObj.dateStr;

      // --Services--
      services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};
      //console.log(services);
      var help = '<div style="position: absolute; top: 244px; text-align: left; color: #444; font-weight: lighter; width: 200px;"><div style="font-weight: bold; text-align: left; width: 200px;">' + localDay + '</div>' + lsObj.sch;
      help += '</div>';
      //console.log(help);

      // --Company--
      var company =  productStore.getById(ID).data.company || "";
      var found = 0;
      for(var i = 0; i < companies.length; i++) {if(companies[i] === company) found++;}
      if(!found) {companies.push(company);}
      var companyTenure =  productStore.getById(ID).data.companyTenure || 0;

      // --Industry--
      var indsutry =  productStore.getById(ID).data.industry || "";
      var industryTenure =  productStore.getById(ID).data.industryTenure || 0;

      // --Position--
      var position =  productStore.getById(ID).data.position || "";

      var education = productStore.getById(ID).data.education || "";
      //  Only display most recent education
      var split = education.split('<br>');
      education = split[0];

      // --Image--
      var image = productStore.getById(ID).data.imageSmall || "./images/ghostSmall.png";
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

      if(settings[ID]['identity']) {label = ""; image = "./images/ghostSmall.png";}



    var wrapper = document.createElement("div");




    var window = document.createElement("div");
    //window.className = "providerHistoryItem";
    window.className = "historyItem";
    window.id = "historyItem" + index;
 

    //if(link.match('Completed'))      {window.onclick = function() {viewFeedback();}  ;}


    //onclick = new Function('show_photo(' + path + ',' + description + ')')

    fbKey = ID + ':' + day;
    ID = user[0].inID;

    //if(link.match('Completed'))      {window.onclick = new Function( 'historyClicked(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\',' + true + ')');}
    if(link.match('Completed'))   {window.onclick = new Function( 'doFeedback(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}
    else if(link.match('Waiting'))   {window.onclick = new Function( 'doFeedback(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}
    //else if(link.match('Scheduled')) {window.onclick = function() {cancelService();} ;}


    

    var itemImage = document.createElement("div");
    itemImage.className = "circular-small";
    itemImage.style.background = 'url(' + image + ') no-repeat center center';
    //itemImage.style.background = 'url(' + image + ') no-repeat';
    window.appendChild(itemImage);
    
    var itemName = document.createElement("div");
    itemName.innerHTML = '<span style="font-size:14px; font-weight:bold;">' + label + '</span>';
    itemName.style.marginTop = -18 + "px";
    window.appendChild(itemName);

    var itemPosition = document.createElement("div");
    //itemPosition.style.textAlign = "left";
    itemPosition.innerHTML = position;
    window.appendChild(itemPosition);

    var itemCompany = document.createElement("div");
    //itemCompany.style.textAlign = "left";
    itemCompany.innerHTML = company + '<br>Tenure: ' + companyTenure + 'yrs, Experience: ' + industryTenure + 'yrs';
    window.appendChild(itemCompany);

    var itemEducation = document.createElement("div");
    //itemEducation.style.textAlign = "left";
    itemEducation.innerHTML = education;
    window.appendChild(itemEducation);

    var itemLink = document.createElement("div");
    itemLink.innerHTML = link;
    window.appendChild(itemLink);

    var itemRating = document.createElement("div");
    itemRating.innerHTML = ratingStr;
    window.appendChild(itemRating);

    var itemServices = document.createElement("div");
    itemServices.innerHTML = help;
    window.appendChild(itemServices);





    var info = document.createElement("div");



    wrapper.appendChild(window);
    wrapper.appendChild(info);


    document.getElementById(elID).appendChild(window);

  }

  if(!help) {help = '<h2>You Have no History</h2>';}
  //document.getElementById(elID).innerHTML = help;
  //ellipsizeCartItems(elID);
  historyFilters.companyH = companies ? companies.sort() : {};

}








function historyClicked(JSONStr, JSONKey, ID, share)
{
  console.log("historyClicked");
  //console.log(JSONStr);
  //console.log(JSONKey);
  //console.log(ID);
  JSONStr = decodeURI(JSONStr);
  //console.log(JSONStr);
  var form = Ext.JSON.decode(JSONStr);
  var fbKey = JSONKey;

  //console.log("FBKey: " + fbKey);
  var split = JSONKey.split(/\:/);
  var myID = split[0];
  var day = split[1];
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;
  var company =  productStore.getById(ID).data.company;

  var myFirst = productStore.getById(myID).data.first;
  var myLast = productStore.getById(myID).data.last;
  var myName = myFirst + ' ' + myLast;

  var ratingSum = 0;
  var ratingAvg = 0;


  //Check if user has rated their service provider for this appointment or has already seen the feedback
  var found = false;
  var seen = form.seen;
  if(!share)
  {
    var ratingObj = productStore.getById(ID).data.reviews ? Ext.JSON.decode(productStore.getById(ID).data.reviews) : {};
    if(ratingObj)
    {
      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      var comments = ratingObj.comments;
      for (var key in comments)
      {
        var commenterID = key.split(/:/)[0];
        var timeStamp = key.split(/:/)[1];
        var apptDay = key.split(/:/)[3];
        if(commenterID == user[0].inID && apptDay == day) {found = true; continue;}
      }
    }
  }


  //'socialShare(this.alt,\'Check out my results\',\'' + ID + '\',\'' + JSONKey + '\');'
  //'socialShare(this.alt,\'Check out my results\');'


  var innerHTML = share ? '' : '<div class="x-window-default" style="margin-top:0px;"><div style="border: 0px solid #ff0000; height: 30px;"><img class="socialiconShare connect" src="images/google-up.png"   alt="google" title="Share on Google+" onclick="socialShare(this.alt,\'Check out my interviewring.com interview feedback!\',\'' + ID + '\',\'' + JSONKey + '\');" onmouseover="this.src=\'images/google-dn.png\';   this.style.cursor=\'pointer\';"  onmouseout="this.src=\'images/google-up.png\'"/><img class="socialiconShare connect" src="images/twitter-up.png"  alt="twitter" title="Share on Twitter" onclick="socialShare(this.alt,\'Check out my interviewring.com interview feedback!\',\'' + ID + '\',\'' + JSONKey + '\');" onmouseover="this.src=\'images/twitter-dn.png\';  this.style.cursor=\'pointer\';"  onmouseout="this.src=\'images/twitter-up.png\'"/><img class="socialiconShare connect" src="images/facebook-up.png" alt="facebook" title="Share on Facebook" onclick="socialShare(this.alt,\'Check out my interviewring.com interview feedback!\',\'' + ID + '\',\'' + JSONKey + '\');" onmouseover="this.src=\'images/facebook-dn.png\'; this.style.cursor=\'pointer\';"  onmouseout="this.src=\'images/facebook-up.png\'"/><img class="socialiconShare connect" src="images/linkedin-up.png" alt="linkedin" title="Share on LinkedIn" onclick="socialShare(this.alt,\'Check out my interviewring.com interview feedback!\',\'' + ID + '\',\'' + JSONKey + '\');" onmouseover="this.src=\'images/linkedin-dn.png\'; this.style.cursor=\'pointer\';"  onmouseout="this.src=\'images/linkedin-up.png\'"/><img class="socialiconShare connect" src="images/email-up.png"  alt="email" title="Share via email" onclick="socialShare(this.alt,\'Check out my interviewring.com interview feedback!\',\'' + ID + '\',\'' + JSONKey + '\');" onmouseover="this.src=\'images/email-dn.png\';  this.style.cursor=\'pointer\';"  onmouseout="this.src=\'images/email-up.png\'"/><span style="float: right; font-size: 16px; line-height: 16px; font-weight: 400;">Share this result via:  </span></div><div style="border: 0px solid #000000;"><input type="checkbox" name="shareRating" onclick="shareRating(\'' + JSONKey + '\', this.checked);"></input><span style="font-size: 16px; line-height: 16px; font-weight: 400;">Allow interviewring.com recruiters to see this result</span></div></div>';


  innerHTML += '<h2 style="text-align: center; margin-top: 6px;">' + myName + '</h2><h3 style="text-align: center; margin-top: -10px;">' + day + '</h3><h4 style="text-align: center; margin-top: -10px;">by ' + name + ' (' + company + ')</h4><div class="sidebar" style="width: 540px; margin-left: 12px; margin-top: 50px;"><ul>';

  for (var key in form)
  {
    if(key == 'seen') {continue;}
    //console.log("KEY: " + key + " VAL: " + form[key]['rating'] + form[key]['comment']);
    var rating = form[key]['rating'];
    if(!rating) {rating = 0;}
    ratingSum += parseInt(rating,10);

    var ratingStr = '<div><img src="images/starBoard.png" style="z-index: 20; position: relative; top: -40px; left:109px;"/>';
    for(var i = rating; i < 5; i++)
    {
      ratingStr += '<img src="images/emptyStar.png" style="z-index: 19; position: relative; top: -30px; left: 218px; margin-right: 4px; height: 15px;"/>';
    }
    if(rating)
    {
      ratingStr += '<img src="images/filledStar.png" style="z-index: 19; position: relative; top: -30px; left: 218px; margin-right: 4px; height: 15px;"/>';
      for(var i = 0; i < rating-1; i++)
      {
        ratingStr += '<img src="images/emptyStar.png" style="z-index: 19; position: relative; top: -30px; left: 218px; margin-right: 4px; height: 15px;"/>';
      }
    }
    ratingStr += '<span style="position: relative; top: -30px; left: 315px; font-size:9px; color:#606060; white-space: pre;">Very Dissatisfied</span>';
    ratingStr += '<span style="position: relative; top: -30px; left: 440px; font-size:9px; color:#606060; white-space: pre;">Very Satisfied</span></div>';

    innerHTML += '<li><h2>' + key + ':</h2> ' + ratingStr + '<span style="position: relative; top: -30px;">Comments: ' + form[key]['comment'] + '</span></li>';
  }

  ratingAvg = Math.ceil(ratingSum/Object.size(form));
  //console.log(ratingAvg);
  var comment = (ratingAvg < 3) ? "Needs Improvement" : (ratingAvg == 3) ? "Meets Expectations" : "Exceeds All Expectations";
  var ratingStr = '<div><img src="images/starBoard.png" style="z-index: 20; position: relative; top: -40px; left:109px;"/>';
  for(var i = rating; i < 5; i++)
  {
    ratingStr += '<img src="images/emptyStar.png" style="z-index: 19; position: relative; top: -30px; left: 218px; margin-right: 4px; height: 15px;"/>';
  }
  if(rating)
  {
    ratingStr += '<img src="images/filledStar.png" style="z-index: 19; position: relative; top: -30px; left: 218px; margin-right: 4px; height: 15px;"/>';
    for(var i = 0; i < rating-1; i++)
    {
      ratingStr += '<img src="images/emptyStar.png" style="z-index: 19; position: relative; top: -30px; left: 218px; margin-right: 4px; height: 15px;"/>';
    }
  }
  ratingStr += '<span style="position: relative; top: -30px; left: 315px; font-size:9px; color:#606060; white-space: pre;">Very Dissatisfied</span>';
  ratingStr += '<span style="position: relative; top: -30px; left: 440px; font-size:9px; color:#606060; white-space: pre;">Very Satisfied</span></div>';


  innerHTML += '<li><h2>' + 'average rating' + ':</h2> ' + ratingStr + '<span style="position: relative; top: -30px;">Comments: ' + comment + '</span></li>';


  innerHTML += '</ul></div>';

  var container = document.createElement("div");
  container.id = "viewFeedback";

            
  var window = document.createElement("div");
  window.className = "feedbackWindow x-window-default-lt";
  window.id = "popupFormPage";


 

  if(!share)
  {
    if(!found && !seen)
    {
      form.seen = true;
      console.log("NOT FOUND NOR SEEN");
      var choiceHTML = '<h2 style="margin-top: 100px;">You had an appointment with ' + name + ' on ' + day + '.</h2>';
      choiceHTML += '<h2>Let ' + first + ' know how well you thought they did.</h2>';
      choiceHTML += '<div class="a-button a-button-large" style="height: 36px;" onclick="doRateMe(\'popupFormPage\',\'' + ID + '\',\'' + JSONKey + '\'); markFeedbackSeen(\'' + ID + '\',\'' + JSONKey + '\'); doHistory();"><span class="a-button-inner" style="padding-top: 11px;"><span class="a-button-text">Rate ' + first + '</span></span></div><br><br><br><br><br>';

      choiceHTML += '<h2>' + first + ' has provided you with feedback.</h2>';
      choiceHTML += '<h2>Once you view this feedback you will not be able to rate ' + name + '.</h2>';
      choiceHTML += '<div class="a-button a-button-large" style="height: 36px;" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); markFeedbackSeen(\'' + ID + '\',\'' + JSONKey + '\'); doHistory(); historyClicked(\'' + encodeURI(Ext.JSON.encode(form)) + '\',\'' + JSONKey + '\',\'' + ID + '\');"><span class="a-button-inner" style="padding-top: 11px;"><span class="a-button-text">View Feedback</span></span></div>';

      window.innerHTML = choiceHTML;
    }
    else
      window.innerHTML = (myID == user[0].inID || ID == user[0].inID) ? innerHTML : '<img src="./images/403.png" style="height: 380px; display: inline-block; margin-right: 275px;"/>';
  }
  else
    window.innerHTML = innerHTML;

  container.appendChild(window);

  
  //<div class="x-window-default" style="position: absolute; top: -10px; margin-left: 0px; width: 940px; height: 50px;">
  var header = document.createElement("div");
  header.className = "x-window-default";
  header.style.position = "absolute";
  header.style.top = -30 + "px";
  header.style.marginLeft = 18 + "px";
  header.style.width = 940 + "px";
  header.style.height = 50 + "px";
  header.style.zIndex = 70;

  var dismiss = document.createElement("div");
  dismiss.style.position = "absolute";
  dismiss.style.top = 10 + 'px';
  dismiss.style.right = 10 + 'px';
  dismiss.innerHTML = '<div class="closeLarge-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'closeLarge-dn\';" onmouseout="this.className=\'closeLarge-up\';" onclick="this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);"></div>';
  header.appendChild(dismiss);

  //console.log();
  if(!share)
  {
    //Allow author to re-submit feedback  //Author does not go through this flow now, uses doFeedback()
    if(ID === myID && ID === user[0].inID && 0)
    {
      var buttonHTML = '<div class="a-button a-button-large" style="height: 36px;" onclick="doFeedback(\'' + encodeURI(Ext.JSON.encode(form)) + '\',\'' + fbKey + '\',\'' + ID + '\');"><span class="a-button-inner" style="padding-top: 11px;"><span class="a-button-text">Edit Feedback</span></span></div>';

      var reSubmit = document.createElement("div");
      reSubmit.style.position = "absolute";
      reSubmit.style.top = 10 + 'px';
      reSubmit.style.marginLeft = 320 + 'px';
      reSubmit.innerHTML = buttonHTML;

      header.appendChild(reSubmit);
    }
  }


  container.appendChild(header);

  document.getElementById("featuredHistoryItems").appendChild(container);
  document.getElementById("featuredHistoryItems").style.zIndex = 50;



  var formPage = share ? document.getElementById("share") : document.getElementById("formPage");
  formPage.innerHTML = innerHTML;


  if(!share)
  {
    if(!settings[user[0].inID]['share']) {settings[user[0].inID]['share'] = {};}
    if(!settings[user[0].inID]['share'][JSONKey]) {settings[user[0].inID]['share'][JSONKey] = false;}
    setGroup("shareRating", settings[user[0].inID]['share'][JSONKey]);

  }
  else {formPage.style.marginLeft = -120 + 'px';}

}




function doFeedback(JSONStr, JSONKey, ID)
{

  JSONStr = JSONStr || '{}';
  JSONKey = JSONKey || returnParameters.KEY;
  ID = ID || returnParameters.ID;

  //console.log("JSONKey: " + JSONKey);
  //console.log("ID: " + ID);
  returnParameters.KEY = JSONKey;
  //showFeedbackForm();




  var container = document.createElement("div");
  container.id = "viewFeedback";

            
  var window = document.createElement("div");
  window.className = "feedbackWindow x-window-default-lt";
  window.id = "feedbackFormPage";

  container.appendChild(window);

  
  //<div class="x-window-default" style="position: absolute; top: -10px; margin-left: 0px; width: 940px; height: 50px;">
  var header = document.createElement("div");
  header.className = "x-window-default";
  header.style.position = "absolute";
  header.style.top = -30 + "px";
  header.style.marginLeft = 18 + "px";
  header.style.width = 940 + "px";
  header.style.height = 50 + "px";
  header.style.zIndex = 70;

  var dismiss = document.createElement("div");
  dismiss.style.position = "absolute";
  dismiss.style.top = 10 + 'px';
  dismiss.style.right = 10 + 'px';
  dismiss.innerHTML = '<div class="closeLarge-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'closeLarge-dn\';" onmouseout="this.className=\'closeLarge-up\';" onclick="this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);"></div>';
  header.appendChild(dismiss);

  container.appendChild(header);

  document.getElementById("featuredHistoryItems").appendChild(container);
  document.getElementById("featuredHistoryItems").style.zIndex = 50;


  //<div id="feedbackFormImg" class="circular" style="margin-top: 60px;"></div>
  //<div id="feedbackForm" class="formPage gradient-ltblue">
  var feedbackFormImg = document.createElement("div");
  feedbackFormImg.id = "feedbackFormImg";
  feedbackFormImg.className = "circular";
  feedbackFormImg.style.position = "fixed";
  feedbackFormImg.style.top = 300 + "px";

  var feedbackForm = document.createElement("div");
  feedbackForm.id = "feedbackFormForm";
  feedbackForm.className = "formPage gradient-ltblue";
  feedbackForm.style.marginTop = 100 + "px";

  window.appendChild(feedbackFormImg);
  window.appendChild(feedbackForm);


  populateFeedbackForm();
}


function pingProvider(JSONStr, JSONKey, ID)
{
  //console.log("historyClicked");

  JSONStr = JSONStr || '{}';
  JSONKey = JSONKey || returnParameters.KEY;
  ID = ID || returnParameters.ID;

  //console.log(JSONStr);
  //console.log(JSONKey);
  //console.log(ID);


  JSONStr = decodeURI(JSONStr);
  //console.log(JSONStr);
  var form = Ext.JSON.decode(JSONStr);


  var split = JSONKey.split(/\:/);
  var day = split[1];
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;
  var company =  productStore.getById(ID).data.company;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;





  var innerHTML = '<h2 style="margin-top: 100px;">You had an appointment with ' + name + ' on ' + day + '.</h2>';

  innerHTML += '<h2>Let ' + first + ' know how well you thought they did.</h2>';
  innerHTML += '<div class="a-button a-button-large" style="height: 36px;" onclick="doRateMe(\'waitingFormPage\',\'' + ID + '\',\'' + JSONKey + '\');"><span class="a-button-inner" style="padding-top: 11px;"><span class="a-button-text">Rate ' + first + '</span></span></div><br><br><br><br><br>';

  innerHTML += '<h2>' + first + ' has yet to provide you feedback.</h2>';
  innerHTML += '<h2>Send ' + first + ' a note to remind them.</h2>';
  innerHTML += '<div class="a-button a-button-large" style="height: 36px;" onclick="doPingMe(\'waitingFormPage\',\'' + ID + '\',\'' + day + '\');"><span class="a-button-inner" style="padding-top: 11px;"><span class="a-button-text">Ping ' + first + '</span></span></div>';


  var container = document.createElement("div");
  container.id = "viewFeedback";

            
  var window = document.createElement("div");
  window.className = "feedbackWindow x-window-default-lt";
  window.id = "waitingFormPage";
  window.innerHTML = innerHTML;
  
  container.appendChild(window);

  
  //<div class="x-window-default" style="position: absolute; top: -10px; margin-left: 0px; width: 940px; height: 50px;">
  var header = document.createElement("div");
  header.className = "x-window-default";
  header.style.position = "absolute";
  header.style.top = -30 + "px";
  header.style.marginLeft = 18 + "px";
  header.style.width = 940 + "px";
  header.style.height = 50 + "px";
  header.style.zIndex = 70;

  var dismiss = document.createElement("div");
  dismiss.style.position = "absolute";
  dismiss.style.top = 10 + 'px';
  dismiss.style.right = 10 + 'px';
  dismiss.innerHTML = '<div class="closeLarge-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'closeLarge-dn\';" onmouseout="this.className=\'closeLarge-up\';" onclick="this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);"></div>';
  header.appendChild(dismiss);
  container.appendChild(header);




  document.getElementById("featuredHistoryItems").appendChild(container);
  document.getElementById("featuredHistoryItems").style.zIndex = 50;

}


function doRateMe(elID, ID, JSONKey)
{
  returnParameters.KEY = JSONKey;
  returnParameters.ID = ID;
  console.log("HERE");

  var window = document.getElementById(elID);
  console.log(window.innerHTML);
  window.innerHTML = '';
  
  //<div id="rateFormImg" class="circular" style="margin-top: 60px;"></div>
  //<div id="rateForm" class="formPage gradient-ltblue">
  var rateFormImg = document.createElement("div");
  rateFormImg.id = "rateFormImg";
  rateFormImg.className = "circular";
  rateFormImg.style.position = "fixed";
  rateFormImg.style.top = 300 + "px";

  var rateForm = document.createElement("div");
  rateForm.id = "rateForm";
  rateForm.className = "formPage gradient-ltblue";
  rateForm.style.marginTop = 100 + "px";

  window.appendChild(rateFormImg);
  window.appendChild(rateForm);

  populateRateForm();
}



function doPingMe(elID, ID, day)
{
  var window = document.getElementById(elID);
  window.innerHTML = '<form id="pingProviderForm" name="pingProviderForm"><textarea name="comment" placeholder="Leave a message here" style="height: 80px; width: 566px; resize: none;"></textarea><br><br><div class="a-button a-button-large" style="height: 61px; margin-left: 150px;" onclick="pingSubmit(\'' + elID + '\',\'' + ID +'\',\'' + day + '\');"><span class="a-button-inner" style="padding-top: 22px;"><span class="a-button-text">Ping</span></span></div></form>';
  
}







function socialShare(type, description, ID, JSONKey)
{
  shareRating(JSONKey, true);

  var content =  '';
  description = encodeURI(description);

  var shareURL = 'http://www.interviewring.com/' + encodeURI('?share&ID=' + ID + '&KEY=') + encodeURI(JSONKey);
  //console.log(shareURL);
  var fbShareURL = encodeURIComponent('http://www.interviewring.com/' + '?share&ID=' + ID + '&KEY=') + escape(JSONKey);
  //fbShareURL = encodeURIComponent(fbShareURL);

  shareURL = encodeURIComponent(shareURL);
  var liShareURL = shareURL;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;


  //var myParams = 'share=' + 'STR=' + encodeURI(JSONStr) + '&KEY=' + encodeURI(JSONKey) + '&ID=' + encodeURI(ID) + '&desc=' + encodeURI(description) + '&pinit=0';
  var myParams = '';
  //console.log(myParams);


  var fbLink = 'http://www.facebook.com/share.php?u=' + fbShareURL + '&t=www.interviewring.com';


  //fbLink = 'index.php?' + myParams;


  //var fbLink = 'http://www.interviewring.com/socialShare.php?' + myParams;
  var fb = '<a href="' + fbLink + '" onclick="window.open(this.href); return false;"><img src="./images/facebook.png" height="16px" title="Share on Facebook"/></a>';

  var myLink = 'http://www.interviewring.com/images/share.png';
  var myText = description;
  //var twLink = 'http://twitter.com/home?status=' + myText;
  var twLink = 'http://www.twitter.com/share?url=' + liShareURL + '&text=' + description;
  var tw = '<a href="' + twLink + '" onclick="window.open(this.href); return false;"><img src="./images/twitter.png" height="16px" title="Tweet this"/></a>';

  var gpLink = 'https://plusone.google.com/_/+1/confirm?hl=en&url=' + liShareURL;
  var gp = '<a href="' + gpLink + '" onclick="window.open(this.href); return false;"><img src="./images/gplus.png" height="16px" title="Plus 1"/></a>';

  var blLink = 'http://www.blogger.com/blog_this.pyra?t=&u=' + encodeURI('http://www.interviewring.com') + '&b=' + encodeURI('<a href=') + encodeURI('http://www.interviewring.com') + encodeURI('><img src="') + encodeURI('http://www.interviewring.com/images/' + content) + encodeURI('"/><br>www.interviewring.com</a>') + '&n=I love ' + encodeURI(description) + ' found at www.interviewring.com';
  //alert(blLink);
  var bl = '<a href="' + blLink + '" onclick="window.open(this.href); return false;"><img src="./images/blogger.png" height="16px" title="Blog on Blogger"/></a>';


  var dlLink = 'http://del.icio.us/post?url=' + encodeURI('http://www.interviewring.com') + ';title=' + encodeURI(description);
  var dl = '<a href="' + dlLink + '" onclick="window.open(this.href); return false;"><img src="./images/blogger.png" height="16px" title="Bookmark with Del.icio.us"/></a>';
  
  var suLink = 'http://www.stumbleupon.com/submit?url=' + encodeURI('http://www.interviewring.com') + '&title=' + encodeURI(description);
  var su = '<a href="' + suLink + '" onclick="window.open(this.href); return false;"><img src="./images/blogger.png" height="16px" title="Bookmark with Del.icio.us"/></a>';
  


  var pinLink = 'http://www.interviewring.com/socialShare.php?' + myParams + '&pinit=1';
  var pin = '<a href="' + pinLink + '" onclick="window.open(this.href); return false;"><img src="./images/pinit.png" height="16px" title="Pin it"/></a>';


  var liLink = 'http://www.linkedin.com/shareArticle?mini=true&url=' + shareURL + '&title=' + description + '&summary=' + 'Click to see ' + myName + '%27s results' + '&source=' + shareURL;



  var link = (type=='facebook') ? fbLink : (type=='linkedin') ? liLink : (type=='google') ? gpLink : (type=='twitter') ? twLink : (type=='delicious') ? dlLink : (type=='blogger') ? blLink : (type=='pinterest') ? pinLink : "";

  if(type != 'email') {window.open(link);}
  else
  {

      var msg = '<div>Please enter the email addresses of the people you wish to share<br>your feedback with (seperated by spaces and/or commas)<br /><br /><label for="emailAddressesText">Email Addresses:</label><input id="emailAddressesText" name="emailAddressesText" type="textbox" style="width: 466px;"/>';
      msg += '<br><label for="emailShareComment">Comment:</label><textarea name="emailShareComment" id="emailShareComment" placeholder="Leave a message here" style="height: 80px; width: 466px; resize: none;"></textarea>';
      msg += '</div>';

      var addresses = '';

      var mbox = Ext.Msg.show({
        title:    'Share via email',
        msg:      msg,
        buttons:  Ext.MessageBox.OKCANCEL,
        icon: Ext.Msg.QUESTION,
	callback: function(btn, text, cfg )
        {
          if( btn == 'ok')
          {

            addresses = Ext.get('emailAddressesText').getValue();
            var comment = Ext.get('emailShareComment').getValue();
            var allowEmailAddresses = document.getElementById('acceptEmailAddresses') ? document.getElementById('acceptEmailAddresses').checked : false;

            var exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            var regexp = new RegExp(exp);

            //console.log(addresses);

            var allAddresses = addresses.split(/[\s,;]+/);
            var validEmail = true;
            for(var address in allAddresses)
	    {
	      //console.log("->"+allAddresses[address]+"<-");
              validEmail &= allAddresses[address].match(regexp) ? true : false;
              //console.log(validEmail);
	    }

            //console.log("ALLOW: " + allowEmailAddresses);
            if(!addresses)
	    {
              var newMsg = cfg.msg.match(/error/) ? cfg.msg : '<span style="color:red;" class="error">' + 'You must specify at least one email address' + '</span>' + '<br><br>' + cfg.msg;
              Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
	    }
            else if(!validEmail && !allowEmailAddresses)
	    {
              //console.log(cfg.msg);
              //console.log(addresses);
              cfg.msg = cfg.msg.replace('name="emailAddressesText"', 'name="emailAddressesText" value="' + addresses + '"');
              //console.log(addresses);
              var newMsg = cfg.msg.match(/error/) ? cfg.msg : '<span style="color:red;" class="error">' + 'One or more of your email addresses does not seem to be a valid email address' + '</span>' + '<br><br><input type="checkbox" name="acceptEmailAddresses" id="acceptEmailAddresses"/><label for="acceptEmailAddresses">These email addresses are valid</label><br><br>' + cfg.msg;
              Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
	    }
            else
	    {

              var showFeedbackURL = 'http://www.interviewring.com/?share&ID=' + ID + '&KEY=' + JSONKey;

              var userHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>I\'d like to share my interview feedback on interviewring.com with you.</h1><h2>Click <a href="' + showFeedbackURL +'">this</a> link to see my feedback.</h2></div><br><br><br><div><h3>This email was sent via interviewring.com on behalf of ' + myName + '<br>-The InterviewRing.com team<br><br><br>Message:<br>' + comment + '</div></h3></body></html>';

	    var cc_list = new Array();
	    cc_list[0] = user[0].email;
            for(var address in allAddresses)
	    {
              $.ajax({url:"./email.php", 
	      data: {id: user[0].inID, name: '', email: allAddresses[address], cc_list: cc_list, from: myName, subject: "Check out my interview feedback on InterviewRing.com", MsgHTML: userHTML, attachResume: '0'},
              type:'post',
              async:false
              });
	    }
	    }



	  }
        }
      });//Msg.show
  }
}




function inviteOthers()
{
 
  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

      var msg = '<div>Please enter the email addresses of the people you wish to invite<br>to become members. (seperated by spaces and/or commas)<br /><br /><label for="emailAddressesText">Email Addresses:</label><input id="emailAddressesText" name="emailAddressesText" type="textbox" style="width: 466px;"/>';
      msg += '<br><label for="emailShareComment">Comment:</label><textarea name="emailShareComment" id="emailShareComment" placeholder="Leave a message here" style="height: 80px; width: 466px; resize: none;"></textarea>';
      msg += '</div>';

      var addresses = '';

      var mbox = Ext.Msg.show({
        title:    'Invite others to become interviewring.com members',
        msg:      msg,
        buttons:  Ext.MessageBox.OKCANCEL,
        icon: Ext.Msg.QUESTION,
	callback: function(btn, text, cfg )
        {
          if( btn == 'ok')
          {

            addresses = Ext.get('emailAddressesText').getValue();
            var comment = Ext.get('emailShareComment').getValue();
            var allowEmailAddresses = document.getElementById('acceptEmailAddresses') ? document.getElementById('acceptEmailAddresses').checked : false;

            var exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            var regexp = new RegExp(exp);

            //console.log(addresses);

            var allAddresses = addresses.split(/[\s,;]+/);
            var validEmail = true;
            for(var address in allAddresses)
	    {
	      //console.log("->"+allAddresses[address]+"<-");
              validEmail &= allAddresses[address].match(regexp) ? true : false;
              //console.log(validEmail);
	    }

            //console.log("ALLOW: " + allowEmailAddresses);
            if(!addresses)
	    {
              var newMsg = cfg.msg.match(/error/) ? cfg.msg : '<span style="color:red;" class="error">' + 'You must specify at least one email address' + '</span>' + '<br><br>' + cfg.msg;
              Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
	    }
            else if(!validEmail && !allowEmailAddresses)
	    {
              //console.log(cfg.msg);
              //console.log(addresses);
              cfg.msg = cfg.msg.replace('name="emailAddressesText"', 'name="emailAddressesText" value="' + addresses + '"');
              //console.log(addresses);
              var newMsg = cfg.msg.match(/error/) ? cfg.msg : '<span style="color:red;" class="error">' + 'One or more of your email addresses does not seem to be a valid email address' + '</span>' + '<br><br><input type="checkbox" name="acceptEmailAddresses" id="acceptEmailAddresses"/><label for="acceptEmailAddresses">These email addresses are valid</label><br><br>' + cfg.msg;
              Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
	    }
            else
	    {

              var URL = 'http://www.interviewring.com';

              var userHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>I\'d like to invite you to become a member of interviewring.com.</h1><h2>Click <a href="' + URL +'">this</a> link to get started.</h2></div><br><br><br><div><h3>This email was sent via interviewring.com on behalf of ' + myName + '<br>-The InterviewRing.com team<br><br><br>Message:<br>' + comment + '</div></h3></body></html>';

	    var cc_list = new Array();
	    cc_list[0] = user[0].email;
            for(var address in allAddresses)
	    {
              $.ajax({url:"./email.php", 
	      data: {id: user[0].inID, name: '', email: allAddresses[address], cc_list: cc_list, from: myName, subject: "Invitation to become an InterviewRing.com member", MsgHTML: userHTML, attachResume: '0'},
              type:'post',
              async:false
              });
	    }
	    }



	  }
        }
      });//Msg.show

}





function populateShareElement()
{
  var JSONKey = returnParameters.KEY ;
  var ID = returnParameters.ID;

  var feedback = {};
  var JSONStr = '';

  if(productStore.getById(ID))
  {
    //console.log("HERE");
    feedback = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
    //console.log(feedback);
    JSONStr = Ext.JSON.encode(feedback[JSONKey]);
    //console.log(JSONKey);
  }


  console.log(JSONStr);
  console.log(JSONKey);
  console.log(ID);

  var split = JSONKey.split(/\:/);
  var myID = split[0];
  var day = split[1];

  //if(feedback[JSONKey] && settings[myID]['share'][JSONKey])
  if(feedback[JSONKey])
  {
    historyClicked(JSONStr,JSONKey,ID,true);
  }
  else if(feedback[JSONKey])
  {
    var shareEl = document.getElementById("share");
    shareEl.innerHTML = '<img src="./images/403.png" style="height: 380px; display: inline-block; margin-right: 125px;"/>';
    shareEl.style.marginLeft = -120 + 'px';
  }
  else
  {
    var shareEl = document.getElementById("share");
    shareEl.innerHTML = '<img src="./images/404.png" style="height: 380px; display: inline-block; margin-right: 125px;"/>';
    shareEl.style.marginLeft = -120 + 'px';
  }

}





function populateRateForm()
{
  var JSONKey = returnParameters.KEY;
  var ID = returnParameters.ID;

  var showPrevious = false;
  var name = '';
  var ratingObj;


  //Check if user has already seen the feedback
  var seen = false;
  if(productStore.getById(ID))
  {
    feedbackObj = productStore.getById(ID).data.feedback ? Ext.JSON.decode(productStore.getById(ID).data.feedback) : {};
    seen = feedbackObj[JSONKey]['seen'];
  }


  var rateFormImg = document.getElementById("rateFormImg");
  var rateForm = document.getElementById("rateForm");
  rateForm.style.marginLeft = 17 + 'px';

  if(productStore.getById(ID))
  {
    rateFormImg.style.background = 'url(' + productStore.getById(ID).data.image + ') no-repeat center center';
    ratingObj = productStore.getById(ID).data.reviews ? Ext.JSON.decode(productStore.getById(ID).data.reviews) : {};
    // --Name--
    var first = productStore.getById(ID).data.first;
    var last = productStore.getById(ID).data.last;
    name = first + ' ' + last;
  }

  if(ratingObj && !seen)
  {
    var rating = Math.ceil(ratingObj.average);
    var rates = ratingObj.total || 0;
    var comments = ratingObj.comments;
    //console.log(ratingObj.average);
    if(!rating || !showPrevious) {rating = 0;}


    var ratingStr = '<div><img src="images/starBoard.png" style="z-index: 20; position: absolute; top: 50px; left:270px;"/>';
    for(var i = rating; i < 5; i++)
    {
      var starID = 'rate' + 'Star' + i;
      ratingStr += '<img src="images/0.gif" onclick="javascript:addStar(\'' + i + '\',\'' + starID + '\');" onmouseover="this.style.cursor = \'pointer\';" style="z-index: 999; position: relative; top: -0px; left: -280px; margin-right: -4px; height: 14px;"/>';
      ratingStr += '<img id="' + starID + '" src="images/emptyStar.png" style="z-index: 19; position: relative; top: -0px; left: -270px; margin-right: -6px; height: 15px;"/>';
    }
    for(var i = 0; i < rating; i++)
    {
      var starID = 'rate' + 'Star' + i;
      ratingStr += '<img src="images/0.gif" onclick="javascript:addStar(\'' + i + '\',\'' + starID + '\');" onmouseover="this.style.cursor = \'pointer\';" style="z-index: 999; position: relative; top: -0px; left: -280px; margin-right: -4px; height: 14px;"/>';
      ratingStr += '<img id="' + starID + '" src="images/filledStar.png" style="z-index: 19; position: relative; top: -0px; left: -270px; margin-right: -6px; height: 15px;"/>';
    }
    //ratingStr += '<span style="width: 640px; position: absolute; top: 85px; text-align: center; font-size:9px; color:#606060; white-space: pre;">' + rates + ' ratings</span></div>';






    var myCommentTimeStamp = new Date().getTime();

    var innerHTML = '';

    for (var key in comments)
    {
      //console.log('KEY: ' + key);
      //console.log('ITEM: ' + comments[key]);
      if(!key || !comments[key]) {continue;}
      var inID = key.split(/:/)[0];
      var timeStamp = key.split(/:/)[1];
      var rating = comments[key].split(/:/)[0];
      var comment = comments[key].split(/:/)[1];
      //console.log(inID);
      //console.log(timeStamp);
      //console.log(rating);
      //console.log(comment);
      var commentFirst = productStore.getById(inID).data.first;
      var commentLast = productStore.getById(inID).data.last;
      var commentName = commentFirst + ' ' + commentLast;
      //console.log(commentName);

      var commentDate = new Date(+timeStamp);
      var year =  commentDate.getFullYear();
      var month =  monthNames[commentDate.getMonth()+1];
      var weekDay = dayNames[commentDate.getDay()];
      var day =  commentDate.getDate();
      var hours =  commentDate.getHours();
      var minutes =  commentDate.getMinutes();
      var seconds =  commentDate.getSeconds();

      var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year; 

      var commentRatingStr = '<div style="z-index: 100; height: 20px; position: relative; top: -2px; float: right; right:0px; padding: 2px;border: 0px solid #ff0000;">';
      for(var i = rating; i < 5; i++)
      {
        commentRatingStr += '<img src="images/starEmpty.png" style="z-index: 99; position: relative; top: 0px; left: 0px; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        commentRatingStr += '<img src="images/star.png" style="z-index: 99; position: relative; top: 0px; left: 0px; margin-right: 4px; height: 15px;"/>';
      }
      commentRatingStr += '</div>';



      innerHTML += '<br><div class="ratingComment gradient-ltblue"><div class="x-window-default"><span style="color: #ffffff; font-size: 14px; font-weight: bold;">' + dateStr + '</span><br><span style="color: #444444;">' + commentName + '</span></div>' + commentRatingStr + '<span style="display: block; margin-top: 20px;">' + comment + '</span></div>';

    }
    rateForm.innerHTML = '<div style="display: block; margin: 10px auto;" ><h2 style="text-align: center;">Rate: ' + name + '</h2>' + ratingStr + '<form id="myRating" name="myRating" style="position: absolute; top: 84px; left: 50px;"><textarea name="comment" placeholder="After rating this provider you can enter your comments here" style="height: 80px; width: 566px; resize: none;"></textarea><div class="a-button a-button-large" style="height: 61px; position: absolute; top: 90px; float: left; left: 140px; z-index: 51;" onclick="rateSubmit(this.parentNode.name,\'' + ID + '\',\'' + JSONKey + '\');"><span class="a-button-inner" style="padding-top: 22px;"><span class="a-button-text">Submit</span></span></div></form>' + '<div class="gradient-darkGrey" style="position: absolute; bottom: 10px; left: 50px; height: 250px; width: 570px; overflow: auto; border: 1px solid; border-color: #777777 #444444 #222222; border-radius: 3px;">' + innerHTML + '</div></div>';
  }
  else if(seen)
  {
    rateForm.innerHTML = '<img src="./images/403.png" style="height: 380px; display: inline-block; margin-right: 125px;"/><h1 style="text-align: center; display: inline-block;">You have already seen your feedback for this appointment</h1>';
    rateFormImg.style.display = 'none';
    rateForm.style.marginLeft = -120 + 'px';
  }
  else
  {
    rateForm.innerHTML = '<img src="./images/404.png" style="height: 380px; display: inline-block; margin-right: 125px;"/>';
    rateFormImg.style.display = 'none';
    rateForm.style.marginLeft = -120 + 'px';

  }

}







function populateFeedbackForm()
{
  //console.log("populateFeedbackForm");
  var JSONKey = returnParameters.KEY;

  var split = JSONKey.split(/\:/);
  var ID = split[0];
  var day = split[1];
  var feedbackFormImg = document.getElementById("feedbackFormImg");
  var feedbackForm = document.getElementById("feedbackFormForm");
  feedbackForm.style.marginLeft = 17 + 'px';



  var feedback = productStore.getById(user[0].inID).data.feedback ? Ext.JSON.decode(productStore.getById(user[0].inID).data.feedback) : {};
  var fbKey = JSONKey;

  var historyItems = productStore.getById(user[0].inID).data.providerHistory ? Ext.JSON.decode(productStore.getById(user[0].inID).data.providerHistory) : {};
  //console.log(historyItems[JSONKey]);


  var status;
  var date = {};
  date = getDateIndexes(day);

  var d = parseInt(date.dayIndex, 10);
  var m = parseInt(date.monthIndex, 10);
  var y = parseInt(date.year, 10);
  //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
  var x=new Date();
  x.setFullYear(y,m-1,d);
  var t = new Date();

  if (x>t)
  {
    status = 'Scheduled';
  }
  else
  {
    status = 'Waiting Feedback';
  }








  if(productStore.getById(ID) && historyItems[JSONKey] && status != 'Scheduled')
  {

    var first = productStore.getById(ID).data.first;
    var last = productStore.getById(ID).data.last;
    var name = first + ' ' + last;

    var myFirst = productStore.getById(user[0].inID).data.first;
    var myLast = productStore.getById(user[0].inID).data.last;
    var myName = myFirst + ' ' + myLast;
    var company =  productStore.getById(user[0].inID).data.company;
    feedbackFormImg.style.background = 'url(' + productStore.getById(ID).data.image + ') no-repeat center center';

    var innerHTML = '<h2 style="text-align: center; margin-top: 6px;">' + name + '</h2><h3 style="text-align: center; margin-top: -10px;">' + day + '</h3><h4 style="text-align: center; margin-top: -10px;">by ' + myName + ' (' + company + ')</h4><form id="myFeedback" name="myFeedback"><div class="sidebar" style="width: 540px; margin-left: 12px; margin-top: 50px;"><ul>';

    for (var key in formItems)
    {
      //console.log("KEY: " + key + " VAL: " + form[key]['rating'] + form[key]['comment']);
      var rating = 0;
      if(feedback) {if(feedback[fbKey]) {if(feedback[fbKey][key]) {rating = feedback[fbKey][key].rating || 0;}}}

      var ratingStr = '<div><img src="images/starBoard.png" style="z-index: 20; position: relative; top: -40px; left:109px;"/>';
      for(var i = rating; i < 5; i++)
      {
        var starID = key + 'Star' + i;
        ratingStr += '<img src="images/0.gif" onclick="javascript:addStar(\'' + i + '\',\'' + starID + '\');" onmouseover="this.style.cursor = \'pointer\';" style="z-index: 999;  position: relative; top: -30px; left: 208px; margin-right: -4px; height: 14px;"/>';
        ratingStr += '<img id="' + starID + '" src="images/emptyStar.png" style="z-index: 19;  position: relative; top: -30px; left: 218px; margin-right: -6px; height: 15px;"/>';
      }
      for(var i = 0; i < rating; i++)
      {
        var starID = key + 'Star' + i;
        ratingStr += '<img src="images/0.gif" onclick="javascript:addStar(\'' + i + '\',\'' + starID + '\');" onmouseover="this.style.cursor = \'pointer\';" style="z-index: 999;  position: relative; top: -30px; left: 208px; margin-right: -4px; height: 14px;"/>';
        ratingStr += '<img id="' + starID + '" src="images/filledStar.png" style="z-index: 19;  position: relative; top: -30px; left: 218px; margin-right: -6px; height: 15px;"/>';
      }
      ratingStr += '<span style="position: relative; top: -30px; left: 315px; font-size:9px; color:#606060; white-space: pre;">Very Dissatisfied</span>';
      ratingStr += '<span style="position: relative; top: -30px; left: 440px; font-size:9px; color:#606060; white-space: pre;">Very Satisfied</span></div>';

      var comment = '';
      if(feedback) {if(feedback[fbKey]) {if(feedback[fbKey][key]) {comment = feedback[fbKey][key].comment || '';}}}

      var textAreaName = key + 'Comment';
      innerHTML += '<li><h2>' + key + ':</h2> ' + ratingStr + '<span style="position: relative; top: -30px;">Comments: ' + '<textarea id="' + textAreaName + '" name="' + textAreaName + '" placeholder="Provide your comments here" style="height: 80px; width: 566px; resize: none;">' + comment + '</textarea>' + '</span></li>';
    }
    innerHTML += '</ul></div></form>';






    feedbackForm.innerHTML = innerHTML + '<div class="a-button a-button-large" style="position: relative; height: 61px; margin-top: 20px; bottom: 0px; float: right; right: 20px; z-index: 51;" onclick="feedbackSubmit(this.parentNode.name,\'' + JSONKey + '\');"><span class="a-button-inner" style="padding-top: 24px;"><span class="a-button-text">Submit</span></span></div></form>';
  }
  else if(historyItems[JSONKey])
  {
    feedbackForm.innerHTML = '<img src="./images/403.png" style="height: 380px; display: inline-block; margin-right: 125px;"/>';
    feedbackFormImg.style.display = 'none';
    feedbackForm.style.marginLeft = -120 + 'px';
  }
  else
  {
    feedbackForm.innerHTML = '<img src="./images/404.png" style="height: 380px; display: inline-block; margin-right: 125px;"/>';
    feedbackFormImg.style.display = 'none';
    feedbackForm.style.marginLeft = -120 + 'px';
  }

}







window.addStar = function(num, ID)
{
  var num = parseInt(num, 10);
  //alert(num);
  //var src = el.src;
  var src = document.getElementById(ID).src;
  var baseID = ID.replace(/[0-9]*$/,'');
  //console.log(baseID);
  //var num = parseInt(el.id,10);
  var filled = src.indexOf('filled') !== -1;
  //console.log('NUM: ' + num);
  //console.log('GSTARS: ' + gStars);
  var currStar;
  if(num < 4 || gStars < 5)
  {
    gStars = 0;
    for(var i = num; i >=0; i--)
    {
      currStar = baseID + i;
      document.getElementById(currStar).src = "images/emptyStar.png";
      gStars++;
    }
    for(var i = num; i < 5; i++)
    {
      currStar = baseID + i;
      document.getElementById(currStar).src = "images/filledStar.png";
      //gStars--;
    }
  }
  else
  {
    currStar = baseID + num;
    document.getElementById(currStar).src = filled ? "images/emptyStar.png" : "images/filledStar.png";
    if(filled) {gStars = 0;}
    else       {gStars = 1;}
  }

  //alert(gStars);

}



function getStars(baseID)
{
  var stars = 0;
  for(var num = 0; num < 5; num++)
  {
    var currStar = baseID + num;
    var src = document.getElementById(currStar).src;
    //var num = parseInt(el.id,10);
    var filled = src.indexOf('filled') !== -1;
    if(filled) {stars++;}
  }
  return stars;  
}


function rateSubmit(fID, inID, JSONKey)
{
  //console.log(fID);
  //console.log(document.fID.comment.value);
  var rating = getStars('rateStar');
  var comment = document.myRating.comment.value;
  //console.log(rating);
  //console.log(inID);
  var rateForm = document.getElementById("rateForm");


  if(!rating)
  {
      var mbox = Ext.MessageBox.show({
        title:    'Did you forget to rate me?',
        msg:      'You left a rating of 0.  Was that your intention?',
        buttons:  Ext.MessageBox.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function(btn)
        {
          //console.log(btn);
          if( btn == 'yes')
          {
	    //console.log("YES");
            //console.log(inID);
            rateForm.innerHTML = '<div style="text-align: center; margin-top: 250px;"><h1>Your Feedback has been submitted...</h1><h2>Thank You!</h2></div>';
            updateRating(inID, rating, comment, JSONKey);
          }
        }
      });
  }
  else
  {
    //console.log('Submitting...');
    rateForm.innerHTML = '<div style="text-align: center; margin-top: 250px;"><h1>Your Feedback has been submitted...</h1><h2>Thank You!</h2></div>';
    updateRating(inID, rating, comment, JSONKey);
  }
  
  
}



function feedbackSubmit(fID, JSONKey)
{
  //console.log(fID);
  //console.log(document.fID.comment.value);


  var split = JSONKey.split(/\:/);
  var ID = split[0];
  var day = split[1];
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  var feedbackForm = document.getElementById("feedbackFormForm");


  var myFeedback = {};
  var zeroString = '';
  for(var key in formItems)
  {
    var currStar = key + 'Star'
    var rating = getStars(currStar);
    var currComment = key + 'Comment';
    var comment = document.getElementById(currComment).value;
    //console.log(rating);
    //console.log(comment);
    myFeedback[key] = {};
    myFeedback[key]['rating'] = rating;
    myFeedback[key]['comment'] = comment;
    if(!rating) {zeroString += key + ', ';}
  }
  if(zeroString)
  {
      zeroString = zeroString.replace(/\,\s$/,'');
      var mbox = Ext.MessageBox.show({
        title:    'Did you forget something?',
        msg:      'You left a rating of 0 for item(s): ' + zeroString + '.<br>Was that your intention?',
        buttons:  Ext.MessageBox.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function(btn)
          {
            //console.log(btn);
            if( btn == 'no')
            {
              return
            }
	    else
 	    {
              //console.log("Submitting...");
              feedbackForm.innerHTML = '<div style="text-align: center; margin-top: 250px;"><h1>Your Feedback has been submitted...</h1><h2>Thank You!</h2></div>';
              updateFeedback(ID, JSONKey, myFeedback);
	    }
          },
	scope: this
        });
  }
  else
  {
    //console.log("Submitting...");
    feedbackForm.innerHTML = '<div style="text-align: center; margin-top: 250px;"><h1>Your Feedback has been submitted...</h1><h2>Thank You!</h2></div>';
    updateFeedback(ID, JSONKey, myFeedback);
  }
  
  
}




function getDateIndexes(longDateStr)
{
  //console.log(longDateStr);
  longDateStr = longDateStr.replace(/,/g,"");
  var split = longDateStr.split(" ");
  var weekDay = split[0];
  var monthName = split[1];
  var dayIndex = split[2];
  var year = split[3];
  
  for(var i = 0; i < monthNames.length; i++)
  {
    if(monthName == monthNames[i]) {monthIndex = i+1; break;}
  }  
  return {dayIndex: dayIndex, monthIndex: monthIndex, year: year};
}






function makePayment(vendor)
{
  //console.log("makePayment: " + vendor);
  
  var itemStr = '';
  var idx = 1;

  var returnUrl = "http://www.interviewring.com/index.php?return&ID=" + user[0].inID + "&CODE=" + Ext.getCmp('promoForm').getValue();
  //console.log(returnUrl);
  //return;

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth()+1;
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var orderID = year + '.' + month + '.' + day + '.' + hours + '.' + minutes + '.' + seconds;

  total = getTotal(subTotals);

  var myTotal = currencyFormatted(total);

  ga('ecommerce:addTransaction', {
    'id': orderID,                    // Transaction ID. Required.
    'affiliation': 'interviewring',   // Affiliation or store name.
    'revenue': myTotal,               // Grand Total.
    'shipping': '0',                  // Shipping.
    'tax': '0'                        // Tax.
  });

  for (var key in cartItems)
  {
    var split = key.split(/\:/);
    var ID = split[0];
    var item = cartItems[key];
    //console.log("ITEM: " + item + " KEY: " + key);
    var sku = 'sku' + idx;
    var desc = cartItems[key];
    desc = desc.replace(/"/g, '\\"');
    desc = desc.replace(/'/g, "\\'");
    desc = desc.replace(/\<br\>/g, "\n");
    var unitPrice = getSubTotalFromSch(cartItems[key], ID);
    var quantity = 1;
    var discounted = 0;
    var customStr = '';

    itemStr += '<input type="hidden" name="item_name_' + idx + '" value="' + desc + '"><input type="hidden" name="amount_' + idx + '" value="' + unitPrice + '"><input type="hidden" name="quantity_' + idx + '" value="' + quantity + '"><input type="hidden" name="discount_amount_' + idx + '" value="' + discounted + '">';


    //returnUrl += encodeURI(key) + "=" + encodeURI(cartItems[key]) + "&";

    // add item might be called for every item in the shopping cart
    // where your ecommerce engine loops through each item in the cart and
    // prints out _addItem for each

    ga('ecommerce:addItem', {
      'id': orderID,              // Transaction ID. Required.
      'name': desc,               // Product name. Required.
      'sku': sku,                 // SKU/code.
      'category': 'service',      // Category or variation.
      'price': unitPrice,         // Unit price.
      'quantity': quantity        // Quantity.
    });

    idx++;
  }


  var cbtStr = "Confirm your purchase from interviewring.com";
  var ppID = "XD9GN72N4QU38";


  if(! total)
  {
    
    var pre = '<form name="paymentSubmit" action="' + returnUrl + '" method="post">';
    var disc = '<input type="hidden" name="custom" value="' + customStr + '">';
    var post = '<input class="submitDummy" type="image" name="submit" border="0" src="./images/0.gif" onclick="ga(\'send\', \'event\', \'button\', \'click\', \'submit\');"/></form>';


    var form = document.createElement("div");
    form.id = "paymentForm";
    form.innerHTML = pre + itemStr + disc + post;
    document.body.appendChild(form);

    //document.getElementById('paymentForm').innerHTML = pre + itemStr + disc + post;
  
    ga('ecommerce:send');   //submits transaction to the Analytics servers
    document.paymentSubmit.submit();

    return;
  }

  var notifyURL = "http://www.interviewring.com/ipn_listner.php";

  var pre = '<form name="paymentSubmit" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"> <input type="hidden" name="upload" value="1"> <input type="hidden" name="business" value="' + ppID + '"> <input type="hidden" name="cpp_header_image" value="http://www.interviewring.com/images/logo150x50.png"> <input type="hidden" name="return" value="' + returnUrl + '"> <input type="hidden" name="rm" value="2"> <input type="hidden" name="cbt" value="' + cbtStr + '"> <input type="hidden" name="notify_url" value="' + notifyURL + '">';

  var disc = '<input type="hidden" name="custom" value="' + customStr + '">';
  
  var post = '<input class="submitDummy" type="image" name="submit" border="0" src="./images/0.gif" onclick="ga(\'send\', \'event\', \'button\', \'click\', \'submit\');"/></form>';

  //console.log(returnUrl);
  //console.log(pre + itemStr + disc + post);

  var form = document.createElement("div");
  form.id = "paymentForm";
  form.innerHTML = pre + itemStr + disc + post;
  document.body.appendChild(form);

  //document.getElementById('paymentForm').innerHTML = pre + itemStr + disc + post;
  
  ga('ecommerce:send');   //submits transaction to the Analytics servers
  document.paymentSubmit.submit();

}







  function eraseAllCookies()
  {

    var cookieStr = listCookies();
    //console.log("COOKIESTR: " + cookieStr);
    var cookieList = cookieStr.split('\n');
    for(var i=0;i < cookieList.length;i+=1)
    {
      var str = cookieList[i];
      var cookie = str.split('=');
      for(var j=0;j < cookie.length-1;j+=2)
      {
        var day = cookie[j];
        var sch = cookie[j+1];
        day = day.replace(/\s/g, "");
        var split = day.split('/');
        var d = parseInt(split[0], 10);
        var m = parseInt(split[1], 10);
        var y = parseInt(split[2], 10);
	deleteCookie(day);
      }
    }
  }






function updateConfidentiality(checked)
{
  var inID = user[0].inID;
  //console.log(checked);
  settings[inID]['identity'] = checked;
  setGroup("infoConfidential", settings[inID]['identity']);
  setGroup("sbInfoConfidential", settings[inID]['identity']);
  $.ajax({url:"./saveSettings.php", 
       data: {id: inID, settings: JSON.stringify(settings[inID]) },
       type:'post',
       async:true
  });

}

function updateRating(inID, myRating, myComment, JSONKey)
{
  var rating = 0;

  var ratingObj;

  if(productStore.getById(inID)) {ratingObj =  productStore.getById(inID).data.reviews ? Ext.JSON.decode(productStore.getById(inID).data.reviews) : {};}
  if(!ratingObj) {return;}

  if(!ratingObj.total) {ratingObj.total = 0;}
  if(!ratingObj.average) {ratingObj.average = 0;}
  if(!ratingObj.comments) {ratingObj.comments = {};}

  ratingObj.total = parseInt(ratingObj.total, 10) + 1;
  var rates = ratingObj.total || 0;
  var comments = ratingObj.comments;

  for (var key in comments)
  {
    if(!key || !comments[key]) {continue;}
    rating += parseInt(comments[key].split(/:/)[0], 10);
  }
  rating += myRating;
  var average = rating/rates;
  //console.log(average);

  ratingObj.average = average;

  var myCommentTimeStamp = new Date().getTime();
  var key = user[0].inID + ':' + myCommentTimeStamp + ':' + JSONKey;
  comments[key] = myRating + ':' + myComment;
  ratingObj.comments = comments;

  productStore.getById(inID).data.reviews = JSON.stringify(ratingObj);

  $.ajax({url:"./saveRating.php", 
       data: {id: inID, rating: JSON.stringify(ratingObj) },
       type:'post',
       async:true
  });


  var first = productStore.getById(inID).data.first;
  var last = productStore.getById(inID).data.last;
  var name = myFirst + ' ' + myLast;

  var email = productStore.getById(inID).data.email;


  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  var sender = user[0].inID;
  var msg = 'You got rated by ' + myName + '<br>Rating: ' + myRating + '/5<br>Comment: ' + myComment;
  var mailObj = productStore.getById(inID).data.mail ? Ext.JSON.decode(productStore.getById(inID).data.mail) : {};
  var msgs = mailObj.mail;

  var size = Object.size(msgs);
  var id = 'mail' + parseInt(parseInt(size,10)+0,10);
  msgs[id] = '(ID=' + sender + ')' + msg;

  saveMail(inID, true, msgs);



  var date = JSONKey.split(':')[1];
  var synopsis = 'Overall Feedback:<br>' + myRating + '/5 stars<br>Comment: ' + myComment;
  var userEmail = '<br>Rating Synopsis for ' + date + '<br>' + synopsis;
  //console.log(userEmail);

  var userHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>Congratulations! You got rated for your appointment with ' + myName + '</h1><h2>You can view this rating at anytime by logging in to InterviewRing.com,<br>finding yourself under \'Find Interviewers\' on the home page,<br>and clicking on your ratings</h2><h2></div><br><br><br><div><h3>Thank you for choosing InterviewRing.com<br>-The InterviewRing.com team</div>' + userEmail + '</h3></body></html>';

  $.ajax({url:"./email.php", 
    //data: {name: user[0].first, email: user[0].email, cc_list: '', subject: "Your Purchase from interviewring.com", MsgHTML: userHTML},
    data: {id: user[0].inID, name: first, email: email, from: 'The InterviewRing Team', subject: "InterviewRing.com user, " + myName + ", rated you for an appointment", MsgHTML: userHTML, attachResume: '0'},
    type:'post',
    async:false
  });




}




function markFeedbackSeen(inID, JSONKey)
{
  var feedbackObj;
  //console.log(JSONKey);

  if(productStore.getById(inID)) {feedbackObj = productStore.getById(inID).data.feedback ? Ext.JSON.decode(productStore.getById(inID).data.feedback) : {};}
  if(!feedbackObj) {return;}

  feedbackObj[JSONKey]['seen'] = true;

  productStore.getById(inID).data.feedback = JSON.stringify(feedbackObj);

  $.ajax({url:"./saveFeedback.php", 
       data: {id: inID, feedback: JSON.stringify(feedbackObj) },
       type:'post',
       async:true
  });
}



function updateFeedback(inID, JSONKey, myFeedback)
{
  //console.log("updateFeedback");
  var rating = 0;

  var feedbackObj;
  //console.log(JSONKey);

  if(productStore.getById(user[0].inID)) {feedbackObj = productStore.getById(user[0].inID).data.feedback ? Ext.JSON.decode(productStore.getById(user[0].inID).data.feedback) : {};}
  if(!feedbackObj) {return;}

  feedbackObj[JSONKey] = myFeedback;

  productStore.getById(user[0].inID).data.feedback = JSON.stringify(feedbackObj);

  $.ajax({url:"./saveFeedback.php", 
       data: {id: user[0].inID, feedback: JSON.stringify(feedbackObj) },
       type:'post',
       async:true
  });


  var first = productStore.getById(inID).data.first;
  var last = productStore.getById(inID).data.last;
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  var sender = user[0].inID;
  var msg = 'You got feedback from ' + myName + '<br>Click on the history icon in the upper right to see your feedback';
  var mailObj = productStore.getById(inID).data.mail ? Ext.JSON.decode(productStore.getById(inID).data.mail) : {};
  var msgs = mailObj.mail;


  var size = Object.size(msgs);
  var id = 'mail' + parseInt(parseInt(size,10)+0,10);
  //console.log(id);
  msgs[id] = '(ID=' + sender + ')' + msg;
  //console.log(msgs[id]);
  //console.log(inID);
  saveMail(inID, true, msgs);



  //console.log(JSONKey);
  //console.log(myFeedback);

  var showFeedbackURL = 'http://www.interviewring.com/?showFeedback&ID=' + user[0].inID + '&KEY=' + JSONKey;

  var email = productStore.getById(inID).data.email;
  //console.log(email);

  var date = JSONKey.split(':')[1];
  var synopsis = 'Overall Feedback:<br>' + myFeedback['overall feedback'].rating + '/5 stars<br>Comment: ' + myFeedback['overall feedback'].comment;
  var userEmail = '<br>Appointment Synopsis for ' + date + '<br>' + synopsis;
  //console.log(userEmail);

  var userHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>Congratulations! You got feedback from your appointment with ' + myName + '</h1><h2>You can view this feedback at anytime by logging in to InterviewRing.com and clicking on the history icon in the upper right hand corner</h2><h2>OR</h2><h2>Clicking <a href="' + showFeedbackURL +'">this</a> link</h2></div><br><br><br><div><h3>Thank you for choosing InterviewRing.com<br>-The InterviewRing.com team</div>' + userEmail + '</h3></body></html>';

  $.ajax({url:"./email.php", 
    //data: {name: user[0].first, email: user[0].email, cc_list: '', subject: "Your Purchase from interviewring.com", MsgHTML: userHTML},
    data: {id: user[0].inID, name: first, email: email, from: 'The InterviewRing Team', subject: "InterviewRing.com user, " + myName + ", gave you feedback from your appointment", MsgHTML: userHTML, attachResume: '0'},
    type:'post',
    async:false
  });



}






function pingSubmit(fID, inID, day)
{


  var comment = document.pingProviderForm.comment.value;

  var first = productStore.getById(inID).data.first;
  var last = productStore.getById(inID).data.last;
  var name = first + ' ' + last;

  var myFirst = productStore.getById(user[0].inID).data.first;
  var myLast = productStore.getById(user[0].inID).data.last;
  var myName = myFirst + ' ' + myLast;

  var sender = user[0].inID;
  var msg = 'You got a ping from ' + myName + '<br>Click on the history icon in the upper right to submit your feedback';
  var mailObj = productStore.getById(inID).data.mail ? Ext.JSON.decode(productStore.getById(inID).data.mail) : {};
  var msgs = mailObj.mail;


  var size = Object.size(msgs);
  var id = 'mail' + parseInt(parseInt(size,10)+0,10);
  //console.log(id);
  msgs[id] = '(ID=' + sender + ')' + msg;
  //console.log(msgs[id]);
  //console.log(inID);
  saveMail(inID, true, msgs);



  //console.log(JSONKey);
  //console.log(myFeedback);



  var email = productStore.getById(inID).data.email;
  //console.log(email);


  var userEmail = '<br>Appointment Synopsis:<br>' + myName + ' on ' + day + '<br>';
  if(comment) {userEmail += 'Coment: ' + comment + '<br>';}

  console.log(userEmail);

  var userHTML = '<html><head><link rel="stylesheet" type="text/css" href="http://www.interviewring.com/css/email.css"></head><body style="background: #f8f4f3;color: #787c6b;min-width: 960px;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div><img style="height:50px;" src="http://www.interviewring.com/images/logo.png"/></div><div><h1>You got a ping from ' + myName + '</h1><h2>You can submit feedback for ' + myFirst + ' at anytime by logging in to InterviewRing.com and clicking on the history icon in the upper right hand corner and finding their appointment in your history.</h2><h2>OR</h2><h2>Clicking <a href="http://www.interviewring.com?feedback&KEY=' + user[0].inID + ':' + day + '" target="_blank">this</a> link</h2></div><br><br><br><div><h3>Please try to be prompt in providing feedback to your customers.<br>-The InterviewRing.com team</div>' + userEmail + '</h3></body></html>';

  $.ajax({url:"./email.php", 
    //data: {name: user[0].first, email: user[0].email, cc_list: '', subject: "Your Purchase from interviewring.com", MsgHTML: userHTML},
    data: {id: user[0].inID, name: first, email: email, from: 'The InterviewRing Team', subject: "InterviewRing.com user, " + myName + ", pinged you about an appointment", MsgHTML: userHTML, attachResume: '0'},
    type:'post',
    async:false
  });

  var window = document.getElementById(fID);
  window.innerHTML = '<h1 style="margin-top:150px; margin-left: 300px;">Ping Successful!</h1>';

}








function shareRating(rating, checked)
{
  var inID = user[0].inID;
  //console.log(checked);
  if(!settings[inID]['share']) {settings[inID]['share'] = {};}
  if(checked) {settings[inID]['share'][rating] = checked;}
  else        {settings[inID]['share'][rating] = undefined;}
  $.ajax({url:"./saveSettings.php", 
       data: {id: inID, settings: JSON.stringify(settings[inID]) },
       type:'post',
       async:true
  });

}




function showSettings()
{
  if(linkedINlogin)
  {
    document.getElementById("showSettingsContainer").style.display = '';
    setGroup("infoConfidential", settings[user[0].inID]['identity']);
  }
}











function doQuickLink(key, item)
{
  clearAllFilters();
  setFilter(key, item, 'Filter');
  doSearch();

}



function doHistoryQuickLink(key, item, type)
{
  //First time through to get info for populateFilters()
  type == 'interviewer' ? doProviderHistory() : doHistory();
  showProfile();
  populateFilters();
  collapseAllFilters();
  clearAllFilters();
  setFilter(key, item, 'Filter');
  type == 'interviewer' ? doProviderHistory() : doHistory();

  if(document.getElementById("viewFeedback"))
  {
    document.getElementById("viewFeedback").parentNode.removeChild(document.getElementById("viewFeedback"));
  }

}









function clearAllFilters()
{
  document.getElementById("searchFilterList").innerHTML = '[]';
  for(var key in filters)
  {
    var filterName = key + 'Filter';
    setGroup(filterName, false);
  }

  document.getElementById("historyFilterList").innerHTML = '[]';
  for(var key in historyFilters)
  {
    var filterName = key + 'Filter';
    setGroup(filterName, false);
  }
}

function collapseAllFilters()
{
  for(var key in filters)
  {
    var el = document.getElementById(key);
    var elImg = el.parentNode.firstChild.nextSibling.firstChild.nextSibling;
    el.style.display = 'none';
    elImg.className = "expand-arrow";
  }

  for(var key in historyFilters)
  {
    var el = document.getElementById(key);
    var elImg = el.parentNode.firstChild.nextSibling.firstChild.nextSibling;
    el.style.display = 'none';
    elImg.className = "expand-arrow";
  }
}

function collapseOtherFilters(filter)
{
  for(var key in filters)
  {
    if(key != filter)
    {
      var el = document.getElementById(key);
      var elImg = el.parentNode.firstChild.nextSibling.firstChild.nextSibling;
      el.style.display = 'none';
      elImg.className = "expand-arrow";
    }
  }

  for(var key in historyFilters)
  {
    if(key != filter)
    {
      var el = document.getElementById(key);
      var elImg = el.parentNode.firstChild.nextSibling.firstChild.nextSibling;
      el.style.display = 'none';
      elImg.className = "expand-arrow";
    }
  }
}



function addFilterTypeToList(type, elID)
{
  elID = elID || "searchFilterList";

  //console.log(elID);
  var atLeastOneChecked = false;
  var filtered = new Array();

  var r = document.getElementsByName(type);
  for (var i = 0; i < r.length; i++)
  {
    atLeastOneChecked |= r[i].checked;
  }


  type = type.replace('Filter','');
  type = type.replace('<br>','');
  type = type.replace('companyH','company');


  var innerHTML = document.getElementById(elID).innerHTML;
  //console.log("INNER: " + innerHTML);
  innerHTML = innerHTML.replace(/[\[|\]\s*]/g,'');
  var split = innerHTML ? innerHTML.split(',') : [];
  
  //console.log(Object.size(split));
  //console.log(split.length);


  var found = 0;
  for(var i = 0; i < split.length; i++) {if(split[i] === type) found++;}
  if(!found) {split.push(type);}

  innerHTML = split.join(', ');


  //[type, type, type]
   var firstEl = new RegExp(type + ", ");
   var middleEl = new RegExp(", " + type);
   var onlyEl = new RegExp(type);
   if(!atLeastOneChecked) {innerHTML = innerHTML.replace(firstEl,''); innerHTML = innerHTML.replace(middleEl,''); innerHTML = innerHTML.replace(onlyEl,'');}

  document.getElementById(elID).innerHTML = '[' + innerHTML + ']';
}




function pruneFilters()
{

  for(var key in filters)
  {
    var filterName = key + 'Filter';
    var filterValues = new Array();
    var el = document.getElementById(key);
    //console.log("INNER: " + el.innerHTML);
    var innerHTML = '';
    //console.log(obj);
    for(var j = 0; j < initStr.length; j++)
    {
      var ID = initStr[j].id;
      var values = {};

      //console.log("--KEY: " + key);
      if(key == 'services' || key == 'price')
      {
        if(productStore.getById(ID)) {values = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};}
      }        
      else
      {
        values[productStore.getById(ID).data[key]] = true;
      }
      for(value in values)
      {
      
        var currValue;
	if(key == 'price')
        {
	  currValue = values[value].price;

	  var items = filters[key];
          var range = items[items.length-1];
	  for(var i = 0; i < items.length; i++)
	  {
	    var item = items[i];
            //console.log(item);
	    item = item.replace('/hr','');
	    item = item.replace(/\$/g,'');
            item = item.replace('FREE', '0');
            item = item.replace('+', '-999999');
	    var split = item.split('-');
	    var priceLO = parseFloat(split[0]);
            var priceHI = parseFloat(split[1],10) || parseFloat('0');
            //console.log(LO + "->" + " LO: " + priceLO + " HI: " + priceHI);
            if(parseFloat(currValue) >= priceLO && parseFloat(currValue) <= priceHI) {range = items[i];}
	  }
          currValue = range;

	}
        else {currValue = value;}
        //console.log("KEY: " + key + " VALUE: " + currValue);

        var found = 0;
        for(var i = 0; i < filterValues.length; i++) {if(filterValues[i] === currValue) found++;}
        if(!found) {filterValues.push(currValue);}
      }
    }
    for(var i = 0; i < filterValues.length; i++)
    {
      //console.log(key + obj[key]);
      innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + filterValues[i] + '" onclick="doSearch();"/>' +  filterValues[i] + '<br>';
    }
    //console.log(initStr.length);
    //console.log(innerHTML);
    if(!innerHTML) {innerHTML = 'No Results';}
    el.innerHTML = innerHTML;
    //console.log(el.innerHTML);
  }
}






function pruneHistoryFilters()
{

  for(var key in historyFilters)
  {
    var filterName = key + 'Filter';
    var filterValues = new Array();
    var el = document.getElementById(key);
    //console.log("INNER: " + el.innerHTML);
    var innerHTML = '';
    //console.log(obj);
    for(var j = 0; j < historyItemKeyArray.length; j++)
    {
      //historyItemKeyArray.push({key: key, id: ID, day: day, status: status, companyH: company, date: dateFilter}); 
      var currValue = historyItemKeyArray[j][key];
      var found = 0;
      for(var i = 0; i < filterValues.length; i++) {if(filterValues[i] === currValue) found++;}
      if(!found) {filterValues.push(currValue);}
    }
    for(var i = 0; i < filterValues.length; i++)
    {
      //console.log(key + obj[key]);
      innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + filterValues[i] + '" onclick="historyType==\'interviewee\' ? doHistory() : doProviderHistory(); addFilterTypeToList(this.name, \'' + "historyFilterList" + '\');"/>' + filterValues[i] + '<br>';
      //innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + filterValues[i] + '" onclick="doSearch();"/>' +  filterValues[i] + '<br>';
    }
    //console.log(initStr.length);
    //console.log(innerHTML);
    if(!innerHTML) {innerHTML = 'No Results';}
    el.innerHTML = innerHTML;
    //console.log(el.innerHTML);
  }
}






function populateFilters()
{
  for(var key in filters)
  {
    var obj = filters[key];
    var filterName = key + 'Filter';
    var el = document.getElementById(key);
    //console.log("INNER: " + el.innerHTML);
    var innerHTML = '';
    //console.log(obj);
    if(!obj) {continue;}
    for(var key in obj)
    {
      //console.log(key + obj[key]);
      innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + obj[key] + '" onclick="doSearch(); addFilterTypeToList(this.name, \'' + "searchFilterList" + '\');"/>' + obj[key] + '<br>';
    }
    el.innerHTML = innerHTML;
  }

  for(var key in historyFilters)
  {
    var obj = historyFilters[key];
    var filterName = key + 'Filter';
    var el = document.getElementById(key);
    //console.log("INNER: " + el.innerHTML);
    var innerHTML = '';
    //console.log(obj);
    if(!obj) {continue;}
    for(var key in obj)
    {
      //console.log(key + obj[key]);
      innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + obj[key] + '" onclick="historyType==\'interviewee\' ? doHistory() : doProviderHistory(); addFilterTypeToList(this.name, \'' + "historyFilterList" + '\');"/>' + obj[key] + '<br>';
    }
    el.innerHTML = innerHTML;
  }
}




function showFilter(filter)
{
  var obj = filters[filter];
  var filterName = filter + 'Filter';
  var el = document.getElementById(filter);
  var elImg = el.parentNode.firstChild.nextSibling.firstChild.nextSibling;
  collapseOtherFilters(filter);
  //console.log(elImg.className);
  //console.log(el.style.zIndex);
  if(!el.style.display || el.style.display == 'none')
  {
    elImg.className = "implode-arrow";
    //console.log(">"+el.innerHTML+"<");
    if(!el.innerHTML && obj)
    {
      var innerHTML = '';
      //console.log("OBJ: " + obj);
      for(var key in obj)
      {
        //console.log("FILTER: " + filter + "KEY:" + key + "=" + obj[key]);
        innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + obj[key] + '" onclick="doSearch(); addFilterTypeToList(this.name, \'' + "searchFilterList" + '\');"/>' + obj[key] + '<br>';
    
      }
      el.innerHTML = innerHTML;
    }
    el.style.display = 'block';
  }
  else
  {
    el.style.display = 'none';
    elImg.className = "expand-arrow";
  }
}



function showHistoryFilter(filter)
{
  var obj = historyFilters[filter];
  var filterName = filter + 'Filter';
  var el = document.getElementById(filter);
  var elImg = el.parentNode.firstChild.nextSibling.firstChild.nextSibling;
  collapseOtherFilters(filter);
  //console.log(elImg.className);
  //console.log(el.style.zIndex);
  if(!el.style.display || el.style.display == 'none')
  {
    elImg.className = "implode-arrow";
    //console.log(">"+el.innerHTML+"<");
    if(!el.innerHTML && obj)
    {
      var innerHTML = '';
      //console.log("OBJ: " + obj);
      for(var key in obj)
      {
        //console.log("FILTER: " + filter + "KEY:" + key + "=" + obj[key]);
        innerHTML += '<input type="checkbox" name="' + filterName + '" value="' + obj[key] + '" onclick="historyType==\'interviewee\' ? doHistory() : doProviderHistory(); addFilterTypeToList(this.name, \'' + "historyFilterList" + '\');"/>' + obj[key] + '<br>';
    
      }
      el.innerHTML = innerHTML;
    }
    el.style.display = 'block';
  }
  else
  {
    el.style.display = 'none';
    elImg.className = "expand-arrow";
  }
}





function setFilter(key, item, type)
{
  //console.log(key + " " + item);
  var filterName = key + type;
  //console.log(filterName);
  var r = document.getElementsByName(filterName);
  for (var i = 0; i < r.length; i++)
  {
    //console.log("'" + r[i].value + "'=='" + item + "'");
    if(r[i].value == item) {r[i].checked = true;}
  }
}












function applyFilters()
{
  var filterType = 'and';

  var checkedFilters = {};
  var toSave = {};
  var atLeastOneChecked = false;
  var filtered = new Array();

  for(var key in filters)
  {
    //console.log("FILTER: " + key);
    var filterName = key + 'Filter';
    if(!checkedFilters[key]) {checkedFilters[key] = {};}
    var r = document.getElementsByName(filterName);
    for (var i = 0; i < r.length; i++)
    {
      var value = r[i].value;
      checkedFilters[key][value] = r[i].checked;
      //console.log("ADDING -> KEY: " + key + " VALUE: " + value + " = " + checkedFilters[key][value]);
      atLeastOneChecked |= r[i].checked;
    }
  }

  if(!atLeastOneChecked) {return;}

  if(filterType == 'and')
  {
    for(var key in filters)
    {
      atLeastOneChecked = false;
      for(var value in checkedFilters[key])
      {
        //console.log("--KEY: " + key + " VALUE: " + value + " = " + checkedFilters[key][value]);
	atLeastOneChecked |= checkedFilters[key][value];
      }
      if(!atLeastOneChecked)
      {
        for(var value in checkedFilters[key])
        {
	  checkedFilters[key][value] = true;
        }
      }
    }
  }

  for(var j = 0; j < initStr.length; j++)
  {
    var ID = initStr[j].id;
    toSave[ID] = (filterType == 'and') ? true : false;
    //console.log("\n\nID: " + ID);
    for(var key in filters)
    {
      //console.log("--KEY: " + key);
      var value = productStore.getById(ID).data[key];
      var found = false;
      var currValue = (key != 'services') ? value : 'services';
      //console.log("CURRVALUE: " + currValue);

      if(key == 'services')
      {
        var services;
        if(productStore.getById(ID)) {services = productStore.getById(ID).data.providedServices ? Ext.JSON.decode(productStore.getById(ID).data.providedServices) : {};}
        if(!Object.size(services)) {found = true;}
        
        for (var service in services)
        {
          //console.log("REGEX: " + regExp + " KEY: " + key);
          for(var checked in checkedFilters[key])
          {
	    if(checkedFilters[key][checked])
	    {
	      //console.log("OFFERED: " + service + " CHECKED: " + checked);
              if(service == checked) {found = true;}
	    }
	  }
        }
	checkedFilters[key][currValue] = found;
      }//if(key == 'services')

      //console.log("--VALUE: " + currValue);
      if(typeof checkedFilters[key][currValue] !== "undefined")
      {
        //console.log("----KEY: " + key + " VALUE: " + currValue + " = " + checkedFilters[key][currValue]);
        if(filterType == 'and')
          toSave[ID] &= checkedFilters[key][currValue];
        else
          toSave[ID] |= checkedFilters[key][currValue];
      }
      //console.log("--TO SAVE: " + ID + "->" + toSave[ID]);
    }
  }

  for(var key in toSave)
  {
    if(toSave[key]) {filtered.push({id: key})};
  }
  initStr = filtered;
}








function startRead() {  

  var re = /(?:\.([^.]+))?$/;

  // obtain input element through DOM 
  var filename = document.getElementById('uploadFile').files[0].name;
  var extension = re.exec(filename)[1]; 
  //console.log(extension);
  //console.log(document.getElementById('uploadFile').files[0].type);
  //console.log(document.getElementById('uploadFile').files[0].size);
  var file = document.getElementById('uploadFile').files[0];
  if(file){
    document.getElementById("uploadButtonText").style.fontSize = 12 + "px";
    document.getElementById("uploadButtonText").style.paddingTop = 24 + "px";
    //getAsText(file, filename);
    getAsDataURL(file, filename);
  }
}

function getAsText(readFile, filename) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-16      
  //reader.readAsText(readFile, "UTF-16");
  reader.readAsText(readFile);

  document.getElementById("uploadButtonText").innerHTML = 'Loading ' + filename;

  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded(filename);
  reader.onerror = errorHandler;
}

//base64_decode(file) before storing it.
//At the server, you must split the base64 string by "," and store only the second part - so mime type will not get stored with actual file content.
function getAsDataURL(readFile, filename)
{
  var reader = new FileReader();
  
  // Read file into memory as UTF-16      
  //reader.readAsText(readFile, "UTF-16");
  reader.readAsDataURL(readFile);

  document.getElementById("uploadButtonText").innerHTML = 'Loading ' + filename; 

  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}



function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    //console.log(loaded);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
      document.getElementById("uploadButtonText").innerHTML = 'Loading... (' + loaded * 100 + '%)'; 
      //console.log('Loading... (' + loaded * 100 + ')');
    }
  }
}

function loaded(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  // Handle UTF-16 file dump
  var filename = document.getElementById('uploadFile').files[0].name;

  //console.log(filename);
  //console.log(fileString);
  //console.log(user[0].inID);

  $.ajax({url:"./saveResume.php", 
       data: {id: user[0].inID, resume: fileString },
       type:'post',
       async:false
  });



  document.getElementById("uploadButtonText").style.fontSize = 21 + "px";
  document.getElementById("uploadButtonText").style.paddingTop = 22 + "px";
  document.getElementById("uploadButtonText").innerHTML = 'Complete'; 

}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
    document.getElementById("uploadButtonText").style.fontSize = 21 + "px";
    document.getElementById("uploadButtonText").style.paddingTop = 22 + "px";
    document.getElementById("uploadButtonText").innerHTML = 'Error'; 
  }
}









decodeBase64 = function(s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
};




function windowResize()
{
  //console.log("windowResize");
  //var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var w=Math.min(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]);
  var h=Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]);


  var screen = document.getElementById("screen");
  if(screen)
  {
    screen.style.height = h + "px";
    screen.style.width = w + "px";
  }
  var focus = document.getElementById("focus");
  if(focus)
  {
    focus.style.height = h + "px";
    focus.style.width = w + "px";
  }
}



Object.size = function(obj)
{
    var size = 0, key;
    for (key in obj)
    {
      if (obj.hasOwnProperty(key) && obj[key]) size++;
    }

    return size;
};



if (!Object.keys)
{
  Object.keys = function (obj)
  {
    var op, result = [];
    for (op in obj)
    {
      if (obj.hasOwnProperty(op)) { result.push(op); }
    }
    return result;
  };
}




/*
// Return new array with duplicate values removed
Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      //console.log(this[i]);
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };
*/


window.onbeforeunload = function(e) {
  if(window.isDirty) {return 'Dialog text here.';}
  else return undefined;
};



