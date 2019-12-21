import Phaser from 'phaser';
import models from './models';
import defines from './defines';
import scenes from './scenes';

export default class Core {
  constructor(options, game) {
    this.options = options || {};
    this.defines = defines;
    this.phaser = Phaser;
    this.scenes = {};
    this.game = game;

    // Add Scenes
    Object.keys(scenes).forEach((name) => {
      const key = name[0].toLowerCase() + name.substring(1);
      this.scenes[key] = new scenes[name](this);
      this.game.scene.add(this.scenes[key].config.key, this.scenes[key]);
    });
    // Add Models to Core
    this.models = {};
    Object.keys(models).forEach((name) => {
      this.models[
        name[0].toLowerCase() + name.substring(1)
      ] = new models[name](this);
    });
  }
}
