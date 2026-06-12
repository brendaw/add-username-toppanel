# Releasing

This document describes the release process for maintainers of Add Username to Top Panel.

## Scripts overview

| Script | Purpose |
|---|---|
| `scripts/build.sh` | Packs `src/` into a `.zip` for distribution; runs shexli validation automatically if installed |
| `scripts/local.sh` | Copies `src/` to the local GNOME extensions folder for development testing |
| `scripts/changelog.sh` | Updates `CHANGELOG.md` and bumps the integer `version` in `metadata.json`; called by `release.sh` |
| `scripts/release.sh` | Orchestrates the full release: version detection, changelog, commit, tag, and push |

`local.sh` is for development. `build.sh`, `changelog.sh`, and `release.sh` are part of the release flow.

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
pip install shexli==0.2.1
```

When `shexli` is available in the active environment, `./scripts/build.sh` runs the validation automatically after packing. If it is not installed, the script skips validation and prints the command to set it up. Validation is always enforced in CI regardless of local setup.

## Creating a release

Releases are published automatically when a version tag is pushed. This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).

### Using release.sh (recommended)

Run `./scripts/release.sh` to automate the entire flow:

```bash
./scripts/release.sh           # suggests next version from commit history
./scripts/release.sh v3.9.0    # explicit version override
```

The script will:

1. Detect the next version from conventional commits (MAJOR / MINOR / PATCH) or accept an explicit override
2. Ask for confirmation, then create the tag and generate the CHANGELOG entry via `./scripts/changelog.sh`
3. Show a diff of the changes for review
4. Ask for a final confirmation, then commit, push `main`, and push the tag — triggering the release workflow

The CI will then package the extension and create a GitHub Release with the changelog notes attached automatically.

### Manual steps (without release.sh)

If you need to run the steps individually:

1. Run `./scripts/changelog.sh` to populate `[Unreleased]` and review what has changed since the last tag.

2. Create the tag locally:

   ```bash
   git tag vX.Y.Z
   ```

3. Run `./scripts/changelog.sh` again — it detects the new tag and generates the versioned entry:

   ```
   ✓ Generated entry for vX.Y.Z (metadata.json: 19 → 20)
   ```

4. If files in `src/` changed, bump the integer `version` in `metadata.json` manually:

   ```bash
   # replace <current> with the existing value
   sed -i "s/\"version\": <current>/\"version\": <new>/" src/metadata.json
   ```

5. Commit the changes and move the tag to the release commit:

   ```bash
   git add CHANGELOG.md src/metadata.json
   git commit -m "chore: release vX.Y.Z"
   git tag -f vX.Y.Z
   ```

   The `git tag -f` is required because the tag was created before the CHANGELOG commit — it must point to the release commit so the workflow reads the correct CHANGELOG.

6. Push `main` and then the tag:

   ```bash
   git push origin main
   git push origin vX.Y.Z
   ```

The key constraints: the tag must point to the release commit (step 5), and `main` must be pushed before the tag (step 6), so the workflow checks out the correct state.

## Fixing a failed release

The release workflow runs CI checks before creating the GitHub Release. If the checks fail, no release artifact is published — the tag exists on the remote but no `.zip` reaches users.

The recovery path depends on what failed.

### CI config or scripts failure (no `src/` change needed)

Fix the issue in `main`, then re-trigger the release workflow manually via `workflow_dispatch`. The workflow reads scripts and workflow files from `main` and overlays `src/` from the original tag, so the tag does not need to move:

1. Fix the issue and push to `main`
2. Go to **Actions → Release → Run workflow**
3. Enter the original tag (e.g. `v3.9.0`) in the **"Tag to release"** field
4. Click **Run workflow**

### Source code failure (`src/` needs a fix)

Fix the code, commit, and move the tag to the new commit. Because no GitHub Release was published yet, force-pushing the tag is acceptable:

```bash
# fix the issue, then:
git add src/...
git commit -m "fix: ..."

git tag -f vX.Y.Z
git push origin main
git push --force origin vX.Y.Z
```

Pushing the tag again re-triggers the release workflow automatically.

---

## Recreating or backfilling a release for an existing tag

If a GitHub Release needs to be (re)generated for an older tag, trigger the workflow manually:

1. Go to **Actions → Release → Run workflow**
2. Keep the branch set to **`main`**
3. Enter the tag in the **"Tag to release"** field (e.g. `v3.6`)
4. Click **Run workflow**

The workflow checks out `main` for the scripts, overlays `src/` from the specified tag, builds the package, and creates or updates the GitHub Release with the changelog notes for that version.

## When not to create a release

Releases exist to distribute a new version of the extension to users. Changes that do not touch `src/` — documentation updates, CI fixes, script improvements, repository housekeeping — do not warrant a new tag or GitHub Release.

For those changes: commit and push to `main` normally. Run `./scripts/changelog.sh` to capture them in `[Unreleased]`, and they will be included in the next release when an actual extension change is ready.

Creating a patch release purely for repository changes generates noise for users and produces a `.zip` artifact identical to the previous version.

## Keeping `[Unreleased]` up to date during development

Run `./scripts/changelog.sh` at any point to refresh the `[Unreleased]` section with conventional commits since the last tag. The script detects the state of the repository and behaves accordingly:

- **Latest tag already in CHANGELOG** (normal development): populates `[Unreleased]` with commits since that tag, categorized by type. Overwrites any existing content.
- **New tag not yet in CHANGELOG** (after `git tag vX.Y.Z`): generates the versioned `## [X.Y.Z]` entry. Bumps the integer `version` in `metadata.json` only if files in `src/` changed — since that is the number the GNOME Extensions website uses to detect updates.

Commits are categorized and influence the suggested version bump based on their [conventional commit](https://www.conventionalcommits.org/) prefix (`type: description`):

| Prefix | CHANGELOG section | Version bump |
|---|---|---|
| `feat!:`, `fix!:`, or `BREAKING CHANGE` in body | — | MAJOR |
| `feat:` | Added | MINOR |
| `fix:` | Fixed | PATCH |
| `docs:`, `chore:`, `ci:`, `refactor:`, `style:`, `build:`, `perf:`, `test:` | Changed | PATCH |

Commits without a conventional prefix are ignored by the script.

---

[Back to README](README.md)
