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
			var char = this.chars[line][i];

			FF.Render.drawSubImage(
				this.data.texture,
				char.textureRect.x,
				char.textureRect.y,
				char.textureRect.width,
				char.textureRect.height,
				this.x + char.position.x,
				this.y + char.position.y,
				char.textureRect.width * scale,
				char.textureRect.height * scale
			);
		}
	}

	FF.Render.restore();
};

FF.BitmapText.prototype.setText = function(text){
	this.text = ""+text;
	this.setup();
};
