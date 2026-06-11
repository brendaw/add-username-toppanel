# Changelog
All notable changes to this project will be documented in this file.

The format is inspired on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres (in parts) to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- add semantic version bump suggestion to changelog.sh

### Changed

- remove overwrite guard from changelog.sh Unreleased section
- update release flow and conventional commit table with semver bump guidance
- mention CI/CD automation in README
- document GNOME Shell globals and ESLint rules in CONTRIBUTING
- document editorconfig conventions in CONTRIBUTING
- document manual release workflow dispatch for existing tags
- clarify shexli is optional locally but enforced in CI
- document changelog.sh scenarios and conventional commit mapping
- document CI checks in CONTRIBUTING
- overlay src/ from tag on manual dispatch to support old releases
- overlay src/ from tag on manual dispatch to support old releases
- add tag input to workflow_dispatch for manual release trigger
- allow manual workflow dispatch on release workflow
- replace shields.io badges with badgen.net
- add shexli setup instructions to CONTRIBUTING
- add shexli extension package validation to build script and CI
- rename scripts to build.sh, local.sh and changelog.sh
- add update-changelog.sh script for automated changelog management
- document linting setup and release process in CONTRIBUTING
- fix broken infos and typo in changelog
- update metadata description
- add CODEOWNERS designating @brendaw as required reviewer
- add GitHub issue templates and pull request template
- add automated release workflow on version tags
- add GitHub Actions workflow for lint and metadata validation
- add ESLint with GNOME Shell config and npm lint script
- add .editorconfig to enforce project coding style
- rename UsernameIndicator.js to camelCase for JS/GNOME convention alignment
- move shell scripts into scripts/ directory
- fix grammar and username casing in AUTHORS







## [3.9.2](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.9.2) - 2026-06-11

### Changed

- add Ko-fi and GitHub Sponsors to funding, metadata, and README
- rename Known Issues to Troubleshooting and link to open issues
- add installation from release ZIP to README
- add CI status badge to README
- document conventional commit format
- disable blank issues
- document recovery paths for failed releases

## [3.9.1](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.9.1) - 2026-06-10

### Changed

- fail on shexli warnings, not just errors

## [3.9.0](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.9.0) - 2026-06-10

### Added

- show metadata.json version preview in release.sh begore confirmation

### Changed

- move metadata.json version bump from changelog.sh to release.sh
- fix metadata version to current on GNOME Extensions
- add donations field to metadata.json with Buy Me a Coffee link
- add Buy Me a Coffee support section to README
- add FUNDING.yml with Buy Me a Coffee link
- document when not to create a release in RELEASING.md
- add warning emoji to version lag notice in README
- move version lag note to blockquote in README

## [3.8.1](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.8.1) - 2026-06-09

### Fixed

- retag to release commit so workflow reads correct CHANGELOG entry

## [3.8.0](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.8.0) - 2026-06-09

### Added

- add release.sh to automate release flow and simplify changelog.sh
- skip metadata.json version bump when src/ has no changes between tags

### Fixed

- unquote glob in local.sh so rm clears extension folder correctly
- use CommonJS require in ci metadata validation node script

### Changed

- extract maintainer release process to RELEASING.md
- restructure CONTRIBUTING with contributor-first layout, maintainer section at the end
- mark release section as maintainer-only and expand contributor workflow
- remove unused source_folder variable from local.sh
- fix scenario B description, expand commit table, fix local.sh path
- update changelog.sh and CONTRIBUTING with full release step sequence
- fix release order — push tag after CHANGELOG is on main

## [3.7.0](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.7.0) - 2026-06-09

### Added

- add semantic version bump suggestion to changelog.sh

### Changed

