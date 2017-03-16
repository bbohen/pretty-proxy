import React, { PropTypes } from 'react';

import Row from './Row';

const renderRowWithStyle = ({ className, columns, key, style }) =>
  <Row
    className={className}
    key={key}
    role="row"
    style={style}
  >
    {columns}
  </Row>;

renderRowWithStyle.propTypes = {
  className: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  key: PropTypes.number.isRequired,
  style: PropTypes.shape.isRequired,
};

export default renderRowWithStyle;
