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
