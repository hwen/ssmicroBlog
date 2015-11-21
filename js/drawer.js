$(document).ready(function(){
	$('.follow-more').click(function(){
		var $slider = $('.draw-setting');
		$slider.animate({
			left:0
		});
	});

	$('.draw-header','.drawer').click(function(){
		var $slider = $('.draw-setting');
		$slider.animate({
			left:-285
		});
	});

	$('.content-box-containerjj').click(function () {
		var $slider = $('.draw-setting');
		if(parseInt($slider.css('left'),10) > -1){
			$slider.animate({
				left:-285
			});
		}
	});
});