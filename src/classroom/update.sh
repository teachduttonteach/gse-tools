mv .local.clasp.json .clasp.json
cp ../map/MapGS.ts .
clasp push
rm ./MapGS.ts
mv .clasp.json .local.clasp.json