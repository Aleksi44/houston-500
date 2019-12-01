import Core from '../core';

export default class Game {
  constructor(options) {
    this.core = new Core(options);
    this.config = {
      type: this.core.phaser.AUTO,
      parent: this.core.options.parent,
      width: this.core.defines.sceneWidth,
      height: this.core.defines.sceneHeight,
      scene: [],
    };
    this.addScenes(Object.values(this.core.scenes));
  }

  addScenes(scenes) {
    scenes.forEach(scene => this.config.scene.push(scene));
  }

  run() {
    this.core.run(this.config);
  }
}
