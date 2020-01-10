import Scene from './Scene';

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
    this.load.spritesheet('matching', 'assets/sprites/loader-250.png', {
      width: this.loaderSize,
      height: this.loaderSize,
      frameWidth: 250,
      frameHeight: 250,
    });
  };

  sceneCreate = async () => {
    this.loader = this.add.sprite(
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
    this.loader.anims.play('loading_start', true);
    await this.core.utils.timeout(3000);
    this.core.html.mount(this.core.components.menuComponent);
    // loader.destroy();
  };

  sceneUpdate = () => {
  };
}
