import Schema from '../Schema';

export default class JupiterSchema extends Schema {
  constructor(scene) {
<<<<<<< HEAD
    super(scene);
    this.key = 'jupiter';
    this.keyObstacles = 'collides';
    this.keyAtomes = 'bonus';
    this.keyFinish = 'finish';
=======
    super(scene, {
      planet: 'jupiter',
      stars: {
        key: 'bonus',
      },
      tiles: {
        key: 'collides',
      },
      finish: {
        key: 'finish',
      },
    });
>>>>>>> 96e64572cc9e725b99536fe45e50f23a79f149b4
  }
}
