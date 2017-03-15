/* eslint-disable no-unused-expressions */

import { injectGlobal } from 'styled-components';
import 'normalize.css/normalize.css';

injectGlobal`
  html,
  body,
  #mount {
    height: 100%;
    width: 100%;
  }

  #mount {
    overflow: hidden;
  }
`;
