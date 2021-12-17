mv .local.clasp.json .clasp.json
cp ../DateParams.ts .
cp ../utils/Utilities.ts .
clasp push
rm ./DateParams.ts
rm ./Utilities.ts
mv .clasp.json .local.clasp.json