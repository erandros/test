#!/bin/sh
echo src
echo $1
echo to
echo $2
#find $2 -type f ! -path '*node_modules*' | xargs -I{} rm -v {}