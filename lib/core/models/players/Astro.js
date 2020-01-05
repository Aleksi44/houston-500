import Model from '../Model';

export default class Astro extends Model {
  modelPreload = () => {
    this.scene.load.spritesheet('station', './assets/players/astro.png', {
      width: 50,
      height: 100,
      frameWidth: 50,
      frameHeight: 100,
    });
    // this.scene.load.image('station', './assets/debug/red-square.png');
  };

  modelCreate = () => {
    this.scene.player = this.scene.physics.add.sprite(100, 100, 'station');
    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('station', { start: 0, end: 4 }),
      frameRate: 10,
      duration: 1000,
    });
  };

  modelUpdate = () => {
    if (this.scene.player) {
      if (this.scene.cursors.space.isDown || this.scene.input.activePointer.isDown) {
        this.scene.player.setVelocityY(-400);
        this.scene.player.anims.play('jump');
      }
      if (this.scene.player.y < 0
        || this.scene.player.y > this.scene.core.options.config.height) {
        this.scene.restart();
      }
    }
  };
}
