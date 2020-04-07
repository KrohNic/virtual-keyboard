export default class Key {
  constructor(keyboardInst, value, keyCode) {
    this.keyboardInst = keyboardInst;
    this.value = value;
    this.keyCode = keyCode;
    // in ru_lang they are letters, but in en_lang - symbols
    this.mixedKeys = [
      "Backquote",
      "BracketLeft",
      "BracketRight",
      "Semicolon",
      "Quote",
      "Comma",
      "Period"
    ];
  }

  appendTo(fragment) {
    const button = document.createElement("button");

    if (this.value) {
      if (this.keyCode.includes("Key")) {
        button.classList.add("letter");
      } else if (this.mixedKeys.includes(this.keyCode)) {
        button.classList.add("mixed");
      } else {
        button.classList.add("symbol");
      }

      button.append(this.value);
    } else {
      button.classList.add("functional");
      button.classList.add(this.keyCode.toLowerCase());
      button.append(this.keyCode);
    }

    button.onmousedown = this.keyDown;
    button.onmouseup = this.keyUp;
    button.onmouseout = this.keyUp;
    button.id = this.keyCode;
    fragment.append(button);
    return fragment;
  }

  keyDown() {
    const area = document.getElementById("area");
    const ShiftLeft = document.getElementById("ShiftLeft");
    const ShiftRight = document.getElementById("ShiftRight");
    const AltLeft = document.getElementById("AltLeft");
    const AltRight = document.getElementById("AltRight");

    const repeatKey = (fn, keyValue) => {
      const keyRepeatInterval = 175;
      fn(keyValue);
      this.interval = setInterval(fn, keyRepeatInterval, keyValue);
    };

    if (this.id === "Backspace") {
      repeatKey(() => {
        area.value = area.value.slice(0, -1);
      });
    } else if (this.id === "Space") {
      repeatKey(() => {
        area.value += " ";
      });
    } else if (this.id === "Tab") {
      repeatKey(() => {
        area.value += "    ";
      });
    } else if (this.id === "Enter") {
      repeatKey(() => {
        area.value += "\n";
      });
    } else if (this.id === "ShiftLeft" || this.id === "ShiftRight") {
      ShiftLeft.classList.toggle("active");
      ShiftRight.classList.toggle("active");

      if (AltLeft.classList.contains("active")) {
        ShiftLeft.classList.remove("active");
        ShiftRight.classList.remove("active");
        AltLeft.classList.remove("active");
        AltRight.classList.remove("active");
        this.keyboardInst.changeLang();
      } else {
        this.keyboardInst.toggleCase();
        this.keyboardInst.shiftSymbols();
      }
    } else if (this.id === "CapsLock") {
      this.keyboardInst.toggleCase();
    } else if (this.id === "AltLeft" || this.id === "AltRight") {
      AltLeft.classList.toggle("active");
      AltRight.classList.toggle("active");

      if (ShiftLeft.classList.contains("active")) {
        ShiftLeft.classList.remove("active");
        ShiftRight.classList.remove("active");
        AltLeft.classList.remove("active");
        AltRight.classList.remove("active");
        this.keyboardInst.changeLang();
      }
    } else {
      repeatKey(text => {
        area.value += text;
      }, this.textContent);
    }
  }

  keyUp() {
    clearInterval(this.interval);
  }
}
