#!/bin/sh
echo find $2 -type f ! -path '*node_modules*' | xargs -I{} rm -v {}