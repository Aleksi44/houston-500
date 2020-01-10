import Model from './Model';

export default class User extends Model {
  constructor() {
    super();
    this.username = '';
    this.reset();
  }

  reset() {
    this.score = 0;
    this.scoreLevel = 0;
  }

  resetLevel() {
    this.scoreLevel = 0;
  }

  nextLevel() {
    this.score += this.scoreLevel;
    this.scoreLevel = 0;
  }

  getCurrentScore() {
    return this.scoreLevel + this.score;
  }
}
