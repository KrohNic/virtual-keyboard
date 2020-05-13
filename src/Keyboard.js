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

    this.buttonsEn = null;
    this.mixedKeys = null;
    this.buttonsRu = null;
  }

  initKeySets() {
    this.buttonsEn = Array.from(document.querySelectorAll('.letter'));
    this.mixedKeys = Array.from(document.querySelectorAll('.mixed'));
    this.buttonsSymbolRu = Array.from(document.querySelectorAll('.symbol'));

    this.buttonsSymbolEn = this.buttonsSymbolRu.concat(this.mixedKeys);
    this.buttonsRu = this.buttonsEn.concat(this.mixedKeys);
  }

  changeLang() {
    this.isEngLang = !this.isEngLang;
    window.localStorage.setItem('lang', this.isEngLang);

    this.buttonsRu.forEach((button) => {
      const btn = button;
      btn.textContent = this.getSymbolToSwitch(button.id);
    });
  }

  static toLowerCase(text) {
    return text.toLowerCase();
  }

  static toUpperCase(text) {
    return text.toUpperCase();
  }

  toggleCase() {
    let buttonsToChange;
    let textCaseFn;

    this.isUpperCase = !this.isUpperCase;

    if (this.isEngLang) buttonsToChange = this.buttonsEn;
    else buttonsToChange = this.buttonsRu;

    if (this.isUpperCase) textCaseFn = Keyboard.toLowerCase;
    else textCaseFn = Keyboard.toUpperCase;

    for (let i = 0; i < buttonsToChange.length; i += 1) {
      buttonsToChange[i].textContent = textCaseFn(
        buttonsToChange[i].textContent,
      );
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
    let buttonsToChange;

    if (this.isEngLang) buttonsToChange = this.buttonsSymbolEn;
    else buttonsToChange = this.buttonsSymbolRu;

    this.isShiftPressed = !this.isShiftPressed;

    for (let i = 0; i < buttonsToChange.length; i += 1) {
      buttonsToChange[i].textContent = this.getSymbolToSwitch(
        buttonsToChange[i].id,
      );
    }
  }

  handleKeyDown(e) {
    const button = document.getElementById(e.code);
    const area = document.getElementById('area');

    if (button) {
      button.classList.add('button_active');
    } else {
      return;
    }

    e.preventDefault();

    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.toggleCase();
        this.shiftSymbols();
        break;
      case 'Space':
        area.value += ' ';
        break;
      case 'Tab':
        area.value += '    ';
        break;
      case 'Enter':
        area.value += '\n';
        break;
      case 'Backspace':
        area.value = area.value.slice(0, -1);
        break;
      default:
        if (!button.classList.contains('functional')) {
          area.value += button.textContent;
        }
        break;
    }
  }

  handleKeyUp(e) {
    const button = document.getElementById(e.code);
    if (button) {
      button.classList.remove('button_active');
    } else {
      return;
    }

    e.preventDefault();

    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.toggleCase();
        this.shiftSymbols();
        break;
      case 'CapsLock':
        this.toggleCase();
        break;
      default:
        if (e.code.includes('Alt') && e.shiftKey) {
          this.changeLang();
        }
        break;
    }
  }
}
