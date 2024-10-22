/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param  {Number} lat     Latitude of the center of the circle
 * @param  {Number} lng     Longitude of the center of the circle
 */

// var count = 0 ;
function addCircleToMap(map, lat, lng) {
    // console.log (count++)
    map.addObject(new H.map.Circle(
        // The central point of the circle
        { lat: lat, lng: lng },
        // The radius of the circle in meters
        10000,
        {
            style: {
                strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
                lineWidth: 2,
                fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
            }
        }
    ));
}

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

function readExcelAndAddCircles() {
    const filePath = 'matched_pincodes_lat_long.xlsx'; // Path to your Excel file

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
            // var count = 0;
            // Iterate over each row in the data
            // jsonData.map(row => {
            //     // console.log(count++);

            //     addCircleToMap(map, row.Latitude, row.Longitude)
            // });

            for(var i=0; i< 30000; i++){
                addCircleToMap(map, jsonData[i].Latitude, jsonData[i].Longitude)
            }
        })
        .catch(error => console.error('Error fetching or reading the Excel file:', error));
}
readExcelAndAddCircles();
