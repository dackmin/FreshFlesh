/**
 * TODO
 */
FF.Shooter = function(){};

FF.Shooter.affine = function(_player, _mouse){
	return {
		//Get A -> y2 - y1 / x2 - x1
		A : (_mouse.y - _player.y) / (_mouse.x - _player.x),

		//Get B -> (x2y1 - x1y2)/(x2 - x1)
		B : (_mouse.x * _player.y - _player.x * _mouse.y) / (_mouse.x - _player.x),

		origin : _player,
		dest : _mouse
	};
};

FF.Shooter.shootAt = function(_player, _mouse){
	var _x = _mouse.x - _player.x;
	var _y = _mouse.y - _player.y;

	var vSpeed = { x : _x * 3, y : _y * 3 };

	if(FF.Shooter.distanceBetween(_player,_mouse) < 10) {
		vSpeed.x *= 30;
		vSpeed.y *= 30;
	}

	return { speed : vSpeed, origin : _player, dest : _mouse };
};

FF.Shooter.realMoveSpeed = function(_originalSpeed){
	return (GAME.fps == "Infinity" || _originalSpeed * (60 / GAME.fps) / 1.2 == "Infinity") ? _originalSpeed : _originalSpeed * (60 / GAME.fps) / 1.2;
};

FF.Shooter.mouseInViewport = function(_viewport){
	return { x : FF.InputManager.mouse_x + _viewport.rect().x, y : FF.InputManager.mouse_y + _viewport.rect().y };
};

FF.Shooter.turnAroundMouse = function(_player, _mouse){
	return FF.Shooter.toDegrees(Math.atan2(_mouse.x - _player.x, _player.y - _mouse.y));
};

FF.Shooter.toDegrees = function(_rad){
	return (_rad > 0 ? _rad : (2 * Math.PI + _rad)) * 360 / (2 * Math.PI)
};

FF.Shooter.distanceBetween = function(_object1, _object2) {
	return Math.sqrt(Math.pow(_object1.x - _object2.x, 2) + Math.pow(_object1.y - _object2.y, 2));
};
