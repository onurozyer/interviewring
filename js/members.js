// -----
// Members and member objects
// -----
 /*jslint laxcomma:true, laxbreak:true, expr:true*/
(function ()
{
  // Standard initialization stuff to make sure the library is
  // usable on both client and server (node) side.
  "use strict";
  var root = this;

  // Export the member object for Node.js, with backwards-compatibility for the old `require()` API
  var members = {};
  if (typeof exports !== 'undefined')
  {
    if (typeof module !== 'undefined' && module.exports)
    {
      exports = module.exports = members;
    }
    exports.members = members;
  }
  else
  {
    root.members = members;
  }

  members.VERSION = '0.0.1';
  members.instances = {};


  // return handle of member given an ID
  //
  members.getMember = function (ID)
  {
    return members.instances[ID];
  };

  // Constructor, which is similar to that of the native Date object itself
  members.member = function (ID)
  {
    if(this === members) {throw "members.member object must be constructed with 'new'";}
    if(!ID)              {throw "You must supply an ID when creating an instance of the members.member object";}

    this.ID = ID;
    this.profile = {};
    this.tzName = null;
    this.role = null;
    this.providedServices = {};
    this.calendar = {};
    this.mail = {};
    this.privacy = {};
    this.cart = {};
    this.providerHistory = {};
    this.history = {};
    this.feedback = {};
    this.reviews = {};
    this.coins = {};
    this.resume = null;

    members.each = function(callback)
    {
      //console.log("FUNCTION");
      //console.log(Object.size(members.instances));
      //for(var i = 0; i < Object.size(members.instances); ++i)
      for(var key in members.instances)
      {
        //console.log("KEY: " + key + " VALUE: " + members.instances[key]);
        callback.call(this, members.instances[key], key);
      }
      return this; // to allow chaining like jQuery does
    }


    members.instances[ID] = this;
  };

  // Implements methods for Class
  members.member.prototype =
  {
    constructor: members.member,
    get: function (selector) { try{ return this[selector]; } catch(err){ return null;} },
    getID: function () { return this.ID; },
    getFirstName: function () { return this.profile.firstName; },
    getLastName: function () { return this.profile.lastName; },
    getFullName: function () { return this.profile.firstName + ' ' + this.profile.lastName; },
    getEmail: function () { return this.profile.emailAddress; },
    getImage: function () { return this.profile.pictureUrls ? this.profile.pictureUrls.values ? this.profile.pictureUrls.values[0] : './img/ghost.png' : './img/ghost.png'; },
    getImageSmall: function () { return this.profile.pictureUrl || './img/ghostSmall.png'; },
    getURL: function () { return this.profile.publicProfileUrl; },
    getCompany: function () { return this.profile.positions ? this.profile.positions.values ? this.profile.positions.values[0].company ? this.profile.positions.values[0].company.name || '' : '' : '' : ''; },
    getTitle: function () { return this.profile.positions ? this.profile.positions.values ? this.profile.positions.values[0].title || '' : '' : ''; },
    getIndustry: function () { return this.profile.positions ? this.profile.positions.values ? this.profile.positions.values[0].company ? this.profile.positions.values[0].company.industry || this.profile.industry : this.profile.industry || '' : this.profile.industry || '' : this.profile.industry || ''; },

    getSummary: function ()
    {
      if(this.profile.positions.values)
      {
	var summary = JSON.stringify(this.profile.positions.values[0].summary) || '';
        summary = summary.replace(/\\n/g, '<br />');
        summary = summary.replace(/\\t/g, '  ');
        return summary;
      }
      return '';
    },

    getEducation: function ()
    {
      var education = '';
      if(this.profile.educations.values)
      {
	for(var i = 0; i < this.profile.educations.values.length; i++)
	{
	  education += this.profile.educations.values[i].schoolName + ' [' + this.profile.educations.values[i].degree + ' ' + this.profile.educations.values[i].fieldOfStudy + ']' + '<br>';
	}
      }
      return education;
    },

    getTenure: function ()
    {
      if(this.profile.positions.values)
      {
        var tenure = 0;
        var d = new Date();
        var year = d.getFullYear();
        if(this.profile.positions.values[0].startDate) {tenure = year - (this.profile.positions.values[0].startDate.year || year);}
        return tenure;
      }
    },

    getCompanyTenure: function (company)
    {
      var totalTenure = [];
      if(this.profile.positions.values)
      {
        for(var i = 0; i < this.profile.positions.values.length; i++)
	{
          var tenure = 0;
          var d = new Date();
          var endDate = {};
          endDate.year = d.getFullYear();
          if(this.profile.positions.values[i].endDate)   {endDate.year = this.profile.positions.values[i].endDate.year;}
          if(this.profile.positions.values[i].startDate) {tenure = endDate.year - this.profile.positions.values[i].startDate.year;}

          if(this.profile.positions.values[i].company)
	  {
            if(!totalTenure[this.profile.positions.values[i].company.name]) {totalTenure[this.profile.positions.values[i].company.name] = 0;} totalTenure[this.profile.positions.values[i].company.name] += parseInt(tenure,10);
	  }
	}
      }
      return totalTenure[company] || 0;
    },

    getIndustryTenure: function (industry)
    {
      var totalTenure = [];
      if(this.profile.positions.values)
      {
        for(var i = 0; i < this.profile.positions.values.length; i++)
	{
          var tenure = 0;
          var d = new Date();
          var endDate = {};
          endDate.year = d.getFullYear();
          if(this.profile.positions.values[i].endDate)   {endDate.year = this.profile.positions.values[i].endDate.year;}
          if(this.profile.positions.values[i].startDate) {tenure = endDate.year - this.profile.positions.values[i].startDate.year;}

          if(this.profile.positions.values[i].company)
	  {
            if(!totalTenure[this.profile.positions.values[i].company.industry || this.profile.industry]) {totalTenure[this.profile.positions.values[i].company.industry || this.profile.industry] = 0;} totalTenure[this.profile.positions.values[i].company.industry || this.profile.industry] += parseInt(tenure,10);
	  }
	}
      }
      return totalTenure[industry] || 0;
    },

    getIMaccount: function ()
    {
      var imAccount = '';
      if(this.profile.imAccounts.values)
      {
	for(var i = 0; i < this.profile.imAccounts.values.length; i++)
	{
	  //console.log(this.profile.imAccounts.values[i].type.name);
	  if(this.profile.imAccounts.values[i].type == 'skype') {imAccount = this.profile.imAccounts.values[i].type.name;}
	}
	if(!imAccount) {imAccount = this.profile.imAccounts.values[0].type.name;}
      }
      return imAccount;
    },

    getPhone: function ()
    { 
      var phoneNumber = '';
      if(this.profile.phoneNumbers.values)
      {
	for(var i = 0; i < this.profile.phoneNumbers.values.length; i++)
	{
	  //console.log(this.profile.phoneNumbers.values[i].type.number);
	  if(this.profile.phoneNumbers.values[i].type == 'mobile') {phoneNumber = this.profile.phoneNumbers.values[i].type.number;}
	}
	if(!phoneNumber) {phoneNumber = this.profile.phoneNumbers.values[0].type.number;}
      }
      return phoneNumber;
    },

    getNumProvidedServices: function()
    {
      var feedbackObj = this.getFeedback();
      var numFeedbacks = Object.size(feedbackObj);
      return numFeedbacks;
    },

    getProfile: function () { return this.profile; },				 
    getTZname: function () { return this.tzName; },	
    getRole: function () { return this.role; },	
    getProvidedServices: function () { return this.providedServices; },	
    getCalendar: function () { return this.calendar; },	
    getMail: function () { return this.mail; },	
    getPrivacy: function () { return this.privacy; },	
    getCart: function () { return this.cart; },	
    getProviderHistory: function () { return this.providerHistory; },	
    getHistory: function () { return this.history; },	
    getFeedback: function () { return this.feedback; },	
    getReviews: function () { return this.reviews; },	
    getCoins: function () { return this.coins; },	
    getResume: function () { return this.resume }	

  };
}).call(this);
