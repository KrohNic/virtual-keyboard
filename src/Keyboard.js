export default class Keyboard {
  constructor(keyboardAppInst) {
    // ['smallEngLetter bigEngLetter smallRusLetter bigRusLetter'], ['id']
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
        ['◄◄◄◄', 'ArrowLeft'],
        ['►►►►', 'ArrowRight'],
      ],
    ];

    this.keyboardAppInst = keyboardAppInst;
    this.area = null;
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
    const lang = this.isEngLang ? 'eng' : 'rus';
    window.localStorage.setItem('lang', lang);

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

    let getSymbol;

    if (this.isEngLang) getSymbol = (i, j) => getEngSymbol(i, j);
    else getSymbol = (i, j) => getRusSymbol(i, j);

    for (let i = 0; i < this.symbols.length; i += 1) {
      for (let j = 0; j < this.symbols[i].length; j += 1) {
        if (this.symbols[i][j].includes(id)) {
          return getSymbol(i, j);
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

  printText(text) {
    this.area.setRangeText(
      text,
      this.area.selectionStart,
      this.area.selectionEnd,
      'end',
    );
  }

  backspace() {
    if (this.area.selectionStart !== this.area.selectionEnd) {
      this.printText('');
    } else if (this.area.selectionStart > 0) {
      this.area.setRangeText(
        '',
        this.area.selectionStart - 1,
        this.area.selectionStart,
        'end',
      );
    }
  }

  handleKeyDown(e) {
    const button = document.getElementById(e.code);

    if (!button) return true;

    button.classList.add('button_active');

    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.toggleCase();
        this.shiftSymbols();
        return false;
      case 'Space':
        this.printText(' ');
        return false;
      case 'Tab':
        this.printText('    ');
        return false;
      case 'Enter':
        this.printText('\n');
        return false;
      case 'Backspace':
        this.backspace();
        return false;
      case 'ArrowLeft':
      case 'ArrowRight':
        return true;
      default:
        if (!button.classList.contains('functional')) {
          this.printText(button.textContent);
        }
    }

    return false;
  }

  handleKeyUp(e) {
    const button = document.getElementById(e.code);

    if (!button) return;

    button.classList.remove('button_active');
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

    if (document.activeElement !== this.area) this.area.focus();
  }
}
