/**
 * TODO
 */
FF.Trigger = function(collider, options){
	FF.EventManager.call(this);

	this.collider = collider;

	this.x = options.x || 0;
	this.y = options.y || 0;
	this.width = options.width || 10;
	this.height = options.height || 10;

	this.triggered = false;
};


FF.Trigger.prototype.rect = function(){
	return {
		x : this.x,
		y : this.y,
		width : this.width,
		height : this.height
	};
}

FF.Trigger.prototype.update = function(){
	if(FF.Util.collideOneWithOne(this.collider, this)){
		if(!this.triggered) this.dispatchEvent({ type : "triggered" });
		this.triggered = true;
	}
	else
		this.triggered = false;
};
