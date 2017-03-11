import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { init } from '../../redux/modules/requests';

class App extends Component {
  static propTypes = {
    init: PropTypes.func.isRequired,
    requests: PropTypes.shape.isRequired,
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { requests } = this.props;
    const requestList = requests.map(({ url }, index) => (
      <li key={index}>
        {url}
      </li>
    ));

    return (
      <div>
        <ul>
          {requestList}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ requests }) {
  return {
    connectedToProxyServer: requests.connectedToProxyServer,
    requests: requests.list,
  };
}

export default connect(
  mapStateToProps,
  {
    init,
  },
)(App);
