$(document).ready(function(){

	var getPost = function(){
		var api = "https://api.weibo.com/2/statuses/friends_timeline.json?access_token=2.00lYYxNEGUv6HEbba92b7e5cWAw5sD&count=20";
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

	var showPost = function(post){
		console.log(post);
		var contentBox = document.querySelector('.content-box');
		post.forEach(function(item,index,array){
			var orgBox = contentBox.cloneNode(true);

			var postTime = item.created_at;
				postTime = getPostTime(postTime);

			orgBox.querySelector(".created-time").innerHTML = postTime;
			orgBox.querySelector('.avatar').setAttribute('src',item.user.avatar_hd);
			orgBox.querySelector('.user-name').innerHTML=item.user.name;
			orgBox.querySelector('.source').innerHTML = " 来自 "+item.source;
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

	var getPostTime = function(postTime){
		var nowDay = new Date().toDateString().split(" ");
		var nowTime = new Date().toLocaleTimeString('en-GB').split(":");
		var month = {
			Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,July:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12
		};
		postTime = postTime.split(" ");
		console.log(postTime);
		if(nowDay[1]===postTime[1]&&nowDay[3]===postTime[5]){
			if((nowDay[2] - postTime[2])===0){
				var hour = (postTime[3]).split(":");
				console.log((nowTime[0]-hour[0]) + "小时前");
				return (nowTime[0]-hour[0]) + "小时前";
			} else if ((nowDay[2] - postTime[2])===1){
				console.log("昨天");
				return "昨天";
			} else {
				console.log(month[postTime[1]]+"-"+postTime[2]);
				return month[postTime[1]]+"-"+postTime[2];
			}
		} else if (nowDay[1]!==postTime[1]&&nowDay[3]===postTime[5]) {
			console.log(month[postTime[1]]+"-"+postTime[2]);
			return month[postTime[1]]+"-"+postTime[2];			
		} else {
			console.log("去年");
			return "去年";
		}
	};

	getPost();
});