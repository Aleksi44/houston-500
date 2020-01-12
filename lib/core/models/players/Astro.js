import Model from '../Model';

const FRAME_SIZE = 64;
const VELOCITY_X = 200;
const VELOCITY_Y = -400;

export default class Astro extends Model {
  constructor(scene) {
    super(scene);
    this.sprite = null;
  }

  modelPreload = () => {
    this.scene.load.spritesheet('station', './assets/players/astro.png', {
      width: FRAME_SIZE,
      height: FRAME_SIZE,
      frameWidth: FRAME_SIZE,
      frameHeight: FRAME_SIZE,
    });
  };

  modelCreate = () => {
    this.sprite = this.scene.physics.add.sprite(
      0,
      0,
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
      duration: 1000,
    });

    /* this.sprite.on('animationcomplete', function callback(anim, frame) {
      if (anim.key === 'start') {
      }
    }, this.sprite); */
    this.sprite.body.setAllowGravity(false);
    this.sprite.body.setBounce(1, 1);
    this.sprite.anims.play('start');
  };

  modelUpdate = () => {
    if (this.sprite && this.scene.run) {
      if (this.scene.cursors.space.isDown || this.scene.input.activePointer.isDown) {
        if (!this.sprite.body.allowGravity) {
          this.scene.clickTuto.destroy();
          this.sprite.body.setAllowGravity(true);
        }
        this.sprite.setVelocity(VELOCITY_X, VELOCITY_Y);
        this.sprite.anims.play('jump');
      }
    }
  };
}
