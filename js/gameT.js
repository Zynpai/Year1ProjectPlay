var livingEnemies = [];
var enemyBullet;
var baddies;
var baddie;
var sbaddies;
var sbaddie;
var firingTimer;
var player;
var cursors;
var lasers; 
var laser;
var slasers;
var slaser;
var fireButton;
var cursors;
var playerfacing;
var dragging;
var targetAngle;
var key1;
var key2;
var key3;
var key4;
var key5;
var key6;
var fireRate;
var nextFire;
var lives;
var kills;
var Bstairs;
var stairs;
var blocks;
var timer;
var timer2;
var timer3;
var totalTimer;
var totalTimer2;
var totalTimer3;
var skill1Ready;
var skill2Ready;
var Qpic;
var Epic;
var QLpic;
var ELpic;
var alreadyDone;
var alreadyDone2;
var alreadyDone3;
var alreadyDone4;
var alreadyDone5;
var alreadyDone6;
var alreadyDone7;
var alreadyDone8;
var alreadyDone9;
var alreadyDone10;
var toolbars;
var toolbar;
var stage2;
var stage3;
var boss;
var bossLives;
var blasers;
var bflames;
var animation;
var animation2;
var firingTimerE;
var firingTimerB;


var gameStateT = {

init: function() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}, 
	
create: function() {
	tutorialF = 0;	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	
	game.add.sprite(0, 0, 'sky');
		
	blocks = game.add.group();
	blocks.enableBody = true;
	createBlocks();
	
	player = game.add.sprite(game.world.width/2, game.world.height-75 , 'player'); 
	player.anchor.setTo(0.5);
	game.physics.arcade.enable(player);
	player.animations.add('walk', [1][2], 2, true);
	player.TURN_RATE = 5;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.allowRotation = false;
	
	stairs = game.add.sprite(360, 0, 'stairs');
	stairs.enableBody = true;
	stairs.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(stairs);
	
	
},	

update: function() {
	game.debug.text("Use W S A D for player movement" , 300, 550);
	game.debug.text("Touch the stairs if you're ready to proceed", 250, 570);
	
	rotatePlayer();
	
	game.physics.arcade.overlap(player, stairs, this.stageT2, null, this);
	game.physics.arcade.collide(player, blocks);
	
		player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	
		
    if (key2.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('walk');
	}
	else
	{
        //  Stand still
        player.animations.stop();

        player.frame = 0;
    }	

    if (key4.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('walk');
		
    }
    else
	{
        //  Stand still
        player.animations.stop();

        player.frame = 0;
    } 
		
	
	if (key3.isDown)
    {
        //  Move down
        player.body.velocity.y = 150;

        player.animations.play('walk')
		
    }
	else
	{
        //  Stand still
        player.animations.stop();

        player.frame = 0;
    }
	
	if (key1.isDown)
    {
        //  Move up
        player.body.velocity.y = -150;

        player.animations.play('walk')
		
	}
	else
	{
        //  Stand still
        player.animations.stop();

        player.frame = 0;
    }

},

stageT2: function(){
	
	blocks.destroy()
	game.state.start('gameT2');
},	

}

function createBlocks() {
	for (var i = 0; i < 30; i ++)
	{
	var block = blocks.create(i * 30, 0, 'block');
	block.body.immovable = true;
	}
	
	for (var j = 0; j <45; j++)
	{
	var block = blocks.create( 0, j*20, 'block');
	block.body.immovable = true;
	}
	
	for (var k = 0; k <45; k++)
	{
	var block = blocks.create( 770, k*20, 'block');
	block.body.immovable = true;
	}
	
	for (var l = 0; l <30; l++)
	{
	var block = blocks.create( l* 30, 580, 'block');
	block.body.immovable = true;	
	}
}

function rotatePlayer(player) {
	
	this.targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        this.player.x, this.player.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y) +90;


        if(this.targetAngle < 0)
            this.targetAngle += 360;

        if(game.input.activePointer && !this.dragging)
        {
			
            this.dragging = true;
        }
        if(!game.input.activePointer && this.dragging)
        {
            this.dragging = false;
        }

        if(this.dragging)
        {
            this.player.angle = this.targetAngle;
        }
	
}

function resetLaser(laser) {
	laser.kill();
	
}

