import Schema from './Schema';

export default class StationSchema extends Schema {
  preloadSchemaData = () => {
    this.scene.load.image('tiles', './assets/tilemaps/nantes_tiles_64.png');
    this.builder.inside(10, 24, 0);
    this.builder.foobar(3, 1 / 3, 6);
    this.builder.inside(10, 24, 0);
    this.builder.foobar(3, 2 / 3, 6);
    this.builder.inside(10, 24, 0);
    this.builder.foobar(3, 1 / 2, 6);
  };
}
