/*
  Add Username to Top Panel GNOME extension
  Created by William Brendaw (william@brendaw.net)

  Inspired from Add User and Host name to panel (https://extensions.gnome.org/extension/813/add-user-and-host-name-to-panel/)

  Hack it!
*/

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import { UsernameIndicator } from "./usernameIndicator.js";
import GObject from "gi://GObject";

export default class UsernameIndicatorExtension extends Extension {
  _indicator;

  enable() {
    this._settings = this.getSettings("org.gnome.shell.extensions.add-username-toppanel");
    this._indicator = new UsernameIndicator(this._settings);
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
    this._settings = null;
  }
}

GObject.registerClass({ GTypeName: "UsernameIndicator" }, UsernameIndicator);
