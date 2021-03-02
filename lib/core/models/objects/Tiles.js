import Model from '../Model';

export default class Tiles extends Model {
  constructor(scene) {
    super(scene);
    this.TILE_SIZE = 18;
    this.TILE_START_COLLIDER = 0;
    this.TILE_STOP_COLLIDER = 160;
    this.conf = this.scene.schemaConf.tiles;
  }

  modelPreload = () => {
    if (this.conf) {
      this.scene.load.image('tiles', './assets/tilemaps/tiles.png');
      this.scene.load.tilemapTiledJSON(
        `tilemap_${this.scene.schemaConf.planet}`,
        `assets/tilemaps/json/${this.scene.schemaConf.planet}.json`,
      );
    }
  };

  modelCreate = () => {
    if (this.conf) {
      const { scene } = this;
      this.tileset = this.scene.map.addTilesetImage(
        this.scene.schemaConf.planet,
        'tiles',
        16,
        16,
        1,
        2,
      );
      this.layerObstacle = this.scene.map.createStaticLayer(
        this.scene.schemaConf.tiles.key,
        this.tileset,
        0,
        0,
      );
      this.layerObstacle.setCollisionBetween(this.TILE_START_COLLIDER, this.TILE_STOP_COLLIDER);
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
  };
}
