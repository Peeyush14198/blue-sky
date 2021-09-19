const express = require('express')
const cors = require("cors");
const https = require("https");
const http = require("http");

const fs = require('fs')
const csv = require('csv-parser')
var firebaseAdmin = require("firebase-admin");
require("dotenv").config();
var serviceAccount = require('./eco-backend-69b6c-firebase-adminsdk-87qtn-1fe868778e.json');
const {
    countriesListController,
    filterCountryController
} = require('./controllers/country_controller');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

const app = express();
app.use(cors());


app.get('/countries', async (req, res) => {
    res.send(await countriesListController(req, res));
});
app.get('/country/:name', async (req, res) => {
    console.log(req.query);
    let nameToSearch = req.params.name;
    let startYear = req.query.startYear;
    let endYear = req.query.endYear;
    let parameters = req.query.parameters;
    if (parseInt(startYear) < 1990 || parseInt(endYear) > 2014) {
        res.send({
            status: false,
            error: 'No data found. Please check you filters',
        }).status(400);
    } else if (parseInt(startYear) > parseInt(endYear)) {
        res.send({
            status: false,
            error: "endYear can't be greater than startYear",
        }).status(400);

    } else {
        await filterCountryController(req, res, {
            'nameToSearch': nameToSearch,
            'startYear': startYear,
            'endYear': endYear,
            'parameters': parameters
        })
    }

});

app.listen(9000, () => {

})

module.exports = {
    firebaseAdmin
}