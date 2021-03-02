import Player from './Player';

const FRAME_SIZE = 64;

export default class Astro extends Player {
  constructor(scene, name, key) {
    super(scene, name, key);
    this.velocityX = 200;
    this.velocityY = -400;
  }

  modelPreload = () => {
    this.scene.load.spritesheet(this.spriteIndex, './assets/players/astro.png', {
      width: FRAME_SIZE,
      height: FRAME_SIZE,
      frameWidth: FRAME_SIZE,
      frameHeight: FRAME_SIZE,
    });
  };
}
