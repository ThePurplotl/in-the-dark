import Phaser from "phaser";

const SPEED:number = 50;

let level:Phaser.Tilemaps.Tilemap;
let cursors:Phaser.Types.Input.Keyboard.CursorKeys;
let alreadyPressed:boolean = false;

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(readonly scene:Phaser.Scene, x:number, y:number, _level:Phaser.Tilemaps.Tilemap)
    {
        super(scene, x, y, "dude");

        this.anims.play("idle");

        level = _level;
        cursors = this.scene.input.keyboard.createCursorKeys();
    }

    preUpdate(time:number, delta:number):void 
    {
        super.preUpdate(time, delta);

        // movement stuff 
        if (cursors.left.isDown || cursors.right.isDown)
        {
            if (alreadyPressed === false)
            {
                this.anims.play("walk");
                alreadyPressed = true;
            }

            if ((cursors.up.isDown || cursors.space.isDown) && this.body.blocked.down)
            {
                this.setVelocityY(-160);
            }
        }
        else
        {
            if (alreadyPressed === true)
            {
                this.anims.play("idle");
                alreadyPressed = false
            }
        }

        if (cursors.left.isDown)
        {
            this.setVelocityX(-SPEED);
            this.setFlipX(true);
        }
        else if (cursors.right.isDown)
        {
            this.setVelocityX(SPEED);
            this.setFlipX(false);
        }
        else if ((cursors.up.isDown || cursors.space.isDown) && this.body.blocked.down)
        {
            this.setVelocityY(-160);
        }
        else
        {
            alreadyPressed = false;

            this.setVelocityX(0);
        }

        // stop the player from going off the map

        if (this.x - this.width < 0)
        {
            this.setX(this.width);
        }
        else if (this.x + this.width > level.widthInPixels)
        {
            this.setX(level.widthInPixels - this.width);
        }
        else if (this.y < 0)
        {
            this.setY(0);
        }

        if (cursors.shift.isDown && alreadyPressed === false)
        {
            let xAndY = this.x + ", " + this.y;

            const copy = async () => 
            {
                try
                {
                    await navigator.clipboard.writeText(xAndY);
                    alert(xAndY);
                }
                catch (e)
                {
                    console.error("Failed to copy: " + e);
                } 
            }

            copy();

            alreadyPressed = true;
        }
    }
}