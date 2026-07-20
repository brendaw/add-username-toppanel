#!/bin/bash
set -e

REPO_URL="https://github.com/brendaw/add-username-toppanel"
CHANGELOG="CHANGELOG.md"
METADATA="src/metadata.json"
DATE=$(date +%Y-%m-%d)
DRY_RUN=0

for arg in "$@"; do
	case "$arg" in
		--dry-run) DRY_RUN=1 ;;
		*) VERSION_ARG="$arg" ;;
	esac
done

suggest_bump() {
	local from="$1" to="${2:-HEAD}"
	if git log "${from}..${to}" --pretty=format:"%s%n%b" | grep -qE "^[a-z]+(\([^)]*\))?!:|^BREAKING[- ]CHANGE"; then
		echo "major"; return
	fi
	if git log "${from}..${to}" --pretty=format:"%s" | grep -qE "^feat(\([^)]*\))?:"; then
		echo "minor"; return
	fi
	echo "patch"
}

next_version() {
	local current="$1" bump="$2"
	local major minor patch
	IFS='.' read -r major minor patch <<< "$current"
	patch="${patch:-0}"
	case "$bump" in
		major) echo "$((major + 1)).0.0" ;;
		minor) echo "${major}.$((minor + 1)).0" ;;
		patch) echo "${major}.${minor}.$((patch + 1))" ;;
	esac
}

collect_changelog_entry() {
	local from="$1" to="$2"
	local -a added=() fixed=() changed=()

	while IFS= read -r msg; do
		[[ -z "$msg" ]] && continue
		local type body
		type=$(echo "$msg" | sed 's/^\([a-z]*\)[:(].*/\1/')
		body=$(echo "$msg" | sed 's/^[^:]*: *//')
		case "$type" in
			feat)                                          added+=("- $body") ;;
			fix)                                           fixed+=("- $body") ;;
			docs|chore|ci|refactor|style|build|perf|test) changed+=("- $body") ;;
		esac
	done < <(git log "${from}..${to}" --pretty=format:"%s")

	if (( ${#added[@]} > 0 )); then
		echo "### Added"; echo ""
		printf '%s\n' "${added[@]}"; echo ""
	fi
	if (( ${#fixed[@]} > 0 )); then
		echo "### Fixed"; echo ""
		printf '%s\n' "${fixed[@]}"; echo ""
	fi
	if (( ${#changed[@]} > 0 )); then
		echo "### Changed"; echo ""
		printf '%s\n' "${changed[@]}"; echo ""
	fi
}

if [[ -n "$(git status --porcelain)" ]]; then
	echo "⚠  Uncommitted changes detected. Commit or stash them before releasing."
	exit 1
fi

LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [[ -z "$LATEST_TAG" ]]; then
	echo "No tags found in this repository."
	exit 1
fi

CURRENT_VERSION="${LATEST_TAG#v}"

if [[ -n "$VERSION_ARG" ]]; then
	NEW_TAG="$VERSION_ARG"
	[[ "$NEW_TAG" != v* ]] && NEW_TAG="v$NEW_TAG"
	NEW_VERSION="${NEW_TAG#v}"
	BUMP="manual"
else
	BUMP=$(suggest_bump "$LATEST_TAG" "HEAD")
	NEW_VERSION=$(next_version "$CURRENT_VERSION" "$BUMP")
	NEW_TAG="v$NEW_VERSION"
fi

if git tag -l | grep -q "^${NEW_TAG}$"; then
	echo "⚠  Tag $NEW_TAG already exists locally. Delete it or choose a different version."
	exit 1
fi

if [[ "$BUMP" == "manual" ]]; then
	echo "Preparing release $NEW_TAG (manual override, from $LATEST_TAG)"
else
	echo "Preparing release $NEW_TAG ($BUMP bump from $LATEST_TAG)"
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
	echo ""
	echo "DRY RUN — no changes will be made"
fi

src_preview=$(git diff --name-only "$LATEST_TAG" HEAD -- src/)
if [[ -n "$src_preview" ]]; then
	current_meta_v=$(node --input-type=commonjs -p "JSON.parse(require('fs').readFileSync('./src/metadata.json','utf8')).version")
	echo "  metadata.json: $current_meta_v → $((current_meta_v + 1))"
else
	echo "  metadata.json: unchanged (no src/ changes)"
fi
echo ""
read -r -p "Create tag and generate CHANGELOG entry? [y/N] " confirm
[[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }

if [[ "$DRY_RUN" -eq 0 ]]; then
	echo ""
	echo "→ Creating tag $NEW_TAG..."
	git tag "$NEW_TAG"

	echo "→ Generating CHANGELOG entry..."
	RELEASING=1 ./scripts/changelog.sh

	if [[ -n "$src_preview" ]]; then
		echo "→ Bumping metadata.json: $current_meta_v → $((current_meta_v + 1))..."
		sed -i.bak "s/\"version\": $current_meta_v/\"version\": $((current_meta_v + 1))/" src/metadata.json
		rm -f src/metadata.json.bak
	fi
else
	echo ""
	echo "→ Tag: $NEW_TAG"

	echo ""
	echo "→ CHANGELOG entry (preview):"
	echo "## [$NEW_VERSION]($REPO_URL/releases/tag/$NEW_TAG) - $DATE"
	echo ""
	collect_changelog_entry "$LATEST_TAG" "HEAD"

	if [[ -n "$src_preview" ]]; then
		echo "→ metadata.json version: $current_meta_v → $((current_meta_v + 1))"
	else
		echo "→ metadata.json version: unchanged"
	fi

	echo ""
	echo "→ Commit message:"
	echo "  chore: release $NEW_TAG"
fi

echo ""
echo "Diff summary:"
git diff --stat

if [[ "$DRY_RUN" -eq 0 ]]; then
	echo ""
	echo "→ Validating build..."
	if ! bash ./scripts/build.sh; then
		echo "⚠  Build validation failed. Fix the issue before releasing."
		exit 1
	fi

	echo ""
	read -r -p "Commit and push? [y/N] " confirm
	if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
		echo ""
		echo "Aborted. To undo:"
		echo "  git tag -d $NEW_TAG"
		echo "  git restore $CHANGELOG $METADATA"
		exit 0
	fi

	files_to_add=("$CHANGELOG")
	if [[ -n "$(git diff -- "$METADATA")" ]]; then
		files_to_add+=("$METADATA")
	fi

	echo ""
	echo "→ Committing..."
	git add "${files_to_add[@]}"
	git commit -m "chore: release $NEW_TAG"

	echo "→ Moving tag $NEW_TAG to release commit..."
	git tag -f "$NEW_TAG"

	echo "→ Pushing main..."
	git push origin main

	echo "→ Pushing tag $NEW_TAG..."
	git push origin "$NEW_TAG"

	echo ""
	echo "✓ Release $NEW_TAG pushed. Watch the workflow at:"
	echo "  $REPO_URL/actions"
else
	echo ""
	echo "DRY RUN complete. No changes were made."
	echo "To proceed with the release, run without --dry-run."
fi
