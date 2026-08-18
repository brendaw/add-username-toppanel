import Adw from "gi://Adw";
import Gio from "gi://Gio";
import Gtk from "gi://Gtk";
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class UsernameIndicatorPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const settings = this.getSettings("com.brendaw.add-username-toppanel");

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
    const displayTextSubtitle = new Gtk.Label({
      label: "Templates: %u (user), %U (name), %h (host). Leave empty for default.",
      wrap: true,
      xalign: 0,
      css_classes: ["dim-label", "caption"],
    });
    displayTextRow.add_suffix(displayTextSubtitle);
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

    const spacingLeftRow = new Adw.SpinRow({
      title: "Spacing left",
      subtitle: "Extra spacing to the left of the text (in pixels)",
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 50,
        step_increment: 1,
        page_increment: 5,
      }),
    });
    settings.bind(
      "spacing-left",
      spacingLeftRow,
      "value",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(spacingLeftRow);

    const spacingRightRow = new Adw.SpinRow({
      title: "Spacing right",
      subtitle: "Extra spacing to the right of the text (in pixels)",
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 50,
        step_increment: 1,
        page_increment: 5,
      }),
    });
    settings.bind(
      "spacing-right",
      spacingRightRow,
      "value",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(spacingRightRow);

    const fontSizeRow = new Adw.SpinRow({
      title: "Font size",
      subtitle: "Text size in pixels (0 = panel default)",
      adjustment: new Gtk.Adjustment({
        lower: 0,
        upper: 24,
        step_increment: 1,
        page_increment: 4,
      }),
    });
    settings.bind(
      "font-size",
      fontSizeRow,
      "value",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(fontSizeRow);
  }
}
