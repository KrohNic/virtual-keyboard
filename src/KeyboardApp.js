import Keyboard from './Keyboard.js';
import Key from './Key.js';

export default class KeyboardApp {
  constructor() {
    this.board = new Keyboard();
  }

  init(elemToAppend) {
    if (window.localStorage.getItem('lang')) {
      this.board.isEngLang = window.localStorage.getItem('lang') === 'true';
    }

    this.generateElements(elemToAppend);
    this.setHandlers();
  }

  generateElements(elemToAppend) {
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    elemToAppend.append(wrapper);

    const area = document.createElement('textarea');
    area.id = 'area';
    area.placeholder = 'Shift + Alt - Change lang';
    area.readOnly = true;
    wrapper.append(area);

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboard.id = 'keyboard';
    wrapper.append(keyboard);

    for (let i = 0; i < this.board.symbols.length; i += 1) {
      this.createKeysRow(this.board.symbols[i], keyboard);
    }

    this.board.initKeySets();
  }

  setHandlers() {
    document.onkeydown = (e) => this.board.handleKeyDown(e);
    document.onkeyup = (e) => this.board.handleKeyUp(e);
  }

  createKeysRow(row, keyboard) {
    const div = document.createElement('div');
    div.classList.add('key-row');
    keyboard.append(div);

    let fragment = new DocumentFragment();

    for (let i = 0; i < row.length; i += 1) {
      let key;

      if (this.board.isEngLang) {
        key = new Key(this.board, row[i][0][0], row[i][1]);
      } else {
        key = new Key(this.board, row[i][0][2], row[i][1]);
      }

      fragment = key.appendTo(fragment);
    }

    div.append(fragment);
  }
}
