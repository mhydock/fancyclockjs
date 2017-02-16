function fancyClock(inputID) {
  var top = $('<div class="clock"/>').hide();
  var wrp = $('<div/>');

	var hour = 0;
  var min = 0;
  var sec = 0;
  var isAM = true;
	var input = $(inputID);
  
  var hourHand = $('<div><span class="hourHand"></span></div>');
  var minHand = $('<div><span class="minuteHand"></span></div>');
  var secHand = $('<div><span class="secondHand"></span></div>');
  var toggle = $('<a class="ampm"/>');
  var axel = $('<div class="axel"/>');
  var now = $('<a class="now"/>');
  var sw = $('<a class="stopWatch"/>');

	var pos = input.position();
  var h = input.outerHeight() + 5;
	top.css({'top':pos.top + h, 'left': pos.left});

  hourHand.css({'position':'absolute', 'top':'50%', 'left':'50%'});
  minHand.css({'position':'absolute', 'top':'50%', 'left':'50%'});
  secHand.css({'position':'absolute', 'top':'50%', 'left':'50%'});
  
  $('body').append(top);
  
  function pad(str) {
    str += ""
    if (str.length < 2)
      return '0'+str;
    return str;
  }

  function setTimeToNow(){
    var n = new Date(Date.now());
    hour = n.getHours();
    min = n.getMinutes();
    sec = n.getSeconds();

    if (hour > 12)
      isAM = false;

    hour %= 12;
  }

  function ampm() {
    return (isAM?'AM':'PM');
  }

  function setTime() {
      input.val(pad(hour) + ":" + pad(min) + ":" + pad(sec) + " " + ampm());
      hourHand.css({'transform':'rotate('+(hour*30-90)+'deg)'});
      minHand.css({'transform':'rotate('+(min*6-90)+'deg)'});
      secHand.css({'transform':'rotate('+(sec*6-90)+'deg)'});
      toggle.text(ampm());
  }

  function hourCallback(h) {
    return function(){
      hour = h;
      setTime();
    }
  }

  function minuteCallback(m) {
    return function(){
      min = m;
      setTime();
    }
  }

  function secondCallback(s) {
    return function(){
      sec = s;
      setTime();
    }
  }

  for (var i = 1; i <= 12; i++) {
    var offset = top.innerWidth()*.3;
    var n = $('<a class="hour"/>').text(i).css({'transform':'rotate('+(i*30-90)+'deg) translateX('+offset+'px) rotate('+(i*-30+90)+'deg) '});
    wrp.append(n);
    n.click(hourCallback(i));
  }

  for (var i = 0; i < 60; i++ ) {
    var offset = top.innerWidth()*.4;
    var n = $('<a class="min"/>');
    var o = $('<span/>');
    n.css({'transform':'rotate('+(i*6-90)+'deg) translateX('+offset+'px) rotate(90deg)'});
    n.append(o);
    if (i % 5 == 0)
      o.css({'height':'1em'})
    wrp.append(n);
    n.click(minuteCallback(i));
  }

  for (var i = 0; i < 60; i++ ) {
    var offset = top.innerWidth()*.5;
    var n = $('<a class="sec"/>');
    n.css({'transform':'rotate('+(i*6-90)+'deg) translateX('+offset+'px) rotate(90deg)'});
    wrp.append(n);
    n.click(secondCallback(i));
  }

  toggle.text(ampm());
  toggle.click(function(){
    isAM = !isAM;
    setTime();
  })

  now.click(function(){
   setTimeToNow();
   setTime()
  });
  
  var move = false;
 	setInterval(function(){
  	if (move)
 	  	now.click();
  }, 1000);
  
  sw.click(function(){
		move = !move;
    sw.toggleClass('play');
    sw.toggleClass('pause');
  });
  
  sw.addClass('play');

  input.click(function(){
    top.fadeToggle(400);
  });
  
  wrp.append(hourHand);
  wrp.append(minHand);
  wrp.append(secHand);
  wrp.append(toggle);
  wrp.append(axel);
  wrp.append(now);
  wrp.append(sw);
  top.append(wrp);

  now.click();
}

fancyClock('#time1')
fancyClock('#time2')