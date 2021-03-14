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
// GET Locations
app.get('/locations', (req, res) => {
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
	const locationIds = []; // Array will store all locationtIds --->

	//  Handleling data from each location
	locationData.forEach(location => {
		locationIds.push(location.id.toString()); 
    // Ids turning into strings and store in array

		// Return spot object when id found
		if (location.id == paramId) {
			res.status(200).json({
				code: res.statusCode,
				status: 'OK',
				description: `selected location.id ${paramId} from database`,
				data: location
			});
		}
	});

	// Check if requested spotId exist in spotIds
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
app.listen(port, () => {
	console.log(`Server is running & listening on port ${port}`);
});