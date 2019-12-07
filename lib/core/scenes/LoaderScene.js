import Scene from './Scene';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class LoaderScene extends Scene {
  config = {
    key: 'LoaderScene',
  };

  constructor(core) {
    super(core, LoaderScene.config);
  }

  preload = () => {
    this.setBackground(this.core.defines.green);
  };

  create = async () => {
    await timeout(1000);
    this.core.game.scene.start(this.core.options.startScene);
  };

  update = () => {
  };

  render = () => {
  }
}
