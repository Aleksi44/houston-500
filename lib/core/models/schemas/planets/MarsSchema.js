import Schema from '../Schema';

export default class MarsSchema extends Schema {
  constructor(scene) {
    super(scene);
    this.key = 'mars';
    this.keyObstacles = 'collide';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
  }
}
