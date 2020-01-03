mv .local.clasp.json .clasp.json
cp ../sheets/SpreadsheetGS.ts .
cp ../UiGS.ts .
cp ../sheets/SheetGS.ts .
cp ../map/MapGS.ts .
cp ../SidebarButton.ts .
clasp push
rm ./UiGS.ts
rm ./SidebarButton.ts
rm ./SpreadsheetGS.ts
rm ./SheetGS.ts
rm ./MapGS.ts
mv .clasp.json .local.clasp.json