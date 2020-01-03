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