- remove overwrite guard from changelog.sh Unreleased section
- update release flow and conventional commit table with semver bump guidance
- mention CI/CD automation in README
- document GNOME Shell globals and ESLint rules in CONTRIBUTING
- document editorconfig conventions in CONTRIBUTING
- document manual release workflow dispatch for existing tags
- clarify shexli is optional locally but enforced in CI
- document changelog.sh scenarios and conventional commit mapping
- document CI checks in CONTRIBUTING
- overlay src/ from tag on manual dispatch to support old releases
- overlay src/ from tag on manual dispatch to support old releases
- add tag input to workflow_dispatch for manual release trigger
- allow manual workflow dispatch on release workflow
- replace shields.io badges with badgen.net
- add shexli setup instructions to CONTRIBUTING
- add shexli extension package validation to build script and CI
- rename scripts to build.sh, local.sh and changelog.sh
- add update-changelog.sh script for automated changelog management
- document linting setup and release process in CONTRIBUTING
- fix broken infos and typo in changelog
- update metadata description
- add CODEOWNERS designating @brendaw as required reviewer
- add GitHub issue templates and pull request template
- add automated release workflow on version tags
- add GitHub Actions workflow for lint and metadata validation
- add ESLint with GNOME Shell config and npm lint script
- add .editorconfig to enforce project coding style
- rename UsernameIndicator.js to camelCase for JS/GNOME convention alignment
- move shell scripts into scripts/ directory
- fix grammar and username casing in AUTHORS

## [3.6](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.6) - 2026-05-29

### Changed

- Update authors, license, changelog, and readme
- Updated code formatting
- Added update local install script

### Fixed

- Username appearing on left end of Quick Settings (#28)

## [3.5](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.5) - 2026-04-19

### Changed

- Added support to GNOME version 50
- Updated author's email

## [3.4](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.4) - 2025-11-16

### Changed

- Added support to GNOME Shell version 49 (thanks, [@jirkasvacha](https://github.com/jirkasvacha))

## [3.3](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.3) - 2025-04-29

### Changed

- Added support to GNOME Shell version 48 (thanks, [@jirkasvacha](https://github.com/jirkasvacha))
- Added Distinguished Maintainer section into AUTHORS file (A small honor to acknowledge [@josholith](https://github.com/josholith)'s efforts on the project)

## [3.2](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.2) - 2024-09-20

### Changed

- Added support to GNOME Shell version 47 (thanks, [@josholith](https://github.com/josholith))

## [3.1](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.1) - 2024-04-02

### Changed

- Added support to GNOME Shell version 46 (thanks, [@josholith](https://github.com/josholith))

## [3.0](https://github.com/brendaw/add-username-toppanel/releases/tag/v3.0) - 2023-11-06

### Changed

- Convert to ES6 with ESM required to support GNOME Shell version 45 (thanks, [@josholith](https://github.com/josholith))

## [2.1](https://github.com/brendaw/add-username-toppanel/releases/tag/v2.1) - 2023-05-10

### Added

- Added support to GNOME Shell version 44 (thanks, [@cemozden ](https://github.com/cemozden))

## [2.0](https://github.com/brendaw/add-username-toppanel/releases/tag/v2.0) - 2022-11-22

### Added

- Added support to GNOME Shell version 43 (thanks, [@josholith](https://github.com/josholith))
- Added AUTHORS file
- Added pack extension script

### Changed

- Code structure to support GNOME Shell version 43 (thanks, [@josholith](https://github.com/josholith))
- Reordered repository archives for a better organization
- Updated LICENSE with reference to the new AUTHORS file

## [1.5](https://github.com/brendaw/add-username-toppanel/releases/tag/v1.5) - 2021-11-10

### Added

- Added support to GNOME Shell version 42 (thanks, [@cemozden ](https://github.com/cemozden ))

### Fixed

- Improved code with enable and disable functions, in compliance with newer GNOME Extensions rules


## [1.4](https://github.com/brendaw/add-username-toppanel/releases/tag/v1.4) - 2021-11-10

### Added

- Added support to GNOME Shell version 41 (thanks, [@SKyletoft](https://github.com/SKyletoft))

## [1.3](https://github.com/brendaw/add-username-toppanel/releases/tag/v1.3) - 2021-05-16

### Added

- Added support to GNOME Shell versions from 3.32 to 40.1
- Added READMEs in english and portuguese
- Added LICENSE and this CHANGELOG

## [1.2](https://github.com/brendaw/add-username-toppanel/releases/tag/v1.2) - 2017-09-24

### Added

- Added support to GNOME Shell versions from 3.12 to 3.32
- Make it compatible also with gnome 3.20.4 (thanks, [@rubencarneiro](https://github.com/rubencarneiro))

## [1.1](https://github.com/brendaw/add-username-toppanel/releases/tag/v1.1) - 2016-09-23

### Added

- Added support to GNOME Shell versions from 3.19 to 3.22

## [1.0](https://github.com/brendaw/add-username-toppanel/releases/tag/v1.0) - 2016-09-04

### Added

- Initial version of this extension.
