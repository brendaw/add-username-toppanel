# Contributing to Add Username to Top Panel

Contributions are welcome — bug fixes, new features, documentation improvements, and translations.

## Prerequisites

- GNOME Shell installed locally (45+)
- Git

## Setting up locally

1. Clone the repository:

   ```bash
   git clone https://github.com/brendaw/add-username-toppanel.git
   cd add-username-toppanel
   ```

2. Install the extension locally for testing:

   ```bash
   ./scripts/update-local.sh
   ```

   This copies the files from `src/` to `~/.local/share/gnome-shell/extensions/add-username-toppanel@brendaw.com`.

3. Log out and back in to load the extension, then enable it:

   ```bash
   gnome-extensions enable add-username-toppanel@brendaw.com
   ```

4. After making changes, re-run `./scripts/update-local.sh` and restart GNOME Shell
   (`Alt+F2` → `r` on X11, or log out/in on Wayland).

## Linting

Before submitting a PR, make sure the code passes the linter:

```bash
npm install
npm run lint
```

This is also enforced automatically by CI on every pull request.

## Building for release

To generate the `.zip` file for publishing on GNOME Extensions:

```bash
./scripts/pack-extension.sh
```

The packed file will be placed at `build/add-username-toppanel@brendaw.com.zip`.

## Creating a release

Releases are published automatically when a version tag is pushed. Before tagging:

1. Update `metadata.json` — bump the integer `version` field
2. Update `CHANGELOG.md`:
   - Rename `## [Unreleased]` to `## [X.Y](https://github.com/brendaw/add-username-toppanel/releases/tag/vX.Y) - YYYY-MM-DD`
   - Add a new empty `## [Unreleased]` section at the top
3. Commit the changes, then push the tag:

   ```bash
   git tag vX.Y
   git push origin vX.Y
   ```

The CI will package the extension and create a GitHub Release with the changelog notes attached automatically.

## Submitting changes

1. Fork the repository and create a branch for your change
2. Make your changes in `src/`
3. Test locally with `update-local.sh`
4. Open a Pull Request describing what changed and why

For bug reports or feature requests, open an [Issue](https://github.com/brendaw/add-username-toppanel/issues) first.

---

[Back to README](README.md)
