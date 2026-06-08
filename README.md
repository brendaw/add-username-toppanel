<p align="center">
  <img src="https://img.shields.io/github/stars/brendaw/add-username-toppanel">
  <img src="https://img.shields.io/github/license/brendaw/add-username-toppanel">
  <img alt="GNOME Shell" src="https://img.shields.io/badge/GNOME_Shell-45%2B-4A86CF?logo=gnome&logoColor=white"/>
  <img src="https://img.shields.io/badge/status-active-success">
</p>

# Add Username to Top Panel

![add-username-to-toppanel](https://extensions.gnome.org/extension-data/screenshots/screenshot_1108_qjQUeTi.png)

Simply add your display name to the top panel Quick Settings menu in GNOME Shell.

## Features

- Displays your system display name in the Quick Settings menu of the top panel
- Positioned at the right end of the Quick Settings indicators
- Compatible with GNOME Shell 45 to 50
- Lightweight with no external dependencies

## Installation

### Via GNOME Extensions

Go to the [extension's page](https://extensions.gnome.org/extension/1108/add-username-to-top-panel/),
enable [GNOME Shell Integration](https://wiki.gnome.org/Projects/GnomeShellIntegrationForChrome)
if not already installed, then click the toggle to enable the extension.

### Manual

1. Clone the repository:

   ```bash
   git clone https://github.com/brendaw/add-username-toppanel.git
   ```

2. Copy the extension files to the extensions folder:

   ```bash
   cp -r add-username-toppanel/src ~/.local/share/gnome-shell/extensions/add-username-toppanel@brendaw.com
   ```

3. Log out and back in, then enable the extension:

   ```bash
   gnome-extensions enable add-username-toppanel@brendaw.com
   ```

## Compatibility

This extension supports GNOME Shell 45 to 50.

> For GNOME Shell 3.12 to 44, use a [legacy release](https://github.com/brendaw/add-username-toppanel/releases) (v2.x or earlier).

## Known Issues

### Extension shows "Unknown" instead of my name

This extension displays the **display name** from your system (the GECOS field in `/etc/passwd`),
not the login username. If it shows "Unknown", the display name field may be empty in your system.

Check your entry in `/etc/passwd` and fill in the display name field as shown below —
it will appear after the next GNOME Shell boot.

![image](https://user-images.githubusercontent.com/3674847/210005925-bd7c1aab-5d05-4650-987f-869fda41e8a6.png)

## Contributing

Contributions are welcome — new features, bug fixes, documentation improvements, and translations.
See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow.

[Issues](https://github.com/brendaw/add-username-toppanel/issues) and
[Pull Requests](https://github.com/brendaw/add-username-toppanel/pulls) are open for your contribution.

## Contributors

See the [AUTHORS](AUTHORS.md) file for the amazing contributors of this project.

## License

[MIT](LICENSE) - William Brendaw and the contributors - 2016-2026
