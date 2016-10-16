#!/bin/bash

export NODE_ENV=production
export API_PORT=10440

./node_modules/.bin/babel-node server/server.js
