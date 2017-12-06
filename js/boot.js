var bootState = {
	preload: function() {
		game.load.image('loading', 'img/Loading.png');
		game.load.image('stairs', 'img/stairs.jpg');
		game.load.image('block', 'img/block.jpg');
		game.load.spritesheet('player', 'img/player.jpg', 52, 52);
	},
	
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.state.start('load');
	
	}
};