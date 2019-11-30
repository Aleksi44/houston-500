import models from './models';
import {
  PROJECT_NAME,
  PROJECT_DESC,
} from './defines';

export default class Bomber {
  constructor(options) {
    const opts = options || {};

    this.core = {
      projectName: PROJECT_NAME,
      projectDesc: PROJECT_DESC,
      canvas: opts.canvas,
      // eslint-disable-next-line no-undef
      document,
    };

    Object.keys(models).forEach((name) => {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new models[name](this);
    });
  }

  runClassicGame() {
    const gl = this.core.canvas.getContext('webgl');
    if (gl === null) {
      // Unable to initialize WebGL. Your browser or machine may not support it
      return;
    }
    gl.clearColor(0.0, 5.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
