import Schema from '../Schema';

export default class JupiterSchema extends Schema {
  constructor(scene) {
    super(scene);
    this.key = 'jupiter';
    this.keyObstacles = 'collides';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
  }
}
