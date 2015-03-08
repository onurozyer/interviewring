// -----
// Members and member objects
// -----
// Constructor, which is similar to that of the native Date object itself
function application() {
    if (this === application) {
        throw "application object must be constructed with 'new'";
    }

    this.VERSION = '0.0.1';

    this.providedServices = ["Remote Interview", "In-person Interview", "Resume Review"];


    this.formItems = {
        "communication skills": "",
        "technical knowledge": "",
        "seniority level": "",
        "overall feedback": ""
    };

    this.filters = {
        "industry": "",
        "company": "",
        "rating": ['5 star', '4 star', '3 star', '2 star', '1 star', '0 star'],
        "experience": ['40+ years', '30-39 years', '20-29 years', '10-19 years', '5-9 years', '0-4 years'],
        "services": ['In-person Interview', 'Remote Interview', 'Interview Mentoring', 'Resume Review'],
        "price": ['FREE', '$0.01-49/hr', '$50-99/hr', '$100-149/hr', '$150-199/hr', '$200-249/hr', '$250+/hr']
    };

    this.historyFilters = {
        "status": ['Scheduled', 'Waiting Feedback', 'Completed'],
        "date": ['< 1 month ago', '1-3 months ago', '4-6 months ago', '7-12 months ago', '> 1 year ago'],
        "company": ""
    };

    this.DAYS = application.Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.MONTHS = application.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.SHORT_MONTHS = {};
    this.SHORT_DAYS = {};

    //`{ "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 }`
    for (var i = 0; i < this.MONTHS.length; i++) {
        this.SHORT_MONTHS[i] = this.MONTHS[i].substr(0, 3);
    }

    //`{ "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6 }`
    for (i = 0; i < this.DAYS.length; i++) {
        this.SHORT_DAYS[i] = this.DAYS[i].substr(0, 3);
    }


    this.inID = null;
    this.providerID = null;
    this.apptDay = null;
    this.serviceDay = null;
    this.socialShareReturn = false;
    this.rateReturn = false;
    this.feedbackReturn = false;
    this.returnParameters = {};
    this.cartItems = {};

    this.usersLoaded = false;
    this.usersLoading = false;

    this.sortedFilteredList = [];
    this.sortedHistoryFilteredList = [];
    this.currInterviewer = 0;
    this.localityObj = {};
}

