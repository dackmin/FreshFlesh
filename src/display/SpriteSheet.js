/**
 * Simpliest way ever for creating a sprite in your game
 * @class Sprite
 * @constructor
 * @param {Object} options - {image,x,y,scale,alpha}
 */
FF.SpriteSheet = function(options){
	if(!options.image) throw new Error("[FF.SpriteSheet] You have to provide at least the image path for your sprite");
	if(FF.TextureCache[options.image] === undefined) throw new Error("[FF.SpriteSheet] You are using a non-loaded asset");

	FF.EventManager.call(this);


	/**
	 * Texture of the sprite
	 * @property image
	 * @type Image
	 */
	this.image = FF.TextureCache[options.image];


	/**
	 * Original width of the image, in case of modified scale
	 * @property originalWidth
	 * @type Integer
	 */
	this.originalWidth = this.image.width;

	this.frameWidth = options.frame_size[0] || this.image.width;


	/**
	 * Original height of the image, in case of modified scale
	 * @property originalHeight
	 * @type Integer
	 */
	this.originalHeight = this.image.height;

	this.frameHeight = options.frame_size[1] || this.image.height;


	/**
	 * Position of the sprite on x coordinate
	 * @property x
	 * @type Integer
	 */
	this.x = options.x || 0;


	/**
	 * Position of the sprite on y coordinate
	 * @property y
	 * @type Integer
	 */
	this.y = options.y || 0;


	/**
	 * Scale of the sprite
	 * @property scale
	 * @type Integer
	 */
	this.scale = options.scale || 1;


	/**
	 * Alpha of the sprite
	 * @property
	 * @type Float
	 */
	this.alpha = options.alpha || 1.00;

	this.hidden = options.hidden || false;

	this.bounds = options.bounds || [0,0,this.frameWidth,this.frameHeight];

	this.hover = false;

	this.currentGID = 0;

	this.frames = [];
	this.positions = [];
	var z = 0;
	for(var x = 0; x < this.originalHeight; x+= this.frameHeight){
		for(var y = 0; y < this.originalWidth; y+= this.frameWidth){
			this.frames.push(z);
			this.positions[z] = { x : y, y : x };
			z++;
		}
	}
};


/**
 * rect() function provides size and position of the sprite
 * Every drawable component have to have its own rect() function to be able to use collision detection or mouse event
 * @class Sprite
 * @method rect
 * @return {Object}
 */
FF.SpriteSheet.prototype.rect = function(){
	return {
		x : this.x,
		y : this.y,
		width : this.bounds[2] * this.scale,
		height : this.bounds[3] * this.scale
	};
};


FF.SpriteSheet.prototype.update = function(){
	if(	FF.InputManager.mouse_x >= this.x && FF.InputManager.mouse_x <= this.x + this.rect().width &&
		FF.InputManager.mouse_y >= this.y && FF.InputManager.mouse_y <= this.y + this.rect().height
	){
		if(FF.InputManager.pressedWithoutRepeat(["left_mouse_button"])){
			this.dispatchEvent({ type : "click" });
		}

		this.hover = true;
		if(this.hidden == false) this.dispatchEvent({ type : "mouseover" });
	}
	else{
		if(this.hover == true && this.hidden == false) this.dispatchEvent({ type : "mouseout" });
		this.hover = false;
	}
};


/**
 * Every drawable component have to have its own draw() function to be drown
 * @class Sprite
 * @method draw
 */
FF.SpriteSheet.prototype.draw = function(){
	//this.image.width = this.originalWidth * this.scale;
	//this.image.height = this.originalHeight * this.scale;

	if(this.hidden) return;

	var pos = this.positions[this.currentGID];

	FF.Render.save();
	FF.Render.setAlpha(this.alpha);
	FF.Render.drawSubImage(
		this.image,
		pos.x,
		pos.y,
		this.frameWidth * this.scale,
		this.frameHeight * this.scale,
		this.x - this.bounds[0],
		this.y - this.bounds[1],
		this.frameWidth * this.scale,
		this.frameHeight * this.scale
	);
	FF.Render.restore();
};

FF.SpriteSheet.prototype.switchImage = function(url){
	if(!url) throw new Error("[FF.SpriteSheet] You have to provide the image path of your sprite");
	if(FF.TextureCache[url] === undefined) throw new Error("[FF.SpriteSheet] You are using a non-loaded asset");

	this.image = FF.TextureCache[url];
};

FF.SpriteSheet.prototype.setFrame = function(frame){
	this.currentGID = frame;
};
