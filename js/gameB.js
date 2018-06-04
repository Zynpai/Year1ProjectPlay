var winReady;
var startTimer;
var timer5;
var totalTimer5;
var alreadyDone11;
var alreadyDone12;

var gameStateB = {

create: function(){
	dragging = false;
	fireRate = 300;
	nextFire = 0;
	totalTimer = 1;
	totalTimer2 = 1;
	skill1Ready = 1;
	skill2Ready = 1;
	firingTimer = 0;
	startTimer = 0;
	winReady = 0;
	
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
	
	boss = game.add.group();
	boss.enableBody = true;
	boss.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.arcade.enable(boss);
	game.physics.enable(boss, Phaser.Physics.ARCADE);
	bossNF = game.add.sprite(75, -10, 'bossNF');
	
	blasers = game.add.group();
    blasers.enableBody = true;
    blasers.physicsBodyType = Phaser.Physics.ARCADE;
    blasers.createMultiple(10, 'blaser')
    blasers.setAll('anchor.x', 0.5);
    blasers.setAll('anchor.y', 1);
    blasers.setAll('outOfBoundsKill', true);
    blasers.setAll('checkWorldBounds', true);
	timer3 = game.time.create(false);
	timer4 = game.time.create(false);
	totalTimer3 = 0;
	totalTimer4 = 0;
	totalTimer5 = 0
	alreadyDone3 = 0;
	alreadyDone4 = 0;
	alreadyDone5 = 0;
	alreadyDone6 = 0;
	alreadyDone7 = 0;
	alreadyDone8 = 0;
	alreadyDone9 = 0;
	alreadyDone10 = 0;
	alreadyDone11 = 0;
	alreadyDone12 = 0;
	bossLives = 100;
	animation = 0;
	animation2 = 0;
	bflames  = game.add.group();
	bflames.enableBody = true;
	
	player = game.add.sprite(game.world.width/2, game.world.height-75 , 'player'); 
	player.anchor.setTo(0.5);
	game.physics.arcade.enable(player);
	player.animations.add('walk', [1][2], 2, true);
	player.TURN_RATE = 5;
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.allowRotation = false;
	game.world.setBounds(0,0,770,570);
	player.body.collideWorldBounds=true;
	
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
	
	timer = game.time.create(false);
	timer2 = game.time.create(false);
	timer5 = game.time.create(false);
	
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
	
	game.add.sprite(0, 0, 'gb');
	var barConfig = {x: 400, y: 50};
	this.myHealthBar = new HealthBar(this.game, barConfig);
},

update: function(){
	rotatePlayer();
	
	this.myHealthBar.setPercent(bossLives); 
	
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
		skill2Ready = 0;
		rotateSLaser();
		QLpic = game.add.sprite(705, 555, 'QLskill');
		totalTimer2 = 0;
		Qpic.destroy();
		alreadyDone2 += 1;
	}
	else {
		timer2.loop(15000, updateCounter2, this);
		timer2.start();
		
	}

	if (bossLives > 0){
	game.physics.arcade.overlap(player, boss, collisionHandler4, null, this);
	}
	game.physics.arcade.overlap(player, blasers, collisionHandler5, null, this);
	game.physics.arcade.overlap(player, bflames, collisionHandler6, null, this);
	
	game.physics.arcade.collide(player, toolbars);
	game.physics.arcade.collide(player, Bstairs);
	game.physics.arcade.collide(player, blocks);
	
	if (winReady == 1){
		timer5.destroy();
		player.destroy()
		lasers.destroy()
		slasers.destroy()
		blasers.destroy()
		game.state.start('gameWin');
	}
	
	if (bossLives <= 0){
		this.killBoss();
	}	
	
	if (bossLives <= 75 && alreadyDone4 < 10){
		if (animation == 1 && alreadyDone4 == 0){
		alreadyDone8 = 1;
		boss.x = 5;
		alreadyDone4 += 1;
		}
		if (animation == 2 && alreadyDone4 == 1){
		boss.x = 10;
		alreadyDone4 += 1;
		}
		if (animation == 3 && alreadyDone4 == 2){
		boss.x= 15;
		alreadyDone4 += 1;
		}
		if (animation == 3 && alreadyDone4 == 3){
		boss.x= 20;
		alreadyDone4 += 1;
		}
		if (animation == 4 && alreadyDone4 == 4){
		boss.x= 25;
		alreadyDone4 += 1;
		}
		if (animation == 5 && alreadyDone4 == 5){
		boss.x = 20;
		alreadyDone4 += 1;
		}
		if (animation == 6 && alreadyDone4 == 6){
		boss.x = 15;
		alreadyDone4 += 1;
		}
		if (animation == 7 && alreadyDone4 == 7){
		boss.x= 10;
		alreadyDone4 += 1;
		}
		if (animation == 8 && alreadyDone4 == 8){
		boss.x= 5;
		alreadyDone4 += 1;
		}
		if (animation == 9 && alreadyDone4 == 9){
		boss.x= 0;
		timer3.destroy();
		alreadyDone4 += 1;
		animation = 0;
		}
	}  
	
	if (alreadyDone6 < 7 && alreadyDone7 == 1){
		bossNF.destroy()
		bossF = boss.create(75, -10, 'bossF');
		alreadyDone12 = 1;
		bossF.enableBody = true;
		if (animation2 == 1 && alreadyDone6 == 0){
		bflame1 = bflames.create(210, 230,'bossF1');
		alreadyDone6 += 1;
		}
		if (animation2 == 2 && alreadyDone6 == 1){
		bflame2 = bflames.create(210, 230,'bossF2');
		bflame1.destroy()
		alreadyDone6 += 1;
		}
		if (animation2 == 3 && alreadyDone6 == 2){
		bflame1 = bflames.create(210, 230,'bossF1');
		bflame2.destroy()
		alreadyDone6 += 1;
		}
		if (animation2 == 4 && alreadyDone6 == 3){
		bflame2 = bflames.create(210, 230,'bossF2');
		bflame1.destroy()
		alreadyDone6 += 1;
		}
		if (animation2 == 5 && alreadyDone6 == 4){
		bflame1 = bflames.create(210, 230,'bossF1');
		bflame2.destroy()
		alreadyDone6 += 1;
		}
		if (animation2 == 6 && alreadyDone6 == 5){
		bflame2 = bflames.create(210, 230,'bossF2');
		bflame1.destroy()
		alreadyDone6 += 1;
		}
		if (animation == 7 && alreadyDone6 == 6){
		bflame1 = bflames.create(210, 230,'bossF1');
		bflame2.destroy()
		alreadyDone6 += 1;
		animation2 = 0;
		alreadyDone12 = 1;
		}
	}	

	if (bossLives <= 25 && alreadyDone9 < 10){
		if (animation == 1 && alreadyDone9 == 0){
		alreadyDone8 = alreadyDone8 + 1;
		boss.x = 5;
		alreadyDone9 += 1;
		}
		if (animation == 2 && alreadyDone9 == 1){
		boss.x = 10;
		alreadyDone9 += 1;
		}
		if (animation == 3 && alreadyDone9 == 2){
		boss.x= 15;
		alreadyDone9 += 1;
		}
		if (animation == 3 && alreadyDone9 == 3){
		boss.x= 20;
		alreadyDone9 += 1;
		}
		if (animation == 4 && alreadyDone9 == 4){
		boss.x= 25;
		alreadyDone9 += 1;
		}
		if (animation == 5 && alreadyDone9 == 5){
		boss.x = 20;
		alreadyDone9 += 1;
		}
		if (animation == 6 && alreadyDone9 == 6){
		boss.x = 15;
		alreadyDone9 += 1;
		}
		if (animation == 7 && alreadyDone9 == 7){
		boss.x= 10;
		alreadyDone9 += 1;
		}
		if (animation == 8 && alreadyDone9 == 8){
		boss.x= 5;
		alreadyDone9 += 1;
		}
		if (animation == 9 && alreadyDone9 == 9){
		boss.x= 0;
		timer3.destroy();
		alreadyDone9 += 1;
		}
	}  
	
	if (alreadyDone10 < 7 && alreadyDone7 == 2){
		bossNF.destroy()
		bossF = boss.create(75, -10, 'bossF');
		alreadyDone12 = 1;
		bossF.enableBody = true;
		if (animation2 == 1 && alreadyDone10 == 0){
		bflame1 = bflames.create(210, 230,'bossF1');
		alreadyDone10 += 1;
		}
		if (animation2 == 2 && alreadyDone10 == 1){
		bflame2 = bflames.create(210, 230,'bossF2');
		bflame1.destroy()
		alreadyDone10 += 1;
		}
		if (animation2 == 3 && alreadyDone10 == 2){
		bflame1 = bflames.create(210, 230,'bossF1');
		bflame2.destroy()
		alreadyDone10 += 1;
		}
		if (animation2 == 4 && alreadyDone10 == 3){
		bflame2 = bflames.create(210, 230,'bossF2');
		bflame1.destroy()
		alreadyDone10 += 1;
		}
		if (animation2 == 5 && alreadyDone10 == 4){
		bflame1 = bflames.create(210, 230,'bossF1');
		bflame2.destroy()
		alreadyDone10 += 1;
		}
		if (animation2 == 6 && alreadyDone10 == 5){
		bflame2 = bflames.create(210, 230,'bossF2');
		bflame1.destroy()
		alreadyDone10 += 1;
		alreadyDone12 = 2;
		}
		if (animation == 7 && alreadyDone10 == 6){
		bflame1 = bflames.create(210, 230,'bossF1');
		bflame2.destroy()
		alreadyDone10 += 1;
		}
	}	
	
	
	if ((alreadyDone7 == 0 && alreadyDone4 == 10) || (alreadyDone7 == 1 && alreadyDone9 == 10)){
		timer4.loop(700, updateCounter4, this);
		timer4.start();	
		alreadyDone7 += 1;
	}	
	
	if (alreadyDone6 == 6){
		alreadyDone8 = 0;
		bflame2.destroy()
		timer4.destroy();
	}	
	
	if (alreadyDone10 == 6){
		alreadyDone10 = 0;
		bflames.destroy()	
		timer4.destroy();
	}	
	
	
	if (game.time.now > firingTimerB && alreadyDone8 == 0 && alreadyDone10 == 0 && bossLives > 0){
		if (alreadyDone12 == 2){
	    bossF.destroy()
		alreadyDone12 = 0;
		}
	    bossF = boss.create(75, -10, 'bossF');
	    bossF.enableBody = true;
	    bossNF.destroy()
        bossFire();
    }
	else{
	    bossNF = boss.create(75, -10, 'bossNF');
	    bossNF.enableBody = true;
	    bossF.destroy()
	}
	
	if (alreadyDone3 == 1 && bossLives > 0){
	alreadyDone3 = 0;
	}
	if (alreadyDone3 == 0){
	game.physics.arcade.overlap(lasers, boss, damageBoss, null, this);
	}
	
	if (alreadyDone11 == 1 && bossLives > 0){
	alreadyDone11 = 0;
	}
	if (alreadyDone11 == 0){
	game.physics.arcade.overlap(slasers, boss, damageBoss2, null, this);
	}
	
	if ((bossLives <= 75 && alreadyDone5 == 0) || (bossLives <= 25 && alreadyDone5 == 1)){
		timer3.loop(100, updateCounter3, this);
		timer3.start();	
		alreadyDone5 += 1;
	}
	
	
	if (startTimer == 1){
		timer5.loop(10000, updateCounter5, this);
		timer5.start();	
	}
	
	//game.debug.text("Boss HP: " + bossLives , 32, 32);
;	
},	

killBoss: function(){
	game.add.tween(boss).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
	startTimer = 1;
},	
}	

function updateCounter5() {
totalTimer5++
if (totalTimer5 == 5){
winReady = 1;
}	
}	
