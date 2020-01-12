import Schema from '../Schema';

export default class NeptuneSchema extends Schema {
  constructor(scene) {
    super(scene);
    this.key = 'neptune';
    this.keyObstacles = 'collide';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
  }
}
