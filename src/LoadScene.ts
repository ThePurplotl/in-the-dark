import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super("LoadScene");
    }

    preload()
    {
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

        this.load.image("bad-end", "assets/images/bad-end.png");
        this.load.image("chat-bubble", "assets/images/chat-bubble.png");
        this.load.image("good-end", "assets/images/good-end.png");
        this.load.image("ore", "assets/images/ore.png");
        this.load.image("yellow-ore", "assets/images/yellow-ore.png");
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
    }

    create()
    {
        this.scene.start("MenuScene");
    }
}