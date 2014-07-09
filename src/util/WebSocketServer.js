/**
 * TODO
 */
FF.WebSocketServer = function(url, session_data){
	FF.EventManager.call(this);

	this.session_data = session_data;

	this.url = url;
};


FF.WebSocketServer.prototype.query = function(handler, content){
	var that = this;
	var data = {
		fn : handler,
		fn_master : handler,
		ID : that.session_data.ID,
		SID : that.session_data.SID,
		content : content
	};

	this.socket.send(JSON.stringify(data));
};


FF.WebSocketServer.prototype.onopen = function(e){
	this.sendAccountingRequest();
	this.dispatchEvent({ type : "start" });
};


FF.WebSocketServer.prototype.onerror = function(e){

};


FF.WebSocketServer.prototype.onclose = function(e){
	console.log(e);
};


FF.WebSocketServer.prototype.onmessage = function(msg){
	this.dispatchEvent({ type : "message", msg : JSON.parse(msg.data) });
};


FF.WebSocketServer.prototype.sendAccountingRequest = function(){
	var that = this;
	this.query("accounting_start", { sessionData : that.session_data });
};

FF.WebSocketServer.prototype.start = function(){
	var that = this;

	this.socket = new WebSocket(this.url);

	this.socket.onopen = function(e){ that.onopen(e); };

	this.socket.onmessage = function(e){ that.onmessage(e); };

	this.socket.onerror = function(e){ that.onerror(e); };

	this.socket.onclose = function(e){ that.onclose(e); };
};
