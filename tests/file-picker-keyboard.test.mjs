import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { bindFilePickerKeyboard } from '../file-picker-keyboard.mjs';

function setup() {
  let handler;
  let clicks = 0;
  const dropzone = { addEventListener: (name, callback) => { if (name === 'keydown') handler = callback; } };
  const input = { click: () => { clicks += 1; } };
  bindFilePickerKeyboard(dropzone, input);
  return { dropzone, input, get clicks() { return clicks; }, dispatch(event) { handler(event); } };
}

test('Enter opens the file picker and prevents its default action', () => {
  const ui = setup();
  let prevented = false;
  ui.dispatch({ target: ui.dropzone, key: 'Enter', preventDefault: () => { prevented = true; } });
  assert.equal(ui.clicks, 1);
  assert.equal(prevented, true);
});

test('Space opens the file picker and prevents page scrolling', () => {
  const ui = setup();
  let prevented = false;
  ui.dispatch({ target: ui.dropzone, key: ' ', preventDefault: () => { prevented = true; } });
  assert.equal(ui.clicks, 1);
  assert.equal(prevented, true);
});

test('other keys and child controls do not open the file picker', () => {
  const ui = setup();
  let prevented = false;
  ui.dispatch({ target: ui.dropzone, key: 'Tab', preventDefault: () => { prevented = true; } });
  ui.dispatch({ target: ui.input, key: 'Enter', preventDefault: () => { prevented = true; } });
  assert.equal(ui.clicks, 0);
  assert.equal(prevented, false);
});

test('the dropzone exposes a keyboard-accessible button and app wiring', async () => {
  const [html, app] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../app.js', import.meta.url), 'utf8')
  ]);
  assert.match(html, /id="dropzone"[^>]*role="button"[^>]*tabindex="0"[^>]*aria-controls="zip-file"/);
  assert.match(app, /bindFilePickerKeyboard\(ui\.drop,\s*ui\.input\)/);
});
