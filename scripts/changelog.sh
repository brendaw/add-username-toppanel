#!/bin/bash
set -e

REPO_URL="https://github.com/brendaw/add-username-toppanel"
CHANGELOG="CHANGELOG.md"
METADATA="src/metadata.json"
DATE=$(date +%Y-%m-%d)

LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

if [[ -z "$LATEST_TAG" ]]; then
	echo "No tags found in this repository."
	exit 0
fi

if ! grep -q "^## \[Unreleased\]" "$CHANGELOG"; then
	echo "⚠  No [Unreleased] section found in $CHANGELOG."
	exit 1
fi

VERSION="${LATEST_TAG#v}"

# Collect commits between two refs, write categorized markdown to a file
collect_commits_to_file() {
	local from="$1" to="$2" out="$3"
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

	{
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
	} > "$out"
}

if grep -q "^## \[$VERSION\]" "$CHANGELOG"; then
	# Tag already documented → refresh [Unreleased] with commits since that tag

	tmp_content=$(mktemp)
	collect_commits_to_file "$LATEST_TAG" "HEAD" "$tmp_content"

	if [[ ! -s "$tmp_content" ]]; then
		echo "No conventional commits found since $LATEST_TAG."
		rm "$tmp_content"
		exit 0
	fi

	tmp_cl=$(mktemp)
	awk -v cf="$tmp_content" '
		/^## \[Unreleased\]/ {
			print; print ""
			while ((getline line < cf) > 0) print line
			in_u=1; next
		}
		in_u && /^## \[/ { in_u=0 }
		in_u { next }
		{ print }
	' "$CHANGELOG" > "$tmp_cl"
	mv "$tmp_cl" "$CHANGELOG"
	rm "$tmp_content"

	echo "✓ [Unreleased] updated with commits since $LATEST_TAG"
	echo "  Run ./scripts/release.sh when ready to cut a new version."

else
	# New tag not in CHANGELOG → generate versioned entry and bump metadata

	PREV_TAG=$(git describe --tags --abbrev=0 "${LATEST_TAG}^" 2>/dev/null || echo "")

	tmp_content=$(mktemp)
	if [[ -n "$PREV_TAG" ]]; then
		collect_commits_to_file "$PREV_TAG" "$LATEST_TAG" "$tmp_content"
	fi

	if [[ ! -s "$tmp_content" ]]; then
		printf '### Changed\n\n- See git log for details\n\n' > "$tmp_content"
	fi

	tag_url="$REPO_URL/releases/tag/$LATEST_TAG"
	section_header="## [$VERSION]($tag_url) - $DATE"

	tmp_cl=$(mktemp)
	awk -v header="$section_header" -v cf="$tmp_content" '
		/^## \[Unreleased\]/ { in_u=1; print; next }
		in_u && /^## \[/ {
			in_u=0
			print ""
			print header
			print ""
			while ((getline line < cf) > 0) print line
		}
		{ print }
	' "$CHANGELOG" > "$tmp_cl"
	mv "$tmp_cl" "$CHANGELOG"
	rm "$tmp_content"

	echo "✓ Generated entry for $LATEST_TAG"

	if [[ -z "$RELEASING" ]]; then
		echo ""
		echo "Review the CHANGELOG, then complete the release following RELEASING.md."
		echo "Tip: use ./scripts/release.sh to automate this flow."
	fi
fi
