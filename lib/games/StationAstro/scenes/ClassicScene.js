import Scene from '../../../core/scenes/Scene';
import StationSchema from '../../../core/models/schemas/StationSchema';
import Astro from '../../../core/models/players/Astro';

export default class ClassicScene extends Scene {
  config = {
    key: 'ClassicScene',
  };

  constructor(core) {
    super(core, ClassicScene.config);
    this.core = core;
    this.player = null;
    this.cursors = null;
    this.score = 0;
    this.models = [
      new Astro(this),
      new StationSchema(this),
    ];
  }

  scenePreload = () => {
  };

  sceneCreate = () => {
    this.setBackground(this.core.defines.blue);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.labelScore = this.add.text(20, 20, '0', {
      font: '30px Arial',
      fill: this.core.defines.green,
    });

    // camera
    this.worldWidth = this.models[1].builder.getWidth();
    this.worldHeight = this.models[1].builder.getHeight();

    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08,
      0,
      0,
    );
    //this.cameras.main.setZoom(1);
  };

  sceneUpdate = () => {
  };
}
