/**
 * Used to handle mouse and keyboard events, in an easier way than usual (special thx to ippa : https://github.com/ippa)
 * @class InputManager
 * @abstract
 * @example
 * TODO
 */
FF.InputManager = {};


/**
 * Avoid setting up manager twice
 * @class InputManager
 * @property isSetup
 * @type Boolean
 */
FF.InputManager.isSetup = false;


/**
 * Mouse X position on screen
 * @class InputManager
 * @property mouse_x
 * @type Integer
 */
FF.InputManager.mouse_x = 0;


/**
 * Mouse Y position on screen
 * @class InputManager
 * @property mouse_y
 * @type Integer
 */
FF.InputManager.mouse_y = 0;


/**
 * Here are stored your pressed keys/mouse buttons
 * @class InputManager
 * @property pressed_keys
 * @type Array<String>
 */
FF.InputManager.pressed_keys = [];


/**
 * Here are stored your previous pressed items
 * @class InputManager
 * @property previously_pressed_keys
 * @type Array<String>
 */
FF.InputManager.previously_pressed_keys = [];


/**
 * Here are stored the human names of computer key codes
 * @class InputManager
 * @property keycode_to_string
 * @type Array<String>
 */
FF.InputManager.keycode_to_string = [];


/**
 * The manager stores all your keydown callbacks in this array
 * @class InputManager
 * @property on_keydown_callbacks
 * @type Array<Handlers>
 */
FF.InputManager.on_keydown_callbacks = [];


/**
 * The manager stores all your keyup callbacks in this array
 * @class InputManager
 * @property on_keyup_callbacks
 * @type Array<Handlers>
 */
FF.InputManager.on_keyup_callbacks = [];


/**
 * Collection of human names from mousecode buttons
 * @class InputManager
 * @property mousebuttoncode_to_string
 * @type Array<String>
 */
FF.InputManager.mousebuttoncode_to_string = [];


/**
 * Collection of human names from mousecode buttons (only for ie)
 * @class InputManager
 * @property ie_mousebuttoncode_to_string
 * @type Array<String>
 */
FF.InputManager.ie_mousebuttoncode_to_string = [];


/**
 * Stack of keys for which we have to prevent default actions
 * @class InputManager
 * @property prevent_default_keys
 * @type Array<Boolean>
 */
FF.InputManager.prevent_default_keys = [];


/**
 * Stack of gamepads connected to our game
 * @class InputManager
 * @property gamepads
 * @type Object
 */
FF.InputManager.gamepads = {};


/**
 * Gamepad buttons in human readable names
 * @class InputManager
 * @property gamepad_to_string
 * @type Array<String>
 */
FF.InputManager.gamepad_to_string = [];


/**
 * Gamepad current axis values
 * @class InputManager
 * @property gamepad_axis_values
 * @type Object
 */
FF.InputManager.gamepad_axis_values = {
	left : { x : 0, y : 0 },
	right : { x : 0, y : 0 },
	triggers : { left : 0, right : 0 }
};


/**
 * Analogues deadzones provided by Microsoft (see http://msdn.microsoft.com/en-us/library/windows/desktop/ee417001(v=vs.85).aspx)
 * @class InputManager
 * @property gamepad_deadzones
 * @type Object
 */
FF.InputManager.gamepad_deadzones = {
	left_axis : 8689.0 / 32767.0,
	right_axis : 7849.0 / 32767.0,
	top_triggers : 0.5,
	bottom_triggers : 30.0 / 255.0
};


/**
 * Sets up the manager
 * @class InputManager
 * @method setup
 */
