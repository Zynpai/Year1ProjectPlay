

var gameState = {

init: function() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}, 

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

update: function() {
		
	rotatePlayer();
	game.physics.arcade.collide(baddies);
	
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
	
	baddies.forEach(Attack, this);

	
	game.physics.arcade.overlap(lasers, baddies, killBaddie, null, this);
	game.physics.arcade.overlap(slaser, baddies, killBaddie2, null, this);
	game.physics.arcade.overlap(lasers, blocks, collisionHandler, null, this);
	game.physics.arcade.overlap(player, baddies, collisionHandler2, null, this);
	
	game.physics.arcade.collide(baddies);
	game.physics.arcade.collide(player, blocks);
	game.physics.arcade.collide(baddies, blocks);
	game.physics.arcade.collide(player, Bstairs);
	game.physics.arcade.collide(baddies, Bstairs);
	game.physics.arcade.collide(player, toolbars);
	game.physics.arcade.collide(baddie, toolbars);
	
	if (baddies.countLiving() == 0){
        Bstairs.destroy();
		stairs = game.add.sprite(360, 0, 'stairs');
		stairs.enableBody = true;
		stairs.physicsBodyType = Phaser.Physics.ARCADE;
		game.physics.arcade.enable(stairs);
		stage2 = 1;
    }
	
	if (stage2 == 1){
		game.physics.arcade.overlap(player, stairs, this.stage2R, null, this);
	}
	
	baddies.forEach(this.rotateBaddie, this);
	game.physics.arcade.collide(baddies);

},

stage2R: function(){
	player.destroy()
	stairs.destroy()
	lasers.destroy()
	baddies.destroy()
	slasers.destroy()
	blocks.destroy()
	game.state.start('game2');
},

createBaddies: function() {
	for (var i = 0; i < 7; i++) 
	{
    baddie = baddies.create(i * 100, 10, 'baddie');
	baddie.lives = 3;
    baddie.body.velocity.x = 0;
	baddie.body.velocity.y = 0;
	baddie.anchor.setTo(0.5);
   	}
},

rotateBaddie: function(baddie) {
	baddie.rotation = game.physics.arcade.angleBetween(baddie, player);
},
}

function Attack(baddie) {
	
	if (!(baddie.body.x + 500 < player.body.x || baddie.body.x - 500 > player.body.x) && !(baddie.body.y + 500 < player.body.y || baddie.body.y - 500> player.body.y )){
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

function bossFire() {
	blaser = blasers.getFirstExists(false);
	blaser.reset(boss.x + 405, boss.y +300);

	if (bossLives <= 10){
	game.physics.arcade.moveToObject(blaser,player,400);
	firingTimerB = game.time.now + 3000;
	}
	else{
    game.physics.arcade.moveToObject(blaser,player,600);
	firingTimerB = game.time.now + 5000;
	}
}	

function rotateSLaser() {
	
	targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
        this.slaser.x, this.slaser.y,
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
            slaser.angle = targetAngle;
        }
	
}



function updateCounter2() {
	totalTimer2++;
}

function updateCounter3() {
	totalTimer3++;	
	animation++;
}

function updateCounter4() {
	totalTimer4++;	
	animation2++;
}

function resetLaser(laser) {
	laser.kill();
	
}


function enemyFires(sbaddies) {
	
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    this.sbaddies.forEachAlive(function(sbaddie){

        // put every living enemy in an array
        livingEnemies.push(sbaddie);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x , shooter.body.y + 52);

        game.physics.arcade.moveToObject(enemyBullet,player,500);
        firingTimerE = game.time.now + 2000;
    }

} 

function collisionHandler(laser) {
	laser.kill();
}

function collisionHandler2(){
	player.kill();
	game.state.start('gameOver');
}

function collisionHandler3(){
	player.kill();
	game.state.start('gameOver');
}

function collisionHandler4(){
	player.kill();
	game.state.start('gameOver');
}

function collisionHandler5(){
	player.kill();
	game.state.start('gameOver');
}

function collisionHandler6(){
	player.kill();
	game.state.start('gameOver');
}

function damageBoss(laser){
	laser.kill();
	if (alreadyDone3 == 0){
	bossLives = bossLives - 1;
	alreadyDone3 = 1;
	}
}

function damageBoss2(slaser){
	slaser.kill();
	if (alreadyDone3 == 0){
	bossLives = bossLives - 5;
	alreadyDone3 = 1;
	}
}	
