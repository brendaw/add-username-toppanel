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

## Building for release

To generate the `.zip` file for publishing on GNOME Extensions:

```bash
./scripts/pack-extension.sh
```

The packed file will be placed at `build/add-username-toppanel@brendaw.com.zip`.

## Submitting changes

1. Fork the repository and create a branch for your change
2. Make your changes in `src/`
3. Test locally with `update-local.sh`
4. Open a Pull Request describing what changed and why

For bug reports or feature requests, open an [Issue](https://github.com/brendaw/add-username-toppanel/issues) first.

---

[Back to README](README.md)
