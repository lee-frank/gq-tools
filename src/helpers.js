export {
  // CSV conversion
  convertArrayOfObjectsToCSV,
  downloadCSV
};
/** Converts Array to CSV for download
 * @param  {Object} args - object to convert to CSV format
 * @return {Object} - returns formatted CSV
 */
function convertArrayOfObjectsToCSV (args) {
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;

  // set data to object
  data = args || null;

  // if null, return null
  if (data === null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  // get keys from first element in data
  keys = Object.keys(data[0]);

  // Construct first header row
  // Wrap each element of the array with quotes
  // Add comma delimiter
  result = '';
  result += keys
    .map(function (el) {
      return '"' + el + '"';
    })
    .join(columnDelimiter);
  result += lineDelimiter; // Add new line

  data.forEach(function (item) {
    ctr = 0;
    keys.forEach(function (key) {
      // Don't add column delimiter in front of first item
      if (ctr > 0) {
        result += columnDelimiter;
      }
      result += '"' + item[key] + '"';
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}

/** Download CSV file
 * @param {Object} args - filename
 * @param {Object} csvdata - the csv object to convert
 */
function downloadCSV (args, csvdata) {
  let data, filename, link;
  let csv = csvdata;

  if (csv === null) {
    return;
  }
  filename = args;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
