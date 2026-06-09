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
   ./scripts/local.sh
   ```

   This copies the files from `src/` to `~/.local/share/gnome-shell/extensions/add-username-toppanel@brendaw.com`.

3. Log out and back in to load the extension, then enable it:

   ```bash
   gnome-extensions enable add-username-toppanel@brendaw.com
   ```

4. After making changes, re-run `./scripts/local.sh` and restart GNOME Shell
   (`Alt+F2` → `r` on X11, or log out/in on Wayland).

## Linting

Before submitting a PR, make sure the code passes the linter:

```bash
npm install
npm run lint
```

## CI checks

Every pull request and push to `main` runs three automated checks:

| Check | What it does |
|---|---|
| **Lint** | Runs `npm run lint` against `src/` |
| **Validate extension package** | Builds the `.zip` with `scripts/build.sh` and validates it with `shexli` |
| **Validate metadata** | Checks that `src/metadata.json` has all required fields: `uuid`, `name`, `description`, `shell-version`, `version` |

All three must pass before a PR can be merged.

## Building for release

To generate the `.zip` file for publishing on GNOME Extensions:

```bash
./scripts/build.sh
```

The packed file will be placed at `build/add-username-toppanel@brendaw.com.zip`.

To also validate the package against GNOME Extensions requirements, install [shexli](https://pypi.org/project/shexli/) before building:

```bash
virtualenv venv
. venv/bin/activate
pip install -U shexli
```

Once installed, `./scripts/build.sh` will run the validation automatically.

## Creating a release

Releases are published automatically when a version tag is pushed.

1. Push the tag:

   ```bash
   git tag vX.Y
   git push origin vX.Y
   ```

2. Run the changelog script — it detects the new tag and generates the versioned entry, also bumping the integer version in `metadata.json`:

   ```bash
   ./scripts/changelog.sh
   ```

3. Review the changes, then commit and push:

   ```bash
   git add CHANGELOG.md src/metadata.json
   git commit -m "chore: release vX.Y"
   git push origin main
   ```

The CI will then package the extension and create a GitHub Release with the changelog notes attached automatically.

**Keeping `[Unreleased]` up to date during development:**

Run `./scripts/changelog.sh` at any point to populate the `[Unreleased]` section with conventional commits since the last tag. The script will not overwrite existing manual content.

## Submitting changes

1. Fork the repository and create a branch for your change
2. Make your changes in `src/`
3. Test locally with `local.sh`
4. Open a Pull Request describing what changed and why

For bug reports or feature requests, open an [Issue](https://github.com/brendaw/add-username-toppanel/issues) first.

---

[Back to README](README.md)
