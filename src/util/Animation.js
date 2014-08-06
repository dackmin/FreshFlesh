/**
 * Allows you to animate any Drawable node
 * @class Animation
 * @fires FF.Animation#start
 * @fires FF.Animation#step
 * @fires FF.Animation#end
 * @example
 * TODO
 */
FF.Animation = function(item, duration, options){
	FF.EventManager.call(this);

	var that = this;

	this.node = item;
	this.duration = duration;
	this.stoped = false;

	this.timer = new FF.Timer({ timeout : duration, interval : options.step || 10, autostart : options.autostart || false  });
	this.timer.addEventListener("start", function(e){ that.resetValues(); that.dispatchEvent({ type : "start" }); });
	this.timer.addEventListener("tick", function(e){ that.animate(e); that.dispatchEvent({ type : "step" }); });
	this.timer.addEventListener("timeout", function(){ that.dispatchEvent({ type : "end" }); });
	this.timer.addEventListener("stop", function(){ that.dispatchEvent({ type : "stop" }); });

	this.options = options;
};


FF.Animation.prototype.update = function(){
	if(this.stoped) return;

	this.timer.update();
};


FF.Animation.prototype.animate = function(tickEvent){
	if(this.options.x || this.options.x == 0) this.node.x = 				this.ease(tickEvent.current, this.originalX, (this.options.x - this.originalX), this.duration);
	if(this.options.y || this.options.y == 0) this.node.y = 				this.ease(tickEvent.current, this.originalY, (this.options.y - this.originalY), this.duration);
	if(this.options.width || this.options.width == 0) this.node.width = 	this.ease(tickEvent.current, this.originalWidth, (this.options.width - this.originalWidth), this.duration);
	if(this.options.height || this.options.height == 0) this.node.height = 	this.ease(tickEvent.current, this.originalHeight, (this.options.height - this.originalHeight), this.duration);
	if(this.options.scale || this.options.scale == 0) this.node.scale = 	this.ease(tickEvent.current, this.originalScale, (this.options.scale - this.originalScale), this.duration);
	if(this.options.opacity || this.options.opacity == 0) this.node.alpha = this.ease(tickEvent.current, this.originalAlpha, (this.options.opacity - this.originalAlpha), this.duration);
};

// http://gsgd.co.uk/sandbox/jquery/easing/
// t: current time, b: begInnIng value, c: change In value, d: duration
FF.Animation.prototype.ease = function(t, b, c, d, ease){
	var s=1.70158;

	ease = (ease) ? ease : ((this.options.ease) ? this.options.ease : "easeOutQuad");

	switch(ease){

		case "easeInQuad":
			return c*(t/=d)*t + b;

		case "easeOutQuad":
			return -c *(t/=d)*(t-2) + b;

		case "easeInOutQuad":
			if ((t/=d/2) < 1)
				return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;

		case "easeInCubic":
			return c*(t/=d)*t*t + b;

		case "easeOutCubic":
			return c*((t=t/d-1)*t*t + 1) + b;

		case "easeInOutCubic":
			if ((t/=d/2) < 1)
				return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;

		case "easeInQuart":
			return c*(t/=d)*t*t*t + b;

		case "easeOutQuart":
			return -c * ((t=t/d-1)*t*t*t - 1) + b;

		case "easeInOutQuart":
			if ((t/=d/2) < 1)
				return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;

		case "easeInQuint":
			return c*(t/=d)*t*t*t*t + b;

		case "easeOutQuint":
			return c*((t=t/d-1)*t*t*t*t + 1) + b;

		case "easeInOutQuint":
			if ((t/=d/2) < 1)
				return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;

		case "easeInSine":
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;

		case "easeOutSine":
			return c * Math.sin(t/d * (Math.PI/2)) + b;

		case "easeInOutSine":
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;

		case "easeInExpo":
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;

		case "easeOutExpo":
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;

		case "easeInOutExpo":
			if(t==0)
				return b;
			if(t==d)
				return b+c;
			if((t/=d/2) < 1)
				return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;

		case "easeInCirc":
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;

		case "easeOutCirc":
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;

		case "easeInOutCirc":
			if ((t/=d/2) < 1)
				return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;

		case "easeInElastic":
			var p=0;var a=c;
			if(t==0) return b; if((t/=d)==1) return b+c; if(!p) p=d*.3;
			if(a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;

		case "easeOutElastic":
			var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;

		case "easeInOutElastic":
			var p=0;var a=c;
			if(t==0) return b;  if((t/=d/2)==2) return b+c; if(!p) p=d*(.3*1.5);
			if(a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;

		case "easeInBack":
			return c*(t/=d)*t*((s+1)*t - s) + b;

		case "easeOutBack":
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;

		case "easeInOutBack":
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;

		case "easeInBounce":
			return c - this.ease(d-t, 0, c, d, "easeOutBounce") + b;

		case "easeOutBounce":
			if ((t/=d) < (1/2.75)) return c*(7.5625*t*t) + b;
			else if (t < (2/2.75)) return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			else if (t < (2.5/2.75)) return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			else return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;

		case "easeInOutBounce":
			if (t < d/2) return this.ease(t*2, 0, c, d, "easeInBounce") * .5 + b;
			return this.ease(t*2-d, 0, c, d, "easeOutBounce") * .5 + c*.5 + b;


	}
};

FF.Animation.prototype.start = function(){
	this.stoped = false;
	this.timer.restart();
};

FF.Animation.prototype.stop = function(){
	this.stoped = true;
	this.timer.stop();
};

FF.Animation.prototype.resetValues = function(){
	this.originalX = this.node.rect().x;
	this.originalY = this.node.rect().y;
	this.originalWidth = this.node.rect().width;
	this.originalHeight = this.node.rect().height;
	this.originalScale = this.node.scale;
	this.originalAlpha = this.node.alpha;
};
