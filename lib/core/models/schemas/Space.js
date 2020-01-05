import Schema from './Schema';

export default class Space extends Schema {
  preloadSchemaData = () => {
    this.scene.load.image('tiles', './assets/tilemaps/nantes_tiles_64.png');
    this.builder.inside(10, 5, 0);
    this.builder.foobar(25, 1 / 3, 6);
    this.builder.inside(10, 5, 0);
    this.builder.foobar(25, 2 / 3, 6);
    this.builder.inside(10, 5, 0);
    this.builder.foobar(25, 1 / 2, 6);
  };
}
