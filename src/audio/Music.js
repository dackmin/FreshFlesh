FF.Music = function(options){
	if(!options.music) throw new Error("[FF.Music] You have to provide at least the file path for your music");
	FF.EventManager.call(this);


	this.player = FF.AudioCache[options.music] || new Audio(options.music);
	this.player.load();

	this.player.loop = options.loop || false;
	this.player.autoplay = options.autoplay || false;
	this.player.volume = options.volume / 100 || 1;
};


FF.Music.prototype.play = function(){
	this.player.play();
};


FF.Music.prototype.pause = function(){
	this.player.pause();
};


FF.Music.prototype.moveTo = function(seconds){
	if(seconds > this.player.duration) return;

	this.player.currentTime = seconds;
};


FF.Music.prototype.forward = function(seconds){
	if(this.player.currentTime + seconds > duration) return;

	this.player.currentTime+= seconds;
};


FF.Music.prototype.backward = function(seconds){
	if(this.player.currentTime - seconds < duration) return;

	this.player.currentTime-= seconds;
};
