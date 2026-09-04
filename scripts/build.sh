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

# Compile GSettings schemas
schemas_dir="../$build_folder/schemas"
mkdir -p "$schemas_dir"
cp schemas/*.gschema.xml "$schemas_dir/"
glib-compile-schemas "$schemas_dir/"

zip "../$packed_extension_file" * -x "schemas/*"

cd "../$build_folder"
zip "$extension_uuid.zip" schemas/*.gschema.xml
cd ..

echo "Extension packed at $packed_extension_file"

if command -v shexli &>/dev/null; then
	echo "Validating extension package..."
	if [[ "$OSTYPE" == "darwin"* ]]; then
		TMPDIR=/private/var/tmp shexli "$packed_extension_file"
	else
		shexli "$packed_extension_file"
	fi
else
	echo "Tip: install shexli to validate the package before uploading:"
	echo "  pip install shexli && shexli $packed_extension_file"
fi
