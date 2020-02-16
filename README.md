# Just A Code Challenge

## Scripts

- 'npm install' installs packages
- 'npm run dev' nodemon
- 'npm start' starts project
- 'npm test' run tests

## Requirements

- nodejs V.13

## Use project

- To check the methods please use POST
- I didn't have time to complete protection on Database endpoint
- I have impletented a cache service to prevent multiple query on database

## Sample Request

curl -X POST \
 http://localhost:3000/api/complexity \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json' \
 -d '{
"inputText" : "Kim loves going to the cinema"
}'
