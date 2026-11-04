# Website maintenance

The active GitHub Pages website is in the repository root. Edit the root HTML pages, `styles.css`, and `script.js` directly; no build step is required.

- `assets/`: main portrait, CV PDF, and favicon.
- `photos/gallery/`: gallery photographs.
- `icons/`: images used by the GitHub profile README.
- `old design/`: preserved copy of the original website and supporting files.
- `sitemap.xml` and `robots.txt`: search discovery configuration.
- `google1deda65bf7f99c90.html`: Google ownership verification.

For local preview, run `python -m http.server 8000` from this directory and open http://localhost:8000. Visitor logging skips localhost and file previews. Translation, GitHub repository data, visitor logging, and contact submission require external services. Do not send test messages or visit logs during routine verification.

Format active source with `npx prettier --write "*.html" styles.css script.js sitemap.xml DEVELOPMENT.md`. Keep the archived design unchanged.
