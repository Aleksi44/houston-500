import Model from '../Model';

export default class Player extends Model {
    static cursor = 0;
  constructor(scene, name, key) {
    super(scene);
    this.sprite = null;
    this.labelScore = null;
    this.name = name;
    this.reset()
    this.velocityX = 200;
    this.velocityY = -400;
    this.key = key;
    this.index = Player.cursor;
    Player.cursor += 1;
    this.spriteIndex = 'station' + this.index;
  }

  modelCreate = () => {
    this.sprite = this.scene.physics.add.sprite(
      0,
      0,
      this.spriteIndex,
    );
    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers(this.spriteIndex, { start: 11, end: 14 }),
      frameRate: 10,
      duration: 2000,
    });
    this.scene.anims.create({
      key: 'death',
      frames: this.scene.anims.generateFrameNumbers(this.spriteIndex, { start: 15, end: 20 }),
      frameRate: 10,
      duration: 1000,
    });
    this.scene.anims.create({
      key: 'start',
      frames: this.scene.anims.generateFrameNumbers(this.spriteIndex, { start: 0, end: 10 }),
      frameRate: 10,
      duration: 500,
    });
    this.scene.anims.create({
      key: 'end',
      frames: this.scene.anims.generateFrameNumbers(this.spriteIndex, { start: 21, end: 26 }),
      duration: 1000,
    });

    /* this.sprite.on('animationcomplete', function callback(anim, frame) {
      if (anim.key === 'start') {
      }
    }, this.sprite); */
    this.sprite.body.setAllowGravity(false);
    this.sprite.body.setBounce(1, 1);
    this.sprite.anims.play('start');
    if (this.key === "LEFTCLIC") {
        this.inputKey = this.scene.input.activePointer;
    }
    else {
        this.inputKey = this.scene.input.keyboard.addKey(this.key)
    }
  };

  modelUpdate = () => {
    if (this.sprite && this.isAlive && this.scene.run) {
      //if (this.scene.cursors.space.isDown || this.scene.input.activePointer.isDown) {
      if (this.inputKey.isDown) {
        if (!this.sprite.body.allowGravity) {
            this.scene.startPlay()
        }
        this.sprite.setVelocity(this.velocityX, this.velocityY);
        this.sprite.anims.play('jump');
      }
    }
  };

  revive() {
    this.isAlive = true;
  }

  dead() {
    this.isAlive = false;
    this.sprite.anims.play('death');
  }

  reset() {
    this.score = 0;
    this.scoreLevel = 0;
    this.isAlive = true;
  }

  resetLevel() {
    this.scoreLevel = 0;
  }

  nextLevel() {
    this.score += this.scoreLevel;
    this.scoreLevel = 0;
    this.isAlive = true;
  }

  getCurrentScore() {
    return this.scoreLevel + this.score;
  }

  startPlay() {
    this.sprite.body.setAllowGravity(true);
    this.sprite.setVelocity(this.velocityX, 0);
  }
}
