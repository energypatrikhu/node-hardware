# node-hardware

A TypeScript library for simulating keyboard and mouse input on Windows using the [node-interception](https://www.npmjs.com/package/node-interception) library. This package provides a high-level API to send keystrokes, mouse movements, clicks, and text input programmatically.

## Features
- Simulate keyboard input (single keys, key sequences, text)
- Simulate mouse movement (absolute/relative), clicks, and scroll
- Supports custom key mappings (including special and international keys)
- Built with TypeScript for type safety

## Installation

```sh
npm install @energypatrikhu/node-hardware
```

> **Note:** Requires [node-interception](https://www.npmjs.com/package/node-interception) and its native driver. See [node-interception setup instructions](https://www.npmjs.com/package/node-interception#installation) for details.

## Usage

```ts
import { hardware } from '@energypatrikhu/node-hardware';

// Send a single key
await hardware.sendKey('a');

// Send a sequence of keys
await hardware.sendKeys(['h', 'e', 'l', 'l', 'o']);

// Send text
await hardware.sendText('Hello, world!');

// Move mouse to (100, 200) absolute
await hardware.moveMouse(100, 200);

// Click left mouse button
await hardware.clickMouse('BUTTON_1');

// Scroll mouse wheel
await hardware.scrollMouse(120);
```

## API

### `Hardware` class

#### Keyboard methods
- `sendKey(input: Key)` — Simulate a single key press and release
- `sendKeys(inputs: Key[])` — Simulate a sequence of key presses
- `toggleKey(key: Key, pressed: boolean)` — Press or release a key
- `sendText(text: string)` — Type a string as keyboard input

#### Mouse methods
- `moveMouse(x: number, y: number, relative = false)` — Move mouse to coordinates (absolute or relative)
- `clickMouse(button: 'BUTTON_1' | 'BUTTON_2' | 'BUTTON_3' | 'BUTTON_4' | 'BUTTON_5')` — Simulate mouse button click
- `scrollMouse(amount: number)` — Scroll mouse wheel

### Key Mapping

Key names and mappings are defined in [`src/keycode.ts`](src/keycode.ts). Supports standard, shifted, and AltGr keys, including international layouts.

## Development

- TypeScript config: see [`tsconfig.json`](tsconfig.json)
- Build: `npm run build`

