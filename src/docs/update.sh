mv .local.clasp.json .clasp.json
cp ../UiGS.ts .
cp ../map/MapGS.ts .
cp ../SidebarButton.ts .
clasp push
rm ./UiGS.ts
rm ./MapGS.ts
rm ./SidebarButton.ts
mv .clasp.json .local.clasp.json