FF.InputManager.setup = function() {
	var k = [];

	k[8] = "backspace";
	k[9] = "tab";
	k[13] = "enter";
	k[16] = "shift";
	k[17] = "ctrl";
	k[18] = "alt";
	k[19] = "pause";
	k[20] = "capslock";
	k[27] = "esc";
	k[32] = "space";
	k[33] = "pageup";
	k[34] = "pagedown";
	k[35] = "end";
	k[36] = "home";
	k[37] = "left";
	k[38] = "up";
	k[39] = "right";
	k[40] = "down";
	k[45] = "insert";
	k[46] = "delete";

	k[91] = "left_window_key leftwindowkey";
	k[92] = "right_window_key rightwindowkey";
	k[93] = "select_key selectkey";
	k[106] = "multiply *";
	k[107] = "add plus +";
	k[109] = "subtract minus -";
	k[110] = "decimalpoint";
	k[111] = "divide /";

	k[144] = "numlock";
	k[145] = "scrollock";
	k[186] = "semicolon ;";
	k[187] = "equalsign =";
	k[188] = "comma ,";
	k[189] = "dash -";
	k[190] = "period .";
	k[191] = "forwardslash /";
	k[192] = "graveaccent `";
	k[219] = "openbracket [";
	k[220] = "backslash \\";
	k[221] = "closebracket ]";
	k[222] = "singlequote '";

	var m = [];

	m[0] = "left_mouse_button";
	m[1] = "center_mouse_button";
	m[2] = "right_mouse_button";

	var ie_m = [];
	ie_m[1] = "left_mouse_button";
	ie_m[2] = "right_mouse_button";
	ie_m[4] = "center_mouse_button";

	FF.InputManager.mousebuttoncode_to_string = m;
	FF.InputManager.ie_mousebuttoncode_to_string = ie_m;


	var numpadkeys = ["numpad0","numpad1","numpad2","numpad3","numpad4","numpad5","numpad6","numpad7","numpad8","numpad9"];
	var fkeys = ["f1","f2","f3","f4","f5","f6","f7","f8","f9"];
	var numbers = ["0","1","2","3","4","5","6","7","8","9"];
	var letters = [
		"a","b","c",
		"d","e","f",
		"g","h","i",
		"j","k","l",
		"m","n","o",
		"p","q","r",
		"s","t","u",
		"v","w","x",
		"y","z"
	];

	for(var i = 0; numbers[i]; i++)     { k[48+i] = numbers[i]; }
	for(var i = 0; letters[i]; i++)     { k[65+i] = letters[i]; }
	for(var i = 0; numpadkeys[i]; i++)  { k[96+i] = numpadkeys[i]; }
	for(var i = 0; fkeys[i]; i++)       { k[112+i] = fkeys[i]; }

	FF.InputManager.keycode_to_string = k;

	//From v0.3_alpha - Added support for Gamepad API
	var gp_buttons = [];

	gp_buttons[0] = "gamepad_face_button_1";
	gp_buttons[1] = "gamepad_face_button_2";
	gp_buttons[2] = "gamepad_face_button_3";
	gp_buttons[3] = "gamepad_face_button_4";

	gp_buttons[4] = "gamepad_top_left_shoulder";
	gp_buttons[5] = "gamepad_top_right_shoulder";
	gp_buttons[6] = "gamepad_bottom_left_shoulder";
	gp_buttons[7] = "gamepad_bottom_right_shoulder";

	gp_buttons[8] = "gamepad_select";
	gp_buttons[9] = "gamepad_start";

	gp_buttons[10] = "gamepad_left_analogue_click";
	gp_buttons[11] = "gamepad_right_analogue_click";

	gp_buttons[12] = "gamepad_top";
	gp_buttons[13] = "gamepad_bottom";
	gp_buttons[14] = "gamepad_left";
	gp_buttons[15] = "gamepad_right";

	var gp_axis = [];

	gp_axis[0] = "gamepad_left_x";
	gp_axis[1] = "gamepad_left_y";
	gp_axis[2] = "gamepad_right_x";
	gp_axis[3] = "gamepad_right_y";


	FF.InputManager.gamepad_to_string = { buttons : gp_buttons, axis : gp_axis };

	window.addEventListener("keydown", FF.InputManager.handleKeyDown);
	window.addEventListener("keyup", FF.InputManager.handleKeyUp);
	window.addEventListener("mousedown", FF.InputManager.handleMouseDown, false);
	window.addEventListener("mouseup", FF.InputManager.handleMouseUp, false);
	window.addEventListener("mousemove", FF.InputManager.handleMouseMove, false);
	window.addEventListener("touchstart", FF.InputManager.handleTouchStart, false);
	window.addEventListener("touchend", FF.InputManager.handleTouchEnd, false);
	window.addEventListener("blur", FF.InputManager.resetPressedKeys, false);


	// this turns off the right click context menu which screws up the mouseup event for button 2
	document.oncontextmenu = function(){ return false };

	FF.InputManager.isSetup = true;
};


/**
 * Used to reset current pressed keys
 * @class InputManager
 * @method resetPressedKeys
 * @param {Object} e
 */
FF.InputManager.resetPressedKeys = function(e){
	FF.InputManager.pressed_keys = {};
};


/**
 * Handles keyup events
 * @class InputManager
 * @method handleKeyUp
 * @param {Object} e
 */
