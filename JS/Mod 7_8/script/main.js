$(document).ready(function(){

// Tabs
	$('.tabs__ul__li').click(function() {
		$('.tabs__ul__li').removeClass('tabs__ul__li-active');
		$('.tabs__content p').hide();

		var index = $(this).data('index');
		$('ul li:nth-child(' + index + ')').addClass('tabs__ul__li-active');
		$('.tabs__content p:nth-child(' + index + ')').show();
	});

// form with tooltips	
	$('.form__element__input').mouseover(function(){
		var index = $(this).data('index');
		var tooltipContent = $(this).data('value');
		var mouseOverTooltips = $('<div/>', {
	   		 class: 'form__element__tooltips',
	     	 text: '' + tooltipContent + '' 
		});
		$('.form__element:nth-child(' + index + ')').append(mouseOverTooltips);
	});

	$('.form__element__input').mouseout(function(){
		var index = $(this).data('index');
		$('.form__element:nth-of-type(' + index + ')').find('.form__element__tooltips').remove();
	});

	$('.help-button').click(function(event){
		event.preventDefault();
		for (var i=0; i<3; i++) {
			var index = $('.form__element__input').data('index') + i;
			var tooltipContent = $('.form__element:nth-of-type(' + index + ') .form__element__input').data('value');
			var mouseOverTooltips = $('<div/>', {
		   		 class: 'form__element__tooltips',
		     	 text: '' + tooltipContent + '' 
			});
			$('.form__element:nth-child(' + index + ')').append(mouseOverTooltips);
		}
	});
});