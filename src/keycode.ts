export interface KeyCodeResult {
  hex: number;
  states: number[];
}

export type KeyMap = keyof typeof keyMap;
export type ShiftMap = keyof typeof shiftMap;
export type AltGrSpecial = keyof typeof altGrSpecial;
export type ShiftSpecial = keyof typeof shiftSpecial;
export type Key = KeyMap | ShiftMap | AltGrSpecial | ShiftSpecial;

// Main key mapping (normal keys)
const keyMap = {
  "0": { hex: 0x29, states: [0, 1] },
  "1": { hex: 0x2, states: [0, 1] },
  "2": { hex: 0x3, states: [0, 1] },
  "3": { hex: 0x4, states: [0, 1] },
  "4": { hex: 0x5, states: [0, 1] },
  "5": { hex: 0x6, states: [0, 1] },
  "6": { hex: 0x7, states: [0, 1] },
  "7": { hex: 0x8, states: [0, 1] },
  "8": { hex: 0x9, states: [0, 1] },
  "9": { hex: 0xa, states: [0, 1] },
  "a": { hex: 0x1e, states: [0, 1] },
  "á": { hex: 0x28, states: [0, 1] },
  "b": { hex: 0x30, states: [0, 1] },
  "c": { hex: 0x2e, states: [0, 1] },
  "d": { hex: 0x20, states: [0, 1] },
  "e": { hex: 0x12, states: [0, 1] },
  "é": { hex: 0x17, states: [0, 1] },
  "f": { hex: 0x21, states: [0, 1] },
  "g": { hex: 0x22, states: [0, 1] },
  "h": { hex: 0x23, states: [0, 1] },
  "i": { hex: 0x17, states: [0, 1] },
  "í": { hex: 0x56, states: [0, 1] },
  "j": { hex: 0x24, states: [0, 1] },
  "k": { hex: 0x25, states: [0, 1] },
  "l": { hex: 0x26, states: [0, 1] },
  "m": { hex: 0x32, states: [0, 1] },
  "n": { hex: 0x31, states: [0, 1] },
  "o": { hex: 0x18, states: [0, 1] },
  "ő": { hex: 0x1a, states: [0, 1] },
  "ö": { hex: 0xb, states: [0, 1] },
  "ó": { hex: 0xd, states: [0, 1] },
  "p": { hex: 0x19, states: [0, 1] },
  "q": { hex: 0x10, states: [0, 1] },
  "r": { hex: 0x13, states: [0, 1] },
  "s": { hex: 0x1f, states: [0, 1] },
  "t": { hex: 0x14, states: [0, 1] },
  "u": { hex: 0x16, states: [0, 1] },
  "ú": { hex: 0x1b, states: [0, 1] },
  "ű": { hex: 0x2b, states: [0, 1] },
  "ü": { hex: 0xc, states: [0, 1] },
  "v": { hex: 0x2f, states: [0, 1] },
  "w": { hex: 0x11, states: [0, 1] },
  "x": { hex: 0x2d, states: [0, 1] },
  "y": { hex: 0x2c, states: [0, 1] },
  "z": { hex: 0x15, states: [0, 1] },
  ",": { hex: 0x33, states: [0, 1] },
  ".": { hex: 0x34, states: [0, 1] },
  "-": { hex: 0x35, states: [0, 1] },
  "esc": { hex: 0x01, states: [0, 1] },
  "f1": { hex: 0x3b, states: [0, 1] },
  "f2": { hex: 0x3c, states: [0, 1] },
  "f3": { hex: 0x3d, states: [0, 1] },
  "f4": { hex: 0x3e, states: [0, 1] },
  "f5": { hex: 0x3f, states: [0, 1] },
  "f6": { hex: 0x40, states: [0, 1] },
  "f7": { hex: 0x41, states: [0, 1] },
  "f8": { hex: 0x42, states: [0, 1] },
  "f9": { hex: 0x43, states: [0, 1] },
  "f10": { hex: 0x44, states: [0, 1] },
  "f11": { hex: 0x57, states: [0, 1] },
  "f12": { hex: 0x58, states: [0, 1] },
  "prtSc": { hex: 0x37, states: [0, 1] },
  "scrLk": { hex: 0x46, states: [0, 1] },
  "pause": { hex: 0x1d, states: [0, 1] },
  "backspace": { hex: 0xe, states: [0, 1] },
  "insert": { hex: 0x52, states: [0, 1] },
  "home": { hex: 0x47, states: [0, 1] },
  "pgUp": { hex: 0x49, states: [0, 1] },
  "tab": { hex: 0xf, states: [0, 1] },
  "\t": { hex: 0xf, states: [0, 1] },
  "enter": { hex: 0x1c, states: [0, 1] },
  "\n": { hex: 0x1c, states: [0, 1] },
  "delete": { hex: 0x53, states: [2, 3] },
  "end": { hex: 0x4f, states: [2, 3] },
  "pgDn": { hex: 0x51, states: [2, 3] },
  "capslock": { hex: 0x3a, states: [0, 1] },
  "lShift": { hex: 0x2a, states: [0, 1] },
  "rShift": { hex: 0x36, states: [0, 1] },
  "lCtrl": { hex: 0x1d, states: [0, 1] },
  "rCtrl": { hex: 0x1d, states: [2, 3] },
  "lWin": { hex: 0x5b, states: [2, 3] },
  "lAlt": { hex: 0x38, states: [0, 1] },
  "space": { hex: 0x39, states: [0, 1] },
  " ": { hex: 0x39, states: [0, 1] },
  "altGr": { hex: 0x38, states: [2, 3] },
  "context": { hex: 0x5d, states: [2, 3] },
  "upArrow": { hex: 0x48, states: [2, 3] },
  "downArrow": { hex: 0x50, states: [2, 3] },
  "leftArrow": { hex: 0x4b, states: [2, 3] },
  "rightArrow": { hex: 0x4d, states: [2, 3] },
};

