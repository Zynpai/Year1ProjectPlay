var gameState2 = {
	
create: function(){
	stage3 = 0;
	dragging = false;
	fireRate = 300;
	nextFire = 0;
	totalTimer = 1;
	totalTimer2 = 1;
	skill1Ready = 1;
	skill2Ready = 1;
	firingTimer = 0;
	firingTimerE = 2000;
	lives = 4;
	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	key5 = game.input.keyboard.addKey(Phaser.Keyboard.E);
	key6 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	key7 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
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
	game.world.setBounds(0,0,770,570);
	player.body.collideWorldBounds=true;
	
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(50, 'laser');
	lasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers.setAll('checkWorldBounds', true);
	
	slasers = game.add.group();
	slasers.enableBody = true;
	slasers.physicsBodyType = Phaser.Physics.ARCADE;
	slasers.createMultiple(50, 'slaser');
	slasers.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetSLaser);
	slasers.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	slasers.setAll('checkWorldBounds', true);
	slasers.TURN_RATE = 5;
	
	this.sbaddies = game.add.group();
	this.sbaddies.enableBody = true;
	this.sbaddies.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(this.sbaddies);
	this.createSBaddies();
	
	enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'elaser')
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
	
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
	
update: function(){
		
	rotatePlayer();
	
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
		player.rotation = game.physics.arcade.moveToPointer(player, 10000);
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
	
	if (key7.isDown && skill1Ready == 1)
	{
		//do this
		player.rotation = game.physics.arcade.moveToPointer(player, 10000);
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
	rotatePlayer();
	this.sbaddies.forEach(this.rotateSBaddie, this);
	
	game.physics.arcade.overlap(enemyBullets, player, collisionHandler3, null, this);
	game.physics.arcade.overlap(lasers, blocks, collisionHandler, null, this);
	game.physics.arcade.overlap(lasers, this.sbaddies, killSBaddie, null, this);
	game.physics.arcade.overlap(slasers, this.sbaddies, killSBaddie2, null, this);
	
	game.physics.arcade.collide(player, blocks);
	game.physics.arcade.collide(player, toolbars);
		
	if (game.time.now > firingTimerE){
       this.sbaddies.forEach(enemyFires, this);
    }
	
	if (this.sbaddies.countLiving() == 0){
        Bstairs.destroy();
		stairs = game.add.sprite(360, 0, 'stairs');
		stairs.enableBody = true;
		stairs.physicsBodyType = Phaser.Physics.ARCADE;
		game.physics.arcade.enable(stairs);
		stage3 = 1;
    }
	
	if (stage3 == 1){
		game.physics.arcade.overlap(player, stairs, this.stage3R, null, this);
	}

},

createSBaddies: function() {
	for (var i = 1; i < 8; i++) 
	{
    sbaddie = this.sbaddies.create(i * 100, 80, 'sbaddie');
	sbaddie.lives = 4;
    sbaddie.body.velocity.x = 0;
	sbaddie.body.velocity.y = 0;
	sbaddie.anchor.setTo(0.1, 0.5);
   	}
	for (var i = 1; i < 8; i++) 
	{
    sbaddie = this.sbaddies.create(i * 100, 160, 'sbaddie');
	sbaddie.lives = 4;
    sbaddie.body.velocity.x = 0;
	sbaddie.body.velocity.y = 0;
	sbaddie.anchor.setTo(0.1, 0.5);
   	}

},

rotateSBaddie: function(sbaddie) {
	sbaddie.rotation = game.physics.arcade.angleBetween(sbaddie, player);
},

stage3R: function(){
	player.destroy()	
	lasers.destroy()
	slasers.destroy()
	this.sbaddies.destroy()
	enemyBullets.destroy
	blocks.destroy()
	game.state.start('gameB');
},

	
}	
