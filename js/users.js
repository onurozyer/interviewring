
    var total = 0;

    var userObj = [
    ];








Ext.define('UserData', {
    extend: 'Ext.data.Model',
    idProperty: 'inID',
	       fields: ['inID', 'linkedINprofile', 'tzName', 'email', 'education', 'role', 'providedServices', 'calendar', 'mail', 'privacy', 'cart', 'providerHistory', 'history', 'feedback', 'reviews', 'coins', 'resume']
});

var user = Ext.create('Ext.data.Store', {
    model: 'UserData',
    data: userObj,
    reader: {type: 'json'}
});



