import Game from '../Game';
import Scenes from './scenes';


export default class Bomberman extends Game {
  constructor(options) {
    super(options);
    this.scenes = {};
    Object.keys(Scenes).forEach((name) => {
      this.scenes[
        name[0].toLowerCase() + name.substring(1)
      ] = new Scenes[name](this);
    });
    this.addScenes(Object.values(this.scenes));
  }
}
