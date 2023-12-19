#!/bin/bash

# Configuration
TEX_FILE="thesis.tex"   # Replace with your TeX file name
PDFLATEX="pdflatex"            # pdflatex command or its path
INTERVAL=2                     # Check interval in seconds

# Function to compile TeX file
compile_tex() {
    $PDFLATEX $TEX_FILE
}

echo "Watching changes in $TEX_FILE..."

# Initial compile
compile_tex

# Watch for changes
while true; do
    inotifywait -e modify "$TEX_FILE"
    echo "Changes detected, recompiling..."
    compile_tex
done
