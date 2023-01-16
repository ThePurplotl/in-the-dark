import Phaser from "phaser";
import LoadScene from "./LoadScene";
import MenuScene from "./MenuScene";

const config = 
{
    type: Phaser.AUTO,
    parent: "game",
    width: 640,
    height: 480,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [LoadScene, MenuScene],
    physics: {
        default: "arcade"
    }
};

new Phaser.Game(config);