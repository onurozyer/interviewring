
    var total = 0;

    var products = [
    ];








Ext.define('Interviewer', {
    extend: 'Ext.data.Model',
    idProperty: 'inID',
	       fields: ['inID', 'email', 'education', 'role', 'providedServices', 'calendar', 'mail', 'privacy', 'cart', 'history', 'feedback', 'reviews']
});

var productStore = Ext.create('Ext.data.Store', {
    model: 'Interviewer',
    data: products,
    reader: {type: 'json'}
});



