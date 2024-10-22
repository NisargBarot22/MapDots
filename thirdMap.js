
/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param  {Number} lat     Latitude of the center of the circle
 * @param  {Number} lng     Longitude of the center of the circle
 * @param {String} col      Color of the circle
 */


function addCircleToMap(map, lat, lng, col = "rgba(255, 255, 0, 0.7)", radius = 55000) {
    // console.log("here");
    map.addObject(new H.map.Circle(
      // The central point of the circle
      { lat: lat, lng: lng },
      // The radius of the circle in meters
      // 55000,
      radius,
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
  
//3rd Map
function createPincodeDictionary() {
    const workbook = 'matched_pincodes_lat_long.xlsx';  // replace with your file path

    fetch(workbook)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const pincodeMap = new Map();

            jsonData.forEach(row => {
                const latitude = row['Latitude'];
                const longitude = row['Longitude'];

                if (latitude && longitude && latitude !== undefined && longitude !== undefined) {
                    let matchedKey = null;

                    for (const [key, values] of pincodeMap) {
                        const [keyLat, keyLng] = key.split(',').map(Number);

                        if (
                            (latitude > keyLat - 0.5 && latitude < keyLat + 0.5) &&
                            (longitude > keyLng - 0.5 && longitude < keyLng + 0.5)
                        ) {
                            matchedKey = key;
                            break;
                        }
                    }

                    if (matchedKey) {
                        pincodeMap.get(matchedKey).push({ lat: latitude, lng: longitude });
                    } else {
                        const newKey = `${latitude},${longitude}`;
                        pincodeMap.set(newKey, [{ lat: latitude, lng: longitude }]);
                    }
                }
            });

            const totalKeys = pincodeMap.size;
            console.log(totalKeys);
            console.log(pincodeMap);

            map_Iterator(pincodeMap);


        });
}
createPincodeDictionary();

function map_Iterator(pincodeMap) {
    for (const [key, values] of pincodeMap) {
        const { lat, lng } = values[0];
        var radius = 10000;
        if (values.length < 10000 && values.length >= 1000) {
            radius = values.length;
            addCircleToMap(map, lat, lng, 'rgba(255, 255, 0, 0.7)', radius * 10);
        }
        else if (values.length < 1000) {
            radius = values.length * 10;
            if (values.length > 500) addCircleToMap(map, lat, lng, 'rgba(255, 165, 0, 1)', radius * 10);
            else addCircleToMap(map, lat, lng, 'rgba(255, 165, 0, 0.3)', radius * 10);
        }
        else {
            radius = values.length;
            addCircleToMap(map, lat, lng, 'rgba(255, 0, 0, 0.7)', radius * 10);
        }
    }
}