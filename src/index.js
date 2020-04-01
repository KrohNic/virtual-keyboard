import Keyboard from './Keyboard.js';
import Key from './Key.js';

const board = new Keyboard();

function createKeysRow(row, keyboard) {
  const div = document.createElement('div');
  div.classList.add('key-row');
  keyboard.append(div);

  let fragment = new DocumentFragment();

  for (let i = 0; i < row.length; i += 1) {
    let key;

    if (board.isEngLang) {
      key = new Key(row[i][0][0], row[i][1]);
    } else {
      key = new Key(row[i][0][2], row[i][1]);
    }

    fragment = key.appendTo(fragment);
  }

  div.append(fragment);
}

function init() {
  if (window.localStorage.getItem('lang')) {
    board.isEngLang = window.localStorage.getItem('lang') === 'true';
  }

  const wrapper = document.createElement('div');
  wrapper.id = 'wrapper';
  document.body.append(wrapper);

  const area = document.createElement('textarea');
  area.id = 'area';
  area.placeholder = 'Shift + Alt - Change lang';
  area.readOnly = true;
  wrapper.append(area);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';
  wrapper.append(keyboard);

  for (let i = 0; i < board.symbols.length; i += 1) {
    createKeysRow(board.symbols[i], keyboard);
  }

  document.onkeydown = (e) => board.handleKeyDown(e);
  document.onkeyup = (e) => board.handleKeyUp(e);
}

init();
