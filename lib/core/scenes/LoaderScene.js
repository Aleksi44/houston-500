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

  // eslint-disable-next-line class-methods-use-this
  bootLoader() {
  }

  // eslint-disable-next-line class-methods-use-this
  bootCreate() {
  }
}
