#!/usr/bin/env bash
echo "Instalando dependências..."
npm install --ignore-scripts
echo "Removendo e reconstruindo o SQLite3..."
npm rebuild sqlite3
echo "Build concluído!"
