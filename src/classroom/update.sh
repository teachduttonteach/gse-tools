#!/bin/bash

TESTING=false

for var in "$@"
do 
  case "$var" in
    -t|--test)
        mv appsscript.json appsscript.notest.json
        mv appsscript.test.json appsscript.json
        TESTING=true
      ;;
  esac
done

mv .local.clasp.json .clasp.json
clasp push
if [ "$TESTING" = true ] 
then
    mv appsscript.json appsscript.test.json
    mv appsscript.notest.json appsscript.json
fi
mv .clasp.json .local.clasp.json