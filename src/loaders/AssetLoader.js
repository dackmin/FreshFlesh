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
			that.loadedAsset();
		});
		loader.load();
	}
};


/**
 * Called when an asset has just ended loading
 * @method loadedAsset
 */
FF.AssetLoader.prototype.loadedAsset = function(){
	var that = this;
	this.loadedCount++;

	this.dispatchEvent({ type : "progress", loaded : that.loadedCount, total : that.assetsURL.length });

	if(this.loadedCount == this.assetsURL.length){
		this.dispatchEvent({ type : "loaded" });
	}
};
