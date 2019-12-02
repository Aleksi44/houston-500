import Statistic from './Statistic';
import ElementMap from './ElementMap';

export default class Entity extends ElementMap {
  constructor(core) {
    super(core);
    this.stat = new Statistic();
  }
}
