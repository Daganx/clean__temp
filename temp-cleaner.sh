#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_PATH=$(which node 2>/dev/null || echo "")

if [ -z "$NODE_PATH" ]; then
    echo "Erreur: Node.js n'est pas installé."
    echo "Installez Node.js: https://nodejs.org/"
    exit 1
fi

exec "$NODE_PATH" "$SCRIPT_DIR/temp-cleaner.js" "$@"
