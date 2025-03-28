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

	FF.Util.ajax({ type : "GET", url : this.mapUrl, complete : function(content){
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
