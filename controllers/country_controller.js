const {
    getCountriesList, getCountriesListByFilter
} = require("../services/countries_service");


const countriesListController = async () => {
   
    return await getCountriesList();
}

const filterCountryController = async (req, res, filters, ) => {
   
    return await getCountriesListByFilter(req, res, filters);
}

module.exports = {
    countriesListController,filterCountryController
}