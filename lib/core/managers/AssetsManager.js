import PropTypes from 'prop-types';

export default class AssetsManager {
  constructor(core) {
    this.core = core;
  }
}

AssetsManager.propTypes = {
  core: PropTypes.object.isRequired,
};
