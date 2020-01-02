import PropTypes from 'prop-types';
import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(core, config) {
    super(config);
    this.core = core;
  }

  setBackground(colorHexa) {
    this.cameras.main.setBackgroundColor(colorHexa);
  }

  middleX() {
    return this.core.options.config.width / 2;
  }

  middleY() {
    return this.core.options.config.height / 2;
  }

  restart = () => {
    // this.scene.restart();
    this.core.html.mount(this.core.components.startComponent);
  };

  preload = () => {
    this.scenePreload();
  };

  create = () => {
    this.sceneCreate();
  };

  update = () => {
    this.sceneUpdate();
  };
}

Scene.defaultProps = {
  key: null,
};

Scene.propTypes = {
  core: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  key: PropTypes.string,
};
