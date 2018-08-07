var urltoken = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=8Fqi6m0SozQhaunVGzFIWi9x&client_secret=lNsb2bGNR0pB5P6zSf1eowjP4pBu1efT";
var token='';

var mdata = [];
if(getStorage('mdata')) {
	mdata = JSON.parse(getStorage('mdata'));
	$('#lpkc').html('库存:' + mdata.length)
} else {
	var obj = [{
			key: "网红熊钥匙坠",
			num: 10
		},
		{
			key: "网红熊公仔",
			num: 10
		},
		{
			key: "棒棒糖发卡",
			num: 10
		},
		{
			key: "铁皮青蛙",
			num: 10
		},
		{
			key: "拍手",
			num: 10
		},
		{
			key: "棒棒糖头饰",
			num: 10
		},
		{
			key: "爆米花一份",
			num: 10
		},
		{
			key: "果盘一个",
			num: 10
		},
		{
			key: "免费欢唱券一张",
			num: 20
		},
		{
			key: "台历一本",
			num: 10
		}

	]
	for(var i = 0; i < obj.length; i++) {
		for(var j = 0; j < obj[i].num; j++) {
			mdata.push(obj[i].key);
		}
	}
	mdata = shuffleArray(mdata);
	putStorage('mdata', JSON.stringify(mdata));
	$('#lpkc').html('库存:' + mdata.length)
}

function shuffleArray(array) {
	for(var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function xhrget(url, fn) {
	var xhr = null;
	if(xhr) {
		//		outLine( "xhr请求已创建" );
		return;
	}
	//	outSet( "创建请求：" );
	xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				//          	alert( "xhr请求已初始化" );
				break;
			case 1:
				//          	alert( "xhr请求已打开" );
				break;
			case 2:
				//          	alert( "xhr请求已发送" );
				break;
			case 3:
				//              alert( "xhr请求已响应");
				break;
			case 4:
				//              alert( "xhr请求已完成");
				if(xhr.status == 200) {
					fn(xhr.responseText);
					//              	alert( "post请求成功："+xhr.responseText );
				} else {
					alert("xhr请求失败：" + xhr.status);
				}
				break;
			default:
				break;
		}
	}
	xhr.open("get", url);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
}

function xhrpost(url, data, fn) {
	var xhr = null;
	if(xhr) {
		//		outLine( "xhr请求已创建" );
		return;
	}
	//	outSet( "创建请求：" );
	xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				//          	alert( "xhr请求已初始化" );
				break;
			case 1:
				//          	alert( "xhr请求已打开" );
				break;
			case 2:
				//          	alert( "xhr请求已发送" );
				break;
			case 3:
				//              alert( "xhr请求已响应");
				break;
			case 4:
				//              alert( "xhr请求已完成");
				if(xhr.status == 200) {

					fn(xhr.responseText);
				} else {
					alert("xhr请求失败：" + xhr.status);
				}
				break;
			default:
				break;
		}
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(data);
}
function xhrget(url,fn) {
	var xhr = null;
	if(xhr) {
//				outLine( "xhr请求已创建" );
		return;
	}
//		outSet( "创建请求：" );
	xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 0:
				//          	alert( "xhr请求已初始化" );
				break;
			case 1:
				//          	alert( "xhr请求已打开" );
				break;
			case 2:
				//          	alert( "xhr请求已发送" );
				break;
			case 3:
				//              alert( "xhr请求已响应");
				break;
			case 4:
				//              alert( "xhr请求已完成");
				if(xhr.status == 200) {

					fn(xhr.responseText);
				} else {
					alert("xhr请求失败：" + xhr.status);
				}
				break;
			default:
				break;
		}
	}
	xhr.open("GET", url);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send();
}
//存储
function putStorage(key, value) {
	window.localStorage.setItem(key, value);
}
//读取
function getStorage(key) {
	return window.localStorage.getItem(key);
}
//识别
function sbimg(base64) {
	var data = {
		"image": base64.split(';base64,')[1],
		"image_type": "BASE64",
		"face_field": "age,beauty,expression,faceshape,gender,glasses,landmark,race,quality,facetype,parsing"
	}
	var url2 = "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token="+token;
	xhrpost(url2, data, function(data) {
		$('.scan').remove();
		data = JSON.parse(data);

		if(data.error_code == 0) {

			if(data.face_num > 1) {
				//多人同框
				$('#play').attr('src', './MP3/morepople.mp3');
			} else {
				data = data.result.face_list[0];
				var pos = data.location; //识别人脸框
				var age = data.age; //年龄
				var yz = data.beauty; //颜值
				var bq = data.expression.type; //表情 none:不笑；smile:微笑；laugh:大笑
				var sex = data.gender.type; //性别：male:男性 female:女性
				var gl = data.glasses.type; //眼镜 none:无眼镜，common:普通眼镜，sun:墨镜
				var rz = data.race.type; //人种 yellow: 黄种人 white: 白种人 black:黑种人 arabs: 阿拉伯人
				var zl = data.face_type.type; // human: 真实人脸 cartoon: 卡通人脸;
				var json = {
					male: "男",
					female: '女',
					none: '无',
					common: '近视镜',
					sun: '墨镜',
					yellow: '黄种人',
					white: '白种人',
					black: '黑种人',
					arabs: '阿拉伯人',
					none:'无',
					smile:'微笑',
					laugh:'大笑'
				}
				var info = '/年龄:' + age + '/ 颜值:' + parseInt(yz) + '/ 性别:' + json[sex] + '/ 眼镜:' + json[gl] + '/ 人种:' + json[rz]+'/表情:'+json[bq];
				var ns = 0.27777;
				$('#imgbox').append('<div class="rect" ></div>');
				$('.rect').css({
					"left": pos.left * ns + 'px',
					"top": pos.top * ns - 40 + 'px',
					"width": pos.width * ns + 'px',
					"height": pos.height * ns + 'px'
				})
				$('#play').attr('src', './MP3/isok.mp3');
				$('.jp').addClass('active');
				$('.num').html('编号：' + Date.parse(new Date()) + info);
				var rnum = Math.floor(Math.random() * mdata.length);
				$('.jpnr').html('恭喜你得到：' + mdata[rnum]);
				mdata.splice(rnum, 1);
				$('#lpkc').html('库存:' + mdata.length)
				putStorage('mdata', JSON.stringify(mdata));
			}
		}

	})
}
//照相
function captureImage() {
	var cmr = plus.camera.getCamera();
	var res = cmr.supportedImageResolutions[0];
	var fmt = cmr.supportedImageFormats[0];
	cmr.captureImage(function(p) {
			plus.io.resolveLocalFileSystemURL(p, function(entry) {
				var localurl = entry.toLocalURL(); //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
				if(0 != localurl.toString().indexOf("file://")) {
					localurl = "file://" + url;
				}
				$('.rect').remove();
				$('#pic').attr('src', localurl);
				$('#play').attr('src', './MP3/shibie.mp3');
				$('#imgbox').append('<img src="./scan.gif" alt="" class="scan">');
				$('.jp').removeClass('active');
				canvasDataURL(localurl, function(data) {
					sbimg(data);
				})

			});
		},
		function(e) {
			mui.toast("很抱歉，拍照失败！ ");
		});
}
//实现将项目的图片转化成base64
function canvasDataURL(path, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = 720;
		h = (w / scale);
		var quality = 0.3; // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量

		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}