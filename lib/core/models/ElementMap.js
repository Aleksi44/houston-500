import PropTypes from 'prop-types';
import Model from './Model';

export default class ElementMap extends Model {
}

ElementMap.defaultProps = {
  x: 0,
  y: 0,
};

ElementMap.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
