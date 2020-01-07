import PropTypes from 'prop-types';
import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(core, config) {
    super(config);
    this.core = core;
    this.models = [];
    this.run = false;
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
    this.run = false;
    this.player.anims.play('death');
    this.core.html.mount(this.core.components.menuComponent);
  };

  preload = () => {
    this.models.forEach((model) => {
      model.preload();
    });
    this.scenePreload();
  };

  create = () => {
    this.models.forEach((model) => {
      model.create();
    });
    this.sceneCreate();
    this.run = true;
  };

  update = (time, delta) => {
    this.models.forEach((model) => {
      model.update(time, delta);
    });
    this.sceneUpdate();
  };
}

Scene.defaultProps = {
  key: null,
  models: [],
};

Scene.propTypes = {
  core: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  key: PropTypes.string,
  models: PropTypes.array,
};
