$(document).ready(function () {	
	
	$('.drop_box').hover(
		function () {
			$(this).find('.submenu').stop().slideDown(700).animate({
          backgroundColor: "#0A0A0A"
          }, 500 );
		}, 
		function () {
			$(this).find('.submenu').stop().animate({
          backgroundColor: "#303030"
          }, 400 ).slideUp(500);
		}
	);

	$('.drop_box-level-2').hover(
		function () {
			$(this).find('ul').stop().slideDown(800).animate({
          backgroundColor: "#0A0A0A"
          }, 500 );;
		},
		function () {
			$(this).find('ul').stop().animate({
          backgroundColor: "#303030"
          }, 400 ).slideUp(500);;
		}
	);
});

 
