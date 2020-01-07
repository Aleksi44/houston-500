import Phaser from 'phaser';
import Model from '../Model';
import SchemaBuilder from './SchemaBuilder';

export default class Schema extends Model {
  constructor(scene) {
    super(scene);
    this.showDebug = false;
    this.builder = new SchemaBuilder(scene);
  }

  drawDebug = () => {
    this.debugGraphics.clear();
    if (this.showDebug) {
      this.map.renderDebug(this.debugGraphics, {
        tileColor: new Phaser.Display.Color(10, 134, 48, 200), // Non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(10, 134, 48, 200),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    }
  };

  modelPreload = () => {
    this.preloadSchemaData();
  };

  modelCreate = () => {
    const { scene } = this;
    this.map = scene.make.tilemap({
      key: 'schema',
      tileWidth: this.builder.TILE_SIZE,
      tileHeight: this.builder.TILE_SIZE,
      insertNull: true,
    });
    this.tileset = this.map.addTilesetImage('tiles');
    this.layer = this.map.createStaticLayer(
      0,
      this.tileset,
      0,
      0,
    );
    this.map.setCollisionBetween(this.builder.TILE_START_COLLIDER, this.builder.TILE_STOP_COLLIDER);
    scene.physics.add.collider(
      scene.player,
      this.layer,
      () => {
        if (scene.run) {
          scene.restart();
        }
      },
    );
    scene.input.keyboard.on('keydown_C', () => {
      this.showDebug = !this.showDebug;
      this.drawDebug();
    });
    this.debugGraphics = scene.add.graphics();
  };

  modelUpdate = (time, delta) => {
  };
}
