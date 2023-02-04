import Phaser from "phaser";

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super("Preloader");
    }

    preload()
    {
        // create a loading bar
        var progress = this.add.graphics();

        this.load.on("progress", function(value)
        {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);
        });

        this.load.on('complete', function () 
        {
            progress.destroy();
        });

        // load da stuff

        this.load.image("bad-end", "assets/images/bad-end.png");
        this.load.image("chat-bubble", "assets/images/chat-bubble.png");
        this.load.image("good-end", "assets/images/good-end.png");
        this.load.spritesheet("dude", "assets/images/dude.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("ore", "assets/images/ore.png", {frameWidth: 13, frameHeight: 13});
        this.load.spritesheet("yellow-ore", "assets/images/yellow-ore.png", {frameWidth: 13, frameHeight: 13});
        this.load.image("logo", "assets/images/logo.png");

        this.load.bitmapFont("retro", "assets/data/fonts/Retro_Gaming.png", "assets/data/fonts/Retro_Gaming.xml");

        this.load.text("ask-for-ore", "assets/data/dialog/ask-for-ore.txt");
        this.load.text("ore-get", "assets/data/dialog/ore-get.txt");

        this.load.image("industrial", "assets/data/tilemaps/level/industrial.v1.png");
        this.load.tilemapTiledJSON("level", "assets/data/tilemaps/level/level.json");

        this.load.audio("cavernous", "assets/music/cavernous.mp3");
        this.load.audio("ending", "assets/music/ending.mp3");
        this.load.audio("main-menu", "assets/music/main-menu.mp3");

        this.load.audio("collect", "assets/sounds/collect.mp3");
        this.load.audio("epic-collect", "assets/sounds/epic-collect.mp3");
    }

    create()
    {
        // create animations

        this.anims.create({
            key: "ore-spin",
            frames: this.anims.generateFrameNumbers("ore", {
                start: 0, end: 10
            }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: "gold-ore-spin",
            frames: this.anims.generateFrameNumbers("yellow-ore", {
                start: 0, end: 10
            }),
            frameRate: 16,
            repeat: -1
        });
        
        this.anims.create({
            key: "idle", 
            frames: this.anims.generateFrameNumbers("dude", {start: -1, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("dude", {start: 4, end: 11}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start("MenuScene");
    }
}