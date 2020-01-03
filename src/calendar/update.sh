mv .local.clasp.json .clasp.json
cp ../map/MapGS.ts .
cp ../utils/Utilities.ts .
clasp push
rm ./MapGS.ts
rm ./Utilities.ts
mv .clasp.json .local.clasp.json