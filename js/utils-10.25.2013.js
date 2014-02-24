var curr = 0;
var initStr = new Array();
var scrolled = 0;
var scrollHeight = 200;

var lockScroll = 0;

var services = [];
var schedule = [];

var mails = [];

//var dateArray = ["10/25/2013","10/27/2013","10/29/2013","10/30/2013"];
var dateArray = [];
var dayArray = [];
var dayNumber;
var dayIndex;
var monthIndex;



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


var inProfile;

  <!-- NOTE: be sure to set onLoad: onLinkedInLoad -->
    function onLinkedInLoad() {
      IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
      IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
    }


  function loadInfoFromLinkedIn()
  {

    productStore.data.each(function(item, index, totalItems)
    {
      var ID = item.get('ID');

      //console.log(ID);
      console.log(productStore.getById(ID).data.inID);
      //if(1)
      //{
        IN.API.Profile(productStore.getById(ID).data.inID)
          .fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "headline", "location:(name)", "industry", "summary", "positions"])
          .result(function(result) {
            var currProfile = result.values[0];
            console.log(currProfile.firstName);
            console.log(currProfile.positions.values[0].company.name);
            productStore.getById(ID).data.company = currProfile.positions.values[0].company.name;
            console.log(productStore.getById(ID).data.company);
          })
        .error(function(err) {
          console.log(err);
        });
      //}
      var first = item.get('first');
      var last = item.get('last');
    }); //productStore.data.each

  } //loadInfoFromLinkedIn()


    function onLinkedInLogout() {
      setLoginBadge(false);
    }

    function onLinkedInLogin() {
      // we pass field selectors as a single parameter (array of strings)
      loadInfoFromLinkedIn();
      IN.API.Profile("me")
      .fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "headline", "location:(name)", "industry", "summary", "positions"])
      .result(function(result) {
        inProfile = result.values[0];
        setLoginBadge(result.values[0]);
      })
      .error(function(err) {
        alert(err);
      });
    }

    function setLoginBadge(profile) {
      if (!profile) {
        profHTML = '<a href="#" onclick="IN.User.authorize(); return true;">login/create account</a>';
      }
      else {
        var pictureUrl = profile.pictureUrl || "http://static02.linkedin.com/scds/common/u/img/icon/icon_no_photo_80x80.png";
        profHTML = "<p><a href=\"" + profile.publicProfileUrl + "\">";
        profHTML = profHTML + "<img align=\"baseline\" src=\"" + pictureUrl + "\"></a>";      
        profHTML = profHTML + "&nbsp; Welcome <a href=\"" + profile.publicProfileUrl + "\">";
        profHTML = profHTML + profile.firstName + " " + profile.lastName + "</a>! <a href=\"#\" onclick=\"IN.User.logout(); return false;\">logout</a></p>";
        profHTML = profHTML + "<p>" + profile.headline + "</p><p>" + profile.summary + "</p><p>" + JSON.stringify(profile) + "</p><p>" + profile.location.name + "</p>";
        profHTML = 'Welcome ' + profile.firstName + ' ' + ' <a href="#" onclick="IN.User.logout(); return true;"><img src="images/logoutLittle-up.png" style="height: 25px;" onmouseover="this.src=\'images/logoutLittle-dn.png\';" onmouseout="this.src=\'images/logoutLittle-up.png\';"/></a>';
      }

      document.getElementById('login').innerHTML = profHTML;

      var summary = JSON.stringify(profile.positions.values[0].summary);
      summary = summary.replace(/\\n/g, '<br />');
      summary = summary.replace(/\\t/g, '  ');

      var d = new Date();
      var c = d.getFullYear();
      var tenure = c - profile.positions.values[0].startDate.year;

      //document.getElementById("loginbadge").innerHTML = '';
      //document.getElementById("companyBox").innerHTML = profile.positions.values[0].company.name;
      //document.getElementById("titleBox").innerHTML = profile.positions.values[0].title;
      //document.getElementById("bioBox").innerHTML = summary;
      //document.getElementById("tenureBox").innerHTML = tenure + ' years';

      //document.getElementById("picture-url").style.backgroundImage="url(\'" + pictureUrl + "\')";
      //document.getElementById("firstName").innerHTML = profile.firstName;

    }







