import Scene from './Scene';

export default class LoaderScene extends Scene {
  constructor(core) {
    super(core);
    this.setConfig({
      key: 'loader',
      active: true,
      preload: this.bootLoader,
      create: this.bootCreate,
    });
  }

  bootLoader = () => {
    this.core.managers.assetsManager.loadAll();
  };

  bootCreate = () => {
    this.core.game.scene.start('demo');
  };
}
