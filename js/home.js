$(document).ready(function(){
	var showPost = function(post){
		console.log(post);
		var contentBox = document.querySelector('.content-box');
		post.forEach(function(item,index,array){
			var orgBox = contentBox.cloneNode(true);

			orgBox.querySelector('.avatar').setAttribute('src',item.user.avatar_hd);
			orgBox.querySelector('.user-name').innerHTML=item.user.name;
			orgBox.querySelector('.source').innerHTML = item.source;
			orgBox.querySelector('.default-content').innerHTML = item.text;
			orgBox.querySelector('.repost-count').innerHTML = item.reposts_count||"转发";
			orgBox.querySelector('.comment-count').innerHTML = item.comments_count||"评论";
			orgBox.querySelector('.attitude-count').innerHTML = item.attitudes_count||"赞";
			if(item.retweeted_status){
				//orgBox.querySelector();
			}


			orgBox.style.display = '';
			var sm = document.querySelector('.content-box-container').appendChild(orgBox);
		});
	};

	var getPost = function(){
		var api = "https://api.weibo.com/2/statuses/friends_timeline.json?access_token=2.00lYYxNEGUv6HEbba92b7e5cWAw5sD&count=2";
		$.ajax({
			url:api,
			type:"get",
			crossDomain:true,
			dataType:"jsonp",
			success:function(data){
				var data = data.data.statuses;
				showPost(data);
			}
		});
	};

	getPost();
});