import Model from './Model';

export default class User extends Model {
  constructor(scene) {
    super(scene);
    this.players = [];
  }

  setPlayer(players) {
    this.players = players;
  }

  getBestPlayer() {
    let bestScore = -1;
    let playerBest = null;
    for (let player of this.players) {
      let playerScore = player.getCurrentScore();
      if (playerScore > bestScore) {
        bestScore = playerScore;
        playerBest = player;
      }
    }
    return playerBest;
  }

  getBestUsername() {
    return this.getBestPlayer().name;
  }

  getBestCurrentScore() {
    return this.getBestPlayer().getCurrentScore();
  }
}
