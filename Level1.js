class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1');
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
        this.text = this.add.text(20, 20, 'LEVEL 1');
        this.text.on('pointerdown', function() {
            console.log('LEVEL')
        }, this)

        this.add.image(640, 410, 'target');

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

    }



    update() {
        
        if (this.playerMooving === true) {
            this.player.setVelocityX(1);
            this.playerPosition = 0;
            
        }

        if (this.player.x > 640) {
            this.scene.start('Level2');
        } 
    }
}