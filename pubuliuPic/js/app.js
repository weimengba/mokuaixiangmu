window.onload=function(){
	imgLocation("container","box");
	var imgData={"data":[{"src":"2.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"16.jpg"},{"src":"18.jpg"},{"src":"19.jpg"}]};              //建立字符串模拟加载的时候传输
	//滚动条事件函数
	window.onscroll=function(){
		if(checkFlag()){   //如果成立，就要加载数据
			var cparent=document.getElementById("container");     //得到根目录，进行动态的加载
			for(var i=0;i<imgData.data.length;i++){
				var ccontent=document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);  //将创建好的div放到container里
				var boximg=document.createElement("div");
				boximg.className="box_img";
				ccontent.appendChild(boximg);
				var img=document.createElement("img");
				img.src="images/"+imgData.data[i].src;
				boximg.appendChild(img);
			}
			imgLocation("container","box");
		}
	}
}
//返回一个bool类型，true表示允许加载，false表示不允许加载
function checkFlag(){
	var cparent=document.getElementById("container");
	var ccontent=getChildElement(cparent,"box");     //监听里面的具体内容
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;      //获取并储存最后一张图片（内容）的高度
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
//  alert(lastContentHeight+"   "+scrollTop+"   "+pageHeight);
    if(lastContentHeight<scrollTop+pageHeight){
    	return true;
    }
}

//获取屏幕上共有多少个图片  方法：根据父级控件查找子目录的个数
function imgLocation(parent,content){
	//将parent下的所有content全部取出
	var cparent=document.getElementById(parent);
	var ccontent=getChildElement(cparent,content);  //定义对象来承载内容（子控件）
	var imgWidth=ccontent[0].offsetWidth;          //得到图片的宽度，因为宽度都是相同的，所以得到任何一个宽度都可以的
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);//主要是用来获取每一行可以容纳的图片数量
    cparent.style.cssText='width:'+imgWidth*num+'px;margin:0 auto;';       //已经知道每一行可以放图片的数量，所以要让每一行的图片固定化（就是改变屏幕的大小，没行图片数量不变）

    var boxHeightArr=[];         //定义一个数组来承载盒子的高度
	//遍历每一个图片（盒子），获取每一张图片的高度
	for(var i=0;i<ccontent.length;i++){
		//boxHeightArr[i]=ccontent[i].offsetHeight;  //将每一张图片的高度存放在一个数组里面     经分析，我们只需要记录每一行的高度，所以注释掉，改成下面的
		if(i<num){
			boxHeightArr[i]=ccontent[i].offsetHeight;
		}else{
			var minHeight=Math.min.apply(null,boxHeightArr);  //获取需要摆放的图片（最小高度的图片）
			
			var minIndex=getMinHeightLocation(boxHeightArr,minHeight);
			
		    //我们需要绝对布局，这样才能完整的来控制其位置
		    ccontent[i].style.position="absolute";
		    ccontent[i].style.top=minHeight+"px";  //设置其高度，最低那张图片的高度
		    ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";   //设置要放的位置的居左位置
		    //将已经放置好的图片的高度进行改变
		    boxHeightArr[minIndex]=boxHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
	}
}

//得到要放置图片的位置
function getMinHeightLocation(boxHeightArr,minHeight){   //获取最小高度的图片的位置
	for(var i=0;i<boxHeightArr.length;i++){
		if(boxHeightArr[i]==minHeight){
			return i;   //返回相应图片的位置
		}
	}
}

//用函数得到每一个子box控件，并用数组存储起来
function getChildElement(parent,content){
	var contentArr=[];
	var allContent=parent.getElementsByTagName("*");
	for(var i=0;i<allContent.length;i++){
		if(allContent[i].className==content){
			contentArr.push(allContent[i]);
		}
	}
	return contentArr;
}
