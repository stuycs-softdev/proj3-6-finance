Template.home.helpers({
	transactions: function() {
		return Transactions.find();
	}
});

Template.home.events({
    
    "click #logout": function(e,tmpl){
        Meteor.logout(function(err){
            if(err){
                //show error message
            }
            else{
                //show logged out
            }
        });
        
    }
});

Template.cardExpenses.rendered = function() {
    $('.button').click(function() {
	$('#modal-container').css('display','block');
        Session.set('transaction',$(this).attr('class').split(/\s+/)[2]);
    });
}

Template.modalOverlay.events({
    'click': function() {
        $('#modal-container').css('display','none');
        Session.set('transaction',null);
    }
});

Template.modalTransac.type = function() {
    if(Session.get('transaction'))
        return Session.get('transaction');
}
