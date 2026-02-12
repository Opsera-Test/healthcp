#!/usr/bin/env bash
# Validate GitHub Actions workflow YAML syntax locally (run before push).
set -e
cd "$(dirname "$0")/.."
for f in .github/workflows/*.yaml .github/workflows/*.yml; do
  [ -f "$f" ] || continue
  if ruby -r yaml -e "YAML.load_file('$f')" 2>/dev/null; then
    echo "  OK  $f"
  else
    echo "  FAIL $f"
    exit 1
  fi
done
echo "All workflow files passed YAML validation."
