var UniqueNumbers = new Mongo.Collection('uniquenumbers');

if (Meteor.isClient) {

  Session.setDefault('status', "Welcome, folks! let's add new number ");

  Template.addForm.helpers({
    status: function() {
      return Session.get('status');
    },
    numbers: function(){
      return UniqueNumbers.find();
    }
  });

  Template.addForm.events({
    'click .btnAdd': function() {
      console.log('ok');
    },
    'keypress input.newNumber': function(evt, template) {
      if (evt.which === 13) {
        var newNumber = template.find(".newNumber").value;
        console.log('Inputing: ' + newNumber);

        // check with collection
        var existNumber = UniqueNumbers.findOne({
          value: newNumber
        });
 
        if (!existNumber) {
          UniqueNumbers.insert({
            value: newNumber,
            createdAt: new Date()
          });
          template.find(".newNumber").value = "";
          Session.set('status', 'Inserted!');
        } else {
          template.find(".newNumber").value = "";
          Session.set('status', 'Sorry, this number is exist!');
        }
      } else {
          // live check while typing the number
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
