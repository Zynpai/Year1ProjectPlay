var gameWin = {
	
	create: function() {
		game.add.sprite(0, 0, 'win');
		
		var mkey = game.input.keyboard.addKey(Phaser.Keyboard.M);
		
		mkey.onDown.addOnce(this.start, this);
	},
	
	
	start: function() {
		game.state.start('menu');

	},
}