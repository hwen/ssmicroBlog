$(document).ready(function(){
	var settings = document.querySelector('.follow-more');
	var slider = document.getElementById('slider');

	EventUtil.addHandler(settings, 'click', function(){
		var isOpen = slider.classList.contains('sldieIn');
		var slideState = isOpen ? 'slideOut' : 'slideIn'; 

		slider.className = slideState;
	});
});