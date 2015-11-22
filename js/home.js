$(document).ready(function(){
	var countPage = 1;

	var getPost = function(countPage){
		var api = "https://api.weibo.com/2/statuses/friends_timeline.json?access_token=2.00lYYxNEGUv6HEbba92b7e5cWAw5sD";
		api += "&page="+countPage;
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
		
		var contentBox = document.querySelector('.content-box');
		post.forEach(function(item,index,array){
			var orgBox = contentBox.cloneNode(true);

			var postTime = item.created_at;
				postTime = getPostTime(postTime);
			// document.querySelector('.nav-bar').querySelector('.user-name');
			orgBox.querySelector('.created-time').innerHTML = postTime;
			orgBox.querySelector('.avatar').setAttribute('src',item.user.avatar_hd);
			orgBox.querySelector('.user-name').innerHTML=item.user.name;
			orgBox.querySelector('.source').innerHTML = " 来自 "+item.source;
			orgBox.querySelector('.default-content').innerHTML = item.text;
			orgBox.querySelector('.repost-count').innerHTML = item.reposts_count||"转发";
			orgBox.querySelector('.comment-count').innerHTML = item.comments_count||"评论";
			orgBox.querySelector('.attitude-count').innerHTML = item.attitudes_count||"赞";

			var picList = getPic(item);
			if(picList){
				orgBox.querySelector('.default-pic-list').appendChild(picList);
			}

			if(item.retweeted_status){
				// orgBox.querySelector("*");
			}

			orgBox.style.display = '';
			var sm = document.querySelector('.content-box-container').appendChild(orgBox);
		});
	};

	var getPostTime = function(postTime){
		var nowDay = new Date().toDateString().split(" ");  //Thu Nov 19 2015
		var nowTime = new Date().toLocaleTimeString('en-GB').split(":"); //08:12:49
		var month = {
			Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,July:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12
		};
		postTime = postTime.split(" ");
		if(nowDay[1]===postTime[1]&&nowDay[3]===postTime[5]){
			if((nowDay[2] - postTime[2])===0){
				var hour = (postTime[3]).split(":");
				if((nowTime[0]-hour[0])===0){
					return (nowTime[1]-hour[1])>5? (nowTime[1]-hour[1])+"分钟前": "刚刚";
				}
				return (nowTime[0]-hour[0]) + "小时前";
			} else if ((nowDay[2] - postTime[2])===1){
				return "昨天 "+ (postTime[3].substring(0,5)+" ");
			} else {
				return month[postTime[1]]+"-"+postTime[2];
			}
		} else if (nowDay[1]!==postTime[1]&&nowDay[3]===postTime[5]) {
			return month[postTime[1]]+"-"+postTime[2];			
		} else {
			return "去年";
		}
	};

	var getPic = function(item){
		var picList = item.pic_urls;
		if(picList.length > 1){
			var node = document.createElement('ul');
			picList = picList.forEach(function(item){
				var result = item.thumbnail_pic;
				var list = document.createElement('li');
				var img = document.createElement('img');
				img.setAttribute('src',result);
				list.appendChild(img);
				node.appendChild(list);
			});

		return node;
		} else if (picList.length===1) {
			var img = document.createElement('img');
			img.setAttribute('src',(picList[0]).thumbnail_pic);
			return img;
		} else {
			return false;
		}
	};

	var showLoading = function(){
		document.querySelector('.loading').style.display = '';
		setTimeout(function(){
			document.querySelector('.loading').style.display = 'none';
			getPost(++countPage);
		},2000);
	};

	window.onscroll=function(){
		var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
		var wHeight=document.documentElement.clientHeight;//window
		var dHeight=document.documentElement.offsetHeight;//整个文档高度
		if(dHeight-(sHeight+wHeight)<100)
		{
			showLoading();
		}
	};

	getPost(1);
});