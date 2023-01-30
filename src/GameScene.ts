import Phaser from "phaser";
import Dialog from "./Dialog";
import Friend from "./Friend";
import Player from "./Player";

let player:Player;
let friend:Friend;

let actionKey:Phaser.Input.Keyboard.Key;

let level:Phaser.Tilemaps.Tilemap;
let levelTiles:Phaser.Tilemaps.Tileset;
let floor:Phaser.Tilemaps.TilemapLayer;
let pipes:Phaser.Tilemaps.TilemapLayer;
let signs:Phaser.Tilemaps.TilemapLayer;
let gates:Phaser.Tilemaps.TilemapLayer;
let crates:Phaser.Tilemaps.TilemapLayer;

let oreLayer;
let ores:Phaser.Physics.Arcade.StaticGroup;

let goldOreLayer;
let goldOres:Phaser.Physics.Arcade.StaticGroup;

let score:number = 0;
let scoreDisplay:Phaser.GameObjects.BitmapText;

let pressToChatText:Phaser.GameObjects.BitmapText;

export default class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super("GameScene");
    }

    create()
    {
        // setup level
        level = this.make.tilemap({key: "level"});
        levelTiles = level.addTilesetImage("industrial", "industrial");

        pipes = level.createLayer("Pipes", levelTiles);

        signs = level.createLayer("Signs", levelTiles);

        player = new Player(this, 50, 0, level);
        
        this.add.existing(player);
        this.physics.add.existing(player);

        friend = new Friend(this, 110, 40, level, player);

        this.add.existing(friend);
        this.physics.add.existing(friend);

        actionKey = this.input.keyboard.addKey("C");

        floor = level.createLayer("Floor", levelTiles, 0, 0);
        floor.setCollisionByProperty({collides: true});

        gates = level.createLayer("Gates", levelTiles);

        // add the ✨ores✨
        oreLayer = level.getObjectLayer("Ores")["objects"];
        ores = this.physics.add.staticGroup({key: "ore"});
        
        oreLayer.forEach(object =>
        {
            let obj = ores.create(object.x, object.y, "ore");
        
            obj.body.width = object.width; 
            obj.body.height = object.height;
            obj.body.setOffset(10, 10);
        });
        
        ores.playAnimation("ore-spin");
        
        goldOreLayer = level.getObjectLayer("GoldOres")["objects"];
        goldOres = this.physics.add.staticGroup({key: "goldOres"});
        
        goldOreLayer.forEach(object =>
        {
            let obj = goldOres.create(object.x, object.y, "yellow-ore");
        
            obj.body.width = object.width; 
            obj.body.height = object.height;
            obj.body.setOffset(10, 10);
        });
        
        goldOres.playAnimation("gold-ore-spin");

        crates = level.createLayer("Crates", levelTiles);
        crates.setCollisionByProperty({collides: true});

        scoreDisplay = this.add.bitmapText(this.cameras.main.centerX - this.sys.renderer.width / 10, this.cameras.main.centerY - this.sys.renderer.height / 10, "retro", "Score:\n" + score, 10).setScrollFactor(0);

        pressToChatText = this.add.bitmapText(this.cameras.main.centerX - this.sys.renderer.width / 10, this.cameras.main.centerY - this.sys.renderer.height / 10 + 30, "retro", "Press " + String.fromCharCode(actionKey.keyCode) + " to talk", 5).setScrollFactor(0);
        pressToChatText.setVisible(false);

        this.physics.add.collider(player, floor);
        this.physics.add.collider(friend, floor);
        this.physics.add.collider(player, crates);
        this.physics.add.overlap(player, ores, (player, ore) =>
        {
            ore.destroy();
            score++;
        }, undefined, this);

        this.physics.add.overlap(player, goldOres, (player, ore) =>
        {
            ore.destroy();
            score += 2;
        }, undefined, this);

        this.sound.play("cavernous", {loop: true});

        actionKey.on("down", () =>
        {
            if (this.physics.overlap(player, friend))
            {
                this.scene.launch("Dialog", {dialog: this.cache.text.get("ask-for-ore")});
            }
        });

        // make the camera follow the player
        this.cameras.main.setZoom(5);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, level.widthInPixels, level.heightInPixels);
        this.cameras.main.setBackgroundColor(0x121212);
    }

    update(time:number, delta:number):void 
    {
        if (player.y > level.heightInPixels + 10)
        {
            player.destroy();
            this.sound.stopAll();
            this.scene.restart();
        }

        scoreDisplay.text = "Score:\n" + score;

        if (this.physics.overlap(player, friend))
        {
            pressToChatText.setVisible(true);
        }
        else
        {
            pressToChatText.setVisible(false);
        }
    }
}