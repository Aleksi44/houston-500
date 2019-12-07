import Scene from '../../../core/scenes/Scene';

export default class ClassicScene extends Scene {
  config = {
    key: 'ClassicScene',
  };

  constructor(core) {
    super(core, ClassicScene.config);
    this.alpha = 0;
  }

  preload = () => {
    this.scene = this.setBackground(this.core.defines.blue);
    this.load.svg('satellite', './assets/satellite.svg');
    this.load.svg('space-station', './assets/space-station.svg');
    this.load.svg('case-1', './assets/cases/case-1.svg');
  };

  create = () => {
    const w = this.core.defines.sceneWidth;
    const h = this.core.defines.sceneHeight;

    this.satellite = this.add.sprite(w / 3, h / 2, 'satellite');
    this.caseOne = this.add.sprite(2 * w / 3, h / 2, 'case-1');
  };

  update = () => {
    this.alpha += 0.01;
    this.satellite.setAlpha(this.alpha);
    this.caseOne.setAlpha(this.alpha);
  };

  render = () => {
    this.core.game.debug.spriteInfo(this.satellite, 32, 32);
  };
}
