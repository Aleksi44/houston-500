import Schema from '../Schema';

export default class NeptuneSchema extends Schema {
  constructor(scene) {
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
  }
}