Ext.onReady(function()
{







  window.createCookie = function(name,value,days)
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


  window.readCookie = function(name)
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

  window.eraseCookie = function(name) {createCookie(name,"",-1);}
  window.deleteCookie = function(name) {createCookie(name,"",-1);}


  window.listCookies = function()
  {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += theCookies[i-1] + "\n";
    }
    return aString;
  }









        var scrollbar = document.createElement("div");
        scrollbar.className = "scrollbar";
        scrollbar.style.width = 320 + 'px';
        scrollbar.innerHTML = '<img class="opaque50" src="images/scrollLeft.png" style="position: absolute; left: -40px; height: 30px;" onclick="javascript:prev();" onmouseover="this.style.cursor = \'pointer\'; this.src=\'images/scrollLeft_over.png\';" onmouseout="this.src=\'images/scrollLeft.png\';"/><img class="opaque50" src="images/scrollRight.png" style="position: absolute; right: -40px; height: 30px;" onclick="javascript:next();" onmouseover="this.style.cursor = \'pointer\'; this.src=\'images/scrollRight_over.png\';" onmouseout="this.src=\'images/scrollRight.png\';"/>';

        var slider = document.createElement("div");
        slider.className = "slider";

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

	slider.style.top = 0 + "px";


        slider.appendChild(position);
        scrollbar.appendChild(slider);

        scrollbar.style.top = 280 + 'px';
        scrollbar.style.left = 230 + 'px';
        //scrollbar.style.background = "transparent";
        //alert(parseInt((this.holderWidth / 2) - this.center,10) + 'px');
        //this.scrollbar.style.width = 500 + 'px';
        //this.scrollbar.style.height = 20 + 'px';
        //this.scrollbar.style.border = "1px solid #FF0000";

	if(document.getElementById('slider')) {document.getElementById('slider').appendChild(scrollbar);}



  window.loadProducts = function (exp)
  {

    var regExp = exp || ".";
    regExp = regExp.replace(/\s+/g, "|");
    var matchRE = new RegExp(regExp, "i");
    //console.log(regExp);

    initStr = [];
    curr = 0;

    productStore.data.each(function(item, index, totalItems)
    {
      var pID = item.get('ID');

      var first = item.get('first');
      var last = item.get('last');
      var bArray = new Array();
      if(item.get('help')) {bArray = item.get('help');}

      var found = first.match(matchRE);
      found += last.match(matchRE);
      for(var idx = 0; idx < bArray.length; idx++)
      {
        //alert(bArray[idx]);
        if(bArray[idx]) {found += bArray[idx].match(matchRE);}
      }
      image = 'http://s.c.lnkd.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_60x60_v1.png';
      image = 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';
      
      if(found)
      {
        initStr.push({src: image, label: {description: item.get('first') + ' ' + item.get('last'), price: item.get('last'), url: item.get('url'), high: image, id: item.get('ID'), company: item.get('company') || 'Amazon'}});
      }
    }); //productStore.data.each

    showLabel(curr);
    setSliderPosition(curr);
  } //loadProducts()


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
              position.innerHTML = '' + (relPos + 1);
            else
              position.innerHTML = (relPos + 1);

            //this.slider.style.top = this.Scrollbar.center.y - this.scrollbar.center.y +"px";

  }



  var showLabel = function(n)
  {

    //console.log(initStr.length);
    //if(Ext.get("labelName"))      {Ext.get("labelName").stopFx();}
    //if(Ext.get("labelOfferings")) {Ext.get("labelOfferings").stopFx();}

    if(initStr.length)
    {
      var ID = initStr[n].label.id;
      //console.log(ID);

      // --Name--
      var first = productStore.getById(ID).data.first;
      var last = productStore.getById(ID).data.last;
      var url = productStore.getById(ID).data.url;
      var link = '<a href="' + url + '" target="_blank" style="color: #75891C; font-size:12px; font-weight:100;">LinkedIn Profile</a>';
      var label = first + ' ' + last;

      // --Offerings--
      var services = productStore.getById(ID).data.help;
      var help = '';
      for(var i = 0; i < services.length; i++)
      {

	//<img src="images/Interview Tips.jpg" alt="Img" height="130" width="197" onmouseover='this.parentNode.parentNode.style.backgroundImage="url(images/framesHi.png)"; this.src="images/Interview TipsOver.jpg";' onmouseout='this.parentNode.parentNode.style.backgroundImage="url(images/frames.png)"; this.src="images/Interview Tips.jpg";' onclick='serviceClicked(this);'>


        help += '<li><div class="frame1"><div class="box"><img src="' + 'images/' + services[i] + '.jpg' + '" alt="' + services[i] + '" height="130" width="197" onmouseover=\"this.parentNode.parentNode.style.backgroundImage=\'url(images/framesHi.png)\'; this.src=\'' + 'images/' + services[i] + 'Over.jpg' + '\';\" onmouseout=\"this.parentNode.parentNode.style.backgroundImage=\'url(images/frames.png)\'; this.src=\'' + 'images/' + services[i] + '.jpg\';\" onclick=\"serviceClicked(this);\"></div></div><p><b>' + services[i] + '</b></p></li>';
      }
      //console.log(help);

      // --Company--
      var company =  productStore.getById(ID).data.company || "Amazon";

      // --Position--
      var position =  productStore.getById(ID).data.position || "Employee";

      // --Image--
      var image = productStore.getById(ID).data.image || "http://s.c.lnkd.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_60x60_v1.png";
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';
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

      // --Position--
      var position =  "--";

      // --Image--
      var image = "images/noresults.png";
    }





    if(Ext.get("labelName"))
      {
    Ext.get("labelName").fadeOut({opacity: 0.2, easing: 'easeOut', duration: 100, callback: function() {document.getElementById('labelName').innerHTML = label;} });
    Ext.get("labelCompany").fadeOut({opacity: 0.3, easing: 'easeOut', duration: 100, callback: function() {document.getElementById('labelCompany').innerHTML = company;} });
    Ext.get("labelProfile").fadeOut({opacity: 0.3, easing: 'easeOut', duration: 100, callback: function() {document.getElementById('labelProfile').innerHTML = position;} });
    Ext.get("labelLink").fadeOut({opacity: 0.3, easing: 'easeOut', duration: 100, callback: function() {document.getElementById('labelLink').innerHTML = link;} });
    Ext.get("image").fadeOut({opacity: 0.3, easing: 'easeOut', duration: 100, callback: function() {document.getElementById('image').src = image;} });

    Ext.get("services").fadeOut({opacity: 0.3, easing: 'easeOut', duration: 100, callback: function() {document.getElementById('services').innerHTML = help;} });


    Ext.get("labelName").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
    Ext.get("labelCompany").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
    Ext.get("labelProfile").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
    Ext.get("labelLink").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
    Ext.get("image").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});

    Ext.get("services").fadeIn({opacity: 1, easing: 'easeIn', duration: 500});
    }

  } //showLabel()


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
  var bArray = new Array();
  if(productStore.getById(ID).data.help) {bArray = productStore.getById(ID).data.help;}

  var found = first.match(matchRE);
  found += last.match(matchRE);
  for(var idx = 0; idx < bArray.length; idx++)
  {
    //alert(bArray[idx]);
    if(bArray[idx]) {found += bArray[idx].match(matchRE);}
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









//var rect = document.getElementById("scrollCurl").getBoundingClientRect();
//var scrollStart = rect.top;


  //var rect = document.getElementById("scrollPageContent").getBoundingClientRect();
  //scrollHeight = document.getElementById("scrollPageContent").clientHeight + rect.top;

  
  doSearch();
  //loadProducts();

  loadSchedule();
  var calEl = Ext.getCmp('myCal');
  if(calEl) {calEl.update(calEl.activeDate, true);}

  //showLabel(curr);
  //setSliderPosition(curr);
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






String.prototype.isPrintable=function()
{
  var re=/[^ -~]/;
  return !re.test(this);
}


function ellipsizeTextBox(id)
{
  var el = document.getElementById(id);
  var keep = el.innerHTML;
  //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
  while(el.scrollHeight > el.offsetHeight)
  {
    el.innerHTML = keep;
    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
    keep = el.innerHTML;
    el.innerHTML = el.innerHTML + "...";
  }   
}

function ellipsizeMailBox(el, idx)
{
  //var el = document.getElementById(id);
  var keep = el.innerHTML;
  //console.log(idx);
  if(!mail[idx]) {mail[idx] = keep};
  //console.log(el.scrollHeight + ' > ' + el.offsetHeight);
  while(el.scrollHeight > el.offsetHeight)
  {
    el.innerHTML = keep;
    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
    keep = el.innerHTML;
    el.innerHTML = el.innerHTML + "...";
  }   
}

function getMailIndex(el)
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

function unEllipsizeMailBox(el)
{
   var idx = getMailIndex(el);
   //console.log(idx);
   el.innerHTML = mail[idx];
   el.parentNode.style.height = el.scrollHeight + 'px';
}



function ellipsizeMailBoxes(id)
{
  var el = document.getElementById(id);
  var child = el.firstChild;
  var idx = 0;

  while(child)
  {
    while(child && child.nodeType !== 1){child = child.nextSibling;}
    if(child)
    {
      child.style.height = 60 + 'px';
      var contentEl = child.getElementsByTagName('div');
      //console.log(contentEl[0].innerHTML);
      ellipsizeMailBox(contentEl[0], idx++)
      child = child.nextSibling;
    }
  }
}



function doSearch()
{
  //console.log(window.location.href);
  var hash = (window.location.href.split("?")[1] || "");
  var tag = hash.split("=")[1] || "";
  hash = hash.split("\.")[0] || "";
  //console.log(hash);
  //console.log(tag);
  document.getElementById('sortInput').value = tag;
  loadProducts(tag);
  document.getElementById('sortInput').focus();
}


function serviceClicked(el)
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
    services[file] = false;
    if(document.getElementById("makeApptBlister") && !getNumServices())
    {
      var blister = document.getElementById("makeApptBlister");
      blister.style.display = "none";
      document.getElementById("calContainer").style.display="none";
      document.getElementById("infoContents").style.display="";
      lockScroll = 0;
    }
  }
  else
  {
    el.src = "images/" + file + "Selected.jpg";
    el.onmouseout=function() {} ;
    el.onmouseover=function() {} ;
    services[file] = true;
    if(document.getElementById("makeApptBlister"))
    {
      var blister = document.getElementById("makeApptBlister");
      blister.style.display = "";
      lockScroll = 0;
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




function makeAppt()
{


  var ID = initStr[curr].label.id;
  // --Name--
  var first = productStore.getById(ID).data.first;
  var last = productStore.getById(ID).data.last;
  var name = first + '_' + last;

  if(document.getElementById("infoContents"))
  {
    var el = document.getElementById("infoContents");
    el.style.display = "none";
    if(document.getElementById("infoContentsWrapper"))
    {
      el = document.getElementById("infoContentsWrapper");
      //var cal = document.createElement("div");
      //cal.id = name;
      //el.appendChild(cal);


      if(!document.getElementById("calContainer"))
      {

    var container = document.createElement("div");
    container.id = "calContainer";
    container.style.marginRight = 0 + "px";
    container.style.marginTop = 0 + "px";

    var title = document.createElement("div");
    title.id = "calTitle";
    title.innerHTML = '<div class="sidebar"><ul class="contact"><li><p><span class="name"></span><em id="labelName">' + first + ' ' + last + '\'s' + ' calendar</em></p></li></ul></div>';
    title.style.marginTop = 0 + "px";
    container.appendChild(title);


    var window = document.createElement("div");
    window.className = "show-cal";
    window.id = "show-cal";
    window.style.marginRight = 20 + "px";
    window.style.marginTop = -20 + "px";
    
    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.parentNode.style.display=\'none\'; document.getElementById(\'infoContents\').style.display=\'\';"></div>';
    close.style.float = "right";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);


    var content = document.createElement("div");
    content.className = "showCalContent";
    content.id = "showCalContent";
    window.appendChild(content);

    container.appendChild(window);
    el.appendChild(container);
    

	}
        else
	{
          document.getElementById("calTitle").innerHTML = '<div class="sidebar"><ul class="contact"><li><p><span class="name"></span><em id="labelName">' + first + ' ' + last + '\'s' + ' calendar</em></p></li></ul></div>';
          document.getElementById("calContainer").style.display = "";
	}

if(Ext.getCmp('myCalendar')) {Ext.getCmp('myCalendar').destroy();}
// define the calendar.
    var myCal = new Ext.DatePicker({
        //renderTo: 'calendar2',
        listeners: {
            'select': function(date_picker, date){
	      console.log("HERE");
              dayNumber = date.getDay();
              dayIndex = date.getDate();
              monthIndex = date.getMonth()+1;
              year = date.getFullYear();
              scheduleThisDay();
           }
        },
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
  }
}



function setGroup(groupName, controlValue)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    r[i].checked = controlValue ? true : false;
  }
}

function getGroup(groupName, controlValue)
{
  var itemStr = '';
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    if(r[i].checked == controlValue) {itemStr += r[i].value + '\n';}
  }
  return itemStr ? itemStr : '';
}



window.scheduleThisDay = function ()
{
  makeDatesAvailableThisDay(dayIndex, monthIndex, year);
}

function applySelection()
{
  var itemStr = '';
  var r = document.getElementsByName('days');
  for (var i = 0; i < r.length; i++)
  {
    if(r[i].checked == true) {itemStr = r[i].id;}
  }
  //console.log(itemStr);
  if(itemStr == 'justThisDay') {makeDatesAvailableThisDay(dayIndex, monthIndex, year);}
  else if(itemStr == 'thisDayAllMonth') {makeDatesAvailableThisMonth(dayIndex, monthIndex, year);}
  else if(itemStr == 'thisDayAll') {makeDayAvailable(dayIndex, monthIndex, year, dayNumber);}
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
      //console.log("MATCH");
      cellItems[c].title = title ? title : me.disabledDatesText;
      cellItems[c].className = title ? me.cellCls : me.disabledCellCls + ' ' + me.cellCls;
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
  var calendar = Ext.getCmp('myCal');
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
  var customTitle = "AVAILABLE:\n" + sch;

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




function makeDatesAvailableThisDay(day, month, year, cal)
{

  var calendar
  var calID = cal || 'myCal';
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
  var sch = getGroup('checked', true);
  var customTitle = "AVAILABLE:\n" + sch;

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


function pad(number, length)
{
  var str = '' + number;
  while (str.length < length) {str = '0' + str;}
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
    close.style.float = "right";
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
  if(! document.getElementById("showCal"))
  {
    var window = document.createElement("div");
    window.className = "show-cal";
    window.id = "showCal";
    var close = document.createElement("div");
    close.innerHTML = '<div class="close-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'close-dn\';" onmouseout="this.className=\'close-up\';" onclick="this.parentNode.parentNode.style.display=\'none\';"></div>';
    close.style.float = "right";
    close.style.marginRight = 0 + "px";
    close.style.padding = 4 + "px";
    window.appendChild(close);

    var gear = document.createElement("div");
    gear.innerHTML = '<div class="gear-up" onmouseover="this.style.cursor=\'pointer\'; this.className=\'gear-dn\';" onmouseout="this.className=\'gear-up\';" onclick="window.location=\'selectAvailability.html\';"></div>';
    gear.style.float = "right";
    gear.style.padding = 4 + "px";
    gear.style.paddingTop = 15 + "px";
    gear.style.clear = "both";
    window.appendChild(gear);

    var content = document.createElement("div");
    content.className = "showCalContent";
    content.id = "showCalContent";
    window.appendChild(content);

    parent.appendChild(window);
    



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
}



function loadSchedule()
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