// Implements methods for Class
application.prototype = {
        constructor: application,
        getUserID: function () {
            return this.inID;
        }

        ,
        getProviderID: function () {
            return this.providerID;
        }

        ,
        getApptDay: function () {
            return this.apptDay;
        }

        ,
        getServiceDay: function () {
            return this.serviceDay;
        }

        ,
        loadUsers: function () {
                var me = this;
                //console.log('loadUsers');
                $.ajaxSetup({
                    cache: false
                });

                if (me.usersLoading) {
                    return;
                }
                me.usersLoading = true;

                $.ajax({
                    url: "./php/loadData.php",
                    type: 'get',
                    async: false,
                    success: function (result) {
                            //console.log(result + " " + result.length);
                            if (result.length <= 3) {
                                return;
                            }
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


                            for (var i = 0; i < obj.length; i++) {
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

                                var temp = resume.split(/\,/)[0];
                                var name = temp.split(/\;/)[0];
                                name = name.replace('name:', '');
                                var temp = resume.split(/\,/)[1];
                                if (temp) {
                                    resume = decodeBase64(temp);
                                    document.getElementById("uploadFileLabel").innerHTML = name;
                                    document.getElementById("uploader-notice").innerHTML = '<div class="uploader-notice">You have already uploaded file: ' + name + '</div><div class="uploader-notice">Uploading a different CV will replace the existing one.</div></div>';
                                }

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
                            } //for

                            me.usersLoaded = true;
                            me.usersLoading = false;
                        } //function
                }); //ajax
                //console.log("users loaded");
            } //loadUsers()

        ,
        createFilters: function (member) {
                var me = this;
                var industry = member.getIndustry();
                var company = member.getCompany();
                //console.log("COMPANY: " + company);
                var services = member.getProvidedServices();
                var numServices = Object.size(services);

                if (numServices && (member.getRole() === 'give' || member.getRole() === 'both')) {
                    var found = 0;
                    if (!me.filters.industry) {
                        me.filters.industry = new Array();
                    }
                    for (var i = 0; i < me.filters.industry.length; i++) {
                        if (me.filters.industry[i] === industry) found++;
                    }
                    if (!found && industry) {
                        me.filters.industry.push(industry);
                    }


                    found = 0;
                    if (!me.filters.company) {
                        me.filters.company = new Array();
                    }
                    for (var i = 0; i < me.filters.company.length; i++) {
                        if (me.filters.company[i] === company) found++;
                    }
                    if (!found && company) {
                        me.filters.company.push(company);
                    }

                    me.filters.industry = me.filters.industry ? me.filters.industry.sort() : [];
                    me.filters.company = me.filters.company ? me.filters.company.sort() : [];
                }
            } //createFilters()

        ,
        setFilterKeys: function (member) {
                var me = this;

                member.industryFilter = member.getIndustry();
                member.companyFilter = member.getCompany();

                // --Services--
                var LO = 999999;
                var HI = 0;
                var services = member.getProvidedServices();
                for (var key in services) {
                    if (parseFloat(services[key].price) < LO) {
                        LO = parseFloat(services[key].price);
                    }
                    if (parseFloat(services[key].price) > HI) {
                        HI = parseFloat(services[key].price);
                    }
                }

                // --Rating --
                var ratingObj = member.getReviews();
                var rating = Math.ceil(ratingObj.average) || 0;

                for (var key in me.filters) {
                    if (key == 'price') {
                        //console.log("PRICE");
                        var items = me.filters[key];
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            //console.log(item);
                            item = item.replace('/hr', '');
                            item = item.replace(/\$/g, '');
                            item = item.replace('FREE', '0');
                            item = item.replace('+', '-999999');
                            var split = item.split('-');
                            var priceLO = parseFloat(split[0]);
                            var priceHI = parseFloat(split[1]) || parseFloat('0');
                            //console.log(LO + "->" + " LO: " + priceLO + " HI: " + priceHI);
                            if (LO >= priceLO && LO <= priceHI) {
                                member.priceFilter = items[i];
                            }
                        }
                        //console.log("SET TO: " + member.priceFilter);
                    } else if (key == 'rating') {
                        //console.log("PRICE");
                        var items = me.filters[key];
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            //console.log(item);
                            item = item.replace(/\s*star/, '');
                            var star = parseInt(item, 10);
                            //console.log(LO + "->" + " LO: " + priceLO + " HI: " + priceHI);
                            if (rating == star) {
                                member.ratingFilter = items[i];
                            }
                        }
                        //console.log("SET TO: " + member.ratingFilter);
                    } else if (key == 'experience') {
                        //console.log("EXPERIENCE");
                        var items = me.filters[key];
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            //console.log(item);
                            item = item.replace(/\s*years/, '');
                            var split = item.split('-');
                            var expLO = parseFloat(split[0]);
                            var expHI = parseFloat(split[1]) || parseFloat('0');
                            var experience = parseInt(member.getIndustryTenure(member.getIndustry()), 10) || 0;
                            //console.log(experience + "->" + " LO: " + expLO + " HI: " + expHI);
                            if (experience >= expLO && experience <= expHI) {
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

        ,
        searchInterviewers: function (exp) {

                var me = this;
                var regExp = exp || ".";
                regExp = regExp.replace(/\s+/g, "|");
                var matchRE = new RegExp(regExp, "i");
                //console.log(regExp);

                me.sortedFilteredList = [];
                me.currInterviewer = 0;
                members.each(function (item, index) {
                    //console.log("EACH");
                    //console.log(item);
                    //console.log(item.get('linkedINprofile'));
                    //console.log((!item.get('linkedINprofile') && !linkedINlogin));
                    //console.log(item.get('role'));
                    if (item.get('role') !== 'give' && item.get('role') !== 'both' || (!item.get('profile') && !me.usersLoaded)) {
                        return;
                    }

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
                    if (ID == regExp) {
                        found++;
                    }
                    for (var key in services) {
                        //console.log("REGEX: " + regExp + " KEY: " + key);
                        found += key.match(matchRE);
                    }

                    var numServices = Object.size(services);
                    if (found && numServices) {
                        //console.log("PUSHING: " + item.get('ID'));
                        me.sortedFilteredList.push({
                            id: item.get('ID')
                        });
                    }
                }); //members.instances.each

                me.applyFilters();
                me.sortedFilteredList.sort(sortfunction)
                me.populateSearchItems();
                addFilterOptions('filter_industry', me.filters.industry);
                addFilterOptions('filter_company', me.filters.company);
                prependFilterOption('filter_industry', 'industry');
                prependFilterOption('filter_company', 'company');

                //if(exp) {pruneFilters();}



                function sortfunction(a, b) {
                        //Compare "a" and "b" in some fashion, and return <0, 0, or >0
                        //Less than 0: Sort "a" to be a lower index than "b"
                        //Zero: "a" and "b" should be considered equal, and no sorting performed.
                        //Greater than 0: Sort "b" to be a lower index than "a".

                        var e = document.getElementById("sortSearch");
                        var opt = e.options[e.selectedIndex].value;
                        var memberA = members.getMember(a.id);
                        var memberB = members.getMember(b.id);

                        if (opt == 'company') {
                            //console.log(memberA.getCompany());
                            if (memberA.getCompany() < memberB.getCompany()) {
                                return -1;
                            }
                            if (memberA.getCompany() > memberB.getCompany()) {
                                return 1;
                            }
                            return 0;
                        } else if (opt == 'rating') {
                            var ratingObj = memberA.getReviews();
                            var arating = Math.ceil(ratingObj.average) || 0;
                            var areviews = ratingObj.total || 0;
                            var ratingObj = memberB.getReviews();
                            var brating = Math.ceil(ratingObj.average) || 0;
                            var breviews = ratingObj.total || 0;

                            //console.log("Rating A: " + arating + " Rating B: " + brating);
                            if (arating == brating) {
                                return (areviews < breviews);
                            } else {
                                return (arating < brating);
                            }
                        } else if (opt == 'experience') {
                            //console.log(memberA.getIndustryTenure() + ' ' + memberB.getIndustryTenure());
                            return (memberA.getIndustryTenure(memberA.getIndustry()) < memberB.getIndustryTenure(memberB.getIndustry()));
                        } else if (opt == 'price') {
                            var aLO = 9999999;
                            var aHI = 0;
                            var bLO = 9999999;
                            var bHI = 0;


                            // --Services--
                            services = memberA.getProvidedServices();
                            for (var key in services) {
                                if (parseFloat(services[key].price) < aLO) {
                                    aLO = parseFloat(services[key].price);
                                }
                                if (parseFloat(services[key].price) > aHI) {
                                    aHI = parseFloat(services[key].price);
                                }
                            }
                            // --Services--
                            services = memberB.getProvidedServices();
                            for (var key in services) {
                                if (parseFloat(services[key].price) < bLO) {
                                    bLO = parseFloat(services[key].price);
                                }
                                if (parseFloat(services[key].price) > bHI) {
                                    bHI = parseFloat(services[key].price);
                                }
                            }

                            //console.log("aLO: " + aLO + " bLO: " + bLO);
                            return (aLO - bLO);
                        } else {
                            return 0;
                        }
                    } //sortfunction()

            } //loadSearchItems()


        ,
        applyFilters: function () {
                var me = this;

                var filterType = 'and';
                var filtered = new Array();
                var toSave = new Array();

                for (var j = 0; j < me.sortedFilteredList.length; j++) {
                    var ID = me.sortedFilteredList[j].id;
                    toSave[ID] = (filterType == 'and') ? true : false;
                    //console.log("\n\nID: " + ID);
                    var member = members.getMember(ID);

                    for (var key in me.filters) {
                        //console.log("--KEY: " + key);
                        var filterName = 'filter_' + key;
                        var e = document.getElementById(filterName);
                        var opt = e.options[e.selectedIndex].value;
                        var value = member.get(key + 'Filter');
                        var found = (opt == key) ? true : false;
                        var currValue = (key != 'services') ? value : 'services';
                        //console.log("CURRVALUE: " + currValue);

                        if (key == 'services') {
                            var services = member.getProvidedServices();
                            if (!Object.size(services)) {
                                found = true;
                            }

                            for (var service in services) {
                                //console.log(service + ' == ' + opt);
                                if (service == opt) {
                                    found = true;
                                }
                            }
                        } //if(key == 'services')
                        else {
                            //console.log(currValue + ' == ' + opt);
                            if (currValue == opt) {
                                found = true;
                            }
                        }
                        if (filterType == 'and')
                            toSave[ID] &= found;
                        else
                            toSave[ID] |= found;
                    }
                }
                for (var key in toSave) {
                    if (toSave[key]) {
                        filtered.push({
                            id: key
                        })
                    };
                }
                me.sortedFilteredList = filtered;
            } //applyFilters()

        ,
        populateSearchItems: function () {
                //console.log('populateSearchItems');
                var me = this;
                var services = {};
                var imgID = '';
                me.filters.industry = [];
                me.filters.company = [];


                document.getElementById("searchItems").innerHTML = '';
                //document.getElementById("resultsSearch").innerHTML = 'Search Results: ' + me.sortedFilteredList.length;

                for (var index = 0; index < me.sortedFilteredList.length; index++) {
                    var ID = me.sortedFilteredList[index].id;
                    //console.log(ID);
                    var member = members.getMember(ID);
                    me.createFilters(member);


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
                    if (!rating) {
                        rating = 0;
                    }

                    var ratingStr = '<div class="number-of-reviews-div">' + rates + ' reviews</div>';
                    ratingStr += '<div class="stars-div">';
                    for (var i = 0; i < rating; i++) {
                        ratingStr += '<img class="star-image" src="./img/star.png"/>';
                    }
                    for (var i = rating; i < 5; i++) {
                        ratingStr += '<img class="star-image" src="./img/starEmpty.png"/>';
                    }
                    ratingStr += '</div>';
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
                    var window = document.createElement("div");
                    window.className = "interviewer-card";
                    window.id = "itemInfoWrapper" + index;
                    window.onclick = new Function('showCheckOut(\'' + ID + '\')');

                    var icLeft = document.createElement("div");
                    icLeft.className = "ic-left";

                    var itemName = document.createElement("div");
                    itemName.className = "ic-left-name";
                    itemName.innerHTML = name;
                    icLeft.appendChild(itemName);

                    var icLeftInfo = UserCardLeftInfo(industry, company, position, companyTenure, industryTenure, education, rates, rating);
                    icLeft.appendChild(icLeftInfo);
                    window.appendChild(icLeft);

                    var icRight = document.createElement("div");
                    icRight.className = "ic-right";

                    var itemName = document.createElement("div");
                    itemName.className = "ic-right-name";
                    itemName.innerHTML = 'services';
                    icRight.appendChild(itemName);

                    var icRightInfo = UserCardRightInfo(services, imgID)

                    icRight.appendChild(icRightInfo);

                    window.appendChild(icRight);


                    var itemLink = document.createElement("div");
                    itemLink.innerHTML = link;

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
                }
            } //populateSearchItems()




        ,
        populateProfileItems: function () {
                //console.log('populateProfileItems');
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
                if (!rating) {
                    rating = 0;
                }

                var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div class="number-of-reviews-div">' + rates + ' reviews</div><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
                ratingStr += '<div style="right: -6px;">';
                for (var i = 0; i < rating; i++) {
                    ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                }
                for (var i = rating; i < 5; i++) {
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
                var window = document.createElement("div");
                window.className = "schedule-page-interviewer-card";
                window.id = "profileItem";

                var icLeft = document.createElement("div");
                icLeft.className = "ic-left";

                var itemName = document.createElement("div");
                itemName.className = "ic-left-name";
                itemName.innerHTML = name;
                icLeft.appendChild(itemName);


                var icLeftInfo = UserCardLeftInfo(industry, company, position, companyTenure, industryTenure, education, rates, rating);
                var itemInterviews = document.createElement("div");
                itemInterviews.className = "review-summary-right";
                itemInterviews.innerHTML = interviewsStr;
                icLeftInfo.appendChild(itemInterviews);

                icLeft.appendChild(icLeftInfo);
                window.appendChild(icLeft);





                var icRight = ServiceEditUserCardRight();
                window.appendChild(icRight);

                getLocality();
                waitGeolocation();
                getZones();



                var schedulePageCard = document.createElement("div");
                schedulePageCard.className = "schedule-page-card-div";

                var scLeft = document.createElement("div");
                scLeft.className = "sc-left-review";

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

                if (comments == undefined) {
                    var noReviewsDiv = document.createElement("div");
                    noReviewsDiv.className = "no-reviews-div";
                    noReviewsDiv.innerHTML = "You don't have any reviews yet...";
                    scLeft.appendChild(noReviewsDiv);
                }

                for (var key in comments) {
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
                    var year = commentDate.getFullYear();
                    var month = this.MONTHS[commentDate.getMonth() + 1];
                    var weekDay = this.DAYS[commentDate.getDay()];
                    var day = commentDate.getDate();
                    var hours = commentDate.getHours();
                    var minutes = commentDate.getMinutes();
                    var seconds = commentDate.getSeconds();

                    var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year;

                    var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
                    ratingStr += '<div style="right: -6px;">';
                    for (var i = 0; i < rating; i++) {
                        ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                    }
                    for (var i = rating; i < 5; i++) {
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

                var options = new Array();
                options.push('Select a service...');

                for (var key in me.providedServices) {
                    options.push(me.providedServices[key]);
                }

                addFilterOptions("serviceEditComboBox", options);

                function getZones() {
                    var timeZoneNames = new Array();
                    $.getJSON("js/timeZoneNames.json", function (data, Status, xhr) {
                        //console.log(Status);
                        //console.log(data);
                        // data is a JavaScript object now. Handle it as such
                        //console.log("OK");
                        var zoneObj = data.main.en.dates.timeZoneNames.zone;
                        //console.log(zoneObj);
                        for (zone in zoneObj) {
                            for (name in zoneObj[zone]) {
                                //console.log(zone + '/' + name);
                                timeZoneNames.push(zone + '/' + name);
                            }
                        }
                        addOptions("timezoneSelect", timeZoneNames);

                        var zoneGuess = jstz.determine().name(); // Determines the time zone of the browser client
                        //console.log(zoneGuess);
                        setGroupFromTimeZone("timezoneSelect", zoneGuess);

                    });
                }

                function isNumberKey(evt) {
                    var maxlength = 4;
                    if (evt.currentTarget.value.length > maxlength)
                        return false;

                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
                        return false;

                    return true;
                }

                function showItemToEdit(service) {
                        var me = this;
                        if (document.getElementById("schedulePageCard")) {
                            document.getElementById("schedulePageCard").parentNode.removeChild(document.getElementById("schedulePageCard"));
                        }



                        var member = members.getMember(app.getUserID());
                        var services = member.getProvidedServices();

                        var schedulePageCard = document.createElement("div");
                        schedulePageCard.className = "schedule-page-card-div";
                        schedulePageCard.id = "schedulePageCard";

                        var scLeft = document.createElement("div");
                        scLeft.className = "sc-left-review";

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
                        hourlyFee.innerHTML = 'how much would you like to charge hourly ?';
                        var priceDiv = document.createElement("div");
                        var currencySign = document.createElement("p");
                        currencySign.className = "currencySignDiv"
                        currencySign.innerHTML = '$&nbsp;';
                        var hourlyFeeTextBox = document.createElement("input");
                        hourlyFeeTextBox.className = "fee-text-box";
                        hourlyFeeTextBox.onkeypress = isNumberKey;
                        hourlyFeeTextBox.id = "hourlyFeeTextBox";
                        hourlyFeeTextBox.type = "text";
                        priceDiv.appendChild(currencySign);
                        priceDiv.appendChild(hourlyFeeTextBox);
                        feeRow.appendChild(hourlyFee);
                        feeRow.appendChild(priceDiv);
                        profilePageFee.appendChild(feeRow);
                        if (services[service]) {
                            hourlyFeeTextBox.value = services[service].price;
                        }


                        var scLeftInfoTitle = document.createElement("div");
                        scLeftInfoTitle.className = "sc-left-info-title";
                        var green = document.createElement("p");
                        green.style.fontWeight = 'bold';
                        green.innerHTML = 'green means available';
                        scLeftInfoTitle.appendChild(green);

                        var calendarTime = document.createElement("div");
                        calendarTime.className = "sc-left-calendar-time-div";

                        var calContainer = document.createElement("div");
                        calContainer.id = "calContainer";
                        calContainer.className = "sc-left-calendar-div";
                        var ical = document.createElement("div");
                        ical.id = "ical";
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
                        calSelect.id = "calSelect";
                        var lineBreak = document.createElement("br");
                        hoursAppliesTo.appendChild(appliesTo);
                        hoursAppliesTo.appendChild(lineBreak);
                        hoursAppliesTo.appendChild(calSelect);






                        var timeCheckBoxesDiv = document.createElement("div");
                        for (var i = 7; i < 20; i++) {
                            var checkBox = document.createElement("input");
                            checkBox.type = "checkbox";
                            checkBox.name = "serviceTime";
                            checkBox.value = pad(i, 2);


                            var timeObj = convertTimeTo12(i + ':' + '00');
                            var hour = timeObj.hour;
                            var minute = timeObj.minute;
                            var ampm = timeObj.ampm;
                            localTimeStr = hour + ':' + minute + ampm;

                            var timeObj = convertTimeTo12((i + 1) + ':' + '00');
                            var hour = timeObj.hour;
                            var minute = timeObj.minute;
                            var ampm = timeObj.ampm;
                            localTimeStrPlusOne = hour + ':' + minute + ampm;

                            var textNode = localTimeStr + ' - ' + localTimeStrPlusOne;
                            var label = document.createElement("label");
                            var description = document.createTextNode(textNode);
                            label.appendChild(checkBox); // add the box to the element
                            label.appendChild(description); // add the description to the element
                            timeCheckBoxesDiv.appendChild(label);
                            timeCheckBoxesDiv.appendChild(document.createElement("br"));
                        }

                        var saveScheduleDiv = document.createElement("div");
                        saveScheduleDiv.style.position = "relative";
                        saveScheduleDiv.style.top = -400 + "px";
                        saveScheduleDiv.style.left = 160 + "px";
                        var saveSchedule = document.createElement("button");
                        saveSchedule.innerHTML = "save schedule";
                        saveSchedule.onclick = function () {
                            saveService(service);
                        };
                        //saveSchedule.onclick = new Function( 'saveService()');
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



                        var scheduleDates = [];
                        app.providerID = app.getUserID();
                        var provider = members.getMember(app.getUserID());
                        var cal = provider.getCalendar();
                        var serviceCal = cal[service];
                        for (var key in serviceCal) {
                            var split = key.split('/');
                            var d = parseInt(split[0], 10);
                            var m = parseInt(split[1], 10);
                            var y = parseInt(split[2], 10);
                            var dateStr = y + '-' + pad(m, 2) + '-' + pad(d, 2);
                            //console.log(serviceCal[key]);
                            var lsObj = localizeSch(serviceCal[key], app.getUserID(), d, m, y);
                            var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;
                            //console.log(localizedAppt);

                            scheduleDates.push({
                                date: dateStr,
                                title: '',
                                desc: lsObj.sch
                            });
                        }
                        app.providerID = null;



                        var cal = $("#ical").ical({
                            startOnSunday: true,
                            click: function (d) {
                                    console.log('SELECTED: ' + d);
                                    var split = d.split(".");
                                    var year = parseInt(split[2], 10);
                                    var month = parseInt(split[1], 10);
                                    var day = parseInt(split[0], 10);

                                    //console.log(year+'/'+month+'/'+day);

                                    var dtPRV = new timezoneJS.Date(year, month - 1, day);
                                    //console.log(app.DAYS[dtPRV.getDay()]);
                                    app.serviceDay = app.DAYS[dtPRV.getDay()] + ' ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear();

                                    var opts = new Array();
                                    opts[0] = 'Just this ' + app.DAYS[dtPRV.getDay()] + ' (' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear() + ')';
                                    opts[1] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getFullYear();
                                    opts[2] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + dtPRV.getFullYear();
                                    addOptions("calSelect", opts);



                                    var e = document.getElementById("serviceEditComboBox");
                                    var service = e.options[e.selectedIndex].value;
                                    var member = members.getMember(app.getUserID());
                                    //console.log(member.getCalendar());
                                    var cal = member.getCalendar();
                                    var serviceCal = cal[service];

                                    var date = pad(day, 2) + '/' + pad(month, 2) + '/' + year;
                                    //console.log(date);
                                    try {
                                        if (typeof serviceCal[date] !== 'undefined') {
                                            var mySchedule = serviceCal[date];
                                            //console.log(mySchedule);

                                            app.providerID = app.getUserID();
                                            showApptScheduler(mySchedule, '', day, month, year);
                                            app.providerID = null;
                                        } else {
                                            app.providerID = app.getUserID();
                                            showApptScheduler(null, '', day, month, year);
                                            app.providerID = null;
                                        }
                                    } catch (error) {}





                                } // fired when user clicked on day, in "d" stored date
                        });


                        //$("#ical").ical.changeEventDates(scheduleDates);


                        var dtPRV = new timezoneJS.Date();
                        //console.log(app.DAYS[dtPRV.getDay()]);

                        var opts = new Array();
                        opts[0] = 'Just this ' + app.DAYS[dtPRV.getDay()] + ' (' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear() + ')';
                        opts[1] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getFullYear();
                        opts[2] = 'All ' + app.DAYS[dtPRV.getDay()] + '\'s in ' + dtPRV.getFullYear();
                        addOptions("calSelect", opts);

                        updateMyCalendar();


                        function updateMyCalendar() {
                            var scheduleDates = new Array();
                            var e = document.getElementById("serviceEditComboBox");
                            var service = e.options[e.selectedIndex].value;
                            service = service.split(/\s*\$/)[0];
                            console.log('SERVICE: ' + service);

                            var provider = members.getMember(app.getUserID());
                            var cal = provider.getCalendar();
                            var serviceCal = cal[service];
                            for (var key in serviceCal) {
                                var split = key.split('/');
                                var d = parseInt(split[0], 10);
                                var m = parseInt(split[1], 10);
                                var y = parseInt(split[2], 10);
                                var dateStr = pad(d, 2) + '.' + pad(m, 2) + '.' + y;
                                console.log(serviceCal[key]);
                                app.providerID = app.getUserID();
                                var lsObj = localizeSch(serviceCal[key], app.getUserID(), d, m, y);
                                var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;
                                app.providerID = null;
                                console.log(localizedAppt);

                                scheduleDates.push({
                                    date: dateStr,
                                    title: '',
                                    desc: lsObj.sch
                                });
                            }
                            $("#ical").ical.changeEventDates(scheduleDates);
                        }
                        window.updateMyCalendar = updateMyCalendar;


                        function showApptScheduler(providerSchedule, mySchedule, day, month, year) {
                                var r = document.getElementsByName("serviceTime");
                                for (var i = 0; i < r.length; i++) {
                                    r[i].checked = false;
                                }

                                localizeApptScheduler(day, month, year);

                                enableGroup("serviceTime");
                                //enableGroup("selectService");
                                //addOptions("selectService", selected);
                                //disableGroup("serviceTime", controlValue);
                                //disableGroup("selectService", controlValue);

                                //Show previously selected options
                                if (providerSchedule) {
                                    setGroupsFromCalendar("serviceTime", providerSchedule);
                                }

                            } //showApptScheduler


                        function saveService(service) {
                            var price = currencyFormatted(Math.abs(document.getElementById('hourlyFeeTextBox').value));
                            //console.log(price);
                            var locality = document.getElementById('localitySelect').value;
                            //console.log(locality);
                            var timeZone = document.getElementById('timezoneSelect').value;
                            //console.log(timeZone);

                            //var province = Ext.get('serviceProvinceText').getValue();
                            //var postalCode = Ext.get('servicePostalCodeText').getValue();
                            //var radius = Ext.get('serviceRadiusText').getValue();

                            var member = members.getMember(app.getUserID());
                            member.tzName = timeZone;

                            //TODO:  Pull this out and add to onchange for timezoneSelect element
                            //Save tzName to database
                            $.ajax({
                                url: "./php/saveTZname.php",
                                data: {
                                    id: app.getUserID(),
                                    tzName: timeZone
                                },
                                type: 'post',
                                async: true
                            });

                            var providedServices = member.getProvidedServices();

                            //console.log("SERVICE: " + service);
                            if (!providedServices[service]) {
                                providedServices[service] = {};
                            }
                            providedServices[service].price = price;
                            providedServices[service].locality = locality;
                            member.providedServices = providedServices;
                            //Save providedServices to database
                            $.ajax({
                                url: "./php/saveServices.php",
                                data: {
                                    id: app.getUserID(),
                                    services: JSON.stringify(providedServices)
                                },
                                type: 'post',
                                async: true
                            });


                            saveCalendar();


                        }



                        function saveCalendar() {
                                var member = members.getMember(app.getUserID());
                                var calendar = member.getCalendar();
                                var service = SelectedService();
                                var e = document.getElementById("calSelect");
                                var opt = e.options[e.selectedIndex].value;
                                var serviceDay = app.getServiceDay();
                                console.log(serviceDay);
                                var dateObj = getDateIndexes(serviceDay);
                                var d = parseInt(dateObj.dayIndex, 10);
                                var m = parseInt(dateObj.monthIndex, 10);
                                var y = parseInt(dateObj.year, 10);
                                var weekDay = parseInt(dateObj.weekDay, 10);
                                var sch = getTimeGroup('serviceTime', true);
                                var availability = "AVAILABLE:<br>" + sch;

                                if (e.selectedIndex == 0) {
                                    var currDate = pad(d, 2) + '/' + pad(m, 2) + '/' + y;
                                    //SAVE CALENDAR
                                    console.log("Saving date: " + currDate + " -> " + availability);
                                    if (!calendar[service]) {
                                        calendar[service] = {};
                                    }
                                    calendar[service][currDate] = availability;
                                } else if (e.selectedIndex == 1) {
                                    saveDayThisMonth(d, m, y)
                                } else {
                                    saveDayThisYear(d, m, y, weekDay)
                                }

                                member.calendar = calendar;
                                //Save calendar to database
                                $.ajax({
                                    url: "./php/saveCalendar.php",
                                    data: {
                                        id: app.getUserID(),
                                        calendar: JSON.stringify(calendar)
                                    },
                                    type: 'post',
                                    async: true
                                });






                                function saveDayThisMonth(d, m, y) {
                                        var currDay = d;
                                        var currDate = d + "/" + m + "/" + y;

                                        var today = new Date();
                                        today.setDate(today.getDate() + 0);
                                        //console.log('TODAY: ' + today.getDate());
                                        var thisDate = today.getDate();
                                        var thisMonth = today.getMonth() + 1;
                                        var thisYear = today.getFullYear();
                                        console.log(y + " <= " + thisYear + " && " + m + " <= " + thisMonth);
                                        var calMinDate = (y <= thisYear && m <= thisMonth) ? thisDate : 0;

                                        console.log(currDay + " >= " + calMinDate);

                                        //rewind day to beginning of month
                                        while (isDate(currDate) && currDay >= calMinDate) {
                                            currDay = parseInt(currDay, 10) - 7;
                                            currDay = pad(currDay, 2);
                                            //console.log(day + " " + month);
                                            currDate = currDay + "/" + m + "/" + y;
                                            console.log(currDate);
                                        }
                                        currDay = parseInt(currDay, 10) + 7;
                                        currDay = pad(currDay, 2);
                                        //console.log(day + " " + month);
                                        currDate = currDay + "/" + m + "/" + y;


                                        while (isDate(currDate)) {
                                            //SAVE CALENDAR
                                            var day = pad(currDay, 2) + '/' + pad(m, 2) + '/' + y;
                                            console.log("Saving date: " + currDate);
                                            calendar[day] = availability;

                                            currDay = parseInt(currDay, 10) + 7;
                                            currDay = pad(currDay, 2);
                                            //console.log(day + " " + month);
                                            currDate = currDay + "/" + m + "/" + y;
                                        }
                                    } //saveDayThisMonth()



                                function saveDayThisYear(d, m, y, dayNumber) {
                                        //console.log('dayNumber: ' + dayNumber);
                                        d = pad(d, 2);
                                        m = pad(m, 2);

                                        var tDay = d + "/" + m + "/" + y;
                                        //console.log(tDay);
                                        var currDay = d;
                                        var currMonth = m;

                                        //rewind day to beginning of month
                                        while (isDate(tDay)) {
                                            currDay = saveDayThisMonth(currDay, currMonth, y);
                                            var now = new Date(y, currMonth, 1);
                                            var firstDay = now.getDay();
                                            //console.log('firstDay: ' + firstDay);
                                            currDay = 1 + (dayNumber - firstDay + 7) % 7;
                                            currDay = pad(currDay, 2);
                                            currMonth = parseInt(currMonth, 10) + 1;
                                            currMonth = pad(currMonth, 2);
                                            //console.log(currDay + " " + currMonth);
                                            tDay = currDay + "/" + currMonth + "/" + y;
                                        }
                                    } //saveDayThisYear()





                            } //saveCalendar()


                    } //showItemToEdit()


            } //populateProfileItems()



        ,
        populateScheduleItems: function (ID) {
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
                if (!rating) {
                    rating = 0;
                }

                var ratingStr = '<a href="#link-to-reviews"><div style="clear:both;"><div class="number-of-reviews-div">' + rates + ' reviews</div><div style="position: relative; top: 9px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
                ratingStr += '<div style="right: -6px;">';
                for (var i = 0; i < rating; i++) {
                    ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                }
                for (var i = rating; i < 5; i++) {
                    ratingStr += '<img src="./img/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                }
                ratingStr += '</div></div></div></a>';
                //console.log(ratingStr);

                // --Name--
                var name = member.getFullName();
                var url = member.getURL();
                var link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a href="' + url + '" target="_blank" style="font-size:12px; font-weight:700; text-align: center;">LinkedIn Profile</a><hr></div>';

                services = member.getProvidedServices();
                var company = member.getCompany() || '--';
                var companyTenure = member.getCompanyTenure(company);
                var industry = member.getIndustry() || '--';
                var industryTenure = member.getIndustryTenure(industry);
                var position = member.getTitle() || '--';
                var education = member.getEducation() || '--';
                //  Only display most recent education
                var split = education.split('<br>');
                education = split[0];
                var image = member.getImageSmall;
                //var image = productStore.getById(ID).data.image || 'http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a8/1fc/3597e0f.jpg';
                //if(settings[ID]['identity']) {name = ""; image = "./images/ghostSmall.png"; link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><a target="_blank" style="font-size:12px; font-weight:100; text-align: center;">--</a><hr></div>';}

                var window = document.getElementById("schedule-page-interviewer-card");
                window.innerHTML = '';

                var itemImage = document.createElement("div");
                itemImage.className = "circular-small";
                itemImage.style.background = 'url(' + image + ') no-repeat center center';

                var icLeft = document.createElement("div");
                icLeft.className = "ic-left";

                var itemName = document.createElement("div");
                itemName.className = "ic-left-name";
                itemName.innerHTML = name;
                icLeft.appendChild(itemName);

                var icLeftInfo = UserCardLeftInfo(industry, company, position, companyTenure, industryTenure, education, rates, rating);
                icLeft.appendChild(icLeftInfo);
                window.appendChild(icLeft);

                var icRight = document.createElement("div");
                icRight.className = "ic-right";

                var itemName = document.createElement("div");
                itemName.className = "ic-right-name";
                itemName.innerHTML = 'ask ' + member.getFirstName() + ' a question';
                icRight.appendChild(itemName);

                var icRightInfo = ScheduleServiceUserCardRightInfo();
                icRight.appendChild(icRightInfo);
                window.appendChild(icRight);

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
                scLeft.className = "sc-left-review";

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

                if (comments == undefined) {
                    var noReviewsDiv = document.createElement("div");
                    noReviewsDiv.className = "no-reviews-div";
                    noReviewsDiv.innerHTML = "No reviews for this person yet...";
                    scLeft.appendChild(noReviewsDiv);
                }

                for (var key in comments) {
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
                    var year = commentDate.getFullYear();
                    var month = this.MONTHS[commentDate.getMonth() + 1];
                    var weekDay = this.DAYS[commentDate.getDay()];
                    var day = commentDate.getDate();
                    var hours = commentDate.getHours();
                    var minutes = commentDate.getMinutes();
                    var seconds = commentDate.getSeconds();

                    var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year;

                    var ratingStr = '<div class="rating-starts"><div onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true;"><div style="z-index: 100; height: 35px;">';
                    ratingStr += '<div style="right: -6px;">';
                    for (var i = 0; i < rating; i++) {
                        ratingStr += '<img src="./img/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                    }
                    for (var i = rating; i < 5; i++) {
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

                var numInterviews = document.createElement("div");
                numInterviews.innerHTML = interviewsStr;
                numInterviews.style.textAlign = 'left';

                var numCharityCoins = document.createElement("div");
                numCharityCoins.innerHTML = charityCoinStr;
                numCharityCoins.style.textAlign = 'left';

                var itemServices = document.createElement("div");
                document.getElementById("scheduleItems").appendChild(schedulePageCard);

                var options = new Array();
                options.push('Select a service...');
                for (var key in services) {
                    if (key == "Remote Interview") {
                        document.getElementById("remote-interview-button").style.display = "inherit";
                        document.getElementById("remote-interview-button-label").innerHTML = "remote interview $" + services[key].price + "/hr";
                    }

                    if (key == "In-person Interview") {
                        document.getElementById("in-person-interview-button").style.display = "inherit";
                        document.getElementById("in-person-interview-button-label").innerHTML = "in-person interview $" + services[key].price + "/hr";
                    }

                    if (key == "Resume Review") {
                        document.getElementById("resume-review-button").style.display = "inherit";
                        document.getElementById("resume-review-button-label").innerHTML = "resume review $" + services[key].price + "/hr";
                    }
                }

                //addOptions2("selectServiceComboBox", options);
                //document.getElementById("selectServiceComboBox").onchange = function () {
                //    updateCalendar();
                //};

                //if (services['In-person Interview']) {
                //    document.getElementById("scheduleLocality").innerHTML = services['In-person Interview'].locality + ', ' + services['In-person Interview'].province;
                //}

                var scheduleTime = document.getElementById("scheduleTime");
                scheduleTime.innerHTML = '';
                scheduleTime.style.lineHeight = 0 + 'px';
                var timeCheckBoxesDiv = document.createElement("div");
                for (var i = 7; i < 20; i++) {
                    var checkBox = document.createElement("input");
                    checkBox.type = "checkbox";
                    checkBox.name = "serviceTime";
                    checkBox.value = pad(i, 2);
                    checkBox.onclick = new Function('getSubTotal()');
                    checkBox.style.lineHeight = 0 + 'px';

                    var timeObj = convertTimeTo12(i + ':' + '00');
                    var hour = timeObj.hour;
                    var minute = timeObj.minute;
                    var ampm = timeObj.ampm;
                    localTimeStr = hour + ':' + minute + ampm;

                    var timeObj = convertTimeTo12((i + 1) + ':' + '00');
                    var hour = timeObj.hour;
                    var minute = timeObj.minute;
                    var ampm = timeObj.ampm;
                    localTimeStrPlusOne = hour + ':' + minute + ampm;

                    var textNode = localTimeStr + ' - ' + localTimeStrPlusOne;
                    var label = document.createElement("label");
                    label.id = 'label' + pad(i, 2);
                    var description = document.createTextNode(textNode);
                    var description = document.createElement("span");
                    description.innerHTML = textNode;
                    label.appendChild(checkBox); // add the box to the element
                    label.appendChild(description); // add the description to the element
                    timeCheckBoxesDiv.appendChild(label);
                    timeCheckBoxesDiv.appendChild(document.createElement("br"));
                }
                scheduleTime.appendChild(timeCheckBoxesDiv);

                getSubTotal();

                var cal = $("#scheduleCal").ical({
                    startOnSunday: true,

                    eventdates: [],

                    click: function (d) {
                            var split = d.split("-");
                            var year = parseInt(split[0], 10);
                            var month = parseInt(split[1], 10);
                            var day = parseInt(split[2], 10);

                            var dtPRV = new timezoneJS.Date(year, month - 1, day);

                            app.apptDay = app.DAYS[dtPRV.getDay()] + ' ' + app.MONTHS[dtPRV.getMonth()] + ' ' + dtPRV.getDate() + ', ' + dtPRV.getFullYear();

                            var selectedService = SelectedService();
                            
                            var provider = members.getMember(app.getProviderID());
                            var member = members.getMember(app.getUserID());

                            try {
                                if (typeof provider.getCalendar()[selectedService] !== 'undefined' && typeof member.getCalendar()[selectedService] !== 'undefined') {

                                    var cal = provider.getCalendar();
                                    var serviceCal = cal[selectedService];

                                    var date = pad(day, 2) + '/' + pad(month, 2) + '/' + year;

                                    try {
                                        if (typeof serviceCal[date] !== 'undefined') {


                                            var providerSchedule = serviceCal[date];
                                            //console.log('PROVIDER SCHEDULE: ' + providerSchedule);

                                            //console.log(member.getCalendar());
                                            var cal = member.getCalendar();
                                            var serviceCal = cal[selectedService];

                                            var date = pad(day, 2) + '/' + pad(month, 2) + '/' + year;
                                            //console.log(date);

                                            try {
                                                if (typeof serviceCal[date] !== 'undefined') {
                                                    var mySchedule = serviceCal[date];
                                                    //console.log(mySchedule);

                                                    showApptScheduler(providerSchedule, mySchedule, day, month, year);
                                                } else {
                                                    showApptScheduler(null, null, day, month, year);
                                                }
                                            } catch (error) {}
                                        } else {
                                            showApptScheduler(null, null, day, month, year);
                                        }
                                    } catch (error) {}

                                } else {
                                    showApptScheduler(null, null, day, month, year);
                                }
                            } catch (error) {}

                        } // fired when user clicked on day, in "d" stored date
                });

                //$("#scheduleCal").ical.changeEventDates(scheduleDates);

                //{"date": "2012-08-08", "title": "My birthday", "desc": "Its my birthday!"},


                updateCalendar();


                function updateCalendar() {
                    
                    var scheduleDates = new Array();
                    var service = SelectedService();
                    service = service.split(/\s*\$/)[0];
                    var provider = members.getMember(app.getProviderID());
                    var cal = provider.getCalendar();
                    var serviceCal = cal[service];
                    for (var key in serviceCal) {
                        var split = key.split('/');
                        var d = parseInt(split[0], 10);
                        var m = parseInt(split[1], 10);
                        var y = parseInt(split[2], 10);
                        var dateStr = pad(d, 2) + '.' + pad(m, 2) + '.' + y;
                        var lsObj = localizeSch(serviceCal[key], app.getProviderID(), d, m, y);
                        var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;

                        scheduleDates.push({
                            date: dateStr,
                            title: '',
                            desc: lsObj.sch
                        });
                    }
                    $("#scheduleCal").ical.changeEventDates(scheduleDates);
                }
                window.updateCalendar = updateCalendar;

                function showApptScheduler(providerSchedule, mySchedule, day, month, year) {
                        var r = document.getElementsByName("serviceTime");
                        for (var i = 0; i < r.length; i++) {
                            r[i].checked = false;
                        }

                        localizeApptScheduler(day, month, year);

                        var controlValue = {};
                        if (providerSchedule) {
                            var split = providerSchedule.split('<br>');
                            split.shift();
                            for (var i = 0; i < split.length; i++) {
                                if (split[i]) {
                                    var timeStr = Number(split[i].match(/^(\d+)/)[1]) + ':00' + ' ' + split[i].match(/([ap]m)/);
                                    timeStr = timeStr.replace(/\,[ap]m$/, '');
                                    split[i] = convertTimeTo24(timeStr).hour;
                                    controlValue[split[i]] = true;
                                }
                            }
                        }
                        enableGroup("serviceTime");
                        disableGroup("serviceTime", controlValue);

                        if (mySchedule) {
                            setGroupsFromSchedule("serviceTime", mySchedule);
                        }
                        if (Object.size(this.cartItems)) {
                            var cartItemsSchedule = convertCartItemKeys(this.cartItems);
                            setGroupsFromSchedule("serviceTime", cartItemsSchedule);
                        }

                        if (mySchedule) {
                            disableGroupsFromSchedule("serviceTime", mySchedule);
                        }

                    } //showApptScheduler
                window.showApptScheduler = showApptScheduler;
            } //populateScheduleItems()
            ,
        populateMyHistory: function (arg) {
                var me = this;
                console.log("populateMyHistory()");
                arg = arg || document.getElementById('explore').value;
                document.getElementById('explore').value = arg;

                var el = document.getElementById("historyItems").innerHTML = "When you give or receive interview services, their information will show up here...";
                historyItemKeyArray = [];
                var companies = new Array();

                var member = members.getMember(app.getUserID());
                if (member.getRole() == 'give') {
                    populateProviderHistory(arg);
                } else if (member.getRole() == 'find') {
                    populateHistory(arg);
                } else {
                    populateProviderHistory(arg);
                    populateHistory(arg);
                }

                function populateProviderHistory(exp) {

                        var regExp = exp || ".";
                        regExp = regExp.replace(/\s+/g, "|");
                        var matchRE = new RegExp(regExp, "i");
                        //console.log(regExp);

                        var historyItems = {};

                        var member = members.getMember(app.getUserID());

                        historyItems = member.getProviderHistory();

                        for (var key in historyItems) {
                            console.log("KEY: " + key);
                            var split = key.split(/\:/);
                            var ID = split[0];
                            var day = split[1];
                            var status = '';
                            var dateFilter = '';

                            var first = member.getFirstName();
                            var last = member.getLastName();
                            var company = member.getCompany();
                            var position = member.getTitle();
                            var industry = member.getIndustry();


                            var feedback = member.getFeedback();
                            //var fbKey = user[0].inID + ':' + day;
                            var fbKey = ID + ':' + day;
                            //console.log("FBKEY: " + fbKey);
                            if (feedback[fbKey]) {
                                //console.log("HERE");
                                status = 'Completed';
                            } else {
                                //console.log(day);

                                var date = {};
                                date = getDateIndexes(day);

                                var d = parseInt(date.dayIndex, 10);
                                var m = parseInt(date.monthIndex, 10);
                                var y = parseInt(date.year, 10);
                                //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
                                var x = new Date();
                                x.setFullYear(y, m - 1, d);
                                var t = new Date();

                                if (x > t) {
                                    status = 'Scheduled';
                                } else {
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
                            var x = new Date();
                            x.setFullYear(y, m - 1, d);


                            //'< 1 month ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 1);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '< 1 month ago';
                            }

                            //'1-3 months ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 3);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '1-3 months ago';
                            }

                            //'4-6 months ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 6);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '4-6 months ago';
                            }

                            //'7-12 months ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 12);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '7-12 months ago';
                            }

                            //'> 1 year ago'
                            if (!dateFilter) {
                                dateFilter = '> 1 year ago';
                            }

                            //console.log(dateFilter);

                            var found = first.match(matchRE);
                            found += last.match(matchRE);
                            found += company.match(matchRE);
                            found += position.match(matchRE);
                            found += industry.match(matchRE);
                            //found += summary.match(matchRE);
                            found += status.match(matchRE);
                            found += dateFilter.match(matchRE);
                            if (ID == regExp) {
                                found++;
                            }
                            //console.log("FOUND: " + found);
                            if (found) {
                                historyItemKeyArray.push({
                                    key: key,
                                    id: ID,
                                    day: day,
                                    status: status,
                                    company: company,
                                    date: dateFilter
                                });
                                var found = 0;
                                for (var i = 0; i < companies.length; i++) {
                                    if (companies[i] === company) found++;
                                }
                                if (!found) {
                                    companies.push(company);
                                }
                            }

                        }
                        me.historyFilters.company = companies ? companies.sort() : {};

                        //applyHistoryFilters();
                        //historyItemKeyArray.sort(sortHistoryFunction)
                        populateProviderHistoryItems();

                        //if(exp) {pruneHistoryFilters();}




                        function populateProviderHistoryItems() {
                            console.log("populateProviderHistoryItems()");

                            //var companies = new Array();
                            var elID = "historyItems";
                            var help = '';
                            var index = 0;
                            var historyItems = {};
                            var member = members.getMember(app.getUserID());

                            historyItems = member.getProviderHistory();

                            for (index = 0; index < historyItemKeyArray.length; index++) {
                                var key = historyItemKeyArray[index].key;

                                console.log('KEY: ' + key);
                                var historyID = elID + index;
                                var closeHistoryID = 'close' + elID + index;
                                var blisterHistoryID = 'blister' + elID + index;

                                var split = key.split(/\:/);
                                var ID = split[0];
                                var day = split[1];
                                me.providerID = ID;
                                var provider = members.getMember(ID);
                                if (!provider) {
                                    continue;
                                }

                                var image = provider.getImage();

                                var date = {};
                                date = getDateIndexes(day);

                                var d = parseInt(date.dayIndex, 10);
                                var m = parseInt(date.monthIndex, 10);
                                var y = parseInt(date.year, 10);

                                var link = '';

                                if (!historyItems[key]) {
                                    continue;
                                }

                                split = historyItems[key].split('<br>');
                                split.shift();
                                var appt = split.join('<br>');
                                console.log(appt);
                                //console.log(ID);
                                var feedback = member.getFeedback();
                                var fbKey = ID + ':' + day;

                                var state;

                                //console.log("FBKey: " + fbKey);
                                //if(feedback[fbKey]) {console.log(feedback[fbKey]['knowledge']);}
                                //console.log("ID: " + split[1]);
                                //console.log("SETTING: " + imgID);
                                //console.log("STR: " + Ext.JSON.encode(feedback[fbKey]));
                                if (feedback[fbKey]) {
                                    link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:green;"> Completed</span></span><hr></div>';
                                    state = 'Completed';
                                } else {
                                    //console.log(day);

                                    var date = {};
                                    date = getDateIndexes(day);

                                    var d = parseInt(date.dayIndex, 10);
                                    var m = parseInt(date.monthIndex, 10);
                                    var y = parseInt(date.year, 10);
                                    //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
                                    var x = new Date();
                                    x.setFullYear(y, m - 1, d);
                                    var t = new Date();

                                    if (x > t) {
                                        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:yellow;"> Scheduled</span></span><hr></div>';
                                        state = 'Scheduled';
                                    } else {
                                        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:red;"> Waiting Feedback</span></span><hr></div>';
                                        state = 'Waiting Feedback';
                                    }
                                }

                                // --Rating--
                                var ratingStr = '';
                                var ratingObj = provider.getReviews();

                                var rating = Math.ceil(ratingObj.average);
                                var rates = ratingObj.total || 0;
                                //console.log(ratingObj.comments);
                                if (!rating) {
                                    rating = 0;
                                }

                                //var ratingStr = '<div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(Ext.JSON.encode(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
                                var ratingStr = '';
                                ratingStr += '<div style="right: -6px;">';
                                for (var i = rating; i < 5; i++) {
                                    ratingStr += '<img src="images/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                                }
                                for (var i = 0; i < rating; i++) {
                                    ratingStr += '<img src="images/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                                }
                                ratingStr += '</div></div><div style="color: #555; text-align: right; position: absolute; top: 15px; right: 0px;">' + rates + ' Reviews</div></div>';

                                // --Name--
                                var name = provider.getFullName();
                                var url = provider.getURL();
                                var label = name;
                                //console.log(label);

                                var lsObj = localizeSch(appt, ID, d, m, y);
                                localDay = lsObj.dateStr;
                                console.log(lsObj.sch);
                                var schObj = getServiceFromSchedule(lsObj.sch);
                                var service = schObj.service;
                                var duration = schObj.duration;
                                // --Services--
                                services = member.getProvidedServices();
                                var locality = services[service].locality;
                                var province = services[service].province;
                                //console.log(services);
                                var help = '<div style="position: absolute; top: 244px; text-align: left; color: #444; font-weight: lighter; width: 200px;"><div style="font-weight: bold; text-align: left; width: 200px;">' + localDay + '</div>' + lsObj.sch;
                                help += '</div>';
                                //console.log(help);

                                // --Company--
                                var company = provider.getCompany();
                                var found = 0;
                                //for(var i = 0; i < companies.length; i++) {if(companies[i] === company) found++;}
                                //if(!found) {companies.push(company);}
                                var companyTenure = provider.getCompanyTenure();

                                // --Industry--
                                var indsutry = provider.getIndustry();
                                var industryTenure = member.getIndustryTenure();

                                // --Position--
                                var position = provider.getTitle();

                                var education = provider.getEducation();
                                //  Only display most recent education
                                var split = education.split('<br>');
                                education = split[0];

                                // --Image--
                                var image = provider.getImageSmall();

                                var privacy = provider.getPrivacy();
                                if (privacy.identity) {
                                    label = "";
                                    image = "./images/ghostSmall.png";
                                }




                                var wrapper = document.createElement("div");
                                wrapper.className = "history-page-card-div";

                                var window = document.createElement("div");
                                //window.className = "providerHistoryItem";
                                window.className = "sc-left";
                                window.id = "historyItem" + index;

                                fbKey = ID + ':' + day;
                                ID = me.getUserID();

                                //if(link.match('Completed'))   {window.onclick = new Function( 'doFeedback(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}
                                //else if(link.match('Waiting'))   {window.onclick = new Function( 'doFeedback(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}


                                var historyPageTitle = document.createElement("div");
                                historyPageTitle.className = "history-page-title-div";

                                var historyPageTitleLeft = document.createElement("div");
                                historyPageTitleLeft.className = "history-page-title-left-div";
                                historyPageTitleLeft.innerHTML = service + ' -- ' + day;
                                historyPageTitleLeft.style.fontSize = 26 + 'px';

                                var historyPageTitleRight = document.createElement("div");
                                historyPageTitleRight.className = "history-page-title-right-div";
                                historyPageTitleRight.innerHTML = 'status: <span class="status">' + state + '</span>';

                                historyPageTitle.appendChild(historyPageTitleLeft);
                                historyPageTitle.appendChild(historyPageTitleRight);

                                window.appendChild(historyPageTitle);


                                var scLeftInfo = document.createElement("div");
                                scLeftInfo.className = "sc-left-info";
                                var hourStr = (parseInt(duration, 10) > 1) ? 'hours' : 'hour';
                                scLeftInfo.innerHTML = '<p><b>interviewee</b> - ' + name + '</p><p><b>location</b> - ' + locality + ', ' + province + '</p><p><b>duration</b> - ' + duration + ' ' + hourStr + '</p><p><b>CV</b> - <a href="">download</a></p>';
                                window.appendChild(scLeftInfo);

                                var historyPageTextarea = document.createElement("div");
                                historyPageTextarea.className = "history-page-textarea-div";
                                historyPageTextarea.innerHTML = '<div class="interview-report-title-div">interview report</div><div class="interview-report-div"><textarea class="interview-report-text-area"></textarea></div><div class="share-the-report-div"><button class="share-the-report-button">share the report</button></div></div>';
                                window.appendChild(historyPageTextarea);


                                var historyPageTextarea = document.createElement("div");
                                historyPageTextarea.className = "history-page-textarea-div";
                                historyPageTextarea.innerHTML = '<div class="interview-report-title-div">interviewee feedback</div><div class="interview-report-div"><textarea readonly class="interview-report-text-area"></textarea></div>';
                                window.appendChild(historyPageTextarea);

                                wrapper.appendChild(window);



                                var itemImage = document.createElement("div");
                                itemImage.className = "circular-small";
                                itemImage.style.background = 'url(' + image + ') no-repeat center center';
                                //itemImage.style.background = 'url(' + image + ') no-repeat';


                                /*
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
                  */

                                document.getElementById(elID).appendChild(wrapper);

                            }

                        }
                    } //populateProviderHistory(exp)




                function populateHistory(exp) {

                        var regExp = exp || ".";
                        regExp = regExp.replace(/\s+/g, "|");
                        var matchRE = new RegExp(regExp, "i");
                        //console.log(regExp);

                        var historyItems = {};

                        var member = members.getMember(app.getUserID());

                        historyItems = member.getHistory();


                        for (var key in historyItems) {
                            console.log("KEY: " + key);
                            var split = key.split(/\:/);
                            var ID = split[0];
                            var day = split[1];
                            var status = '';
                            var dateFilter = '';
                            var provider = members.getMember(ID);
                            if (!provider) {
                                continue;
                            }

                            var first = provider.getFirstName();
                            var last = provider.getLastName();
                            var company = provider.getCompany();
                            var position = provider.getTitle();
                            var industry = provider.getIndustry();


                            var feedback = provider.getFeedback();
                            //var fbKey = user[0].inID + ':' + day;
                            var fbKey = app.getUserID() + ':' + day;
                            //console.log("FBKEY: " + fbKey);
                            if (feedback[fbKey]) {
                                //console.log("HERE");
                                status = 'Completed';
                            } else {
                                //console.log(day);

                                var date = {};
                                date = getDateIndexes(day);

                                var d = parseInt(date.dayIndex, 10);
                                var m = parseInt(date.monthIndex, 10);
                                var y = parseInt(date.year, 10);
                                //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
                                var x = new Date();
                                x.setFullYear(y, m - 1, d);
                                var t = new Date();

                                if (x > t) {
                                    status = 'Scheduled';
                                } else {
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
                            var x = new Date();
                            x.setFullYear(y, m - 1, d);


                            //'< 1 month ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 1);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '< 1 month ago';
                            }

                            //'1-3 months ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 3);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '1-3 months ago';
                            }

                            //'4-6 months ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 6);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '4-6 months ago';
                            }

                            //'7-12 months ago'
                            var y = new Date();
                            y.setMonth(y.getMonth() - 12);
                            var year = y.getFullYear();
                            var month = me.MONTHS[y.getMonth()];
                            var weekDay = me.DAYS[y.getDay()];
                            var dayIndex = y.getDate();
                            var futureDay = weekDay + ' ' + month + ' ' + dayIndex + ', ' + year;
                            //console.log(y.getMonth()+1);
                            //console.log("DAY: " + day + " FUTURE: " + futureDay);
                            if (x > y && !dateFilter) {
                                dateFilter = '7-12 months ago';
                            }

                            //'> 1 year ago'
                            if (!dateFilter) {
                                dateFilter = '> 1 year ago';
                            }

                            //console.log(dateFilter);

                            var found = first.match(matchRE);
                            found += last.match(matchRE);
                            found += company.match(matchRE);
                            found += position.match(matchRE);
                            found += industry.match(matchRE);
                            //found += summary.match(matchRE);
                            found += status.match(matchRE);
                            found += dateFilter.match(matchRE);
                            if (ID == regExp) {
                                found++;
                            }
                            //console.log("FOUND: " + found);
                            if (found) {
                                historyItemKeyArray.push({
                                    key: key,
                                    id: ID,
                                    day: day,
                                    status: status,
                                    company: company,
                                    date: dateFilter
                                });
                                var found = 0;
                                for (var i = 0; i < companies.length; i++) {
                                    if (companies[i] === company) found++;
                                }
                                if (!found) {
                                    companies.push(company);
                                }
                            }

                        }
                        me.historyFilters.company = companies ? companies.sort() : {};

                        //applyHistoryFilters();
                        //historyItemKeyArray.sort(sortHistoryFunction)
                        populateHistoryItems();

                        //if(exp) {pruneHistoryFilters();}




                        function populateHistoryItems() {
                            console.log("populateHistoryItems()");

                            //var companies = new Array();
                            var elID = "historyItems";
                            var help = '';
                            var index = 0;
                            var historyItems = {};
                            var member = members.getMember(app.getUserID());

                            historyItems = member.getHistory();

                            for (index = 0; index < historyItemKeyArray.length; index++) {
                                var key = historyItemKeyArray[index].key;

                                console.log('KEY: ' + key);
                                var historyID = elID + index;
                                var closeHistoryID = 'close' + elID + index;
                                var blisterHistoryID = 'blister' + elID + index;

                                var split = key.split(/\:/);
                                var ID = split[0];
                                var day = split[1];
                                me.providerID = ID;
                                var provider = members.getMember(ID);
                                if (!provider) {
                                    continue;
                                }

                                var image = provider.getImage();

                                var date = {};
                                date = getDateIndexes(day);

                                var d = parseInt(date.dayIndex, 10);
                                var m = parseInt(date.monthIndex, 10);
                                var y = parseInt(date.year, 10);

                                var link = '';

                                if (!historyItems[key]) {
                                    continue;
                                }

                                split = historyItems[key].split('<br>');
                                split.shift();
                                var appt = split.join('<br>');
                                console.log(appt);
                                //console.log(ID);
                                var feedback = member.getFeedback();
                                var fbKey = ID + ':' + day;

                                var state;

                                //console.log("FBKey: " + fbKey);
                                //if(feedback[fbKey]) {console.log(feedback[fbKey]['knowledge']);}
                                //console.log("ID: " + split[1]);
                                //console.log("SETTING: " + imgID);
                                //console.log("STR: " + Ext.JSON.encode(feedback[fbKey]));
                                if (feedback[fbKey]) {
                                    link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:green;"> Completed</span></span><hr></div>';
                                    state = 'Completed';
                                } else {
                                    //console.log(day);

                                    var date = {};
                                    date = getDateIndexes(day);

                                    var d = parseInt(date.dayIndex, 10);
                                    var m = parseInt(date.monthIndex, 10);
                                    var y = parseInt(date.year, 10);
                                    //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
                                    var x = new Date();
                                    x.setFullYear(y, m - 1, d);
                                    var t = new Date();

                                    if (x > t) {
                                        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:yellow;"> Scheduled</span></span><hr></div>';
                                        state = 'Scheduled';
                                    } else {
                                        link = '<div style="position: absolute; top: 200px; width: 200px;"><hr><span style="font-size:12px; font-weight:bold; text-align: center;">Status: <span style="color:red;"> Waiting Feedback</span></span><hr></div>';
                                        state = 'Waiting Feedback';
                                    }
                                }

                                // --Rating--
                                var ratingStr = '';
                                var ratingObj = provider.getReviews();

                                var rating = Math.ceil(ratingObj.average);
                                var rates = ratingObj.total || 0;
                                //console.log(ratingObj.comments);
                                if (!rating) {
                                    rating = 0;
                                }

                                //var ratingStr = '<div style="position: absolute; top: 6px; width: 200px;" onmouseover="this.style.cursor=\'pointer\';" onclick="event = event || window.event; event.stopPropagation(); event.cancelBubble = true; showRatings(\'' + encodeURI(Ext.JSON.encode(ratingObj.comments)) + '\',' + index + ',this.parentNode.parentNode.id' + ',\'' + ID + '\');"><div style="z-index: 100; height: 35px;">';
                                var ratingStr = '';
                                ratingStr += '<div style="right: -6px;">';
                                for (var i = rating; i < 5; i++) {
                                    ratingStr += '<img src="images/starEmpty.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                                }
                                for (var i = 0; i < rating; i++) {
                                    ratingStr += '<img src="images/star.png" style="z-index: 99; margin-right: 4px; height: 15px;"/>';
                                }
                                ratingStr += '</div></div><div style="color: #555; text-align: right; position: absolute; top: 15px; right: 0px;">' + rates + ' Reviews</div></div>';

                                // --Name--
                                var name = provider.getFullName();
                                var url = provider.getURL();
                                var label = name;
                                //console.log(label);

                                var lsObj = localizeSch(appt, ID, d, m, y);
                                localDay = lsObj.dateStr;
                                console.log(lsObj.sch);
                                var schObj = getServiceFromSchedule(lsObj.sch);
                                var service = schObj.service;
                                var duration = schObj.duration;
                                // --Services--
                                services = member.getProvidedServices();
                                var locality = services[service].locality;
                                var province = services[service].province;
                                //console.log(services);
                                var help = '<div style="position: absolute; top: 244px; text-align: left; color: #444; font-weight: lighter; width: 200px;"><div style="font-weight: bold; text-align: left; width: 200px;">' + localDay + '</div>' + lsObj.sch;
                                help += '</div>';
                                //console.log(help);

                                // --Company--
                                var company = provider.getCompany();
                                var found = 0;
                                //for(var i = 0; i < companies.length; i++) {if(companies[i] === company) found++;}
                                //if(!found) {companies.push(company);}
                                var companyTenure = provider.getCompanyTenure();

                                // --Industry--
                                var indsutry = provider.getIndustry();
                                var industryTenure = member.getIndustryTenure();

                                // --Position--
                                var position = provider.getTitle();

                                var education = provider.getEducation();
                                //  Only display most recent education
                                var split = education.split('<br>');
                                education = split[0];

                                // --Image--
                                var image = provider.getImageSmall();

                                var privacy = provider.getPrivacy();
                                if (privacy.identity) {
                                    label = "";
                                    image = "./images/ghostSmall.png";
                                }




                                var wrapper = document.createElement("div");
                                wrapper.className = "history-page-card-div";

                                var window = document.createElement("div");
                                //window.className = "providerHistoryItem";
                                window.className = "sc-left";
                                window.id = "historyItem" + index;

                                fbKey = ID + ':' + day;
                                ID = me.getUserID();

                                //if(link.match('Completed'))   {window.onclick = new Function( 'doFeedback(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}
                                //else if(link.match('Waiting'))   {window.onclick = new Function( 'doFeedback(\'' + encodeURI(Ext.JSON.encode(feedback[fbKey])) + '\',\'' + fbKey + '\',\'' + ID + '\')');}


                                var historyPageTitle = document.createElement("div");
                                historyPageTitle.className = "history-page-title-div-service-received";

                                var historyPageTitleLeft = document.createElement("div");
                                historyPageTitleLeft.className = "history-page-title-left-div";
                                historyPageTitleLeft.innerHTML = service + ' -- ' + day;
                                historyPageTitleLeft.style.fontSize = 26 + 'px';

                                var historyPageTitleRight = document.createElement("div");
                                historyPageTitleRight.className = "history-page-title-right-div";
                                historyPageTitleRight.innerHTML = 'status: <span class="status">' + state + '</span>';

                                historyPageTitle.appendChild(historyPageTitleLeft);
                                historyPageTitle.appendChild(historyPageTitleRight);

                                window.appendChild(historyPageTitle);


                                var scLeftInfo = document.createElement("div");
                                scLeftInfo.className = "sc-left-info";
                                var hourStr = (parseInt(duration, 10) > 1) ? 'hours' : 'hour';
                                scLeftInfo.innerHTML = '<p><b>interviewer</b> - ' + name + '</p><p><b>location</b> - ' + locality + ', ' + province + '</p><p><b>duration</b> - ' + duration + ' ' + hourStr + '</p><p><b>CV</b> - <a href="">download</a></p>';
                                window.appendChild(scLeftInfo);

                                var historyPageTextarea = document.createElement("div");
                                historyPageTextarea.className = "history-page-textarea-div";
                                historyPageTextarea.innerHTML = '<div class="interview-report-title-div">interview report</div><div class="interview-report-div"><textarea class="interview-report-text-area"></textarea></div>';
                                window.appendChild(historyPageTextarea);


                                var historyPageTextarea = document.createElement("div");
                                historyPageTextarea.className = "history-page-textarea-div";
                                historyPageTextarea.innerHTML = '<div class="interview-report-title-div">interviewee feedback</div><div class="interview-report-div"><textarea readonly class="interview-report-text-area"></textarea></div><div class="share-the-report-div"><button class="share-the-report-button">share the feedback</button></div>';
                                window.appendChild(historyPageTextarea);

                                wrapper.appendChild(window);



                                var itemImage = document.createElement("div");
                                itemImage.className = "circular-small";
                                itemImage.style.background = 'url(' + image + ') no-repeat center center';
                                //itemImage.style.background = 'url(' + image + ') no-repeat';


                                /*
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
                  */

                                document.getElementById(elID).appendChild(wrapper);

                            }

                        }
                    } //populateHistory(exp)



                function sortHistoryFunction(a, b) {
                        //Compare "a" and "b" in some fashion, and return <0, 0, or >0
                        //Less than 0: Sort "a" to be a lower index than "b"
                        //Zero: "a" and "b" should be considered equal, and no sorting performed.
                        //Greater than 0: Sort "b" to be a lower index than "a".

                        var e = document.getElementById("sortHistory");
                        var opt = e.options[e.selectedIndex].value;
                        //console.log(opt);  

                        if (opt == 'company') {
                            if (productStore.getById(a.id).data.company < productStore.getById(b.id).data.company) {
                                return -1;
                            }
                            if (productStore.getById(a.id).data.company > productStore.getById(b.id).data.company) {
                                return 1;
                            }
                            return 0;
                        } else if (opt == 'status') {
                            //console.log(a.status + " > " + b.status);
                            return a.status > b.status;
                        } else if (opt == 'date') {
                            var date = {};
                            date = getDateIndexes(a.day);
                            var d = parseInt(date.dayIndex, 10);
                            var m = parseInt(date.monthIndex, 10);
                            var y = parseInt(date.year, 10);
                            //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
                            var aDate = new Date();
                            aDate.setFullYear(y, m - 1, d);

                            date = getDateIndexes(b.day);
                            var d = parseInt(date.dayIndex, 10);
                            var m = parseInt(date.monthIndex, 10);
                            var y = parseInt(date.year, 10);
                            //console.log('DAY: ' + d + ' MONTH: ' + m + ' YEAR: ' + y);
                            var bDate = new Date();
                            bDate.setFullYear(y, m - 1, d);

                            if (aDate < bDate) {
                                return -1;
                            } else if (aDate > bDate) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    } //sortHistoryFunction(a, b)


                function applyHistoryFilters() {
                        var me = this;

                        var filterType = 'and';
                        var filtered = new Array();
                        var toSave = new Array();

                        for (var j = 0; j < me.sortedHistoryFilteredList.length; j++) {
                            var ID = me.sortedHistoryFilteredList[j].id;
                            toSave[ID] = (filterType == 'and') ? true : false;
                            //console.log("\n\nID: " + ID);
                            var member = members.getMember(ID);

                            for (var key in me.historyFilters) {
                                //console.log("--KEY: " + key);
                                var filterName = 'historyFilter_' + key;
                                var e = document.getElementById(filterName);
                                var opt = e.options[e.selectedIndex].value;
                                var value = member.get(key + 'historyFilter');
                                var found = (opt == key) ? true : false;
                                var currValue = (key != 'services') ? value : 'services';
                                //console.log("CURRVALUE: " + currValue);

                                if (key == 'services') {
                                    var services = member.getProvidedServices();
                                    if (!Object.size(services)) {
                                        found = true;
                                    }

                                    for (var service in services) {
                                        //console.log(service + ' == ' + opt);
                                        if (service == opt) {
                                            found = true;
                                        }
                                    }
                                } //if(key == 'services')
                                else {
                                    //console.log(currValue + ' == ' + opt);
                                    if (currValue == opt) {
                                        found = true;
                                    }
                                }
                                if (filterType == 'and')
                                    toSave[ID] &= found;
                                else
                                    toSave[ID] |= found;
                            }
                        }
                        for (var key in toSave) {
                            if (toSave[key]) {
                                filtered.push({
                                    id: key
                                })
                            };
                        }
                        me.sortedHistoryFilteredList = filtered;
                    } //applyFilters()


            } //,populateMyHistory: function(arg)



        ,
        saveCart: function (ID, cartItems) {
            //console.log("Saving cart..." + ID);

            $.ajax({
                url: "./php/saveCart.php",
                data: {
                    id: ID,
                    cart: JSON.stringify(cartItems)
                },
                type: 'post',
                async: true
            });
        }



        ,
        makePayment: function (vendor) {
                //console.log("makePayment: " + vendor);

                var me = this;
                var itemStr = '';
                var idx = 1;

                //var returnUrl = "http://www.interviewring.com/index.php?return&ID=" + app.getUserID() + "&CODE=" + document.getElementById('promoForm').value;
                var returnUrl = "http://www.interviewring.com/index.php#!Return&ID=" + app.getUserID() + "&CODE=" + 'NONE';
                //console.log(returnUrl);
                //return;

                var currentDate = new Date();
                var year = currentDate.getFullYear();
                var month = currentDate.getMonth() + 1;
                var day = currentDate.getDate();
                var hours = currentDate.getHours();
                var minutes = currentDate.getMinutes();
                var seconds = currentDate.getSeconds();
                var orderID = year + '.' + month + '.' + day + '.' + hours + '.' + minutes + '.' + seconds;

                var total = getSubTotal();

                var myTotal = currencyFormatted(total);

                ga('ecommerce:addTransaction', {
                    'id': orderID, // Transaction ID. Required.
                    'affiliation': 'interviewring', // Affiliation or store name.
                    'revenue': myTotal, // Grand Total.
                    'shipping': '0', // Shipping.
                    'tax': '0' // Tax.
                });

                app.saveCart(app.getUserID(), me.cartItems);

                for (var key in me.cartItems) {
                    var split = key.split(/\:/);
                    var ID = split[0];
                    var item = me.cartItems[key];
                    if (!item) {
                        continue;
                    }
                    //console.log("ITEM: " + item + " KEY: " + key);
                    var date = key.split(':')[1];
                    //console.log(date);
                    var dateObj = getDateIndexes(date);

                    var d = parseInt(dateObj.dayIndex, 10);
                    //console.log(d);
                    var m = parseInt(dateObj.monthIndex - 1, 10);
                    var y = parseInt(dateObj.year, 10);
                    var dateStr = y + '-' + pad(m, 2) + '-' + pad(d, 2);
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
                        'id': orderID, // Transaction ID. Required.
                        'name': desc, // Product name. Required.
                        'sku': sku, // SKU/code.
                        'category': 'service', // Category or variation.
                        'price': unitPrice, // Unit price.
                        'quantity': quantity // Quantity.
                    });
                    idx++;
                }


                var cbtStr = "Confirm your purchase from interviewring.com";
                var ppID = "XD9GN72N4QU38";

                //console.log("TOTAL: " + total);

                if (!total) {

                    var pre = '<form name="paymentSubmit" action="' + returnUrl + '" method="post">';
                    var disc = '<input type="hidden" name="custom" value="' + customStr + '">';
                    var post = '<input class="submitDummy" type="image" name="submit" border="0" src="./img/0.gif" onclick="ga(\'send\', \'event\', \'button\', \'click\', \'submit\');"/></form>';


                    var form = document.createElement("div");
                    form.id = "paymentForm";
                    form.innerHTML = pre + itemStr + disc + post;
                    document.body.appendChild(form);

                    //document.getElementById('paymentForm').innerHTML = pre + itemStr + disc + post;

                    ga('ecommerce:send'); //submits transaction to the Analytics servers
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

                ga('ecommerce:send'); //submits transaction to the Analytics servers
                document.paymentSubmit.submit();

            } //makePayment()

        ,
        paymentReturn: function (providerID, total, lsObj) {

            var page = document.getElementById('return');
            page.innerHTML = '';

            var provider = members.getMember(providerID);

            // --Company--
            var company = provider.getCompany() || '--';
            var companyTenure = provider.getCompanyTenure(company);

            // --Industry--
            var industry = provider.getIndustry() || '--';
            var industryTenure = provider.getIndustryTenure(industry);

            // --Position--
            var position = provider.getTitle() || '--';

            var education = provider.getEducation() || '--';
            //  Only display most recent education
            var split = education.split('<br>');
            education = split[0];



            //var lsObj = localizeSch(appt, ID, d, m, y);
            localDay = lsObj.dateStr;
            //console.log(lsObj.sch);
            var schObj = getServiceFromSchedule(lsObj.sch);
            var service = schObj.service;
            var duration = schObj.duration;
            //console.log(service);
            //console.log(duration);
            // --Services--
            services = provider.getProvidedServices();
            var locality = services[service].locality;
            var province = services[service].province;
            var notes = '';


            var holder = document.createElement("div");
            holder.className = "holder";
            holder.style.color = '#383838';
            holder.style.fontFamily = '"Ubuntu", sans-serif';
            holder.style.fontSize = '40px';
            holder.style.paddingBottom = '0px';
            holder.style.boxShadow = '0 4px 4px -4px #222222';
            holder.style.textAlign = 'center';




            var scheduleInfoThanks = document.createElement("div");
            scheduleInfoThanks.className = "schedule-info-thanks";
            scheduleInfoThanks.style.width = 1070 + 'px';
            scheduleInfoThanks.style.margin = 'auto';
            scheduleInfoThanks.style.backgroundColor = '#fff2e8';
            scheduleInfoThanks.style.fontSize = 50 + 'px';
            scheduleInfoThanks.style.lineHeight = 70 + 'px';
            scheduleInfoThanks.style.margin = '20px 0px';
            scheduleInfoThanks.style.textAlign = 'left';
            scheduleInfoThanks.style.borderLeft = '15px solid #ff5100';
            scheduleInfoThanks.style.boxShadow = '0px 0px 20px 6px rgba(0,0,0,0.10)';
            scheduleInfoThanks.style.marginTop = '50px';
            scheduleInfoThanks.style.marginBottom = '50px';
            scheduleInfoThanks.style.paddingLeft = '20px';
            scheduleInfoThanks.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            scheduleInfoThanks.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            scheduleInfoThanks.style.boxSizing = 'border-box'; /* Opera/IE 8+ */



            var scheduleInfoInterviewerCard = document.createElement("div");
            scheduleInfoInterviewerCard.className = "schedule-info-interviewer-card";
            scheduleInfoInterviewerCard.style.width = 1070 + 'px';
            scheduleInfoInterviewerCard.style.margin = 'auto';
            scheduleInfoInterviewerCard.style.backgroundColor = '#fff2e8';
            scheduleInfoInterviewerCard.style.fontSize = 50 + 'px';
            scheduleInfoInterviewerCard.style.lineHeight = 70 + 'px';
            scheduleInfoInterviewerCard.style.margin = '20px 0px';
            scheduleInfoInterviewerCard.style.textAlign = 'left';
            scheduleInfoInterviewerCard.style.borderLeft = '15px solid #ff5100';
            scheduleInfoInterviewerCard.style.boxShadow = '0px 0px 20px 6px rgba(0,0,0,0.10)';
            scheduleInfoInterviewerCard.style.marginTop = '50px';
            scheduleInfoInterviewerCard.style.marginBottom = '50px';
            scheduleInfoInterviewerCard.style.height = '265px';
            scheduleInfoInterviewerCard.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            scheduleInfoInterviewerCard.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            scheduleInfoInterviewerCard.style.boxSizing = 'border-box'; /* Opera/IE 8+ */

            var icLeftName = document.createElement("div");
            icLeftName.className = "ic-left-name";
            icLeftName.style.fontWeight = '800';
            icLeftName.style.fontSize = '35px';
            icLeftName.style.color = '#ff5100';
            icLeftName.style.lineHeight = '60px';
            icLeftName.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            icLeftName.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            icLeftName.style.boxSizing = 'border-box'; /* Opera/IE 8+ */
            icLeftName.style.paddingLeft = '20px';
            icLeftName.style.borderBottom = '1px solid #ff5100';
            icLeftName.style.height = '60px';


            icLeftName.innerHTML = 'You are meeting with ' + provider.getFullName();

            var icLeftInfo = document.createElement("div");
            icLeftInfo.className = "ic-left-info";
            icLeftInfo.style.fontWeight = '200';
            icLeftInfo.style.fontSize = '15px';
            icLeftInfo.style.lineHeight = '19px';
            icLeftInfo.style.color = '#3D3D3D';
            icLeftInfo.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            icLeftInfo.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            icLeftInfo.style.boxSizing = 'border-box'; /* Opera/IE 8+ */
            icLeftInfo.style.paddingLeft = '25px';
            icLeftInfo.style.paddingTop = '10px';



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

            scheduleInfoInterviewerCard.appendChild(icLeftName);
            scheduleInfoInterviewerCard.appendChild(icLeftInfo);




            var scheduleInfoLocationCard = document.createElement("div");
            scheduleInfoLocationCard.className = "schedule-info-location-card";
            scheduleInfoLocationCard.style.width = 1070 + 'px';
            scheduleInfoLocationCard.style.margin = 'auto';
            scheduleInfoLocationCard.style.backgroundColor = '#fff2e8';
            scheduleInfoLocationCard.style.fontSize = 50 + 'px';
            scheduleInfoLocationCard.style.lineHeight = 70 + 'px';
            scheduleInfoLocationCard.style.margin = '20px 0px';
            scheduleInfoLocationCard.style.textAlign = 'left';
            scheduleInfoLocationCard.style.borderLeft = '15px solid #ff5100';
            scheduleInfoLocationCard.style.boxShadow = '0px 0px 20px 6px rgba(0,0,0,0.10)';
            scheduleInfoLocationCard.style.marginTop = '50px';
            scheduleInfoLocationCard.style.marginBottom = '50px';
            scheduleInfoLocationCard.style.height = '265px';
            scheduleInfoLocationCard.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            scheduleInfoLocationCard.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            scheduleInfoLocationCard.style.boxSizing = 'border-box'; /* Opera/IE 8+ */

            var icLeftName = document.createElement("div");
            icLeftName.className = "ic-left-name";
            icLeftName.style.fontWeight = '800';
            icLeftName.style.fontSize = '35px';
            icLeftName.style.color = '#ff5100';
            icLeftName.style.lineHeight = '60px';
            icLeftName.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            icLeftName.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            icLeftName.style.boxSizing = 'border-box'; /* Opera/IE 8+ */
            icLeftName.style.paddingLeft = '20px';
            icLeftName.style.borderBottom = '1px solid #ff5100';
            icLeftName.style.height = '60px';
            icLeftName.innerHTML = 'Meeting Details';

            var icLeftInfo = document.createElement("div");
            icLeftInfo.className = "ic-left-info";
            icLeftInfo.style.fontWeight = '200';
            icLeftInfo.style.fontSize = '15px';
            icLeftInfo.style.lineHeight = '19px';
            icLeftInfo.style.color = '#3D3D3D';
            icLeftInfo.style.webkitBoxSizing = 'border-box'; /* Safari/Chrome, other WebKit */
            icLeftInfo.style.MozBoxSizing = 'border-box'; /* Firefox, other Gecko */
            icLeftInfo.style.boxSizing = 'border-box'; /* Opera/IE 8+ */
            icLeftInfo.style.paddingLeft = '25px';
            icLeftInfo.style.paddingTop = '10px';

            var icLeftInfoLeft = document.createElement("div");
            //icLeftInfoLeft.style = "width: 80px; text-align: right; float:left; border-right: 1px dotted #ff5100; padding-right: 4px;";
            icLeftInfoLeft.style.width = 80 + 'px';
            icLeftInfoLeft.style.textAlign = 'right';
            icLeftInfoLeft.style.float = 'left';
            icLeftInfoLeft.style.borderRight = 1 + 'px dotted #ff5100';
            icLeftInfoLeft.style.paddingRight = 4 + 'px';

            var itemLocation = document.createElement("div");
            itemLocation.innerHTML = '<p>' + 'location' + '</p>';
            icLeftInfoLeft.appendChild(itemLocation);

            var itemDuration = document.createElement("div");
            itemDuration.innerHTML = '<p>' + 'duration' + '</p>';
            icLeftInfoLeft.appendChild(itemDuration);

            var itemNotes = document.createElement("div");
            itemNotes.innerHTML = '<p>' + 'notes' + '</p>';
            icLeftInfoLeft.appendChild(itemNotes);




            var icLeftInfoRight = document.createElement("div");
            //icLeftInfoRight.style = "text-align: left; float: left; padding-left: 4px;";
            icLeftInfoRight.style.textAlign = 'left';
            icLeftInfoRight.style.float = 'left';
            icLeftInfoRight.style.paddingLeft = 4 + 'px';
            icLeftInfoRight.style.overflow = 'hidden';
            icLeftInfoRight.style.width = 550 + 'px';

            var itemLocation = document.createElement("div");
            //itemLocation.innerHTML = '<p>' + locality + ', ' + province + '</p>';
            itemLocation.innerHTML = '<p>' + locality + '</p>';
            icLeftInfoRight.appendChild(itemLocation);

            var itemDuration = document.createElement("div");
            itemDuration.innerHTML = '<p>' + duration + ' hour' + (duration > 1 ? 's' : '') + '</p>';
            icLeftInfoRight.appendChild(itemDuration);

            var itemNotes = document.createElement("div");
            itemNotes.innerHTML = '<p>' + notes + '</p>';
            icLeftInfoRight.appendChild(itemNotes);



            icLeftInfo.appendChild(icLeftInfoLeft);
            icLeftInfo.appendChild(icLeftInfoRight);

            scheduleInfoLocationCard.appendChild(icLeftName);
            scheduleInfoLocationCard.appendChild(icLeftInfo);






            holder.appendChild(scheduleInfoThanks);
            holder.appendChild(scheduleInfoInterviewerCard);
            holder.appendChild(scheduleInfoLocationCard);

            page.appendChild(holder);
            page.style.display = 'block';






            var payment = '0.00';
            var providerName = 'George Saul';
            var industry = 'ggg';
            var tenure = '5';
            var experience = '6';
            var education = 'B.S. Electrical Engineering';
            var company = 'Microsoft';
            var location = 'Everett, WA';
            var duration = '1';
            var note = 'I want help getting a job';


            var HTML = '<div class="holder" style="margin-top:141px; color: #383838; font-family: "Ubuntu", sans-serif; font-size: 40px; padding-bottom: 0px; box-shadow: 0 4px 4px -4px #222222; text-align: center;"><div class="schedule-info-thanks" style="width: 1070px; margin: auto; background-color: #fff2e8; font-size: 50px; line-height: 70px; margin: 20px 0px; text-align: left; border-left: 15px solid #ff5100; box-shadow: 0px 0px 20px 6px rgba(0,0,0,0.10); margin-top: 50px; margin-bottom: 50px; padding-left: 20px; -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */">Thank you!<br />Your payment of $<span style="color: red;">' + payment + '</span> has been received<br />You will have the following information emailed to you as well.</div><div class="schedule-info-interviewer-card" style="width: 1070px; height: 265px; margin: auto; background-color: #fff2e8; margin: 20px 0px; text-align: left; border-left: 15px solid #ff5100; box-shadow: 0px 0px 20px 6px rgba(0,0,0,0.10); margin-top: 50px; margin-bottom: 50px; -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */"><div class="ic-left-name" style="font-weight: 800; font-size: 35px; color: #ff5100; line-height: 60px; -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */ padding-left: 20px; border-bottom: 1px solid #ff5100; height: 60px;">You are meeting with ' + providerName + '</div><div class="ic-left-info" style="font-weight: 200; font-size: 15px; color: #3D3D3D; -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */ padding-left: 25px; padding-top: 10px;"><p><b>industry</b> - ' + industry + '</p><p><b>tenure</b> - ' + tenure + 'years</p><p><b>experience</b> - ' + experience + ' years</p><p><b>education</b> - ' + education + '</p><p><b>occupation</b> - ' + company + '</p></div></div><div class="schedule-info-location-card" style="width: 1070px; height: 265px; margin: auto; background-color: #fff2e8; margin: 20px 0px; text-align: left; border-left: 15px solid #ff5100; box-shadow: 0px 0px 20px 6px rgba(0,0,0,0.10); margin-top: 50px; margin-bottom: 50px; -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */"><div class="ic-left-name">location information</div><div class="ic-left-info" style="font-weight: 200; font-size: 15px; color: #3D3D3D; -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */ -moz-box-sizing: border-box; /* Firefox, other Gecko */ box-sizing: border-box; /* Opera/IE 8+ */ padding-left: 25px; padding-top: 10px;"><p><b>location</b> - ' + location + '</p><p><b>length</b> - ' + duration + ' hours</p><p><b>notes</b> - ' + note + '</p></div></div></div>';

        }


    } //application.prototype




function pageHandler() {
    //console.log('Users loaded: ' + app.usersLoaded);
    //console.log(app.inID);
    document.getElementById("explore").value = '';

    var hash = decodeURI((window.location.href.split("#!")[1] || "home"));
    //hash = hash.split("\.")[0] || "";
    //console.log(hash);
    var tag = hash.split("&") || "";
    var addr = tag.shift();
    //console.log('TAG: ' + tag);
    //console.log('ADDR: ' + addr);
    if (addr) {
        hash = addr;
    }
    //console.log(hash);


    if (!app.usersLoaded) {
        app.loadUsers();
        //console.log('Waiting...Locality: ' + app.localityObj.locality);
        countdown = setTimeout('pageHandler()', 500);
    } else {
        var hash = decodeURI((window.location.href.split("#!")[1] || "home"));
        //hash = hash.split("\.")[0] || "";
        //console.log(hash);
        var tag = hash.split("&") || "";
        var addr = tag.shift();
        if (addr) {
            hash = addr;
        }
        //console.log(addr);

        if (addr.toLowerCase() == 'return') {
            if (!app.usersLoaded || !app.inID) {
                //console.log('Waiting...Locality: ' + app.localityObj.locality);
                countdown = setTimeout('pageHandler()', 500);
            } else {
                var key;
                var item;

                var ID;

                for (var i = 0; i < tag.length; i++) {
                    if (!tag[i]) {
                        continue;
                    }
                    key = decodeURI(tag[i].split("=")[0]);
                    item = decodeURI(tag[i].split("=")[1]);
                    if (key == 'ID') {
                        ID = item;
                    }
                }
                app.returnParameters.ID = ID;
                //console.log(ID);


                var cart = {};
                var member = members.getMember(app.inID);
                cart = member.get('cart');
                var history = member.get('history');

                app.cartItems = {};
                for (var key in history) {
                    app.cartItems[key] = history[key];
                }
                for (var key in cart) {
                    app.cartItems[key] = cart[key];
                    var split = key.split(/\:/);
                    app.providerID = split[0];
                }

                $.ajax({
                    url: "./php/saveHistory.php",
                    data: {
                        id: app.inID,
                        history: JSON.stringify(app.cartItems)
                    },
                    type: 'post',
                    async: true
                });

                //console.log('CART: ' + cart);
                //console.log(cart);
                if (Object.size(cart)) {
                    //app.populateProductCategory('PM', 'Thank You!');
                    console.log('Thank You!');
                } else {
                    //app.populateProductCategory('NF', '404 Page Not Found!');
                    console.log('404 Page Not Found!');
                    return;
                }

                var name = document.getElementById('first_name') ? document.getElementById('first_name').value : app.inID ? app.inID : 'Guest';
                name = member.getFirstName();
                var email = member.getEmail() ? member.getEmail() : (document.getElementById('payer_email') ? document.getElementById('payer_email').value : 'fake@mail.com');
                var txn_id = document.getElementById('txn_id') ? document.getElementById('txn_id').value : '';
                var cc_list = null;
                var MsgHTML = null;
                var attachment = '';
                var total = currencyFormatted(getSubTotal());

                var purchaseDate = new Date();
                var year = purchaseDate.getFullYear();
                //console.log(purchaseDate.getMonth());
                //console.log(app.MONTHS[purchaseDate.getMonth()]);
                var month = app.MONTHS[purchaseDate.getMonth()];
                var weekDay = app.DAYS[purchaseDate.getDay()];
                var day = purchaseDate.getDate();
                var hours = purchaseDate.getHours();
                var minutes = purchaseDate.getMinutes();
                var seconds = purchaseDate.getSeconds();

                var dateStr = weekDay + ', ' + month + ' ' + day + ', ' + year;
                //console.log(dateStr);
                var timeObj = convertTimeTo12(hours + ':' + minutes);
                var timeStr = timeObj.hour + ':' + timeObj.minute + timeObj.ampm;

                //cartDownload(attachment);


                MsgHTML = '<html><head></head><body style="background: #f8f4f3;color: #787c6b;width: 100%; ;margin: 0;font-size: .80em;padding: 0px;font-family: &quot;Open Sans&quot;, sans-serif;height: 0px; padding: 20px;"><div style="width: 60%; margin: 0 auto;"><div style="margin-left: 6px; height: 80px;"><div style="float: left;"><img style="height:20px;" src="http://www.interviewring.com/img/logo150x50.png"/></div><div style="float: left; margin-left: 4px; font-size: 18px; line-height: 80px;">www.interviewring.com</div></div><br><div style="width: 95%; border: 1px solid #606060; background: #ffffff;"><div style="margin: 20px; border-bottom: 1px solid #606060; height: 50px; margin-bottom: 0px;"><div style="float: left;">' + dateStr + '<br>' + timeStr + '</div><div style="float:right;">Transaction ID<br>' + txn_id + '</div></div><div style="margin: 20px; border-bottom: 1px solid #606060; padding-bottom: 10px;"><p style="font-size: 16px;">' + name + ',</p>Thank you for your purchase!<br>If you have any questions or concerns do not hesitate to contact us.</div><div style="margin: 20px; border-bottom: 1px solid #606060;"><table style="border: 1px solid #303030; margin-bottom: 40px; width: 100%; border-collapse: collapse; font-size: 14px; color: #000000;"><thead style="background: #c0c0c0;"><tr><th style="border: 1px solid #303030; width: 80%;">ITEM</th><th style="border: 1px solid #303030;">PRICE</th></tr></thead><tbody>';

                var lastImage = null;

                var total = 0;
                var lsObj = {};
                var cartItemNum = 0;
                for (var key in cart) {
                    var split = key.split(/\:/);
                    var ID = split[0];
                    app.providerID = ID;
                    var item = app.cartItems[key];
                    if (!item) {
                        continue;
                    }
                    //console.log("ITEM: " + item + " KEY: " + key);
                    var date = key.split(':')[1];
                    //console.log(date);
                    var dateObj = getDateIndexes(date);

                    var d = parseInt(dateObj.dayIndex, 10);
                    //console.log(d);
                    var m = parseInt(dateObj.monthIndex - 1, 10);
                    var y = parseInt(dateObj.year, 10);
                    var dateStr = y + '-' + pad(m, 2) + '-' + pad(d, 2);
                    //console.log(item);
                    //console.log(app.getProviderID());
                    //console.log(d + '.' + m + '.' + y);
                    lsObj = localizeCartItem(item, app.getProviderID(), d, m, y);
                    var localizedAppt = lsObj.dateStr + '<br>' + lsObj.sch;
                    //console.log(localizedAppt);






                    var sku = 'sku' + cartItemNum;
                    var desc = localizedAppt;
                    //console.log("DESC: " + desc);
                    desc = desc.replace(/"/g, '\\"');
                    desc = desc.replace(/'/g, "\\'");
                    //desc = desc.replace(/\<br\>/g, "\n");
                    //console.log("DESC2: " + desc);

                    var unitPrice = getSubTotalFromSch(item, ID);
                    total += parseFloat(unitPrice);
                    var quantity = 1;
                    var discounted = 0;
                    var customStr = '';

                    var src = 'img/appt.png';

                    var bgColor = (cartItemNum++ % 2) ? '#f8f4f3' : '#ffffff';
                    //console.log(productCategory + ' === ' + category);
                    MsgHTML += '<tr><td style="border: 1px solid #303030; padding: 4px; background: ' + bgColor + ';"><img style="height: 50px; width: 50px;" src="http://www.interviewring.com/' + encodeURI(src) + '"/><span style="padding-left:6px;">' + desc + '</span></td><td style="border: 1px solid #303030; text-align: right; padding: 4px; background: ' + bgColor + ';">$' + unitPrice + '</td></tr>';

                }

                app.paymentReturn(app.getProviderID(), total, lsObj);

                total = currencyFormatted(total);
                var paymentProcessor = parseFloat(total) ? 'Paypal' : 'interviewring.com';

                MsgHTML += '<tr><td></td><td style="text-align: right; padding: 4px;">Total: $' + total + '</td></tr></tbody></table><div style="height: 50px;"><div style="float:left;">Payment via ' + paymentProcessor + '</div><div style="float:right; font-size: 18px;">Amount Paid $' + total + '</div></div></div><div style="height: 20px; margin-top: -10px; font-size: 10px; text-align: center; padding-bottom: 2px;">Your one stop shop for crowd sourced career services</div></div></div>';



                //console.log(document.getElementById('return').innerHTML);

                MsgHTML += '<br><br><br>' + document.getElementById('return').innerHTML + '</body></html>';

                //console.log(MsgHTML);
                //console.log(attachment);


                //console.log(cart);
                if (cart) {
                    //console.log('Sending email: ' + email + ' -> ' + MsgHTML);
                    $.ajax({
                        url: "./php/email.php",
                        data: {
                            id: app.getUserID(),
                            name: name,
                            email: email,
                            subject: "Your purchase from interviewring.com",
                            MsgHTML: MsgHTML,
                            attachResume: '1'
                        },
                        type: 'post',
                        success: function (result) {
                            console.log(result);
                        },
                        async: true
                    });
                }


                app.cartItems = {};
                app.saveCart(app.getUserID(), app.cartItems);


                //window.showReturn();
            }
        } else if (hash === 'home') {
            showHome();
        } else if (hash === 'my account') {
            showProfile();
        } else if (hash === 'my history') {
            showHistory();
        } else if (hash === 'find services') {
            app.returnParameters.SEARCH = '';
            if (addr.toLowerCase() == 'find services') {
                var key;
                var item;

                for (var i = 0; i < tag.length; i++) {
                    if (!tag[i]) {
                        continue;
                    }
                    key = decodeURI(tag[i].split("=")[0].toLowerCase());
                    item = decodeURI(tag[i].split("=")[1]);
                    if (key == 'search') {
                        app.returnParameters.SEARCH = item;
                    }
                }

                //console.log(ID);
            }
            //console.log('->' + app.returnParameters.SEARCH);
            if (app.returnParameters.SEARCH === '') {
                window.location.hash = encodeURI("#!find services");
            }
            showFindInterviews(app.returnParameters.SEARCH);
        } else if (hash === 'service') {
            app.returnParameters.PROVIDER = '';
            app.returnParameters.STEP = '1';
            if (addr.toLowerCase() == 'service') {
                var key;
                var item;

                var searchStr;

                for (var i = 0; i < tag.length; i++) {
                    if (!tag[i]) {
                        continue;
                    }
                    key = decodeURI(tag[i].split("=")[0].toLowerCase());
                    item = decodeURI(tag[i].split("=")[1]);
                    if (key == 'provider') {
                        app.returnParameters.PROVIDER = item;
                    }
                    if (key == 'step') {
                        app.returnParameters.STEP = item;
                    }
                }
                //console.log(ID);
            }
            //console.log('->' + app.returnParameters.PROVIDER);
            showCheckOut(app.returnParameters.PROVIDER, app.returnParameters.STEP);
        } else {
            //console.log(hash);
            console.log('404 Page Not Found');
            //app.populateProductCategory('NF', '404 Page Not Found!');
        }
    }
}

function UserCardLeftInfo(industry, company, position, companyTenure, industryTenure, education, numberOfReviews, averageRating) {
    "use strict";

    var icLeftInfo, icLeftInfoUpper, icLeftInfoLeft, itemIndustry, itemIndustryLabel, itemCompany, itemCompanyLabel, itemPosition, itemPositionLabel, itemTenure, itemTenureLabel, itemEducation, itemEducationLabel, icLeftInfoRight, ratingStr, i, j, itemRating;
    icLeftInfo = document.createElement("div");
    icLeftInfoUpper = document.createElement("div");
    icLeftInfoLeft = document.createElement("div");
    itemIndustry = document.createElement("div");
    itemIndustryLabel = document.createElement("div");
    itemCompany = document.createElement("div");
    itemCompanyLabel = document.createElement("div");
    itemPosition = document.createElement("div");
    itemPositionLabel = document.createElement("div");
    itemTenure = document.createElement("div");
    itemTenureLabel = document.createElement("div");
    itemEducation = document.createElement("div");
    itemEducationLabel = document.createElement("div");
    icLeftInfoRight = document.createElement("div");

    icLeftInfo.className = "ic-left-info";
    icLeftInfoUpper.className = "ic-left-info-upper";
    icLeftInfoLeft.className = "ic-left-info-left";

    itemIndustryLabel.innerHTML = '<p>' + 'industry' + '</p>';
    icLeftInfoLeft.appendChild(itemIndustryLabel);

    itemCompanyLabel.innerHTML = '<p>' + 'company' + '</p>';
    icLeftInfoLeft.appendChild(itemCompanyLabel);

    itemPositionLabel.innerHTML = '<p>' + 'title' + '</p>';
    icLeftInfoLeft.appendChild(itemPositionLabel);

    itemTenureLabel.innerHTML = '<p>' + 'tenure' + '</p>';
    icLeftInfoLeft.appendChild(itemTenureLabel);

    itemEducationLabel.innerHTML = '<p>' + 'education' + '</p>';
    icLeftInfoLeft.appendChild(itemEducationLabel);

    icLeftInfoRight.className = "ic-left-info-right";

    itemIndustry.innerHTML = '<p>' + industry + '</p>';
    icLeftInfoRight.appendChild(itemIndustry);

    itemCompany.innerHTML = '<p>' + company + '</p>';
    icLeftInfoRight.appendChild(itemCompany);

    itemPosition.innerHTML = '<p>' + position + '</p>';
    icLeftInfoRight.appendChild(itemPosition);

    itemTenure.innerHTML = '<p>company: ' + companyTenure + 'yrs, industry: ' + industryTenure + 'yrs</p>';
    icLeftInfoRight.appendChild(itemTenure);

    itemEducation.innerHTML = '<p>' + education + '</p>';
    icLeftInfoRight.appendChild(itemEducation);

    icLeftInfoUpper.appendChild(icLeftInfoLeft);
    icLeftInfoUpper.appendChild(icLeftInfoRight);
    icLeftInfo.appendChild(icLeftInfoUpper);

    ratingStr = '<div class="number-of-reviews-div">' + numberOfReviews + ' reviews</div>';
    ratingStr += '<div class="stars-div">';
    for (i = 0; i < averageRating; i += 1) {
        ratingStr += '<img class="star-image" src="./img/star.png"/>';
    }
    for (j = averageRating; j < 5; j += 1) {
        ratingStr += '<img class="star-image" src="./img/starEmpty.png"/>';
    }
    ratingStr += '</div>';

    itemRating = document.createElement("div");
    itemRating.className = "ic-left-info-lower";
    itemRating.innerHTML = ratingStr;
    icLeftInfo.appendChild(itemRating);

    return icLeftInfo;
}

function UserCardRightInfo(services, imgID) {
    "use strict";
    var icRightInfo = document.createElement("div");
    icRightInfo.className = "ic-right-info";
    var icRightInfoLeft = document.createElement("div");
    icRightInfoLeft.className = "ic-right-info-left";
    var icRightInfoRight = document.createElement("div");
    icRightInfoRight.className = "ic-right-info-right";

    var icRightInfoLeftHTML = '';
    var icRightInfoRightHTML = '';
    for (var key in services) {
        var split = key.split(' ');
        imgID = 'service' + split.pop();
        icRightInfoLeftHTML += '<p>' + key + '</p>';
        icRightInfoRightHTML += '<p>$' + services[key].price + '/hr<p>';
    }
    icRightInfoLeft.innerHTML = icRightInfoLeftHTML;
    icRightInfoRight.innerHTML = icRightInfoRightHTML;

    icRightInfo.appendChild(icRightInfoLeft);
    icRightInfo.appendChild(icRightInfoRight);

    return icRightInfo;
}

function ScheduleServiceUserCardRightInfo() {
    "use strict";
    var icRightInfo = document.createElement("div");
    icRightInfo.className = "ic-right-info";

    var textArea = document.createElement("textarea");
    textArea.className = "schedule-textarea";
    textArea.innerHTML = "write your question here...";
    icRightInfo.appendChild(textArea);

    var icRightBottom = document.createElement("div");
    icRightBottom.className = "sc-right-bottom";

    var sendButton = document.createElement("button");
    sendButton.className = "sc-right-send";
    sendButton.innerHTML = "send";
    icRightBottom.appendChild(sendButton);
    icRightInfo.appendChild(icRightBottom);

    return icRightInfo;
}

function ServiceEditUserCardRight() {
    "use strict";
    var icRight = document.createElement("div");
    icRight.className = "ic-right";

    var itemName = document.createElement("div");
    itemName.className = "ic-right-name";
    itemName.innerHTML = 'select a service to edit';
    icRight.appendChild(itemName);

    var icRightInfo = document.createElement("div");
    icRightInfo.className = "ic-right-info";

    var serviceEditComboBox = document.createElement("select");
    serviceEditComboBox.className = "service-edit-combo-box";
    serviceEditComboBox.id = "serviceEditComboBox";
    serviceEditComboBox.onchange = function () {
        showItemToEdit(this.options[this.selectedIndex].value);
    };
    serviceEditComboBox.innerHTML = '<option value="na">select a service...</option>';

    icRightInfo.appendChild(serviceEditComboBox);
    icRight.appendChild(icRightInfo);

    var feeRow = document.createElement("div");
    feeRow.className = "service-edit-combo-box";

    var location = document.createElement("p");
    location.innerHTML = 'location';

    var locationSelect = document.createElement("select");
    locationSelect.id = "localitySelect";
    locationSelect.name = "localitySelect";
    feeRow.appendChild(location);
    feeRow.appendChild(locationSelect);
    icRightInfo.appendChild(feeRow);

    var feeRow = document.createElement("div");
    feeRow.className = "service-edit-combo-box";

    var timezone = document.createElement("p");
    timezone.innerHTML = 'timezone';

    var timezoneSelect = document.createElement("select");
    timezoneSelect.id = "timezoneSelect";
    timezoneSelect.name = "timezoneSelect";
    feeRow.appendChild(timezone);
    feeRow.appendChild(timezoneSelect);
    icRightInfo.appendChild(feeRow);
    icRight.appendChild(icRightInfo);

    return icRight;
}

function SelectServiceTypeButtonClick(serviceButton) {
    "use strict";
    serviceButton.style.opacity = "1.0";
    if (serviceButton.id == "remote-interview-button") {
        document.getElementById("in-person-interview-button").style.opacity = "0.5";
        document.getElementById("resume-review-button").style.opacity = "0.5";
    } else if (serviceButton.id == "in-person-interview-button") {
        document.getElementById("remote-interview-button").style.opacity = "0.5";
        document.getElementById("resume-review-button").style.opacity = "0.5";
    } else if (serviceButton.id == "resume-review-button") {
        document.getElementById("in-person-interview-button").style.opacity = "0.5";
        document.getElementById("remote-interview-button").style.opacity = "0.5";
    }
}

function SelectedService() {
    var inperson = document.getElementById("in-person-interview-button");
    var resume = document.getElementById("resume-review-button");
    var remote = document.getElementById("remote-interview-button");

    if (inperson.style.opacity != "0.5" && resume.style.opacity != "0.5" && resume.style.opacity != "0.5") {
        return "none";
    } else {
        if (inperson.style.opacity != "0.5") {
            return "In-person Interview";
        } else if (resume.style.opacity != "0.5") {
            return "Resume Review";
        } else if (remote.style.opacity != "0.5") {
            return "Remote Interview";
        }
    }
}

function GetPriceFromButton(buttonId) {
    var button = document.getElementById(buttonId);
}