#!/bin/bash

TESTING=false

for var in "$@"
do 
  case "$var" in
    -t|--test)
        mv appsscript.json appsscript.notest.json
        mv appsscript.test.json appsscript.json
        mv .local.claspignore .local.notest.claspignore
        mv .local.test.claspignore .local.claspignore
        TESTING=true
      ;;
  esac
done

mv .local.claspignore .claspignore
mv .local.clasp.json .clasp.json
clasp push
mv .clasp.json .local.clasp.json
mv .claspignore .local.claspignore
if [ "$TESTING" = true ] 
then
    mv appsscript.json appsscript.test.json
    mv appsscript.notest.json appsscript.json
    mv .local.claspignore .local.test.claspignore
    mv .local.notest.claspignore .local.claspignore
fi
