export function getPrefersDarkFromMQ() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getColorFromTheme(theme) {
  return theme === 'system' ? (getPrefersDarkFromMQ() ? 'dark' : 'light') : theme;
}