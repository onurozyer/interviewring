// -----
// Members and member objects
// -----
 /*jslint laxcomma:true, laxbreak:true, expr:true*/
  // Constructor, which is similar to that of the native Date object itself
  function application()
  {
    if(this === application) {throw "application object must be constructed with 'new'";}

    this.VERSION = '0.0.1';
    this.formItems = {"communication skills":"","technical knowledge":"","seniority level":"","overall feedback":""};

    this.filters = {"industry":"", "company":"", "rating":['5 star','4 star','3 star','2 star', '1 star', '0 star'], "experience":['40+ years', '30-39 years', '20-29 years', '10-19 years', '5-9 years', '0-4 years'], "services":['In-person Interview','Remote Interview','Interview Mentoring','Resume Review'], "price":['FREE', '$0.01-49/hr', '$50-99/hr', '$100-149/hr' , '$150-199/hr', '$200-249/hr', '$250+/hr']};

    this.historyFilters = {"status":['Scheduled','Waiting Feedback','Completed'], "date":['< 1 month ago', '1-3 months ago', '4-6 months ago', '7-12 months ago', '> 1 year ago'], "companyH":""};

    this.DAYS = application.Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.MONTHS = application.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.SHORT_MONTHS = {};
    this.SHORT_DAYS = {};

    //`{ "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 }`
    for (var i = 0; i < this.MONTHS.length; i++)
    {
      this.SHORT_MONTHS[i] = this.MONTHS[i].substr(0, 3);
    }

    //`{ "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6 }`
    for (i = 0; i < this.DAYS.length; i++)
    {
      this.SHORT_DAYS[i] = this.DAYS[i].substr(0, 3);
    }


    this.inID = null;
    this.providerID = null;
    this.apptDay = null;
    this.paymentReturn = false;
    this.socialShareReturn = false;
    this.rateReturn = false;
    this.feedbackReturn = false;
    this.returnParameters = {};
    this.cartItems = {};

    this.usersLoaded = false;
    this.sortedFilteredList = [];
    this.currInterviewer = 0;
  }

  // Implements methods for Class
  application.prototype =
  {
    constructor: application
    ,getUserID: function () { return this.inID; }

    ,getProviderID: function () { return this.providerID; }

    ,getApptDay: function () { return this.apptDay; }

    ,loadUsers: function ()
    {
      var me = this;
      //console.log('loadUsers');
      $.ajaxSetup({ cache: false });

      $.ajax({
       url:"./php/loadData.php",
       type:'get',
       async:false,
       success:function(result)
       {
         //console.log(result + " " + result.length);
         if(result.length <= 3) {return;}
         var obj = JSON.parse(result, false);

         //console.log(result[0].id);
         //console.log(obj);
         obj = JSON.parse(obj, false);
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
         var providerHistory;
         var history;
         var feedback;
         var reviews;
         var coins;
         var resume;


         for(var i=0;i < obj.length;i++)
         {
	   //console.log(obj[i].id);
           inID = obj[i].id;
           linkedINprofile = obj[i].linkedINprofile || '{}';
	   tzName = obj[i].tzName;
	   //email = obj[i].email;
	   //education = obj[i].education;
	   role = obj[i].role;
	   providedServices = obj[i].services || '{}';
	   calendar = obj[i].calendar || '{}';
	   mail = obj[i].mail || '{}';
	   privacy = obj[i].privacy || '{}';
	   cart = obj[i].cart || '{}';
	   providerHistory = obj[i].providerHistory || '{}';
	   history = obj[i].history || '{}';
	   feedback = obj[i].feedback || '{}';
	   reviews = obj[i].rating || '{}';
	   coins = obj[i].coins;
	   resume = obj[i].resume;
	   
	   var temp = resume.split(/\,/)[1];
	   if(temp) {resume = decodeBase64(temp);}
	   
	   //console.log("LOADING: " + inID);
	   var newMember = new members.member(inID);
	   newMember.profile = JSON.parse(linkedINprofile);
	   newMember.tzName = tzName;
	   newMember.role = role;
	   newMember.providedServices = JSON.parse(providedServices);
	   newMember.calendar = JSON.parse(calendar);
	   newMember.mail = JSON.parse(mail);
	   newMember.privacy = JSON.parse(privacy);
	   newMember.cart = JSON.parse(cart);
	   newMember.providerHistory = JSON.parse(providerHistory);
	   newMember.history = JSON.parse(history);
	   newMember.feedback = JSON.parse(feedback);
	   newMember.reviews = JSON.parse(reviews);
	   newMember.coins = coins;
	   newMember.resume = resume;

           me.createFilters(newMember);
           me.setFilterKeys(newMember);
	 }//for

	 me.usersLoaded = true;
       }//function
      });//ajax
     //console.log("users loaded");
    } //loadUsers()

    ,createFilters: function(member)
    {
      var me = this;
      var industry = member.getIndustry();
      var company = member.getCompany();
      //console.log("COMPANY: " + company);
      var services = member.getProvidedServices();
      var numServices = Object.size(services);

      if(numServices && (member.getRole() === 'give' || member.getRole() === 'both'))
      {
	var found = 0;
	if(!me.filters.industry) {me.filters.industry = new Array();}
	for(var i = 0; i < me.filters.industry.length; i++) {if(me.filters.industry[i] === industry) found++;}
	if(!found && industry) {me.filters.industry.push(industry);}


	found = 0;
	if(!me.filters.company)  {me.filters.company = new Array();}
	for(var i = 0; i < me.filters.company.length; i++) {if(me.filters.company[i] === company) found++;}
	if(!found && company) {me.filters.company.push(company);}

	me.filters.industry = me.filters.industry ? me.filters.industry.sort() : {};
	me.filters.company = me.filters.company ? me.filters.company.sort() : {};
      }
    } //createFilters()

    ,setFilterKeys: function(member)
    {
      var me = this;

      member.industryFilter = member.getIndustry();
      member.companyFilter = member.getCompany();

      // --Services--
      var LO = 999999;
      var HI = 0;
      var services = member.getProvidedServices();
      for (var key in services)
      {
	if(parseFloat(services[key].price) < LO) {LO = parseFloat(services[key].price);}
	if(parseFloat(services[key].price) > HI) {HI = parseFloat(services[key].price);}
      }

      // --Rating --
      var ratingObj = member.getReviews();
      var rating = Math.ceil(ratingObj.average) || 0;

      for(var key in me.filters)
      {
	if(key == 'price')
	{
	  //console.log("PRICE");
	  var items = me.filters[key];
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
	      member.priceFilter = items[i];
	    }
	  }
	  //console.log("SET TO: " + member.priceFilter);
	}
	else if(key == 'rating')
	{
	  //console.log("PRICE");
	  var items = me.filters[key];
	  for(var i = 0; i < items.length; i++)
	  {
	    var item = items[i];
	    //console.log(item);
	    item = item.replace(/\s*star/,'');
	    var star = parseInt(item,10);
	    //console.log(LO + "->" + " LO: " + priceLO + " HI: " + priceHI);
	    if(rating == star)
	    {
	      member.ratingFilter = items[i];
	    }
	  }
	  //console.log("SET TO: " + member.ratingFilter);
	}
	else if(key == 'experience')
	{
	  //console.log("EXPERIENCE");
	  var items = me.filters[key];
	  for(var i = 0; i < items.length; i++)
	  {
	    var item = items[i];
	    //console.log(item);
	    item = item.replace(/\s*years/,'');
	    var split = item.split('-');
	    var expLO = parseFloat(split[0]);
	    var expHI = parseFloat(split[1]) || parseFloat('0');
	    var experience = parseInt(member.getIndustryTenure(member.getIndustry()),10) || 0;
	    //console.log(experience + "->" + " LO: " + expLO + " HI: " + expHI);
	    if(experience >= expLO && experience <= expHI)
	    {
	      member.experienceFilter = items[i];
	    }
	  }
	  //console.log("SET TO: " + member.experienceFilter);
	}
      }
      //console.log("SET TO: " + member.priceFilter);
      //console.log("SET TO: " + member.ratingFilter);
      //console.log("SET TO: " + member.experienceFilter);
    } //setFilterKeys()

    ,searchInterviewers: function (exp)
    {

      var me = this;
      //console.log("searchInterviewers");

      //console.log('loadSearchItems');
      var regExp = exp || ".";
      regExp = regExp.replace(/\s+/g, "|");
      var matchRE = new RegExp(regExp, "i");
      //console.log(regExp);

      me.sortedFilteredList = [];
      me.currInterviewer = 0;
      members.each(function(item, index)
      {
        //console.log("EACH");
        //console.log(item);
        //console.log(item.get('linkedINprofile'));
	//console.log((!item.get('linkedINprofile') && !linkedINlogin));
        //console.log(item.get('role'));
	if(item.get('role') !== 'give' && item.get('role') !== 'both' || (!item.get('profile') && !me.usersLoaded)) {return;}

	var ID = item.get('ID');
	//console.log(ID);
	//console.log(inID);
	var first = item.getFirstName();
        //console.log("FIRST: " + first);
	var last = item.getLastName();
	var company = item.getCompany();
        //console.log("COMPANY: " + company);
	var position = item.getTitle();
	var industry = item.getIndustry();
	var summary = item.getSummary();
        //console.log("SUMMARY: " + summary);
	//console.log(first);
	//if(!first || !last || !company || !industry || !summary) {return;}
	//var summary = "Mixed Signal Design SAR ADC IP for next-gen touch screen controller PSoC 3 and PSoC 5 Chip Integration Test Vector Development and Fault Grading Developed system ROM firmware in M8C assembly for extending the life of flash memory and performed mixed Signal Verification";

	var preps = /(\s|^|>)((aboard|about|above|across|after|against|along|amid|among|anti|around|before|behind|below|beneath|beside|besides|between|beyond|concerning|considering|despite|down|during|except|excepting|excluding|following|from|inside|into|like|minus|near|onto|opposite|outside|over|past|plus|regarding|round|save|since|than|that|this|through|toward|towards|under|underneath|unlike|until|upon|versus|with|within|without)\s)+/gi;
  				


        //var preps = /(\s|^|>)((aboard|about|above|across|after|against|along|amid|among|anti|around|as|at|before|behind|below|beneath|beside|besides|between|beyond|but|by|concerning|considering|despite|down|during|except|excepting|excluding|following|for|from|in|inside|into|like|minus|near|of|off|on|onto|opposite|outside|over|past|per|plus|regarding|round|save|since|than|through|to|toward|towards|under|underneath|unlike|until|up|upon|versus|via|with|within|without)\s)+/gi;


        var smallwords = /(\s|^)(([a-zA-Z-_(]{1,2}(\'|’)*[a-zA-Z-_,;]{0,1}?\s)+)/gi; // words with 3 or less characters
  				

        //console.log(summary);

        // replace prepositions (greater than 3 characters)
        //summary = summary.replace(preps, function(contents, p1, p2) {return p1 + p2.replace(/\s/gi, '');});
        summary = summary.replace(preps, ' ');

        // replace small words
        //summary = summary.replace(smallwords, function(contents, p1, p2) {return p1 + p2.replace(/\s/g, '');});
        summary = summary.replace(smallwords, ' ');
        //console.log(summary);


        //console.log(first);
	var services = item.getProvidedServices();

        var found = first.match(matchRE);
        found += last.match(matchRE);
        found += company.match(matchRE);
        found += position.match(matchRE);
        found += industry.match(matchRE);
        found += summary.match(matchRE);
        if(ID == regExp) {found++;}
        for (var key in services)
        {
          //console.log("REGEX: " + regExp + " KEY: " + key);
          found += key.match(matchRE);
        }
      
        var numServices = Object.size(services);
        if(found && numServices)
        {
	  //console.log("PUSHING: " + item.get('ID'));
          me.sortedFilteredList.push({id: item.get('ID')}); 
        }
      }); //members.instances.each

      me.applyFilters();
      me.sortedFilteredList.sort(sortfunction)
      me.populateSearchItems();
			     //if(exp) {pruneFilters();}



      function sortfunction(a,b)
      {
	//Compare "a" and "b" in some fashion, and return <0, 0, or >0
	//Less than 0: Sort "a" to be a lower index than "b"
	//Zero: "a" and "b" should be considered equal, and no sorting performed.
	//Greater than 0: Sort "b" to be a lower index than "a".

	var e = document.getElementById("sortSearch");
	var opt = e.options[e.selectedIndex].value;
	var memberA = members.getMember(a.id);
	var memberB = members.getMember(b.id);
  
	if(opt == 'company')
	{
	  //console.log(memberA.getCompany());
	  if(memberA.getCompany() < memberB.getCompany()) {return -1;}
	  if(memberA.getCompany() > memberB.getCompany()) {return 1;}
	  return 0;
	}
	else if(opt == 'rating')
	{
	  var ratingObj = memberA.getReviews();
	  var arating = Math.ceil(ratingObj.average) || 0;
	  var areviews = ratingObj.total || 0;
	  var ratingObj = memberB.getReviews();
	  var brating = Math.ceil(ratingObj.average) || 0;
	  var breviews = ratingObj.total || 0;

	  //console.log("Rating A: " + arating + " Rating B: " + brating);
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
	  //console.log(memberA.getIndustryTenure() + ' ' + memberB.getIndustryTenure());
	  return (memberA.getIndustryTenure(memberA.getIndustry()) < memberB.getIndustryTenure(memberB.getIndustry()));
	}
	else if(opt == 'price')
	{
	  var aLO = 9999999;
	  var aHI = 0;
	  var bLO = 9999999;
	  var bHI = 0;


	  // --Services--
	  services = memberA.getProvidedServices();
	  for (var key in services)
	  {
	    if(parseFloat(services[key].price) < aLO) {aLO = parseFloat(services[key].price);}
	    if(parseFloat(services[key].price) > aHI) {aHI = parseFloat(services[key].price);}
	  }
	  // --Services--
	  services = memberB.getProvidedServices();
	  for (var key in services)
	  {
	    if(parseFloat(services[key].price) < bLO) {bLO = parseFloat(services[key].price);}
	    if(parseFloat(services[key].price) > bHI) {bHI = parseFloat(services[key].price);}
	  }

	  //console.log("aLO: " + aLO + " bLO: " + bLO);
	  return (aLO - bLO);
	}
	else {return 0;}
      } //sortfunction()

    } //loadSearchItems()


    ,applyFilters: function()
    {
      var me = this;
      
      var filterType = 'and';
      var filtered = new Array();
      var toSave = new Array();

      for(var j = 0; j <  me.sortedFilteredList.length; j++)
      {
	var ID =  me.sortedFilteredList[j].id;
        toSave[ID] = (filterType == 'and') ? true : false;
	//console.log("\n\nID: " + ID);
	var member = members.getMember(ID);

	for(var key in me.filters)
	{
	  //console.log("--KEY: " + key);
	  var filterName = 'filter_' + key;
	  var e = document.getElementById(filterName);
	  var opt = e.options[e.selectedIndex].value;
	  var value = member.get(key + 'Filter');
	  var found = (opt == key) ? true : false;
	  var currValue = (key != 'services') ? value : 'services';
	  //console.log("CURRVALUE: " + currValue);

	  if(key == 'services')
	  {
	    var services = member.getProvidedServices();
	    if(!Object.size(services)) {found = true;}
        
	    for (var service in services)
	    {
	      //console.log(service + ' == ' + opt);
              if(service == opt) {found = true;}
	    }
	  }//if(key == 'services')
	  else
	  {
	    //console.log(currValue + ' == ' + opt);
	    if(currValue == opt) {found = true;}
	  }
	  if(filterType == 'and')
	    toSave[ID] &= found;
          else
	    toSave[ID] |= found;
        }
      }
      for(var key in toSave)
      {
	if(toSave[key]) {filtered.push({id: key})};
      }
      me.sortedFilteredList = filtered;
    } //applyFilters()

    ,populateSearchItems: function()
    {
      //console.log('populateSearchItems');
      var me = this;
      var services = {};
      var imgID = '';

      document.getElementById("searchItems").innerHTML = '';
      //document.getElementById("resultsSearch").innerHTML = 'Search Results: ' + me.sortedFilteredList.length;

      for(var index = 0; index < me.sortedFilteredList.length; index++)
      {
	var ID = me.sortedFilteredList[index].id;
	//console.log(ID);
	var member = members.getMember(ID);

	var feedbackObj = member.getFeedback();
	var numFeedbacks = Object.size(feedbackObj);
	var interviewsStr = '<div style="position: absolute; top: 6px; width: 200px; color: #555;">Interviews: ' + numFeedbacks + '</div>';

	var charityCoins = member.getCoins();
	var charityCoinStr = '<div style="position: absolute; top: 30px; width: 200px; color: #555;"><img style="float:left; position: absolute; top:4px;" src="./img/coins.png"/><span style="position:absolute; top: -12px; left: -2px;">Charity Coins</span><span style="position:absolute; top:28px; left: 0px; width: 36px; text-align: center; border: 0px solid #00ff00;">' + charityCoins + '</span></div>';


	// --Rating--
	//var ratingStr = '';
	var ratingObj = member.getReviews();

	var rating = Math.ceil(ratingObj.average);
	var rates = ratingObj.total || 0;
	//console.log(ratingObj.comments);
	if(!rating) {rating = 0;}

	//var ratingStr = '<div style="clear:both;"><div class="i-review-summary-div">' + rates + ' reviews</div><div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(JSON.parse(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
	//ratingStr += '<div style="right: -6px;">';
	var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div class="i-review-summary-div">' + rates + ' reviews</div><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
	ratingStr += '<div style="right: -6px;">';
	for(var i = 0; i < rating; i++)
	{
	  ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
	}
	for(var i = rating; i < 5; i++)
	{
	  ratingStr += '<img src="./img/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
	}
	ratingStr += '</div></div></div></a>';
        //console.log(ratingStr);
        
	// --Name--
	var name = member.getFullName();
	var url = member.getURL();
	var link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a href="' + url + '" target="_blank" style="font-size:12px; font-weight:700; text-align: center;">LinkedIn Profile</a><hr></div>';

        //console.log(member.getProfile());


	// --Services--
	services = member.getProvidedServices();
	//console.log(services);

	// --Company--
	var company = member.getCompany() || '--';
	var companyTenure = member.getCompanyTenure(company);

	// --Industry--
	var industry = member.getIndustry() || '--';
	var industryTenure = member.getIndustryTenure(industry);

	// --Position--
	var position = member.getTitle() || '--';

	var education = member.getEducation() || '--';
	//  Only display most recent education
	var split = education.split('<br>');
	education = split[0];

	// --Image--
	var image = member.getImageSmall;
	//var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

	//if(settings[ID]['identity']) {name = ""; image = "./images/ghostSmall.png"; link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a target="_blank" style="font-size:12px; font-weight:100; text-align: center;">--</a><hr></div>';}






	var window = document.createElement("div");
	window.className = "interviewer-card";
	window.id = "searchItem" + index;
	//window.onclick = function() {makeAppt(this.id);};
	//window.onclick = new Function() ('showCheckOut(\'' + ID + '\');');
        window.onclick = new Function( 'showCheckOut(\'' + ID + '\')');

	var itemImage = document.createElement("div");
	itemImage.className = "circular-small";
	itemImage.style.background = 'url(' + image + ') no-repeat center center';
	//itemImage.style.background = 'url(' + image + ') no-repeat';
	//window.appendChild(itemImage);


	var itemInfoWrapper = document.createElement("div");
	itemInfoWrapper.id = "itemInfoWrapper" + index;
	//itemInfoWrapper.style.height = 110 + 'px';
	//itemInfoWrapper.style.height = 60 + 'px';
	itemInfoWrapper.style.overflow = 'hidden';
	//itemInfoWrapper.style.marginTop = -18 + "px";
	//itemInfoWrapper.style.border = "1px solid #00ff00";
    
	var icLeft = document.createElement("div");
        icLeft.className = "ic-left";

	var itemName = document.createElement("div");
        itemName.className = "ic-left-name";
	itemName.innerHTML = name;
	icLeft.appendChild(itemName);



        var icLeftInfo = document.createElement("div");
        icLeftInfo.className = "ic-left-info";

        var icLeftInfoLeft = document.createElement("div");
        //icLeftInfoLeft.style = "width: 80px; text-align: right; float:left; border-right: 1px dotted #ff5100; padding-right: 4px;";
        icLeftInfoLeft.style.width = 80 + 'px';
        icLeftInfoLeft.style.textAlign = 'right';
	icLeftInfoLeft.style.float = 'left';
	icLeftInfoLeft.style.borderRight = 1 + 'px dotted #ff5100';
	icLeftInfoLeft.style.paddingRight = 4 + 'px';

	var itemIndustry = document.createElement("div");
	//itemCompany.style.textAlign = "left";
	itemIndustry.innerHTML = '<p>' + 'industry' + '</p>';
	icLeftInfoLeft.appendChild(itemIndustry);

	var itemCompany = document.createElement("div");
	//itemCompany.style.textAlign = "left";
	itemCompany.innerHTML = '<p>' + 'company' + '</p>';
	icLeftInfoLeft.appendChild(itemCompany);

	var itemPosition = document.createElement("div");
	//itemPosition.style.textAlign = "left";
	itemPosition.innerHTML = '<p>' + 'title' + '</p>';
	icLeftInfoLeft.appendChild(itemPosition);

	var itemTenure = document.createElement("div");
	//itemCompany.style.textAlign = "left";
	itemTenure.innerHTML = '<p>' + 'tenure' + '</p>';
	icLeftInfoLeft.appendChild(itemTenure);

	var itemEducation = document.createElement("div");
	//itemEducation.style.textAlign = "left";
	itemEducation.innerHTML = '<p>' + 'education' + '</p>';
	icLeftInfoLeft.appendChild(itemEducation);



        var icLeftInfoRight = document.createElement("div");
        //icLeftInfoRight.style = "text-align: left; float: left; padding-left: 4px;";
        icLeftInfoRight.style.textAlign = 'left';
	icLeftInfoRight.style.float = 'left';
	icLeftInfoRight.style.paddingLeft = 4 + 'px';
        icLeftInfoRight.style.overflow = 'hidden';
        icLeftInfoRight.style.width = 550 + 'px';

	var itemIndustry = document.createElement("div");
	//itemCompany.style.textAlign = "left";
	itemIndustry.innerHTML = '<p>' + industry + '</p>';
	icLeftInfoRight.appendChild(itemIndustry);

	var itemCompany = document.createElement("div");
	//itemCompany.style.textAlign = "left";
	itemCompany.innerHTML = '<p>' + company + '</p>';
	icLeftInfoRight.appendChild(itemCompany);

	var itemPosition = document.createElement("div");
	//itemPosition.style.textAlign = "left";
	itemPosition.innerHTML = '<p>' + position + '</p>';
	icLeftInfoRight.appendChild(itemPosition);

	var itemTenure = document.createElement("div");
	//itemCompany.style.textAlign = "left";
	itemTenure.innerHTML = '<p>company: ' + companyTenure + 'yrs, industry: ' + industryTenure + 'yrs</p>';
	icLeftInfoRight.appendChild(itemTenure);

	var itemEducation = document.createElement("div");
	//itemEducation.style.textAlign = "left";
	itemEducation.innerHTML = '<p>' + education + '</p>';
	icLeftInfoRight.appendChild(itemEducation);

        icLeftInfo.appendChild(icLeftInfoLeft);
        icLeftInfo.appendChild(icLeftInfoRight);

	var itemRating = document.createElement("div");
	itemRating.innerHTML = ratingStr;
	icLeftInfo.appendChild(itemRating);


        icLeft.appendChild(icLeftInfo);
        itemInfoWrapper.appendChild(icLeft);









	var icRight = document.createElement("div");
        icRight.className = "ic-right";

	var itemName = document.createElement("div");
        itemName.className = "ic-right-name";
	itemName.innerHTML = 'services';
	icRight.appendChild(itemName);



        var icRightInfo = document.createElement("div");
        icRightInfo.className = "ic-right-info";

        var icRightInfoLeft = document.createElement("div");
        //icRightInfoLeft.style = "width: 150px; text-align: right; float:left; border-right: 1px dotted #ff5100; padding-right: 4px;";
        icRightInfoLeft.style.width = 150 + 'px';
        icRightInfoLeft.style.textAlign = 'right';
	icRightInfoLeft.style.float = 'left';
	icRightInfoLeft.style.borderRight = 1 + 'px dotted #ff5100';
	icRightInfoLeft.style.paddingRight = 4 + 'px';
        var icRightInfoRight = document.createElement("div");
        //icRightInfoRight.style = "text-align: left; float: left; padding-left: 4px;";
        icRightInfoRight.style.textAlign = 'left';
	icRightInfoRight.style.float = 'left';
	icRightInfoRight.style.paddingLeft = 4 + 'px';

        var icRightInfoLeftHTML = '';
        var icRightInfoRightHTML = '';
	for (var key in services)
	{
	  //console.log('KEY: ' + key + ' = ' + services[key]);//var s = obj.
	  var split = key.split(' ');
	  imgID = 'service' + split.pop();
	  //console.log("SETTING: " + imgID);
	  icRightInfoLeftHTML  += '<p>' + key + '</p>';
	  icRightInfoRightHTML += '<p>$' + services[key].price + '/hr<p>';
	}
        icRightInfoLeft.innerHTML = icRightInfoLeftHTML;
        icRightInfoRight.innerHTML = icRightInfoRightHTML;

        icRightInfo.appendChild(icRightInfoLeft);
        icRightInfo.appendChild(icRightInfoRight);
        icRight.appendChild(icRightInfo);

        var icRightBottom = document.createElement("div");
        icRightBottom.className = "ic-right-bottom";
        icRightBottom.innerHTML = '<button class="ic-right-schedule">schedule a service</button><button class="ic-right-linkedin"><a href="' + url + '" target="_blank">linkedin profile</a></button>';
        icRight.appendChild(icRightBottom);

        itemInfoWrapper.appendChild(icRight);

	window.appendChild(itemInfoWrapper);



	var itemLink = document.createElement("div");
	itemLink.innerHTML = link;
	//window.appendChild(itemLink);

	var numInterviews = document.createElement("div");
	numInterviews.innerHTML = interviewsStr;
	numInterviews.style.textAlign = 'left';
	//window.appendChild(numInterviews);

	var numCharityCoins = document.createElement("div");
	numCharityCoins.innerHTML = charityCoinStr;
	numCharityCoins.style.textAlign = 'left';
	//window.appendChild(numCharityCoins);


	var itemServices = document.createElement("div");
	//itemServices.innerHTML = help;
	//window.appendChild(itemServices);

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
	//window.appendChild(popup);

      }
    } //populateSearchItems()




    ,populateProfileItems: function()
    {
      //console.log('populateSearchItems');
      var me = this;
      var services = {};
      var imgID = '';

      document.getElementById("profileItems").innerHTML = '';
      //document.getElementById("resultsSearch").innerHTML = 'Search Results: ' + me.sortedFilteredList.length;

      var ID = me.getUserID();
      //console.log(ID);

      var member = members.getMember(ID);

      var numFeedbacks = member.getNumProvidedServices();
      //var interviewsStr = '<div class="review-summary-right">You\'ve helped <span class="number-of-people">' + numFeedbacks + '</span> people</div>';
      var interviewsStr = 'You\'ve helped <span class="number-of-people">' + numFeedbacks + '</span> people';

      var charityCoins = member.getCoins();
      var charityCoinStr = '<div style="position: absolute; top: 30px; width: 200px; color: #555;"><img style="float:left; position: absolute; top:4px;" src="./img/coins.png"/><span style="position:absolute; top: -12px; left: -2px;">Charity Coins</span><span style="position:absolute; top:28px; left: 0px; width: 36px; text-align: center; border: 0px solid #00ff00;">' + charityCoins + '</span></div>';


      // --Rating--
      //var ratingStr = '';
      var ratingObj = member.getReviews();

      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      //console.log(ratingObj.comments);
      if(!rating) {rating = 0;}

      //var ratingStr = '<div style="clear:both;"><div class="i-review-summary-div">' + rates + ' reviews</div><div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(JSON.parse(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
      //ratingStr += '<div style="right: -6px;">';
      var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div class="i-review-summary-div">' + rates + ' reviews</div><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
      ratingStr += '<div style="right: -6px;">';
      for(var i = 0; i < rating; i++)
      {
	ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = rating; i < 5; i++)
      {
	ratingStr += '<img src="./img/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '</div></div></div></a>';
      //console.log(ratingStr);
        
      // --Name--
      var name = member.getFullName();
      var url = member.getURL();
      var link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a href="' + url + '" target="_blank" style="font-size:12px; font-weight:700; text-align: center;">LinkedIn Profile</a><hr></div>';

      //console.log(member.getProfile());


      // --Services--
      services = member.getProvidedServices();
      //console.log(services);

      // --Company--
      var company = member.getCompany() || '--';
      var companyTenure = member.getCompanyTenure(company);

      // --Industry--
      var industry = member.getIndustry() || '--';
      var industryTenure = member.getIndustryTenure(industry);

      // --Position--
      var position = member.getTitle() || '--';

      var education = member.getEducation() || '--';
      //  Only display most recent education
      var split = education.split('<br>');
      education = split[0];

      // --Image--
      var image = member.getImageSmall;
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

      //if(settings[ID]['identity']) {name = ""; image = "./images/ghostSmall.png"; link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a target="_blank" style="font-size:12px; font-weight:100; text-align: center;">--</a><hr></div>';}






      var window = document.createElement("div");
      window.className = "schedule-page-interviewer-card";
      window.id = "profileItem";

      var itemImage = document.createElement("div");
      itemImage.className = "circular-small";
      itemImage.style.background = 'url(' + image + ') no-repeat center center';
      //itemImage.style.background = 'url(' + image + ') no-repeat';
      //window.appendChild(itemImage);


      var itemInfoWrapper = document.createElement("div");
      itemInfoWrapper.id = "itemInfoWrapper";
      //itemInfoWrapper.style.height = 330 + 'px';
      //itemInfoWrapper.style.height = 60 + 'px';
      itemInfoWrapper.style.overflow = 'hidden';
      //itemInfoWrapper.style.marginTop = -18 + "px";
      //itemInfoWrapper.style.border = "1px solid #00ff00";
    
      var icLeft = document.createElement("div");
      icLeft.className = "ic-left";
      icLeft.style.height = 330 + 'px';

      var itemName = document.createElement("div");
      itemName.className = "ic-left-name";
      itemName.innerHTML = name;
      icLeft.appendChild(itemName);



      var icLeftInfo = document.createElement("div");
      icLeftInfo.className = "ic-left-info";

      var icLeftInfoLeft = document.createElement("div");
      //icLeftInfoLeft.style = "width: 80px; text-align: right; float:left; border-right: 1px dotted #ff5100; padding-right: 4px;";
      icLeftInfoLeft.style.width = 80 + 'px';
      icLeftInfoLeft.style.textAlign = 'right';
      icLeftInfoLeft.style.float = 'left';
      icLeftInfoLeft.style.borderRight = 1 + 'px dotted #ff5100';
      icLeftInfoLeft.style.paddingRight = 4 + 'px';

      var itemIndustry = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemIndustry.innerHTML = '<p>' + 'industry' + '</p>';
      icLeftInfoLeft.appendChild(itemIndustry);

      var itemCompany = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemCompany.innerHTML = '<p>' + 'company' + '</p>';
      icLeftInfoLeft.appendChild(itemCompany);

      var itemPosition = document.createElement("div");
      //itemPosition.style.textAlign = "left";
      itemPosition.innerHTML = '<p>' + 'title' + '</p>';
      icLeftInfoLeft.appendChild(itemPosition);

      var itemTenure = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemTenure.innerHTML = '<p>' + 'tenure' + '</p>';
      icLeftInfoLeft.appendChild(itemTenure);

      var itemEducation = document.createElement("div");
      //itemEducation.style.textAlign = "left";
      itemEducation.innerHTML = '<p>' + 'education' + '</p>';
      icLeftInfoLeft.appendChild(itemEducation);



      var icLeftInfoRight = document.createElement("div");
      //icLeftInfoRight.style = "text-align: left; float: left; padding-left: 4px;";
      icLeftInfoRight.style.textAlign = 'left';
      icLeftInfoRight.style.float = 'left';
      icLeftInfoRight.style.paddingLeft = 4 + 'px';
      icLeftInfoRight.style.overflow = 'hidden';
      icLeftInfoRight.style.width = 550 + 'px';

      var itemIndustry = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemIndustry.innerHTML = '<p>' + industry + '</p>';
      icLeftInfoRight.appendChild(itemIndustry);

      var itemCompany = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemCompany.innerHTML = '<p>' + company + '</p>';
      icLeftInfoRight.appendChild(itemCompany);

      var itemPosition = document.createElement("div");
      //itemPosition.style.textAlign = "left";
      itemPosition.innerHTML = '<p>' + position + '</p>';
      icLeftInfoRight.appendChild(itemPosition);

      var itemTenure = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemTenure.innerHTML = '<p>company: ' + companyTenure + 'yrs, industry: ' + industryTenure + 'yrs</p>';
      icLeftInfoRight.appendChild(itemTenure);

      var itemEducation = document.createElement("div");
      //itemEducation.style.textAlign = "left";
      itemEducation.innerHTML = '<p>' + education + '</p>';
      icLeftInfoRight.appendChild(itemEducation);

      icLeftInfo.appendChild(icLeftInfoLeft);
      icLeftInfo.appendChild(icLeftInfoRight);

      var itemRating = document.createElement("div");
      itemRating.innerHTML = ratingStr;
      icLeftInfo.appendChild(itemRating);

      var itemInterviews = document.createElement("div");
      itemInterviews.className = "review-summary-right";
      itemInterviews.innerHTML = interviewsStr;
      icLeftInfo.appendChild(itemInterviews);

      icLeft.appendChild(icLeftInfo);
      itemInfoWrapper.appendChild(icLeft);









      var icRight = document.createElement("div");
      icRight.className = "ic-right";
      icRight.style.height = 330 + 'px';

      var itemName = document.createElement("div");
      itemName.className = "ic-right-name";
      itemName.innerHTML = 'select a service to edit';
      icRight.appendChild(itemName);



      var icRightInfo = document.createElement("div");
      icRightInfo.className = "ic-right-info";


      var serviceEditComboBox = document.createElement("select");
      serviceEditComboBox.className = "service-edit-combo-box";
      serviceEditComboBox.id = "serviceEditComboBox";
      serviceEditComboBox.onchange = function() {showItemToEdit(this.options[this.selectedIndex].value);};
      
      var serviceOptions = '<option value="na">select a service...</option>';
      serviceEditComboBox.innerHTML = serviceOptions;

      icRightInfo.appendChild(serviceEditComboBox);
      icRight.appendChild(icRightInfo);


      itemInfoWrapper.appendChild(icRight);

      window.appendChild(itemInfoWrapper);




      var schedulePageCard = document.createElement("div");
      schedulePageCard.className = "schedule-page-card-div";

      var scLeft = document.createElement("div");
      scLeft.className = "sc-left";

      var icLeftName = document.createElement("div");
      icLeftName.className = "ic-left-name";
      var linkToReviews = document.createElement("a");
      //linkToReviews.name = "link-to-reviews";
      linkToReviews.id = "link-to-reviews";
      linkToReviews.style.textDecoration = "none";
      linkToReviews.style.color = "#ff5100";
      linkToReviews.innerHTML = 'reviews';
      icLeftName.appendChild(linkToReviews);

      scLeft.appendChild(icLeftName);

      var comments = member.getReviews().comments;
      //console.log(comments);

      for (var key in comments)
      {
	//console.log(key);
        var inID = key.split(/:/)[0];
        //console.log(inID);
        var timeStamp = key.split(/:/)[1];
        var rating = comments[key].split(/:/)[0];
        var comment = comments[key].split(/:/)[1];
        //console.log(inID);
        //console.log(timeStamp);
        //console.log(rating);
        //console.log(comment);

        var reviewDiv = document.createElement("div");
        reviewDiv.className = "review-div";

        var member = members.getMember(ID);

        var name = member.getFullName();

        var reviewDivLeftPhoto = document.createElement("div");
        reviewDivLeftPhoto.className = "review-div-left-photo";
        var reviewDivLeftImg = document.createElement("img");
        reviewDivLeftImg.src = member.getImageSmall();
        reviewDivLeftPhoto.appendChild(reviewDivLeftImg);

        var commentDate = new Date(+timeStamp);
        var year =  commentDate.getFullYear();
        var month =  this.MONTHS[commentDate.getMonth()+1];
        var weekDay = this.DAYS[commentDate.getDay()];
        var day =  commentDate.getDate();
        var hours =  commentDate.getHours();
        var minutes =  commentDate.getMinutes();
        var seconds =  commentDate.getSeconds();

        var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year; 

        var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
        ratingStr += '<div style="right: -6px;">';
        for(var i = 0; i < rating; i++)
        {
	  ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
        }
        for(var i = rating; i < 5; i++)
        {
	  ratingStr += '<img src="./img/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
        }
        ratingStr += '</div></div></div></a>';

        var reviewDivRight = document.createElement("div");
        reviewDivRight.className = "review-div-right";

        var reviewDirNameDate = document.createElement("div");
        reviewDirNameDate.className = "review-dir-name-date";
        reviewDirNameDate.innerHTML = name + ' - ' + dateStr;

        var reviewDirStars = document.createElement("div");
        reviewDirStars.className = "review-dir-stars";
        reviewDirStars.innerHTML = ratingStr;

        var reviewDirText = document.createElement("div");
        reviewDirText.className = "review-dir-text";
        reviewDirText.innerHTML = comment;

        reviewDivRight.appendChild(reviewDirNameDate);
        reviewDivRight.appendChild(reviewDirStars);
        reviewDivRight.appendChild(reviewDirText);

        reviewDiv.appendChild(reviewDivLeftPhoto);
        reviewDiv.appendChild(reviewDivRight);
        scLeft.appendChild(reviewDiv);

      }
      schedulePageCard.appendChild(scLeft);

      var itemLink = document.createElement("div");
      itemLink.innerHTML = link;
      //window.appendChild(itemLink);

      var numInterviews = document.createElement("div");
      numInterviews.innerHTML = interviewsStr;
      numInterviews.style.textAlign = 'left';
      //window.appendChild(numInterviews);

      var numCharityCoins = document.createElement("div");
      numCharityCoins.innerHTML = charityCoinStr;
      numCharityCoins.style.textAlign = 'left';
      //window.appendChild(numCharityCoins);


      var itemServices = document.createElement("div");
      //itemServices.innerHTML = help;
      //window.appendChild(itemServices);

      document.getElementById("profileItems").appendChild(window);
      document.getElementById("profileItems").appendChild(schedulePageCard);


      var childID = "full_itemInfoWrapper";
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
      //window.appendChild(popup);

      var options = new Array();
      for (var key in services)
      {
	options.push(key);
      }

      addFilterOptions("serviceEditComboBox", options);


      function showItemToEdit(service)
      {
	 if(document.getElementById("schedulePageCard")) {document.getElementById("schedulePageCard").parentNode.removeChild(document.getElementById("schedulePageCard"));}
         
         var schedulePageCard = document.createElement("div");
         schedulePageCard.className = "schedule-page-card-div";
         schedulePageCard.id = "schedulePageCard";

         var scLeft = document.createElement("div");
         scLeft.className = "sc-left";

         var icLeftName = document.createElement("div");
         icLeftName.className = "ic-left-name";
         icLeftName.innerHTML = service;

         scLeft.appendChild(icLeftName);

         var scLeftInfo = document.createElement("div");
         scLeftInfo.className = "sc-left-info";
         var profilePageFee = document.createElement("div");
         profilePageFee.className = "profile-page-fee-div";

         var feeRow = document.createElement("div");
         feeRow.className = "fee-row";
         var hourlyFee = document.createElement("p");
         hourlyFee.innerHTML = 'hourly fee $';
         var hourlyFeeTextBox = document.createElement("input");
         hourlyFeeTextBox.className = "fee-text-box";
         hourlyFeeTextBox.type = "text";
         feeRow.appendChild(hourlyFee);
         feeRow.appendChild(hourlyFeeTextBox);
         profilePageFee.appendChild(feeRow);

         var feeRow = document.createElement("div");
         feeRow.className = "fee-row";
         var location = document.createElement("p");
         location.innerHTML = 'location';
         var locationSelect = document.createElement("select");
         feeRow.appendChild(location);
         feeRow.appendChild(locationSelect);
         profilePageFee.appendChild(feeRow);

         var feeRow = document.createElement("div");
         feeRow.className = "fee-row";
         var timezone = document.createElement("p");
         timezone.innerHTML = 'timezone';
         var timezoneSelect = document.createElement("select");
         feeRow.appendChild(timezone);
         feeRow.appendChild(timezoneSelect);
         profilePageFee.appendChild(feeRow);


         var scLeftInfoTitle = document.createElement("div");
         scLeftInfoTitle.className = "sc-left-info-title";
         var green = document.createElement("p");
         green.style.fontWeight = 'bold';
         green.innerHTML = 'green means available';
         scLeftInfoTitle.appendChild(green);

         var calendarTime = document.createElement("div");
         calendarTime.className="sc-left-calendar-time-div";

         var calContainer = document.createElement("div");
         calContainer.id="calContainer";
         calContainer.className="sc-left-calendar-div";
         var ical = document.createElement("div");
         ical.id="ical";
         calContainer.appendChild(ical);


         var timeSelection = document.createElement("div");
         timeSelection.className = "sc-left-time-selection-div";
         var hoursAppliesTo = document.createElement("div");
         hoursAppliesTo.className = "hours-applies-to-div";
         var appliesTo = document.createElement("p");
         appliesTo.style.fontWeight = 'bold';
         appliesTo.innerHTML = 'applies to';
         var calSelect = document.createElement("select");
         calSelect.style.marginLeft = 4 + 'px';
         calSelect.name = "calSelect";
         var lineBreak = document.createElement("br");
         hoursAppliesTo.appendChild(appliesTo);
         hoursAppliesTo.appendChild(lineBreak);
         hoursAppliesTo.appendChild(calSelect);






         var timeCheckBoxesDiv = document.createElement("div");
         for(var i = 7; i < 20; i++)
	 {
	   var checkBox = document.createElement("input");
           checkBox.type = "checkbox";
           checkBox.name = "serviceTime";
           checkBox.value = pad(i,2);


	   var timeObj = convertTimeTo12(i + ':' + '00');
	   var hour = timeObj.hour;
	   var minute = timeObj.minute;
	   var ampm = timeObj.ampm;
	   localTimeStr = hour + ':' + minute + ampm;

	   var timeObj = convertTimeTo12((i+1) + ':' + '00');
	   var hour = timeObj.hour;
	   var minute = timeObj.minute;
	   var ampm = timeObj.ampm;
	   localTimeStrPlusOne = hour + ':' + minute + ampm;

           var textNode = localTimeStr + ' - ' + localTimeStrPlusOne;
	   var label= document.createElement("label");
	   var description = document.createTextNode(textNode);
	   label.appendChild(checkBox);   // add the box to the element
	   label.appendChild(description);// add the description to the element
           timeCheckBoxesDiv.appendChild(label);
           timeCheckBoxesDiv.appendChild(document.createElement("br"));  
	 }
        
         var saveScheduleDiv = document.createElement("div");
         saveScheduleDiv.style.position = "relative";
         saveScheduleDiv.style.top = -400 + "px";
         saveScheduleDiv.style.left = 160 + "px";
         var saveSchedule = document.createElement("button");
         saveSchedule.innerHTML = "save schedule";
         saveScheduleDiv.appendChild(saveSchedule);

         timeSelection.appendChild(hoursAppliesTo);
         timeSelection.appendChild(lineBreak);
         timeSelection.appendChild(lineBreak);
         timeSelection.appendChild(timeCheckBoxesDiv);
         timeSelection.appendChild(saveScheduleDiv);

         calendarTime.appendChild(calContainer);
         calendarTime.appendChild(timeSelection);

         scLeftInfo.appendChild(profilePageFee);
         scLeftInfo.appendChild(scLeftInfoTitle);
         scLeftInfo.appendChild(calendarTime);

         scLeft.appendChild(scLeftInfo);

         schedulePageCard.appendChild(scLeft);
         //document.getElementById("profileItems").appendChild(schedulePageCard);

         document.getElementById("profileItems").insertBefore(schedulePageCard, document.getElementById("profileItems").lastChild);

	 var cal = $("#ical").ical({
	   startOnSunday: true,
	   click: function(d)
	   {
             //console.log('SELECTED: ' + d);
	     var split = d.split(".");
	     var year = parseInt(split[2],10);
	     var month = parseInt(split[1],10);
	     var day = parseInt(split[0],10);
      
	     //console.log(year+'/'+month+'/'+day);

	     var dtPRV = new timezoneJS.Date(year, month-1, day);
	     //console.log(app.DAYS[dtPRV.getDay()]);

	     var opts = new Array();
	     opts[0] = 'Just this ' + app.DAYS[dtPRV.getDay()] + ' (' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear() + ')';
	     opts[1] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getFullYear();
	     opts[2] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + dtPRV.getFullYear();
	     addOptions("calSelect", opts);

	   } // fired when user clicked on day, in "d" stored date
	 });

	var dtPRV = new timezoneJS.Date();
	//console.log(app.DAYS[dtPRV.getDay()]);

	var opts = new Array();
	opts[0] = 'Just this ' + app.DAYS[dtPRV.getDay()] + ' (' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear() + ')';
	opts[1] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getFullYear();
	opts[2] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + dtPRV.getFullYear();
	addOptions("calSelect", opts);



      } //showItemToEdit()


    } //populateProfileItems()



    ,populateScheduleItems: function(ID)
    {
      //console.log('populateScheduleItems: ' + ID);
      var me = this;



      var member = members.getMember(ID);

      var feedbackObj = member.getFeedback();
      var numFeedbacks = Object.size(feedbackObj);
      var interviewsStr = '<div style="position: absolute; top: 6px; width: 200px; color: #555;">Interviews: ' + numFeedbacks + '</div>';

      var charityCoins = member.getCoins();
      var charityCoinStr = '<div style="position: absolute; top: 30px; width: 200px; color: #555;"><img style="float:left; position: absolute; top:4px;" src="./img/coins.png"/><span style="position:absolute; top: -12px; left: -2px;">Charity Coins</span><span style="position:absolute; top:28px; left: 0px; width: 36px; text-align: center; border: 0px solid #00ff00;">' + charityCoins + '</span></div>';


      // --Rating--
      //var ratingStr = '';
      var ratingObj = member.getReviews();

      var rating = Math.ceil(ratingObj.average);
      var rates = ratingObj.total || 0;
      //console.log(ratingObj.comments);
      if(!rating) {rating = 0;}

      //var ratingStr = '<div style="clear:both;"><div class="i-review-summary-div">' + rates + ' reviews</div><div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(JSON.parse(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
      //ratingStr += '<div style="right: -6px;">';
      var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div class="i-review-summary-div">' + rates + ' reviews</div><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
      ratingStr += '<div style="right: -6px;">';
      for(var i = 0; i < rating; i++)
      {
        ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      for(var i = rating; i < 5; i++)
      {
        ratingStr += '<img src="./img/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
      }
      ratingStr += '</div></div></div></a>';
      //console.log(ratingStr);
      
      // --Name--
      var name = member.getFullName();
      var url = member.getURL();
      var link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a href="' + url + '" target="_blank" style="font-size:12px; font-weight:700; text-align: center;">LinkedIn Profile</a><hr></div>';

      //console.log(member.getProfile());


      // --Services--
      services = member.getProvidedServices();
      //console.log(services);

      // --Company--
      var company = member.getCompany() || '--';
      var companyTenure = member.getCompanyTenure(company);

      // --Industry--
      var industry = member.getIndustry() || '--';
      var industryTenure = member.getIndustryTenure(industry);

      // --Position--
      var position = member.getTitle() || '--';

      var education = member.getEducation() || '--';
      //  Only display most recent education
      var split = education.split('<br>');
      education = split[0];

      // --Image--
      var image = member.getImageSmall;
      //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';

      //if(settings[ID]['identity']) {name = ""; image = "./images/ghostSmall.png"; link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a target="_blank" style="font-size:12px; font-weight:100; text-align: center;">--</a><hr></div>';}






      var window = document.getElementById("schedule-page-interviewer-card");
      window.innerHTML = '';

      var itemImage = document.createElement("div");
      itemImage.className = "circular-small";
      itemImage.style.background = 'url(' + image + ') no-repeat center center';
      //itemImage.style.background = 'url(' + image + ') no-repeat';
      //window.appendChild(itemImage);


      var itemInfoWrapper = document.createElement("div");
      itemInfoWrapper.id = "itemInfoWrapper";
      //itemInfoWrapper.style.height = 110 + 'px';
      //itemInfoWrapper.style.height = 60 + 'px';
      itemInfoWrapper.style.overflow = 'hidden';
      //itemInfoWrapper.style.marginTop = -18 + "px";
      //itemInfoWrapper.style.border = "1px solid #00ff00";
    
      var icLeft = document.createElement("div");
      icLeft.className = "ic-left";
      icLeft.style.height = 330 + 'px';

      var itemName = document.createElement("div");
      itemName.className = "ic-left-name";
      itemName.innerHTML = name;
      icLeft.appendChild(itemName);



      var icLeftInfo = document.createElement("div");
      icLeftInfo.className = "ic-left-info";

      var icLeftInfoLeft = document.createElement("div");
      //icLeftInfoLeft.style = "width: 80px; text-align: right; float:left; border-right: 1px dotted #ff5100; padding-right: 4px;";
      icLeftInfoLeft.style.width = 80 + 'px';
      icLeftInfoLeft.style.textAlign = 'right';
      icLeftInfoLeft.style.float = 'left';
      icLeftInfoLeft.style.borderRight = 1 + 'px dotted #ff5100';
      icLeftInfoLeft.style.paddingRight = 4 + 'px';

      var itemIndustry = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemIndustry.innerHTML = '<p>' + 'industry' + '</p>';
      icLeftInfoLeft.appendChild(itemIndustry);

      var itemCompany = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemCompany.innerHTML = '<p>' + 'company' + '</p>';
      icLeftInfoLeft.appendChild(itemCompany);

      var itemPosition = document.createElement("div");
      //itemPosition.style.textAlign = "left";
      itemPosition.innerHTML = '<p>' + 'title' + '</p>';
      icLeftInfoLeft.appendChild(itemPosition);

      var itemTenure = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemTenure.innerHTML = '<p>' + 'tenure' + '</p>';
      icLeftInfoLeft.appendChild(itemTenure);

      var itemEducation = document.createElement("div");
      //itemEducation.style.textAlign = "left";
      itemEducation.innerHTML = '<p>' + 'education' + '</p>';
      icLeftInfoLeft.appendChild(itemEducation);



      var icLeftInfoRight = document.createElement("div");
      //icLeftInfoRight.style = "text-align: left; float: left; padding-left: 4px;";
      icLeftInfoRight.style.textAlign = 'left';
      icLeftInfoRight.style.float = 'left';
      icLeftInfoRight.style.paddingLeft = 4 + 'px';
      icLeftInfoRight.style.overflow = 'hidden';
      icLeftInfoRight.style.width = 550 + 'px';

      var itemIndustry = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemIndustry.innerHTML = '<p>' + industry + '</p>';
      icLeftInfoRight.appendChild(itemIndustry);

      var itemCompany = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemCompany.innerHTML = '<p>' + company + '</p>';
      icLeftInfoRight.appendChild(itemCompany);

      var itemPosition = document.createElement("div");
      //itemPosition.style.textAlign = "left";
      itemPosition.innerHTML = '<p>' + position + '</p>';
      icLeftInfoRight.appendChild(itemPosition);

      var itemTenure = document.createElement("div");
      //itemCompany.style.textAlign = "left";
      itemTenure.innerHTML = '<p>company: ' + companyTenure + 'yrs, industry: ' + industryTenure + 'yrs</p>';
      icLeftInfoRight.appendChild(itemTenure);

      var itemEducation = document.createElement("div");
      //itemEducation.style.textAlign = "left";
      itemEducation.innerHTML = '<p>' + education + '</p>';
      icLeftInfoRight.appendChild(itemEducation);

      icLeftInfo.appendChild(icLeftInfoLeft);
      icLeftInfo.appendChild(icLeftInfoRight);

      var itemRating = document.createElement("div");
      itemRating.innerHTML = ratingStr;
      icLeftInfo.appendChild(itemRating);


      icLeft.appendChild(icLeftInfo);
      itemInfoWrapper.appendChild(icLeft);







      var icRight = document.createElement("div");
      icRight.className = "ic-right";
      icRight.style.height = 330 + 'px';

      var itemName = document.createElement("div");
      itemName.className = "ic-right-name";
      itemName.innerHTML = 'ask ' + member.getFirstName() + ' a question';
      icRight.appendChild(itemName);



      var icRightInfo = document.createElement("div");
      icRightInfo.className = "ic-right-info";
      icRightInfo.innerHTML = '<textarea class="schedule-textarea">write your question here...</textarea>';

      icRight.appendChild(icRightInfo);

      var icRightBottom = document.createElement("div");
      icRightBottom.className = "sc-right-bottom";
      icRightBottom.style.marginTop = 50 + 'px';
      icRightBottom.innerHTML = '<button class="sc-right-send">send</button>';
      icRight.appendChild(icRightBottom);

      itemInfoWrapper.appendChild(icRight);

      window.appendChild(itemInfoWrapper);



      var itemLink = document.createElement("div");
      itemLink.innerHTML = link;
      //window.appendChild(itemLink);

      var numInterviews = document.createElement("div");
      numInterviews.innerHTML = interviewsStr;
      numInterviews.style.textAlign = 'left';
      //window.appendChild(numInterviews);

      var numCharityCoins = document.createElement("div");
      numCharityCoins.innerHTML = charityCoinStr;
      numCharityCoins.style.textAlign = 'left';
      //window.appendChild(numCharityCoins);


      var itemServices = document.createElement("div");
      //itemServices.innerHTML = help;
      //window.appendChild(itemServices);

      //document.getElementById("scheduleItems").appendChild(window);







      //var schedulePageCard = document.createElement("div");
      //schedulePageCard.className = "schedule-page-card-div";

      var schedulePageCard = document.getElementById("schedule-page-reviews");
      schedulePageCard.innerHTML = '';

      var scLeft = document.createElement("div");
      scLeft.className = "sc-left";

      var icLeftName = document.createElement("div");
      icLeftName.className = "ic-left-name";
      var linkToReviews = document.createElement("a");
      //linkToReviews.name = "link-to-reviews";
      linkToReviews.id = "link-to-reviews";
      linkToReviews.style.textDecoration = "none";
      linkToReviews.style.color = "#ff5100";
      linkToReviews.innerHTML = 'reviews';
      icLeftName.appendChild(linkToReviews);

      scLeft.appendChild(icLeftName);



      var comments = member.getReviews().comments;
      //console.log(comments);

      for (var key in comments)
      {
	//console.log(key);
        var inID = key.split(/:/)[0];
        //console.log(inID);
        var timeStamp = key.split(/:/)[1];
        var rating = comments[key].split(/:/)[0];
        var comment = comments[key].split(/:/)[1];
        //console.log(inID);
        //console.log(timeStamp);
        //console.log(rating);
        //console.log(comment);

        var reviewDiv = document.createElement("div");
        reviewDiv.className = "review-div";

        var member = members.getMember(ID);

        var name = member.getFullName();

        var reviewDivLeftPhoto = document.createElement("div");
        reviewDivLeftPhoto.className = "review-div-left-photo";
        var reviewDivLeftImg = document.createElement("img");
        reviewDivLeftImg.src = member.getImageSmall();
        reviewDivLeftPhoto.appendChild(reviewDivLeftImg);

        var commentDate = new Date(+timeStamp);
        var year =  commentDate.getFullYear();
        var month =  this.MONTHS[commentDate.getMonth()+1];
        var weekDay = this.DAYS[commentDate.getDay()];
        var day =  commentDate.getDate();
        var hours =  commentDate.getHours();
        var minutes =  commentDate.getMinutes();
        var seconds =  commentDate.getSeconds();

        var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year; 

        var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
        ratingStr += '<div style="right: -6px;">';
        for(var i = 0; i < rating; i++)
        {
	  ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
        }
        for(var i = rating; i < 5; i++)
        {
	  ratingStr += '<img src="./img/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
        }
        ratingStr += '</div></div></div></a>';

        var reviewDivRight = document.createElement("div");
        reviewDivRight.className = "review-div-right";

        var reviewDirNameDate = document.createElement("div");
        reviewDirNameDate.className = "review-dir-name-date";
        reviewDirNameDate.innerHTML = name + ' - ' + dateStr;

        var reviewDirStars = document.createElement("div");
        reviewDirStars.className = "review-dir-stars";
        reviewDirStars.innerHTML = ratingStr;

        var reviewDirText = document.createElement("div");
        reviewDirText.className = "review-dir-text";
        reviewDirText.innerHTML = comment;

        reviewDivRight.appendChild(reviewDirNameDate);
        reviewDivRight.appendChild(reviewDirStars);
        reviewDivRight.appendChild(reviewDirText);

        reviewDiv.appendChild(reviewDivLeftPhoto);
        reviewDiv.appendChild(reviewDivRight);
        scLeft.appendChild(reviewDiv);

      }
      schedulePageCard.appendChild(scLeft);

      var itemLink = document.createElement("div");
      itemLink.innerHTML = link;
      //window.appendChild(itemLink);

      var numInterviews = document.createElement("div");
      numInterviews.innerHTML = interviewsStr;
      numInterviews.style.textAlign = 'left';
      //window.appendChild(numInterviews);

      var numCharityCoins = document.createElement("div");
      numCharityCoins.innerHTML = charityCoinStr;
      numCharityCoins.style.textAlign = 'left';
      //window.appendChild(numCharityCoins);


      var itemServices = document.createElement("div");
      //itemServices.innerHTML = help;
      //window.appendChild(itemServices);

      //document.getElementById("scheduleItems").appendChild(window);
      document.getElementById("scheduleItems").appendChild(schedulePageCard);


      var childID = "full_itemInfoWrapper";
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
      //window.appendChild(popup);

      var options = new Array();
      options.push('Select a service...');
      for (var key in services)
      {
	options.push(key + ' ' + '$' + services[key].price + '/hr');
        var descID = 'scheduleDescription_' + key.toLowerCase();
        descID = descID.replace(/ /g, '');
        descID = descID.replace(/\-/g, '');
        //console.log(descID + ': found(' + (document.getElementById(descID) ? 'true' : 'false') + ')');
        if(document.getElementById(descID)) {document.getElementById(descID).style.display = '';}
      }

      addOptions2("selectServiceComboBox", options);

      if(services['In-person Interview'])
      {
        document.getElementById("scheduleLocality").innerHTML = services['In-person Interview'].locality + ', ' + services['In-person Interview'].province;
      }


      var scheduleTime = document.getElementById("scheduleTime");
      scheduleTime.innerHTML = '';
      scheduleTime.style.lineHeight = 0 + 'px';
      var timeCheckBoxesDiv = document.createElement("div");
      for(var i = 7; i < 20; i++)
      {
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = "serviceTime";
        checkBox.value = pad(i,2);
        checkBox.onclick = new Function( 'getSubTotal()');
        checkBox.style.lineHeight = 0 + 'px';

        var timeObj = convertTimeTo12(i + ':' + '00');
        var hour = timeObj.hour;
        var minute = timeObj.minute;
        var ampm = timeObj.ampm;
        localTimeStr = hour + ':' + minute + ampm;

        var timeObj = convertTimeTo12((i+1) + ':' + '00');
        var hour = timeObj.hour;
        var minute = timeObj.minute;
        var ampm = timeObj.ampm;
        localTimeStrPlusOne = hour + ':' + minute + ampm;

        var textNode = localTimeStr + ' - ' + localTimeStrPlusOne;
        var label= document.createElement("label");
        label.id = 'label' + pad(i,2);
        var description = document.createTextNode(textNode);
        var description = document.createElement("span");
        description.innerHTML = textNode;
        label.appendChild(checkBox);   // add the box to the element
        label.appendChild(description);// add the description to the element
        timeCheckBoxesDiv.appendChild(label);
        timeCheckBoxesDiv.appendChild(document.createElement("br"));  
      }
      scheduleTime.appendChild(timeCheckBoxesDiv);

      getSubTotal();

      var cal = $("#scheduleCal").ical({
        startOnSunday: true,
        click: function(d)
        {
          //console.log('SELECTED: ' + d);
          var split = d.split(".");
          var year = parseInt(split[2],10);
          var month = parseInt(split[1],10);
          var day = parseInt(split[0],10);
      
          //console.log(year+'/'+month+'/'+day);

          var dtPRV = new timezoneJS.Date(year, month-1, day);
          //console.log(app.DAYS[dtPRV.getDay()]);

          app.apptDay = app.DAYS[dtPRV.getDay()] + ' ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear();

          

          var provider = members.getMember(app.getProviderID());
          //console.log(provider.getCalendar());
          var cal = provider.getCalendar();

          var date = pad(day, 2)+'/'+pad(month, 2)+'/'+year;
          //console.log(date);
          var providerSchedule = cal[date];
          //console.log('PROVIDER SCHEDULE: ' + providerSchedule);


          var member = members.getMember(app.getUserID());
          //console.log(member.getCalendar());
          var cal = member.getCalendar();

          var date = pad(day, 2)+'/'+pad(month, 2)+'/'+year;
          //console.log(date);
          var mySchedule = cal[date];
          //console.log(mySchedule);

          showApptScheduler(providerSchedule, mySchedule, day, month, year);

	  /*
          var opts = new Array();
          opts[0] = 'Just this ' + app.DAYS[dtPRV.getDay()] + ' (' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear() + ')';
          opts[1] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getFullYear();
          opts[2] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + dtPRV.getFullYear();
          addOptions("calSelect", opts);
	  */
        } // fired when user clicked on day, in "d" stored date
      });

      var scheduleDates = new Array();
      var provider = members.getMember(app.getProviderID());
      var cal = provider.getCalendar();
      for(var key in cal)
      {
        var split = key.split('/');
        var d = parseInt(split[0], 10);
        var m = parseInt(split[1], 10);
        var y = parseInt(split[2], 10);
        var dateStr = y + '-' + pad(m,2) + '-' + pad(d,2);
        var lsObj = localizeSch(cal[key], app.getProviderID(), d, m, y);
        var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;
        //console.log(localizedAppt);

	scheduleDates.push({date: dateStr, title: '', desc: lsObj.sch});
      }

      $("#scheduleCal").ical.changeEventDates(scheduleDates);

      //{"date": "2012-08-08", "title": "My birthday", "desc": "Its my birthday!"},


      function showApptScheduler(providerSchedule, mySchedule, day, month, year)
      {
	var r = document.getElementsByName("serviceTime");
	for (var i = 0; i < r.length; i++)
	{
	  r[i].checked = false;
	}

	localizeApptScheduler(day, month, year);

	var controlValue = {};
        if(providerSchedule)
	{
	  var split = providerSchedule.split('<br>');
	  split.shift();
	  for(var i = 0; i < split.length; i++)
          {
            if(split[i])
	    {
              var timeStr = Number(split[i].match(/^(\d+)/)[1]) + ':00' + ' ' + split[i].match(/([ap]m)/);
              timeStr = timeStr.replace(/\,[ap]m$/,'');
	      split[i] = convertTimeTo24(timeStr).hour;
	      //console.log(split[i]);
	      controlValue[split[i]] = true;
	    }
	  }
	}
	enableGroup("serviceTime");
	//enableGroup("selectService");
	//addOptions("selectService", selected);
	disableGroup("serviceTime", controlValue);
	//disableGroup("selectService", controlValue);

	//Show previously selected options
	if(mySchedule) {setGroupsFromSchedule("serviceTime", mySchedule);}
	if(Object.size(this.cartItems))
	{
	  var cartItemsSchedule = convertCartItemKeys(this.cartItems);
	  setGroupsFromSchedule("serviceTime", cartItemsSchedule);
	}

	//Disable previously scheduled hours from other providers
	if(mySchedule) {disableGroupsFromSchedule("serviceTime", mySchedule);}

	//getSubTotal();

      }








    } //populateScheduleItems()




    ,makePayment: function(vendor)
    {
  //console.log("makePayment: " + vendor);
  
      var me = this;
      var itemStr = '';
      var idx = 1;

      //var returnUrl = "http://www.interviewring.com/index.php?return&ID=" + app.getUserID() + "&CODE=" + document.getElementById('promoForm').value;
      var returnUrl = "http://www.interviewring.com/index.php?return&ID=" + app.getUserID() + "&CODE=" + 'NONE';
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

      var total = getSubTotal();

      var myTotal = currencyFormatted(total);

      ga('ecommerce:addTransaction', {
	 'id': orderID,                    // Transaction ID. Required.
	 'affiliation': 'interviewring',   // Affiliation or store name.
	 'revenue': myTotal,               // Grand Total.
         'shipping': '0',                  // Shipping.
         'tax': '0'                        // Tax.
      });

      for (var key in me.cartItems)
      {
        var split = key.split(/\:/);
	var ID = split[0];
	var item = me.cartItems[key];
        if(!item) {continue;}
        //console.log("ITEM: " + item + " KEY: " + key);
        var date = key.split(':')[1];
	//console.log(date);
        var dateObj = getDateIndexes(date)

        var d = parseInt(dateObj.dayIndex, 10);
        //console.log(d);
        var m = parseInt(dateObj.monthIndex-1, 10);
        var y = parseInt(dateObj.year, 10);
        var dateStr = y + '-' + pad(m,2) + '-' + pad(d,2);
        var lsObj = localizeCartItem(item, app.getProviderID(), d, m, y);
        var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;
        //console.log(localizedAppt);

	var sku = 'sku' + idx;
	var desc = localizedAppt;
        //console.log("DESC: " + desc);
	desc = desc.replace(/"/g, '\\"');
        desc = desc.replace(/'/g, "\\'");
        desc = desc.replace(/\<br\>/g, "\n");
        //console.log("DESC2: " + desc);

	var unitPrice = getSubTotalFromSch(item, ID);
	var quantity = 1;
	var discounted = 0;
	var customStr = '';

	itemStr += '<input type="hidden" name="item_name_' + idx + '" value="' + desc + '"><input type="hidden" name="amount_' + idx + '" value="' + unitPrice + '"><input type="hidden" name="quantity_' + idx + '" value="' + quantity + '"><input type="hidden" name="discount_amount_' + idx + '" value="' + discounted + '">';


        //console.log(itemStr);
	//returnUrl += encodeURI(key) + "=" + encodeURI(me.cartItems[key]) + "&";

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

      //console.log("TOTAL: " + total);

      if(! total)
      {
    
	var pre = '<form name="paymentSubmit" action="' + returnUrl + '" method="post">';
	var disc = '<input type="hidden" name="custom" value="' + customStr + '">';
	var post = '<input class="submitDummy" type="image" name="submit" border="0" src="./img/0.gif" onclick="ga(\'send\', \'event\', \'button\', \'click\', \'submit\');"/></form>';


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
  
      var post = '<input class="submitDummy" type="image" name="submit" border="0" src="./img/0.gif" onclick="ga(\'send\', \'event\', \'button\', \'click\', \'submit\');"/></form>';

      //console.log(returnUrl);
      //console.log(pre + itemStr + disc + post);

      var form = document.createElement("div");
      form.id = "paymentForm";
      form.innerHTML = pre + itemStr + disc + post;
      document.body.appendChild(form);

      //document.getElementById('paymentForm').innerHTML = pre + itemStr + disc + post;
  
      ga('ecommerce:send');   //submits transaction to the Analytics servers
      document.paymentSubmit.submit();

    }//makePayment()




  }//application.prototype





