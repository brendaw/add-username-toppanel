# Add Username to Top Panel

![add-username-to-toppanel](https://extensions.gnome.org/extension-data/screenshots/screenshot_1108_zJTOY5M.png)

Simply add your username to topbar panel quick settings menu in GNOME Shell.

### How to install

Just go at the [extension's page](https://extensions.gnome.org/extension/1108/add-username-to-top-panel/), enable the [GNOME Shell Integration](https://wiki.gnome.org/Projects/GnomeShellIntegrationForChrome) (if is not installed/enabled), and then just click on the switch to turn this extension on.

And is simple as that.

## Compatibility

This extension is compatible with the GNOME Shell versions from 3.12 to 48.

## Common Issues

### Extension only shows "Unknown" istead of my name

If the extension is showing "Unknown" instead of your desired name after installation, or even on swithing between users locally, then it might be missing something in the `/etc/passwd`, where the extension look at to bring the user display name. Check it and look if it has the info marked in the picture below, and make the changes (in this case... fill with your name) to show up in the next GNOME shell boot.

![image](https://user-images.githubusercontent.com/3674847/210005925-bd7c1aab-5d05-4650-987f-869fda41e8a6.png)

## How to build from source and manually install

This way is more trick. First of all, move yourself inside the repository folder. After this, you need to run the gnome-extensions command to create the extention's boilerplate inside your machine:

``` bash
$ gnome-extensions create --name="Add Username to Top Panel" --description="Simply add your username to topbar panel quick settings menu" --uuid="add-username-toppanel@brendaw.com"
```

Then copy all the extension files inside the folder created by the last command:

``` bash
$ cp metadata.json extension.js stylesheet.css ~/.local/share/gnome-shell/extensions/add-username-toppanel@brendaw.com`
```

Nice. Now you need to enable the extension in GNOME Shell. To do this, run the command bellow:

``` bash
$ gnome-extensions enable add-username-toppanel@brendaw.com
```

"Nice, Will, but the extension is not showing up"

Well, if that happens to you, just log-out and log-in to the extension appear in your GUI.

And that's it.

## Contributing

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples or translating any document here to your language. [Issues](https://github.com/brendaw/add-username-toppanel/issues) and [Pull Requests](https://github.com/brendaw/add-username-toppanel/pulls) sections are waiting for your contribution.

## Contributors

See on [AUTHORS](AUTHORS.md) file the amazing contributors' name of this project.

## License

[MIT](LICENSE) - William Brendaw and the contributors - 2016-2024
