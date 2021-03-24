const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.json());

//Import 
const locationData = require('./datafolder/locationData');

// Routes
// GET Locations -
app.get('/', (req, res) => {
	res.status(200).json({
		code: res.statusCode,
		status: 'OK',
		description: 'selected locations from database',
		data: locationData
	});
});

// GET Location ONE  BY ID
app.get('/locations/:id', (req, res) => {
	const paramId = req.params.id;
	const locationIds = []; 

	//  Handleling data from each location
	locationData.forEach(location => {
		locationIds.push(location.id.toString()); 
    // Ids turning into strings and store in array

		// Return location object when id found
		if (location.id == paramId) {
			res.status(200).json({
				code: res.statusCode,
				status: 'OK',
				description: `selected location.id ${paramId} from database`,
				data: location
			});
		}
	});

	// Check if requested locationId exist in locationIds
	if (!locationIds.includes(paramId)) {
		res.status(404).json({
			code: res.statusCode,
			status: 'Not Found', 
			description: `spot.id ${paramId} not found in database`,
			data: {}
		});
	}
});

// Listen Port
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



// will be use later on for a User Interface for backend
// set the view engine to ejs
//app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + '/public'));

// set the home page route
// app.get('/', function(req, res) {

 
    // ejs render automatically looks in the views folder
    // res.render('index');
//});

//app.listen(port, function() {
  //  console.log('Our app is running on http://localhost:' + port);
// });
