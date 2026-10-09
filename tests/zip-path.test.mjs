import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectArchivePath } from '../zip-path.mjs';

test('flags parent traversal using Windows separators', () => {
  assert.deepEqual(inspectArchivePath('mod\\..\\outside.txt'), {
    normalized: 'mod/../outside.txt', absolute: false, escapesRoot: true
  });
});

test('flags absolute drive and UNC paths written with backslashes', () => {
  assert.equal(inspectArchivePath('C:\\Windows\\system.ini').absolute, true);
  assert.equal(inspectArchivePath('\\\\server\\share\\mod.zip').absolute, true);
});

test('flags POSIX absolute paths and parent segments at every depth', () => {
  assert.equal(inspectArchivePath('/etc/passwd').absolute, true);
  assert.equal(inspectArchivePath('a/b/../../c').escapesRoot, true);
});

test('keeps ordinary nested archive paths', () => {
  assert.deepEqual(inspectArchivePath('mod/common/ideas/example.txt'), {
    normalized: 'mod/common/ideas/example.txt', absolute: false, escapesRoot: false
  });
});
