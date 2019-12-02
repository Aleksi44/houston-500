import Scene from '../../../core/scenes/Scene';

export default class ClassicScene extends Scene {
  constructor(core) {
    super(core);
    this.setConfig({
      key: 'demo',
      active: false,
      visible: false,
      preload: this.preload,
      create: this.create,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  preload = () => {
  };

  create = () => {
    this.scene = this.core.core.game.scene.getScene('demo');
    this.scene.add.image(400, 300, 'satellite');
    this.scene.add.image(400, 300, 'case-1');
  };
}
