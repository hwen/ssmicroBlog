$(document).ready(function(){
	var countPage = 1;

	var getPost = function(countPage){
		countPage = countPage || 1;
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

	//show post in page
	var showPost = function(post){
		
		var contentBox = document.querySelector('.content-box');
		post.forEach(function(item,index,array){
			var orgBox = contentBox.cloneNode(true);

			var postTime = item.created_at;
				postTime = getPostTime(postTime);
			// document.querySelector('.nav-bar').querySelector('.user-name');
			orgBox.setAttribute('data-id',item.idstr);
			orgBox.querySelector('.created-time').innerHTML = postTime;
			orgBox.querySelector('.avatar').setAttribute('src',item.user.avatar_hd);
			orgBox.querySelector('.user-name').innerHTML=item.user.name;
			orgBox.querySelector('.source').innerHTML = " 来自 "+item.source;
			orgBox.querySelector('.default-content').innerHTML = getPostText(item.text);
			orgBox.querySelector('.repost-count').innerHTML = item.reposts_count||"转发";
			orgBox.querySelector('.comment-count').innerHTML = item.comments_count||"评论";
			orgBox.querySelector('.attitude-count').innerHTML = item.attitudes_count||"赞";

			var picList = getPic(item, false);
			if(picList){
				orgBox.querySelector('.default-pic-list').appendChild(picList);
			}

			if(item.retweeted_status){
				var orgPost = item.retweeted_status;
				orgBox.querySelector('.weibo-original').innerHTML = "<a href=''>@"+ orgPost.user.name + "<\a>" +
					getPostText(orgPost.text);
				picList = getPic(item, true);
				if(picList){
					orgBox.querySelector('.media-pic-list').appendChild(picList);
				}
			}

			orgBox.style.display = '';
			var sm = document.querySelector('.content-box-container').appendChild(orgBox);
		});
	};

	//get posted time
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

	var getPic = function(item, isRepost){

		var item = isRepost ? item.retweeted_status : item;
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
			img.setAttribute('src', item.original_pic);
			var linkImg = document.createElement('a');
			linkImg.setAttribute('href', item.original_pic);
			linkImg.appendChild(img);
			return linkImg;
		} else {
			return false;
		}
	};

	var showLoading = function(){
		document.querySelector('.loading').style.display = '';
		setTimeout(function(){
			document.querySelector('.loading').style.display = 'none';
			getPost(++countPage);
		},1000);
	};

	//load more posts when scroll to the bottom
	window.onscroll=function(){
		var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
		var wHeight=document.documentElement.clientHeight;//window
		var dHeight=document.documentElement.offsetHeight;//整个文档高度
		if(dHeight-(sHeight+wHeight)<100)
		{
			showLoading();
		}
	};

	var getPostText = function(text){
		var newText = text;
		var emotionReg = /\[[^\]]+]/g;
		var atReg = /@\w+/g;
		var linkReg =/((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;
		newText = newText.replace(linkReg, function(match){
			return "<a href="+ match + ">" + match + "</a>";
		});

		newText = newText.replace(emotionReg, function(match){
			return "<img class='emotion' src="+ emotions[match] +" />";
		});

		newText = newText.replace(atReg, function(match){
			return "<a href=''>"+ match +"</a>";
		});
		return newText;
	};

	// //到页面底部加载更多
	// function slideDownStep1(dist){
	// 	var sd1 = document.getElementById('sd1'),
	// 		sd2 = document.getElementById('sd2');

	// 	var img = document.getElementById('reflesh-icon');
	// 	var info = document.getElementById('reflesh-info');
	// 	img.setAttribute('src', '../resource/down.png');
	// 	info.innerHTML = '下拉刷新';
	// 	sd2.style.display = "none";
	// 	sd1.style.display = "block";
	// 	sd1.style.height = 1 - parseInt(dist) + "px";
	// }

	// function slideDownStep2() {
	// 	var sd1 = document.getElementById("sd1"),
	// 		sd2 = document.getElementById("sd2");
	// 	sd1.style.display = "none";
	// 	sd1.style.height = "20px";
	// 	sd2.style.display = "block";
	// }

	// function slideDownStep3(){
	// 	var sd1 = document.getElementById('sd1'),
	// 		sd2 = document.getElementById('sd2');
	// 	sd1.style.display = "none";
	// 	sd2.style.display = "none";
	// }

	// function kt_touch(contentId, way){
	// 	var _start = 0,
	// 		_end = 0,
	// 		_content = document.getElementById(contentId);
	// 	_content.addEventListener("touchstart",touchStart,false);
	// 	_content.addEventListener("touchmove",touchMove,false);
	// 	_content.addEventListener("touchend",touchEnd,false);

	// 	function touchStart(event){
	// 		event.preventDefault();
	// 		if (!event.touches.length) { return; }
	// 		var touch = event.touches[0];
	// 		if (way == "x") {
	// 			_start = touch.pageX;
	// 		} else {
	// 			_start = touch.pageY;
	// 		}
	// 	}

	// 	function touchMove(event){
	// 		event.preventDefault();
	// 		if (!event.touches.length) { return; }

	// 		var touch = event.touches[0];

	// 		if (way === "x") {
	// 			_end = (_start - touch.pageX);
	// 		} else {
	// 			_end = (_start - touch.pageY);
	// 			if (_end < -10) {
	// 				slideDownStep1(_end);
	// 			}
	// 			if(_end < -80 ){
	// 				var img = document.getElementById('reflesh-icon');
	// 				var info = document.getElementById('reflesh-info');
	// 				img.setAttribute('src', '../resource/up.png');
	// 				info.innerHTML = '释放更新';
	// 			}
	// 			if(_end >= -10){
	// 				slideDownStep3();
	// 			}
	// 		}

	// 	}

	// 	function touchEnd(event){
	// 		if (_end <0) {
	// 			slideDownStep2();
	// 			var oldPost = document.querySelector('.content-box-container');
	// 			oldPost = oldPost.children[1].getAttribute('data-id');
	// 			var api = 'https://api.weibo.com/2/statuses/friends_timeline/ids.json?access_token=2.00lYYxNEGUv6HEbba92b7e5cWAw5sD';
	// 			$.ajax({
	// 				url:api,
	// 				type:"get",
	// 				crossDomain:true,
	// 				dataType:"jsonp",
	// 				success:function(data){
	// 					var data = data.data.statuses;
	// 					if(oldPost===data[0]){
	// 						console.log('没有更新');
	// 					} else {
	// 						var contentBox = document.querySelector('.content-box');
	// 						var orgBox = contentBox.cloneNode(true);
	// 						var container = document.querySelector('.content-box-container');
	// 						container.innerHTML = '';
	// 						container.appendChild(orgBox);
	// 						getPost(1);
	// 					}
	// 				}
	// 			});
	// 			setTimeout(function(){
	// 				slideDownStep3();
	// 			},1000);
	// 		}
	// 	}
	// }
	// //到页面底部加载更多 end

	// kt_touch("content-box-container",'y');
	getPost(1);
});