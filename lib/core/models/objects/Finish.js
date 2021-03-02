import Model from '../Model';

export default class Finish extends Model {
  constructor(scene) {
    super(scene);
    this.FINISH_WIDTH = 192;
    this.FINISH_HEIGHT = 320;
    this.conf = this.scene.schemaConf.finish;
  }

  modelPreload = () => {
    if (this.conf) {
      this.scene.load.spritesheet('finish', 'assets/sprites/finish.png', {
        width: this.FINISH_WIDTH,
        height: this.FINISH_HEIGHT,
        frameWidth: 192,
        frameHeight: 64,
      });
    }
  };

  modelCreate = () => {
    if (this.conf) {
      const { scene } = this;
      if (this.conf.key) {
        const finish = this.scene.map.createFromObjects(this.conf.key, this.conf.key, {
          key: 'finish',
        });
        this.scene.anims.create({
          key: 'finish_wait',
          frames: this.scene.anims.generateFrameNumbers('finish', { start: 0, end: 4 }),
          duration: 500,
          repeat: -1,
        });
        scene.physics.world.enable(finish);
        for (let i = 0; i < finish.length; i += 1) {
          finish[i].body.setAllowGravity(false);
          for (let player of scene.players) {
            scene.physics.add.overlap(
              player.sprite,
              finish[i],
              async () => {
                await this.scene.nextLevel();
              }
            );
          }
          finish[i].play('finish_wait');
        }
      }
    }
  };
}
