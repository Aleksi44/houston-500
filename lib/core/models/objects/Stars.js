import Model from '../Model';

export default class Stars extends Model {
  constructor(scene) {
    super(scene);
    this.STAR_FRAME_SIZE = 32;
    this.conf = this.scene.schemaConf.stars;
  }

  modelPreload = () => {
    if (this.conf) {
      this.scene.load.spritesheet('stars', 'assets/sprites/stars.png', {
        width: this.STAR_FRAME_SIZE,
        height: this.STAR_FRAME_SIZE,
        frameWidth: this.STAR_FRAME_SIZE,
        frameHeight: this.STAR_FRAME_SIZE,
      });
    }
  };

  modelCreate = () => {
    const { scene } = this;
    if (this.conf) {
      this.stars = this.scene.map.createFromObjects(this.conf.key, this.conf.key, {
        key: 'stars',
      });
      this.scene.anims.create({
        key: 'atome_wait',
        frames: this.scene.anims.generateFrameNumbers('stars', { start: 0, end: 8 }),
        frameRate: 24,
        duration: 4000,
        repeat: -1,
      });
      scene.physics.world.enable(this.stars);
      for (let i = 0; i < this.stars.length; i += 1) {
        this.stars[i].play('atome_wait');
        this.stars[i].body.setAllowGravity(false);
        scene.physics.add.overlap(
          scene.player.sprite,
          this.stars[i],
          () => {
            this.stars[i].destroy();
            this.scene.core.models.user.scoreLevel += 1;
            this.scene.labelScore.setText(this.scene.core.models.user.getCurrentScore());
          },
        );
      }
    }
  };
}
