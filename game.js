var config = {
    width: 800,
    height: 600,
    backgroundcolor: '0xFFFFFF',
    scene: [Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, EndScene],
    physics: {
        default: 'matter',
        matter:{
            gravity: { y: 1.3 },
            debug: false,
        }
    }

}

var game = new Phaser.Game(config);


