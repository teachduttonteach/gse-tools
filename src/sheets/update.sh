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
cp ../map/MapGS.ts .
cp ../drive-sheets/DataSheet.ts .
cp ../Cache.ts .
cp ../SidebarButton.ts .
cp ../utils/Utilities.ts .
cp ../UiGS.ts .
clasp push
rm ./MapGS.ts
rm ./UiGS.ts
rm ./DataSheet.ts
rm ./Cache.ts
rm ./SidebarButton.ts
rm ./Utilities.ts
mv .clasp.json .local.clasp.json
mv .claspignore .local.claspignore
if [ "$TESTING" = true ] 
then
    mv appsscript.json appsscript.test.json
    mv appsscript.notest.json appsscript.json
    mv .local.claspignore .local.test.claspignore
    mv .local.notest.claspignore .local.claspignore
fi
