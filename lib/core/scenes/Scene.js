import PropTypes from 'prop-types';
import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(core, config) {
    super(config);
    this.core = core;
    this.levels = [];
    this.player = null;
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
    this.player.sprite.anims.play('death');
    this.core.html.mount(this.core.components.menuComponent, {
      ranking: true,
    });
  };

  preload = () => {
    if (this.player) {
      this.player.preload();
    }
    if (this.levels.length > 0) {
      this.levels[this.currentLevel].preload();
    }
    this.scenePreload();
  };

  create = () => {
    if (this.player) {
      this.player.create();
    }
    if (this.levels.length > 0) {
      this.levels[this.currentLevel].create();
    }
    this.sceneCreate();
    this.run = true;
  };

  update = (time, delta) => {
    if (this.player) {
      this.player.update(time, delta);
    }
    if (this.levels.length > 0) {
      this.levels[this.currentLevel].update(time, delta);
    }
    this.sceneUpdate();
  };

  nextLevel = async () => {
    if (this.run) {
      this.run = false;
      this.player.sprite.body.setBounce(0);
      this.player.sprite.anims.play('end');
      await this.core.utils.timeout(2000);
      if (this.currentLevel + 1 >= this.levels.length) {
        this.currentLevel = 0;
      } else {
        this.currentLevel += 1;
      }
      this.core.models.user.nextLevel();
      this.core.game.scene.start(this.core.options.startScene);
    }
  };
}

Scene.defaultProps = {
  key: null,
  levels: [],
  player: null,
};

Scene.propTypes = {
  core: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  key: PropTypes.string,
  models: PropTypes.array,
};
