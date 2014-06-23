/**
 * Don't even want to discuss about that...
 * @class WebGLRender
 * @constructor
 * @param {Object} view - If you already created a canvas item in your html page, use it. Otherwise system creates a screen-sized one for you
 */
FF.WebGLRender = function(view){
	console.log("Using webgl");

	/**
	 * The canvas, simple as a doorknob
	 * @property canvas
	 * @type Object
	 */
	this.canvas = null;


	/**
	 * Context width
	 * @property width
	 * @type Integer
	 */
	this.width = 0;


	/**
	 * Context height
	 * @property height
	 * @type Integer
	 */
	this.height = 0;

};


/**
 * Initiate the canvas render
 * @class WebGLRender
 * @method createRender
 * @param {Object} view - Existing canvas tu use instead of a new one (optional)
 */
FF.WebGLRender.prototype.createRender = function(view){
	var canvas, that = this;

	if(view){ canvas = view; }
	else{
		canvas = document.createElement("canvas");
		canvas.style.position = "absolute";
		canvas.style.top = "0px";
		canvas.style.left = "0px";
		canvas.width = FF.Util.screenWidth();
		canvas.height = FF.Util.screenHeight();

		document.body.appendChild(canvas);
	}

	//Fixing context width & height
	this.width = canvas.width;
	this.height = canvas.height;

	//Adding resize event to handle window resizing
	window.addEventListener("resize",function(e){
		var new_size = FF.Util.screenSize();

		canvas.width = new_size.width;
		that.width = new_size.width;

		canvas.height = new_size.height;
		that.height = new_size.height;
	});

	this.canvas = canvas;

	WebGL2D.enable(this.canvas);
};


/**
 * Returns the current drawing context of the canvas
 * @class WebGLRender
 * @method getContext
 * @return {Object}
 */
FF.WebGLRender.prototype.getContext = function(){
	return this.canvas.getContext("webgl-2d");
};


/**
 * Returns context/canvas width
 * @class WebGLRender
 * @method getWidth
 * @return {Integer}
 */
FF.WebGLRender.prototype.getWidth = function(){
	return this.width;
};


/**
 * Returns context/canvas height
 * @class WebGLRender
 * @method getHeight
 * @return {Integer}
 */
FF.WebGLRender.prototype.getHeight = function(){
	return this.height;
};


/**
 * Allows thou to set the background color of your game
 * @class WebGLRender
 * @method setBackgroundColor
 * @param {String} color - Hex color
 */
FF.WebGLRender.prototype.setBackgroundColor = function(color){
	//if(color == "#FFF" && color == "#FFFFFF") return;

	this.getContext().save();
	this.getContext().fillStyle = color;
	this.getContext().fillRect(0,0,this.getContext().canvas.width, this.getContext().canvas.height);
	this.getContext().restore();
};


/**
 * Clears context
 * @class WebGLRender
 * @method clearRect
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} w
 * @param {Integer} h
 */
FF.WebGLRender.prototype.clearRect = function(x,y,w,h){
	this.getContext().clearRect(x,y,w,h);
};


/**
 * Saves context
 * @class WebGLRender
 * @method save
 */
FF.WebGLRender.prototype.save = function(){
	this.getContext().save();
};


/**
 * Restore context
 * @class WebGLRender
 * @method restore
 */
FF.WebGLRender.prototype.restore = function(){
	this.getContext().restore();
};


/**
 * Translates context
 * @class WebGLRender
 * @method translate
 * @param {Integer} x
 * @param {Integer} y
 */
FF.WebGLRender.prototype.translate = function(x,y){
	this.getContext().translate(x,y);
};

FF.WebGLRender.prototype.rotate = function(angle){
	this.getContext().rotate(angle);
};


/**
 * Sets global alpha
 * @class WebGLRender
 * @method setAlpha
 * @param {Float} value
 */
FF.WebGLRender.prototype.setAlpha = function(value){
	this.getContext().globalAlpha = value;
};


/**
 * Draw image in context
 * @class WebGLRender
 * @method drawImage
 * @param {Image} img
 * @param {Integer} x
 * @param {Integer} y
 */
FF.WebGLRender.prototype.drawImage = function(img,x,y,w,h){
	this.getContext().drawImage(img,x,y,w,h);
};


/**
 * Draw subimage in context
 * @class WebGLRender
 * @method drawSubImage
 * @param {Image} img - Main image
 * @param {Integer} sx - clipping x position
 * @param {Integer} sy - clipping y position
 * @param {Integer} sw - clipping width
 * @param {Integer} sh - clipping height
 * @param {Integer} x - x position of subimage in context
 * @param {Integer} y - y position of subimage
 * @param {Integer} w - width of subimage
 * @param {Integer} h - height of subimage
 */
FF.WebGLRender.prototype.drawSubImage = function(img,sx,sy,sw,sh,x,y,w,h){
	this.getContext().drawImage(img,sx,sy,sw,sh,x,y,w,h);
};



FF.WebGLRender.prototype.fillRect = function(style,x,y,w,h){
	this.getContext().save();
	this.getContext().fillStyle = style;
	this.getContext().fillRect(x,y,w,h);
	this.getContext().restore();
};

FF.WebGLRender.prototype.fillText = function(str,font,style,x,y){
	this.getContext().save();
	this.getContext().font = font;
	this.getContext().fillStyle = style;
	this.getContext().fillText(str,x,y);
	this.getContext().restore();
};


FF.WebGLRender.prototype.fillTextWithShadow = function(str,font,style,x,y,shadow_color,offset_x,offset_y,blur){
	this.getContext().save();
	this.getContext().font = font;
	this.getContext().fillStyle = style;
	this.getContext().shadowColor = shadow_color;
	this.getContext().shadowBlur = blur;
	this.getContext().shadowOffsetX = offset_x;
	this.getContext().shadowOffsetY = offset_y;
	this.getContext().fillText(str,x,y);
	this.getContext().restore();
};

FF.WebGLRender.prototype.measureText = function(font, str){
	this.getContext().save();
	this.getContext().font = font;
	var res = this.getContext().measureText(str);
	this.getContext().restore();
	return res;
};

FF.WebGLRender.prototype.clip = function(){
	return this.getContext().clip();
};

FF.WebGLRender.prototype.beginPath = function(){
	return this.getContext().beginPath();
};

FF.WebGLRender.prototype.arc = function(centerX, centerY, radius, startingAngle, endAngle, counterClockwise){
	return this.getContext().arc(centerX, centerY, radius, startingAngle, endAngle, counterClockwise);
};

FF.WebGLRender.prototype.rect = function(x,y,width,height){
	return this.getContext().rect(x,y,width,height);
};
