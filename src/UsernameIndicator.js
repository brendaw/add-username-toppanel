import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import { SystemIndicator } from 'resource:///org/gnome/shell/ui/quickSettings.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export class UsernameIndicator extends SystemIndicator {

    _init() {
        super._init();

        // Create the text label for a new indicator (child)
        this._indicator = this._addIndicator();
        const usernameLabel = new St.Label({
            text:    GLib.get_real_name() + '  ',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.add_child(usernameLabel);

        // This is the live instance of the Quick Settings menu
        const QuickSettingsMenu = Main.panel.statusArea.quickSettings;
        QuickSettingsMenu.addExternalIndicator(this);
    }

};
