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


function disableGroup(groupName, controlValue)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    r[i].disabled = false;
    var control = r[i].title ? r[i].title : r[i].value;
    //console.log(control + " = " + controlValue[control]);
    r[i].disabled = controlValue[control] ? false : true;
    if(r[i].disabled) {r[i].parentNode.lastChild.className = r[i].parentNode.lastChild.className + ' disabled';}
  }
}



function enableGroup(groupName)
{
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    r[i].disabled = false;
    if(r[i].parentNode.lastChild.className)
    {
      r[i].parentNode.lastChild.className = r[i].parentNode.lastChild.className.replace('disabled','');
    }
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


function getTimeGroup(groupName, controlValue)
{
  var itemStr = '';
  var r = document.getElementsByName(groupName);
  for (var i = 0; i < r.length; i++)
  {
    //if(r[i].checked == controlValue) {itemStr += r[i].value + '\n';}
    if(r[i].checked == controlValue)
    {
      var timeObj = convertTimeTo12(r[i].value + ':' + '00');
      var hour = timeObj.hour;
      var minute = timeObj.minute;
      var ampm = timeObj.ampm;
      localTimeStr = hour + ampm;

      itemStr += localTimeStr + '<br>';
    }
  }
  return itemStr ? itemStr : '';
}




function getGroupSelections(checkbox, combobox, controlValue)
{
  var itemStr = '';

  var check = document.getElementsByName(checkbox);
  var combo = document.getElementById(combobox);
  //console.log(combo);

  for (var i = 0; i < check.length; i++)
  {
    //console.log(check[i].value);
    if((check[i].checked == controlValue) && (!check[i].disabled)) {itemStr += check[i].value + ' -- ' + combo.options[combo.selectedIndex].text + '<br>';}
  }
  //console.log("ITEMSTR: " + itemStr);
  return itemStr;
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


function getSubTotal()
{

  var subTotal = 0;
  var currService;
  var provider = members.getMember(app.getProviderID());
  //console.log(ID);

  // --Services--
  var services = provider.getProvidedServices();

  var sch = getGroupSelections('serviceTime', 'selectServiceComboBox', true);
  //console.log(sch);
  app.cartItems[app.getProviderID() + ':' + app.getApptDay()] = sch;

  var split = sch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    currService = split[i];
    currService = currService.replace(/.*\s\-\-\s/,'');
    currService = currService.replace(/\s*\$.*/,'');
    //console.log(currService);
    subTotal += parseFloat(services[currService].price);
    //console.log(subTotal);
  }
  var sTotal = document.getElementById("payment-card-amount");
  if(split.length-1 && currService)
    sTotal.innerHTML = split.length-1 + " hours of " + currService + " $" + currencyFormatted(subTotal);
  else
    sTotal.innerHTML = "$" + currencyFormatted(subTotal);
  sTotal.style.display = '';

  return subTotal;
}



function getSubTotalFromSch(sch, ID)
{

  var subTotal = 0;
  //console.log(ID);

  var provider = members.getMember(ID);
  //console.log(ID);

  // --Services--
  var services = provider.getProvidedServices();

  //var sch = getGroupSelections('apptTime', 'selectService', true);
  //console.log(sch);
  var split = sch.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    var currService = split[i];
    currService = currService.replace(/.*\s\-\-\s/,'');
    currService = currService.replace(/\s*\$.*/,'');
    //console.log(i + ': ' + currService);
    if(services[currService]) {subTotal += parseFloat(services[currService].price);}
    //console.log(i + ': ' + subTotal);
  }
  return parseFloat(subTotal);
}


function prependFilterOption(id, option)
{
  if(!id || !option) {return;}
  var select = document.getElementById(id);
  var opt = new Option(option, option);
  select.insertBefore(opt, select.firstChild);
  select.selectedIndex = 0;
}

function addFilterOptions(id, options)
{
  if(!id || !options) {return;}

  //console.log("ID: " + id);
  var r = document.getElementById(id);
  //console.log(r);
  removeChildren(r);
  //console.log(options.length);
  for(var j = 0; j < options.length; j++)
  {
    //console.log("ADDING: " + selected[j]);
    var opt = document.createElement('option');
    opt.value = options[j];
    opt.innerHTML = options[j];
    if(!r.disabled) {r.appendChild(opt);}
  }
  if(r.options.length == 2) {r.selectedIndex = 1;}
}

