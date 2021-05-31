#!/bin/bash

commits=(
  ""
  ""
  ""
  ""
  ""
  ""
  ""
  ""
  ""
  ""
  ""
)
tags=(
  "optimization"
  "services"
  "events-4"
  "events-3"
  "events-2"
  "events-1"
  "function"
  "loops"
  "select-elements"
  "hello-world"
  "init"
)

# get length of an array
tagsLength=${#tags[@]}

# use for loop to read all values and indexes
for (( i=0; i<${tagsLength}; i++ ));
do
  echo "Tagging: ${commits[$i]} with tag: ${tags[$i]}"
  git co "${commits[$i]}"
  git tag -a "${tags[$i]}" -m ${tags[$i]} --force
done
