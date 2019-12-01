import Game from '../Game';
import Scenes from './scenes';

export default class Bomberman extends Game {
  constructor(options) {
    super(options);
    this.addScenes(Scenes);
  }
}
