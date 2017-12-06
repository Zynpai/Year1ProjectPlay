var gameOver = {
	
	create: function() {
		game.add.sprite(0, 0, 'gameOver');
		
		var rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
		
		rkey.onDown.addOnce(this.start, this);
	},
	
	
	start: function() {
		if (tutorialF == 1){
		game.state.start('game');
		}else {	
		game.state.start('gameT');
		}

	},
}