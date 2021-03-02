import Scene from '../../../core/scenes/Scene';
import JupiterSchema from '../../../core/models/schemas/planets/JupiterSchema';
import NeptuneSchema from '../../../core/models/schemas/planets/NeptuneSchema';
import SaturneSchema from '../../../core/models/schemas/planets/SaturneSchema';
import MarsSchema from '../../../core/models/schemas/planets/MarsSchema';
import VenusSchema from '../../../core/models/schemas/planets/VenusSchema';
import Astro from '../../../core/models/players/Astro';

export default class LevelScene extends Scene {
  config = {
    key: 'LevelScene',
  };

  constructor(core) {
    super(core, LevelScene.config);
    this.core = core;
    this.players = [];
    this.players.push(new Astro(this, "jojo (space)", Phaser.Input.Keyboard.KeyCodes.SPACE));
    this.players.push(new Astro(this, "alexis (V)", Phaser.Input.Keyboard.KeyCodes.V));
    this.players.push(new Astro(this, "anne-laure(B)", Phaser.Input.Keyboard.KeyCodes.B));
    this.players.push(new Astro(this, "alexeis (N)", Phaser.Input.Keyboard.KeyCodes.N));
    this.players.push(new Astro(this, "mathieu (G)", Phaser.Input.Keyboard.KeyCodes.G));
    this.cursors = null;
    this.currentLevel = 0;
    this.levels = [
      new VenusSchema(this),
      new SaturneSchema(this),
      new NeptuneSchema(this),
      new JupiterSchema(this),
      new MarsSchema(this),
    ];
    this.core.models.user.setPlayer(this.players);
  }

  scenePreload = () => {
    this.load.svg('star', 'assets/svg/star.svg', {
      width: 25,
      height: 25,
    });
    this.load.spritesheet('click-tuto', './assets/sprites/click-tuto.png', {
      width: 64,
      height: 64,
      frameWidth: 64,
      frameHeight: 64,
    });
  };

  sceneCreate = () => {
    for (let player of this.players) {
      player.resetLevel();
    }
    this.setBackground(this.core.defines.blue);
    this.cursors = this.input.keyboard.createCursorKeys();
    let nbByline = Math.ceil(this.players.length / 2);
    let div = 1;
    if (nbByline > 2) {
      div = nbByline - 1;
    }
    let multX = (this.core.options.config.width - 200) / div; 
    for (let i = 0; i < this.players.length; i++) {
      let x = 0 + multX * Math.floor(i / 2);
      let y = 0 + i % 2 * (this.core.options.config.height - 80);

      let imagePlayer = this.add.sprite(
        x + 20,
        y + 20,
        this.players[i].spriteIndex, 
        14
      )
      imagePlayer.scale = 0.5;
      imagePlayer.scrollFactorX = 0;
      imagePlayer.scrollFactorY = 0;

      let labelName = this.add.text(
        x + 40,
        y + 4,
        this.players[i].name, {
          font: '30px Arial',
          fill: this.core.defines.green,
        },
      );
      labelName.scrollFactorX = 0;
      labelName.scrollFactorY = 0;

      this.players[i].labelScore = this.add.text(
        x + 40,
        y + 44,
        this.players[i].getCurrentScore(), {
          font: '30px Arial',
          fill: this.core.defines.green,
        },
      );
      this.players[i].labelScore.scrollFactorX = 0;
      this.players[i].labelScore.scrollFactorY = 0;
      this.star = this.add.image(
        x + 20,
        y + 60,
        'star',
      );
      this.star.scrollFactorX = 0;
      this.star.scrollFactorY = 0;
    }

    for (let player of this.players) {
      player.sprite.setPosition(
        64,
        this.levels[this.currentLevel].height() - (16 * 5),
      );  
    }
    this.cameras.main.setBounds(
      0,
      0,
      this.levels[this.currentLevel].width(),
      this.levels[this.currentLevel].height(),
    );

    this.followPlayerAlive();

    // Tuto
    this.anims.create({
      key: 'click-tuto',
      frames: this.anims.generateFrameNumbers('click-tuto', { start: 0, end: 3 }),
      duration: 1000,
      repeat: -1,
    });
    this.clickTuto = this.add.sprite(
      64 * 2,
      this.levels[this.currentLevel].height() - (16 * 15),
      'click-tuto',
    );
    this.clickTuto.play('click-tuto');
    // this.cameras.main.setZoom(1);
  };

  sceneUpdate = () => {
  };
}