FF.InputManager.handleKeyUp = function(e){
	e = e || window.event;

  	var human_names = FF.InputManager.keycode_to_string[e.keyCode].split(" ");

  	for(i in human_names){
		var human_name = human_names[i];
		FF.InputManager.pressed_keys[human_name] = false;

		if(FF.InputManager.on_keyup_callbacks[human_name]){
	  		FF.InputManager.on_keyup_callbacks[human_name](human_name);
	  		e.preventDefault();
		}

		if(FF.InputManager.prevent_default_keys[human_name]) { e.preventDefault(); }
  	}
};


/**
 * Handles keydown events
 * @class InputManager
 * @method handleKeyDown
 * @param {Object} e
 */
FF.InputManager.handleKeyDown = function(e){
  	e = e || window.event;

  	var human_names = FF.InputManager.keycode_to_string[e.keyCode].split(" ");

	for(i in human_names){
		var human_name = human_names[i];
		FF.InputManager.pressed_keys[human_name] = true;
		if(FF.InputManager.on_keydown_callbacks[human_name]){
	  		FF.InputManager.on_keydown_callbacks[human_name](human_name);
	  		e.preventDefault();
		}

		if(FF.InputManager.prevent_default_keys[human_name]){ e.preventDefault(); }
  	}
};


/**
 * Handles mousedown events
 * @class InputManager
 * @method handleMouseDown
 * @param {Object} e
 */
FF.InputManager.handleMouseDown = function(e){
	e = e || window.event;

  	var human_name = FF.InputManager.mousebuttoncode_to_string[e.button];

  	if (navigator.appName == "Microsoft Internet Explorer"){
		human_name = FF.InputManager.ie_mousebuttoncode_to_string[e.button];
	}

  	FF.InputManager.pressed_keys[human_name] = true;
  	if(FF.InputManager.on_keydown_callbacks[human_name]){
		FF.InputManager.on_keydown_callbacks[human_name](human_name);
		e.preventDefault();
  	}
};


/**
 * Handles mouseup events
 * @class InputManager
 * @method handleMouseUp
 * @param {Object} e
 */
FF.InputManager.handleMouseUp = function(e){
 	e = e || window.event;

  	var human_name = FF.InputManager.mousebuttoncode_to_string[e.button]  ;

  	if(navigator.appName == "Microsoft Internet Explorer"){
	  	human_name = FF.InputManager.ie_mousebuttoncode_to_string[e.button];
  	}

  	FF.InputManager.pressed_keys[human_name] = false;
  	if(FF.InputManager.on_keyup_callbacks[human_name]){
		FF.InputManager.on_keyup_callbacks[human_name](human_name);
		e.preventDefault();
  	}
};


/**
 * Handles mousemove events
 * @class InputManager
 * @method handleMouseMove
 * @param {Object} e
 */
FF.InputManager.handleMouseMove = function(e){
	e = e || window.event;

	if (e.pageX || e.pageY) {
		FF.InputManager.mouse_x = e.pageX;
		FF.InputManager.mouse_y = e.pageY;
	}
	else {
		FF.InputManager.mouse_x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		FF.InputManager.mouse_y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	}
};


/**
 * Handles touchstart events
 * @class InputManager
 * @method handleTouchStart
 * @param {Object} e
 */
FF.InputManager.handleTouchStart = function(e){
	e = e || window.event;
	FF.InputManager.pressed_keys["left_mouse_button"] = true;
	FF.InputManager.mouse_x = e.touches[0].pageX - FF.Render.View.offsetLeft;
	FF.InputManager.mouse_y = e.touches[0].pageY - FF.Render.View.offsetTop;
};


/**
 * Handles touchend events
 * @class InputManager
 * @method handleTouchEnd
 * @param {Object} e
 */
FF.InputManager.handleTouchEnd = function(e){
  	e = e || window.event;
  	FF.InputManager.pressed_keys["left_mouse_button"] = false;
	FF.InputManager.mouse_x = undefined;
	FF.InputManager.mouse_y = undefined;
};


/**
 * Prevents default action for given keys
 * @class InputManager
 * @method preventDefaultKeys
 * @param {Array<String> | String} list
 */
FF.InputManager.preventDefaultKeys = function(list){
  	if(!FF.Util.isString(list)) list = list.split(" ");

  	for(var i in list) {
		FF.InputManager.prevent_default_keys[list[i]] = true;
  	}
};


/**
 * Used to check if a key is pressed
 * @class InputManager
 * @method pressed
 * @param {Array<String> | String} keys - keys to check
 * @param {Boolean} logical_and - true if you want to check for every key at the same time, false otherwise
 * @return {Boolean} - true if one of the keys is found, false otherwise
 */
