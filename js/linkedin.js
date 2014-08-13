function onLinkedInLogout(el)
{
  setLoginBadge(false, el);
  window.location="index.php";
}

function onLinkedInLogin(el)
{
  // we pass field selectors as a single parameter (array of strings)
  IN.API.Profile("me")
    .fields(["emailAddress", "imAccounts", "phoneNumbers", "id", "firstName", "lastName", "pictureUrls::(original)", "pictureUrl", "publicProfileUrl", "headline", "location:(name)", "industry", "summary", "positions", "educations"])
  .result(function(result) {
    inProfile = result.values[0];
    setLoginBadge(result.values[0], el);
  })
  .error(function(err) {
      alert('LinkedIn API error<br>' + err + '<br>Please reload the page');
  });
}

function setLoginBadge(profile, el)
{
  if(!profile)
  {
    HTML = '<a onmouseover="this.style.cursor=\'pointer\';" onclick="IN.User.authorize();">sign in</a>';
    window.location.href = "";
  }
  else
  {
    HTML = '<a onmouseover="this.style.cursor=\'pointer\';" onclick="IN.User.logout();">sign out</a>';
    var inID = profile.id;
    app.inID = profile.id;
    $.ajax({
      url: "./php/isNewUser.php",
      data: {id: inID},
      cache: false,
      type:'post',
      async:false,
      success: function(response){application.newUser = (response==='true') ? true : false;}
    });

    //console.log("NEW USER: " + window.newUser);

    if(application.newUser)
    {
      var d = new Date()
      var tzOffset = d.getTimezoneOffset();
      //var tzName = get_timezone_id();

      var tzName = jstz.determine().name(); // Determines the time zone of the browser client
      //console.log(tzName);


      var mailObj = {};
      mailObj.anyNew = false;
      mailObj.mail = {};

      //console.log('New User');
      $.ajax({url:"./php/saveData.php", 
          data: {id: inID, linkedINprofile: JSON.stringify(profile), tzName: tzName, role: application.role, services: {}, calendar: {}, mail: JSON.stringify(mailObj), cart: {} },
          type:'post',
          async:false,
          success: function(response){var newMember = new members.member(inID); newMember.profile = profile; newMember.tzName = tzName; newMember.role = application.role;}
      });
    }
    else
    {
      //console.log('Wait for users loaded');
      updateUserProfile(inID, profile);
      if(members.getMember(inID).role === 'find') {showFindInterviews();}
      //else                                        {showGiveInterviews();}
      else                                        {showFindInterviews();}
    }
  }

  el.innerHTML = HTML;
}




function updateUserProfile(inID, profile)
{
  if(!app.usersLoaded)
  {
    //console.log('Waiting...');
    countdown = setTimeout('updateUserProfile(\'' + inID + '\',\'' + profile + '\')', 500);
  }
  else
  {
    //console.log('Returning User: ' + inID);
    $.ajax({url:"./php/updateData.php", 
	   data: {id: inID, linkedINprofile: JSON.stringify(profile) },
           type:'post',
           async:false,
           success: function(response){members.getMember(inID).profile = profile;}
    });
  }
}
