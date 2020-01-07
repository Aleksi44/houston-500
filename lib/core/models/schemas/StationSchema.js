import Schema from './Schema';

export default class StationSchema extends Schema {
  preloadSchemaData = () => {
    this.scene.load.image('tiles', './assets/tilemaps/space.png');
    this.scene.load.tilemapCSV('schema', 'assets/tilemaps/tir.csv');
  };
}
