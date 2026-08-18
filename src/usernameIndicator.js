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

    this._usernameLabel = new St.Label({
      text: this._getUsername() + "    ",
      y_align: Clutter.ActorAlign.CENTER,
    });
    this._applyStyle();
    this.add_child(this._usernameLabel);

    const QuickSettingsMenu = Main.panel.statusArea.quickSettings;
    this._indicatorsBox = QuickSettingsMenu._indicators;

    this._childAddedId = this._indicatorsBox.connect("child-added", () =>
      this._applyPosition(),
    );

    this._signalIds = [
      settings.connect("changed::display-text", () => this._updateText()),
      settings.connect("changed::padding", () => this._applyStyle()),
      settings.connect("changed::spacing", () => this._applyStyle()),
      settings.connect("changed::position", () => this._applyPosition()),
    ];

    QuickSettingsMenu.addExternalIndicator(this);
    this._applyPosition();
  }

  _getUsername() {
    const template = this._settings.get_string("display-text");
    if (!template) {
      const name = GLib.get_real_name();
      if (name && name !== "Unknown") {
        return name;
      }
      const user = GLib.get_user_name();
      if (user) {
        return user;
      }
      return GLib.get_host_name();
    }
    return template
      .replace(/%u/g, GLib.get_user_name())
      .replace(/%U/g, GLib.get_real_name())
      .replace(/%h/g, GLib.get_host_name());
  }

  _updateText() {
    this._usernameLabel.set_text(this._getUsername() + "    ");
  }

  _applyStyle() {
    const padding = this._settings.get_int("padding");
    const spacing = this._settings.get_int("spacing");
    this._usernameLabel.set_style(
      `padding-left: ${padding}px; padding-right: ${padding}px; margin-left: ${spacing}px; margin-right: ${spacing}px;`,
    );
  }

  _applyPosition() {
    const position = this._settings.get_string("position");
    const box = this._indicatorsBox;

    if (position === "left") {
      const firstChild = box.get_first_child();
      if (firstChild && firstChild !== this) {
        box.set_child_below_sibling(this, firstChild);
      }
    } else if (position === "center") {
      const count = box.get_n_children();
      const middle = Math.floor(count / 2);
      box.set_child_at_index(this, middle);
    } else {
      box.set_child_above_sibling(this, null);
    }
  }

  destroy() {
    if (this._signalIds) {
      for (const id of this._signalIds) {
        this._settings.disconnect(id);
      }
      this._signalIds = null;
    }
    if (this._childAddedId) {
      this._indicatorsBox.disconnect(this._childAddedId);
      this._childAddedId = 0;
    }
    super.destroy();
  }
}
