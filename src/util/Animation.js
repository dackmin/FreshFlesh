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

	this.timer = new FF.Timer({ timeout : duration, interval : options.step || 100, autostart : options.autostart || false  });
	this.timer.addEventListener("start", function(){ that.dispatchEvent({ type : "start" }); });
	this.timer.addEventListener("tick", function(e){ that.animate(e); that.dispatchEvent({ type : "step" }); });
	this.timer.addEventListener("timeout", function(){ that.dispatchEvent({ type : "end" }); });

	this.animateLeft = options.left || null;

	this.animateRight = options.right || null;

	this.animateTop = options.top || null;

	this.animateBottom = options.bottom || null;

	this.animateWidth = options.width || null;

	this.animateHeight = options.height || null;

	this.animateScale = options.scale || null;

	this.animateOpacity = options.opacity || null;
};


FF.Animation.prototype.update = function(){
	this.timer.update();
};


FF.Animation.prototype.animate = function(tickEvent){
	var percent = (this.timer.time / this.timer.timeout);

	if(this.animateLeft !== null) this.node.x-= this.animateLeft * percent;
	if(this.animateRight !== null) this.node.x+= this.animateRight * percent;
	if(this.animateTop !== null) this.node.y-= this.animateTop * percent;
	if(this.animateBottom !== null) this.node.y+= this.animateBottom * percent;

	if(this.animateWidth !== null){
		var diff = this.animateWidth - this.node.width;
		this.node.width+= diff * percent;
	}
	if(this.animateHeight !== null){
		var diff = this.animateHeight - this.node.height;
		this.node.height+= diff * percent;
	}
	if(this.animateScale !== null){
		var diff = this.animateScale - this.node.scale;
		this.node.scale+= diff * percent;
	}
	if(this.animateOpacity !== null){
		var diff = this.animateOpacity - this.node.alpha;
		this.node.alpha+= diff * percent;
	}
};

FF.Animation.prototype.start = function(){
	this.timer.restart();
};
