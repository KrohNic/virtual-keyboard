import KeyboardApp from './KeyboardApp.js';

document.body.onload = () => {
  const app = new KeyboardApp(document.body);
  app.init(document.body);
};
