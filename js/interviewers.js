
    var total = 0;

    var products = [
    ];








Ext.define('Interviewer', {
    extend: 'Ext.data.Model',
    idProperty: 'inID',
	       fields: ['inID', 'linkedINprofile', 'tzName', 'email', 'education', 'role', 'providedServices', 'calendar', 'mail', 'privacy', 'cart', 'providerHistory', 'history', 'feedback', 'reviews', 'resume']
});

var productStore = Ext.create('Ext.data.Store', {
    model: 'Interviewer',
    data: products,
    reader: {type: 'json'}
});



