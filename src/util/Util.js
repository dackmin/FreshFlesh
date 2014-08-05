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
FF.Util.createRender = function(options){
	var render = (options.allowWebGL) ? ((window.WebGLRenderingContext) ? new FF.CanvasRender() : new FF.CanvasRender()) : new FF.CanvasRender();
	render.createRender(options.view);

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


/**
 * Similar to h2r
 * @class Util
 * @method r2h
 * @param {Integer} r
 * @param {Integer} g
 * @param {Integer} b
 * @return {String}
 */
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


/**
 * Center an item in render
 * @class Util
 * @method getCenterFromItem
 * @param {Object} obj - Object to move
 * @param {Boolean} vertical - Use whether render width or height
 * @return {Integer}
 */
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


/**
 * Cross browser XML parser
 * @class Util
 * @method getDOMDocument
 * @param {String} xml
 * @return {Object}
 */
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


/**
 * Get a random number in an interval
 * @class Util
 * @method random
 * @param {Integer} from
 * @param {Integer} to
 * @return {Integer}
 */
FF.Util.random = function(from, to){
	return Math.floor(Math.random()*(to-from+1)+from);
};


/**
 * Get first item of an array (associative or not)
 * @class Util
 * @method array_first
 * @param {Array} arr
 * @return {Object}
 */
FF.Util.array_first = function(arr) {
	for(var i in arr) return arr[i];
};


/**
 * Return first key of an array (associative or not)
 * @class Util
 * @method array_first_key
 * @param {Array} arr
 * @return {Object}
 */
FF.Util.array_first_key = function(arr){
	for(var i in arr) return i;
};


/**
 * Get a random item in an array
 * @class Util
 * @method array_random
 * @param {Array} arr
 * @return {Object}
 */
FF.Util.array_random = function(arr){
	return arr[Math.floor(Math.random()*arr.length)];
};
