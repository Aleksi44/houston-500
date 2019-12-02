import Phaser from 'phaser';
import models from './models';
import defines from './defines';
import scenes from './scenes';
import managers from './managers';

export default class Core {
  constructor(options) {
    this.options = options || {};
    this.defines = defines;
    this.phaser = Phaser;
    this.scenes = {};

    Object.keys(scenes).forEach((name) => {
      this.scenes[
        name[0].toLowerCase() + name.substring(1)
      ] = new scenes[name](this);
    });
    this.models = {};
    Object.keys(models).forEach((name) => {
      this.models[
        name[0].toLowerCase() + name.substring(1)
      ] = new models[name](this);
    });
    this.managers = {};
    Object.keys(managers).forEach((name) => {
      this.managers[
        name[0].toLowerCase() + name.substring(1)
      ] = new managers[name](this);
    });
  }

  run(config) {
    this.game = new this.phaser.Game(config);
  }
}
