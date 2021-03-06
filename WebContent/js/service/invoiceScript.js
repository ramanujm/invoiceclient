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
// mainView.router.loadPage("viewPage/estimate.html");
$('.form-from-data').on('click',function(e) {
			e.preventDefault();

			myApp.showPreloader();

			var form_url = $(this).attr('action');
			var form_data = myApp.formToData('#form-register');
			console.log("form_data ==> " , form_data);
			var form_ajax = $.ajax({
				headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json',
'cache': false			
			},
				'url' : 'http://localhost:8080/public/register',
				'type' : 'POST',
				'cache': 'false',
				'dataType' : 'json',
				'data' : JSON.stringify(form_data)
			});

			form_ajax.done(function(response) {
				if (response.result === 'Success') {
					mainView.router.loadPage({
						url : 'viewPage/login.html',
						ignoreCache : true,
						reload : true
					});
					//mainView.router.refreshPage();
				} else {
					myApp.alert('Your access data is incorrect, please try again.',APP_TITLE);
				}
			});

			form_ajax.fail(function() {
				myApp.alert('Error trying to register to the system.',APP_TITLE);
			});

			form_ajax.always(function() {
				myApp.hidePreloader();
			});
		});
		
$$(document).on('pageInit', function() {
    var queryForm = null;
    $$('#login').on('click', function (e) {
     queryForm = myApp.formToJSON('#form-user-login');
	 e.preventDefault();

			myApp.showPreloader();

			var form_url = $(this).attr('action');
			console.log("form_data ==> " , form_url);
			//var form_data = myApp.formToData('#form-user-login');
			console.log("form_data_login ==> " , queryForm);
			var form_ajax = $.ajax({
				headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json',
'cache': false			
			},
				'url' : 'http://localhost:8080/public/login',
				'type' : 'POST',
				'cache': 'false',
				'dataType' : 'json',
				'data' : JSON.stringify(queryForm)
			});

			form_ajax.done(function(response) {
				if (response.result === 'Success') {
					mainView.router.loadPage({
						url : 'viewPage/estimate.html',
						ignoreCache : true,
						reload : true
					});
					//mainView.router.refreshPage();
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
       console.log('queryForm ===>', JSON.stringify(queryForm));
    });
});

