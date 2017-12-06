var loadState = {

	preload: function() {
		loading = this.add.sprite(0, 0, 'loading');
		
		game.load.spritesheet('player', 'img/player.jpg', 52, 52);
		game.load.image('baddie', 'img/baddie.png');
		game.load.image('sbaddie', 'img/sbaddie.png');
		game.load.image('sky', 'img/sky.png');
		game.load.image('gameOver', 'img/gameover.png');
		game.load.image('laser', 'img/star.png');
		game.load.image('menu', 'img/Menu.jpg');
		game.load.image('Bstairs', 'img/BStairs.png');
		game.load.image('stairs', 'img/stairs.jpg');
		game.load.image('block', 'img/block.jpg');
		game.load.image('slaser', 'img/slaser.png');
		game.load.image('Qskill', 'img/Qskill.png');
		game.load.image('QLskill', 'img/QLskill.png');
		game.load.image('Eskill', 'img/Eskill.png');
		game.load.image('ELskill', 'img/ELskill.png');
		game.load.image('Toolbar', 'img/Toolbar.png');
		game.load.image('elaser', 'img/eB.png');
		game.load.image('bossNF', 'img/Boss2.png');
		game.load.image('bossF', 'img/Boss1.png');
		game.load.image('blaser', 'img/Blaser.png');
		game.load.image('bossF1', 'img/BossFlame.png');
		game.load.image('bossF2', 'img/BossFlame2.png');
		game.load.image('win', 'img/Win.png');
		game.load.image('gb', 'img/gb.png');
		game.load.image('controls', 'img/controls.png');
		game.load.image('credits', 'img/credits.png');
	},

	
	create: function() {
		var l = game.add.sprite(0, 0, 'loading');
		game.state.start('menu');
		
	},
	
}