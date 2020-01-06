import Model from '../Model';

const FRAME_SIZE = 64;

export default class Astro extends Model {
  modelPreload = () => {
    this.scene.load.spritesheet('station', './assets/players/astro1.png', {
      width: FRAME_SIZE,
      height: FRAME_SIZE,
      frameWidth: FRAME_SIZE,
      frameHeight: FRAME_SIZE,
    });
    // this.scene.load.image('station', './assets/debug/red-square.png');
  };

  modelCreate = () => {
    this.scene.player = this.scene.physics.add.sprite(
      FRAME_SIZE,
      FRAME_SIZE * 2,
      'station',
    );
    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('station', { start: 11, end: 14 }),
      frameRate: 10,
      duration: 2000,
    });
    this.scene.anims.create({
      key: 'death',
      frames: this.scene.anims.generateFrameNumbers('station', { start: 15, end: 20 }),
      frameRate: 10,
      duration: 1000,
    });
    this.scene.anims.create({
      key: 'start',
      frames: this.scene.anims.generateFrameNumbers('station', { start: 0, end: 10 }),
      frameRate: 10,
      duration: 500,
    });
    this.scene.anims.create({
      key: 'end',
      frames: this.scene.anims.generateFrameNumbers('station', { start: 21, end: 26 }),
      frameRate: 10,
      duration: 2000,
    });

    const ins = this;
    this.scene.player.on('animationcomplete', function callback(anim, frame) {
      if (anim.key === 'start') {
        ins.scene.player.body.setAllowGravity(true);
      }
      this.emit(`animationcomplete_${anim.key}`, anim, frame);
    }, this.scene.player);
    this.scene.player.body.setAllowGravity(false);
    this.scene.player.anims.play('start');
  };

  modelUpdate = () => {
    if (this.scene.player) {
      if (this.scene.cursors.space.isDown || this.scene.input.activePointer.isDown) {
        this.scene.player.setVelocity(200, -400);
        this.scene.player.anims.play('jump');
      }
      /* if (this.scene.player.y < 0
        || this.scene.player.y > this.scene.core.options.config.height) {
        this.scene.restart();
      } */
    }
  };
}
