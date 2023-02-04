import Phaser from "phaser";
import Player from "./Player";

let level:Phaser.Tilemaps.Tilemap;
let player:Player;

export default class Friend extends Phaser.Physics.Arcade.Sprite
{
    constructor(readonly scene:Phaser.Scene, x:number, y:number, _level:Phaser.Tilemaps.Tilemap, _player:Player)
    {
        super(scene, x, y, "dude");

        this.anims.play("idle");

        level = _level;
        player = _player;
    }
    
    preUpdate(time:number, delta:number)
    {
        super.preUpdate(time, delta);

        // stare at the player (creepy)

        if (player.x < this.x)
        {
            this.setFlipX(true);
        }
        else 
        {
            this.setFlipX(false);
        }
    }
}