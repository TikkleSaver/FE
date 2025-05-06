import { createGlobalStyle } from 'styled-components';
import PretendardVariable from "../assets/fonts/woff2/PretendardVariable.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable';
    font-style: normal;
    src: url(${PretendardVariable}) format('woff2');
  }

  body, html{
    font-family: 'Pretendard Variable', sans-serif;
    margin: 0;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;