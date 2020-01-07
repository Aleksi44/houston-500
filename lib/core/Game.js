import PropTypes from 'prop-types';
import Phaser from 'phaser';
import Core from './index';

export default class Game extends Phaser.Game {
  constructor(options) {
    const { config } = options;
    super(config);
    this.core = new Core(options, this);
    this.disableRightClick();
  }

  disableRightClick() {
    if (!this.core.isDev) {
      document.body.setAttribute(
        'oncontextmenu',
        'return false;',
      );
    }
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
