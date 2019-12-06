import Game from '../../core/Game';
import scenes from './scenes';

export default class Astrobot extends Game {
  constructor(options) {
    super({
      ...options,
      startScene: 'ClassicScene',
    });
    this.scenes = {};
    Object.keys(scenes).forEach((name) => {
      this.scenes[
        name[0].toLowerCase() + name.substring(1)
      ] = new scenes[name](this.core);
    });
    this.startScene = this.scenes.classicScene;
    this.addScenes(Object.values(this.scenes));
  }
}
