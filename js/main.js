var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('controls', controls);
game.state.add('credits', credits);
game.state.add('gameT', gameStateT);
game.state.add('gameT2', gameStateT2);
game.state.add('gameT3', gameStateT3);
game.state.add('gameT4', gameStateT4);
game.state.add('gameTF', gameStateTF);
game.state.add('game', gameState);
game.state.add('game2',gameState2);
game.state.add('gameB',gameStateB);
game.state.add('gameOver', gameOver);
game.state.add('gameWin', gameWin);

game.state.start('boot');

