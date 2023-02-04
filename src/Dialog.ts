// brocken dialog system

import Phaser from "phaser";

let dialog:string;
let dialogLines:string[];
let currentLine:number = 0;
let currentDialogLine:string;
let canGoForward:boolean = true;

let dialogBox:Phaser.GameObjects.Image;
let dialogText:Phaser.GameObjects.BitmapText;

export default class Dialog extends Phaser.Scene
{
    init(data)
    {
        dialog = data.dialog;
    }

    constructor(_dialog:string)
    {
        super("Dialog");
    }

    create()
    {
        // split the given dialog string
        dialogLines = dialog.split(";");

        dialogBox = this.add.image(this.sys.renderer.width / 2, 0, "chat-bubble");
        dialogBox.setY(this.sys.renderer.height - dialogBox.height);

        dialogText = this.add.bitmapText(dialogBox.x - dialogBox.width / 2 + 10, dialogBox.y - 50, "retro", "", 25);

        this.input.keyboard.on("keydown-ENTER", () =>
        {
            if (canGoForward)
            {
                currentDialogLine = dialogLines[currentLine].replace("/n", "\n");
                dialogText.text = currentDialogLine;

                currentLine += 1;
            }

            // y/n system (WHICH I CANT GET TO WORK >:C)
            if (currentDialogLine.includes("y-n"))
            {
                if (canGoForward)
                {
                    canGoForward = false;
                }

                this.input.keyboard.on("keydown-Y", () =>
                {
                    let newDialogLines:string[] = [];

                    for (let i = 0; i < dialogLines.length; i++) 
                    {
                        let line:string = "";

                        if (dialogLines[i].includes("/#1"))
                        {
                            line = dialogLines[i].replace("/#1", "");
                        }
                        
                        newDialogLines.push(line);
                    }

                    dialogLines.splice(0, dialogLines.length);

                    for (let i = 0; i < newDialogLines.length; i++)
                    {
                        dialogLines.push(newDialogLines[i]);
                    }

                    canGoForward = true;
                });
            }
        });
    }

    update(time:number, delta:number):void 
    {
        // if there are no more lines to read, exit (doesnt work)
        if (currentLine > dialogLines.length)
        {
            this.scene.stop();
        }
    }
}