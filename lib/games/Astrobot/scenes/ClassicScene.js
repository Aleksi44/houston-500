import Scene from '../../../core/scenes/Scene';

export default class ClassicScene extends Scene {
  constructor(options) {
    super(options);
    this.setConfig({
      key: 'demo',
      active: false,
      visible: false,
      preload: this.preload,
      create: this.create,
      extend: {
        startDemo: this.startDemo,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
  }

  // eslint-disable-next-line class-methods-use-this
  create() {
  }

  // eslint-disable-next-line class-methods-use-this
  startDemo() {
  }
}
