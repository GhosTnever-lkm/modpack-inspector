# ModPack Inspector

**A private, in-browser ZIP preflight for mod archives.** Inspect archive paths and layout before extracting a downloaded mod.

The app reads the ZIP central directory in your browser. It does not extract entries, upload the archive, or load third-party scripts or fonts. A strict Content Security Policy blocks network connections from the page.

## Use it

Open [`index.html`](index.html) in a modern browser or serve this folder as a static site. Click **Показать пример / Show example** to see a sample report. Add `?demo` to the URL to load the example automatically.

GitHub Pages demo: https://ghostnever-lkm.github.io/modpack-inspector/?demo

## Checks

- ZIP signature and central-directory bounds.
- `descriptor.mod` presence and a common extra outer-folder layout.
- Absolute paths and `..` traversal segments that can escape the archive root.
- Duplicate names, empty archives, unusually large expanded entries, and extreme compression ratios.
- ZIP64 and encrypted entries are identified and reported.
- A local text report can be downloaded on demand.

The default review limits are a 500 MB archive, 100,000 entries, and 1 GB for any individual expanded entry.

## Limits

This is a ZIP metadata preflight, not a malware scanner, antivirus, full game validator, or guarantee that an archive is safe. It does not decompress entry contents or verify each entry's CRC. It reads metadata supplied by the archive; do not treat its report as proof that a file is trustworthy. Encrypted file contents cannot be checked without a password. ZIP64 directory listings are supported within the entry limit. Only stored and Deflate compression are common methods; unsupported methods are flagged.

The descriptor and root-layout checks target the usual local Clausewitz/Paradox mod layout. Workshop packaging and title-specific layouts vary, so a warning can be a false positive. Review the archive source and the target game's installation instructions.

## Development

No build or dependency installation is required. Edit `index.html`, `styles.css`, or `app.js`, then reload the page. All processing is client-side.

## License

MIT. See [LICENSE](LICENSE).
