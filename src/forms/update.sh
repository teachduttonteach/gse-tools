mv .local.clasp.json .clasp.json
cp ../enums/QuestionType.ts .
cp ../UiGS.ts .
cp ../map/MapGS.ts .
cp ../SidebarButton.ts .
clasp push
rm ./MapGS.ts
rm ./SidebarButton.ts
rm ./QuestionType.ts
rm ./UiGS.ts
mv .clasp.json .local.clasp.json