// Shifted and AltGr mappings
const shiftKey = { hex: 0x2a, states: [0, 1] };
const altGrKey = { hex: 0x38, states: [2, 3] };

const shiftMap = {
  A: "a",
  Á: "á",
  B: "b",
  C: "c",
  D: "d",
  E: "e",
  É: "é",
  F: "f",
  G: "g",
  H: "h",
  I: "i",
  Í: "í",
  J: "j",
  K: "k",
  L: "l",
  M: "m",
  N: "n",
  O: "o",
  Ó: "ó",
  Ö: "ö",
  Ő: "ő",
  P: "p",
  Q: "q",
  R: "r",
  S: "s",
  T: "t",
  U: "u",
  Ú: "ú",
  Ü: "ü",
  Ű: "ű",
  V: "v",
  W: "w",
  X: "x",
  Y: "y",
  Z: "z",
};
const shiftSpecial = {
  '"': "2",
  "_": "-",
  ":": ".",
  "!": "4",
  "?": ",",
  "'": "1",
  "(": "8",
  ")": "9",
  "§": "0",
  "/": "6",
  "%": "5",
  "+": "3",
  "=": "7",
};
const altGrSpecial = {
  ";": ",",
  "[": "f",
  "]": "g",
  "{": "b",
  "}": "n",
  "@": "v",
  "*": "-",
  "\\": "q",
  "&": "c",
  "#": "x",
  "`": "7",
  "´": "9",
  "^": "3",
  "˘": "4",
  "˙": "8",
  "¨": "ü",
  "˝": "ö",
  "¸": "ó",
  "˛": "6",
  "ˇ": "2",
  "°": "5",
  "÷": "ő",
  "×": "ú",
  "<": "í",
  ">": "y",
  "|": "w",
  "~": "1",
  "¤": "ű",
  "$": "é",
  "€": "u",
  "ä": "a",
  "Ä": "e",
  "Đ": "d",
  "đ": "s",
  "Í": "i",
  "í": "j",
  "ł": "k",
  "Ł": "l",
  "ß": "á",
};

export function translateToKeyCodes(
  input: KeyMap | ShiftMap | AltGrSpecial | ShiftSpecial,
): KeyCodeResult[] {
  const result: KeyCodeResult[] = [];
  // Try to match full key names first (for e.g. lWin)
  if (keyMap[input as KeyMap]) {
    result.push(keyMap[input as KeyMap]);
    return result;
  }
  for (const char of input) {
    if (keyMap[char as KeyMap]) {
      result.push(keyMap[char as KeyMap]);
    } else if (shiftMap[char as ShiftMap]) {
      result.push(shiftKey);
      result.push(keyMap[shiftMap[char as ShiftMap] as KeyMap]);
    } else if (shiftSpecial[char as ShiftSpecial]) {
      result.push(shiftKey);
      result.push(keyMap[shiftSpecial[char as ShiftSpecial] as KeyMap]);
    } else if (altGrSpecial[char as AltGrSpecial]) {
      result.push(altGrKey);
      result.push(keyMap[altGrSpecial[char as AltGrSpecial] as KeyMap]);
    } else if (keyMap[char.toLowerCase() as KeyMap]) {
      result.push(keyMap[char.toLowerCase() as KeyMap]);
    } else {
      throw new Error(`No mapping for character: ${char}`);
    }
  }
  return result;
}

// Example usage:
// console.log(translateToKeyCodes('á'));
// console.log(translateToKeyCodes('Á'));
// console.log(translateToKeyCodes('lWin'));
