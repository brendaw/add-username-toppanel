# Releasing

This document describes the release process for maintainers of Add Username to Top Panel.

## Building for release

To generate the `.zip` file for publishing on GNOME Extensions:

```bash
./scripts/build.sh
```

The packed file will be placed at `build/add-username-toppanel@brendaw.com.zip`.

To also validate the package against GNOME Extensions requirements, install [shexli](https://pypi.org/project/shexli/):

```bash
virtualenv venv
. venv/bin/activate
pip install -U shexli
```

When `shexli` is available in the active environment, `./scripts/build.sh` runs the validation automatically after packing. If it is not installed, the script skips validation and prints the command to set it up. Validation is always enforced in CI regardless of local setup.

## Creating a release

Releases are published automatically when a version tag is pushed. This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).

1. Run `./scripts/changelog.sh` to populate `[Unreleased]` and get the suggested next version:

   ```
   ✓ [Unreleased] updated with commits since v3.7.0

   Suggested next version: v3.8.0 (minor bump)

   To release, follow these steps in order:
     1. git tag v3.8.0
     2. ./scripts/changelog.sh          # generates [3.8.0] entry in CHANGELOG
     3. git add CHANGELOG.md src/metadata.json
     4. git commit -m "chore: release v3.8.0"
     5. git push origin main            # CHANGELOG must be on main before the tag
     6. git push origin v3.8.0          # triggers the release workflow
   ```

The script prints the full sequence of steps to follow. Execute them in order — the key constraint is that `main` must be pushed (step 5) **before** the tag (step 6), so the release workflow finds the changelog entry already on `main`.

The CI will then package the extension and create a GitHub Release with the changelog notes attached automatically.

## Recreating or backfilling a release for an existing tag

If a GitHub Release needs to be (re)generated for an older tag, trigger the workflow manually:

1. Go to **Actions → Release → Run workflow**
2. Keep the branch set to **`main`**
3. Enter the tag in the **"Tag to release"** field (e.g. `v3.6`)
4. Click **Run workflow**

The workflow checks out `main` for the scripts, overlays `src/` from the specified tag, builds the package, and creates or updates the GitHub Release with the changelog notes for that version.

## Keeping `[Unreleased]` up to date during development

Run `./scripts/changelog.sh` at any point — the script detects the state of the repository and behaves accordingly:

- **Latest tag already in CHANGELOG** (normal development): populates the `[Unreleased]` section with conventional commits since that tag, categorized by type. Overwrites any existing content in `[Unreleased]`. Also prints a suggested next version based on [Semantic Versioning](https://semver.org/).
- **New tag not yet in CHANGELOG** (after `git tag vX.Y.Z`): generates the versioned `## [X.Y.Z]` entry from commits between the previous and new tag. Bumps the integer `version` in `metadata.json` only if files in `src/` changed — since that is the number the GNOME Extensions website uses to detect updates.

Commits are categorized and influence the suggested version bump based on their [conventional commit](https://www.conventionalcommits.org/) prefix:

| Prefix | CHANGELOG section | Version bump |
|---|---|---|
| `feat!:`, `fix!:`, or `BREAKING CHANGE` in body | — | MAJOR |
| `feat:` | Added | MINOR |
| `fix:` | Fixed | PATCH |
| `docs:`, `chore:`, `ci:`, `refactor:`, `style:`, `build:`, `perf:`, `test:` | Changed | PATCH |

Commits without a conventional prefix are ignored by the script.

---

[Back to README](README.md)
