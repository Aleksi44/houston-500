import Phaser from 'phaser';
import Model from '../Model';

export default class Schema extends Model {
  constructor(scene) {
    super(scene);
    this.showDebug = false;
    this.TILE_SIZE = 16;
    this.TILE_START_COLLIDER = 0;
    this.TILE_STOP_COLLIDER = 100;
    this.ATOM_FRAME_SIZE = 32;
  }

  drawDebug = () => {
    this.debugGraphics.clear();
    if (this.showDebug) {
      this.layerObstacle.renderDebug(this.debugGraphics, {
        tileColor: new Phaser.Display.Color(10, 134, 48, 200), // Non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(10, 134, 48, 200),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    }
  };

  modelPreload = () => {
    this.scene.load.image('tiles', './assets/tilemaps/tiles.png');
    this.scene.load.spritesheet('atome', 'assets/sprites/atome.png', {
      width: this.ATOM_FRAME_SIZE,
      height: this.ATOM_FRAME_SIZE,
      frameWidth: this.ATOM_FRAME_SIZE,
      frameHeight: this.ATOM_FRAME_SIZE,
    });
    this.scene.load.tilemapTiledJSON(`tilemap_${this.key}`, `assets/tilemaps/${this.key}.json`);
  };

  modelCreate = () => {
    const { scene } = this;
    scene.input.keyboard.on('keydown_C', () => {
      this.showDebug = !this.showDebug;
      this.drawDebug();
    });
    this.debugGraphics = scene.add.graphics();

    // Init Map
    this.map = scene.make.tilemap({
      key: `tilemap_${this.key}`,
      tileWidth: this.TILE_SIZE,
      tileHeight: this.TILE_SIZE,
      insertNull: true,
    });

    // Obstacles
    if (this.keyObstacles) {
      this.tileset = this.map.addTilesetImage(
        this.key,
        'tiles',
      );
      this.layerObstacle = this.map.createStaticLayer(
        this.keyObstacles,
        this.tileset,
        0,
        0,
      );
      this.layerObstacle.setCollisionBetween(0, 160);
      scene.physics.add.collider(
        scene.player.sprite,
        this.layerObstacle,
        () => {
          if (scene.run) {
            scene.restart();
          }
        },
      );
    }

    // Atomes
    if (this.keyAtomes) {
      const atomes = this.map.createFromObjects(this.keyAtomes, this.keyAtomes, {
        key: 'atome',
      });
      this.scene.anims.create({
        key: 'atome_wait',
        frames: this.scene.anims.generateFrameNumbers('atome', { start: 0, end: 3 }),
        frameRate: 24,
        duration: 4000,
        repeat: -1,
      });
      scene.physics.world.enable(atomes);
      for (let i = 0; i < atomes.length; i += 1) {
        atomes[i].play('atome_wait');
        atomes[i].setPosition(
          atomes[i].x,
          atomes[i].y + this.height() - 250,
        );
        atomes[i].body.setAllowGravity(false);
        scene.physics.add.overlap(
          scene.player.sprite,
          atomes[i],
          () => {
            atomes[i].destroy();
            this.scene.core.models.user.scoreLevel += 1;
            this.scene.labelScore.setText(this.scene.core.models.user.getCurrentScore());
          },
        );
      }
    }

    // Finish
    if (this.keyFinish) {
      const finish = this.map.createFromObjects(this.keyFinish, this.keyFinish, {
        key: 'atome',
      });
      scene.physics.world.enable(finish);
      for (let i = 0; i < finish.length; i += 1) {
        finish[i].setPosition(
          finish[i].x,
          finish[i].y + this.height() - 250,
        );
        finish[i].body.setAllowGravity(false);
        scene.physics.add.overlap(
          scene.player.sprite,
          finish[i],
          async () => {
            await this.scene.nextLevel();
          },
        );
      }
    }
  };

  modelUpdate = (time, delta) => {
  };

  height = () => this.map.getLayer().heightInPixels;

  width = () => this.map.getLayer().widthInPixels;
}
