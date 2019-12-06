import PropTypes from 'prop-types';
import Core from './index';

export default class Game {
  constructor(options) {
    this.core = new Core(options);
    this.config = {
      type: this.core.phaser.AUTO,
      parent: this.core.options.parent,
      width: options.width || this.core.defines.sceneWidth,
      height: options.height || this.core.defines.sceneHeight,
      scene: [],
    };
    this.addScenes(Object.values(this.core.scenes));
  }

  addScenes(scenes) {
    scenes.forEach((scene) => {
      this.config.scene.push(scene.getConfig());
    });
  }

  run() {
    this.core.run(this.config);
  }
}

Game.propTypes = {
  core: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  startScene: PropTypes.object.isRequired,
};
