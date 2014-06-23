/**
 * When life gives you lemons, use a CanvasRender instead of a WebGLRender. Very slower, but needed.
 * @class CanvasRender
 * @constructor
 * @param {Object} view - If you already created a canvas item in your html page, use it. Otherwise system creates a screen-sized one for you
 */
FF.CanvasRender = function(view){


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
 * @method createRender
 * @param {Object} view - Existing canvas tu use instead of a new one (optional)
 */
FF.CanvasRender.prototype.createRender = function(view){
	var canvas;
	var that = this;

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
};


/**
 * Returns the current drawing context of the canvas
 * @method getContext
 * @return {Object}
 */
FF.CanvasRender.prototype.getContext = function(){
	return this.canvas.getContext("2d");
};


/**
 * Returns context/canvas width
 * @method getWidth
 * @return {Integer}
 */
FF.CanvasRender.prototype.getWidth = function(){
	return this.width;
};


/**
 * Returns context/canvas height
 * @method getHeight
 * @return {Integer}
 */
FF.CanvasRender.prototype.getHeight = function(){
	return this.height;
};


/**
 * Allows thou to set the background color of your game
 * @method setBackgroundColor
 * @param {String} color - Hex color
 */
FF.CanvasRender.prototype.setBackgroundColor = function(color){
	if(color == "#FFF" && color == "#FFFFFF") return;

	this.getContext().save();
	this.getContext().fillStyle = color;
	this.getContext().fillRect(0,0,this.getContext().canvas.width, this.getContext().canvas.height);
	this.getContext().restore();
};


/**
 * Clears context
 * @method clearRect
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} w
 * @param {Integer} h
 */
FF.CanvasRender.prototype.clearRect = function(x,y,w,h){
	this.getContext().clearRect(x,y,w,h);
};


/**
 * Saves context
 * @method save
 */
FF.CanvasRender.prototype.save = function(){
	this.getContext().save();
};


/**
 * Restore context
 * @method restore
 */
FF.CanvasRender.prototype.restore = function(){
	this.getContext().restore();
};


/**
 * Translates context
 * @method translate
 * @param {Integer} x
 * @param {Integer} y
 */
FF.CanvasRender.prototype.translate = function(x,y){
	this.getContext().translate(x,y);
};

FF.CanvasRender.prototype.rotate = function(angle){
	this.getContext().rotate(angle);
};


/**
 * Sets global alpha
 * @method setAlpha
 * @param {Float} value
 */
FF.CanvasRender.prototype.setAlpha = function(value){
	this.getContext().globalAlpha = value;
};


/**
 * Draw image in context
 * @method drawImage
 * @param {Image} img
 * @param {Integer} x
 * @param {Integer} y
 */
FF.CanvasRender.prototype.drawImage = function(img,x,y,w,h){
	this.getContext().drawImage(img,x,y,w,h);
};


/**
 * Draw subimage in context
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
FF.CanvasRender.prototype.drawSubImage = function(img,sx,sy,sw,sh,x,y,w,h){
	this.getContext().drawImage(img,sx,sy,sw,sh,x,y,w,h);
};


/**
 * Draw filled rectangle in context
 * @method fillRect
 * @param {String} style - See Canvas API
 * @param {Integer} x - x position of rectangle
 * @param {Integer} y - y position of rectangle
 * @param {Integer} w - width of your rectangle
 * @param {Integer} h - height of your rectangle
 */
FF.CanvasRender.prototype.fillRect = function(style,x,y,w,h){
	this.getContext().save();
	this.getContext().fillStyle = style;
	this.getContext().fillRect(x,y,w,h);
	this.getContext().restore();
};


/**
 * Draw filled text on context
 * @method fillText
 * @param {String} str - The text to draw
 * @param {String} font - Font family
 * @param {String} style - See Canvas API
 * @param {Integer} x - x position of your text
 * @param {Integer} y - y position of your text
 */
FF.CanvasRender.prototype.fillText = function(str,font,style,x,y){
	this.getContext().save();
	this.getContext().font = font;
	this.getContext().fillStyle = style;
	this.getContext().fillText(str,x,y);
	this.getContext().restore();
};


/**
 * As says the title
 * @method fillTextWithShadow
 * @param {String} str - Text to draw
 * @param {String} font - Font family
 * @param {String} style - See Canvas API
 * @param {Integer} x - x position of your text
 * @param {Integer} y - y position of your text
 * @param {String} shadow_color - Hex string
 * @param {Integer} offset_x - shadow x offset
 * @param {Integer} offset_y - shadow y offset
 * @param {String} blur - See Canvas API
 */
FF.CanvasRender.prototype.fillTextWithShadow = function(str,font,style,x,y,shadow_color,offset_x,offset_y,blur){
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


/**
 * Measure text width
 * @method measureText
 * @param {String} font - Font family
 * @param {String} str - String to measure
 * @return {Integer} Text width
 */
FF.CanvasRender.prototype.measureText = function(font, str){
	this.getContext().save();
	this.getContext().font = font;
	var res = this.getContext().measureText(str);
	this.getContext().restore();
	return res;
};


/**
 * Clip a previously sat region
 * @method clip
 * @return {No fucking idea}
 */
FF.CanvasRender.prototype.clip = function(){
	return this.getContext().clip();
};


/**
 * Used to define a starting path point
 * @method beginPath
 * @return {Clearly something}
 */
FF.CanvasRender.prototype.beginPath = function(){
	return this.getContext().beginPath();
};

FF.CanvasRender.prototype.arc = function(centerX, centerY, radius, startingAngle, endAngle, counterClockwise){
	return this.getContext().arc(centerX, centerY, radius, startingAngle, endAngle, counterClockwise);
};

FF.CanvasRender.prototype.rect = function(x,y,width,height){
	return this.getContext().rect(x,y,width,height);
};
