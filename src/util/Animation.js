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

	this.options = options || {};

	this.originalX = this.node.rect().x;
	this.originalY = this.node.rect().y;
	this.originalWidth = this.node.rect().width;
	this.originalHeight = this.node.rect().height;
	this.originalScale = this.node.scale;
	this.originalAlpla = this.node.alpha;
};


FF.Animation.prototype.update = function(){
	this.timer.update();
};


FF.Animation.prototype.animate = function(tickEvent){
	var percent = (this.timer.time / this.timer.timeout);

	if(this.options.left) this.node.x = this.originalX - (this.options.left * percent);
	if(this.options.right) this.node.x = this.originalX + (this.options.right * percent);
	if(this.options.top) this.node.y = this.originalY - (this.options.top * percent);
	if(this.options.bottom) this.node.y = this.originalY + (this.options.bottom * percent);

	if(this.options.width) this.node.width = this.originalWidth + ((this.options.width - this.originalWidth) * percent);
	if(this.options.height) this.node.height = this.originalHeight + ((this.options.height - this.originalHeight) * percent);
	if(this.options.scale) this.node.scale = this.originalScale + ((this.options.scale - this.originalScale) * percent);
	if(this.options.opacity) this.node.alpha = this.originalAlpha + ((this.options.opacity - this.originalAlpha) * percent);
};

FF.Animation.prototype.start = function(){
	this.timer.restart();
};
