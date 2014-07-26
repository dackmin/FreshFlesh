/**
 * Simpliest way ever for creating a sprite in your game
 * @class Sprite
 * @constructor
 * @param {Object} options - {image,x,y,scale,alpha}
 */
FF.Sprite = function(options){
	if(!options.image) throw new Error("[FF.Sprite] You have to provide at least the image path for your sprite");
	if(FF.TextureCache[options.image] === undefined) throw new Error("[FF.Sprite] You are using a non-loaded asset");

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


	/**
	 * Original height of the image, in case of modified scale
	 * @property originalHeight
	 * @type Integer
	 */
	this.originalHeight = this.image.height;


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
	this.scale = ((options.fitRenderHeight) ? Math.ceil(FF.Render.getHeight() / this.originalHeight) : options.scale) || 1;

	this.rotate = options.rotate || 0;

	this.roundClip = options.roundClip || false;

	this.rectClip = options.rectClip || false;

	this.anchor = options.anchor || [0,0];


	/**
	 * Alpha of the sprite
	 * @property
	 * @type Float
	 */
	this.alpha = options.alpha || 1.00;

	this.hidden = options.hidden || false;

	this.hover = false;
};


/**
 * rect() function provides size and position of the sprite
 * Every drawable component have to have its own rect() function to be able to use collision detection or mouse event
 * @class Sprite
 * @method rect
 * @return {Object}
 */
FF.Sprite.prototype.rect = function(){
	return { x : this.x, y : this.y, width : this.originalWidth * this.scale, height : this.originalHeight * this.scale };
};

FF.Sprite.prototype.center = function(){
	return {
		x : this.x + ((this.originalWidth * this.scale) / 2),
		y : this.y + ((this.originalHeight * this.scale) / 2)
	};
};


FF.Sprite.prototype.update = function(){
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
FF.Sprite.prototype.draw = function(){
	//this.image.width = this.originalWidth * this.scale;
	//this.image.height = this.originalHeight * this.scale;

	if(this.hidden) return;

	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	//Clip : round
	if(this.roundClip != false){
		FF.Render.beginPath();
		FF.Render.arc(
			this.roundClip.x + (this.roundClip.width / 2),
			this.roundClip.y + (this.roundClip.height / 2),
			this.roundClip.width / 2,
			0,Math.PI * 2,
			false
		);
		FF.Render.clip();
	}

	//Clip : rect
	if(this.rectClip != false){
		FF.Render.beginPath();
		FF.Render.rect(
			this.rectClip.x,
			this.rectClip.y,
			this.rectClip.width,
			this.rectClip.height
		);
		FF.Render.clip();
	}

	//Rotate
	FF.Render.translate(this.rect().x + this.anchor[0],this.rect().y + this.anchor[1]);

	if(this.lastRotate && this.lastRotate != this.rotate) this.dispatchEvent({ type : "rotate", angle : this.rotate - this.lastRotate });
	FF.Render.rotate(this.rotate * Math.PI / 180);

	FF.Render.translate(-(this.rect().x + this.anchor[0]),-(this.rect().y + this.anchor[1]));

	this.lastRotate = this.rotate;

	FF.Render.drawImage(this.image,this.x,this.y,this.originalWidth * this.scale, this.originalHeight * this.scale);
	FF.Render.restore();
};

FF.Sprite.prototype.drawSomewhere = function(x,y){
	var old_x = this.rect().x;
	var old_y = this.rect().y;

	this.x = x;
	this.y = y;

	this.draw();

	this.x = old_x;
	this.y = old_y;
};

FF.Sprite.prototype.switchImage = function(url){
	if(!url) throw new Error("[FF.Sprite] You have to provide the image path of your sprite");
	if(FF.TextureCache[url] === undefined) throw new Error("[FF.Sprite] You are using a non-loaded asset");

	this.image = FF.TextureCache[url];
};
