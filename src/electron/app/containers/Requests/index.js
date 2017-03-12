import React, { PropTypes } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';

import 'react-virtualized/styles.css';

const Requests = ({ requests }) =>
  <AutoSizer>
    {({ height, width }) => (
      <Table
        width={width}
        height={height}
        headerHeight={20}
        rowHeight={30}
        rowCount={requests.length}
        rowGetter={({ index }) => requests[index]}
      >
        <Column
          label="Url"
          dataKey="url"
          width={500}
        />
        <Column
          width={200}
          label="Status Code"
          dataKey="statusCode"
        />
      </Table>
    )}
  </AutoSizer>;

Requests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Requests;
