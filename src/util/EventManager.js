/**
 * Allows you to add event listeners to your object by calling FF.EventManager.call(your_object);
 * @class EventManager
 * @abstract
 * @example
 * When you use your_object.dispatchEvent(), don't forget to give event type like :
 * your_object.dispatchEvent({ type : "progress", data : {} });
 */
FF.EventManager = function(){

	/**
	 * Array of listeners for your object
	 * @property listeners
	 * @type Array
	 */
	var listeners = [];


	/**
	 * Like every event manager ever...
	 * @method addEventListener
	 * @param {String} type - Event type
	 * @param {Object} listener - Handler for your event listener
	 */
	this.addEventListener = function(type,listener){
		if(listeners[type] === undefined)
			listeners[type] = [];

		if(listeners[type].indexOf(listener) === -1)
			listeners[type].push(listener);
	};


	/**
	 * Same shit here bro
	 * @method dispatchEvent
	 * @param {Object} event - Event content
	 */
	this.dispatchEvent = function(event){
		for(var listener in listeners[event.type])
			listeners[event.type][listener](event);
	};


	/**
	 * Again and again... How dare you ask ?
	 * @method removeEventListener
	 * @param {String} type - Event type
	 * @param {Object} listener - Event handler
	 */
	this.removeEventListener = function(type,listener){
		var index = listeners[type].indexOf(listener);

		if (index !== -1)
			listeners[type].splice(index,1);
	};

};
