#!/bin/bash
source="./packages/@mapomodule/uikit"
destination="./docs"
destination=$(cd -- "$destination" && pwd)
changelog_dir="$destination/Changelog/"

mkdir -p $changelog_dir
cp ./CHANGELOG.md $changelog_dir/README.md

cd -- "$source" && find . -name "*.md" -not -name "CHANGELOG.md" -exec sh -c '
  mkdir -p "$0/${1%.*}/"
  mv "$1" "$0/${1%.*}/README.md"
' "$destination" {} \;
