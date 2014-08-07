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
	sound.volume = this.player.volume;
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
