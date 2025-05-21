import {
  Interception,
  Keyboard,
  Mouse,
  MouseFlag,
  MouseState,
} from "node-interception";
import fs from "node:fs";
import { Key, translateToKeyCodes } from "./keycode";

interface KeyStroke {
  code: number;
  state: number;
}

interface MouseStroke {
  x?: number;
  y?: number;
  state: number;
  flags?: MouseFlag;
  rolling?: number;
}

type MouseButton =
  | "BUTTON_1"
  | "BUTTON_2"
  | "BUTTON_3"
  | "BUTTON_4"
  | "BUTTON_5";

export class Hardware {
  private interception: Interception;
  private keyboardHw: Keyboard;
  private mouseHw: Mouse;

  private requiredDrivers = [
    "C:/Windows/System32/drivers/keyboard.sys",
    "C:/Windows/System32/drivers/mouse.sys",
  ];

  private mouseButtons = [
    "BUTTON_1",
    "BUTTON_2",
    "BUTTON_3",
    "BUTTON_4",
    "BUTTON_5",
  ] as const;

  delayAfterPress: number = 50;
  delayAfterRelease: number = 50;

  constructor() {
    if (process.platform !== "win32") {
      throw new Error("This library is only supported on Windows.");
    }

    for (const driver of this.requiredDrivers) {
      if (!fs.existsSync(driver)) {
        throw new Error(
          `Required driver not found: "${driver}", please install Interception. (https://github.com/oblitum/Interception)`,
        );
      }
    }

    this.interception = new Interception();

    this.keyboardHw = this.interception.getKeyboards()[0];
    if (!this.keyboardHw) {
      throw new Error("Failed to get keyboard device.");
    }

    this.mouseHw = this.interception.getMice()[0];
    if (!this.mouseHw) {
      throw new Error("Failed to get mouse device.");
    }
  }

  /**
   * Asynchronously waits for the specified number of milliseconds.
   *
   * @param ms - The number of milliseconds to wait before resolving the promise.
   * @returns A promise that resolves after the specified delay.
   */
  private async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Blocks execution synchronously for the specified number of milliseconds.
   *
   * @param ms - The number of milliseconds to wait.
   * @returns A promise that resolves after the specified delay.
   */
  private async waitSync(ms: number) {
    const end = Date.now() + ms;
    while (Date.now() < end) continue;
  }

  /**
   * Sends a keyboard stroke event to the connected keyboard device.
   *
   * @param stroke - The keyboard stroke information to send.
   * @throws {Error} If the interception is not initialized.
   * @throws {Error} If the keyboard device is not available.
   */
  private sendKeyboardStroke(stroke: KeyStroke) {
    if (!this.interception) {
      throw new Error("Interception not initialized.");
    }

    if (!this.keyboardHw) {
      throw new Error("Failed to get device.");
    }

    // @ts-ignore
    this.keyboardHw.send({
      type: "keyboard",
      information: 0,
      ...stroke,
    });
  }

  /**
   * Sends a mouse stroke event using the initialized interception and mouse device.
   *
   * @param stroke - The mouse stroke data to be sent. This should include properties describing the mouse action (e.g., movement, button press).
   * @throws {Error} If the interception is not initialized.
   * @throws {Error} If the mouse device is not available.
   */
  private sendMouseStroke(stroke: MouseStroke) {
    if (!this.interception) {
      throw new Error("Interception not initialized.");
    }

    if (!this.mouseHw) {
      throw new Error("Failed to get mouse device.");
    }

    // @ts-ignore
    this.mouseHw.send({
      type: "mouse",
      information: 0,
      ...stroke,
    });
  }

