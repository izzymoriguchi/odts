const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4001;
const router = express.Router();
const polyline = require('@mapbox/polyline');

let Tracking = require('./tracking.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/odts', {
    "user": "cs218",
    "pass": "cs218"
});

const connection = mongoose.connection;
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBCZT-thH-GtdhosGuLzXBrWCCbuLf707A'
});

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    let currentTime = new Date();
    console.log("Tracking id:" + id);
    Tracking.findById(id, function(err, tracking) {
        var query = {};
        // get geocode for origin address
        googleMapsClient.geocode({
            address: tracking.origin[0]
        }, function(err, response) {
            if (!err) {
                console.log('Geocode origin');
                console.log(response.json.results[0].geometry.location);
                query.origin = response.json.results[0].geometry.location;
                // get geocode for destination address
                googleMapsClient.geocode({
                    address: tracking.destination[0]
                }, function(err, response) {
                    if (!err) {
                        console.log('Geocode destination');
                        console.log(response.json.results[0].geometry.location);
                        query.destination = response.json.results[0].geometry.location;
                        console.log('Query:');
                        console.log(query);
                        googleMapsClient.directions(query, function(err, response) {
                            if (!err) {
                                var encodedPolyline = response.json.routes[0].overview_polyline.points;
                                // console.log(response.json.routes[0].legs);
                                let totalDeliveryTime = response.json.routes[0].legs[0].duration.value;
                                console.log('Time it takes: ' + totalDeliveryTime);
                                var arrayOfGeocodes = polyline.decode(encodedPolyline);
                                console.log(arrayOfGeocodes);
                                var orderDate = tracking.order_date;
                                let diffTimeInSec = (Math.abs(currentTime.getTime() - orderDate.getTime())) / 1000;
                                console.log('time diff: ' + diffTimeInSec);
                                var interval = totalDeliveryTime / arrayOfGeocodes.length;
                                console.log('interval: ' + interval);
                                var indexInArr = Math.round(diffTimeInSec / interval);
                                if (indexInArr < arrayOfGeocodes.length) {
                                    console.log('Geocode at index ' + indexInArr + ': ' + arrayOfGeocodes[indexInArr]);
                                    res.status(200).send(arrayOfGeocodes[indexInArr]);
                                }
                            }
                        });
                    }
                });
            }
        });

        console.log(tracking);
    });
});

router.route('/add').post(function(req, res) {
    var newTracking = {
        order_date: new Date(),
        destination: req.body.destination_address,
        origin: req.body.origin_address
    };
    console.log(newTracking);
    let tracking = new Tracking(newTracking);
    tracking.save()
        .then(tracking => {
            console.log(tracking);
            res.status(200).send(tracking);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('adding new tracking failed');
        });
});

app.use('/tracking', router);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
