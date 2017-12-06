var bootState = {
	preload: function() {
		game.load.image('loading', 'img/Loading.png');
	},
	
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.state.start('load');
	
	}
};