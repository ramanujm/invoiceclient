// here initialize the app
var APP_TITLE = 'Invoice';
var myApp = new Framework7({
	animateNavBackIcon : true
});

// If your using custom DOM library, then save it to $$ variable
var $$ = Dom7;

// Add the view
var mainView = myApp.addView('.view-main', {
	// enable the dynamic navbar for this view
	dynamicNavbar : true
});
var mainView = myApp.addView('.view-main');
var allowPageChange=true;

$$('.form-login-data').on('click',function(e) {
	console.log('login clicked...');
	e.preventDefault();

	myApp.showPreloader();

	var form_url = $(this).attr('action');
	var form_data = myApp.formToData('#form-login');
	console.log("form_data ==> " , form_data);
	var form_ajax = $.ajax({
		headers: { 
	'Accept': 'application/json','cache': 'false',
	'Content-Type': 'application/json',
	
	},
		'url' : 'http://localhost:8080/public/login',
		'type' : 'POST',
		'cache': 'false',
		'dataType' : 'json',
		'data' : JSON.stringify(form_data)
	});

	form_ajax.done(function(response) {
		if (response.result === 'Success') {
			mainView.router.loadPage({
				url : 'viewPage/estimate.html',
				ignoreCache : true,
				reload : true
			});
			mainView.router.refreshPage();
		} else {
			myApp.alert('Your user name or password is incorrect, please try again.',APP_TITLE);
		}
	});

	form_ajax.fail(function() {
		myApp.alert('Error trying to login to the system.',APP_TITLE);
	});

	form_ajax.always(function() {
		myApp.hidePreloader();
	});
});