/*
  Add Username to Top Panel GNOME extension
  Created by William Brendaw (williambrendaw@protonmail.com)

  Inspired from Add User and Host name to panel (https://extensions.gnome.org/extension/813/add-user-and-host-name-to-panel/)

  Hack it!
*/

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const QuickSettings = imports.ui.quickSettings;

// This is the live instance of the Quick Settings menu
const QuickSettingsMenu = imports.ui.main.panel.statusArea.quickSettings;

// Our QuickSettings.SystemIndicator subclass
const UsernameIndicator = GObject.registerClass(
class UsernameIndicator extends QuickSettings.SystemIndicator {

    _init() {
        // Chaining up to the super-class
        super._init();

        // Create the text label for a new indicator (child)
        this._indicator = this._addIndicator();
        const usernameLabel = new St.Label({
            text:    GLib.get_real_name(),
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.add_child(usernameLabel);

        // Add the indicator to the panel
        QuickSettingsMenu._indicators.add_child(this)
    }

});

class Extension {
    constructor() {
        this._indicator = null;
    }

    enable() {
        this._indicator = new UsernameIndicator();
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init() {
    return new Extension();
}

