import { useLayoutEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useDarkerMode() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const setMode = (mode) => {
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useLayoutEffect(() => {
    theme ? setTheme(theme) : setMode('light');
  });
  return [theme, themeToggler];
}
