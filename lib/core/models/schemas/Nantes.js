import Schema from './Schema';

export default class Nantes extends Schema {
  preloadSchemaData = () => {
    this.scene.load.image('tiles', './assets/tilemaps/nantes_tiles_64.png');
    this.builder.inside(5, 11, 0);
    this.builder.foobar(5, 1 / 3, 7);
    this.builder.inside(10, 11, 0);
    this.builder.foobar(5, 2 / 3, 7);
    this.builder.inside(10, 11, 0);
    this.builder.foobar(5, 1 / 2, 7);
  };
}
