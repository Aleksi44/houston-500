import Scene from '../../../core/scenes/Scene';


export default class ClassicScene extends Scene {
  config = {
    key: 'ClassicScene',
  };

  constructor(core) {
    super(core, ClassicScene.config);
    this.core = core;
    this.player = null;
    this.cursors = null;
    this.score = 0;
  }

  scenePreload = () => {
    this.load.image('pipe', './assets/debug/green-square.png');
    this.load.image('station', './assets/debug/red-square.png');
  };

  sceneCreate = () => {
    this.setBackground(this.core.defines.blue);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.station = this.physics.add.sprite(100, 100, 'station');
    this.time.addEvent({
      delay: 2000,
      callback: this.addRowOfPipes,
      loop: true,
    });
    this.labelScore = this.add.text(20, 20, '0', {
      font: '30px Arial',
      fill: this.core.defines.green,
    });
  };

  sceneUpdate = () => {
    if (this.cursors.space.isDown || this.input.activePointer.isDown) {
      this.station.setVelocityY(-350);
    }
    if (this.station.y < 0 || this.station.y > this.core.options.config.height) {
      this.restart();
    }
  };

  addRowOfPipes = () => {
    const hole = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < 13; i++) {
      if (i > hole + 2 || i < hole - 2) {
        this.pipes = this.physics.add.image(
          this.core.options.config.width,
          i * 50,
          'pipe',
        );
        this.pipes.body.setAllowGravity(false);
        this.pipes.setVelocityX(-200);
        this.physics.add.overlap(this.station, this.pipes, this.restart, null, this);
      }
    }
    this.score += 1;
    this.labelScore.text = this.score;
  };
}
