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

let label;
let aggregateMenu;
let children;
let powerIndicator;

function init() { }

function enable() {
  label = new St.Label({ text: GLib.get_real_name(), y_align: Clutter.ActorAlign.CENTER, style_class: "username-label" });
  
  aggregateMenu = Main.panel.statusArea["aggregateMenu"];
  
  powerIndicator = aggregateMenu._power.indicators;
  powerIndicator.add_child(label);
}

function disable() {
  powerIndicator.remove_child(label);

  if (label) {
    label.destroy();
    label = null;
  }
}
