var stageTF;

gameStateT4 = {
create: function() {
	stage2 = 0;
	dragging = false;
	fireRate = 300;
	nextFire = 0;
	totalTimer = 1;
	totalTimer2 = 1;
	skill1Ready = 1;
	skill2Ready = 1;
	firingTimer = 0;
	firingTimerE = 0;
	firingTimerB = 0;
	tutorialF = 1;
	stageTF = 0;
	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	key5 = game.input.keyboard.addKey(Phaser.Keyboard.E);
	key6 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sky');
		
	blocks = game.add.group();
	blocks.enableBody = true;
	createBlocks();
	
	Bstairs = game.add.sprite(360, 0, 'Bstairs');
	Bstairs.enableBody = true;
	
	
	baddies = game.add.group();
	baddies.enableBody = true;
	baddies.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(baddies);
	this.createBaddies();
	baddies.x = 100;
    baddies.y = 50;
	

	player = game.add.sprite(game.world.width/2, game.world.height-75 , 'player'); 
	player.anchor.setTo(0.5);
	game.physics.arcade.enable(player);
	player.animations.add('walk', [1][2], 2, true);
	player.TURN_RATE = 5;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.allowRotation = false;
	
	cursors = game.input.keyboard.createCursorKeys();

	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(20, 'laser');
	lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers.setAll('checkWorldBounds', true);
	
	slasers = game.add.group();
	slasers.enableBody = true;
	slasers.physicsBodyType = Phaser.Physics.ARCADE;
	slasers.createMultiple(5, 'slaser');
	slasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetSLaser);
	slasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	slasers.setAll('checkWorldBounds', true);
	slasers.TURN_RATE = 5;
	
	blives = 3;
	kills = 3;
	
	timer = game.time.create(false);
	timer2 = game.time.create(false);
	
	toolbars = game.add.group();
	toolbars.enableBody = true;
	var toolbar = toolbars.create(700, 550, 'Toolbar');
	toolbar.body.immovable = true;
	QLpic = game.add.sprite(705, 555, 'QLskill');
	ELpic = game.add.sprite(755, 555, 'ELskill');
	Qpic = game.add.sprite(705, 555, 'Qskill');
	Epic = game.add.sprite(755, 555, 'Eskill');
	
	alreadyDone = 1;
	alreadyDone2 = 1;
},

update:function() {
	
	game.debug.text("Press Q to fire beam (15 sec cooldown)" , 250, 550);
	game.debug.text("Kill all baddies to unlock stairs", 270, 570);
	
	rotatePlayer();
	baddies.forEach(this.rotateBaddie, this);
	
	game.physics.arcade.overlap(lasers, baddies, killBaddie, null, this);
	game.physics.arcade.overlap(slaser, baddies, killBaddie2, null, this);
	game.physics.arcade.collide(player, blocks);
	game.physics.arcade.collide(player, toolbars);
	
	if (totalTimer >= 1 && alreadyDone == 1){
		Epic = game.add.sprite(755, 555, 'Eskill');
		skill1Ready = 1;
		alreadyDone = 0;
		timer.destroy();
		ELpic.destroy()
	}
	
	if (totalTimer2 >= 1 && alreadyDone2 == 1){
		Qpic = game.add.sprite(705, 555, 'Qskill');
		skill2Ready = 1;
		alreadyDone2 = 0;
		timer2.destroy();
		QLpic.destroy()
	}
	
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
	
	game.physics.arcade.collide(baddies);
	// Loop over the keys
	
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
	
	if (key6.isDown && skill2Ready == 1)
	{
		//do this
		fireSLaser();
		rotateSLaser();
		QLpic = game.add.sprite(705, 555, 'QLskill');
		skill2Ready = 0;
		totalTimer2 = 0;
		Qpic.destroy();
		alreadyDone2 += 1;
	}
	else {
		timer2.loop(15000, updateCounter2, this);
		timer2.start();
		
	}
	
	if (baddies.countLiving() == 0){
        Bstairs.destroy();
		stairs = game.add.sprite(360, 0, 'stairs');
		stairs.enableBody = true;
		stairs.physicsBodyType = Phaser.Physics.ARCADE;
		game.physics.arcade.enable(stairs);
		stageTF = 1;
    }
	
	if (stageTF == 1){
		game.physics.arcade.overlap(player, stairs, this.stageTF, null, this);
	}
},	
	
createBaddies: function() {
	for (var i = 0; i < 5; i++) 
	{
    baddie = baddies.create(300, 80*i, 'baddie');
	baddie.lives = 3;
    baddie.body.velocity.x = 0;
	baddie.body.velocity.y = 0;
	baddie.anchor.setTo(0.5);
   	}	
},	

rotateBaddie: function(baddie) {
	baddie.rotation = game.physics.arcade.angleBetween(baddie, player);
},

stageTF: function() {
	baddies.destroy()
	lasers.destroy()
	blocks.destroy()
	slasers.destroy()
	game.state.start('gameTF');
},	
}

function killBaddie2(slaser,baddie) {
	baddie.lives -= 4;
	slaser.kills -= 1;
	
	if (baddie.lives < 1){
	baddie.kill();
	}
	
	if (slaser.blives < 1) {
	slaser.kill();
	}
}

function resetSLaser(slaser) {
	slaser.kill();
}

function fireSLaser() {
	
    this.slaser = slasers.getFirstDead();
	this.slaser.reset(player.x - 8, player.y - 8);
	this.slaser.kills = 3;
    game.physics.arcade.moveToPointer(this.slaser, 400);
    
}