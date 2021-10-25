import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --background-dark: #3e3e3e;
    --background-light: #f7fafc;
    --primary-text-color-dark: #f7fafc;
    --primary-text-color-light: #f1f1f1;
    --darker-gray: #181a21;
    --light-gray: #ccc;
  }

  * {
    box-sizing: border-box
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    overflow: hidden;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    padding: 1px;
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    border: solid 2px ${({ theme }) => theme.body};
    background-color: ${({ theme }) => theme.scrollbarThumb};
  }
`;

export default GlobalStyle;
