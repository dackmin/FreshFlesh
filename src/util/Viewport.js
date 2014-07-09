/**
 * Represents a clipping zone of the entire game
 * @class Viewport
 * @constructor
 * @example
 * var map = new FF.TiledMap({ map : "blablabla.json" });
 * var viewport = new FF.Viewport({ max_x : map.rect().width, max_y : map.rect().height });
 * var character = new FF.Sprite({ image : "blabla.jpg" });
 *
 * In the update function of your gamestate
 *
 * viewport.centerAround(character);
 *
 * Then in the draw function of your gamestate :
 *
 * viewport.draw(map);
 * viewport.draw(character);
 */
FF.Viewport = function(options){


	/**
	 * x position of the viewport
	 * @property x
	 * @type Integer
	 */
	this.x = 0;


	/**
	 * y position of the viewport
	 * @property y
	 * @type Integer
	 */
	this.y = 0;


	/**
	 * max x position of the viewport (default : render width)
	 * @property max_x
	 * @type Integer
	 */
	this.max_x = options.max_x || FF.Render.width;


	/**
	 * max y position of the viewport (default : render height)
	 * @property max_y
	 * @type Integer
	 */
	this.max_y = options.max_y || FF.Render.height;


	/**
	 * width of your viewport (default : render width)
	 * @property width
	 * @type Integer
	 */
	this.width = options.width || FF.Render.width;


	/**
	 * height of your viewport (default : render height)
	 * @property height
	 * @type Integer
	 */
	this.height = options.height || FF.Render.height;


	this.moving = false;

};


/**
 * Move viewport from relative position
 * @class Viewport
 * @method move
 * @param {Integer} x
 * @param {Integer} y
 */
FF.Viewport.prototype.move = function(x,y){
	this.x += x || 0;
   	this.y += y || 0;

	this.verifyPosition();
};


/**
 * Move viewport from absolute position
 * @class Viewport
 * @method moveTo
 * @param {Integer} x
 * @param {Integer} y
 */
FF.Viewport.prototype.moveTo = function(x,y){
    this.x = x || this.x;
    this.y = y || this.y;

    this.verifyPosition();
};


/**
 * Check if item is totaly inside the viewport
 * @class Viewport
 * @method isInside
 * @param {Object} item - object to check
 * @return {Boolean} - true if item is entirely inside viewport, false otherwise
 */
FF.Viewport.prototype.isInside = function(item){
	return( item.x >= this.x && item.x <= (this.x + this.width) && item.y >= this.y && item.y <= (this.y + this.height));
};


/**
 * See FF.Viewport.isInside()
 * @class Viewport
 * @method isOutside
 * @param {Object} item
 * @return {Boolean}
 */
FF.Viewport.prototype.isOutside = function(item){
    return !this.isInside(item);
};


/**
 * Check if item is partly inside the viewport
 * @class Viewport
 * @method isPartlyInside
 * @param {Object} item
 * @return {Boolean} - true if object is partly inside the viewport, false otherwise
 */
FF.Viewport.prototype.isPartlyInside = function(item){
    var rect = item.rect();
	rect.right = rect.x + rect.width;
	rect.bottom = rect.y + rect.height;

    return rect.right >= this.x && rect.x <= (this.x + this.width) && rect.bottom >= this.y && item.y <= (this.y + this.height);
};


/**
 * Check if object is on the left of the viewport
 * @class Viewport
 * @method isLeftOf
 * @param {Object} item
 * @return {Boolean} - true if object is on the left of the viewport
 */
FF.Viewport.prototype.isLeftOf = function(item){
	return item.x < this.x;
};


/**
 * See FF.Viewport.isLeftOf()
 * @class Viewport
 * @method isRightOf
 * @param {Object} item
 * @return {Boolean}
 */
FF.Viewport.prototype.isRightOf = function(item){
	return item.x > this.x + this.width;
};


