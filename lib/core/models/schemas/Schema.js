import Phaser from 'phaser';
import Model from '../Model';
import Finish from '../objects/Finish';
import Stars from '../objects/Stars';
import Tiles from '../objects/Tiles';

export default class Schema extends Model {
  constructor(scene, conf) {
    super(scene);
    this.conf = conf;
    this.showDebug = false;
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
    this.scene.schemaConf = this.conf;
    this.objects = [
      new Finish(this.scene),
      new Stars(this.scene),
      new Tiles(this.scene),
    ];
    this.objects.forEach((object) => {
      object.modelPreload();
    });
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
    this.scene.map = scene.make.tilemap({
      key: `tilemap_${this.scene.schemaConf.planet}`,
      tileWidth: this.TILE_SIZE,
      tileHeight: this.TILE_SIZE,
      insertNull: true,
    });

    this.objects.forEach((object) => {
      object.modelCreate();
    });
  };

  modelUpdate = (time, delta) => {
  };

  height = () => this.scene.map.getLayer().heightInPixels;

  width = () => this.scene.map.getLayer().widthInPixels;
}
