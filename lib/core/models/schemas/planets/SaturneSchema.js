import Schema from '../Schema';

export default class SaturneSchema extends Schema {
  constructor(scene) {
    super(scene);
    this.key = 'saturne';
    this.keyObstacles = 'collide';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
  }
}
