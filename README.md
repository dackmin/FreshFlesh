FreshFlesh
==========

Fresh Flesh is a fast/lightweight Javascript WebGL/Canvas game engine based on [WebGL-2D](https://github.com/gameclosure/webgl-2d) library (for WebGL render) and Canvas API. It allows you to create simple games in minutes by providing useful built-in game functions (for RPGs, TPS, ...).

## License

This engine is subject to the terms and conditions defined in the 'LICENSE' file, which is part of this source code package. Please refer to this file if you have any question concerning product licence.

## Installation

If you don't want to download the compressed version of Fresh Flesh everytime you create a game, simply use the main file in the master branch of this git, like the following :

```
<script src='https://raw.githubusercontent.com/dackmin/FreshFlesh/master/bin/freshflesh.js'></script>
```

Unless GitHub decides to move raw files, it will never change.

## Usage

Fresh Flesh was made to strictly follow the common game loop structure : `Setup -> Update -> Draw`.
You first create a GameState :

```
function MainGameState(){
	this.setup = function(){
	
	};
	
	this.update = function(){
	
	};
	
	this.draw = function(){
	
	};
}
```

You then add some stuff in your gamestate .setup() function :

```
var mySprite = new FF.Sprite({ image : "res/pig.png" });
this.add(mySprite);
```

And finaly, you can create & launch your game :

```
var GAMESTATE = new MainGameState();
var GAME = new FF.Game(MAIN_GAMESTATE, { background : "#000" });
GAME.launch();
```

## Example

To see a living example of Fresh Flesh usage, you can look at my [Cheezy The Pig](https://github.com/dackmin/CheezyThePig) repository.
