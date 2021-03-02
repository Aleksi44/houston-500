import Phaser from 'phaser';
import Model from '../Model';

export default class Schema extends Model {
  constructor(scene) {
    super(scene);
    this.showDebug = false;
    this.TILE_SIZE = 18;
    this.TILE_START_COLLIDER = 0;
    this.TILE_STOP_COLLIDER = 160;
    this.STAR_FRAME_SIZE = 32;
    this.FINISH_WIDTH = 192;
    this.FINISH_HEIGHT = 320;
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
    this.scene.load.spritesheet('atome', 'assets/sprites/stars.png', {
      width: this.STAR_FRAME_SIZE,
      height: this.STAR_FRAME_SIZE,
      frameWidth: this.STAR_FRAME_SIZE,
      frameHeight: this.STAR_FRAME_SIZE,
    });
    this.scene.load.spritesheet('finish', 'assets/sprites/finish.png', {
      width: this.FINISH_WIDTH,
      height: this.FINISH_HEIGHT,
      frameWidth: 192,
      frameHeight: 64,
    });
    this.scene.load.tilemapTiledJSON(`tilemap_${this.key}`, `assets/tilemaps/json/${this.key}.json`);
  };

  modelCreate = () => {
    const { scene } = this;

    // Debug Collision
    if (this.scene.core.isDev) {
      scene.input.keyboard.on('keydown_C', () => {
        this.showDebug = !this.showDebug;
        this.drawDebug();
      });
      this.debugGraphics = scene.add.graphics();
    }

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
        16,
        16,
        1,
        2,
      );
      this.layerObstacle = this.map.createStaticLayer(
        this.keyObstacles,
        this.tileset,
        0,
        0,
      );
      this.layerObstacle.setCollisionBetween(this.TILE_START_COLLIDER, this.TILE_STOP_COLLIDER);
      for (let player of scene.players) {
        scene.physics.add.collider(
          player.sprite,
          this.layerObstacle,
          () => {
            if (scene.run && player.isAlive) {
              scene.playerDead(player);
            }
          },
        );
  
      }
    }

    // Atomes
    if (this.keyAtomes) {
      const atomes = this.map.createFromObjects(this.keyAtomes, this.keyAtomes, {
        key: 'atome',
      });
      this.scene.anims.create({
        key: 'atome_wait',
        frames: this.scene.anims.generateFrameNumbers('atome', { start: 0, end: 8 }),
        frameRate: 24,
        duration: 4000,
        repeat: -1,
      });
      scene.physics.world.enable(atomes);
      for (let i = 0; i < atomes.length; i += 1) {
        atomes[i].play('atome_wait');
        atomes[i].body.setAllowGravity(false);
        for (let player of scene.players) {
          scene.physics.add.overlap(
            player.sprite,
            atomes[i],
            () => {
              if (scene.run && player.isAlive) {
                atomes[i].destroy();
                player.scoreLevel += 1;
                player.labelScore.setText(player.getCurrentScore());  
              }
            },
          );  
        }
      }
    }

    // Finish
    if (this.keyFinish) {
      const finish = this.map.createFromObjects(this.keyFinish, this.keyFinish, {
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
  };

  modelUpdate = (time, delta) => {
  };

  height = () => this.map.getLayer().heightInPixels;

  width = () => this.map.getLayer().widthInPixels;
}
