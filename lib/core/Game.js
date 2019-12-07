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
    };
  }

  run() {
    this.core.run(this.config);
    Object.keys(this.scenes).forEach((key) => {
      const scene = this.scenes[key];
      this.core.game.scene.add(scene.config.key, scene);
    });
    this.core.game.scene.start(this.core.scenes.loaderScene.config.key);
  }
}

Game.defaultProps = {
  scenes: [],
};

Game.propTypes = {
  core: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  startScene: PropTypes.object.isRequired,
  scenes: PropTypes.array,
};