function addOptions2(id, options)
{
  if(!id || !options) {return;}

  //console.log("ID: " + id);
  var r = document.getElementById(id);
  //console.log(r);
  removeChildren(r);
  //console.log(options.length);
  for(var j = 0; j < options.length; j++)
  {
    //console.log("ADDING: " + selected[j]);
    var opt = document.createElement('option');
    opt.value = options[j];
    opt.innerHTML = options[j];
    if(!r.disabled) {r.appendChild(opt);}
  }
  if(r.options.length == 2) {r.selectedIndex = 1;}
}

function addEditServiceOptions(id, options)
{
  if(!id || !options) {return;}

  //console.log("ID: " + id);
  var r = document.getElementById(id);
  //console.log(r);
  //removeChildren(r[i]);
  //console.log(options.length);
  for(var j = 0; j < options.length; j++)
  {
    //console.log("ADDING: " + selected[j]);
    var opt = document.createElement('option');
    opt.value = options[j];
    opt.innerHTML = options[j];
    if(!r.disabled) {r.appendChild(opt);}
  }
  if(r.options.length == 2) {r.selectedIndex = 1;}
}

function addOptions(groupName, selected)
{
  var r = document.getElementsByName(groupName);
  //console.log(r);
  for (var i = 0; i < r.length; i++)
  {
    removeChildren(r[i]);
    //console.log(selected.length);
    for(var j = 0; j < selected.length; j++)
    {
      //console.log("ADDING: " + selected[j]);
      var opt = document.createElement('option');
      opt.value = selected[j];
      opt.innerHTML = selected[j];
      if(!r[i].disabled) {r[i].appendChild(opt);}
    }
    if(r[i].options.length == 2) {r[i].selectedIndex = 1;}
  }
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

function removeFilterChildren(el)
{
  //console.log("ID: " + id);
  var cell = el;
  if(!cell) {return;}
  if ( cell.hasChildNodes() )
  {
    while ( cell.childNodes.length > 1 )
    {
      cell.removeChild( cell.lastChild );       
    } 
  }
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


function startRead()
{  

  var re = /(?:\.([^.]+))?$/;

  // obtain input element through DOM 
  var filename = document.getElementById('uploadFile').files[0].name;
  var extension = re.exec(filename)[1]; 
  //console.log(extension);
  //console.log(document.getElementById('uploadFile').files[0].type);
  //console.log(document.getElementById('uploadFile').files[0].size);
  var file = document.getElementById('uploadFile').files[0];
  if(file)
  {
    document.getElementById("uploadButtonText").style.fontSize = 12 + "px";
    document.getElementById("uploadButtonText").style.paddingTop = 24 + "px";
    //getAsText(file, filename);
    getAsDataURL(file, filename);
  }
}

function getAsText(readFile, filename)
{
  
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



function updateProgress(evt)
{
  if (evt.lengthComputable)
  {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    //console.log(loaded);
    if (loaded < 1)
    {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
      document.getElementById("uploadButtonText").innerHTML = 'Loading... (' + loaded * 100 + '%)'; 
      //console.log('Loading... (' + loaded * 100 + ')');
    }
  }
}

function loaded(evt)
{  
  // Obtain the read file data    
  var fileString = evt.target.result;
  // Handle UTF-16 file dump
  var filename = document.getElementById('uploadFile').files[0].name;

  //console.log(filename);
  //console.log(fileString);

  $.ajax({url:"./php/saveResume.php", 
         data: {id: app.getUserID(), resume: fileString },
         type:'post',
        async:false
  });

  document.getElementById("uploadButtonText").style.fontSize = 21 + "px";
  document.getElementById("uploadButtonText").style.paddingTop = 22 + "px";
  document.getElementById("uploadButtonText").innerHTML = 'Complete'; 
}

function errorHandler(evt)
{
  if(evt.target.error.name == "NotReadableError")
  {
    // The file could not be read
    document.getElementById("uploadButtonText").style.fontSize = 21 + "px";
    document.getElementById("uploadButtonText").style.paddingTop = 22 + "px";
    document.getElementById("uploadButtonText").innerHTML = 'Error'; 
  }
}

function decodeBase64(s)
{
  var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
  var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for(i=0;i<64;i++){e[A.charAt(i)]=i;}
  for(x=0;x<L;x++)
  {
    c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
    while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
  }
  return r;
}



if (!Object.size)
{

  Object.size = function(obj)
  {
    var size = 0, key;
    for (key in obj)
    {
      if (obj.hasOwnProperty(key) && obj[key]) size++;
    }

    return size;
  };
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

function getDateIndexes(longDateStr)
{
  //console.log(longDateStr);
  longDateStr = longDateStr.replace(/,/g,"");
  var split = longDateStr.split(" ");
  var weekDay = split[0];
  var monthName = split[1];
  var dayIndex = split[2];
  var year = split[3];
  var monthIndex = null;
  
  for(var i = 0; i < app.MONTHS.length; i++)
  {
    if(monthName == app.MONTHS[i]) {monthIndex = i+1; break;}
  }  
  for(var i = 0; i < app.DAYS.length; i++)
  {
    if(weekDay == app.DAYS[i]) {weekDay = i; break;}
  }  
  return {dayIndex: dayIndex, monthIndex: monthIndex, year: year, weekDay: weekDay};
}


function localizeTime(time, day, month, year)
{
  //console.log("LOCALIZETIME: " + time);
  var member = members.getMember(app.getUserID());
  var provider = members.getMember(app.getProviderID());
  

  var tzPRV = provider.getTZname();
  var tzUSR = member.getTZname();

  //console.log("PROVIDER TIME ZONE: " + tzPRV);
  //console.log("USER TIME ZONE: " + tzUSR);

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


function localizeApptScheduler(day, month, year)
{


  var member = members.getMember(app.getUserID());

	var r = document.getElementsByName("serviceTime");
	for (var i = 0; i < r.length; i++)
	{
	  //console.log(r[i].value);
	  var localTimeObj = localizeTime(r[i].value, day, month, year);
	  var localTime = localTimeObj.localTimeStr;
          //console.log(localTime);
          //console.log(localTimeObj.dateObj.getHours());
          //console.log(r[i]);
	  //r[i].value = localTime;

	  var timeObj = convertTimeTo12((localTimeObj.dateObj.getHours()) + ':' + '00');
	  var hour = timeObj.hour;
	  var minute = timeObj.minute;
	  var ampm = timeObj.ampm;
	  localTimeStr = hour + ':' + minute + ampm;

	  var timeObj = convertTimeTo12((localTimeObj.dateObj.getHours()+1) + ':' + '00');
	  var hour = timeObj.hour;
	  var minute = timeObj.minute;
	  var ampm = timeObj.ampm;
	  localTimeStrPlusOne = hour + ':' + minute + ampm;

	  var textNode = localTimeStr + ' - ' + localTimeStrPlusOne;
          //console.log(textNode);
          //console.log(r[i].parentNode.id);
          //console.log(r[i].parentNode.lastChild.innerHTML);
          //console.log(r[i].parentNode.innerHTML);
          r[i].parentNode.lastChild.innerHTML = textNode;

	  if(i == 1)
	  {
	    var date = localTimeObj.dateObj;
	    var tzUSR = member.getTZname();
	    var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
	    var headerDate = document.getElementById("myApptHeaderDate");
	    if(headerDate) {headerDate.innerHTML = dayNames[date.getDay()] + '  ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';}
	  }
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
        var localTimeObj = localizeTime(split[i], thisDayIndex, thisMonthIndex, thisYear);
        var localTime = localTimeObj.localTimeStr;

	var timeObj = convertTimeTo12((localTimeObj.dateObj.getHours()) + ':' + '00');
	var hour = timeObj.hour;
	var minute = timeObj.minute;
	var ampm = timeObj.ampm;
	localTimeStr = hour + ':' + minute + ampm;

	var timeObj = convertTimeTo12((localTimeObj.dateObj.getHours()+1) + ':' + '00');
	var hour = timeObj.hour;
	var minute = timeObj.minute;
	var ampm = timeObj.ampm;
	localTimeStrPlusOne = hour + ':' + minute + ampm;

	var textNode = localTimeStr + ' - ' + localTimeStrPlusOne;



        if(!dateStr)
        {
          var date = localTimeObj.dateObj;
          var member = members.getMember(inID);
          var provider = members.getMember(app.getProviderID());

          var tzUSR = provider.getTZname();
          var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
          dateStr = app.DAYS[date.getDay()] + '  ' + app.MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';
	}
        //console.log(localTime);
        //split[i] = localTime;
        split[i] = textNode;
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
        var localTimeObj = localizeTime(apptSplit[0], thisDayIndex, thisMonthIndex, thisYear);
        var localTime = localTimeObj.localTimeStr;
        if(!dateStr)
        {
          var date = localTimeObj.dateObj;
          var member = members.getMember(inID);
          var provider = members.getMember(app.getProviderID());

          var tzUSR = provider.getTZname();
          var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
          dateStr = app.DAYS[date.getDay()] + '  ' + app.MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';
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


function setGroupsFromCalendar(checkbox, schedule)
{

  //console.log(schedule);
  var check = document.getElementsByName(checkbox);


  var isAPPT = false;
  var isAVAIL = false;
  var providerName = "";

  var provider = members.getMember(app.getProviderID());

  //console.log(ID);
  // --Name--
  var name = provider.getFullName();
  //console.log(name);

  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  //enableGroup(checkbox);
  setGroup(checkbox, false);
  //console.log(schedule);
  var split = schedule.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    //console.log(split[i]);
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);

    if(appt) {isAPPT = true; providerName = split[i].split(/\:\s*/)[1]; continue;}
    else if(avail) {isAppt = false; continue;}
    //console.log(name + '==' + providerName);
    if(isAPPT) {continue;}

    //console.log(name + '==' + providerName);
    for (var j = 0; j < check.length; j++)
    {
      var value = split[i].split(' ')[0];

      var timeStr = Number(value.match(/^(\d+)/)[1]) + ':00' + ' ' + value.match(/([ap]m)/);
      timeStr = timeStr.replace(/\,[ap]m$/,'');
      //console.log(timeStr);
      value = convertTimeTo24(timeStr).hour;

      var service = split[i].split(' -- ')[1];
      //console.log(check[j].value + " <-> " + value);
      //if(check[j].value == value) {check[j].checked = true;}//combo[i].options[combo[i].selectedIndex].text
      if(check[j].value == value) {check[j].disabled = false; check[j].checked = true;}
    }
  }
}



function setGroupsFromSchedule(checkbox, schedule)
{

  //console.log(schedule);
  var check = document.getElementsByName(checkbox);


  var isAPPT = false;
  var isAVAIL = false;
  var providerName = "";

  var provider = members.getMember(app.getProviderID());

  //console.log(ID);
  // --Name--
  var name = provider.getFullName();
  //console.log(name);

  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  //enableGroup(checkbox);
  setGroup(checkbox, false);
  //console.log(schedule);
  var split = schedule.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    //console.log(split[i]);
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);

    if(appt) {isAPPT = true; providerName = split[i].split(/\:\s*/)[1];}
    else if(avail) {isAppt = false;}
    //console.log(name + '==' + providerName);
    if(!isAPPT || name != providerName) {continue;}

    //console.log(name + '==' + providerName);
    for (var j = 0; j < check.length; j++)
    {
      var value = split[i].split(' ')[0];
      var service = split[i].split(' -- ')[1];
      //console.log(check[j].value + " <-> " + value + " : " + service + " [" + comboItems[service] + "]");
      //if(check[j].value == value) {check[j].checked = true;}//combo[i].options[combo[i].selectedIndex].text
      if(check[j].value == value) {check[j].disabled = false; check[j].checked = true;}
    }
  }
}

function disableGroupsFromSchedule(checkbox, schedule)
{

  var check = document.getElementsByName(checkbox);


  var isAPPT = false;
  var isAVAIL = false;
  var providerName = "";
  var provider = members.getMember(app.getProviderID());

  //console.log(ID);
  // --Name--
  var name = provider.getFullName();

  //console.log('DAY: ' + dayIndex + ' MONTH: ' + monthIndex + ' YEAR: ' + year);
  //setGroup(checkbox, false);
  var split = schedule.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
    //console.log(split[i]);
    var matchRE = new RegExp("APPT", "i");
    var appt = split[i].match(matchRE);
    var matchRE = new RegExp("AVAILABLE", "i");
    var avail = split[i].match(matchRE);

    if(appt) {isAPPT = true; providerName = split[i].split(/\:\s*/)[1];}
    else if(avail) {isAppt = false;}
    //console.log(name + '==' + providerName);
    if(!isAPPT || name == providerName) {continue;}

    for (var j = 0; j < check.length; j++)
    {
      var value = split[i].split(' ')[0];
      var service = split[i].split(' -- ')[1];
      //console.log(check[j].value + " <-> " + value + " : " + name);
      if(check[j].value == value) {check[j].checked = true; check[j].disabled = true;}
    }
  }
}



function localizeCartItem(item, inID, thisDayIndex, thisMonthIndex, thisYear)
{
  var returnStr = "";
  var dateStr = "";

  //console.log(inID);
  var split = item.split('<br>');
  for(var i = 0; i < split.length-1; i++)
  {
      if(split[i])
      {
        //console.log(split[i]);
        var exploded = split[i].split(' ');
        var time = exploded.shift();
        //console.log("TIME: " + time);
        var localTimeObj = localizeTime(time, thisDayIndex, thisMonthIndex, thisYear);
        var localTime = localTimeObj.localTimeStr;

	var timeObj = convertTimeTo12((localTimeObj.dateObj.getHours()) + ':' + '00');
	var hour = timeObj.hour;
	var minute = timeObj.minute;
	var ampm = timeObj.ampm;
	localTimeStr = hour + ':' + minute + ampm;

        var textNode = localTimeStr + ' ' + exploded.join(' ');
        if(!dateStr)
        {
          var date = localTimeObj.dateObj;
          var member = members.getMember(inID);
          var provider = members.getMember(app.getProviderID());

          var tzUSR = provider.getTZname();
          var tzAbbreviation = date.getTimezoneAbbreviation() || tzUSR;
          dateStr = app.DAYS[date.getDay()] + '  ' + app.MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' (' + tzAbbreviation + ')';
	}
        //console.log(localTime);
        //split[i] = localTime;
        split[i] = textNode;
        //console.log(split[i]);
      }
    }
  return {sch: split.join('<br>'), dateStr: dateStr};
}













function waitGeolocation()
{
  if(!app.localityObj.locality)
  {
    //console.log('Waiting...Locality: ' + app.localityObj.locality);
    countdown = setTimeout('waitGeolocation()', 500);
  }
  else
  {
    //console.log(app.localityObj);
    //console.log(app.localityObj.locality);
    var opts = new Array();
    opts.push(app.localityObj.locality);
    opts.push(app.localityObj.postalCode + ' area code');
    opts.push(app.localityObj.county);
    opts.push(app.localityObj.province);
    addOptions('localitySelect', opts);
  }
}



function getServiceFromSchedule(schedule)
{
  //07:00pm -- Interview Mentoring<br>08:00pm -- Interview Mentoring<br> 
  var split = schedule.split('<br>');
  var duration = split.length-1;
  var service = split[0].split(/\s*--\s*/)[1];
  return {service: service, duration: duration};
}




function getLocality()
{
  getCurrentPosition();
}


function getCurrentPosition()
{
  //console.log("getLocality");
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
  else
  {
    app.localityObj.locality = "unknown";
  }
}





//Get the latitude and the longitude;
function successFunction(position)
{
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng);
    //console.log(app.localityObj.locality);
}

function errorFunction()
{
  //alert("Geocoder failed");
}


function codeLatLng(lat, lng)
{

  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat, lng);
  var locality;
  var province;
  var postalCode;
  var county;
  geocoder.geocode({'latLng': latlng}, function(results, status)
  {
    if (status == google.maps.GeocoderStatus.OK)
    {
      //console.log(results)
      if (results[2])
      {
        postalCode = results[2].address_components[0].long_name;
        locality = results[2].address_components[1].long_name;
        county = results[2].address_components[2].long_name;
        province = results[2].address_components[3].long_name;
      }
      //console.log("postalCode: " + postalCode);
      //console.log("locality: " + locality);
      //console.log("county: " + county);
      //console.log("province: " + province);
    }
    app.localityObj.postalCode = postalCode;
    app.localityObj.county = county;
    app.localityObj.province = province;
    app.localityObj.locality = locality;

  });
}
