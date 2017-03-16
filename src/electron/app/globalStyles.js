/* eslint-disable no-unused-expressions */

import { injectGlobal } from 'styled-components';
import 'normalize.css/normalize.css';

import OpenSans from './assets/fonts/open-sans.woff';

injectGlobal`
  @font-face {
    font-family: Open-sans;
    src: url('${OpenSans}') format('woff');
  }

  html,
  body,
  #mount {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Open-sans, Helvetica, Arial, sans-serif;
  }

  #mount {
    overflow: hidden;
  }

`;
