/**
 * TODO
 */
FF.Timer = function(options){
	FF.EventManager.call(this);
	var that = this;

	this.time = 0;

	this.timeout = options.timeout || 10000;

	this.interval = options.interval || 1000;

	this.lastTick = new Date();

	this.autostart = options.autostart || false;

	this.active = options.autostart || false;

	if(this.autostart) this.dispatchEvent({ type : "start", timeout : that.timeout });
};

FF.Timer.prototype.update = function(){
	if(!this.active) return;

	var that = this;

	if(this.time >= this.timeout){
		this.dispatchEvent({ type : "timeout" });
		this.reset();
	}

	if(new Date() - this.lastTick >= this.interval){
		this.time+= this.interval;
		this.dispatchEvent({ type : "tick", remaining : that.timeout - that.time, completion : parseFloat(that.time / that.timeout) });
		this.lastTick = new Date();
	}
};

FF.Timer.prototype.reset = function(){
	this.time = 0;
	this.lastTick = new Date();
	this.dispatchEvent({ type : "timeout" });

	if(this.autostart){ this.restart(); }
	else this.active = false;
};

FF.Timer.prototype.restart = function(){
	var that = this;

	this.time = 0;
	this.lastTick = new Date();
	this.dispatchEvent({ type : "start", timeout : that.timeout });
	this.active = true;
};

FF.Timer.prototype.getRemainingTime = function(){
	return this.timeout - this.time;
};
