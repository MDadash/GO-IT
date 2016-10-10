
$(function() {

	function runAjax() {

		var value = $('.search-field')[0].value;

		$.ajax({
			url: "https://pixabay.com/api/?key=3385126-3d4163ea7588fe4a90d94498a&q=" + value + "&image_type=photo",
			dataType: "jsonp",
			success: function(data){
				console.log(data);
				$.each(data.hits, function(i, val){
					var inner = '<a href="'+  val.pageURL + '"><img src='+val.webformatURL+'></a>';
					$('.img-container')[0].innerHTML += inner;                               
				});
			}
		});
	};

	$('form').submit(function(e) {
		e.preventDefault();
		$('.img-container')[0].innerHTML = "";
		runAjax();
	});
});