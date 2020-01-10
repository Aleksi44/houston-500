import Scene from '../../../core/scenes/Scene';
import VenusSchema from '../../../core/models/schemas/VenusSchema';
import MarsSchema from '../../../core/models/schemas/MarsSchema';
import JupiterSchema from '../../../core/models/schemas/JupiterSchema';

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
    this.score = 0;
    this.currentLevel = 0;
    this.levels = [
      new JupiterSchema(this),
      new VenusSchema(this),
      new MarsSchema(this),
    ];
  }

  scenePreload = () => {
  };

  sceneCreate = () => {
    this.setBackground(this.core.defines.blue);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.labelScore = this.add.text(
      20,
      20,
      this.core.models.user.getCurrentScore(), {
        font: '30px Arial',
        fill: this.core.defines.green,
      },
    );
    this.labelScore.scrollFactorX = 0;
    this.labelScore.scrollFactorY = 0;
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
    // this.cameras.main.setZoom(1);
  };

  sceneUpdate = () => {
  };
}
