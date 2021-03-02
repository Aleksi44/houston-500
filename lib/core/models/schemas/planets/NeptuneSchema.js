import Schema from '../Schema';

export default class NeptuneSchema extends Schema {
  constructor(scene) {
<<<<<<< HEAD
    super(scene);
    this.key = 'neptune';
    this.keyObstacles = 'collide';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
=======
    super(scene, {
      planet: 'neptune',
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
