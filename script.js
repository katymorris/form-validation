/* -------------------- GLOBALS -------------------- */
/* ------------------------------------------------ */

/* ----------- BROWSER SUPPORT ---------- */
//IE9 transit fallback
if (!$.support.transition) {
   $.fn.transition = $.fn.animate;
}

//check if user's browser is Chrome
var isChrome = !!window.chrome && !!window.chrome.webstore;
var windowWidth;
var vpWidth;
/* -------------------- PLUGINS -------------------- */
/* ------------------------------------------------ */

/* -------------------- AJAX -------------------- */
/* -------------------------------------------------- */

/* -------------------- FUNCTIONS -------------------- */
/* -------------------------------------------------- */
//we need to treat the window width variable differently depending on
//whether the user is using Chrome or not. Chrome interprets the window width
//larger than css does, so without treating them differently, there would be gaps
//in responsive breakpoints. Other browsers wth this issue should be added as noticed.
//Make sure to use the windowWidth variable rather than using $(window).width()
function setWindowWidth() {
	if (isChrome === true) {
		vpWidth = viewport().width;
   		windowWidth = vpWidth;
	} else {
		windowWidth = $(window).width();
	}
}
//get viewport size
function viewport() {
   var e = window, a = 'inner';
   if (!('innerWidth' in window )) {
       a = 'client';
       e = document.documentElement || document.body;
   }
   return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
//functions for validating email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var email = $(".signup-email").val();
  if (validateEmail(email)) {
  	if( $(".email-cross").css('display') != 'none' ){
  		$('.email-cross').css('display', 'none');
  	}
  	$('.email-checkmark').css('display', 'inline-block');
  	$('.signup-email').data('completecheck', 'complete');
  } else {
  	if( $(".email-checkmark").css('display') != 'none' ){
  		$('.email-checkmark').css('display', 'none');
  	}
  	$('.email-cross').css('display', 'inline-block');
  	$('.signup-email').data('completecheck', 'incomplete');
  }
  return false;
}
/* --------------------- DOCUMENT READY ---------------------- */
/* ---------------------------------------------------------- */
$(document).ready(function(){
	setWindowWidth();

	/* ---------- EVENT LISTENERS ------------- */

	//validate email
	$('body').on('change', '.signup-email', function() {
		if (windowWidth > 768) {
			validate()
		}
	})

	//check for matching confirmation email
	$('body').on('change', '.signup-email-confirm, .signup-email', function() {
		if (windowWidth > 768) {
			var email = $(".signup-email").val();
			var confirmEmail = $(".signup-email-confirm").val();
			if ($(this).hasClass('signup-email')) {
				if ($(this).val() === "") {
					return false
				}
			}
			if ($('.signup-email-confirm').val() === "") {
				return false
			}
			if (email === confirmEmail) {
				if( $(".email-confirm-cross").css('display') != 'none' ){
			  		$('.email-confirm-cross').css('display', 'none');
			  	}
				$('.email-confirm-checkmark').css('display', 'inline-block');
				$('.signup-email-confirm').data('completecheck', 'complete');
			} else {
				if( $(".email-confirm-checkmark").css('display') != 'none' ){
			  		$('.email-confirm-checkmark').css('display', 'none');
			  	}
				$('.email-confirm-cross').css('display', 'inline-block');
				$('.signup-email-confirm').data('completecheck', 'incomplete');
			}
		}
	})

	//check for password input
	$('body').on('change', '.signup-password', function() {
		if (windowWidth > 768) {
			if ($(this).val() === "") {
				return false
			} else {
				var password = $(this).val();
				if (password.length >= 8) {
					if( $(".pw-cross").css('display') != 'none' ){
			  			$('.pw-cross').css('display', 'none');
			  		}
					$('.pw-checkmark').css('display', 'inline-block');
					$('.signup-password').data('completecheck', 'complete');
				} else {
					if( $(".pw-checkmark").css('display') != 'none' ){
			  			$('.pw-checkmark').css('display', 'none');
			  		}
					$('.pw-cross').css('display', 'inline-block');
					$('.signup-password').data('completecheck', 'incomplete');
				}
			}
		}
	});

	//check for password confirmation
	$('body').on('change', '.signup-password-confirm, .signup-password', function() {
		if (windowWidth > 768) {
			var password = $(".signup-password").val();
			var confirmPassword = $(".signup-password-confirm").val();
			if ($(this).hasClass('signup-password')) {
				if ($(this).val() === "") {
					return false
				}
			}
			if ($('.signup-password-confirm').val() === "") {
				return false
			}
			if (password === confirmPassword && password.length >= 8) {
				if( $(".pw-confirm-cross").css('display') != 'none' ){
			  		$('.pw-confirm-cross').css('display', 'none');
			  	}
				$('.pw-confirm-checkmark').css('display', 'inline-block');
				$('.signup-password-confirm').data('completecheck', 'complete');
			} else {
				if( $(".pw-confirm-checkmark").css('display') != 'none' ){
			  		$('.pw-confirm-checkmark').css('display', 'none');
			  	}
				$('.pw-confirm-cross').css('display', 'inline-block');
				$('.signup-password-confirm').data('completecheck', 'incomplete');
			}
		}
	})

	//check for all input field to be filled 
	$('body').on('change', '.signup-password-confirm, .signup-password, .signup-email-confirm, .signup-email', function() {
		if (windowWidth > 768) {
			if ($('.signup-password-confirm').data('completecheck') === "complete" && $('.signup-password').data('completecheck') === "complete" && $('.signup-email-confirm').data('completecheck') === "complete" && $('.signup-email').data('completecheck') === "complete") {
				$('#signup-submit').transition({'background-color': '#9ec7fe'}, {duration: 300}).removeClass('disabled');
			} else {
				$('#signup-submit').transition({'background-color': '#cee3ff'}, {duration: 300}).addClass('disabled');
			}
		}
	})

}); // end document ready

$(window).resize(function() {
	setWindowWidth();

});