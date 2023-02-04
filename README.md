# In the Dark (Phaser 3 Game)
My first Phaser 3 game (yey! :D)

## ABOUT

Yes, this is my first game in Phaser 3. A basic platformer where you collect ores.
At first, this was going to be a story-based game. You got the ores for your greedy friend, and there was a 'y/n' [dialog system](src/Dialog.ts) where you could control whether you gave the ores to your friend or not...which I couldn't get to work bc i suck ;-;

Preview:\
![Gameplay Footage](preview.gif)

## BUILDING
If you want to build the game from source, follow these steps.

### Prerequisites:
You're going to want to make sure you have these installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

First, open Git and run this
```
git clone https://github.com/PurpleP-Ink/in-the-dark.git
```
this command will get this repository and put it onto your computer.

Now, navigate into the repository by using this command: `cd in-the-dark` and run this command:

```
npm install
```
this command will install all the modules this game needs to work.

After you've done all of that, run this command.
```
npm start build
```
You should get an output like this:
```
> in-the-dark@1.0.0 start
> parcel index.html --open build

Server running at http://localhost:1234
✨ Built in 6.45s

```
A folder called 'dist' will be created, which contains the built game.

You can then play the game by going to http://localhost:1234 (the webserver Parcel created)
or put the generated 'dist' folder in a web server which you can make with [this VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

or if you don't use VSCode, create one [with Python](https://pythonbasics.org/webserver/)

## CREDITS

- [16x16 Industrial Tileset by 0x72](https://0x72.itch.io/16x16-industrial-tileset)

- [Level up, Power Up, Coin Get Sound FX by wobbleboxx](https://opengameart.org/content/level-up-power-up-coin-get-13-sounds)

## LICENCE

[Apache Licence 2.0](https://choosealicense.com/licenses/apache-2.0/)
