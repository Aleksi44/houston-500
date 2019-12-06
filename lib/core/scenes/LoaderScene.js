import Scene from './Scene';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class LoaderScene extends Scene {
  constructor(core) {
    super(core);
    this.setConfig({
      key: this.key,
      active: true,
      preload: this.preload,
      create: this.create,
    });
  }

  preload = () => {
    this.scene = this.setBackground(this.core.defines.green);
  };

  create = async () => {
    await timeout(1000);
    this.core.game.scene.start(this.core.options.startScene);
  };
}
