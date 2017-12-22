chalkboard();




function chalkboard(){
 /*  var  adad=  chalkboard.parentNode;
   removeClass(adad, "chalkboard");
	chalk.remove();*/

/*    $('body').prepend('<div class="panel"><a class="link" target="_blank"></a></div>');
	$('body').prepend('<canvas id="chalkboard" style="display: none"></canvas>');
	$('body').prepend('<div class="chalk"></div>');
    $('body').prepend('<div class="showImg" style="display: none"></div>');
    $('body').prepend('<div class="fu" style="display: none"></div>');
    $('body').prepend('<div class="juanzhou" style="display: none" >' +
        '<div class="left_zhou"></div>' +
        '<div class="right_zhou"></div>' +
        '<div class="body_juanzhouL"></div>' +
        '<div class="body_juanzhouR"></div>' +
        '<div class="main-index"></div>' +
        '</div>');*/
    var chalkboard =document.getElementById('chalkboard');
    var chalk =document.getElementsByClassName('chalk')[0];
    var body =document.getElementsByTagName('body')[0];
    var myWindow =document.documentElement;
    var fu =document.getElementsByClassName('fu')[0];
    var canvas = document.getElementById("chalkboard");
    var juanzhou=document.getElementsByClassName('juanzhou')[0];
    var left_zhou=document.getElementsByClassName('left_zhou')[0];
    var right_zhou=document.getElementsByClassName('right_zhou')[0];
    var body_juanzhouL=document.getElementsByClassName('body_juanzhouL')[0];
    var body_juanzhouR=document.getElementsByClassName('body_juanzhouR')[0];
    var showImg=document.getElementsByClassName('showImg')[0];
    var panel=document.getElementsByClassName('panel')[0];
    var mainIndex=document.getElementsByClassName('main-index')[0];


    body.style.background= 'url(img/fu0.jpg) no-repeat';
    body.style.backgroundSize= '100% 100%';
    
	chalkboard.style.width=myWindow.clientWidth+'px';
	chalkboard.style.height=myWindow.clientHeight+'px';
    fu.style.width=myWindow.clientWidth+'px';
    fu.style.height=myWindow.clientWidth+'px';
    fu.style.top=((myWindow.clientHeight-myWindow.clientWidth)/2)+'px';
    juanzhou.style.height=((myWindow.clientHeight-myWindow.clientWidth)/2-30)+'px';
    juanzhou.style.width='95%';
    juanzhou.style.top=((myWindow.clientHeight-myWindow.clientWidth)/2+myWindow.clientWidth)+'px';

	canvas.width = myWindow.clientWidth;
	canvas.height = myWindow.clientHeight;
	
	var ctx = canvas.getContext("2d");
	
	var width = canvas.width;
	var height = canvas.height;
	var mouseX = 0;
	var mouseY = 0;
	var mouseD = false;
	var eraser = false;
	var xLast = 0;
	var yLast = 0;
	var brushDiameter = 15;
	var eraserWidth = 50;
	var eraserHeight = 100;
    /* 准确获取手机屏幕的宽度和高度*/
    var allWidth= document.documentElement.clientWidth;
    var allHeight=document.documentElement.clientHeight;
/*    console.log(allWidth+","+allHeight);*/
    var trueList=[{x:0.288,y:0.35},{x:0.482,y:0.331},{x:0.426,y:376},{x:0.226,y:0.623},{x:0.424,y:0.487},{x:0.336,y:0.704}
        ,{x:0.434,y:0.751},{x:0.741,y:0.257},{x:0.85,y:0.623},{x:0.632,y:0.514},{x:0.773,y:0.494},{x:0.61,y:0.631},{x:0.877,y:0.562}
        ,{x:0.76,y:0.631},{x:0.81,y:0.706}];
    var myList=[];
    left_zhou.style.left=(myWindow.clientWidth/2-20) + 'px';
    right_zhou.style.right=(myWindow.clientWidth/2-20) + 'px';
    body_juanzhouL.style.left=(myWindow.clientWidth/2-10) + 'px';
    body_juanzhouR.style.right=(myWindow.clientWidth/2-10) + 'px';
    
    
    
	chalkboard.style.cursor='none';
	document.onselectstart = function(){ return false; };
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = brushDiameter;
	ctx.lineCap = 'round';


	document.addEventListener('touchmove', function(evt) {
        var touch = evt.touches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        if (mouseY < height && mouseX < width) {
            evt.preventDefault();
            chalk.style.left=mouseX + 'px';
            chalk.style.top=(mouseY-50) + 'px';

            if (mouseD) {

                console.log(mouseX+"bb "+mouseY);
            	console.log(mouseX/allWidth+"aa "+mouseY/allHeight);

                draw(mouseX, mouseY);
            }
        }
    }, false);
    document.addEventListener('touchstart', function(evt) {

        var touch = evt.touches[0];
     /*   mouseD = true;*/
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        xLast = mouseX;
        yLast = mouseY;
        if (mouseD) {
            draw(mouseX + 1, mouseY + 1);
        }

    }, false);
    document.addEventListener('touchend', function(evt) {



        if (mouseD) {

            chalkboard.style.display="none";
            showImg.style.display="block";
            panel.style.display="block";
            fu.style.display="block";

            _drawImage();
            setTimeout(function () {
                juanzhou.style.display="block";
            },4900);

            mouseD = false;
            showImg.addEventListener("animationend", function () {
                body.style.background= 'url(img/fu3.jpg) no-repeat';
                body.style.backgroundSize= '100% 100%';

                while(mainIndex.firstChild) mainIndex.removeChild(mainIndex.firstChild);
                var listIndex = trueList.length;


                console.log(myList)
                if (myList.length > 400) {

                    mainIndex.innerHTML =('<p><b>福如东海</b>&nbsp;&nbsp;--泼墨风格手</p>');
                   /* alert("获得称号'泼墨风格手'");*/
                } else {
                    var o = pd(myList, trueList);
                    if (o / listIndex < 1 / 5) {
                        mainIndex.innerHTML= ('<p><b>福星高照</b>&nbsp;&nbsp;--青铜学徒</p>');
                     /*   alert("获得称号'青铜学徒'");*/
                    } else if (o / listIndex < 2 / 5) {
                        mainIndex.innerHTML =('<p><b>福禄双全</b>&nbsp;&nbsp;--白银画手</p>');
                      /*  alert("获得称号'白银画手'");*/
                    } else if (o / listIndex < 3 / 5) {
                        mainIndex.innerHTML= ('<p><b>福寿天成</b>&nbsp;&nbsp;--黄金画师</p>');
                  /*      alert("获得称号'黄金画师'");*/
                    } else if (o / listIndex < 3 / 4) {
                        mainIndex.innerHTML =('<p><b>福与天齐</b>&nbsp;&nbsp;--钻石画仙</p>');
                   /*     alert("获得称号'钻石画仙'");*/
                    } else {
                        mainIndex.innerHTML =('<p><b>洪福齐天</b>&nbsp;&nbsp;--传说画神</p>');
                  /*      alert("获得称号'传说画神'");*/
                    }
                }
                document.getElementsByTagName('p')[0].style.top=(((myWindow.clientHeight-myWindow.clientWidth)/2-50)/2)+'px';

                showJZ();



            });


        }

    }, false);
	/*将画图生成图片*/
    function _drawImage(){

        var url=canvas.toDataURL('image/png'),
            img=new Image();
        img.src=url;
        var aa = document.getElementsByClassName('showImg')[0];
        aa.style.backgroundImage="url("+url+")";
        chalkboard.style.display="none";;
    }

    chalkboard.style.cursor='none';
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = brushDiameter;
	ctx.lineCap = 'round';


	document.oncontextmenu = function() {return false;};
         
	function draw(x,y){
		ctx.strokeStyle = '#0f0f0f';
		ctx.beginPath();
  		ctx.moveTo(xLast, yLast);		
  		ctx.lineTo(x, y);
        myList.push({x:x/allWidth,y:y/allHeight});
  		ctx.stroke();
          
  		// Chalk Effect
		var length =0;
		var xUnit = (x-xLast)/length;
		var yUnit = (y-yLast)/length;
		for(var i=0; i<length; i++ ){
			var xCurrent = xLast+(i*xUnit);	
			var yCurrent = yLast+(i*yUnit);
			var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;			
			var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
    		ctx.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
			}

		xLast = x;
		yLast = y;
	}

    document.getElementsByClassName('link')[0].addEventListener('click', (function(evt){

        mouseD = true;
        fu.style.display="none";
        chalkboard.style.display="block";
        showImg.style.display="none";
        panel.style.display="none";
        body.style.background='url(img/fu1.jpg) no-repeat';
        body.style.backgroundSize='100% 100%';
        chalk.style.display= 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }));

	function showJZ() {
        //卷轴展开效果
        var ss =-(myWindow.clientWidth/2-20);
        var dd =(myWindow.clientWidth/2-20)+10;
        left_zhou.style.transform='translateX('+ss+'px)';
        right_zhou.style.transform='translateX('+(dd-30)+'px)';
        body_juanzhouL.style.transform='translateX('+ss+'px)';
        body_juanzhouR.style.transform='translateX('+(dd-30)+'px)';
        body_juanzhouL.style.width=dd+'px';
        body_juanzhouR.style.width=dd+'px';

        setTimeout(function(){
            document.getElementsByClassName("main-index")[0].style.display='block';
            document.getElementsByClassName("main-index")[0].style.opacity ='1';
        },3000);

    }



	/*对比两个数组的相识度*/
    function pd(arrayOne,arrayTwo) {
        var  indx=0;
        for(var i in arrayOne){
            for(var j in arrayTwo){
                if(Math.abs(arrayOne[i].x-arrayTwo[j].x)<=0.013&&Math.abs(arrayOne[i].y-arrayTwo[j].y)<=0.013){
                    indx++;
                    arrayTwo.splice(j, 1);
                }
            }
        }
        console.log(indx);
        return indx;

    }



} 