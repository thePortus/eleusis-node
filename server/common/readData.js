const path = require('path');
const fs = require('fs');
const csvjson = require('csvjson');

const dataDir = path.join(__dirname, 'data');

  function csvToJson(filename) {
    // Create filename relative to this directory
    var filepath = path.join(dataDir, filename);
    // Read file in and convert to json with npm package
    var rawData = fs.readFileSync(filepath, { encoding: 'utf8' });
    var results = csvjson.toSchemaObject(rawData, { quote: '"' });
    // Return results
    return results;
  }
  /* end csvToJson */

module.exports = {
  csvToJson: csvToJson
};
