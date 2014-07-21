

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js from "./MERGE" begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/* Last merge : Lun 21 jul 2014 12:15:19 CEST  */

/* Merging order :

- Core
- src/Core.js
- Renderers
- src/renderers/Render.js
- src/renderers/CanvasRender.js
- src/renderers/WebGLRender.js
- Loaders
- src/loaders/ImageLoader.js
- src/loaders/BitmapFontLoader.js
- src/loaders/AudioLoader.js
- src/loaders/TMXLoader.js
- src/loaders/AssetLoader.js
- Display
- src/display/Sprite.js
- src/display/SpriteSheet.js
- src/display/Parallax.js
- src/display/TiledMap.js
- src/display/BitmapText.js
- Audio
- src/audio/Music.js
- src/audio/Sound.js
- Util
- src/util/Animation.js
- src/util/EventManager.js
- src/util/Game.js
- src/util/GameState.js
- src/util/InputManager.js
- src/util/Shooter.js
- src/util/Timer.js
- src/util/Util.js
- src/util/Viewport.js
- src/util/WebSocketServer.js

*/


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: Core begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/Core.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * FreshFlesh
 * @version 0.1 (June 2014)
 * @author Ugo Stephant (http://www.ugostephant.io/)
 *
 * FreshFlesh is licensed under the Apache V2 License.
 * http://opensource.org/licenses/Apache-2.0
 */
var FF = {};


/**
 * Array to store preloaded images
 * @property TextureCache
 * @type Array<Image>
 */
FF.TextureCache = [];


/**
 * Array to store preloaded tmx maps
 * @property TMXMapCache
 * @type Array<TMXMap>
 */
FF.TMXMapCache = [];


/**
 * Array to store bitmap font files
 * @property BitmapTextCache
 *
 */
FF.BitmapFontCache = [];


/**
 * Array to store sounds
 * @property AudioCache
 */
FF.AudioCache = [];


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: Renderers begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/renderers/Render.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * A global render to use when drawing something either in canvas or webgl
 * @class Render
 * @static
 */
FF.Render = {};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/renderers/CanvasRender.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/renderers/WebGLRender.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: Loaders begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/loaders/ImageLoader.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Use this loader to preload images
 * @class ImageLoader
 * @constructor
 * @param {String} url - URL of your image
 */
FF.ImageLoader = function(url){
	FF.EventManager.call(this);


	/**
	 * URL of your image
	 * @property imageUrl
	 * @type String
	 */
	this.imageUrl = url;


};


/**
 * Loads the image
 * @method load
 */
FF.ImageLoader.prototype.load = function(){
	var that = this;

	var img = new Image();
	img.src = this.imageUrl;
	img.onload = function(e){ that.dispatchEvent({ type : "loaded" }); }

	FF.TextureCache[this.imageUrl] = img;
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/loaders/BitmapFontLoader.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Canvas fonts are cool. But BitmapFonts are even cooler.
 * @class BitmapFontLoader
 * @constructor
 */
FF.BitmapFontLoader = function(url){
	FF.EventManager.call(this);


	/**
	 * URL of your .fnt file
	 * @property url
	 * @type String
	 */
	this.url = url;
};


/**
 * Called to load a .fnt file
 * @method load
 */
FF.BitmapFontLoader.prototype.load = function(){
	var filetype = this.url.split(".").pop().toLowerCase();
	if(filetype != "fnt") throw new Error("[FF.BitmapFontLoader] File type ("+filetype+") is not supported");
	var res = this.fromFNT();
};


/**
 * Invoked when FNT file is loaded, parses the data
 * @method fromFNT
 */
FF.BitmapFontLoader.prototype.fromFNT = function(){
	var that = this;

	FF.Util.ajax({ type : "POST", url : this.url, complete : function(content){
		var doc = FF.Util.getDOMDocument(content);

		var textureUrl = doc.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue;

		var data = {};
		var info = doc.getElementsByTagName("info")[0];
		var common = doc.getElementsByTagName("common")[0];

		data.font = info.attributes.getNamedItem("face").nodeValue;
		data.size = parseInt(info.attributes.getNamedItem("size").nodeValue, 10);
		data.lineHeight = parseInt(common.attributes.getNamedItem("lineHeight").nodeValue, 10);
		data.chars = {};
		data.texture = textureUrl;

		//parse letters
		var letters = doc.getElementsByTagName("char");

		for (var i = 0; i < letters.length; i++){
			var charCode = parseInt(letters[i].attributes.getNamedItem("id").nodeValue, 10);

			var textureRect = {
				x: parseInt(letters[i].attributes.getNamedItem("x").nodeValue, 10),
				y: parseInt(letters[i].attributes.getNamedItem("y").nodeValue, 10),
				width: parseInt(letters[i].attributes.getNamedItem("width").nodeValue, 10),
				height: parseInt(letters[i].attributes.getNamedItem("height").nodeValue, 10)
			};

			data.chars[charCode] = {
					xOffset: parseInt(letters[i].attributes.getNamedItem("xoffset").nodeValue, 10),
					yOffset: parseInt(letters[i].attributes.getNamedItem("yoffset").nodeValue, 10),
					xAdvance: parseInt(letters[i].attributes.getNamedItem("xadvance").nodeValue, 10),
					kerning: {},
					textureRect : textureRect
			};
		}

		//parse kernings
		var kernings = doc.getElementsByTagName("kerning");
		for (i = 0; i < kernings.length; i++){
		   var first = parseInt(kernings[i].attributes.getNamedItem("first").nodeValue, 10);
		   var second = parseInt(kernings[i].attributes.getNamedItem("second").nodeValue, 10);
		   var amount = parseInt(kernings[i].attributes.getNamedItem("amount").nodeValue, 10);

			data.chars[second].kerning[first] = amount;

		}

		FF.BitmapFontCache[data.font] = data;

		image = new FF.ImageLoader(textureUrl);
		image.addEventListener("loaded", function() {
			data.texture = FF.TextureCache[textureUrl];
			that.onLoaded();
		 });
		 image.load();
		}
	});
};


/**
 * Invoked when all files are loaded (xml/fnt and texture)
 * @method onLoaded
 */
FF.BitmapFontLoader.prototype.onLoaded = function(){
	this.dispatchEvent({type: "loaded", content: this});
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/loaders/AudioLoader.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Use this loader to preload a sound
 * @class SoundLoader
 * @constructor
 * @param {String} url - URL of your sound
 */
FF.AudioLoader = function(url){
	FF.EventManager.call(this);

	/**
	 * URL of your image
	 * @property imageUrl
	 * @type String
	 */
	this.soundUrl = url;
};


/**
 * Loads the sound
 * @method load
 */
FF.AudioLoader.prototype.load = function(){
	var that = this;

	var sound = new Audio(this.soundUrl);

	sound.oncanplaythrough = function(e){ that.dispatchEvent({ type : "loaded" }); }
	sound.load();

	FF.AudioCache[this.soundUrl] = sound;
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/loaders/TMXLoader.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Allows you to preload a tmx (from now on only XML maps WITHOUT base64 encoding)
 * @class TMXLoader
 * @constructor
 * @param {String} url - URL to TMX map
 */
FF.TMXLoader = function(url){
	FF.EventManager.call(this);


	/**
	 * URL of your tmx map (.tmx)
	 * @property mapUrl
	 * @type String
	 */
	this.mapUrl = url;

};


/**
 * Call to preload the file
 * @method load
 */
FF.TMXLoader.prototype.load = function(){
	this.fromTMX();
};


/**
 * Gets map content from a json file
 * @method fromJSON
 */
FF.TMXLoader.prototype.fromJSON = function(){
	//TODO
};


/**
 * Gets map content from a tmx file
 * @method fromTMX
 */
FF.TMXLoader.prototype.fromTMX = function(){
	var that = this;

	FF.Util.ajax({ type : "POST", url : this.mapUrl, complete : function(content){
		var doc = FF.Util.getDOMDocument(content);

		var m = {
			width : 0,
			height : 0,
			tilewidth : 0,
			tileheight : 0,
			obj_groups : [],
			layers : [],
			tilesets : [],
			orientation : "",
			properties : {},
			version : 0
		};

		//Get simple values
		m.width = parseInt(doc.getElementsByTagName("map")[0].getAttribute("width"));
		m.height = parseInt(doc.getElementsByTagName("map")[0].getAttribute("height"));
		m.tilewidth = parseInt(doc.getElementsByTagName("map")[0].getAttribute("tilewidth"));
		m.tileheight = parseInt(doc.getElementsByTagName("map")[0].getAttribute("tileheight"));
		m.version = parseInt(doc.getElementsByTagName("map")[0].getAttribute("version"));

		//Set properties
		try{
			var prop = doc.getElementsByTagName("map")[0].getElementsByTagName("properties")[0].getElementsByTagName("property");
			for(var k = 0; k < prop.length; k++){
				m.properties[prop[k].getAttribute("name")] = prop[k].getAttribute("value");
			}
		} catch(e){}


		//Get tilesets
		var tilesets = doc.getElementsByTagName("map")[0].getElementsByTagName("tileset");

		for(var i = 0; i < tilesets.length; i++){

			var tileset = {
				firstgid : parseInt(tilesets[i].getAttribute("firstgid")),
				positions : [],
				name : tilesets[i].getAttribute("name"),
				image : (tilesets[i].getElementsByTagName("image")[0].getAttribute("source")).split("../").pop(),
				imagewidth : parseInt(tilesets[i].getElementsByTagName("image")[0].getAttribute("width")),
				imageheight : parseInt(tilesets[i].getElementsByTagName("image")[0].getAttribute("height")),
				margin : 0,
				spacing : 0,
				properties : {},
				tilewidth : parseInt(tilesets[i].getAttribute("tilewidth")),
				tileheight : parseInt(tilesets[i].getAttribute("tileheight"))
			};

			//Set gids
			var z = 1;
			for(var _y = 0; _y < tileset.imageheight; _y+= tileset.tileheight){
				for(var _x = 0; _x < tileset.imagewidth; _x+= tileset.tilewidth){
					tileset.positions[z] = { x : _x, y : _y };
					z++;
				}
			}

			m.tilesets[i] = tileset;
		}

		//Get the layers
		var layers = doc.getElementsByTagName("map")[0].getElementsByTagName("layer");
		for(var i = 0; i < layers.length; i++){
			var layer = {
				name : layers[i].getAttribute("name"),
				x : 0,
				y : 0,
				width : parseInt(layers[i].getAttribute("width")),
				height : parseInt(layers[i].getAttribute("height")),
				opacity : 1,
				type : "tilelayer",
				visible : true,
				properties : {},
				data : []
			};

			//Set properties
			try{
				var prop = layers[i].getElementsByTagName("properties")[0].getElementsByTagName("property");
				for(var k = 0; k < prop.length; k++){
					layer.properties[prop[k].getAttribute("name")] = prop[k].getAttribute("value");
				}
			} catch(e){}

			//Set data
			//try{
				var tiles = layers[i].getElementsByTagName("tile");
				var z = 0;
				for(var x = 0; x < layer.width; x++){
					var layer_line = [];
					for(var y = 0; y < layer.height; y++){
						layer_line[y] = tiles[(x+(y*layer.width))].getAttribute("gid");
						z++;
					}
					layer.data[x] = layer_line;
				}
			//} catch(e){}

			m.layers[i] = layer;
		}


		//Get objects
		var obj_groups = doc.getElementsByTagName("map")[0].getElementsByTagName("objectgroup");
		for(var i = 0; i < obj_groups.length; i++){
			var obj_group = {
				name : obj_groups[i].getAttribute("name"),
				width : parseInt(obj_groups[i].getAttribute("width")),
				height : parseInt(obj_groups[i].getAttribute("height")),
				objects : [],
				properties : {}
			};

			//Set properties
			try{
				var prop = obj_groups[i].getElementsByTagName("properties")[0].getElementsByTagName("property");
				for(var k = 0; k < prop.length; k++){
					obj_group.properties[prop[k].getAttribute("name")] = prop[k].getAttribute("value");
				}
			} catch(e){}

			//Set data
			var objects = obj_groups[i].getElementsByTagName("object");
			for(var j = 0; j < objects.length; j++){
				var object = {
					gid : parseInt(objects[j].getAttribute("gid")),
					x : parseInt(objects[j].getAttribute("x")),
					y : parseInt(objects[j].getAttribute("y")) - ((objects[j].getAttribute("gid")) ? m.tileheight : 0),
					width : (objects[j].getAttribute("width")) ? parseInt(objects[j].getAttribute("width")) : m.tilewidth,
					height : (objects[j].getAttribute("height")) ? parseInt(objects[j].getAttribute("height")) : m.tileheight,
					rect : function(){
						return {
							x : this.x,
							y : this.y,
							width : this.width,
							height : this.height
						}
					},
					type : objects[j].getAttribute("type"),
					properties : {}
				};


				//Set properties
				try{
					var prop = objects[j].getElementsByTagName("properties")[0].getElementsByTagName("property");
					for(var k = 0; k < prop.length; k++){
						object.properties[prop[k].getAttribute("name")] = prop[k].getAttribute("value");
					}
				} catch(e){}

				obj_group.objects.push(object);
			}

			m.obj_groups.push(obj_group);
		}

		FF.TMXMapCache[that.mapUrl] = m;

		that.dispatchEvent({ type : "loaded" });
	}});

};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/loaders/AssetLoader.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Before doing anything, you have to load all your assets with the AssetLoader
 * @class AssetLoader
 * @constructor
 * @uses EventManager
 * @param {Array<String>} assets - Array of path to your assets
 *
 * @example
 * var assets = ["res/player.png","maps/map.tmx"];
 * var assetLoader = new FF.AssetLoader(assets);
 * assetLoader.addEventListener("loaded", function(){
 *      //everything you have to do with your game
 * });
 *
 * You can even listen to the "progress" event to show a loader or loader bar
 */
FF.AssetLoader = function(assets){
	FF.EventManager.call(this);


	/**
	 * Array of URLS of your assets
	 * @property assetsURL
	 * @type Array<String>
	 */
	this.assetsURL = assets;


	/**
	 * Number of elements loaded (used to dispatch loaded event)
	 * @property loadedCount
	 * @type Integer
	 */
	this.loadedCount = 0;


	/**
	 * Supported assets types
	 * @property assetsTypes
	 * @type Array<String>
	 */
	this.assetsTypes = {
		"jpg" : FF.ImageLoader,
		"jpeg" : FF.ImageLoader,
		"gif" : FF.ImageLoader,
		"png" : FF.ImageLoader,
		"tmx" : FF.TMXLoader,
		"fnt" : FF.BitmapFontLoader,
		"json" : FF.TMXLoader,
		"mp3" : FF.AudioLoader
	};

};


/**
 * Starts to load all assets registered before
 * @method load
 */
FF.AssetLoader.prototype.load = function(){
	var that = this;

	for(i in this.assetsURL){
		var filename = this.assetsURL[i];
		var filetype = this.assetsURL[i].split(".").pop().toLowerCase();

		var loader = this.assetsTypes[filetype];
		if(!loader) throw new Error("Filetype of ["+filename+"] is not supported");

		loader = new loader(filename);
		loader.addEventListener("loaded", function(){
			that.loadedAsset(filename);
		});
		loader.load();
	}
};


/**
 * Called when an asset has just ended loading
 * @method loadedAsset
 */
FF.AssetLoader.prototype.loadedAsset = function(filename){
	var that = this;
	this.loadedCount++;

	this.dispatchEvent({ type : "progress", loaded : that.loadedCount, total : that.assetsURL.length, currentFile : filename });

	if(this.loadedCount == this.assetsURL.length){
		this.dispatchEvent({ type : "loaded" });
	}
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: Display begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/display/Sprite.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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

FF.Sprite.prototype.switchImage = function(url){
	if(!url) throw new Error("[FF.Sprite] You have to provide the image path of your sprite");
	if(FF.TextureCache[url] === undefined) throw new Error("[FF.Sprite] You are using a non-loaded asset");

	this.image = FF.TextureCache[url];
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/display/SpriteSheet.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/display/Parallax.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


FF.Parallax = function(options){
	FF.EventManager.call(this);

	this.width = options.width || FF.Render.getWidth();

	this.height = options.height || FF.Render.getHeight();

	this.x = options.x || 0;

	this.y = options.y || 0;

	this.repeat_x = options.repeat_x || true;

	this.repeat_y = options.repeat_y || false;

	this.camera_x = options.camera_x || 0;

	this.camera_y = options.camera_y || 0;

	this.layers = options.layers || [];
};


FF.Parallax.addLayer = function(layer){
	this.layers.push(layer);
};


FF.Parallax.prototype.draw = function(){

    for(var i=0; i < this.layers.length; i++) {
		var layer, numx, numy, initx;
      layer = this.layers[i];

      if(this.repeat_x) initx = -((this.camera_x / layer.speed) % layer.sprite.rect().width);
      else initx = -(this.camera_x / layer.speed);

      if(this.repeat_y) layer.sprite.y = -((this.camera_y / layer.speed) % layer.sprite.rect().height);
      else layer.sprite.y = -(this.camera_y / layer.speed);

      layer.sprite.x = initx;

	  if(layer.sprite.rect().x > 0) layer.sprite.x = 0;

      while(layer.sprite.y < this.height){
        while (layer.sprite.rect().x < this.width) {

          if (layer.sprite.rect().x + layer.sprite.rect().width >= 0 && layer.sprite.rect().y + layer.sprite.rect().height >= 0) layer.sprite.draw();

          layer.sprite.x = layer.sprite.rect().x + layer.sprite.rect().width;

          if(!this.repeat_x) break;
        }

        layer.sprite.y = layer.sprite.rect().y + layer.sprite.rect().height;
        layer.sprite.x = initx;
        if (!this.repeat_y) {
          break;
        }
      }
    }

};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/display/TiledMap.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Represents a tiled map (see https://github.com/bjorn/tiled/wiki/TMX-Map-Format for more information on Tiled format)
 * Don't forget to export your TMX map to JSON format :)
 * @class TiledMap
 * @constructor
 * @param {Object} options - {map,x,y,alpha}
 */
FF.TiledMap = function(options){
	if(!options.map) throw new Error("[FF.TiledMap] You have to provide at least the path for your tiledmap");
	if(FF.TMXMapCache[options.map] === undefined) throw new Error("[FF.TiledMap] You are using a non-loaded asset ("+options.map+")");


	/**
	 * Map content
	 * @property map
	 * @type Object
	 */
    this.map = FF.TMXMapCache[options.map];


	/**
	 * x position of your whole map
	 * @property x
	 * @type Integer
	 */
	this.x = options.x || 0;


	/**
	 * y position of your whole map
	 * @property y
	 * @type Integer
	 */
	this.y = options.y || 0;


	/**
	 * Opacity of your map
	 * @property alpha
	 * @type Float
	 */
	this.alpha = options.alpha || 1.00;

};


/**
 * Used to get the tileset id from the gid of a cell
 * @class TiledMap
 * @method getTilesetNumber
 * @param {Integer} gid - GID of the cell
 * @return {Integer} - the tileset
 */
FF.TiledMap.prototype.getTilesetNumber = function(gid){
	var tileset = 0;
	for(var t = 0; t < this.map.tilesets.length; t++){
		if(this.map.tilesets[t+1])
			if(gid >= this.map.tilesets[t].firstgid && gid < this.map.tilesets[t+1].firstgid)
				tileset = t;
		else
			tileset = t;
	}
	return tileset;
};


/**
 * Draw a tile from a gid value
 * @class TiledMap
 * @method drawImageFromGID
 * @param {Integer} x - x position on map
 * @param {Integer} y - y position on map
 * @param {Integer} gid - GID value of the tile
 */
FF.TiledMap.prototype.drawImageFromGID = function(x,y,gid,type){
	if(isNaN(gid)) return;

	//Determining the tileset
	var tileset_number = this.getTilesetNumber(gid);

	var tileset = this.map.tilesets[tileset_number];
	var tile_position = tileset.positions[gid];

	//Check on preloaded texture
	if(FF.TextureCache[tileset.image] === undefined) throw new Error("[FF.TiledMap.drawImageFromGID] You are using a non-loaded asset");

	//Drawing the image
	FF.Render.drawSubImage(
		FF.TextureCache[tileset.image], //tileset image
		tile_position.x, //clipping position on subimage (sx)
		tile_position.y, //clipping position on subimage (sy)
		tileset.tilewidth, //clipping size on subimage (swidth)
		tileset.tileheight, //clipping size on subimage (sheight)
		(type == "object") ? x : this.x + (x * tileset.tilewidth), //x position to draw clipped image
		(type == "object") ? y : this.y + (y * tileset.tileheight), //y position to draw clipper image
		tileset.tilewidth, //width of clipped image
		tileset.tileheight //height of clipped image
	);

	//DEBUG
	//FF.Render.fillText(tile_position.x+"|"+tile_position.y, "8px Arial", "#F00", this.x + (x * tileset.tilewidth), this.y + (y * tileset.tileheight) + 8);

};


FF.TiledMap.prototype.drawRect = function(object){
	FF.Render.fillRect("rgba(255,0,0,0.5)",object.rect().x,object.rect().y,object.rect().width,object.rect().height);
};


/**
 * Used to draw a tiledmap
 * @class TiledMap
 * @method draw
 */
FF.TiledMap.prototype.draw = function(){
	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	//Draw each layers
	for(var l = 0; l < this.map.layers.length; l++){
		var layer = this.map.layers[l].data;

		if(!(layer.properties && layer.properties["drawable"] && layer.properties["drawable"] == "false")){
			for(var i = 0; i < layer.length; i++){
				for(var j = 0; j < layer[i].length; j++){
					if(layer[i][j] != 0) this.drawImageFromGID(i,j,layer[i][j], "tile");
				}
			}
		}
	}

	//Draw objects
	for(var g = 0; g < this.map.obj_groups.length; g++){
		var group = this.map.obj_groups[g];

		if(!(group.properties && group.properties["drawable"] && group.properties["drawable"] == "false")){
			for(var o = 0; o < group.objects.length; o++){
				var object = group.objects[o];

				if(!isNaN(object.gid)) this.drawImageFromGID(object.x,object.y, object.gid, "object");
				//else this.drawRect(object);
			}
		}
	}

	FF.Render.restore();
};


FF.TiledMap.prototype.drawLayer = function(layer_name){
	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	for(var l = 0; l < this.map.layers.length; l++){
		var layer = this.map.layers[l].data;

		if(this.map.layers[l].name == layer_name){
			for(var i = 0; i < layer.length; i++){
				for(var j = 0; j < layer[i].length; j++){
					if(layer[i][j] != 0) this.drawImageFromGID(i,j,layer[i][j], "tile");
				}
			}
		}
	}

	FF.Render.restore();
};


FF.TiledMap.prototype.drawEveryLayerBut = function(layer_name){
	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	for(var l = 0; l < this.map.layers.length; l++){
		var layer = this.map.layers[l].data;

		if(layer.name != layer_name){
			for(var i = 0; i < layer.length; i++){
				for(var j = 0; j < layer[i].length; j++){
					if(layer[i][j] != 0) this.drawImageFromGID(i,j,layer[i][j], "tile");
				}
			}
		}
	}

	FF.Render.restore();
};


FF.TiledMap.prototype.drawObjectGroup = function(group_name){
	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	for(var g = 0; g < this.map.obj_groups.length; g++){
		var group = this.map.obj_groups[g];

		if(group.name == group_name){
			for(var o = 0; o < group.objects.length; o++){
				var object = group.objects[o];
				this.drawImageFromGID(object.x,object.y, object.gid, "object");
			}
		}
	}

	FF.Render.restore();
};


FF.TiledMap.prototype.drawEveryObjectGroups = function(){
	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	for(var g = 0; g < this.map.obj_groups.length; g++){
		var group = this.map.obj_groups[g];

		for(var o = 0; o < group.objects.length; o++){
			var object = group.objects[o];
			this.drawImageFromGID(object.x,object.y, object.gid, "object");
		}
	}

	FF.Render.restore();
};


/**
 * Get the position and size of your map in a rect
 * @class TiledMap
 * @method rect
 * @return {Object} - the rect surrounding your map
 */
FF.TiledMap.prototype.rect = function(){
	return {
		x : this.x,
		y : this.y,
		width : this.map.width * this.map.tilewidth,
		height : this.map.height * this.map.tileheight
	};
};


/**
 * Generates a rect function for a given tile of the map
 * @class TiledMap
 * @method getRectFromTile
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} gid
 * @return {Object}
 */
FF.TiledMap.prototype.getRectFromTile = function(x,y,gid){
	var that = this;
	var tileset_number = this.getTilesetNumber(gid);
	var tileset = this.map.tilesets[tileset_number];

	return {
		rect : function(){
			return {
				x :that.x + (x * tileset.tilewidth),
				y : that.y + (y * tileset.tileheight),
				width : tileset.tilewidth,
				height : tileset.tileheight
			};
		}
	};
};


/**
 * Apply a handler on each tile of the map
 * @class TiledMap
 * @method foreach
 * @param {Handler} handler - function to apply on each tile
 */
FF.TiledMap.prototype.foreach = function(handler){
	//for(var l in this.map.layers){
		l = 1;
		var layer = this.map.layers[l].data;

		for(var i in layer)
			for(var j in layer[i])
				if(layer[i][j] != 0)
					handler(this.getRectFromTile(i,j,layer[i][j]));
	//}
};


FF.TiledMap.prototype.atRect = function(rect){
    var objects = [];
    var items;

      var from_col = parseInt(rect.x / this.map.tilewidth);
      if (from_col < 0) {
        from_col = 0;
      }
      var to_col = parseInt((rect.x + rect.width) / this.map.tilewidth);
      if (to_col >= this.map.width) {
        to_col = this.map.width - 1;
      }
      var from_row = parseInt(rect.y / this.map.tileheight);
      if (from_row < 0) {
        from_row = 0;
      }
      var to_row = parseInt((rect.y + rect.height) / this.map.tileheight);
      if (to_row >= this.map.height) {
        to_row = this.map.height - 1;
      }

      for(var col = from_col; col <= to_col; col++) {
        for(var row = from_row; row <= to_row; row++) {

			for(var l = 0; l < this.map.layers.length; l++){

				if(this.map.layers[l].properties["blocant"] && this.map.layers[l].properties["blocant"] == "true"){

					var tile = this.map.layers[l].data[col][row];

					if(tile != 0 && objects.indexOf(this.getRectFromTile(col,row,tile)) == -1) {
						objects.push(this.getRectFromTile(col,row,tile));
					}
				}
			}

        }
      }

    return objects
};


FF.TiledMap.prototype.itemCollideWithSomethingInMap = function(item, options){
	if(options.obj_group){
		var objs = this.getObjectGroup(options.obj_group);
		objs = (objs && objs.objects) ? objs.objects : [];
		return FF.Util.collideOneWithMany(item,objs);
	}

	if(options.layer){
		var blocks = this.getLayer(options.layer);
		return FF.Util.collideOneWithMany(item,blocks);
	}
};

FF.TiledMap.prototype.removeObject = function(obj, group_name){
	if(group_name){
		var group = this.getObjectGroup(group_name);
		var index = group.objects.indexOf(obj);
		if(index != -1) group.objects.splice(index,1);
	}
	else{
		for(var g = 0; g < this.map.obj_groups.length; g++){
			var group = this.map.obj_groups[g];

			var index = group.objects.indexOf(obj);

			if(index != -1){
				group.objects.splice(index, 1);
				return;
			}
		}
	}
};

FF.TiledMap.prototype.getObjectGroup = function(name){
	for(var g = 0; g < this.map.obj_groups.length; g++)
		if(this.map.obj_groups[g].name == name)
			return this.map.obj_groups[g];
};

FF.TiledMap.prototype.getObjectFromPropertyValue = function(group, type, property, propertyValue){
	for(var i = 0; i < group.length; i++){
		if(group[i].type == type){
			if(group[i].properties[property] && group[i].properties[property] == propertyValue){
				return group[i];
			}
		}
	}
};

FF.TiledMap.prototype.getLayer = function(name){
	for(var g = 0; g < this.map.layers.length; g++)
		if(this.map.layers[g].name == name)
			return this.map.layers[g];
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/display/BitmapText.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


FF.BitmapText = function(options){
	if(options.text === undefined || !options.fontFamily) throw new Error("[FF.BitmapText] You have to provide at least text & fontFamily for your bitmaptext");
	if(!FF.BitmapFontCache[options.fontFamily]) throw new Error("[FF.BitmapText] You are using a non-loaded asset");


	FF.EventManager.call(this);


	this.x = options.x || 0;

	this.y = options.y || 0;

	this.alpha = options.alpha || 1;

	this.rotate = options.rotate || 0;

	this.anchor = options.anchor || [0,0];

	this.text = ""+options.text;

	this.align = options.align || "left";

	this.hidden = options.hidden || false;

    this.fontName = options.fontFamily;

	this.data = FF.BitmapFontCache[this.fontName];

    this.fontSize = options.fontSize || FF.BitmapFontCache[this.fontName].size;

	this.chars = {};

	this.lineWidths = [];

	this.maxLineWidth = 0;

	this.lineAlignOffsets = [];

	this.setup();
};


FF.BitmapText.prototype.rect = function(){
	return {
		x : this.x,
		y : this.y,
		width : this.maxLineWidth,
		height : this.lineWidths.length * this.data.lineHeight
	};
};


FF.BitmapText.prototype.setup = function(){
	//RAZ
	this.chars = {};
	this.lineWidths = [];
	this.maxLineWidth = 0;
	this.lineAlighOffsets = [];

	var pos = { x : 0, y : 0 };
	var prevCharCode = null;
	var line = 0;
    var scale = this.fontSize / this.data.size;



	this.chars[line] = [];

	//Getting chars
	for(var i = 0; i < this.text.length; i++){
        var charCode = this.text.charCodeAt(i);
        if(/(?:\r\n|\r|\n)/.test(this.text.charAt(i))){
			this.chars[line] = [];
            this.lineWidths.push(pos.x);
            this.maxLineWidth = Math.max(this.maxLineWidth, pos.x);
            line++;

            pos.x = 0;
            pos.y += data.lineHeight * scale;
            prevCharCode = null;
            continue;
        }

        var charData = this.data.chars[charCode];
        if(!charData) continue;

        if(prevCharCode && charData[prevCharCode]){
           pos.x += charData.kerning[prevCharCode] * scale;
        }

        this.chars[line].push({
			textureRect : charData.textureRect,
			charCode : charCode,
			position : { x : pos.x + charData.xOffset * scale, y : pos.y + charData.yOffset * scale }
		});

        pos.x += charData.xAdvance * scale;
        prevCharCode = charCode;
    }

	this.lineWidths.push(pos.x);
    this.maxLineWidth = Math.max(this.maxLineWidth, pos.x);

	//Getting alignment offsets
	for(i = 0; i <= line; i++){
        var alignOffset = 0;
        if(this.align == "right") alignOffset = this.maxLineWidth - this.lineWidths[i];
        else if(this.align == "center") alignOffset = (this.maxLineWidth - this.lineWidths[i]) / 2;

        this.lineAlignOffsets.push(alignOffset);
    }

};

FF.BitmapText.prototype.draw = function(){
	if(this.hidden) return;

    var scale = this.fontSize / this.data.size;

	FF.Render.save();
	FF.Render.setAlpha(this.alpha);

	//Rotate
	FF.Render.translate(this.rect().x + this.anchor[0],this.rect().y + this.anchor[1]);

	if(this.lastRotate && this.lastRotate != this.rotate) this.dispatchEvent({ type : "rotate", angle : this.rotate - this.lastRotate });
	FF.Render.rotate(this.rotate * Math.PI / 180);

	FF.Render.translate(-(this.rect().x + this.anchor[0]),-(this.rect().y + this.anchor[1]));

	this.lastRotate = this.rotate;



	for(var line in this.chars){
		for(var i = 0; i < this.chars[line].length; i++){
			var charac = this.chars[line][i];

			FF.Render.drawSubImage(
				this.data.texture,
				charac.textureRect.x,
				charac.textureRect.y,
				charac.textureRect.width,
				charac.textureRect.height,
				this.x + charac.position.x,
				this.y + charac.position.y,
				charac.textureRect.width * scale,
				charac.textureRect.height * scale
			);
		}
	}

	FF.Render.restore();
};

FF.BitmapText.prototype.setText = function(text){
	this.text = ""+text;
	this.setup();
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: Audio begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/audio/Music.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


FF.Music = function(options){
	if(!options.music) throw new Error("[FF.Music] You have to provide at least the file path for your music");
	FF.EventManager.call(this);


	this.player = FF.AudioCache[options.music] || new Audio(options.music);
	this.player.load();

	this.player.loop = options.loop || false;
	this.player.autoplay = options.autoplay || false;
	this.player.volume = options.volume / 100 || 1;
};


FF.Music.prototype.play = function(){
	this.player.play();
};


FF.Music.prototype.pause = function(){
	this.player.pause();
};


FF.Music.prototype.moveTo = function(seconds){
	if(seconds > this.player.duration) return;

	this.player.currentTime = seconds;
};


FF.Music.prototype.forward = function(seconds){
	if(this.player.currentTime + seconds > duration) return;

	this.player.currentTime+= seconds;
};


FF.Music.prototype.backward = function(seconds){
	if(this.player.currentTime - seconds < duration) return;

	this.player.currentTime-= seconds;
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/audio/Sound.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


FF.Sound = function(options){
	if(!options.sound) throw new Error("[FF.Sound] You have to provide at least the file path for your sound");
	if(FF.AudioCache[options.sound] === undefined) throw new Error("[FF.Sound] You are using a non-loaded asset");
	FF.EventManager.call(this);


	this.player = FF.AudioCache[options.sound];

	this.player.loop = options.loop || false;
	this.player.autoplay = options.autoplay || false;
	this.player.volume = options.volume / 100 || 1;
};


FF.Sound.prototype.play = function(){
	var sound = this.player.cloneNode();
	sound.ontimeupdate = function(){
		if(this.currentTime >= this.duration) delete sound;
	};
	sound.play();
};


FF.Sound.prototype.pause = function(){
	this.player.pause();
};


FF.Sound.prototype.moveTo = function(seconds){
	if(seconds > this.player.duration) return;

	this.player.currentTime = seconds;
};


FF.Sound.prototype.forward = function(seconds){
	if(this.player.currentTime + seconds > duration) return;

	this.player.currentTime+= seconds;
};


FF.Sound.prototype.backward = function(seconds){
	if(this.player.currentTime - seconds < duration) return;

	this.player.currentTime-= seconds;
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: Util begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/Animation.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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

	if(this.animateLeft) this.node.x-= this.animateLeft * percent;
	if(this.animateRight) this.node.x+= this.animateRight * percent;
	if(this.animateTop) this.node.y-= this.animateTop * percent;
	if(this.animateBottom) this.node.y+= this.animateBottom * percent;

	if(this.animateWidth){
		var diff = this.node.width - this.animateWidth;
		this.node.width+= diff * percent;
	}
	if(this.animateHeight){
		var diff = this.node.height - this.animateHeight;
		this.node.height+= diff * percent;
	}
	if(this.animateScale){
		var diff = this.node.scale - this.animateScale;
		this.node.scale+= diff * percent;
	}
	if(this.animateOpacity){
		var diff = this.node.alpha - this.animateOpacity;
		this.node.alpha+= diff * percent;
	}
};

FF.Animation.prototype.start = function(){
	this.timer.restart();
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/EventManager.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Allows you to add event listeners to your object by calling FF.EventManager.call(your_object);
 * @class EventManager
 * @abstract
 * @example
 * When you use your_object.dispatchEvent(), don't forget to give event type like :
 * your_object.dispatchEvent({ type : "progress", data : {} });
 */
FF.EventManager = function(){

	/**
	 * Array of listeners for your object
	 * @property listeners
	 * @type Array
	 */
	var listeners = [];


	/**
	 * Like every event manager ever...
	 * @method addEventListener
	 * @param {String} type - Event type
	 * @param {Object} listener - Handler for your event listener
	 */
	this.addEventListener = function(type,listener){
		if(listeners[type] === undefined)
			listeners[type] = [];

		if(listeners[type].indexOf(listener) === -1)
			listeners[type].push(listener);
	};


	/**
	 * Same shit here bro
	 * @method dispatchEvent
	 * @param {Object} event - Event content
	 */
	this.dispatchEvent = function(event){
		for(var listener in listeners[event.type])
			listeners[event.type][listener](event);
	};


	/**
	 * Again and again... How dare you ask ?
	 * @method removeEventListener
	 * @param {String} type - Event type
	 * @param {Object} listener - Event handler
	 */
	this.removeEventListener = function(type,listener){
		var index = listeners[type].indexOf(listener);

		if (index !== -1)
			listeners[type].splice(index,1);
	};

};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/Game.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Overall game manager
 *
 * @class Game
 * @constructor
 * @param {Object} gamestate - Your first game state (an intro gamestate for example)
 * @param {Object} options - {backgroundColor : don't need to be a super hero to understand this one, view : If you don't want Fresh Flesh to create a default screen-sized renderer, give it your own (optional)}
 *
 * @example
 * var intro = {
 * 		isStarted : false,
 * 		setup : function(){ console.log("Setup"); },
 * 		update : function(){ console.log("Update"); },
 * 		draw : function(){ console.log("Draw"); }
 * };
 *
 * var game = new FF.Game(intro);
 * game.start();
 */
FF.Game = function(gamestate, options){
	var that = this;


	/**
	 * In case of calling to switchGameState(), we save the previous gamestate if we want to re-use it later (like showing a game pause menu, and go back to the main gamestate
	 * @property previousGameState
	 * @type Object
	 */
	this.previousGameState = null;


	/**
	 * The running game state of your game
	 * @property currentGameState
	 * @type Object
	 */
	this.currentGameState = gamestate;


	/**
	 * Hex background color of the game
	 * @property backgroundColor
	 * @type String
	 */
	this.backgroundColor = options.backgroundColor || "#FFF";


	/**
	 * Last time requestAnimationFrame was called
	 * @property lastCalledTime
	 * @type Date
	 */
	this.lastCalledTime = null;


	/**
	 * Current FPS count
	 * @property fps
	 * @type Integer
	 */
	this.fps = 0;


	/**
	 * Used to start the gamestate given to the FF.Game class constructor
	 * @method start
	 */
	this.launch = function(){
		if(this.currentGameState.isStarted == true) throw new Error("[FF.Game.Start] Your GameState is already started");
		if(this.currentGameState.setup === undefined) throw new Error("[FF.Game.Start] Your GameState have to contain a setup() function");

		if(FF.Render.canvas === undefined){
			FF.Render = FF.Util.createRender(options.view);
		}

		if(FF.InputManager.isSetup == false){
			FF.InputManager.setup();
		}

		this.currentGameState.setup();
		if(this.currentGameState.isStarted === undefined || this.currentGameState.isStarted == false) this.currentGameState.isStarted = true;

		requestAnimation();
	};


	/**
	 * Called by requestAnimationFrame to run your gameloops
	 * @method requestAnimation
	 * @private
	 */
	function requestAnimation(){
		if(that.currentGameState.update === undefined) throw new Error("[FF.Game.requestAnimationFrame] Your GameState have to contain an update() function (even if you let it empty)");
		if(that.currentGameState.draw === undefined) throw new Error("[FF.Game.requestAnimationFrame] Your GameState have to contain an draw() function (even if you let it empty)");

		if(that.currentGameState.isStarted){
			that.currentGameState.update();

			//Clearing
			FF.Render.clearRect(0,0,FF.Render.getWidth(),FF.Render.getHeight());

			//Setting the background color
			FF.Render.setBackgroundColor(that.backgroundColor);

			that.currentGameState.draw();
		}

		if(that.lastCalledTime == null) {
			that.lastCalledTime = new Date().getTime();
			that.fps = 0;
			requestAnimationFrame(requestAnimation);
			return;
		}
		var delta = (new Date().getTime() - that.lastCalledTime)/1000;
		that.lastCalledTime = new Date().getTime();
		that.fps = (1/delta).toFixed(1);

		requestAnimationFrame(requestAnimation);
	};
};


/**
 * Allows you to switch between different gamestates, already started or not
 * @method switchGameState
 * @param {Object} gamestate - The new or previous (use your_game.previousGameState) gamestate to use in the main game loop
 * @param {Boolean} reset - Wether system have to reset the given gamestate (usefull when user press "Retry" in a pause menu, for example
 */
FF.Game.prototype.switchGameState = function(gamestate, reset){
	if(gamestate === undefined) throw new Error("[FF.Game.switchGameState] Your gamestate is undefined (not instanciated, like gs = new Blablabla();)");

	this.previousGameState = this.currentGameState;
	this.currentGameState = (reset) ? new gamestate.constructor : gamestate;

	//if(this.currentGameState.isStarted === undefined) throw new Error("[FF.Game.switchGameState] Your GameState have to contain an isStarted public property");
	if(this.currentGameState.setup === undefined) throw new Error("[FF.Game.switchGameState] Your GameState have to contain a setup() function");

	if(this.currentGameState.isStarted == false){
		FF.InputManager.resetPressedKeys();
		this.currentGameState.setup();
		this.currentGameState.isStarted = true;
	}
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/GameState.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Used by your game to draw & move elements
 * @class GameState
 * @constructor
 * @param {Object} options - { setup, update, draw }
 */
FF.GameState = function(options){


	/**
	 * Every Drawable component (e.g. having .setup(), .update() & .draw() functions) can be added to current gamestate to avoid calling them one-by-one in setup, update, & draw functions of your gamestate.
	 * @property
	 * @type Array
	 */
	this.children = [];


	/**
	 * Determine wether your GameState have been started yet
	 * @property isStarted
	 * @type Boolean
	 */
	this.isStarted = false;


	/**
	 * Required Drawable function - put everything you have to set up in
	 * @method setup
	 */
	this.setup = function(){
		//Setup every child
		for(var i in this.children) this.children[i].setup();

		//Call optional setup
		if(options.setup) options.setup();
	};


	/**
	 * Required Drawable function - put in every updating call you have
	 * @method update
	 */
	this.update = function(){
		//Update every child
		for(var i in this.children) this.children[i].update();

		//Call optional update
		if(options.update) options.update();
	};


	/**
	 * Required Drawable function - put in every draw call
	 * @method draw
	 */
	this.draw = function(){
		//Draw every child
		for(var i in this.children) this.children[i].draw();

		//Call optional draw
		if(options.draw) options.draw();
	};


	/**
	 * Adds drawable children to the scene
	 * @method add
	 * @param {Object|Drawable} child
	 */
	this.add = function(child){
		if(!child.setup || !child.update || !child.draw) throw new Error("[FF.GameState.add] Your item have to contain .setup(), .update() & .draw() functions");

		this.children.push(child);
	};

};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/InputManager.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Used to handle mouse and keyboard events, in an easier way than usual (special thx to ippa : https://github.com/ippa)
 * @class InputManager
 * @abstract
 * @example
 * TODO
 */
FF.InputManager = {};


/**
 * Avoid setting up manager twice
 * @class InputManager
 * @property isSetup
 * @type Boolean
 */
FF.InputManager.isSetup = false;

FF.InputManager.mouse_x = 0;

FF.InputManager.mouse_y = 0;


/**
 * Here are stored your pressed keys/mouse buttons
 * @class InputManager
 * @property pressed_keys
 * @type Array<String>
 */
FF.InputManager.pressed_keys = [];


/**
 * Here are stored your previous pressed items
 * @class InputManager
 * @property previously_pressed_keys
 * @type Array<String>
 */
FF.InputManager.previously_pressed_keys = [];


/**
 * Here are stored the human names of computer key codes
 * @class InputManager
 * @property keycode_to_string
 * @type Array<String>
 */
FF.InputManager.keycode_to_string = [];


/**
 * The manager stores all your keydown callbacks in this array
 * @class InputManager
 * @property on_keydown_callbacks
 * @type Array<Handlers>
 */
FF.InputManager.on_keydown_callbacks = [];


/**
 * The manager stores all your keyup callbacks in this array
 * @class InputManager
 * @property on_keyup_callbacks
 * @type Array<Handlers>
 */
FF.InputManager.on_keyup_callbacks = [];


/**
 * Collection of human names from mousecode buttons
 * @class InputManager
 * @property mousebuttoncode_to_string
 * @type Array<String>
 */
FF.InputManager.mousebuttoncode_to_string = [];


/**
 * Collection of human names from mousecode buttons (only for ie)
 * @class InputManager
 * @property ie_mousebuttoncode_to_string
 * @type Array<String>
 */
FF.InputManager.ie_mousebuttoncode_to_string = [];


/**
 * Stack of keys for which we have to prevent default actions
 * @class InputManager
 * @property prevent_default_keys
 * @type Array<Boolean>
 */
FF.InputManager.prevent_default_keys = [];


/**
 * Sets up the manager
 * @class InputManager
 * @method setup
 */
FF.InputManager.setup = function() {
	var k = [];

	k[8] = "backspace";
	k[9] = "tab";
	k[13] = "enter";
	k[16] = "shift";
	k[17] = "ctrl";
	k[18] = "alt";
	k[19] = "pause";
	k[20] = "capslock";
	k[27] = "esc";
	k[32] = "space";
	k[33] = "pageup";
	k[34] = "pagedown";
	k[35] = "end";
	k[36] = "home";
	k[37] = "left";
	k[38] = "up";
	k[39] = "right";
	k[40] = "down";
	k[45] = "insert";
	k[46] = "delete";

	k[91] = "left_window_key leftwindowkey";
	k[92] = "right_window_key rightwindowkey";
	k[93] = "select_key selectkey";
	k[106] = "multiply *";
	k[107] = "add plus +";
	k[109] = "subtract minus -";
	k[110] = "decimalpoint";
	k[111] = "divide /";

	k[144] = "numlock";
	k[145] = "scrollock";
	k[186] = "semicolon ;";
	k[187] = "equalsign =";
	k[188] = "comma ,";
	k[189] = "dash -";
	k[190] = "period .";
	k[191] = "forwardslash /";
	k[192] = "graveaccent `";
	k[219] = "openbracket [";
	k[220] = "backslash \\";
	k[221] = "closebracket ]";
	k[222] = "singlequote '";

	var m = [];

	m[0] = "left_mouse_button";
	m[1] = "center_mouse_button";
	m[2] = "right_mouse_button";

	var ie_m = [];
	ie_m[1] = "left_mouse_button";
	ie_m[2] = "right_mouse_button";
	ie_m[4] = "center_mouse_button";

	FF.InputManager.mousebuttoncode_to_string = m;
	FF.InputManager.ie_mousebuttoncode_to_string = ie_m;


	var numpadkeys = ["numpad0","numpad1","numpad2","numpad3","numpad4","numpad5","numpad6","numpad7","numpad8","numpad9"];
	var fkeys = ["f1","f2","f3","f4","f5","f6","f7","f8","f9"];
	var numbers = ["0","1","2","3","4","5","6","7","8","9"];
	var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	for(var i = 0; numbers[i]; i++)     { k[48+i] = numbers[i]; }
	for(var i = 0; letters[i]; i++)     { k[65+i] = letters[i]; }
	for(var i = 0; numpadkeys[i]; i++)  { k[96+i] = numpadkeys[i]; }
	for(var i = 0; fkeys[i]; i++)       { k[112+i] = fkeys[i]; }

	FF.InputManager.keycode_to_string = k;

	window.addEventListener("keydown", FF.InputManager.handleKeyDown);
	window.addEventListener("keyup", FF.InputManager.handleKeyUp);
	window.addEventListener("mousedown", FF.InputManager.handleMouseDown, false);
	window.addEventListener("mouseup", FF.InputManager.handleMouseUp, false);
	window.addEventListener("mousemove", FF.InputManager.handleMouseMove, false);
	window.addEventListener("touchstart", FF.InputManager.handleTouchStart, false);
	window.addEventListener("touchend", FF.InputManager.handleTouchEnd, false);
	window.addEventListener("blur", FF.InputManager.resetPressedKeys, false);


	// this turns off the right click context menu which screws up the mouseup event for button 2
	document.oncontextmenu = function(){ return false };

	FF.InputManager.isSetup = true;
};


/**
 * Used to reset current pressed keys
 * @class InputManager
 * @method resetPressedKeys
 * @param {Object} e
 */
FF.InputManager.resetPressedKeys = function(e){
	FF.InputManager.pressed_keys = {};
};


/**
 * Handles keyup events
 * @class InputManager
 * @method handleKeyUp
 * @param {Object} e
 */
FF.InputManager.handleKeyUp = function(e){
	e = e || window.event;

  	var human_names = FF.InputManager.keycode_to_string[e.keyCode].split(" ");

  	for(i in human_names){
		var human_name = human_names[i];
		FF.InputManager.pressed_keys[human_name] = false;

    	if(FF.InputManager.on_keyup_callbacks[human_name]){
      		FF.InputManager.on_keyup_callbacks[human_name](human_name);
      		e.preventDefault();
    	}

		if(FF.InputManager.prevent_default_keys[human_name]) { e.preventDefault(); }
  	}
};


/**
 * Handles keydown events
 * @class InputManager
 * @method handleKeyDown
 * @param {Object} e
 */
FF.InputManager.handleKeyDown = function(e){
  	e = e || window.event;

  	var human_names = FF.InputManager.keycode_to_string[e.keyCode].split(" ");

	for(i in human_names){
		var human_name = human_names[i];
    	FF.InputManager.pressed_keys[human_name] = true;
    	if(FF.InputManager.on_keydown_callbacks[human_name]){
      		FF.InputManager.on_keydown_callbacks[human_name](human_name);
      		e.preventDefault();
    	}

    	if(FF.InputManager.prevent_default_keys[human_name]){ e.preventDefault(); }
  	}
};


/**
 * Handles mousedown events
 * @class InputManager
 * @method handleMouseDown
 * @param {Object} e
 */
FF.InputManager.handleMouseDown = function(e){
	e = e || window.event;

  	var human_name = FF.InputManager.mousebuttoncode_to_string[e.button];

  	if (navigator.appName == "Microsoft Internet Explorer"){
		human_name = FF.InputManager.ie_mousebuttoncode_to_string[e.button];
	}

  	FF.InputManager.pressed_keys[human_name] = true;
  	if(FF.InputManager.on_keydown_callbacks[human_name]){
    	FF.InputManager.on_keydown_callbacks[human_name](human_name);
    	e.preventDefault();
  	}
};


/**
 * Handles mouseup events
 * @class InputManager
 * @method handleMouseUp
 * @param {Object} e
 */
FF.InputManager.handleMouseUp = function(e){
 	e = e || window.event;

  	var human_name = FF.InputManager.mousebuttoncode_to_string[e.button]  ;

  	if(navigator.appName == "Microsoft Internet Explorer"){
	  	human_name = FF.InputManager.ie_mousebuttoncode_to_string[e.button];
  	}

  	FF.InputManager.pressed_keys[human_name] = false;
  	if(FF.InputManager.on_keyup_callbacks[human_name]){
    	FF.InputManager.on_keyup_callbacks[human_name](human_name);
    	e.preventDefault();
  	}
};


FF.InputManager.handleMouseMove = function(e){
	e = e || window.event;

	if (e.pageX || e.pageY) {
        FF.InputManager.mouse_x = e.pageX;
        FF.InputManager.mouse_y = e.pageY;
    }
    else {
        FF.InputManager.mouse_x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
        FF.InputManager.mouse_y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
    }
};


/**
 * Handles touchstart events
 * @class InputManager
 * @method handleTouchStart
 * @param {Object} e
 */
FF.InputManager.handleTouchStart = function(e){
	e = e || window.event;
	FF.InputManager.pressed_keys["left_mouse_button"] = true;
	FF.InputManager.mouse_x = e.touches[0].pageX - FF.Render.View.offsetLeft;
	FF.InputManager.mouse_y = e.touches[0].pageY - FF.Render.View.offsetTop;
};


/**
 * Handles touchend events
 * @class InputManager
 * @method handleTouchEnd
 * @param {Object} e
 */
FF.InputManager.handleTouchEnd = function(e){
  	e = e || window.event;
  	FF.InputManager.pressed_keys["left_mouse_button"] = false;
	FF.InputManager.mouse_x = undefined;
	FF.InputManager.mouse_y = undefined;
};


/**
 * Prevents default action for given keys
 * @class InputManager
 * @method preventDefaultKeys
 * @param {Array<String> | String} list
 */
FF.InputManager.preventDefaultKeys = function(list){
  	if(!FF.Util.isString(list)) list = list.split(" ");

  	for(var i in list) {
    	FF.InputManager.prevent_default_keys[list[i]] = true;
  	}
};


/**
 * Used to check if a key is pressed
 * @class InputManager
 * @method pressed
 * @param {Array<String> | String} keys - keys to check
 * @param {Boolean} logical_and - true if you want to check for every key at the same time, false otherwise
 * @return {Boolean} - true if one of the keys is found, false otherwise
 */
FF.InputManager.pressed = function(keys,logical_and) {
 	if(FF.Util.isString(keys)){ keys = keys.split(" "); }

  	if(logical_and) { return keys.every(function(key){ return FF.InputManager.pressed_keys[key]; }); }
  	else            { return keys.some(function(key){ return FF.InputManager.pressed_keys[key]; }); }
};


/**
 * Same than FF.InputManager.pressed() but for a non repeat call to a key
 * @class InputManager
 * @method pressedWithoudRepeat
 * @param {Array<String> | String} keys - see FF.InputManager.pressed()
 * @param {Boolean} logical_and - see FF.InputManager.pressed()
 * @return {Boolean} - true if key has not yet been recorded, false otherwise
 */
FF.InputManager.pressedWithoutRepeat = function(keys,logical_and){
  	if(FF.InputManager.pressed(keys,logical_and)){
    	if(!FF.InputManager.previously_pressed_keys[keys]) {
      		FF.InputManager.previously_pressed_keys[keys] = true;
      		return true;
    	}
  	}
  	else{
    	FF.InputManager.previously_pressed_keys[keys] = false;
    	return false;
  	}
};


/**
 * Stores an onkeydown event on a specific key (like esc to show a pause menu)
 * @class InputManager
 * @method on_keydown
 * @param {Array<String> | String} key - event subject(s)
 * @param {Handler} callback - event callback
 */
FF.InputManager.on_keydown = function(key,callback){
  	if(FF.Util.isArray(key))
    	for(var i=0; key[i]; i++)
      		FF.InputManager.on_keydown_callbacks[key[i]] = callback;
  	else
    	FF.InputManager.on_keydown_callbacks[key] = callback;
};


/**
 * Stores an onkeyup event on a specific key
 * @class InputManager
 * @method on_keyup
 * @param {Array<String> | String} key - event subject(s)
 * @param {Handler} callback - event callback
 */
FF.InputManager.on_keyup = function(key,callback){
  	if(FF.Util.isArray(key))
    	for(var i=0; key[i]; i++)
      		FF.InputManager.on_keyup_callbacks[key[i]] = callback;
  	else
    	FF.InputManager.on_keyup_callbacks[key] = callback;
};


/**
 * Used to clear callbacks on keys
 * @class InputManager
 * @method clearKeyCallbacks
 */
FF.InputManager.clearKeyCallbacks = function(){
  FF.InputManager.on_keyup_callbacks = [];
  FF.InputManager.on_keydown_callbacks = [];
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/Shooter.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * TODO
 */
FF.Shooter = function(){};

FF.Shooter.affine = function(_player, _mouse){
	return {
		//Get A -> y2 - y1 / x2 - x1
		A : (_mouse.y - _player.y) / (_mouse.x - _player.x),

		//Get B -> (x2y1 - x1y2)/(x2 - x1)
		B : (_mouse.x * _player.y - _player.x * _mouse.y) / (_mouse.x - _player.x),

		origin : _player,
		dest : _mouse
	};
};

FF.Shooter.shootAt = function(_player, _mouse){
	var _x = _mouse.x - _player.x;
	var _y = _mouse.y - _player.y;

	var vSpeed = { x : _x * 3, y : _y * 3 };

	if(FF.Shooter.distanceBetween(_player,_mouse) < 10) {
		vSpeed.x *= 30;
		vSpeed.y *= 30;
	}

	return { speed : vSpeed, origin : _player, dest : _mouse };
};

FF.Shooter.realMoveSpeed = function(_originalSpeed){
	return (GAME.fps == "Infinity" || _originalSpeed * (60 / GAME.fps) / 1.2 == "Infinity") ? _originalSpeed : _originalSpeed * (60 / GAME.fps) / 1.2;
};

FF.Shooter.mouseInViewport = function(_viewport){
	return { x : FF.InputManager.mouse_x + _viewport.rect().x, y : FF.InputManager.mouse_y + _viewport.rect().y };
};

FF.Shooter.turnAroundMouse = function(_player, _mouse){
	return FF.Shooter.toDegrees(Math.atan2(_mouse.x - _player.x, _player.y - _mouse.y));
};

FF.Shooter.toDegrees = function(_rad){
	return (_rad > 0 ? _rad : (2 * Math.PI + _rad)) * 360 / (2 * Math.PI)
};

FF.Shooter.distanceBetween = function(_object1, _object2) {
	return Math.sqrt(Math.pow(_object1.x - _object2.x, 2) + Math.pow(_object1.y - _object2.y, 2));
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/Timer.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * TODO
 */
FF.Timer = function(options){
	FF.EventManager.call(this);

	this.time = 0;

	this.timeout = options.timeout || 10000;

	this.interval = options.interval || 1000;

	this.lastTick = new Date();

	this.autostart = options.autostart || false;

	this.active = options.autostart || false;

	if(this.autostart) this.dispatchEvent({ type : "start" });
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
		this.dispatchEvent({ type : "tick", remaining : that.timeout - that.time });
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
	this.time = 0;
	this.lastTick = new Date();
	this.dispatchEvent({ type : "start" });
	this.active = true;
};

FF.Timer.prototype.getRemainingTime = function(){
	return this.timeout - this.time;
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/Util.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 *
 * requestAnimationFrame polyfill by Erik Möller
 * fixes from Paul Irish and Tino Zijdel
 */
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
							   || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
	window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function() { callback(currTime + timeToCall); },
		  timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

if (!window.cancelAnimationFrame)
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};



/**
 *  WebGL-2D.js - HTML5 Canvas2D API in a WebGL context
 *
 *  Created by Corban Brook <corbanbrook@gmail.com> on 2011-03-02.
 *  Amended to by Bobby Richter <secretrobotron@gmail.com> on 2011-03-03
 *  CubicVR.js by Charles Cliffe <cj@cubicproductions.com> on 2011-03-03
 *
 */

/*
 *  Copyright (c) 2011 Corban Brook
 *
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 *
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * Usage:
 *
 *    var cvs = document.getElementById("myCanvas");
 *
 *    WebGL2D.enable(cvs); // adds "webgl-2d" to cvs
 *
 *    cvs.getContext("webgl-2d");
 *
 */

(function(Math, undefined) {

  // Vector & Matrix libraries from CubicVR.js
  var M_PI = 3.1415926535897932384626433832795028841968;
  var M_TWO_PI = 2.0 * M_PI;
  var M_HALF_PI = M_PI / 2.0;

  function isPOT(value) {
    return value > 0 && ((value - 1) & value) === 0;
  }

  var vec3 = {
    length: function(pt) {
      return Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
    },

    normalize: function(pt) {
      var d = Math.sqrt((pt[0] * pt[0]) + (pt[1] * pt[1]) + (pt[2] * pt[2]));
      if (d === 0) {
        return [0, 0, 0];
      }
      return [pt[0] / d, pt[1] / d, pt[2] / d];
    },

    dot: function(v1, v2) {
      return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    },

    angle: function(v1, v2) {
      return Math.acos((v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) / (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]) * Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2])));
    },

    cross: function(vectA, vectB) {
      return [vectA[1] * vectB[2] - vectB[1] * vectA[2], vectA[2] * vectB[0] - vectB[2] * vectA[0], vectA[0] * vectB[1] - vectB[0] * vectA[1]];
    },

    multiply: function(vectA, constB) {
      return [vectA[0] * constB, vectA[1] * constB, vectA[2] * constB];
    },

    add: function(vectA, vectB) {
      return [vectA[0] + vectB[0], vectA[1] + vectB[1], vectA[2] + vectB[2]];
    },

    subtract: function(vectA, vectB) {
      return [vectA[0] - vectB[0], vectA[1] - vectB[1], vectA[2] - vectB[2]];
    },

    equal: function(a, b) {
      var epsilon = 0.0000001;
      if ((a === undefined) && (b === undefined)) {
        return true;
      }
      if ((a === undefined) || (b === undefined)) {
        return false;
      }
      return (Math.abs(a[0] - b[0]) < epsilon && Math.abs(a[1] - b[1]) < epsilon && Math.abs(a[2] - b[2]) < epsilon);
    }
  };

  var mat3 = {
    identity: [1.0, 0.0, 0.0,
               0.0, 1.0, 0.0,
               0.0, 0.0, 1.0],

    multiply: function (m1, m2) {
      var m10 = m1[0], m11 = m1[1], m12 = m1[2], m13 = m1[3], m14 = m1[4], m15 = m1[5], m16 = m1[6], m17 = m1[7], m18 = m1[8],
          m20 = m2[0], m21 = m2[1], m22 = m2[2], m23 = m2[3], m24 = m2[4], m25 = m2[5], m26 = m2[6], m27 = m2[7], m28 = m2[8];

      m2[0] = m20 * m10 + m23 * m11 + m26 * m12;
      m2[1] = m21 * m10 + m24 * m11 + m27 * m12;
      m2[2] = m22 * m10 + m25 * m11 + m28 * m12;
      m2[3] = m20 * m13 + m23 * m14 + m26 * m15;
      m2[4] = m21 * m13 + m24 * m14 + m27 * m15;
      m2[5] = m22 * m13 + m25 * m14 + m28 * m15;
      m2[6] = m20 * m16 + m23 * m17 + m26 * m18;
      m2[7] = m21 * m16 + m24 * m17 + m27 * m18;
      m2[8] = m22 * m16 + m25 * m17 + m28 * m18;
    },

    vec2_multiply: function (m1, m2) {
      var mOut = [];
      mOut[0] = m2[0] * m1[0] + m2[3] * m1[1] + m2[6];
      mOut[1] = m2[1] * m1[0] + m2[4] * m1[1] + m2[7];
      return mOut;
    },

    transpose: function (m) {
      return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
    }
  }; //mat3

  // Transform library from CubicVR.js
  function Transform(mat) {
    return this.clearStack(mat);
  }

  var STACK_DEPTH_LIMIT = 16;

  Transform.prototype.clearStack = function(init_mat) {
    this.m_stack = [];
    this.m_cache = [];
    this.c_stack = 0;
    this.valid = 0;
    this.result = null;

    for (var i = 0; i < STACK_DEPTH_LIMIT; i++) {
      this.m_stack[i] = this.getIdentity();
    }

    if (init_mat !== undefined) {
      this.m_stack[0] = init_mat;
    } else {
      this.setIdentity();
    }
  }; //clearStack

  Transform.prototype.setIdentity = function() {
    this.m_stack[this.c_stack] = this.getIdentity();
    if (this.valid === this.c_stack && this.c_stack) {
      this.valid--;
    }
  };

  Transform.prototype.getIdentity = function() {
    return [1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0];
  };

  Transform.prototype.getResult = function() {
    if (!this.c_stack) {
      return this.m_stack[0];
    }

    var m = mat3.identity;

    if (this.valid > this.c_stack-1) { this.valid = this.c_stack-1; }

    for (var i = this.valid; i < this.c_stack+1; i++) {
      m = mat3.multiply(this.m_stack[i],m);
      this.m_cache[i] = m;
    }

    this.valid = this.c_stack-1;

    this.result = this.m_cache[this.c_stack];

    return this.result;
  };

  Transform.prototype.pushMatrix = function() {
    this.c_stack++;
    this.m_stack[this.c_stack] = this.getIdentity();
  };

  Transform.prototype.popMatrix = function() {
    if (this.c_stack === 0) { return; }
    this.c_stack--;
  };

  var translateMatrix = Transform.prototype.getIdentity();

  Transform.prototype.translate = function(x, y) {
    translateMatrix[6] = x;
    translateMatrix[7] = y;

    mat3.multiply(translateMatrix, this.m_stack[this.c_stack]);

    /*
    if (this.valid === this.c_stack && this.c_stack) {
      this.valid--;
    }
    */
  };

  var scaleMatrix = Transform.prototype.getIdentity();

  Transform.prototype.scale = function(x, y) {
    scaleMatrix[0] = x;
    scaleMatrix[4] = y;

    mat3.multiply(scaleMatrix, this.m_stack[this.c_stack]);

    /*
    if (this.valid === this.c_stack && this.c_stack) {
      this.valid--;
    }
    */
  };

  var rotateMatrix = Transform.prototype.getIdentity();

  Transform.prototype.rotate = function(ang) {
    var sAng, cAng;

    sAng = Math.sin(-ang);
    cAng = Math.cos(-ang);

    rotateMatrix[0] = cAng;
    rotateMatrix[3] = sAng;
    rotateMatrix[1] = -sAng;
    rotateMatrix[4] = cAng;

    mat3.multiply(rotateMatrix, this.m_stack[this.c_stack]);

    /*
    if (this.valid === this.c_stack && this.c_stack) {
      this.valid--;
    }
    */
  };

  var WebGL2D = this.WebGL2D = function WebGL2D(canvas, options) {
    this.canvas         = canvas;
    this.options        = options || {};
    this.gl             = undefined;
    this.fs             = undefined;
    this.vs             = undefined;
    this.shaderProgram  = undefined;
    this.transform      = new Transform();
    this.shaderPool     = [];
    this.maxTextureSize = undefined;

    // Save a reference to the WebGL2D instance on the canvas object
    canvas.gl2d         = this;

    // Store getContext function for later use
    canvas.$getContext  = canvas.getContext;

    // Override getContext function with "webgl-2d" enabled version
    canvas.getContext = (function(gl2d) {
      return function(context) {
        if ((gl2d.options.force || context === "webgl-2d") && !(canvas.width === 0 || canvas.height === 0)) {
          if (gl2d.gl) { return gl2d.gl; }

          var gl = gl2d.gl = gl2d.canvas.$getContext("experimental-webgl");

          gl2d.initShaders();
          gl2d.initBuffers();

          // Append Canvas2D API features to the WebGL context
          gl2d.initCanvas2DAPI();

          gl.viewport(0, 0, gl2d.canvas.width, gl2d.canvas.height);

          // Default white background
          gl.clearColor(1, 1, 1, 1);
          gl.clear(gl.COLOR_BUFFER_BIT); // | gl.DEPTH_BUFFER_BIT);

          // Disables writing to dest-alpha
          gl.colorMask(1,1,1,0);

          // Depth options
          //gl.enable(gl.DEPTH_TEST);
          //gl.depthFunc(gl.LEQUAL);

          // Blending options
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

          gl2d.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

          return gl;
        } else {
          return gl2d.canvas.$getContext(context);
        }
      };
    }(this));

    this.postInit();
  };

  // Enables WebGL2D on your canvas
  WebGL2D.enable = function(canvas, options) {
    return canvas.gl2d || new WebGL2D(canvas, options);
  };


  // Shader Pool BitMasks, i.e. sMask = (shaderMask.texture+shaderMask.stroke)
  var shaderMask = {
    texture: 1,
    crop: 2,
    path: 4
  };


  // Fragment shader source
  WebGL2D.prototype.getFragmentShaderSource = function getFragmentShaderSource(sMask) {
    var fsSource = [
      "#ifdef GL_ES",
        "precision highp float;",
      "#endif",

      "#define hasTexture " + ((sMask&shaderMask.texture) ? "1" : "0"),
      "#define hasCrop " + ((sMask&shaderMask.crop) ? "1" : "0"),

      "varying vec4 vColor;",

      "#if hasTexture",
        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",
        "#if hasCrop",
          "uniform vec4 uCropSource;",
        "#endif",
      "#endif",

      "void main(void) {",
        "#if hasTexture",
          "#if hasCrop",
            "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x * uCropSource.z, vTextureCoord.y * uCropSource.w) + uCropSource.xy);",
          "#else",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
          "#endif",
        "#else",
          "gl_FragColor = vColor;",
        "#endif",
      "}"
    ].join("\n");

    return fsSource;
  };

  WebGL2D.prototype.getVertexShaderSource = function getVertexShaderSource(stackDepth,sMask) {
    var w = 2 / this.canvas.width, h = -2 / this.canvas.height;

    stackDepth = stackDepth || 1;

    var vsSource = [
      "#define hasTexture " + ((sMask&shaderMask.texture) ? "1" : "0"),
      "attribute vec4 aVertexPosition;",

      "#if hasTexture",
      "varying vec2 vTextureCoord;",
      "#endif",

      "uniform vec4 uColor;",
      "uniform mat3 uTransforms[" + stackDepth + "];",

      "varying vec4 vColor;",

      "const mat4 pMatrix = mat4(" + w + ",0,0,0, 0," + h + ",0,0, 0,0,1.0,1.0, -1.0,1.0,0,0);",

      "mat3 crunchStack(void) {",
        "mat3 result = uTransforms[0];",
        "for (int i = 1; i < " + stackDepth + "; ++i) {",
          "result = uTransforms[i] * result;",
        "}",
        "return result;",
      "}",

      "void main(void) {",
        "vec3 position = crunchStack() * vec3(aVertexPosition.x, aVertexPosition.y, 1.0);",
        "gl_Position = pMatrix * vec4(position, 1.0);",
        "vColor = uColor;",
        "#if hasTexture",
          "vTextureCoord = aVertexPosition.zw;",
        "#endif",
      "}"
    ].join("\n");
    return vsSource;
  };


  // Initialize fragment and vertex shaders
  WebGL2D.prototype.initShaders = function initShaders(transformStackDepth,sMask) {
    var gl = this.gl;

    transformStackDepth = transformStackDepth || 1;
    sMask = sMask || 0;
    var storedShader = this.shaderPool[transformStackDepth];

    if (!storedShader) { storedShader = this.shaderPool[transformStackDepth] = []; }
    storedShader = storedShader[sMask];

    if (storedShader) {
      gl.useProgram(storedShader);
      this.shaderProgram = storedShader;
      return storedShader;
    } else {
      var fs = this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(this.fs, this.getFragmentShaderSource(sMask));
      gl.compileShader(this.fs);

      if (!gl.getShaderParameter(this.fs, gl.COMPILE_STATUS)) {
        throw "fragment shader error: "+gl.getShaderInfoLog(this.fs);
      }

      var vs = this.vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(this.vs, this.getVertexShaderSource(transformStackDepth,sMask));
      gl.compileShader(this.vs);

      if (!gl.getShaderParameter(this.vs, gl.COMPILE_STATUS)) {
        throw "vertex shader error: "+gl.getShaderInfoLog(this.vs);
      }


      var shaderProgram = this.shaderProgram = gl.createProgram();
      shaderProgram.stackDepth = transformStackDepth;
      gl.attachShader(shaderProgram, fs);
      gl.attachShader(shaderProgram, vs);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw "Could not initialise shaders.";
      }

      gl.useProgram(shaderProgram);

      shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

      shaderProgram.uColor   = gl.getUniformLocation(shaderProgram, 'uColor');
      shaderProgram.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');
      shaderProgram.uCropSource = gl.getUniformLocation(shaderProgram, 'uCropSource');

      shaderProgram.uTransforms = [];
      for (var i=0; i<transformStackDepth; ++i) {
        shaderProgram.uTransforms[i] = gl.getUniformLocation(shaderProgram, 'uTransforms[' + i + ']');
      } //for
      this.shaderPool[transformStackDepth][sMask] = shaderProgram;
      return shaderProgram;
    } //if
  };

  var rectVertexPositionBuffer;
  var rectVertexColorBuffer;

  var pathVertexPositionBuffer;
  var pathVertexColorBuffer;

  // 2D Vertices and Texture UV coords
  var rectVerts = new Float32Array([
      0,0, 0,0,
      0,1, 0,1,
      1,1, 1,1,
      1,0, 1,0
  ]);

  WebGL2D.prototype.initBuffers = function initBuffers() {
    var gl = this.gl;

    rectVertexPositionBuffer  = gl.createBuffer();
    rectVertexColorBuffer     = gl.createBuffer();

    pathVertexPositionBuffer  = gl.createBuffer();
    pathVertexColorBuffer     = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rectVerts, gl.STATIC_DRAW);
  };

  // Maintains an array of all WebGL2D instances
  WebGL2D.instances = [];

  WebGL2D.prototype.postInit = function() {
    WebGL2D.instances.push(this);
  };

  // Extends gl context with Canvas2D API
  WebGL2D.prototype.initCanvas2DAPI = function initCanvas2DAPI() {
    var gl2d = this,
        gl   = this.gl;


    // Rendering Canvas for text fonts
    var textCanvas    = document.createElement("canvas");
    textCanvas.width  = gl2d.canvas.width;
    textCanvas.height = gl2d.canvas.height;
    var textCtx       = textCanvas.getContext("2d");

    var reRGBAColor = /^rgb(a)?\(\s*(-?[\d]+)(%)?\s*,\s*(-?[\d]+)(%)?\s*,\s*(-?[\d]+)(%)?\s*,?\s*(-?[\d\.]+)?\s*\)$/;
    var reHSLAColor = /^hsl(a)?\(\s*(-?[\d\.]+)\s*,\s*(-?[\d\.]+)%\s*,\s*(-?[\d\.]+)%\s*,?\s*(-?[\d\.]+)?\s*\)$/;
    var reHex6Color = /^#([0-9A-Fa-f]{6})$/;
    var reHex3Color = /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/;

    function HSLAToRGBA(h, s, l, a) {
      var r, g, b, m1, m2;

      // Clamp and Normalize values
      h = (((h % 360) + 360) % 360) / 360;
      s = s > 100 ? 1 : s / 100;
      s = s <   0 ? 0 : s;
      l = l > 100 ? 1 : l / 100;
      l = l <   0 ? 0 : l;

      m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      m1 = l * 2 - m2;

      function getHue(value) {
        var hue;

        if (value * 6 < 1) {
          hue = m1 + (m2 - m1) * value * 6;
        } else if (value * 2 < 1) {
          hue = m2;
        } else if (value * 3 < 2) {
          hue = m1 + (m2 - m1) * (2/3 - value) * 6;
        } else {
          hue = m1;
        }

        return hue;
      }

      r = getHue(h + 1/3);
      g = getHue(h);
      b = getHue(h - 1/3);

      return [r, g, b, a];
    }


    // Converts rgb(a) color string to gl color vector
    function colorStringToVec4(value) {
      var result = [], match, channel, isPercent, hasAlpha, alphaChannel, sameType;

      if ((match = reRGBAColor.exec(value))) {
        hasAlpha = match[1], alphaChannel = parseFloat(match[8]);

        if ((hasAlpha && isNaN(alphaChannel)) || (!hasAlpha && !isNaN(alphaChannel))) {
          return false;
        }

        sameType = match[3];

        for (var i = 2; i < 8; i+=2) {
          channel = match[i], isPercent = match[i+1];

          if (isPercent !== sameType) {
            return false;
          }

          // Clamp and normalize values
          if (isPercent) {
            channel = channel > 100 ? 1 : channel / 100;
            channel = channel <   0 ? 0 : channel;
          } else {
            channel = channel > 255 ? 1 : channel / 255;
            channel = channel <   0 ? 0 : channel;
          }

          result.push(channel);
        }

        result.push(hasAlpha ? alphaChannel : 1.0);
      } else if ((match = reHSLAColor.exec(value))) {
        hasAlpha = match[1], alphaChannel = parseFloat(match[5]);
        result = HSLAToRGBA(match[2], match[3], match[4], parseFloat(hasAlpha && alphaChannel ? alphaChannel : 1.0));
      } else if ((match = reHex6Color.exec(value))) {
        var colorInt = parseInt(match[1], 16);
        result = [((colorInt & 0xFF0000) >> 16) / 255, ((colorInt & 0x00FF00) >> 8) / 255, (colorInt & 0x0000FF) / 255, 1.0];
      } else if ((match = reHex3Color.exec(value))) {
        var hexString = "#" + [match[1], match[1], match[2], match[2], match[3], match[3]].join("");
        result = colorStringToVec4(hexString);
      } else if (value.toLowerCase() in colorKeywords) {
        result = colorStringToVec4(colorKeywords[value.toLowerCase()]);
      } else if (value.toLowerCase() === "transparent") {
        result = [0, 0, 0, 0];
      } else {
        // Color keywords not yet implemented, ie "orange", return hot pink
        return false;
      }

      return result;
    }

    function colorVecToString(vec4) {
      return "rgba(" + (vec4[0] * 255) + ", " + (vec4[1] * 255) + ", " + (vec4[2] * 255) + ", " + parseFloat(vec4[3]) + ")";
    }

    var colorKeywords = {
      aliceblue:            "#f0f8ff",
      antiquewhite:         "#faebd7",
      aqua:                 "#00ffff",
      aquamarine:           "#7fffd4",
      azure:                "#f0ffff",
      beige:                "#f5f5dc",
      bisque:               "#ffe4c4",
      black:                "#000000",
      blanchedalmond:       "#ffebcd",
      blue:                 "#0000ff",
      blueviolet:           "#8a2be2",
      brown:                "#a52a2a",
      burlywood:            "#deb887",
      cadetblue:            "#5f9ea0",
      chartreuse:           "#7fff00",
      chocolate:            "#d2691e",
      coral:                "#ff7f50",
      cornflowerblue:       "#6495ed",
      cornsilk:             "#fff8dc",
      crimson:              "#dc143c",
      cyan:                 "#00ffff",
      darkblue:             "#00008b",
      darkcyan:             "#008b8b",
      darkgoldenrod:        "#b8860b",
      darkgray:             "#a9a9a9",
      darkgreen:            "#006400",
      darkkhaki:            "#bdb76b",
      darkmagenta:          "#8b008b",
      darkolivegreen:       "#556b2f",
      darkorange:           "#ff8c00",
      darkorchid:           "#9932cc",
      darkred:              "#8b0000",
      darksalmon:           "#e9967a",
      darkseagreen:         "#8fbc8f",
      darkslateblue:        "#483d8b",
      darkslategray:        "#2f4f4f",
      darkturquoise:        "#00ced1",
      darkviolet:           "#9400d3",
      deeppink:             "#ff1493",
      deepskyblue:          "#00bfff",
      dimgray:              "#696969",
      dodgerblue:           "#1e90ff",
      firebrick:            "#b22222",
      floralwhite:          "#fffaf0",
      forestgreen:          "#228b22",
      fuchsia:              "#ff00ff",
      gainsboro:            "#dcdcdc",
      ghostwhite:           "#f8f8ff",
      gold:                 "#ffd700",
      goldenrod:            "#daa520",
      gray:                 "#808080",
      green:                "#008000",
      greenyellow:          "#adff2f",
      grey:                 "#808080",
      honeydew:             "#f0fff0",
      hotpink:              "#ff69b4",
      indianred:            "#cd5c5c",
      indigo:               "#4b0082",
      ivory:                "#fffff0",
      khaki:                "#f0e68c",
      lavender:             "#e6e6fa",
      lavenderblush:        "#fff0f5",
      lawngreen:            "#7cfc00",
      lemonchiffon:         "#fffacd",
      lightblue:            "#add8e6",
      lightcoral:           "#f08080",
      lightcyan:            "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgrey:            "#d3d3d3",
      lightgreen:           "#90ee90",
      lightpink:            "#ffb6c1",
      lightsalmon:          "#ffa07a",
      lightseagreen:        "#20b2aa",
      lightskyblue:         "#87cefa",
      lightslategray:       "#778899",
      lightsteelblue:       "#b0c4de",
      lightyellow:          "#ffffe0",
      lime:                 "#00ff00",
      limegreen:            "#32cd32",
      linen:                "#faf0e6",
      magenta:              "#ff00ff",
      maroon:               "#800000",
      mediumaquamarine:     "#66cdaa",
      mediumblue:           "#0000cd",
      mediumorchid:         "#ba55d3",
      mediumpurple:         "#9370d8",
      mediumseagreen:       "#3cb371",
      mediumslateblue:      "#7b68ee",
      mediumspringgreen:    "#00fa9a",
      mediumturquoise:      "#48d1cc",
      mediumvioletred:      "#c71585",
      midnightblue:         "#191970",
      mintcream:            "#f5fffa",
      mistyrose:            "#ffe4e1",
      moccasin:             "#ffe4b5",
      navajowhite:          "#ffdead",
      navy:                 "#000080",
      oldlace:              "#fdf5e6",
      olive:                "#808000",
      olivedrab:            "#6b8e23",
      orange:               "#ffa500",
      orangered:            "#ff4500",
      orchid:               "#da70d6",
      palegoldenrod:        "#eee8aa",
      palegreen:            "#98fb98",
      paleturquoise:        "#afeeee",
      palevioletred:        "#d87093",
      papayawhip:           "#ffefd5",
      peachpuff:            "#ffdab9",
      peru:                 "#cd853f",
      pink:                 "#ffc0cb",
      plum:                 "#dda0dd",
      powderblue:           "#b0e0e6",
      purple:               "#800080",
      red:                  "#ff0000",
      rosybrown:            "#bc8f8f",
      royalblue:            "#4169e1",
      saddlebrown:          "#8b4513",
      salmon:               "#fa8072",
      sandybrown:           "#f4a460",
      seagreen:             "#2e8b57",
      seashell:             "#fff5ee",
      sienna:               "#a0522d",
      silver:               "#c0c0c0",
      skyblue:              "#87ceeb",
      slateblue:            "#6a5acd",
      slategray:            "#708090",
      snow:                 "#fffafa",
      springgreen:          "#00ff7f",
      steelblue:            "#4682b4",
      tan:                  "#d2b48c",
      teal:                 "#008080",
      thistle:              "#d8bfd8",
      tomato:               "#ff6347",
      turquoise:            "#40e0d0",
      violet:               "#ee82ee",
      wheat:                "#f5deb3",
      white:                "#ffffff",
      whitesmoke:           "#f5f5f5",
      yellow:               "#ffff00",
      yellowgreen:          "#9acd32"
    };

    // Maintain drawing state params during gl.save and gl.restore. see saveDrawState() and restoreDrawState()
    var drawState = {}, drawStateStack = [];

    // A fast simple shallow clone
    function cloneObject(obj) {
      var target = {};
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          target[i] = obj[i];
        }
      }
      return target;
    }

    function saveDrawState() {
      var bakedDrawState = {
        fillStyle:                [drawState.fillStyle[0],   drawState.fillStyle[1],   drawState.fillStyle[2],   drawState.fillStyle[3]],
        strokeStyle:              [drawState.strokeStyle[0], drawState.strokeStyle[1], drawState.strokeStyle[2], drawState.strokeStyle[3]],
        globalAlpha:              drawState.globalAlpha,
        globalCompositeOperation: drawState.globalCompositeOperation,
        lineCap:                  drawState.lineCap,
        lineJoin:                 drawState.lineJoin,
        lineWidth:                drawState.lineWidth,
        miterLimit:               drawState.miterLimit,
        shadowColor:              drawState.shadowColor,
        shadowBlur:               drawState.shadowBlur,
        shadowOffsetX:            drawState.shadowOffsetX,
        shadowOffsetY:            drawState.shadowOffsetY,
        textAlign:                drawState.textAlign,
        font:                     drawState.font,
        textBaseline:             drawState.textBaseline
      };

      drawStateStack.push(bakedDrawState);
    }

    function restoreDrawState() {
      if (drawStateStack.length) {
        drawState = drawStateStack.pop();
      }
    }

    // WebGL requires colors as a vector while Canvas2D sets colors as an rgba string
    // These getters and setters store the original rgba string as well as convert to a vector
    drawState.fillStyle = [0, 0, 0, 1]; // default black

    Object.defineProperty(gl, "fillStyle", {
      get: function() { return colorVecToString(drawState.fillStyle); },
      set: function(value) {
        drawState.fillStyle = colorStringToVec4(value) || drawState.fillStyle;
      }
    });

    drawState.strokeStyle = [0, 0, 0, 1]; // default black

    Object.defineProperty(gl, "strokeStyle", {
      get: function() { return colorVecToString(drawState.strokeStyle); },
      set: function(value) {
        drawState.strokeStyle = colorStringToVec4(value) || drawStyle.strokeStyle;
      }
    });

    // WebGL already has a lineWidth() function but Canvas2D requires a lineWidth property
    // Store the original lineWidth() function for later use
    gl.$lineWidth = gl.lineWidth;
    drawState.lineWidth = 1.0;

    Object.defineProperty(gl, "lineWidth", {
      get: function() { return drawState.lineWidth; },
      set: function(value) {
        gl.$lineWidth(value);
        drawState.lineWidth = value;
      }
    });

    // Currently unsupported attributes and their default values
    drawState.lineCap = "butt";

    Object.defineProperty(gl, "lineCap", {
      get: function() { return drawState.lineCap; },
      set: function(value) {
        drawState.lineCap = value;
      }
    });

    drawState.lineJoin = "miter";

    Object.defineProperty(gl, "lineJoin", {
      get: function() { return drawState.lineJoin; },
      set: function(value) {
        drawState.lineJoin = value;
      }
    });

    drawState.miterLimit = 10;

    Object.defineProperty(gl, "miterLimit", {
      get: function() { return drawState.miterLimit; },
      set: function(value) {
        drawState.miterLimit = value;
      }
    });

    drawState.shadowOffsetX = 0;

    Object.defineProperty(gl, "shadowOffsetX", {
      get: function() { return drawState.shadowOffsetX; },
      set: function(value) {
        drawState.shadowOffsetX = value;
      }
    });

    drawState.shadowOffsetY = 0;

    Object.defineProperty(gl, "shadowOffsetY", {
      get: function() { return drawState.shadowOffsetY; },
      set: function(value) {
        drawState.shadowOffsetY = value;
      }
    });

    drawState.shadowBlur = 0;

    Object.defineProperty(gl, "shadowBlur", {
      get: function() { return drawState.shadowBlur; },
      set: function(value) {
        drawState.shadowBlur = value;
      }
    });

    drawState.shadowColor = "rgba(0, 0, 0, 0.0)";

    Object.defineProperty(gl, "shadowColor", {
      get: function() { return drawState.shadowColor; },
      set: function(value) {
        drawState.shadowColor = value;
      }
    });

    drawState.font = "10px sans-serif";

    Object.defineProperty(gl, "font", {
      get: function() { return drawState.font; },
      set: function(value) {
        textCtx.font = value;
        drawState.font = value;
      }
    });

    drawState.textAlign = "start";

    Object.defineProperty(gl, "textAlign", {
      get: function() { return drawState.textAlign; },
      set: function(value) {
        drawState.textAlign = value;
      }
    });

    drawState.textBaseline = "alphabetic";

    Object.defineProperty(gl, "textBaseline", {
      get: function() { return drawState.textBaseline; },
      set: function(value) {
        drawState.textBaseline = value;
      }
    });

    // This attribute will need to control global alpha of objects drawn.
    drawState.globalAlpha = 1.0;

    Object.defineProperty(gl, "globalAlpha", {
      get: function() { return drawState.globalAlpha; },
      set: function(value) {
        drawState.globalAlpha = value;
      }
    });

    // This attribute will need to set the gl.blendFunc mode
    drawState.globalCompositeOperation = "source-over";

    Object.defineProperty(gl, "globalCompositeOperation", {
      get: function() { return drawState.globalCompositeOperation; },
      set: function(value) {
        drawState.globalCompositeOperation = value;
      }
    });

    // Need a solution for drawing text that isnt stupid slow
    gl.fillText = function fillText(text, x, y) {
      /*
      textCtx.clearRect(0, 0, gl2d.canvas.width, gl2d.canvas.height);
      textCtx.fillStyle = gl.fillStyle;
      textCtx.fillText(text, x, y);

      gl.drawImage(textCanvas, 0, 0);
      */
    };

    gl.strokeText = function strokeText() {};

    gl.measureText = function measureText() { return 1; };

    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');

    gl.save = function save() {
      gl2d.transform.pushMatrix();
      saveDrawState();
    };

    gl.restore = function restore() {
      gl2d.transform.popMatrix();
      restoreDrawState();
    };

    gl.translate = function translate(x, y) {
      gl2d.transform.translate(x, y);
    };

    gl.rotate = function rotate(a) {
      gl2d.transform.rotate(a);
    };

    gl.scale = function scale(x, y) {
      gl2d.transform.scale(x, y);
    };

    gl.createImageData = function createImageData(width, height) {
      return tempCtx.createImageData(width, height);
    };

    gl.getImageData = function getImageData(x, y, width, height) {
      var data = tempCtx.createImageData(width, height);
      var buffer = new Uint8Array(width*height*4);
      gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
      var w=width*4, h=height;
      for (var i=0, maxI=h/2; i<maxI; ++i) {
        for (var j=0, maxJ=w; j<maxJ; ++j) {
          var index1 = i * w + j;
          var index2 = (h-i-1) * w + j;
          data.data[index1] = buffer[index2];
          data.data[index2] = buffer[index1];
        } //for
      } //for

      return data;
    };

    gl.putImageData = function putImageData(imageData, x, y) {
      gl.drawImage(imageData, x, y);
    };

    gl.transform = function transform(m11, m12, m21, m22, dx, dy) {
      var m = gl2d.transform.m_stack[gl2d.transform.c_stack];

      m[0] *= m11;
      m[1] *= m21;
      m[2] *= dx;
      m[3] *= m12;
      m[4] *= m22;
      m[5] *= dy;
      m[6] = 0;
      m[7] = 0;
    };

    function sendTransformStack(sp) {
      var stack = gl2d.transform.m_stack;
      for (var i = 0, maxI = gl2d.transform.c_stack + 1; i < maxI; ++i) {
        gl.uniformMatrix3fv(sp.uTransforms[i], false, stack[maxI-1-i]);
      } //for
    }

    gl.setTransform = function setTransform(m11, m12, m21, m22, dx, dy) {
      gl2d.transform.setIdentity();
      gl.transform.apply(this, arguments);
    };

    gl.fillRect = function fillRect(x, y, width, height) {
      var transform = gl2d.transform;
      var shaderProgram = gl2d.initShaders(transform.c_stack+2,0);

      gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

      transform.pushMatrix();

      transform.translate(x, y);
      transform.scale(width, height);

      sendTransformStack(shaderProgram);

      gl.uniform4f(shaderProgram.uColor, drawState.fillStyle[0], drawState.fillStyle[1], drawState.fillStyle[2], drawState.fillStyle[3]);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      transform.popMatrix();
    };

    gl.strokeRect = function strokeRect(x, y, width, height) {
      var transform = gl2d.transform;
      var shaderProgram = gl2d.initShaders(transform.c_stack + 2,0);

      gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

      transform.pushMatrix();

      transform.translate(x, y);
      transform.scale(width, height);

      sendTransformStack(shaderProgram);

      gl.uniform4f(shaderProgram.uColor, drawState.strokeStyle[0], drawState.strokeStyle[1], drawState.strokeStyle[2], drawState.strokeStyle[3]);

      gl.drawArrays(gl.LINE_LOOP, 0, 4);

      transform.popMatrix();
    };

    gl.clearRect = function clearRect(x, y, width, height) {};

    var subPaths = [];

    function SubPath(x, y) {
      this.closed = false;
      this.verts = [x, y, 0, 0];
    }

    // Empty the list of subpaths so that the context once again has zero subpaths
    gl.beginPath = function beginPath() {
      subPaths.length = 0;
    };

    // Mark last subpath as closed and create a new subpath with the same starting point as the previous subpath
    gl.closePath = function closePath() {
      if (subPaths.length) {
        // Mark last subpath closed.
        var prevPath = subPaths[subPaths.length -1], startX = prevPath.verts[0], startY = prevPath.verts[1];
        prevPath.closed = true;

        // Create new subpath using the starting position of previous subpath
        var newPath = new SubPath(startX, startY);
        subPaths.push(newPath);
      }
    };

    // Create a new subpath with the specified point as its first (and only) point
    gl.moveTo = function moveTo(x, y) {
      subPaths.push(new SubPath(x, y));
    };

    gl.lineTo = function lineTo(x, y) {
      if (subPaths.length) {
        subPaths[subPaths.length -1].verts.push(x, y, 0, 0);
      } else {
        // Create a new subpath if none currently exist
        gl.moveTo(x, y);
      }
    };

    gl.quadraticCurveTo = function quadraticCurveTo(cp1x, cp1y, x, y) {};

    gl.bezierCurveTo = function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {};

    gl.arcTo = function arcTo() {};

    // Adds a closed rect subpath and creates a new subpath
    gl.rect = function rect(x, y, w, h) {
      gl.moveTo(x, y);
      gl.lineTo(x + w, y);
      gl.lineTo(x + w, y + h);
      gl.lineTo(x, y + h);
      gl.closePath();
    };

    gl.arc = function arc(x, y, radius, startAngle, endAngle, anticlockwise) {};

    function fillSubPath(index) {
      var transform = gl2d.transform;
      var shaderProgram = gl2d.initShaders(transform.c_stack + 2,0);

      var subPath = subPaths[index];
      var verts = subPath.verts;

      gl.bindBuffer(gl.ARRAY_BUFFER, pathVertexPositionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

      transform.pushMatrix();

      sendTransformStack(shaderProgram);

      gl.uniform4f(shaderProgram.uColor, drawState.fillStyle[0], drawState.fillStyle[1], drawState.fillStyle[2], drawState.fillStyle[3]);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, verts.length/4);

      transform.popMatrix();
    }

    gl.fill = function fill() {
      for(var i = 0; i < subPaths.length; i++) {
        fillSubPath(i);
      }
    };

    function strokeSubPath(index) {
      var transform = gl2d.transform;
      var shaderProgram = gl2d.initShaders(transform.c_stack + 2,0);

      var subPath = subPaths[index];
      var verts = subPath.verts;

      gl.bindBuffer(gl.ARRAY_BUFFER, pathVertexPositionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

      transform.pushMatrix();

      sendTransformStack(shaderProgram);

      gl.uniform4f(shaderProgram.uColor, drawState.strokeStyle[0], drawState.strokeStyle[1], drawState.strokeStyle[2], drawState.strokeStyle[3]);

      if (subPath.closed) {
        gl.drawArrays(gl.LINE_LOOP, 0, verts.length/4);
      } else {
        gl.drawArrays(gl.LINE_STRIP, 0, verts.length/4);
      }

      transform.popMatrix();
    }

    gl.stroke = function stroke() {
      for(var i = 0; i < subPaths.length; i++) {
        strokeSubPath(i);
      }
    };

    gl.clip = function clip() {};

    gl.isPointInPath = function isPointInPath() {};

    gl.drawFocusRing = function drawFocusRing() {};



    var imageCache = [], textureCache = [];

    function Texture(image) {
      this.obj   = gl.createTexture();
      this.index = textureCache.push(this);

      imageCache.push(image);

      // we may wish to consider tiling large images like this instead of scaling and
      // adjust appropriately (flip to next texture source and tile offset) when drawing
      if (image.width > gl2d.maxTextureSize || image.height > gl2d.maxTextureSize) {
        var canvas = document.createElement("canvas");

        canvas.width  = (image.width  > gl2d.maxTextureSize) ? gl2d.maxTextureSize : image.width;
        canvas.height = (image.height > gl2d.maxTextureSize) ? gl2d.maxTextureSize : image.height;

        var ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

        image = canvas;
      }

      gl.bindTexture(gl.TEXTURE_2D, this.obj);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Enable Mip mapping on power-of-2 textures
      if (isPOT(image.width) && isPOT(image.height)) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }

      // Unbind texture
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    gl.drawImage = function drawImage(image, a, b, c, d, e, f, g, h) {
      var transform = gl2d.transform;

      transform.pushMatrix();

      var sMask = shaderMask.texture;
      var doCrop = false;

      //drawImage(image, dx, dy)
      if (arguments.length === 3) {
        transform.translate(a, b);
        transform.scale(image.width, image.height);
      }

      //drawImage(image, dx, dy, dw, dh)
      else if (arguments.length === 5) {
        transform.translate(a, b);
        transform.scale(c, d);
      }

      //drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
      else if (arguments.length === 9) {
        transform.translate(e, f);
        transform.scale(g, h);
        sMask = sMask|shaderMask.crop;
        doCrop = true;
      }

      var shaderProgram = gl2d.initShaders(transform.c_stack, sMask);

      var texture, cacheIndex = imageCache.indexOf(image);

      if (cacheIndex !== -1) {
        texture = textureCache[cacheIndex];
      } else {
        texture = new Texture(image);
      }

      if (doCrop) {
        gl.uniform4f(shaderProgram.uCropSource, a/image.width, b/image.height, c/image.width, d/image.height);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, texture.obj);
      gl.activeTexture(gl.TEXTURE0);

      gl.uniform1i(shaderProgram.uSampler, 0);

      sendTransformStack(shaderProgram);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      transform.popMatrix();
    };
  };

}(Math));



/**
 * A shitload of very usefull stuff
 * @class Util
 * @static
 */
FF.Util = function(){};


/**
 * Initiate the main render
 * @class Util
 * @method createRender
 * @param {Object} view - If the render is a CanvasRender, the system will use a given canvas instead of creating a new one
 * @return {CanvasRender|WebGLRender}
 */
FF.Util.createRender = function(view){
	var render = (window.WebGLRenderingContext) ? new FF.CanvasRender() : new FF.CanvasRender();
	render.createRender(view);

	return render;
};


/**
 * Converts hex color string to rgb object
 * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @class Util
 * @method h2r
 * @param {String} hex - color like #F00 or #FF0000
 * @return {Object}
 */
FF.Util.h2r = function(hex){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};


FF.Util.r2h = function(r,g,b){
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};


/**
 * A cross browser way to get screen width/height
 * @class Util
 * @method screenSize
 * @return {Object} - {width,height}
 */
FF.Util.screenSize = function(){
	var size = { width : 0, height : 0 };

	//IE
	if(!window.innerWidth){

		if(!(document.documentElement.clientWidth == 0)){
			size.width = document.documentElement.clientWidth;
			size.height = document.documentElement.clientHeight;
		} //Strict mode

		else{
			size.width = document.body.clientWidth;
			size.height = document.body.clientHeight;
		} //Quirks mode

	}

	//Any other less-boring web browser
	else {
		size.width = window.innerWidth;
		size.height = window.innerHeight;
	}

	return size;
};


/**
 * Shortcut to screenSize (only width)
 * @class Util
 * @method screenWidth
 * @return {Integer}
 */
FF.Util.screenWidth = function(){
	return FF.Util.screenSize().width;
};


/**
 * Shortcut to screenSize (only height)
 * @class Util
 * @method screenHeight
 * @return {Integer}
 */
FF.Util.screenHeight = function(){
	return FF.Util.screenSize().height;
};


FF.Util.getCenterFromItem = function(obj, vertical){
	return (!vertical) ? FF.Render.getWidth() / 2 - obj.rect().width / 2 : FF.Render.getHeight() / 2 - obj.rect().height / 2;
};


/**
 * Cross browser navigator infos
 * @class Util
 * @return {Object} - {name,version}
 */
FF.Util.getBrowserInfos = function(){
	return {
		name : navigator.appName,
		version : navigator.appVersion
	};
};


/**
 * Cross browser xhr request constructor
 * @class Util
 * @method getXMLHttpRequest
 * @return {Object} - instanciated xhr object
 */
FF.Util.getXMLHttpRequest = function(){
    return (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
};


/**
 * Cross browser ajax request sender
 * @class Util
 * @method ajax
 * @param {Object} options - {type -> "POST" || "GET", async -> boolean, url -> String, complete -> Handler}
 * @example
 * FF.Util.ajax({
 *	 type : "POST",
 *	 url : "file.php?a=1",
 *	 async : true,
 *	 complete : function(content){
 *		 console.log(content);
 *	 }
 * });
 */
FF.Util.ajax = function(options){
	var type = options.type || "POST";
	var async = options.async || true;
	var url = options.url || "";
	var complete = options.complete || function(text){};

	var xhr = FF.Util.getXMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			complete(xhr.responseText);
		}
	};
	xhr.open(type, url, async);
	xhr.send();
};


/**
 * Used to detect collision between two rectangles by using position and size
 * @class Util
 * @param {Object} rect1 - First rectangle
 * @param {Object} rect2 - Second rectangle
 * @param {Boolean} - true if the first one has any pixel in the second one, false otherwise
 */
FF.Util.collideRects = function(rect1, rect2){
	rect1.right = rect1.x + rect1.width;
	rect1.bottom = rect1.y + rect1.height;

	rect2.right = rect2.x + rect2.width;
	rect2.bottom = rect2.y + rect2.height;

	return ((rect1.x >= rect2.x && rect1.x <= rect2.right) || (rect2.x >= rect1.x && rect2.x <= rect1.right)) &&
            ((rect1.y >= rect2.y && rect1.y <= rect2.bottom) || (rect2.y >= rect1.y && rect2.y <= rect1.bottom));
};


/**
 * Used to detect collision between two objects having a rect() function
 * @class Util
 * @param {Object} object1 - First object
 * @param {Object} object2 - Second object
 * @return {Boolean} - true if the first object rectangle has a pixel in the second, false otherwise
 */
FF.Util.collideOneWithOne = function(object1, object2){
	if(object1.rect && object2.rect && object1 !== object2 && FF.Util.collideRects(object1.rect(), object2.rect()))
    	return true;
	else
		return false;
};


/**
 * Used to detect collision between an object and a stack of objects (like player / bullets)
 * @class Util
 * @param {Object} item - Object to compare to collection
 * @return {Array} - Items colliding with object in first parameter
 */
FF.Util.collideOneWithMany = function(item, collection){
	var res = [];

	if(collection !== undefined){
		if(collection.foreach){
			collection.foreach(function(item2){
				if(FF.Util.collideOneWithOne(item, item2)) res.push(item2);
			});
		}
		else{
			if(collection instanceof Array || collection.length){
				for(var i = 0; i < collection.length; i++){
					if(FF.Util.collideOneWithOne(item, collection[i])){ res.push(collection[i]); }
				}
			}
			else{
				for(var i in collection){
					if(FF.Util.collideOneWithOne(item, collection[i])){ res.push(collection[i]); }
				}
			}
		}
	}

	return res;
};


/**
 * Check if an object is an array
 * @class Util
 * @method isArray
 * @param {Object} item - object to check
 * @return {Boolean} - true if checked object is an array, false otherwise
 */
FF.Util.isArray = function(item){
	return (item instanceof Array) ? true : false;
};


/**
 * Check if an object is a string
 * @class Util
 * @method isString
 * @param {Object} item - object to check
 * @return {Boolean} - true is it is, false if not
 */
FF.Util.isString = function(item){
	return (typeof item == "string") ? true : false;
};

FF.Util.getDOMDocument = function(xml){
	var xmlDoc = null;

	if (window.DOMParser){
		parser=new DOMParser();
	  	xmlDoc=parser.parseFromString(xml,"text/xml");
	}
	else{
	  	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  	xmlDoc.async=false;
	  	xmlDoc.loadXML(xml);
	}

	return xmlDoc;
}

FF.Util.random = function(from, to){
	return Math.floor(Math.random()*(to-from+1)+from);
};


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/Viewport.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/util/WebSocketServer.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * TODO
 */
FF.WebSocketServer = function(url, session_data){
	FF.EventManager.call(this);

	this.session_data = session_data;

	this.url = url;
};


FF.WebSocketServer.prototype.query = function(handler, content){
	var that = this;
	var data = {
		fn : handler,
		fn_master : handler,
		ID : that.session_data.ID,
		SID : that.session_data.SID,
		content : content
	};

	this.socket.send(JSON.stringify(data));
};


FF.WebSocketServer.prototype.onopen = function(e){
	this.sendAccountingRequest();
	this.dispatchEvent({ type : "start" });
};


FF.WebSocketServer.prototype.onerror = function(e){

};


FF.WebSocketServer.prototype.onclose = function(e){
	console.log(e);
};


FF.WebSocketServer.prototype.onmessage = function(msg){
	this.dispatchEvent({ type : "message", msg : JSON.parse(msg.data) });
};


FF.WebSocketServer.prototype.sendAccountingRequest = function(){
	var that = this;
	this.query("accounting_start", { sessionData : that.session_data });
};

FF.WebSocketServer.prototype.start = function(){
	var that = this;

	this.socket = new WebSocket(this.url);

	this.socket.onopen = function(e){ that.onopen(e); };

	this.socket.onmessage = function(e){ that.onmessage(e); };

	this.socket.onerror = function(e){ that.onerror(e); };

	this.socket.onclose = function(e){ that.onclose(e); };
};
