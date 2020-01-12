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
    this.player = new Astro(this);
    this.cursors = null;
    this.currentLevel = 0;
    this.levels = [
      new VenusSchema(this),
      new SaturneSchema(this),
      new NeptuneSchema(this),
      new JupiterSchema(this),
      new MarsSchema(this),
    ];
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
    this.core.models.user.resetLevel();
    this.setBackground(this.core.defines.blue);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.labelScore = this.add.text(
      40,
      4,
      this.core.models.user.getCurrentScore(), {
        font: '30px Arial',
        fill: this.core.defines.green,
      },
    );
    this.labelScore.scrollFactorX = 0;
    this.labelScore.scrollFactorY = 0;
    this.star = this.add.image(
      20,
      20,
      'star',
    );
    this.star.scrollFactorX = 0;
    this.star.scrollFactorY = 0;


    this.player.sprite.setPosition(
      64,
      this.levels[this.currentLevel].height() - (16 * 5),
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.levels[this.currentLevel].width(),
      this.levels[this.currentLevel].height(),
    );
    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08,
      -1 * (this.core.options.config.width / 3),
      0,
    );

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
