import Model from './Model';

export default class User extends Model {
  constructor() {
    super();
    this.score = 0;
    this.username = '';
  }

  reset() {
    this.score = 0;
  }
}
