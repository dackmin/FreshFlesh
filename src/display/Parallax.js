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
