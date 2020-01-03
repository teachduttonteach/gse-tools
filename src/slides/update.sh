mv .local.clasp.json .clasp.json
cp ../drive/DriveGS.ts .
cp ../enums/QuestionType.ts .
cp ../UiGS.ts .
clasp push
rm ./DriveGS.ts
rm ./UiGS.ts
rm ./QuestionType.ts
mv .clasp.json .local.clasp.json