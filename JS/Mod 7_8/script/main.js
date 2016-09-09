$(document).ready(function(){

// Tabs
	$('.tabs__ul__li').click(function() {
		$('.tabs__ul__li').removeClass('active');
		$('.content p').hide();

		var index = $(this).data('index');
		$('ul li:nth-child(' + index + ')').addClass('active');
		$('.content p:nth-child(' + index + ')').show();
	});

// form with tooltips	
	$('.form__element__input').mouseover(function(){
		var index = $(this).data('index');
		var tooltipContent = $(this).data('value');
		var mouseOverTooltips = $('<div/>', {
	   		 class: 'form__element__tooltips',
	     	 text: '' + tooltipContent + '' 
		});
		
		$('.form__frame .form__element:nth-child(' + index + ')').append(mouseOverTooltips);
	});

	$('.form__element__input').mouseout(function(){
		$('.form__element__tooltips').remove();
	});
});