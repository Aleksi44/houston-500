import Schema from '../Schema';

export default class SaturneSchema extends Schema {
  constructor(scene) {
    super(scene, {
      planet: 'saturne',
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
