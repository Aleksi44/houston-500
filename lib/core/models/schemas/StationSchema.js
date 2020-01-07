import Schema from './Schema';

export default class StationSchema extends Schema {
  preloadSchemaData = () => {
    this.scene.load.image('tiles', './assets/tilemaps/space.png');
    this.scene.load.image('red', 'assets/debug/red-square.png');

    this.scene.load.tilemapCSV('schema', 'assets/tilemaps/tir.csv');
    //this.scene.load.tilemapTiledJSON('schema', 'assets/tilemaps/tir.json');
  };

  schemaCreate = () => {
    //this.bonus = this.map.createFromObjects('Calque 1', 15, { key: 'red' });
  };
}
