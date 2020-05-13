import KeyboardApp from './KeyboardApp.js';

document.body.onload = () => {
  const app = new KeyboardApp();
  app.init(document.body);
};
