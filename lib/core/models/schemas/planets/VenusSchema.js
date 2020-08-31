import Schema from '../Schema';

export default class VenusSchema extends Schema {
  constructor(scene) {
    super(scene, {
      planet: 'venus',
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
