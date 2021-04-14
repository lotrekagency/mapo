#!/bin/bash
source="./lib/templates"
destination="./docs"

destination=$(cd -- "$destination" && pwd)
cd -- "$source" && find . -name "*.md" -exec sh -c '
  mkdir -p "$0/${1%.*}/"
  mv "$1" "$0/${1%.*}/README.md"
' "$destination" {} \;