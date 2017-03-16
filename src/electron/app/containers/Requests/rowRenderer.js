/* eslint-disable no-bitwise */
import React, { PropTypes } from 'react';

import Row from './Row';

const rowRenderer = ({ className, columns, index, key, style }) =>
  <Row
    className={className}
    isRowOdd={(index & 1)}
    key={key}
    role="row"
    style={style}
  >
    {columns}
  </Row>;

rowRenderer.propTypes = {
  className: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  index: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
  style: PropTypes.shape.isRequired,
};

export default rowRenderer;
