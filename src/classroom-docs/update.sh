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
cp ../UiGS.ts .
cp ../classroom/ClassroomGS.ts .
cp ../classroom/ClassGS.ts .
cp ../docs/DocsGS.ts .
cp ../docs/DocLevels.ts .
cp ../drive/DriveGS.ts .
cp ../enums/MimeTypes.ts .
clasp push
if [ "$TESTING" = true ] 
then
    mv appsscript.json appsscript.test.json
    mv appsscript.notest.json appsscript.json
fi
rm ./DriveGS.ts
rm ./UiGS.ts
rm ./ClassroomGS.ts
rm ./ClassGS.ts
rm ./DocsGS.ts
rm ./DocLevels.ts
rm ./MimeTypes.ts
mv .clasp.json .local.clasp.json