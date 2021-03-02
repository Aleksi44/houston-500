import PropTypes from 'prop-types';
import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(core, config) {
    super(config);
    this.core = core;
    this.levels = [];
    this.players = [];
    this.run = false;
    this.currentFollowId = -1;
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

  playerDead = (playerIsDead) => {
    playerIsDead.dead();
    for (let player of this.players) {
      if (player.isAlive === true) {
        if (playerIsDead.index === this.currentFollowId) {
          this.followPlayerAlive();
        }
        return ;
      }
    }
    this.restart();
  }

  restart = () => {
    this.run = false;
    this.currentFollowId = -1;
    for (let player of this.players) {
      player.revive();
    }
    this.core.html.mount(this.core.components.menuComponent, {
      ranking: true,
    });
  };

  preload = () => {
    for (let player of this.players) {
      player.preload();
    }
    if (this.levels.length > 0) {
      this.levels[this.currentLevel].preload();
    }
    this.scenePreload();
  };

  create = () => {
    for (let player of this.players) {
      player.create();
    }
    if (this.levels.length > 0) {
      this.levels[this.currentLevel].create();
    }
    this.sceneCreate();
    this.run = true;
  };

  update = (time, delta) => {
    for (let player of this.players) {
      player.update(time, delta);
    }
    if (this.levels.length > 0) {
      this.levels[this.currentLevel].update(time, delta);
    }
    this.sceneUpdate();
  };

  nextLevel = async () => {
    if (this.run) {
      this.run = false;
      this.currentFollowId = -1;
      for (let player of this.players) {
        player.sprite.body.setBounce(0);
        player.sprite.anims.play('end');  
      }
      await this.core.utils.timeout(2000);
      if (this.currentLevel + 1 >= this.levels.length) {
        this.currentLevel = 0;
      } else {
        this.currentLevel += 1;
      }
      for (let player of this.players) {
        player.nextLevel();
      }
      this.core.game.scene.start(this.core.options.startScene);
     // this.startFollow()
    }
  };

  startPlay = () => {
    this.clickTuto.destroy();
    for (let player of this.players) {
      player.startPlay();
    }
  }

  followPlayerAlive() {
      for (let player of this.players) {
        if (player.isAlive) {
          if (this.currentFollowId !== player.index) {
            this.currentFollowId = player.index;
            this.cameras.main.startFollow(
              player.sprite,
              true,
              0.08,
              0.08,
              -1 * (this.core.options.config.width / 3),
              0,
            );
          }
        }
    }
  }
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
