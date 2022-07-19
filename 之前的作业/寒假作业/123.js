var leftbutton = document.getElementsByClassName("leftbutton")[0];
var rightbutton = document.getElementsByClassName("rightbutton")[0];
var movediv = document.getElementById("movediv");
var movediv1 = document.getElementById("movediv1");


var leftmove = function () {
  movediv.style.left = movediv.offsetLeft - 10 + "px";
  movediv1.style.left = movediv1.offsetLeft + 10 + "px";
}
var rightmove = function () {
  movediv.style.left = movediv.offsetLeft + 10 + "px";
  movediv1.style.left = movediv1.offsetLeft - 10 + "px";
}

var leftchange = function () {
  var times = 0;
  var i = setInterval(function () {
    leftmove();
    times++;
    if (times === 30) {
      clearInterval(i);
    }
  }, 10);
}
var rightchange = function () {
  var times = 0;
  var i = setInterval(function () {
    rightmove();
    times++;
    if (times === 30) {
      clearInterval(i);
    }
  }, 10);
}
var j = 0;
leftbutton.onclick = function () {
  j++;
  if (j % 2 == 1) leftchange();
  if (j % 2 == 0) rightchange();
}
rightbutton.onclick = function () {
  j++;
  if (j % 2 == 1) leftchange();
  if (j % 2 == 0) rightchange();
}
var lbtn = document.getElementById("lbtn");
var rbtn = document.getElementById("rbtn");
var moveph1 = document.getElementById("moveph1");
var moveph2 = document.getElementById("moveph2");
var moveph3 = document.getElementById("moveph3");
var point1 = document.getElementById("point1");
var point2 = document.getElementById("point2");
var point3 = document.getElementById("point3");
var backg = document.getElementById("backg");
var img = new Array(moveph1, moveph2, moveph3);
var index = 0;
/*var time=0;
var change0 = function(){
    time=setInterval(function(){
      if(img[index].style.opacity==0)img[index].style.opacity=0;
      else
      img[index].style.opacity = img[index].style.opacity-0.2;

    })
}*/
var check = function () {
  if (index == 0) {
    point1.style.backgroundColor = "gray";
    point2.style.backgroundColor = "gray";
    point3.style.backgroundColor = "gray";
    point1.style.backgroundColor = "#FFFFFF";
  }
  if (index == 1) {
    point1.style.backgroundColor = "gray";
    point2.style.backgroundColor = "gray";
    point3.style.backgroundColor = "gray";
    point2.style.backgroundColor = "#FFFFFF";
  }
  if (index == 2) {
    point1.style.backgroundColor = "gray";
    point2.style.backgroundColor = "gray";
    point3.style.backgroundColor = "gray";
    point3.style.backgroundColor = "#FFFFFF";
  }
}
rbtn.onclick = function () {
  img[index].style.opacity = 0;
  if (index == 2) { index = -1 };
  index++;
  for (var i = 0; i <= 2; i++) {
    img[i].style.zIndex = 0;
  }
  img[index].style.zIndex = 3;
  check();
  img[index].style.opacity = 1;
}
lbtn.onclick = function () {
  img[index].style.opacity = 0;
  if (index == 0) { index = 3 }
  index--;
  for (let i = 0; i <= 2; i++) {
    img[i].style.zIndex = 0;
  }
  img[index].style.zIndex = 3;
  check();
  img[index].style.opacity = 1;
}

point1.onclick = function () {
  for (let i = 0; i <= 2; i++) {
    img[i].style.zIndex = 0;
  }
  point1.style.backgroundColor = "gray";
  point2.style.backgroundColor = "gray";
  point3.style.backgroundColor = "gray";
  img[1].style.opacity = 0;
  img[2].style.opacity = 0;
  img[0].style.opacity = 1;
  img[0].style.zIndex = 3;
  index = 0;
  point1.style.backgroundColor = "#FFFFFF";
};
point2.onclick = function () {
  for (let i = 0; i <= 2; i++) {
    img[i].style.zIndex = 0;
  }
  point1.style.backgroundColor = "gray";
  point2.style.backgroundColor = "gray";
  point3.style.backgroundColor = "gray";
  img[0].style.opacity = 0;
  img[2].style.opacity = 0;
  img[1].style.opacity = 1;
  img[1].style.zIndex = 3;
  index = 1;
  point2.style.backgroundColor = "#FFFFFF";
};
point3.onclick = function () {
  for (let i = 0; i <= 2; i++) {
    img[i].style.zIndex = 0;
  }
  point1.style.backgroundColor = "gray";
  point2.style.backgroundColor = "gray";
  point3.style.backgroundColor = "gray";
  img[0].style.opacity = 0;
  img[1].style.opacity = 0;
  img[2].style.opacity = 1;
  img[2].style.zIndex = 3;
  index = 2;
  point3.style.backgroundColor = "#FFFFFF";
};




var stop = setInterval(function () {
  img[index].style.opacity = 0;
  if (index == 2) { index = -1 };
  index++;
  for (var i = 0; i <= 2; i++) {
    img[i].style.zIndex = 0;
  }
  img[index].style.zIndex = 3;
  check();
  img[index].style.opacity = 1;
}, 4000);

backg.onmouseover = function () {
  clearInterval(stop);
  /* stop=null;*/
};

backg.onmouseout = function () {

  stop = setInterval(function () {
    img[index].style.opacity = 0;
    if (index == 2) { index = -1 };
    index++;
    for (var i = 0; i <= 2; i++) {
      img[i].style.zIndex = 0;
    }
    img[index].style.zIndex = 3;
    check();
    img[index].style.opacity = 1;
  }, 4000);
}
/*alert(document.body.offsetHeight);
alert(screen.availHeight);
alert(document.documentElement.scrollHeight);
alert(document.documentElement.scrollTop);*/

var backtotop = document.getElementById("lastbut");
var hg = document.documentElement.scrollTop;
var temp = hg;
var timer = 0;
backtotop.onclick = function () {
  if (document.documentElement.scrollTop >= 0) {
    timer = setInterval(function () {
      document.documentElement.scrollTop = document.documentElement.scrollTop - 20;
      console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop === 0) clearInterval(timer);
    }, 3);

  }
}





