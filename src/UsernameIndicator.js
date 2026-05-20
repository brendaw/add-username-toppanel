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

        // GNOME's intended indicator layout is [privacy] [extensions] [system],
        // so addExternalIndicator() places us in the middle slot. For a user
        // name label we want it next to the system menu. Re-anchor to the end
        // whenever a child is added — including our own insertion below, and
        // any later siblings (system indicators still spinning up during
        // auto-login boot, privacy icons turning on at runtime).
        const QuickSettingsMenu = Main.panel.statusArea.quickSettings;
        this._indicatorsBox = QuickSettingsMenu._indicators;
        this._childAddedId = this._indicatorsBox.connect('child-added',
            () => this._indicatorsBox.set_child_above_sibling(this, null));
        QuickSettingsMenu.addExternalIndicator(this);
    }

    destroy() {
        if (this._childAddedId) {
            this._indicatorsBox.disconnect(this._childAddedId);
            this._childAddedId = 0;
        }
        super.destroy();
    }

};