FF.InputManager.pressed = function(keys,logical_and) {
 	if(FF.Util.isString(keys)){ keys = keys.split(" "); }

  	if(logical_and) { return keys.every(function(key){ return FF.InputManager.pressed_keys[key]; }); }
  	else            { return keys.some(function(key){ return FF.InputManager.pressed_keys[key]; }); }
};


/**
 * Same than FF.InputManager.pressed() but for a non repeat call to a key
 * @class InputManager
 * @method pressedWithoudRepeat
 * @param {Array<String> | String} keys - see FF.InputManager.pressed()
 * @param {Boolean} logical_and - see FF.InputManager.pressed()
 * @return {Boolean} - true if key has not yet been recorded, false otherwise
 */
FF.InputManager.pressedWithoutRepeat = function(keys,logical_and){
  	if(FF.InputManager.pressed(keys,logical_and)){
		if(!FF.InputManager.previously_pressed_keys[keys]) {
	  		FF.InputManager.previously_pressed_keys[keys] = true;
	  		return true;
		}
  	}
  	else{
		FF.InputManager.previously_pressed_keys[keys] = false;
		return false;
  	}
};


/**
 * Stores an onkeydown event on a specific key (like esc to show a pause menu)
 * @class InputManager
 * @method on_keydown
 * @param {Array<String> | String} key - event subject(s)
 * @param {Handler} callback - event callback
 */
FF.InputManager.on_keydown = function(key,callback){
  	if(FF.Util.isArray(key))
		for(var i=0; key[i]; i++)
	  		FF.InputManager.on_keydown_callbacks[key[i]] = callback;
  	else
		FF.InputManager.on_keydown_callbacks[key] = callback;
};


/**
 * Stores an onkeyup event on a specific key
 * @class InputManager
 * @method on_keyup
 * @param {Array<String> | String} key - event subject(s)
 * @param {Handler} callback - event callback
 */
FF.InputManager.on_keyup = function(key,callback){
  	if(FF.Util.isArray(key))
		for(var i=0; key[i]; i++)
	  		FF.InputManager.on_keyup_callbacks[key[i]] = callback;
  	else
		FF.InputManager.on_keyup_callbacks[key] = callback;
};


/**
 * Used to clear callbacks on keys
 * @class InputManager
 * @method clearKeyCallbacks
 */
FF.InputManager.clearKeyCallbacks = function(){
  FF.InputManager.on_keyup_callbacks = [];
  FF.InputManager.on_keydown_callbacks = [];
};


/**
 * Used to poll connected gamepads
 * @class InputManager
 * @method getGamepads
 */
FF.InputManager.getGamepads = function(){

	if(navigator.getGamepads){
		FF.InputManager.gamepads = navigator.getGamepads();
		FF.InputManager.checkGamepadButtons();
	}

};


/**
 * Used to checked previously polled gamepad buttons values
 * @class InputManager
 * @method checkGamepadButtons
 */
FF.InputManager.checkGamepadButtons = function(){
	var current = FF.InputManager.getCurrentConnectedGamepad();

	//Buttons
	for(var i in current.buttons)
		FF.InputManager.pressed_keys[FF.InputManager.gamepad_to_string.buttons[i]] = current.buttons[i].pressed || current.buttons[i].value > ((i === 6 || i === 7) ? FF.InputManager.gamepad_deadzones.bottom_triggers : 0.5);

	//Axis
	for(var i in current.axes)
		FF.InputManager.pressed_keys[FF.InputManager.gamepad_to_string.axis[i]] = current.axes[i] > ((i === 0 || i === 1) ? FF.InputManager.gamepad_deadzones.left_axis : FF.InputManager.gamepad_deadzones.right_axis);

	//Axis values
	FF.InputManager.gamepad_axis_values.left.x = current.axes[0];
	FF.InputManager.gamepad_axis_values.left.y = current.axes[1];
	FF.InputManager.gamepad_axis_values.right.x = current.axes[2];
	FF.InputManager.gamepad_axis_values.right.y = current_axes[3];
	FF.InputManager.gamepad_axis_values.triggers.left = current.buttons[6].value;
	FF.InputManager.gamepad_axis_values.triggers.right = current.buttons[7].value;
};


/**
 * Used to retrive the last connected gamepad (in case many gamepads are plugged)
 * @class InputManager
 * @method getCurrentConnectedGamepad
 * @return Gamepad (see https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html#gamepad-interface)
 */
FF.InputManager.getCurrentConnectedGamepad = function(){
	for(var i in FF.InputManager.gamepads)
		if(FF.InputManager.gamepads[i].connected)
			return FF.InputManager.gamepads[i];
};
