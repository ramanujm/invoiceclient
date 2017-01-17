 // here initialize the app
  var myApp = new Framework7({
 animateNavBackIcon:true
  });

 // If your using custom DOM library, then save it to $$ variable
 var $$ = Dom7;

 // Add the view
 var mainView = myApp.addView('.view-main', {
 // enable the dynamic navbar for this view
     dynamicNavbar: true
     });