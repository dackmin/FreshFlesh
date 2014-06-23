/**
 * Used by your game to draw & move elements
 * @class GameState
 * @constructor
 * @param {Object} options - { setup, update, draw }
 */
FF.GameState = function(options){


	/**
	 * Every Drawable component (e.g. having .setup(), .update() & .draw() functions) can be added to current gamestate to avoid calling them one-by-one in setup, update, & draw functions of your gamestate.
	 * @property
	 * @type Array
	 */
	this.children = [];


	/**
	 * Determine wether your GameState have been started yet
	 * @property isStarted
	 * @type Boolean
	 */
	this.isStarted = false;


	/**
	 * Required Drawable function - put everything you have to set up in
	 * @method setup
	 */
	this.setup = function(){
		//Setup every child
		for(var i in this.children) this.children[i].setup();

		//Call optional setup
		if(options.setup) options.setup();
	};


	/**
	 * Required Drawable function - put in every updating call you have
	 * @method update
	 */
	this.update = function(){
		//Update every child
		for(var i in this.children) this.children[i].update();

		//Call optional update
		if(options.update) options.update();
	};


	/**
	 * Required Drawable function - put in every draw call
	 * @method draw
	 */
	this.draw = function(){
		//Draw every child
		for(var i in this.children) this.children[i].draw();

		//Call optional draw
		if(options.draw) options.draw();
	};


	/**
	 * Adds drawable children to the scene
	 * @method add
	 * @param {Object|Drawable} child
	 */
	this.add = function(child){
		if(!child.setup || !child.update || !child.draw) throw new Error("[FF.GameState.add] Your item have to contain .setup(), .update() & .draw() functions");

		this.children.push(child);
	};

};
