
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, init: init });


game.load.spritesheet('player', 'img/player.png', 52, 52);
	game.load.spritesheet('baddie', 'img/baddie.png', 32, 32);
	game.load.image('sky', 'img/sky.png');
	game.load.image('laser', 'img/star.png');
var player;
var cursors;
var lasers; 
var playerfacing;
var baddies;
var baddie;
var dragging = false;
var targetAngle;
var key1;
var key2;
var key3;
var key4;
var fireRate = 300;
var nextFire = 0;
var lives = 0;

function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
} 

function create() {
	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sky');
		
	baddies = game.add.group();
	baddies.enableBody = true;
	baddies.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(baddies);
	createBaddies();
	baddies.x = 100;
    baddies.y = 50;
	
	player = game.add.sprite(game.world.width/2, game.world.height-75 , 'player'); 
	player.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(player);
	player.animations.add('walk', [1][2], 2, true);
	player.TURN_RATE = 5;
	
	cursors = game.input.keyboard.createCursorKeys();
	
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(20, 'laser');
	lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers.setAll('checkWorldBounds', true);
	
	game.input.activePointer.x = game.width/2;
    game.input.activePointer.y = game.height/2;
	
	
}

function update() {
	baddies.forEach(Attack, this);
	
	rotatePlayer();
	
	game.physics.arcade.overlap(lasers, baddies, killBaddie, null, this);
	
	game.physics.arcade.collide(baddies);
	

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
	
	// Loop over the keys
	
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// If the key was just pressed, fire a laser
		if (key.justDown || game.input.activePointer.isDown) {
			fireLaser();
		}
	}
	
	
}

function createBaddies() {
	
	for (var i = 0; i < 7; i++) 
	{
    var baddie = baddies.create(i * 50, 10, 'baddie');
	baddie.lives = 4;
    baddie.body.velocity.x = 0;
	baddie.body.velocity.y = 0;
   	}
}

function fireLaser() {
	 if (game.time.now > nextFire && lasers.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var laser = lasers.getFirstDead();

        laser.reset(player.x - 8, player.y - 8);

        game.physics.arcade.moveToPointer(laser, 400);
    }
}

function killBaddie (laser, baddie) {
	
    laser.kill();
	baddie.lives -= 1;
	
	if (baddie.lives < 1){
	baddie.kill();
	}
}

function resetLaser(laser) {
	// Destroy the laser
	laser.kill();
}

function rotatePlayer() {
	
	var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
          player.x, player.y,
          this.game.input.activePointer.x, this.game.input.activePointer.y) +90;


        if(targetAngle < 0)
            targetAngle += 360;

        if(game.input.activePointer && !dragging)
        {
			
            dragging = true;
        }
        if(!game.input.activePointer && dragging)
        {
            dragging = false;
        }

        if(dragging)
        {
            player.angle = targetAngle;
        }
	
}

function Attack(baddie) {
	
	if (!(baddie.body.x + 300 < player.body.x || baddie.body.x - 300 > player.body.x) && !(baddie.body.y + 300 < player.body.y || baddie.body.y - 300> player.body.y )){
		if (player.body.x > baddie.body.x){
			baddie.body.velocity.x = 150;
		}
		if (player.body.x < baddie.body.x){
			baddie.body.velocity.x = -150;
		}
		if (player.body.y > baddie.body.y){
			baddie.body.velocity.y = 150;
		}
		if (player.body.y < baddie.body.y){
			baddie.body.velocity.y = -150;
		}
	}	
}	