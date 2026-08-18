import St from "gi://St";
import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import { SystemIndicator } from "resource:///org/gnome/shell/ui/quickSettings.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

export class UsernameIndicator extends SystemIndicator {
  _init(settings) {
    super._init();

    this._settings = settings;

    this._indicator = this._addIndicator();

    let username = settings.get_string("display-text");
    if (!username) {
      username = GLib.get_real_name();
      if (username === "Unknown") {
        username = GLib.get_user_name();
      }
    }

    const usernameLabel = new St.Label({
      text: username + "    ",
      y_align: Clutter.ActorAlign.CENTER,
    });

    const padding = settings.get_int("padding");
    const spacing = settings.get_int("spacing");
    usernameLabel.set_style(
      `padding-left: ${padding}px; padding-right: ${padding}px; margin-left: ${spacing}px; margin-right: ${spacing}px;`,
    );

    this.add_child(usernameLabel);

    const QuickSettingsMenu = Main.panel.statusArea.quickSettings;
    this._indicatorsBox = QuickSettingsMenu._indicators;
    this._childAddedId = this._indicatorsBox.connect("child-added", () =>
      this._indicatorsBox.set_child_above_sibling(this, null),
    );
    QuickSettingsMenu.addExternalIndicator(this);
  }

  destroy() {
    if (this._childAddedId) {
      this._indicatorsBox.disconnect(this._childAddedId);
      this._childAddedId = 0;
    }
    super.destroy();
  }
}
