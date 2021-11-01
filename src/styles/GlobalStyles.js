import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  [hidden] {
    display: block;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

  :root {
    --background-dark: #3e3e3e;
    --background-light: #f7fafc;
    --primary-text-color-dark: #f7fafc;
    --primary-text-color-light: #f1f1f1;
    --darker-gray: #181a21;
    --light-gray: #ccc;

    --spacing: 4px;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0;
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
