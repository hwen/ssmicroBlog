$(document).ready(function(){
	var showMes = function(data){
		console.log(data);
	};

	var getMes = function(){
		var url = "https://api.weibo.com/2/statuses/friends_timeline.json?access_token=2.00lYYxNEGUv6HEbba92b7e5cWAw5sD";
		$.ajax({
			url:url,
			type:'get',
			success:function(data){
				var created_at,username,text,source,thumbnail_pic;
				var usreavatar_hd,reposts_count,comments_count,attitudes_count;
				// console.log(data.statuses);
				var data = $(data.statuses);
				data.each(function(i,e){
					console.log(e);
				});
			}
		});
	};

	$('#test').click(function(){
		getMes();
	});
});