import St from "gi://St";
import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import Gio from "gi://Gio";
import GdkPixbuf from "gi://GdkPixbuf";
import { SystemIndicator } from "resource:///org/gnome/shell/ui/quickSettings.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

export class UsernameIndicator extends SystemIndicator {
  _init(settings) {
    super._init();

    this._settings = settings;

    this._indicator = this._addIndicator();

    this._usernameLabel = new St.Label({
      text: this._getUsername(),
      y_align: Clutter.ActorAlign.CENTER,
    });
    // We will load the avatar image, if required, in '_applyPositionAvatarPicture()'
    this._avatarPicture = null;
    this._applyStyle();
    this.add_child(this._usernameLabel);

    const QuickSettingsMenu = Main.panel.statusArea.quickSettings;
    this._indicatorsBox = QuickSettingsMenu._indicators;

    this._childAddedId = this._indicatorsBox.connect("child-added", () => {
      this._applyPosition();
      this._applyPositionAvatarPicture();
    });

    this._signalIds = [
      settings.connect("changed::display-text", () => this._updateText()),
      settings.connect("changed::spacing-left", () => this._applyStyle()),
      settings.connect("changed::spacing-right", () => this._applyStyle()),
      settings.connect("changed::font-size", () => this._applyStyle()),
      settings.connect("changed::position", () => this._applyPosition()),
      settings.connect("changed::avatar-picture-position", () => this._applyPositionAvatarPicture()),
    ];

    QuickSettingsMenu.addExternalIndicator(this);
    this._applyPosition();
    this._applyPositionAvatarPicture();
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

  _getUserAvatarFilename() {
    try {
      // Use DBus to find the location of user profile picture
      const connection = Gio.DBus.system;

      const [userObjectPath] = connection.call_sync(
        "org.freedesktop.Accounts",
        "/org/freedesktop/Accounts",
        "org.freedesktop.Accounts",
        "FindUserByName",
        new GLib.Variant("(s)", [GLib.get_user_name()]),
        new GLib.VariantType("(o)"),
        Gio.DBusCallFlags.NONE,
        -1,
        null,
      ).deep_unpack();

      const propertiesResult = connection.call_sync(
        "org.freedesktop.Accounts",
        userObjectPath,
        "org.freedesktop.DBus.Properties",
        "Get",
        new GLib.Variant("(ss)", ["org.freedesktop.Accounts.User", "IconFile"]),
        new GLib.VariantType("(v)"),
        Gio.DBusCallFlags.NONE,
        -1,
        null,
      );

      const [iconFileVariant] = propertiesResult.deep_unpack();
      const path = iconFileVariant.deep_unpack();

      if (path && GLib.file_test(path, GLib.FileTest.EXISTS | GLib.FileTest.IS_REGULAR)) {
        return path;
      }
      else {
        logError(new Error("User avatar file does not exist or is not a regular file"),
                 "Failed to fetch user avatar via DBus");
      }
    } catch (e) {
      logError(e, "Failed to fetch user avatar via DBus");
    }

    return null;
  }

  _updateText() {
    this._usernameLabel.set_text(this._getUsername());
  }

  _applyStyle() {
    const spacingLeft = this._settings.get_int("spacing-left");
    const spacingRight = this._settings.get_int("spacing-right");
    const fontSize = this._settings.get_int("font-size");

    const styles = [];
    if (spacingLeft > 0) {
      styles.push(`margin-left: ${spacingLeft}px`);
    }
    if (spacingRight > 0) {
      styles.push(`margin-right: ${spacingRight}px`);
    }
    if (fontSize > 0) {
      styles.push(`font-size: ${fontSize}px`);
    }

    // Setting style in the top most widget propogates to children
    this.set_style(styles.join("; "));
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

  _applyPositionAvatarPicture() {
    const positionAvatarPicture = this._settings.get_string("avatar-picture-position");
    if (this._avatarPicture == null) {
      if (positionAvatarPicture === "hidden" || this._getUserAvatarFilename() == null)
        return;

      const AVATAR_PICTURE_SIZE = Main.panel.height - 10;
      this._avatarPicture = this._createCircularStIcon(this._getUserAvatarFilename(),
                                                       AVATAR_PICTURE_SIZE);
      this.add_child(this._avatarPicture);  // We will reposition this below
    }

    const AVATAR_PICTURE_SPACING_PX = 8;
    if (positionAvatarPicture === "hidden") {
      if (this._avatarPicture.get_parent() === this) {
        this._avatarPicture.hide();
      }
    } else if (positionAvatarPicture === "before") {
      this.set_child_below_sibling(this._avatarPicture, this._usernameLabel);
      this._avatarPicture.set_style(`margin-left: 0px; margin-right: ${AVATAR_PICTURE_SPACING_PX}px;`)
      this._avatarPicture.show();
    } else if (positionAvatarPicture === "after") {
      this._avatarPicture.set_style(`margin-left: ${AVATAR_PICTURE_SPACING_PX}px; margin-right: 0px;`)
      this.set_child_above_sibling(this._avatarPicture, this._usernameLabel);
      this._avatarPicture.show();
    }
  }

  _createCircularPixbuf(path, size_px) {
    const src = GdkPixbuf.Pixbuf.new_from_file(path);

    // Crop to centered square
    const side = Math.min(src.get_width(), src.get_height());
    const offsetX = Math.floor((src.get_width() - side) / 2);
    const offsetY = Math.floor((src.get_height() - side) / 2);

    const square = GdkPixbuf.Pixbuf.new(
        GdkPixbuf.Colorspace.RGB,
        false,
        8,   // bits_per_sample
        side,
        side
    );

    square.fill(0x00000000);
    src.copy_area(offsetX, offsetY, side, side, square, 0, 0);

    // Scale to target size and add alpha channel, if not present
    const scaled = square.scale_simple(size_px, size_px, GdkPixbuf.InterpType.BILINEAR).add_alpha(false, 0, 0, 0);

    // Use the alpha channel to create a circular mask
    // CAUTION: get_pixels() returns a copy, so mutate it and build a new pixbuf from the bytes
    const pixels = scaled.get_pixels();
    const rowstride = scaled.get_rowstride();
    const nChannels = scaled.get_n_channels();

    const r = size_px / 2;
    const rSq = r * r;
    const rInnerBorderSq = (r - 1) * (r - 1);
    const cxy = (size_px - 1) / 2;

    const ALPHA_CHANNEL_IDX = 3;

    for (let y = 0; y < size_px; y++) {
      for (let x = 0; x < size_px; x++) {
        const dx = x - cxy;
        const dy = y - cxy;
        const distSq = dx * dx + dy * dy;
        const p = y * rowstride + x * nChannels;

        if (distSq >= rSq) {
          // Completely outside the circle -> fully transparent
          pixels[p + ALPHA_CHANNEL_IDX] = 0;
        }
        else if (distSq >= rInnerBorderSq) {
          // The following removes jagged edges and makes it pleasing to the eyes
          // Inside the 1-pixel anti-aliasing border -> smoothly fade
          const dist = Math.sqrt(distSq);

          // Calculate how much of the pixel is inside the radius (0.0 to 1.0)
          const coverage = r - dist;

          // Scale the existing alpha by the coverage fraction
          pixels[p + ALPHA_CHANNEL_IDX] = Math.round(pixels[p + ALPHA_CHANNEL_IDX] * coverage);
        }
        // Else: distSq < rInnerBorderSq, which means it's fully inside the circle.
        // We leave the alpha exactly as it is to preserve the image's sharpness.
      }
    }

    return GdkPixbuf.Pixbuf.new_from_bytes(
        GLib.Bytes.new(pixels),
        GdkPixbuf.Colorspace.RGB,
        true, // has_alpha
        8,   // bits_per_sample
        size_px,
        size_px,
        rowstride
    );
  }

  _createCircularStIcon(path, size_px) {
    return new St.Icon({
        gicon: this._createCircularPixbuf(path, size_px), // GdkPixbuf.Pixbuf implements Gio.Icon
        y_align: Clutter.ActorAlign.CENTER,
        width: size_px,
        height: size_px,
    });
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
