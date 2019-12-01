/* eslint-disable global-require */
import Bomberman from '../lib/games/Bomberman/index';

const bomber = new Bomberman({
  parent: 'bomber-space',
});
bomber.run();
