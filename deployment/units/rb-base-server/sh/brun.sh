#!/bin/bash

if [ -d ./deployment ]
then
    ./node_modules/.bin/babel-node $1 $2 $3 $4 $5 $6 $7 $8 $9
else
    node $1 $2 $3 $4 $5 $6 $7 $8 $9
fi