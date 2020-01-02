import Phaser from 'phaser';
import models from './models';
import defines from './defines';
import scenes from './scenes';
import components from './html/components';
import ManagerHtml from './html/ManagerHtml';

export default class Core {
  constructor(options, game) {
    this.options = options || {};
    this.defines = defines;
    this.phaser = Phaser;
    this.scenes = {};
    this.game = game;
    this.html = new ManagerHtml(this);

    // Add Scenes
    Object.keys(scenes).forEach((name) => {
      const key = name[0].toLowerCase() + name.substring(1);
      this.scenes[key] = new scenes[name](this);
      this.game.scene.add(this.scenes[key].config.key, this.scenes[key]);
    });
    // Add Models to Core
    this.models = {};
    Object.keys(models).forEach((name) => {
      this.models[name[0].toLowerCase() + name.substring(1)] = new models[name](this);
    });
    // Add Components to Core
    this.components = {};
    Object.keys(components).forEach((name) => {
      this.components[name[0].toLowerCase() + name.substring(1)] = components[name];
    });
  }
}
