var bootState = {
	preload: function() {
		game.load.image('loading', 'img/Loading.png');
		game.load.image('stairs', 'img/Stairs.jpg');
		game.load.image('block', 'img/Block.jpg');
		game.load.spritesheet('player', 'img/Player.jpg', 52, 52);
	},
	
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.state.start('load');
	
	}
};
