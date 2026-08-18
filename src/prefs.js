import Adw from "gi://Adw";
import Gio from "gi://Gio";
import Gtk from "gi://Gtk";
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class UsernameIndicatorPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const settings = this.getSettings();

    const page = new Adw.PreferencesPage({
      title: "General",
      icon_name: "preferences-system-symbolic",
    });
    window.add(page);

    const generalGroup = new Adw.PreferencesGroup({
      title: "Appearance",
    });
    page.add(generalGroup);

    const displayTextRow = new Adw.EntryRow({
      title: "Display text",
    });
    settings.bind(
      "display-text",
      displayTextRow,
      "text",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(displayTextRow);

    const positionModel = new Gtk.StringList({
      strings: ["Left", "Center", "Right"],
    });
    const positionRow = new Adw.ComboRow({
      title: "Position in panel",
      subtitle: "Where to place the username in the top panel",
      model: positionModel,
    });
    positionRow.set_selected(
      ["left", "center", "right"].indexOf(settings.get_string("position")),
    );
    positionRow.connect("notify::selected", () => {
      settings.set_string(
        "position",
        ["left", "center", "right"][positionRow.get_selected()],
      );
    });
    generalGroup.add(positionRow);

    const paddingRow = new Adw.SpinRow({
      title: "Horizontal padding",
      subtitle: "Extra padding around the username text (in pixels)",
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 50,
        step_increment: 1,
        page_increment: 5,
      }),
    });
    settings.bind(
      "padding",
      paddingRow,
      "value",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(paddingRow);

    const spacingRow = new Adw.SpinRow({
      title: "Spacing",
      subtitle: "Extra spacing between elements (in pixels)",
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 50,
        step_increment: 1,
        page_increment: 5,
      }),
    });
    settings.bind(
      "spacing",
      spacingRow,
      "value",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(spacingRow);
  }
}
