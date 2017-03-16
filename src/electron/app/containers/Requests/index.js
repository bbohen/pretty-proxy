import React, { PropTypes } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

import Wrapper from './Wrapper';
import headerRenderer from './headerRenderer';
import rowRenderer from './rowRenderer';

const Requests = ({ requests }) =>
  <Wrapper>
    <AutoSizer>
      {({ height, width }) => (
        <Table
          headerHeight={30}
          headerRowRenderer={headerRenderer}
          height={height}
          rowCount={requests.length}
          rowGetter={({ index }) => requests[index]}
          rowHeight={30}
          rowRenderer={rowRenderer}
          scrollToIndex={requests.length - 1}
          width={width}
        >
          <Column
            label="Method"
            dataKey="method"
            width={100}
          />
          <Column
            label="Status"
            dataKey="statusCode"
            width={100}
          />
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
            label="Response Size"
            dataKey="bytesRead"
            width={200}
          />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>;

Requests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Requests;
