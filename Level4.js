class Level4 extends Phaser.Scene {
    constructor() {
        super('Level4');
    }

    preload() {

        this.load.image('block', 'assets/square.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.json('shapes', 'assets/shapes.json');
        this.load.image('player', 'assets/player.png')
        this.load.image('right_triangle', 'assets/right_triangle.png')
        this.load.image('left_triangle', 'assets/left_triangle.png')
        this.load.image('target', 'assets/target.png')
    }

    create() {
        this.sky = this.add.image(400, 300, 'sky');
        this.add.text(20, 20, 'LEVEL 4');
        this.add.image(640, 350, 'target');

        this.matter.add.image(160, 400, 'block',null ,{ isStatic: true});
        this.matter.add.image(220, 400, 'block',null ,{ isStatic: true});
        this.matter.add.image(460, 400, 'block',null ,{ isStatic: true});
        this.matter.add.image(520, 400, 'block',null ,{ isStatic: true});
        this.matter.add.image(580, 400, 'block',null ,{ isStatic: true});
        this.matter.add.image(640, 400, 'block',null ,{ isStatic: true});
        this.matter.add.image(160, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(220, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(280, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(340, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(400, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(460, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(520, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(580, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(640, 460, 'block',null ,{ isStatic: true});

        this.shapes = this.cache.json.get('shapes');

        this.player = this.matter.add.sprite(160, 350,'player', null, { shape: this.shapes.player, ignorePointer: true})
        this.player.setInteractive();
        this.playerMooving = false
        this.playerCollisionEnd = 0;
        this.playerCollisionStart;
        this.playerCollisionTime;

        this.player.on('pointerdown', function() {
            this.playerMooving = true
        }, this)

        // Проверка на падение мячика. Мячик падает с кубика определенный диапазон времени.
        this.matter.world.on('collisionstart', function () {

            this.playerCollisionStart = Date.now();
            this.playerCollisionTime =  this.playerCollisionStart - this.playerCollisionEnd
            if (this.playerCollisionTime > 190 && this.playerCollisionTime < 250) {
                this.playerMooving = false;
                this.player.x = 160;
                this.player.y = 350;
            }
        }, this);

        this.matter.world.on('collisionend', function () {

            this.playerCollisionEnd = Date.now();
    
        }, this);


        this.right_triangle = this.matter.add.sprite(410, 411, 'right_triangle', null, { shape: this.shapes.right_triangle, isStatic: true}).setScale(1.2)
        

        this.inventorySquare = this.matter.add.image(175, 550, 'block');
        this.inventorySquare.setInteractive();
        this.inventorySquare.setStatic(true);
        this.inventorySquare.on('pointerdown', function() {
            this.inventorySquare.setStatic(false);
            this.inventorySquare.setFixedRotation();
        }, this)
        this.inventorySquare.on('pointerup', function() {
            this.inventorySquare.setStatic(true);
        }, this)

        this.inventoryLeftTriangle = this.matter.add.sprite(295, 560, 'left_triangle', null, { shape: this.shapes.left_triangle}).setScale(1.2);
        this.inventoryLeftTriangle.setInteractive();
        this.inventoryLeftTriangle.setStatic(true);
        
        this.inventoryLeftTriangle.on('pointerdown', function() {
            this.inventoryLeftTriangle.setStatic(false);
            this.inventoryLeftTriangle.setFixedRotation();
        }, this)
        this.inventoryLeftTriangle.on('pointerup', function() {
            this.inventoryLeftTriangle.setStatic(true);
        }, this)


        this.matter.add.mouseSpring({ length: 1, stiffness: 0.6 });
    }
    
    update() {
        if (this.playerMooving === true) {
            this.player.setVelocityX(1);
            this.playerPosition = 0;
            // Если игрок уперся в препятствие, раунд начинается заново.
            if (this.player.playerPosition === this.player.x) {
                this.scene.restart();
            } else {
                this.player.playerPosition = this.player.x
            }
        }

        if (this.player.x > 640) {
            this.scene.start('Level5');
        } 
        if (this.player.y > 600) {
            this.scene.start('Level4');
        }
    

    
    }
}