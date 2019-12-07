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

  preload = () => {
    this.preload();
  };

  create = () => {
    this.create();
  };

  update = () => {
    this.update();
  };

  render = () => {
    this.render();
  }
}

Scene.defaultProps = {
  key: null,
};

Scene.propTypes = {
  core: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  key: PropTypes.string,
};