  keyboard = {
    /**
     * Sends a key input by translating it into key codes and simulating keyboard strokes.
     *
     * This method translates the provided `input` into an array of key codes using `translateToKeyCodes`.
     * For each key code, it sends both possible states (typically representing key press and release)
     * by calling `sendKeyboardStroke`. After sending all strokes, it waits for a delay specified by
     * `pressDelay` (if greater than 0), otherwise performs a synchronous wait.
     *
     * @param input - The key input to be sent, of type `Key`.
     * @returns A promise that resolves when the key strokes have been sent and the delay has elapsed.
     */
    sendKey: async (
      input: Key,
      delayAfterPress?: number,
      delayAfterRelease?: number,
    ) => {
      const strokes = translateToKeyCodes(input);

      if (strokes.length === 0) {
        console.error("No key strokes found for input:", input);
        return;
      }

      const pressDelay = delayAfterPress ?? this.delayAfterPress;
      const releaseDelay = delayAfterRelease ?? this.delayAfterRelease;

      for (let stateIndex = 0; stateIndex < 2; stateIndex++) {
        for (const stroke of strokes) {
          this.sendKeyboardStroke({
            code: stroke.hex,
            state: stroke.states[stateIndex],
          });
        }

        if (pressDelay > 0) {
          await this.wait(pressDelay);
        }
      }

      if (releaseDelay > 0) {
        await this.wait(releaseDelay);
      } else {
        this.waitSync(1);
      }
    },

    /**
     * Sends a sequence of key inputs asynchronously.
     *
     * Iterates over the provided array of `Key` objects and sends each key using the `sendKey` method.
     * Each key is sent sequentially, waiting for the previous one to complete before sending the next.
     *
     * @param inputs - An array of `Key` objects to be sent in order.
     * @returns A promise that resolves when all keys have been sent.
     */
    sendKeys: async (
      inputs: Key[],
      delayAfterPress?: number,
      delayAfterRelease?: number,
    ) => {
      for (const input of inputs) {
        await this.keyboard.sendKey(input, delayAfterPress, delayAfterRelease);
      }
    },

    /**
     * Toggles the state of a specified key by sending the appropriate keyboard strokes.
     *
     * @param key - The key to toggle, represented as a `Key`.
     * @param pressed - A boolean indicating whether the key should be pressed (`true`) or released (`false`).
     * @returns A promise that resolves when the key toggle operation is complete.
     */
    toggleKey: async (key: Key, pressed: boolean) => {
      const strokes = translateToKeyCodes(key);

      if (strokes.length === 0) {
        console.error("No key strokes found for input:", key);
        return;
      }

      for (const stroke of strokes) {
        this.sendKeyboardStroke({
          code: stroke.hex,
          state: stroke.states[pressed ? 0 : 1],
        });
      }
    },

    /**
     * Sends a string of text by converting it into an array of `Key` values and passing them to `sendKeys`.
     *
     * @param text - The text string to be sent.
     * @returns The result of the `sendKeys` method, which handles the array of keys.
     */
    printText: (text: string, delayAfterCharTyping?: number) => {
      const chars = Array.from(text);
      return this.keyboard.sendKeys(
        chars.map((ch) => ch as Key),
        this.delayAfterPress,
        delayAfterCharTyping,
      );
    },
  };

  mouse = {
    /**
     * Moves the mouse cursor to the specified coordinates.
     *
     * @param x - The X coordinate to move the mouse to.
     * @param y - The Y coordinate to move the mouse to.
     * @param relative - If `true`, moves the mouse relative to its current position;
     *                   if `false`, moves the mouse to the absolute screen coordinates. Defaults to `false`.
     * @returns A promise that resolves when the mouse movement has been sent.
     */
    move: async (x: number, y: number, relative: boolean = false) => {
      this.sendMouseStroke({
        x,
        y,
        state: 0,
        flags: relative ? MouseFlag.MOVE_RELATIVE : MouseFlag.MOVE_ABSOLUTE,
      });
    },

    /**
     * Simulates a mouse click by sending a mouse button down and up event for the specified button.
     *
     * @param button - The mouse button to click. Must be one of: "BUTTON_1", "BUTTON_2", "BUTTON_3", "BUTTON_4", or "BUTTON_5".
     * @throws {Error} If an invalid button is provided.
     */
    click: async (
      button: MouseButton,
      delayAfterPress?: number,
      delayAfterRelease?: number,
    ) => {
      if (!this.mouseButtons.includes(button)) {
        throw new Error(`Invalid button. Use ${this.mouseButtons.join(", ")}.`);
      }

      const pressDelay = delayAfterPress ?? this.delayAfterPress;
      const releaseDelay = delayAfterRelease ?? this.delayAfterRelease;

      this.sendMouseStroke({
        state: MouseState[(button + "_DOWN") as keyof typeof MouseState],
      });

      if (pressDelay > 0) {
        await this.wait(pressDelay);
      }

      this.sendMouseStroke({
        state: MouseState[(button + "_UP") as keyof typeof MouseState],
      });

      if (releaseDelay > 0) {
        await this.wait(releaseDelay);
      } else {
        this.waitSync(1);
      }
    },

    /**
     * Toggles the state of a specified mouse button (pressed or released).
     *
     * @param button - The mouse button to toggle. Must be one of: "BUTTON_1", "BUTTON_2", "BUTTON_3", "BUTTON_4", or "BUTTON_5".
     * @param pressed - A boolean indicating whether the button should be pressed (`true`) or released (`false`).
     * @throws {Error} If an invalid button is provided.
     */
    toggle: async (button: MouseButton, pressed: boolean) => {
      if (!this.mouseButtons.includes(button)) {
        throw new Error(`Invalid button. Use ${this.mouseButtons.join(", ")}.`);
      }

      this.sendMouseStroke({
        state:
          MouseState[
            (button + (pressed ? "_DOWN" : "_UP")) as keyof typeof MouseState
          ],
      });
    },

    /**
     * Scrolls the mouse wheel by the specified amount.
     *
     * @param amount - The amount to scroll the mouse wheel. Positive values scroll up, negative values scroll down.
     * @returns A promise that resolves when the mouse scroll action has been sent.
     */
    scrollWheel: async (amount: number) => {
      this.sendMouseStroke({
        state: MouseState.WHEEL,
        rolling: amount,
      });
    },
  };
}
