import PropTypes from 'prop-types';

export default class Scene {
  constructor(core) {
    this.core = core;
    this.key = this.constructor.name;
  }

  setConfig(conf) {
    this.config = conf;
  }

  getConfig() {
    return this.config;
  }

  getScene() {
    return this.core.game.scene.getScene(this.key);
  }

  setBackground(colorHexa) {
    const scene = this.getScene();
    scene.cameras.main.setBackgroundColor(colorHexa);
    return scene;
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
