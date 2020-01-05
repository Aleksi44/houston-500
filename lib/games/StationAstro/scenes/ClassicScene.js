import Scene from '../../../core/scenes/Scene';
import Nantes from '../../../core/models/schemas/Nantes';
import Station from '../../../core/models/schemas/Station';
import Space from '../../../core/models/schemas/Space';
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
      new Nantes(this),
      new Station(this),
      new Space(this),
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
    this.models[1].start(() => {
      this.models[2].start(() => {
        this.models[3].start(() => {
          // end of the game
        });
      });
    });

    console.log('ccc');
  };

  sceneUpdate = () => {
  };
}
