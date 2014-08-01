FF.ArrayList = function(){
	this.values = new Array();
	this.size = 0;
};


FF.ArrayList.prototype.add = function(item){
	if(this.values.indexOf(item) == -1){
		this.values.push(item);
		this.size++;
		return true;
	}
	else return false;
};


FF.ArrayList.prototype.del = function(item){
	if(this.values.indexOf(item) != -1){
		this.values.splice(this.values.indexOf(item),1);
		this.size--;
		return true;
	}
	else return false;
};


FF.ArrayList.prototype.get = function(index){
	var value;
	if(this.values[index]){
		value = this.values[index];
		this.values.splice(index, 1);
		this.size--;
	}

	return value;
};

FF.ArrayList.prototype.peek = function(index){
	var value;
	if(this.values[index]){
		value = this.values[index];
	}

	return value;
};


FF.ArrayList.prototype.clear = function(){
	this.values.length = 0;
	this.size = 0;
};


FF.ArrayList.prototype.inArray = function(item){
	if(this.values.indexOf(item) == -1) return false;
	else return true;
};
