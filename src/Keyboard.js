export default class Keyboard {
  constructor() {
    this.symbols = [
      [
        ['`~ёЁ', 'Backquote'],
        ['1!1!', 'Digit1'],
        ['2@2"', 'Digit2'],
        ['3#3№', 'Digit3'],
        ['4$4;', 'Digit4'],
        ['5%5%', 'Digit5'],
        ['6^6:', 'Digit6'],
        ['7&7&', 'Digit7'],
        ['8*8*', 'Digit8'],
        ['9(9(', 'Digit9'],
        ['0)0)', 'Digit0'],
        ['-_-_', 'Minus'],
        ['=+=+', 'Equal'],
        ['', 'Backspace'],
      ],
      [
        ['', 'Tab'],
        ['qQйЙ', 'KeyQ'],
        ['wWцЦ', 'KeyW'],
        ['eEуУ', 'KeyE'],
        ['rRкК', 'KeyR'],
        ['tTеЕ', 'KeyT'],
        ['yYнН', 'KeyY'],
        ['uUгГ', 'KeyU'],
        ['iIшШ', 'KeyI'],
        ['oOщЩ', 'KeyO'],
        ['pPзЗ', 'KeyP'],
        ['[{хХ', 'BracketLeft'],
        [']}ъЪ', 'BracketRight'],
        ['\\|\\/', 'Backslash'],
      ],
      [
        ['', 'CapsLock'],
        ['aAфФ', 'KeyA'],
        ['sSыЫ', 'KeyS'],
        ['dDвВ', 'KeyD'],
        ['fFаА', 'KeyF'],
        ['gGпП', 'KeyG'],
        ['hHрР', 'KeyH'],
        ['jJоО', 'KeyJ'],
        ['kKлЛ', 'KeyK'],
        ['lLдД', 'KeyL'],
        [';:жЖ', 'Semicolon'],
        ["'\"эЭ", 'Quote'],
        ['', 'Enter'],
      ],
      [
        ['', 'ShiftLeft'],
        ['zZяЯ', 'KeyZ'],
        ['xXчЧ', 'KeyX'],
        ['cCсС', 'KeyC'],
        ['vVмМ', 'KeyV'],
        ['bBиИ', 'KeyB'],
        ['nNтТ', 'KeyN'],
        ['mMьЬ', 'KeyM'],
        [',<бБ', 'Comma'],
        ['.>юЮ', 'Period'],
        ['/?.,', 'Slash'],
        ['', 'ShiftRight'],
      ],
      [
        ['', 'ControlLeft'],
        ['', 'AltLeft'],
        ['', 'Space'],
        ['', 'AltRight'],
        ['', 'ControlRight'],
      ],
    ];

    this.isEngLang = true;
    this.isUpperCase = true;
    this.isShiftPressed = false;
  }

  changeLang() {
    this.isEngLang = !this.isEngLang;
    window.localStorage.setItem('lang', this.isEngLang);

    const letters = Array.prototype.slice.call(
      document.getElementsByClassName('letter'),
      0,
    );
    const mixedKeys = Array.prototype.slice.call(
      document.getElementsByClassName('mixed'),
      0,
    );
    const buttons = letters.concat(mixedKeys);

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].innerText = this.getSymbolToSwitch(buttons[i].id);
    }
  }

  toggleCase() {
    this.isUpperCase = !this.isUpperCase;
    let buttons = Array.prototype.slice.call(
      document.getElementsByClassName('letter'),
      0,
    );

    if (!this.isEngLang) {
      const mixedKeys = Array.prototype.slice.call(
        document.getElementsByClassName('mixed'),
        0,
      );
      buttons = buttons.concat(mixedKeys);
    }

    if (this.isUpperCase) {
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].innerText = buttons[i].innerText.toLowerCase();
      }
    } else {
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].innerText = buttons[i].innerText.toUpperCase();
      }
    }
  }

  getSymbolToSwitch(id) {
    const getEngSymbol = (i, j) => {
      if (this.isShiftPressed) {
        return this.symbols[i][j][0][1];
      }

      return this.symbols[i][j][0][0];
    };

    const getRusSymbol = (i, j) => {
      if (this.isShiftPressed) {
        return this.symbols[i][j][0][3];
      }
      return this.symbols[i][j][0][2];
    };

    for (let i = 0; i < this.symbols.length; i += 1) {
      for (let j = 0; j < this.symbols[i].length; j += 1) {
        if (this.symbols[i][j].includes(id)) {
          if (this.isEngLang) {
            return getEngSymbol(i, j);
          }

          return getRusSymbol(i, j);
        }
      }
    }

    return undefined;
  }

  shiftSymbols() {
    this.isShiftPressed = !this.isShiftPressed;

    let buttons = Array.prototype.slice.call(
      document.getElementsByClassName('symbol'),
      0,
    );

    if (this.isEngLang) {
      const mixedKeys = Array.prototype.slice.call(
        document.getElementsByClassName('mixed'),
        0,
      );
      buttons = buttons.concat(mixedKeys);
    }

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].innerText = this.getSymbolToSwitch(buttons[i].id);
    }
  }

  handleKeyDown(e) {
    const button = document.getElementById(e.code);
    const area = document.getElementById('area');

    if (button) {
      button.classList.add('active');
    } else {
      return;
    }

    e.preventDefault();

    if (e.code.includes('Shift')) {
      this.toggleCase();
      this.shiftSymbols();
    } else if (e.code.includes('Space')) {
      area.value += ' ';
    } else if (e.code.includes('Tab')) {
      area.value += '    ';
    } else if (e.code.includes('Enter')) {
      area.value += '\n';
    } else if (e.code.includes('Backspace')) {
      area.value = area.value.slice(0, -1);
    } else if (!button.classList.contains('functional')) {
      area.value += button.innerText;
    }
  }

  handleKeyUp(e) {
    const button = document.getElementById(e.code);
    if (button) {
      button.classList.remove('active');
    } else {
      return;
    }

    e.preventDefault();

    if (e.code.includes('Shift')) {
      this.toggleCase();
      this.shiftSymbols();
    } else if (e.code.includes('Caps')) {
      this.toggleCase();
    } else if (e.code.includes('Alt') && e.shiftKey) {
      this.changeLang();
    }
  }
}

// TODO: extract func from Array.prototype.slice.call(...)

// TODO: line 195 remake to switch()
