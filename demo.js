
/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param  {Number} lat     Latitude of the center of the circle
 * @param  {Number} lng     Longitude of the center of the circle
 */


function addCircleToMap(map, lat, lng){
  map.addObject(new H.map.Circle(
    // The central point of the circle
    {lat:lat, lng:lng},
    // The radius of the circle in meters
    15000,
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
      }
    }
  ));
}





/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over New Delhi
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat:28.6071, lng:77.2127},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var pincodeList;

// Now use the map as required...
// addCircleToMap(map);

// addCircleToMap(map, result.lat, result.lng);

function readExcelAndAddCircles() {
  const filePath = 'output_pincode_lat_lng.xlsx'; // Path to your Excel file

  fetch(filePath)
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });

      // Get the first worksheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert the worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("jsonData");
      // Iterate over each row in the data
      jsonData.map(row => 
        // Extract the values from the columns (replace with your actual column names)
        // const pincode = row.Pincode;
        // const lat = row.Latitude;
        // const lng = row.Longitude;

        // console.log(row.Pincode)
        // Check if all required values are present
        
        addCircleToMap(map, row.Latitude, row.Longitude)
        
      );
    })
    .catch(error => console.error('Error fetching or reading the Excel file:', error));
}
readExcelAndAddCircles();


// function readExcel(){
//   const filePath = 'MCA Master Data Fields.xlsx'; // Path to your Excel file

//   fetch(filePath)
//     .then(response => response.arrayBuffer())
//     .then(data => {
//       const workbook = XLSX.read(data, { type: 'array' });

//       // Get the first worksheet
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];

//       // Convert the worksheet to JSON
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       // const limitedData = jsonData.slice(0, );

//       // Extract the Pincode column (replace 'Pincode' with the actual column name)
//       pincodeList = jsonData.map(row => row.REGISTERED_OFFICE_PINCODE).filter(p => p !== undefined);

//       // Print the extracted values
//       console.log(pincodeList);

//       // Assuming `pincodeList` is already populated
//       // fetchCoordinatesForAllPincodes(pincodeList);
//     })
//     .catch(error => console.error('Error fetching or reading the Excel file:', error));
// }

// readExcel();



// async function getLatLngForPincode(pincode, retries = 3) {
//   const apiKey = 'MyKoML9Gluz5Va2EXndQBm7ECU1Xchr9K96px4ueNAA';
//   const geocodeUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${pincode}&apiKey=${apiKey}`;

//   try {
//     const response = await fetch(geocodeUrl);

//     if (response.status === 429) {
//       console.warn(`Rate limit exceeded for pincode ${pincode}. Retrying...`);
      
//       // Exponential backoff delay: wait for (2^retry) seconds
//       await new Promise(resolve => setTimeout(resolve, Math.pow(2, 3 - retries) * 1000));

//       if (retries > 0) {
//         return await getLatLngForPincode(pincode, retries - 1);
//       } else {
//         console.error(`Max retries reached for pincode: ${pincode}`);
//         return null;
//       }
//     }

//     const data = await response.json();

//     if (data.items && data.items.length > 0) {
//       const { lat, lng } = data.items[0].position;
//       return { lat, lng };
//     } else {
//       console.warn(`No coordinates found for pincode: ${pincode}`);
//       return null;
//     }
//   } catch (error) {
//     console.error(`Error fetching data for pincode ${pincode}:`, error);
//     return null;
//   }
// }

// // Function to introduce a delay between requests
// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Modified function to fetch lat, lng for all pincodes in the list with delays
// async function fetchCoordinatesForAllPincodes(pincodeList) {
//   const coordinates = [];

//   for (const pincode of pincodeList) {
//     // Wait for a delay (e.g., 1 second) before the next request
//     await delay(1000); 

//     const result = await getLatLngForPincode(pincode);
//     if (result) {
//       coordinates.push({ pincode, lat: result.lat, lng: result.lng });
//       addCircleToMap(map, result.lat, result.lng);
//     }
//   }

//   // Log the final coordinates list
//   console.log(coordinates);
//   return coordinates;
// }



