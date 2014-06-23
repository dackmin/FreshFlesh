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
