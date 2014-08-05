/**
 * Overall game manager
 *
 * @class Game
 * @constructor
 * @param {Object} gamestate - Your first game state (an intro gamestate for example)
 * @param {Object} options - {backgroundColor : don't need to be a super hero to understand this one, view : If you don't want Fresh Flesh to create a default screen-sized renderer, give it your own (optional)}
 *
 * @example
 * var intro = {
 * 		isStarted : false,
 * 		setup : function(){ console.log("Setup"); },
 * 		update : function(){ console.log("Update"); },
 * 		draw : function(){ console.log("Draw"); }
 * };
 *
 * var game = new FF.Game(intro);
 * game.start();
 */
FF.Game = function(gamestate, options){
	var that = this;


	/**
	 * In case of calling to switchGameState(), we save the previous gamestate if we want to re-use it later (like showing a game pause menu, and go back to the main gamestate
	 * @property previousGameState
	 * @type Object
	 */
	this.previousGameState = null;


	/**
	 * The running game state of your game
	 * @property currentGameState
	 * @type Object
	 */
	this.currentGameState = gamestate;


	/**
	 * Hex background color of the game
	 * @property backgroundColor
	 * @type String
	 */
	this.backgroundColor = options.backgroundColor || "#FFF";


	/**
	 * Last time requestAnimationFrame was called
	 * @property lastCalledTime
	 * @type Date
	 */
	this.lastCalledTime = null;


	/**
	 * Current FPS count
	 * @property fps
	 * @type Integer
	 */
	this.fps = 0;


	/**
	 * Used to start the gamestate given to the FF.Game class constructor
	 * @method start
	 */
	this.launch = function(){
		if(this.currentGameState.isStarted == true) throw new Error("[FF.Game.Start] Your GameState is already started");
		if(this.currentGameState.setup === undefined) throw new Error("[FF.Game.Start] Your GameState have to contain a setup() function");

		if(FF.Render.canvas === undefined){
			FF.Render = FF.Util.createRender(options);
		}

		if(FF.InputManager.isSetup == false){
			FF.InputManager.setup();
		}

		this.currentGameState.setup();
		if(this.currentGameState.isStarted === undefined || this.currentGameState.isStarted == false) this.currentGameState.isStarted = true;

		requestAnimation();
	};


	/**
	 * Called by requestAnimationFrame to run your gameloops
	 * @method requestAnimation
	 * @private
	 */
	function requestAnimation(){
		if(that.currentGameState.update === undefined) throw new Error("[FF.Game.requestAnimationFrame] Your GameState have to contain an update() function (even if you let it empty)");
		if(that.currentGameState.draw === undefined) throw new Error("[FF.Game.requestAnimationFrame] Your GameState have to contain an draw() function (even if you let it empty)");

		//From v0.3_alpha - Added support for Gamepad API
		FF.InputManager.getGamepads();

		if(that.currentGameState.isStarted){
			that.currentGameState.update();

			//Clearing
			FF.Render.clearRect(0,0,FF.Render.getWidth(),FF.Render.getHeight());

			//Setting the background color
			FF.Render.setBackgroundColor(that.backgroundColor);

			that.currentGameState.draw();
		}

		if(that.lastCalledTime == null) {
			that.lastCalledTime = new Date().getTime();
			that.fps = 0;
			requestAnimationFrame(requestAnimation);
			return;
		}
		var delta = (new Date().getTime() - that.lastCalledTime)/1000;
		that.lastCalledTime = new Date().getTime();
		that.fps = (1/delta).toFixed(1);

		requestAnimationFrame(requestAnimation);
	};
};


/**
 * Allows you to switch between different gamestates, already started or not
 * @method switchGameState
 * @param {Object} gamestate - The new or previous (use your_game.previousGameState) gamestate to use in the main game loop
 * @param {Boolean} reset - Wether system have to reset the given gamestate (usefull when user press "Retry" in a pause menu, for example
 */
FF.Game.prototype.switchGameState = function(gamestate, reset){
	if(gamestate === undefined) throw new Error("[FF.Game.switchGameState] Your gamestate is undefined (not instanciated, like gs = new Blablabla();)");

	this.previousGameState = this.currentGameState;
	this.currentGameState = (reset) ? new gamestate.constructor : gamestate;

	//if(this.currentGameState.isStarted === undefined) throw new Error("[FF.Game.switchGameState] Your GameState have to contain an isStarted public property");
	if(this.currentGameState.isStarted === undefined) this.currentGameState.isStarted = false;
	if(this.currentGameState.setup === undefined) throw new Error("[FF.Game.switchGameState] Your GameState have to contain a setup() function");

	if(this.currentGameState.isStarted == false){
		FF.InputManager.resetPressedKeys();
		this.currentGameState.setup();
		this.currentGameState.isStarted = true;
	}
};
