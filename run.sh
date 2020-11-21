#!/bin/sh

# 31745 is breaking
for i in {31740..31746}
do
  node ./ ${i}
done
