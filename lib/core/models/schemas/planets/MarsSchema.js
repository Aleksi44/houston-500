import Schema from '../Schema';

export default class MarsSchema extends Schema {
  constructor(scene) {
<<<<<<< HEAD
    super(scene);
    this.key = 'mars';
    this.keyObstacles = 'collide';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
=======
    super(scene, {
      planet: 'mars',
      stars: {
        key: 'bonus',
      },
      tiles: {
        key: 'collide',
      },
      finish: {
        key: 'finish',
      },
    });
>>>>>>> 96e64572cc9e725b99536fe45e50f23a79f149b4
  }
}
