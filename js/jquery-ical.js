/*
* First plugin 
*
* @author Maarten Hus
*/
(function($){
    var eventdates = {};
    var currDate;
    var calObj;
    var createCalFn;
    $.fn.ical = function(options){
        $.fn.ical.defaults = {
           daynames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //default short names for the days of the week
           monthnames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
           startdate: new Date(), // The date the calender should take as start point
           eventdates: {},
           multiSelect: false,
           click: function(d, d0){},
           startOnSunday: true,
           beforeDay: function (insdate) {},
           beforeMonth: function(insdate) {},
           beforeYear: function(insdate) {}
        };
        
        var options = $.extend({}, $.fn.ical.defaults, options);
          
        return this.each(function(){
            var obj = $(this); //get the object
            calObj = $(this);
            window.multiSelect = options.multiSelect;
            window.dayClick = options.click;
            eventdates = options.eventdates;
            
            var insdate = options.startdate; //The date that gets used for calculating the month
            createCalendar(obj, insdate);
        });
   

        /**
        * Create the calendar
        */
        function createCalendar(obj, insdate){
            obj.html('');
            window.currDate = currDate = insdate;
            createNavigation(obj, insdate);
            createTable(obj); //create table
            addDatesToTable(obj, insdate);
            codabubble();
            createCalFn = arguments.callee;
        };
        
        /**
        * Create the navigation and handle its clicks
        */
        function createNavigation(obj, insdate){

            obj.prepend("<div id='nav-calendar'><div id='year'><span id='year-left-arrow' class='year-buttons'></span><span id='currentyear'>"+ insdate.getFullYear() +"</span><span id='year-right-arrow' class='year-buttons'></span></div>" + "<div id='month'><span id='month-left-arrow'></span><span id='currentmonth'>"+ options.monthnames[insdate.getMonth()] +"</span><span id='month-right-arrow'></span></div></div>");
                      
            $("#year-right-arrow", obj).click(function()
            {

                var month = insdate.getMonth() + 12;

                var presentMonth = insdate.getMonth();
                
                if (month > 11)
                {
                    month = presentMonth;
                    var year = insdate.getFullYear() + 1;
                    options.beforeYear(formatDate(year, month, 1));
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
                options.beforeMonth(formatDate(year, month, 1));
                
                date = new Date(year, month, 1);
                createCalendar(obj, date);
            });

            $("#year-left-arrow", obj).click(function()
            {

                var month = insdate.getMonth() - 12;

                var presentMonth = insdate.getMonth();
                
                if (month < 0)
                {
                    month = presentMonth;
                    var year = insdate.getFullYear() - 1;
                    options.beforeYear(formatDate(year, month, 1));
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
                options.beforeMonth(formatDate(year, month, 1));
                
                date = new Date(year, month, 1);
                createCalendar(obj, date);
            });

            $("#month-right-arrow", obj).click(function()
            {
                var month = insdate.getMonth() + 1;
                
                if (month > 11)
                {
                    month = 0;
                    var year = insdate.getFullYear() + 1;
                    options.beforeYear(formatDate(year, month, 1));
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
                options.beforeMonth(formatDate(year, month, 1));
                
                date = new Date(year, month, 1);
                createCalendar(obj, date);
            }); 
            
            $("#month-left-arrow", obj).click(function()
            {
                var month = insdate.getMonth() - 1;
                
                if (month < 0)
                {
                    month = 11;
                    var year = insdate.getFullYear() - 1;
                    options.beforeYear(formatDate(year, month, 1));
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
                options.beforeMonth(formatDate(year, month, 1));
                
                date = new Date(year, month, 1);
                createCalendar(obj, date);
            });         
        };
        
        /**
        * Create the table for the calendar
        */
        function createTable(obj){
            obj.append("<table class='icaltable'><thead><tr id='week-days'></tr></thead></table>"); //add a table 
            var index;
            for (var i = 0; i < options.daynames.length; i++) 
            {
	      if(options.startOnSunday) {index=i+6;} else{index=i;}
               $(".icaltable tr", obj).append("<th>"+ options.daynames[index%7] +"</th>"); //add the day header
            }

            $(".icaltable", obj).append("<tr><td colspan='7' id='separator'></td></tr>");
            $(".icaltable", obj).append("<tr><td colspan='7' id='clear-separator'></td></tr>");

        };
        
        function addDatesToTable(obj, insdate){
            var month = insdate.getMonth();
            var year  = insdate.getFullYear();
            
            var days = getDaysInMonth(year, month);
            var first = getFirstDayOfMonth(year, month); // 0 - 6
            var last = getLastDayOfMonth(year, month, days);// 0 - 6 
            
            var afterpadding = 6 - last; // week minus the last day of the month = afterpadding
            
            var firstrow = true;
            
            var startOnSunday = 0;
                        
            if (options.startOnSunday){
                if (first == 6)
                {
                    startOnSunday = -6;
                }
                else
                {
                    startOnSunday = 1;
                }
            }   

            for (var i = 1; i <= days; i++) //each day in month
            {
                if ((first + i - 1 + startOnSunday) % 7 === 0 || firstrow === true ) //add new tr for each new monday our if i is zero
                {
                    $(".icaltable", obj).append("<tr></tr>");
                }
                
                for(var j = 0; j < first + startOnSunday && firstrow; j++) //add pre padding
                {
                    $(".icaltable tr:last", obj).append("<td class = 'padding'></td");
                }
                
                firstrow = false; //no more pre padding
                
                var month = getMonthNumber($("#currentmonth", obj).text());
                var year = $("#currentyear", obj).text();
                
                var formatdate = formatDate(year, month, i);
                
                var jsondates  = getEventDates(formatdate)
                
                if (jsondates.length === 0)
                {
                    options.beforeDay(formatdate);
                    $(".icaltable tr:last", obj).append("<td id = '"+formatdate+"' onmouseover='if(this.className.indexOf(\"date_click\") > -1) {this.className=\"date_mouseover date_click \" + this.className} else{this.className=\"date_mouseover \" + this.className}' onmouseout='if(this.className.indexOf(\"date_click\") > -1) {} else{if(this.className.indexOf(\"today\") > -1) {this.className=\"today\"} else {this.className=\"\"}}' onclick='if(!multiSelect){$(\".icaltable\").find(\"td\").not(this).removeClass(\"date_mouseover date_click\");} if(this.className.indexOf(\"date_click\") > -1) {if(this.className.indexOf(\"today\") > -1) {this.className=\"today date_mouseover\"} else {this.className=\"date_mouseover\"}} else {this.className=\"date_click \" + this.className} dayClick(this.innerHTML + \".\" + (currDate.getMonth()+1) + \".\" + currDate.getFullYear());' >"+i+"</td"); //add day
                }
                else
                {
                    var firstEvent = true;
                    for (var k = 0; k < jsondates.length; k++)
                    {
                        var datejson = jsondates[k];
                        options.beforeDay(formatdate);
                        
                        //alert(datejson.title);
                            
                        var str = "<li><span class='title'>"+ datejson.title +"</span><span class='desc'>"+ datejson.desc +"</span></li>"
                        
                        if (firstEvent)
                        {
                            $(".icaltable tr:last", obj).append("<td class='date_has_event " + datejson.className + "' id = '"+ formatdate +"'>"+i+"<div class='events'><ul id ='ul-"+ formatdate +"'>"+ str +"</ul></div></td>"); //add day  
                            firstEvent = false;
                        }
                        else
                        {
                            $("#ul-" + formatdate, obj).append(str);
                        }
                    }
                }
            };
            
            if (options.startOnSunday){
                startOnSunday = 1;
            } 

            for (var i = 0; i < afterpadding - startOnSunday; i++) //add after padding
            {
                $(".icaltable tr:last", obj).append("<td class = 'padding'></td");
            }
            
            highlightToday(obj);
        };
        
        function getMonthNumber(month){
            for (var i = 0; i < options.monthnames.length; i++)
            {
                if (options.monthnames[i] === month)
                {
                    return i;
                }
            }
        };
        
        function getDaysInMonth(year, month){
            return 32 - new Date(year, month, 32).getDate();
        };
        
        function highlightToday(obj){
            var today = new Date();
            today = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
            $("#"+today, obj).addClass("today");
        };
        
        function getEventDates(date){
            
            var results = [];
            
            for (var i = 0;  i < eventdates.length; i++)
            {     
                var evaldate = evaluateEventDate(eventdates[i]["date"], date);
                if (date === evaldate)
                {
                    results.push(eventdates[i]);
                } 
            }
            
            return results;
        };
        
        function evaluateEventDate(eventdate, date){
            var eventdate = eventdate.split('-');
            var date = date.split('-');
            
            if (eventdate[0] === 'yyyy')
            {
                eventdate[0] = date[0];
            }
            
            if (eventdate[1] === 'mm') 
            {
                eventdate[1] = date[1];
            }
            
            if (eventdate[2] === 'dd')
            {
                eventdate[2] = date[2];
            }
            
            return eventdate[0]+'-'+eventdate[1]+'-'+eventdate[2];
        };

        function getLastDayOfMonth(year, month, days){
            var date = new Date(year, month, days);
            if (date.getDay() == 0)//we start on monday!
            {
                return 6;
            }
            else
            {
                return date.getDay() -1;
            }
        };
            
        function getFirstDayOfMonth(year, month){
            var date = new Date(year, month, 1);
            if (date.getDay() == 0) //we start on monday!
            {
                return 6;
            }
            else
            {
                return date.getDay() -1;
            }
        };
        
        function formatDate (year, month, day){    
            return year+'-'+formatMonth(month)+'-'+formatDay(day);
        };
        
        function formatMonth(month){
            month = month + 1;
            
            if (month < 10)
            {
                month = '0'+month;
            }
            
            return month; 
        };
        
        function formatDay(day){
            if (day < 10) 
            {
                day = '0'+day;
            }
            
            return day;
        };
        
        function codabubble(){ //Stefano Verna
            $('.date_has_event').each(function () {
                // options
                var distance = 10;
                var time = 250;
                var hideDelay = 175;

                var hideDelayTimer = null;

                // tracker
                var beingShown = false;
                var shown = false;

                var trigger = $(this);
                var popup = $('.events ul', this).css('opacity', 0);

                // set the mouseover and mouseout on both element
                $([trigger.get(0), popup.get(0)]).mouseover(function () {
                    // stops the hide event if we move from the trigger to the popup element
                    if (hideDelayTimer) clearTimeout(hideDelayTimer);

                    // don't trigger the animation again if we're being shown, or already visible
                    if (beingShown || shown) {
                        return;
                    } else {
                        beingShown = true;

                        // reset position of popup box
                        popup.css({
                            bottom: 5,
                            left: -105,
                            display: 'block' // brings the popup back in to view
                        })

                        // (we're using chaining on the popup) now animate it's opacity and position
                        .animate({
                            bottom: '+=' + distance + 'px',
                            opacity: 1
                        }, time, 'swing', function() {
                            // once the animation is complete, set the tracker variables
                            beingShown = false;
                            shown = true;
                        });
                    }
                }).mouseout(function () {
                    // reset the timer if we get fired again - avoids double animations
                    if (hideDelayTimer) clearTimeout(hideDelayTimer);

                    // store the timer so that it can be cleared in the mouseover if required
                    hideDelayTimer = setTimeout(function () {
                        hideDelayTimer = null;
                        popup.animate({
                            bottom: '-=' + distance + 'px',
                            opacity: 0
                        }, time, 'swing', function () {
                            // once the animate is complete, set the tracker variables
                            shown = false;
                            // hide the popup entirely after the effect (opacity alone doesn't do the job)
                            popup.css('display', 'none');
                        });
                    }, hideDelay);
                });
            });  
        };
    };
    
    window.createCalendar = this.createCalendar;

    $.fn.ical.changeEventDates = function(array){
       eventdates = array;
    };
    window.refreshCalendar = function(){
      //console.log('HERE');
      //console.log(calObj);
      //console.log(currDate);
      //console.log(createCalFn);
      createCalFn(calObj, currDate);
    };

    
})(jQuery);
