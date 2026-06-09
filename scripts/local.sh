#!/bin/bash

source_folder=src

extensions_folder="$HOME/.local/share/gnome-shell/extensions"
extension_uuid="add-username-toppanel@brendaw.com"
extension_folder="$extensions_folder/$extension_uuid"

echo "$extension_folder"
mkdir -p "$extension_folder"

rm -rf "$extension_folder/"*

cp -r src/* $extension_folder

echo "Extension updated locally at $extension_folder"
