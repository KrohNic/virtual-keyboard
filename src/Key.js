export default class Key {
  constructor(keyboardInst, value, keyCode) {
    this.keyboardInst = keyboardInst;
    this.value = value;
    this.keyCode = keyCode;
    // in ru_lang they are letters, but in en_lang - symbols
    this.mixedKeys = [
      'Backquote',
      'BracketLeft',
      'BracketRight',
      'Semicolon',
      'Quote',
      'Comma',
      'Period',
    ];
  }

  appendTo(fragment) {
    const button = document.createElement('button');
    button.classList.add('keyboard--button');

    if (this.value) {
      if (this.keyCode.includes('Key')) {
        button.classList.add('letter');
      } else if (this.mixedKeys.includes(this.keyCode)) {
        button.classList.add('mixed');
      } else {
        button.classList.add('symbol');
      }

      button.append(this.value);
    } else {
      button.classList.add('functional');
      button.classList.add(this.keyCode.toLowerCase());
      button.append(this.keyCode);
    }

    button.addEventListener('mousedown', (e) => this.keyDown(e));
    button.addEventListener('mouseup', () => this.keyUp());
    button.addEventListener('mouseout', () => this.keyUp());
    button.id = this.keyCode;
    fragment.append(button);
    return fragment;
  }

  repeatKey(fn, keyValue) {
    const keyRepeatInterval = 175;
    fn(keyValue);
    this.interval = setInterval(fn, keyRepeatInterval, keyValue);
  }

  keyDown(event) {
    const area = document.getElementById('area');
    const ShiftLeft = document.getElementById('ShiftLeft');
    const ShiftRight = document.getElementById('ShiftRight');
    const AltLeft = document.getElementById('AltLeft');
    const AltRight = document.getElementById('AltRight');

    switch (event.target.id) {
      case 'Backspace':
        this.repeatKey(() => {
          area.value = area.value.slice(0, -1);
        });
        break;
      case 'Space':
        this.repeatKey(() => {
          area.value += ' ';
        });
        break;
      case 'Tab':
        this.repeatKey(() => {
          area.value += '    ';
        });
        break;
      case 'Enter':
        this.repeatKey(() => {
          area.value += '\n';
        });
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        ShiftLeft.classList.toggle('button_active');
        ShiftRight.classList.toggle('button_active');

        if (AltLeft.classList.contains('button_active')) {
          ShiftLeft.classList.remove('button_active');
          ShiftRight.classList.remove('button_active');
          AltLeft.classList.remove('button_active');
          AltRight.classList.remove('button_active');
          this.keyboardInst.changeLang();
        } else {
          this.keyboardInst.toggleCase();
          this.keyboardInst.shiftSymbols();
        }
        break;
      case 'CapsLock':
        this.keyboardInst.toggleCase();
        break;
      case 'AltLeft':
      case 'AltRight':
        AltLeft.classList.toggle('button_active');
        AltRight.classList.toggle('button_active');

        if (ShiftLeft.classList.contains('button_active')) {
          ShiftLeft.classList.remove('button_active');
          ShiftRight.classList.remove('button_active');
          AltLeft.classList.remove('button_active');
          AltRight.classList.remove('button_active');
          this.keyboardInst.changeLang();
        }
        break;

      default:
        this.repeatKey((text) => {
          area.value += text;
        }, event.target.textContent);
        break;
    }
  }

  keyUp() {
    clearInterval(this.interval);
  }
}
