var stageT3;

gameStateT2 = {
	
create: function(){
	stageT3 = 0;
	dragging = false;
	fireRate = 300;
	nextFire = 0;

	key1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	
	game.add.sprite(0, 0, 'sky');
		
	blocks = game.add.group();
	blocks.enableBody = true;
	createBlocks();

	Bstairs = game.add.sprite(360, 0, 'Bstairs');
	Bstairs.enableBody = true;
		
	player = game.add.sprite(game.world.width/2, game.world.height-75 , 'player'); 
	player.anchor.setTo(0.5);
	game.physics.arcade.enable(player);
	player.animations.add('walk', [1][2], 2, true);
	player.TURN_RATE = 5;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.allowRotation = false;
	
	baddies = game.add.group();
	baddies.enableBody = true;
	baddies.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(baddies);
	this.createBaddies();
	baddies.x = 100;
    baddies.y = 50;
	
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(20, 'laser');
	lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers.setAll('checkWorldBounds', true);
},

update: function(){
	game.debug.text("Use left to fire projectile and kill the baddie with it" , 150, 550);
	game.debug.text("Kill the baddie to unlock the stairs", 250, 570);
	
	rotatePlayer();
	this.rotateBaddie();
	
	game.physics.arcade.overlap(lasers, baddies, killBaddie, null, this);
	if (baddies.countLiving() == 0){
        Bstairs.destroy();
		stairs = game.add.sprite(360, 0, 'stairs');
		stairs.enableBody = true;
		stairs.physicsBodyType = Phaser.Physics.ARCADE;
		game.physics.arcade.enable(stairs);
		stageT3 = 1;
    }
	
	if (stageT3 == 1){
		game.physics.arcade.overlap(player, stairs, this.stageT3, null, this);
	}
	
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	game.physics.arcade.collide(player, blocks);
		
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
	
	
		// If the key was just pressed, fire a laser
	if (game.input.activePointer.isDown) {
			fireLaser();
			rotateLaser();			
	}
	
},	

createBaddies: function() {
    baddie = baddies.create(300, 200, 'baddie');
	baddie.lives = 3;
    baddie.body.velocity.x = 0;
	baddie.body.velocity.y = 0;
	baddie.anchor.setTo(0.5);
},

rotateBaddie: function() {
	baddie.rotation = game.physics.arcade.angleBetween(baddie, player);
},

stageT3: function() {
	
	blocks.destroy()
	lasers.destroy()
	game.state.start('gameT3');
},	
}

function rotateLaser(laser) {
	
	targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        this.laser.x, this.laser.y,
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
            this.laser.angle = targetAngle;
        }
	
}

function fireLaser() {
	 if (game.time.now > nextFire && lasers.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        laser = lasers.getFirstDead();

        laser.reset(player.x - 8, player.y - 8);

        game.physics.arcade.moveToPointer(laser, 400);
    }
}

function killBaddie(laser, baddie) {
	
    laser.kill();
	baddie.lives -= 1;
	
	if (baddie.lives < 1){
	baddie.kill();
	}
}

