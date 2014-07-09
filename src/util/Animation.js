/**
 * Allows you to animate your sprite frames
 * @class Animation
 * @example
 * TODO
 */
FF.Animation = function(options){
	FF.EventManager.call(this);

	this.frames = options.frames || sprite.positions;
	this.subsets = [];
	this.frame_duration = options.frame_duration || 100;
	this.index = 0;
	this.loop = 1;
	this.bounce = 0;
	this.frame_direction = 1;
	this.frame_size = null;
	this.orientation = "down";
	this.on_end = null;
	this.offset = 0;
	this.scale_image = null;
	this.sprite_sheet = null;
	this.current_tick = (new Date()).getTime();
  	this.last_tick = (new Date()).getTime();
  	this.sum_tick = 0;

	if(options.subsets){
    	this.subsets = {};
		for(subset in options.subsets){
		  start_stop = options.subsets[subset];
		  this.subsets[subset] = this.slice(start_stop[0], start_stop[1]);
		}
	}
};

FF.Animation.prototype.subset = function(subset) {
  return this.subsets[subset];
};

FF.Animation.prototype.update = function() {
	this.current_tick = (new Date()).getTime();
  	this.sum_tick += (this.current_tick - this.last_tick);
  	this.last_tick = this.current_tick;

  	if(this.sum_tick > this.frame_duration){
    	this.index += this.frame_direction;
    	this.sum_tick = 0;
  	}

  	if((this.index >= this.frames.length) || (this.index < 0)){
    	if(this.bounce){
      		this.frame_direction = -this.frame_direction;
      		this.index += this.frame_direction * 2;
    	}
    	else if(this.loop){
    		if(this.frame_direction < 0) this.index = this.frames.length -1;
     		else this.index = 0;
   		}
    	else{
			this.index -= this.frame_direction;
			if (this.on_end){
				this.on_end();
				this.on_end = null;
			}
    	}
  	}
};

FF.Animation.prototype.slice = function(start, stop) {
  	var o = {};
  	o.frame_duration = this.frame_duration;
  	o.loop = this.loop;
  	o.bounce = this.bounce;
  	o.on_end = this.on_end;
  	o.frame_direction = this.frame_direction;
  	o.frames = this.frames.slice().slice(start, stop);
  	return new FF.Animation(o);
};

FF.Animation.prototype.merge = function(_frames){
	var o = {};
  	o.frame_duration = this.frame_duration;
  	o.loop = this.loop;
  	o.bounce = this.bounce;
  	o.on_end = this.on_end;
  	o.frame_direction = this.frame_direction;

  	o.frames = [];
	for(var i in _frames) o.frames.push(this.frames[_frames[i]]);

  	return new FF.Animation(o);
};

FF.Animation.prototype.next = function(){
  this.update();
  return this.frames[this.index];
};

FF.Animation.prototype.atLastFrame = function(){
	return (this.index == this.frames.length-1);
};

FF.Animation.prototype.atFirstFrame = function(){
	return (this.index == 0);
};

FF.Animation.prototype.currentFrame = function() {
  return this.frames[this.index];
};
