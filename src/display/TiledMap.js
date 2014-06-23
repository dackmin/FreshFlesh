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
