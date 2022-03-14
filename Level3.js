class Level3 extends Phaser.Scene {
    constructor() {
        super('Level3');
    }

    preload() {
        this.load.image('block', 'assets/square.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.json('shapes', 'assets/shapes.json');
        this.load.image('player', 'assets/player.png')
        this.load.image('target', 'assets/target.png')
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.add.text(20, 20, 'LEVEL 3');
        this.add.image(640, 410, 'target');


        this.matter.add.image(160, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(220, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(280, 460, 'block',null ,{ isStatic: true});
        this.matter.add.image(400, 460, 'block',null ,{ isStatic: true});
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

        this.inventorySquare2 = this.matter.add.image(260, 550, 'block');
        this.inventorySquare2.setInteractive();
        this.inventorySquare2.setStatic(true);
        this.inventorySquare2.on('pointerdown', function() {
            this.inventorySquare2.setStatic(false);
            this.inventorySquare2.setFixedRotation();
        }, this)
        this.inventorySquare2.on('pointerup', function() {
            this.inventorySquare2.setStatic(true);
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
            this.scene.start('Level4');
        } 
        if (this.player.y > 600) {
            this.scene.start('Level3');
        }
    

    
    }
}