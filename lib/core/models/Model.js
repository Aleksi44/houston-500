export default class Model {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    this.modelPreload();
  }

  create() {
    this.modelCreate();
  }

  update(time, delta) {
    this.modelUpdate(time, delta);
  }
}
