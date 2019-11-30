/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import BomberSpace from '../lib';

const bs = new BomberSpace({
  // eslint-disable-next-line no-undef
  canvas: document.getElementById('bomber-space'),
});
bs.runClassicGame();
