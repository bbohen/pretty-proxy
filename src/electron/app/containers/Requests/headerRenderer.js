import React, { PropTypes } from 'react';

import Header from './Header';

const renderHeaderWithStyle = ({ className, columns, style }) =>
  <Header
    className={className}
    role="row"
    style={style}
  >
    {columns}
  </Header>;

renderHeaderWithStyle.propTypes = {
  className: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  style: PropTypes.shape.isRequired,
};

export default renderHeaderWithStyle;
