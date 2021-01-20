//import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const app = express();
app.use(cors());

let WEB_ROOT = path.join(__dirname + '/public');
console.log(`Using ${WEB_ROOT} as ROOT web dir`);
app.use(express.static(WEB_ROOT));
 
app.get('/', (req, res) => {
    res.send('Hello BRX Sim! <br>You are successfully running the web development simulator!');
  });


// Request for Array of Strings
//data/json?SDFileNames=SDFileNames0,25
// Example JSON: 

//
app.get('/data/json', (req, res) => {
  res.send('{"SDFileNames":["FontAwesome.otf","fontawesome-webfont.eot","fontawesome-webfont.svg","fontawesome-webfont.ttf","fontawesome-webfont.woff","fontawesome-webfont.woff2","MyFILELOG_y2020m12d28.csv","MyFILELOG_y2020m12d16.csv","MyFILELOG_y2019m10d11.csv","BRX-DataLog-Chartist-Legend.html","","","","","","","","","","","","","","",""]}');
});


//  app.listen(process.env.PORT, () =>
  app.listen(3000, () =>
  console.log('BRX-SIM Example app listening on port 3000!'),
);
