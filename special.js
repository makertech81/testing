$(function() {
	$(".posts_index p").each(function(i, elt) {
		var width = Math.random() * (window.innerWidth);
	    var height = Math.random() * (window.innerHeight);
	    var greaterWidth = true;
	    var greaterHeight = true;
	    var lessWidth = true;
	    var lessHeight = true;
	    while (greaterWidth === true || greaterHeight === true ||  lessWidth === true || lessHeight === true) {
	    	if (width>(window.innerWidth*.80)) {
	    		width = Math.random() * (window.innerWidth);
	    		greaterWidth = true;
	    	} else{
	    		greaterWidth = false;
	    	}
	    	if (height>(window.innerHeight*.80)) {
	    		height = Math.random() * (window.innerHeight);
	    		greaterHeight = true;
	    	} else{
	    		greaterHeight = false;
	    	}
	    	if (width<(window.innerWidth*.20)) {
	    		width = Math.random() * (window.innerWidth);
	    		lessWidth = true;
	    	} else{
	    		lessWidth = false;
	    	}
	    	if (height<(window.innerHeight*.20)) {
	    		height = Math.random() * (window.innerHeight);
	    		lessHeight = true;
	    	} else{
	    		lessHeight = false;
	    	}
		}
		$(elt).css({

			left: width,
			top: height
		});
	});
});
console.log(Math.random())
var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};
TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
	this.el.innerHTML = '<span class="wrap">I am ' + this.txt + '<\/span>';
	var that = this;
	var delta = 200 - Math.random() * 100;
	if (this.isDeleting) {
		delta /= 2;
	}
	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}
	setTimeout(function() {
		that.tick();
	}, delta);
};
window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};
