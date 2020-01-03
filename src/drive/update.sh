mv .local.clasp.json .clasp.json
cp ../MimeTypes.ts .
clasp push
rm ./MimeTypes.ts
mv .clasp.json .local.clasp.json