import Adw from "gi://Adw";
import Gio from "gi://Gio";
import Gtk from "gi://Gtk";
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class UsernameIndicatorPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const settings = this.getSettings("com.brendaw.add-username-toppanel");

    const savedValues = {
      "display-text": settings.get_string("display-text"),
      "position": settings.get_string("position"),
      "spacing-left": settings.get_int("spacing-left"),
      "spacing-right": settings.get_int("spacing-right"),
      "font-size": settings.get_int("font-size"),
    };

    const positionLabels = { left: "Left", center: "Center", right: "Right" };

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
    const updatePositionCombo = () => {
      positionRow.set_selected(
        ["left", "center", "right"].indexOf(settings.get_string("position")),
      );
    };
    updatePositionCombo();
    positionRow.connect("notify::selected", () => {
      settings.set_string(
        "position",
        ["left", "center", "right"][positionRow.get_selected()],
      );
    });
    settings.connect("changed::position", updatePositionCombo);
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
    let lastFontSize = settings.get_int("font-size");
    fontSizeRow.connect("notify::value", () => {
      const value = fontSizeRow.get_value();
      if (lastFontSize === 0 && value > 0) {
        fontSizeRow.set_value(15);
      } else if (value > 0 && value < 8) {
        fontSizeRow.set_value(0);
      }
      lastFontSize = fontSizeRow.get_value();
    });
    settings.bind(
      "font-size",
      fontSizeRow,
      "value",
      Gio.SettingsBindFlags.DEFAULT,
    );
    generalGroup.add(fontSizeRow);

    const actionsGroup = new Adw.PreferencesGroup();
    page.add(actionsGroup);

    const resetLastButton = new Gtk.Button({
      label: "Reset to last saved",
      halign: Gtk.Align.CENTER,
      margin_top: 12,
    });
    resetLastButton.connect("clicked", () => {
      const lines = [];
      for (const [key, value] of Object.entries(savedValues)) {
        const displayValue = key === "position"
          ? positionLabels[value] || value
          : String(value);
        lines.push(`${key}: ${displayValue}`);
      }
      const dialog = new Adw.MessageDialog({
        heading: "Revert to last saved settings?",
        body: `This will restore:\n\n${lines.join("\n")}`,
        transient_for: window,
      });
      dialog.add_response("cancel", "Cancel");
      dialog.add_response("revert", "Revert");
      dialog.connect("response", (_source, response) => {
        if (response === "revert") {
          settings.set_string("display-text", savedValues["display-text"]);
          settings.set_string("position", savedValues["position"]);
          settings.set_int("spacing-left", savedValues["spacing-left"]);
          settings.set_int("spacing-right", savedValues["spacing-right"]);
          settings.set_int("font-size", savedValues["font-size"]);
        }
      });
      dialog.present();
    });
    actionsGroup.add(resetLastButton);

    const resetDefaultsButton = new Gtk.Button({
      label: "Reset to defaults",
      css_classes: ["destructive-action"],
      halign: Gtk.Align.CENTER,
      margin_top: 6,
    });
    resetDefaultsButton.connect("clicked", () => {
      const dialog = new Adw.MessageDialog({
        heading: "Reset all settings?",
        body: "This will restore all settings to their default values.",
        transient_for: window,
      });
      dialog.add_response("cancel", "Cancel");
      dialog.add_response("reset", "Reset");
      dialog.set_response_appearance("reset", Adw.ResponseAppearance.DESTRUCTIVE);
      dialog.connect("response", (_source, response) => {
        if (response === "reset") {
          settings.set_string("display-text", "");
          settings.set_string("position", "right");
          settings.set_int("spacing-left", 0);
          settings.set_int("spacing-right", 10);
          settings.set_int("font-size", 0);
        }
      });
      dialog.present();
    });
    actionsGroup.add(resetDefaultsButton);
  }
}
