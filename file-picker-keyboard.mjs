/** Give a focusable file dropzone the same keyboard activation as its file input. */
export function bindFilePickerKeyboard(dropzone, input) {
  dropzone.addEventListener('keydown', (event) => {
    if (event.target !== dropzone || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    input.click();
  });
}
