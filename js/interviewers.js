
    var total = 0;

    var products = [
    ];








Ext.define('Interviewer', {
    extend: 'Ext.data.Model',
    idProperty: 'inID',
	       fields: ['inID', 'email', 'role', 'services', 'calendar', 'mail', 'privacy', 'cart', 'history', 'feedback', 'rating']
});

var productStore = Ext.create('Ext.data.Store', {
    model: 'Interviewer',
    data: products,
    reader: {type: 'json'}
});



