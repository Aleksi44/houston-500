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

  scenePreload = () => {
    this.setBackground(this.core.defines.blue);
    const loaderSize = this.core.options.config.width / 2;
    this.load.svg('matching', 'assets/matching.svg', {
      width: loaderSize,
      height: loaderSize,
    });
  };

  sceneCreate = async () => {
    const loader = this.add.image(this.middleX(), this.middleY(), 'matching');
    await timeout(2000);
    loader.destroy();
    this.add.text(this.middleX(), this.middleY(), 'START', {
      fontFamily: 'Lato',
      fill: this.core.defines.green,
      fontSize: '30px',
    }).setInteractive()
      .on('pointerdown', () => {
        this.core.game.scene.start(this.core.options.startScene);
      });
  };

  sceneUpdate = () => {
  };
}
