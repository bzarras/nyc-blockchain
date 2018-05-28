#!/bin/bash

filename=events.tsv

npm run build
node build/main.js > $filename

echo "Successfully generated $filename"
