//import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { get } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import BRX_SIM_DATA from './brx-sim-data.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const app = express();
app.use(cors());

let WEB_ROOT = path.join(__dirname, 'public');
console.log(`Using ${WEB_ROOT} as ROOT web dir`);
app.use(express.static(WEB_ROOT));
 
let NOT_FOUND_MSG = '<!DOCTYPE HTML>\n<html>\n<body>\n<h1>Not Found</h1>\n</body>\n</html>';
let BAD_REQUEST_MSG = '<!DOCTYPE HTML>\n<html>\n<body>\n<h1>Bad Request</h1>\n</body>\n</html>';

app.get('/', (req, res) => {
    res.send('Hello BRX Sim! <br>You are successfully running the web development simulator!');
});


// Simulate Data Request API of BRX PLC
app.get('/data/json', (req, res) => {
  
  if (isEmptyQuery(req.query, res)) return;

  logDataRequestParameters(req);

  let results = new Object;
  // Collect results for each parameter in request
  for (const paramName in req.query) {
    console.log("Current paramName = ", paramName);
    // handle any bad request parameters
    if (!isValidDataJsonParameter(paramName, res)) return;

    results[paramName] = getResultsForParameter(paramName, req.query[paramName]);
  }
  res.send(results);

});


function getResultsForParameter(name, value) {
  console.log("Processing parameter", name, "with value", value);
  let results = BRX_SIM_DATA[name];
  // Handle if this is an Array and the request included a valid number of items, given the Sim data we have
  let count = getCountFromValue(value);
  console.log(Array.isArray(results), count);
  if (Array.isArray(results) && count > 0) {
      if (count < results.length) {
        return results.slice(0,count);
      }
  } 
  return results;
}

// Parse out the count value after comma, from param value like: data/json?FirstTenDs=DST0,10
// Should return 10
function getCountFromValue(value) {
  if (! value.includes(",")) return 0;
  let valueParts = value.split(",",2);
  return parseInt(valueParts[1]);
}

function logDataRequestParameters(req) {
  for (const key in req.query) {
    console.log("Called /data/json with parameter:",key, req.query[key]);
  }
  let paramNames = Object.keys(req.query);
  console.log("Parameter Names", paramNames.join());

}

function isEmptyQuery(query, res) {
  let paramNames = Object.keys(query);
  if (paramNames.length == 0) {
    // Return 404
    console.log("data/json Request with no query parameter given. Returning 404-Not Found")
    res.status(404).send(NOT_FOUND_MSG); 
    return true;
  }
  return false;
}

function isValidDataJsonParameter(paramName, res) {
  // Return 400 for a bad parameterName
  if (!BRX_SIM_DATA[paramName]) {
    console.log(`data/json Request with unknown parameter ${paramName}. Possibly need addition to brx-sim-data.js. Returning 400-Bad Request`)
    res.status(400).send(BAD_REQUEST_MSG); 
    return false;
  }
  return true;
}

//  app.listen(process.env.PORT, () =>
  app.listen(3000, () =>
  console.log('BRX-SIM Example app listening on port 3000!'),
);


// Valid PLC Resources for data/json requests
// Timers: T0,L through T256,L
//