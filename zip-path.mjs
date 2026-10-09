/** Normalize a ZIP entry path for Windows and POSIX extraction semantics. */
export function inspectArchivePath(rawName) {
  const normalized = String(rawName ?? '').replace(/\\/g, '/');
  return {
    normalized,
    absolute: normalized.startsWith('/') || /^[a-z]:\//i.test(normalized),
    escapesRoot: normalized.split('/').includes('..')
  };
}
