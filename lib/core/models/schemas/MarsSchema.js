import Schema from './Schema';

export default class MarsSchema extends Schema {
  constructor(scene) {
    super(scene);
    this.key = 'mars';
    this.keyObstacles = 'collides';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'testing';
  }
}
