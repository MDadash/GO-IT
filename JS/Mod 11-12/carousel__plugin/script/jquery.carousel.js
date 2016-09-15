(function($) {

	$.fn.carousel = function(options) {

		var defaults = {
			imgHeight: 'auto',
			imgWidth: 100,
			visibleElements: 5,
			elementMarginRt: 25
		};

		var settings = $.extend(defaults, options);
		
		var carouselHiderWidth = settings.visibleElements*settings.imgWidth + (settings.visibleElements - 1)*settings.elementMarginRt;
		var elementsList = $('.carousel-list');
		var elementsCount = elementsList.find('li').length;
		var pixelsOffset = settings.imgWidth + settings.elementMarginRt;
		var minimumOffset = - ((elementsCount - settings.visibleElements) * pixelsOffset);
		var maximumOffset = 0;
		var currentLeftValue = 0;
		var leftArrow = $('.carousel-arrow-left');
    var rightArrow = $('.carousel-arrow-right');

    $('.carousel-element img').css('width', settings.imgWidth);
    $('.carousel-element img').css('height', settings.imgHeight);
		$('.carousel-element').css('margin-right', settings.elementMarginRt);
		$('.carousel-hider').css('width', carouselHiderWidth);

		leftArrow.click(function() {
			if (currentLeftValue != maximumOffset) {
				currentLeftValue +=  pixelsOffset;
				elementsList.animate({ left : currentLeftValue + "px"}, 500);
			}
		});

		rightArrow.click(function() {
			if (currentLeftValue != minimumOffset) {
				currentLeftValue -=  pixelsOffset;
				elementsList.animate({ left : currentLeftValue + "px"}, 500);
			}
		});

		return this;
	}
})(jQuery);