gameStateT3 = {

create: function(){
	stageT3 = 0;
	dragging = false;
	fireRate = 300;
	nextFire = 0;
	skill1Ready = 1;
	totalTimer = 1;
	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	key5 = game.input.keyboard.addKey(Phaser.Keyboard.E);
	
	game.add.sprite(0, 0, 'sky');
		
	blocks = game.add.group();
	blocks.enableBody = true;
	createBlocks();

	stairs = game.add.sprite(360, 0, 'stairs');
	stairs.enableBody = true;
	stairs.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(stairs);
		
	player = game.add.sprite(game.world.width/2, game.world.height-75 , 'player'); 
	player.anchor.setTo(0.5);
	game.physics.arcade.enable(player);
	player.animations.add('walk', [1][2], 2, true);
	player.TURN_RATE = 5;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.allowRotation = false;
		
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(20, 'laser');
	lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers.setAll('checkWorldBounds', true);
	
	timer = game.time.create(false);
	
	toolbars = game.add.group();
	toolbars.enableBody = true;
	var toolbar = toolbars.create(700, 550, 'Toolbar');
	toolbar.body.immovable = true;
	ELpic = game.add.sprite(755, 555, 'ELskill');
	Epic = game.add.sprite(755, 555, 'Eskill');
	
	alreadyDone = 1;
},

update: function(){
	game.debug.text("Press E to teleport (2 second cooldown)" , 250, 550);
	game.debug.text("Touch the stairs to proceed", 270, 570);
	
	rotatePlayer();
	
	if (totalTimer >= 1 && alreadyDone == 1){
		Epic = game.add.sprite(755, 555, 'Eskill');
		skill1Ready = 1;
		alreadyDone = 0;
		timer.destroy();
		ELpic.destroy()
	}
	
	
	game.physics.arcade.overlap(player, stairs, this.stageT4, null, this);
	game.physics.arcade.collide(player, blocks);
	game.physics.arcade.collide(player, toolbars);
	
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
	
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// If the key was just pressed, fire a laser
		if (key.justDown || game.input.activePointer.isDown) {
			fireLaser();
			rotateLaser();			
		}
	}
	
	if (key5.isDown && skill1Ready == 1)
	{
		//do this
		player.rotation = game.physics.arcade.moveToPointer(player, 4000);
		ELpic = game.add.sprite(755, 555, 'ELskill');
		skill1Ready = 0;
		totalTimer = 0;
		Epic.destroy();
		alreadyDone += 1;
	}
	else {
		timer.loop(1500, updateCounter, this);
		timer.start();		
	}
},	

stageT4: function() {
	lasers.destroy()
	blocks.destroy()
	game.state.start('gameT4');
}	
}

function updateCounter(){
	totalTimer++;
}