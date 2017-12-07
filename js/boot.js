var bootState = {
	preload: function() {
		game.load.image('loading', 'img/Loading.png');
		game.load.image('stairs', 'https://zynpai.github.io/Year1ProjectPlay/img/Stairs.png');
		game.load.image('block', 'https://zynpai.github.io/Year1ProjectPlay/img/Block.png');
		game.load.spritesheet('player', 'https://zynpai.github.io/Year1ProjectPlay/img/Player.png', 52, 52);
	},
	
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.state.start('load');
	
	}
};
