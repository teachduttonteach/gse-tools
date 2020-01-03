mv .local.clasp.json .clasp.json
cp ../map/MapGS.ts .
cp ../SidebarButton.ts .
cp ../UiGS.ts .
cp ../classroom/ClassInfo.ts .
cp ../classroom/Work.ts .
cp ../classroom/Material.ts .
cp ../docs/DocsGS.ts .
cp ../docs/DocLevels.ts .
clasp push
rm ./UiGS.ts
rm ./MapGS.ts
rm ./SidebarButton.ts
rm ./ClassInfo.ts
rm ./Work.ts
rm ./Material.ts
rm ./DocsGS.ts
rm ./DocLevels.ts
mv .clasp.json .local.clasp.json