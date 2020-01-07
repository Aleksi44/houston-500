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
    this.loaderSize = this.core.options.config.width / 2;
  }

  scenePreload = () => {
    this.setBackground(this.core.defines.blue);
    this.load.spritesheet('matching', 'assets/sprites/loader-500.png', {
      width: this.loaderSize,
      height: this.loaderSize,
      frameWidth: 500,
      frameHeight: 500,
    });
  };

  sceneCreate = async () => {
    const loader = this.add.sprite(
      this.middleX(),
      this.middleY(),
      'matching',
    );
    this.anims.create({
      key: 'loading_start',
      frames: this.anims.generateFrameNumbers('matching', { start: 0, end: 31 }),
      frameRate: 24,
      duration: 3000,
    });
    loader.anims.play('loading_start', true);
    await timeout(3500);
    this.core.html.mount(this.core.components.menuComponent);
    // loader.destroy();
    /* this.add.text(this.middleX(), this.middleY(), 'START', {
      fontFamily: 'Lato',
      fill: this.core.defines.green,
      fontSize: '30px',
    }).setInteractive()
      .on('pointerdown', () => {
        this.core.game.scene.start(this.core.options.startScene);
      }); */
  };

  sceneUpdate = () => {
  };
}
