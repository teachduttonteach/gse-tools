mv .local.clasp.json .clasp.json
cp ../map/MapGS.ts .
cp ../docs/DocsGS.ts .
cp ../docs/DocLevels.ts .
cp ../drive/DriveGS.ts .
cp ../MimeTypes.ts .
cp ../SidebarButton.ts .
cp ../UiGS.ts .
clasp push
rm ./MimeTypes.ts
rm ./SidebarButton.ts
rm ./MapGS.ts
rm ./DocsGS.ts
rm ./DriveGS.ts
rm ./DocLevels.ts
rm ./UiGS.ts
mv .clasp.json .local.clasp.json