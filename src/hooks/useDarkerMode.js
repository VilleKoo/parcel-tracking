import { useLayoutEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useDarkerMode() {
  const [theme, setTheme] = useLocalStorage('theme', '');

  const setMode = (mode) => {
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useLayoutEffect(() => {
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !theme
      ? setMode('dark')
      : theme
      ? setTheme(theme)
      : setMode('light');
  });
  return [theme, themeToggler];
}
