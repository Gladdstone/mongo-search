#!/bin/bash
cd client
npm ci
npm run build

cd ../server
npm ci
node mongoConnect.js