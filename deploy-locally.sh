#!/bin/bash

metadata_file=src/metadata.json

extension_uuid=`cat $metadata_file | grep -Po '"uuid": *\K"[^"]*"' | sed "s/\"//g"`
extension_name=`cat $metadata_file | grep -Po '"name": *\K"[^"]*"' | sed "s/\"//g"`
extension_description=`cat $metadata_file | grep -Po '"description": *\K"[^"]*"' | sed "s/\"//g"`

echo "'$extension_uuid'"
echo "'$extension_name'"
echo "'$extension_description'"

extension_src_folder=src
extension_install_folder=~/.local/share/gnome-shell/extensions/$extension_uuid

rm -r $extension_install_folder

gnome-extensions uninstall $extension_uuid

gnome-extensions create --name="$extension_name" --description="$extension_description" --uuid="$extension_uuid"

exit 0

gnome-extensions enable "$extension_uuid"
