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
