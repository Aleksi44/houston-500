import Scene from '../../../core/scenes/Scene';

export default class ClassicScene extends Scene {
  constructor(core) {
    super(core);
    this.setConfig({
      key: this.key,
      active: false,
      visible: false,
      preload: this.preload,
      create: this.create,
    });
  }

  preload = () => {
    this.scene = this.setBackground(this.core.defines.blue);
    this.scene.load.svg('satellite', './assets/satellite.svg');
    this.scene.load.svg('space-station', './assets/space-station.svg');
    this.scene.load.svg('case-1', './assets/cases/case-1.svg');
  };

  create = () => {
    const w = this.core.defines.sceneWidth;
    const h = this.core.defines.sceneHeight;
    this.scene.add.image(w / 3, h / 2, 'satellite');
    this.scene.add.image(2 * w / 3, h / 2, 'case-1');
  };
}
