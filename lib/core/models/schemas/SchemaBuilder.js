
export default class SchemaBuilder {
  constructor(scene) {
    this.scene = scene;
    this.TILE_SIZE = 16;
    this.TILE_EMPTY = -1;
    this.data = [];
    this.TILE_START_COLLIDER = 0;
    this.TILE_STOP_COLLIDER = 100;
    this.hg = Math.round(this.scene.core.options.config.height / this.TILE_SIZE) + 10;
    for (let a = 0; a < this.hg; a += 1) {
      this.data[a] = [];
    }
  }

  getWidth = () => this.data[0].length * this.TILE_SIZE;

  getHeight = () => this.data.length * this.TILE_SIZE;


  inside = (width = 5, topTile, bottomTile) => {
    for (let a = 0; a < this.hg; a += 1) {
      for (let i = 0; i < width; i += 1) {
        if (a === 0) {
          this.data[a].push(topTile);
        } else if (a === this.hg - 1) {
          this.data[a].push(bottomTile);
        } else {
          this.data[a].push(this.TILE_EMPTY);
        }
      }
    }
  };

  foobar = (tile, wholePr = 1 / 2, wholeSize = 4) => {
    const start = Math.round(this.hg * wholePr) - Math.round(wholeSize / 2);
    for (let a = 0; a < this.hg; a += 1) {
      if (a <= start || a >= start + wholeSize) {
        this.data[a].push(tile);
      } else {
        this.data[a].push(this.TILE_EMPTY);
      }
    }
  };
}
