import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { init as initProxy } from '../../redux/modules/requests';
import RequestsContainer from '../Requests';
import theme from '../../themes';

class App extends Component {
  static propTypes = {
    connectedToProxyServer: PropTypes.bool.isRequired,
    initProxy: PropTypes.func.isRequired,
    requests: PropTypes.arrayOf(PropTypes.shape).isRequired,
  }

  componentDidMount() {
    this.props.initProxy();
  }

  render() {
    const { connectedToProxyServer, requests } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <RequestsContainer
          connectedToProxyServer={connectedToProxyServer}
          requests={requests}
        />
      </ThemeProvider>
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
    initProxy,
  },
)(App);
