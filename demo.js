
/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param  {Number} lat     Latitude of the center of the circle
 * @param  {Number} lng     Longitude of the center of the circle
 * @param {String} col      Color of the circle
 */


function addCircleToMap(map, lat, lng, col) {
  map.addObject(new H.map.Circle(
    // The central point of the circle
    { lat: lat, lng: lng },
    // The radius of the circle in meters
    55000,
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: col  // Color of the circle
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
  center: { lat: 28.6071, lng: 77.2127 },
  zoom: 4,
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

// function createDictionary() {
//   const workbook = 'matched_pincodes_lat_long.xlsx';  // replace with your file path

//   fetch(workbook)
//     .then(response => response.arrayBuffer())
//     .then(data => {
//       const workbook = XLSX.read(data, { type: 'array' });
//       // Select the first worksheet
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       // Convert the worksheet to JSON format
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       const categoryDict = {};
//       jsonData.forEach(row => {
//         const category = row['Category'];  
//         const latitude = row['Latitude']; 
//         const longitude = row['Longitude'];

//         if (category && latitude !== undefined && longitude !== undefined) {
//           if (!categoryDict[category]) {
//             categoryDict[category] = [];
//           }
//           categoryDict[category].push({ lat: latitude, lng: longitude });
//         }
//       });

//       console.log(categoryDict);
//       mapIterator(categoryDict);
//     })
//     .catch(error => console.error('Error fetching or reading the Excel file:', error));
// }
// createDictionary();

// function mapIterator(categoryDict) {

//   for (const [key, values] of Object.entries(categoryDict)) {
//     values.forEach(({ lat, lng }) => {
//       addCircleToMap(map, lat, lng);
//     });
//   }
// }


// PLOT A COMPANIES LOCATION BY THEIR MULTIPLE ADDREESS ACROSS INDIA

const GSTIN_Address = [
  {
    "state": "Andhra Pradesh",
    "latitude": 16.094353,
    "longitude": 79.613977
  },
  {
    "state": "Arunachal Pradesh",
    "latitude": 28.432865,
    "longitude": 95.112255
  },
  {
    "state": "Assam",
    "latitude": 25.728705,
    "longitude": 93.090127
  },
  {
    "state": "Bihar",
    "latitude": 24.916992,
    "longitude": 85.037818
  },
  {
    "state": "Chhattisgarh",
    "latitude": 21.010766,
    "longitude": 81.887299
  },
  {
    "state": "Goa",
    "latitude": 15.544042,
    "longitude": 74.410802
  },
  {
    "state": "Gujarat",
    "latitude": 22.364082,
    "longitude": 71.078407
  },
  {
    "state": "Haryana",
    "latitude": 28.960642,
    "longitude": 75.618506
  },
  {
    "state": "Himachal Pradesh",
    "latitude": 30.679208,
    "longitude": 77.259526
  },
  {
    "state": "Jharkhand",
    "latitude": 23.540951,
    "longitude": 85.569362
  },
  {
    "state": "Karnataka",
    "latitude": 15.302889,
    "longitude": 75.595973
  },
  {
    "state": "Kerala",
    "latitude": 10.489049,
    "longitude": 76.654200
  },
  {
    "state": "Madhya Pradesh",
    "latitude": 23.390798,
    "longitude": 78.531480
  },
  {
    "state": "Maharashtra",
    "latitude": 19.447163,
    "longitude": 75.770697
  },
  {
    "state": "Manipur",
    "latitude": 24.404181,
    "longitude": 93.905849
  },
  {
    "state": "Meghalaya",
    "latitude": 25.219829,
    "longitude": 91.445222
  },
  {
    "state": "Mizoram",
    "latitude": 23.478886,
    "longitude": 92.485785
  },
  {
    "state": "Nagaland",
    "latitude": 25.789523,
    "longitude": 95.020613
  },
  {
    "state": "Odisha",
    "latitude": 21.163793,
    "longitude": 85.377859
  },
  {
    "state": "Punjab",
    "latitude": 31.347007,
    "longitude": 75.784788
  }
]

const PF_Establishment_Address = [
  // {
  //     "state": "Andhra Pradesh",
  //     "latitude": 15.9129,
  //     "longitude": 79.7400
  // },
  // {
  //     "state": "Karnataka",
  //     "latitude": 15.3173,
  //     "longitude": 75.7139
  // },
  // {
  //     "state": "Maharashtra",
  //     "latitude": 19.7515,
  //     "longitude": 75.7139
  // },
  {
      "state": "West Bengal",
      "latitude": 22.9868,
      "longitude": 87.8550
  },
  {
      "state": "Rajasthan",
      "latitude": 27.0238,
      "longitude": 74.2179
  },
  {
      "state": "Uttar Pradesh",
      "latitude": 26.8467,
      "longitude": 80.9462
  },
  {
      "state": "Tamil Nadu",
      "latitude": 11.1271,
      "longitude": 78.6569
  },
  {
      "state": "Telangana",
      "latitude": 18.1124,
      "longitude": 79.0193
  },
  {
      "state": "Uttarakhand",
      "latitude": 30.0668,
      "longitude": 79.0193
  },
  {
      "state": "Sikkim",
      "latitude": 27.5330,
      "longitude": 88.5122
  },
  // {
  //     "state": "Meghalaya",
  //     "latitude": 25.4670,
  //     "longitude": 91.3662
  // },
  {
      "state": "Tripura",
      "latitude": 23.9408,
      "longitude": 91.9882
  },
  {
      "state": "Mizoram",
      "latitude": 23.1645,
      "longitude": 92.9376
  },
  {
      "state": "Jammu and Kashmir",
      "latitude": 33.7782,
      "longitude": 76.5762
  },
  {
      "state": "Andaman and Nicobar Islands",
      "latitude": 11.7401,
      "longitude": 92.6586
  }
]

const registered_office_address = [
  {
    "latitude": 18.9264,
    "longitude": 72.8246
  }
]

const corporate_office_address = [
  {
    "latitude": 28.6304,
    "longitude": 77.2177
  }
]

const company_website_address = [
  {
    "latitude": 18.5196,
    "longitude": 73.8553
  }
]

function multipleTypeOfAddressesForASingleCompany(){
  addCircleToMap(map, registered_office_address[0].latitude, registered_office_address[0].longitude, 'rgba(255, 0, 0, 0.7)');
  addCircleToMap(map, corporate_office_address[0].latitude, corporate_office_address[0].longitude, 'rgba(0, 255, 255, 0.7)');
  addCircleToMap(map, company_website_address[0].latitude, company_website_address[0].longitude, 'rgba(0, 0, 255, 0.7)');

  GSTIN_Address.forEach((e) => {
    addCircleToMap(map, e.latitude, e.longitude, 'rgba(255, 255, 0, 0.7)');
  })

  PF_Establishment_Address.forEach((e) => {
    addCircleToMap(map, e.latitude, e.longitude, 'rgba(0, 255, 0, 0.7)');
  })

}

multipleTypeOfAddressesForASingleCompany();

// function plotMultipleAddressesForACompany() {
//   const workbook = 'matched_pincodes_lat_long.xlsx';
//   fetch(workbook)
//     .then(response => response.arrayBuffer())
//     .then(data => {
//       const workbook = XLSX.read(data, { type: 'array' });
//       // Select the first worksheet
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       // Convert the worksheet to JSON format
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       console.log(jsonData[0]);
//       addCircleToMap(map, jsonData[0].Latitude, jsonData[0].Longitude, 'rgba(0, 255, 0, 0.7)');


//       for (var i = 1; i < 31; i++) {
//         if (i < 12) addCircleToMap(map, jsonData[i].Latitude, jsonData[i].Longitude, 'rgba(255, 0, 0, 0.7)');
//         else if (i > 11 && i < 21) addCircleToMap(map, jsonData[i].Latitude, jsonData[i].Longitude, 'rgba(0, 0, 255, 0.7)');
//         else if (i > 21) addCircleToMap(map, jsonData[i].Latitude, jsonData[i].Longitude, 'rgba(255, 255, 0, 0.7)');
//       }
//     })
//     .catch((err) => {
//       console.log("Error", err);
//     })
// }

// plotMultipleAddressesForACompany();