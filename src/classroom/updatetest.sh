#!/bin/bash

TESTING=false

for var in "$@"
do 
  case "$var" in
    -t|--test)
        echo "doing test"
        TESTING=true
      ;;
  esac
done

mv .local.clasp.json crap.json
if [ "$TESTING" = true ] 
then
    echo "test is true"
else 
    echo "test is false"
fi
mv crap.json .local.clasp.json