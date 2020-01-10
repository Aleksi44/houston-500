import Schema from './Schema';

export default class VenusSchema extends Schema {
  constructor(scene) {
    super(scene);
    this.key = 'venus';
    this.keyObstacles = 'collide';
    this.keyAtomes = null;
    this.keyFinish = null;
  }
}
