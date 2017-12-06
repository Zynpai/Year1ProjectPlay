var bootState = {
	preload: function() {
		game.load.image('loading', 'https://zynpai.github.io/Year1ProjectPlay/img/Loading.png');
		game.load.image('stairs', 'https://zynpai.github.io/Year1ProjectPlay/img/stairs.jpg');
		game.load.image('block', 'https://zynpai.github.io/Year1ProjectPlay/img/block.jpg');
		game.load.spritesheet('player', 'img/player.jpg', 52, 52);
	},
	
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.state.start('load');
	
	}
};
