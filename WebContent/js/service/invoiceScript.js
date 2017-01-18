// here initialize the app
var _APP_TITLE = 'Invoice';
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
// mainView.router.loadPage("viewPage/estimate.html");
$('.form-from-data').on('click',function(e) {
			e.preventDefault();

			myApp.showPreloader();

			var form_url = $(this).attr('action');
			var form_data = myApp.formToData('#form-register');

			var form_ajax = $.ajax({
				url : form_url,
				type : 'POST',
				dataType : 'json',
				data : form_data
			});

			form_ajax.done(function(response) {
				if (response.result === 'success') {
					mainView.router.loadPage({
						url : 'viewPage/estimate.html',
						ignoreCache : true,
						reload : true
					});
					mainView.router.refreshPage();
				} else {
					myApp.alert('Your access data is incorrect, please try again.',	_APP_TITLE);
				}
			});

			form_ajax.fail(function() {
				myApp.alert('Error trying to register to the system.');
			});

			form_ajax.always(function() {
				myApp.hidePreloader();
			});
		});
