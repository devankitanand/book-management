const fs = require('fs');
const csv = require('csv-parser');

const parseCSV = (filePath, callback) => {
  const results = [];
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Convert publishedDate to a proper Date object
      if (data.publishedDate) {
        const dateParts = data.publishedDate.split('-');
        
        let year, month, day;

        if (dateParts[2].length === 2) {
          // Assume the format is dd-mm-yy
          day = dateParts[0];
          month = dateParts[1];
          year = `19${dateParts[2]}`;
        } else {
          // Assume the format is yyyy-mm-dd
          year = dateParts[0];
          month = dateParts[1];
          day = dateParts[2];
        }

        const publishedDate = new Date(`${year}-${month}-${day}`);
        // data.publishedDate = publishedDate;
        if (!isNaN(publishedDate.getTime())) {
          data.publishedDate = publishedDate;
        } 
        
        // else {
        //   console.error(`Invalid date format: ${data.publishedDate}`);
        // }
      }
      // Ensure price is parsed as a number
      if (data.price) {
        data.price = parseFloat(data.price);
      }
      results.push(data);
    })
    .on('end', () => {
      callback(null, results);
    })
    .on('error', (err) => {
      callback(err, null);
    });
};

module.exports = parseCSV;


// const fs = require('fs');
// const csv = require('csv-parser');

// const parseCSV = (filePath, callback) => {
//   const results = [];
  
//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (data) => {
//       // Push the data as it is into the results array
//       results.push(data);
//     })
//     .on('end', () => {
//       callback(null, results);
//     })
//     .on('error', (err) => {
//       callback(err, null);
//     });
// };

// module.exports = parseCSV;

