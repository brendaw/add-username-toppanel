#!/bin/bash

source_folder=src
build_folder=build

extension_uuid=add-username-toppanel@brendaw.com

packed_extension_file=$build_folder/$extension_uuid.zip

if [ -d "$build_folder" ]; then
	rm -r $build_folder
fi

mkdir -p $build_folder

cd $source_folder

zip "../$packed_extension_file" *

cd ..

echo "Extension packed at $packed_extension_file"
