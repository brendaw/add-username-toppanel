#!/bin/bash

source_folder=src
build_folder=build

metadata_file=$source_folder/metadata.json

extension_uuid=add-username-toppanel@brendaw.com

packed_extension_file=$build_folder/$extension_uuid.zip

rm -r $build_folder
mkdir -p $build_folder

cd $source_folder

zip "../$packed_extension_file" *

cd ..

echo "Extension packed at $packed_extension_file"
