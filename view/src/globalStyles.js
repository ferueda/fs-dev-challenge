import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  body {
    overscroll-behavior: none;
  }
  
  ol, ul {
    list-style: none;
  }
`;

export default GlobalStyles;
