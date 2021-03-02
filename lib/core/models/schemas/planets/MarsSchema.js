import Schema from '../Schema';

export default class MarsSchema extends Schema {
  constructor(scene) {
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
  }
}
