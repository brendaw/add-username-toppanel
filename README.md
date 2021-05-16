# Add Username to Top Panel

![add-username-to-toppanel](https://extensions.gnome.org/extension-data/screenshots/screenshot_1108.png)

_Leia isso em [Português](README-pt-BR.md)._

Simply add your username to topbar panel aggregate menu in GNOME Shell.

### How to install

Just go at the [extension's page](https://extensions.gnome.org/extension/1108/add-username-to-top-panel/), enable the [GNOME Shell Integration](https://wiki.gnome.org/Projects/GnomeShellIntegrationForChrome) (if is not installed/enabled), and then just click on the switch to turn this extension on.

And is simple as that.

## Support

This extension supports GNOME Shell versions from 3.12 to 40.1.

## How to build from source and manually install

This way is more trick. First of all, move yourself inside the repository folder. After this, you need to run the gnome-extensions command to create the extention's boilerplate inside your machine:

``` bash
$ gnome-extensions create --name="Add Username to Top Panel" --description="Simply add your username to topbar panel aggregate menu" --uuid="add-username-toppanel@brendaw.com"
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

## License

[MIT](LICENSE) - William Brendaw - 2016-2021