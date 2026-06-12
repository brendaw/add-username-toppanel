# Contributing to Add Username to Top Panel

Contributions are welcome — bug fixes, new features, documentation improvements, and translations.

For bug reports or feature requests, [open an Issue](https://github.com/brendaw/add-username-toppanel/issues) first so the approach can be discussed before you start coding.

## Prerequisites

- GNOME Shell installed locally (45+)
- Git
- Node.js (for linting)
- Python 3 with pip (optional, for local extension package validation)

## How to contribute

1. [Fork the repository](https://github.com/brendaw/add-username-toppanel/fork) and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/add-username-toppanel.git
   cd add-username-toppanel
   ```

2. Install the extension locally for testing:

   ```bash
   ./scripts/local.sh
   ```

   This copies the files from `src/` to `~/.local/share/gnome-shell/extensions/add-username-toppanel@brendaw.com`.

3. Log out and back in to load the extension, then enable it:

   ```bash
   gnome-extensions enable add-username-toppanel@brendaw.com
   ```

4. Make your changes in `src/`. After each change, re-run `./scripts/local.sh` and restart GNOME Shell
   (`Alt+F2` → `r` on X11, or log out/in on Wayland).

   To view GNOME Shell logs while developing:

   ```bash
   journalctl /usr/bin/gnome-shell -f
   ```

   To open Looking Glass (the built-in inspector): `Alt+F2` → type `lg`.

5. Run the linter before opening a PR:

   ```bash
   npm install
   npm run lint
   ```

6. Optionally, validate the extension package locally using the same tool as CI:

   ```bash
   bash scripts/build.sh
   pip install shexli==0.2.1
   shexli build/add-username-toppanel@brendaw.com.zip
   ```

   shexli performs static analysis on the `.zip` and checks for common issues flagged during GNOME Extensions review, such as deprecated imports (`ByteArray`, `Lang`, `Mainloop`), synchronous file or subprocess APIs, minified/obfuscated code, bundled binaries, and metadata problems. Any finding reported as a warning causes CI to fail — the same threshold applies locally.

7. Open a Pull Request against `main` describing what changed and why.

You do not need to bump versions, update `metadata.json`, or run `./scripts/changelog.sh` — versioning and releases are handled by the maintainer after the PR is merged.

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must follow the format:

```
type: short description
```

| Type | When to use |
|---|---|
| `feat` | New feature or behavior visible to users |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Tooling, dependencies, configuration |
| `ci` | CI/CD workflow changes |
| `refactor` | Code restructuring without behavior change |
| `style` | Formatting, whitespace |
| `test` | Tests |

The type determines how the commit appears in the CHANGELOG and influences the version bump on the next release.

## Code style

The repository includes an `.editorconfig` file. Most editors support it natively or via plugin — it enforces:

- UTF-8 encoding and LF line endings across all files
- 2-space indentation for `.js` and `.json`
- Tab indentation for `.sh` scripts
- Final newline and no trailing whitespace

## GNOME Shell globals

The following GNOME Shell globals are available in `src/` without needing to import them — the ESLint config declares them to avoid false `no-undef` errors:

| Global | Description |
|---|---|
| `log` | Print a message to the GNOME Shell log |
| `logError` | Print an error with stack trace to the log |
| `print` / `printerr` | stdout/stderr (available in scripts context) |
| `imports` | Legacy GJS module system (pre-ESM) |
| `pkg` / `uuid` | Extension package metadata |

The linter also enforces `prefer-const`, `no-var`, and ES2022 syntax. Unused function arguments are allowed if prefixed with `_`.

## Scripts

| Script | Purpose |
|---|---|
| `scripts/local.sh` | Copies `src/` directly to `~/.local/share/gnome-shell/extensions/` for local testing — use this during development after every change |
| `scripts/build.sh` | Packs `src/` into a `.zip` at `build/add-username-toppanel@brendaw.com.zip` — used by CI and for manual shexli validation |

`changelog.sh` and `release.sh` are maintainer-only scripts and are not part of the contributor workflow.

## CI checks

Every pull request and push to `main` runs three automated checks:

| Check | What it does |
|---|---|
| **Lint** | Runs `npm run lint` against `src/` |
| **Validate extension package** | Builds the `.zip` with `scripts/build.sh` and validates it with `shexli` |
| **Validate metadata** | Checks that `src/metadata.json` has all required fields: `uuid`, `name`, `description`, `shell-version`, `version` |

All three must pass before a PR can be merged.

---

Maintainers: see [RELEASING.md](RELEASING.md) for the build and release process.

[Back to README](README.md)
