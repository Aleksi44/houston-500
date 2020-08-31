import Schema from '../Schema';

export default class JupiterSchema extends Schema {
  constructor(scene) {
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
  }
}
