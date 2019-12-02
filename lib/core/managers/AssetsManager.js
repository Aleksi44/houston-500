import PropTypes from 'prop-types';

export default class AssetsManager {
  constructor(core) {
    this.core = core;
  }

  loadAll = () => {
    const demo = this.core.game.scene.getScene('demo');
    demo.load.svg('satellite', './assets/satellite.svg');
    demo.load.svg('space-station', './assets/space-station.svg');
    demo.load.svg('case-1', './assets/cases/case-1.svg');
  };
}

AssetsManager.propTypes = {
  core: PropTypes.object.isRequired,
};
