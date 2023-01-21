import Phaser from "phaser";
import GameScene from "./GameScene";
import Preloader from "./Preloader";
import MenuScene from "./MenuScene";

const config = 
{
    type: Phaser.AUTO,
    parent: "game",
    width: 640,
    height: 480,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Preloader, MenuScene, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300}
        }
    }
};

new Phaser.Game(config);