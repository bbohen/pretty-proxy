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
        scrollToIndex={requests.length - 1}
      >
        <Column
          label="Host"
          dataKey="host"
          width={200}
        />
        <Column
          label="Path"
          dataKey="path"
          width={500}
        />
        <Column
          label="Method"
          dataKey="method"
          width={100}
        />
        <Column
          label="Status Code"
          dataKey="statusCode"
          width={200}
        />
        <Column
          label="Response Size"
          dataKey="bytesRead"
          width={200}
        />
      </Table>
    )}
  </AutoSizer>;

Requests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Requests;