/**
 * See FF.Viewport.isLeftOf()
 * @class Viewport
 * @method isAbove
 * @param {Object} item
 * @return {Boolean}
 */
FF.Viewport.prototype.isAbove = function(item){
	return item.y < this.y;
};


/**
 * See FF.Viewport.isLeftOf()
 * @class Viewport
 * @method isBelow
 * @param {Object} item
 * @return {Boolean}
 */
FF.Viewport.prototype.isBelow = function(item){
	return item.y > this.y + this.height;
};


/**
 * Centering position of the viewport considering item position
 * @class Viewport
 * @method centerAround
 * @param {Object} item - object to center around
 */
FF.Viewport.prototype.centerAround = function(item){
    this.x = Math.floor(item.x - this.width / 2);
    this.y = Math.floor(item.y - this.height / 2);

    this.verifyPosition();
};


/**
 * Force an item to stay in the visible area of the viewport
 * @class Viewport
 * @method forceInsideVisibleArea
 * @param {Object} item
 * @param {Integer} buffer
 */
FF.Viewport.prototype.forceInsideVisibleArea = function(item,buffer){
    if(item.x < this.x + buffer)               				{ item.x = this.x + buffer; }
    if(item.x > this.x + FF.Render.Context.width - buffer)  { item.x = this.x + FF.Render.Context.width - buffer; }
    if(item.y < this.y + buffer)               				{ item.y = this.y + buffer; }
    if(item.y > this.y + FF.Render.Context.height - buffer)	{ item.y = this.y + FF.Render.Context.height - buffer; }
};


/**
 * Force an item to stay into the viewport area (visible part or not)
 * @class Viewport
 * @method forceInside
 * @param {Object} item
 * @param {Integer} buffer
 */
FF.Viewport.prototype.forceInside = function(item,buffer){
    if(item.x < buffer)               { item.x = buffer; }
    if(item.x > this.max_x - buffer)  { item.x = this.max_x - buffer; }
    if(item.y < buffer)               { item.y = buffer; }
    if(item.y > this.max_y - buffer)  { item.y = this.max_y - buffer; }
};


/**
 * Translates context from viewport position and use a callback if provided
 * @class Viewport
 * @method apply
 * @param {Handler} func - callback
 */
FF.Viewport.prototype.apply = function(func){
    FF.Render.save();
    FF.Render.translate(-this.x, -this.y);
    func();
    FF.Render.restore();
};


/**
 * Draw an item inside the viewport
 * @class Viewport
 * @method draw
 * @param {Object} obj - object to draw in the viewport
 */
FF.Viewport.prototype.draw = function(obj, draw_fctn, draw_fctn_arg){
	var that = this;

	this.apply(function(){
      	if(obj.draw) that.drawIfPartlyInside(obj, draw_fctn, draw_fctn_arg);
    });
};


/**
 * Draw an item if it is partly inside the viewport
 * @class Viewport
 * @method drawIfPartlyInside
 * @param {Object} item
 */
FF.Viewport.prototype.drawIfPartlyInside = function(item, draw_fctn, draw_fctn_arg){
    if(this.isPartlyInside(item)){
		if(draw_fctn) eval("item."+draw_fctn+"(\""+draw_fctn_arg+"\");");
		else item.draw();
	}
};


/**
 * Check position of the viewport
 * @class Viewport
 * @method verifyPosition
 */
FF.Viewport.prototype.verifyPosition = function(){
	var _moving = 0;

    var max = this.max_x - this.width;
		if(this.x < 0) this.x = 0;
		else _moving++;

		if(this.x > max) this.x = max;
		else _moving++

    var max = this.max_y - this.height;
    	if(this.y < 0) this.y = 0;
		else _moving++;

    	if(this.y > max) this.y = max;
		else _moving++;

	if(_moving > 2) this.moving = true;
	else this.moving = false;
};


FF.Viewport.prototype.rect = function(){
	return {x : this.x, y : this.y, width : this.width, height : this.height };
};
