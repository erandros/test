#!/bin/sh
find $2 -type f ! -path '*node_modules*' ! -path '*wwwroot/lib*' | xargs -I{} rm -v {}