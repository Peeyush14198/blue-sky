var admin = require('firebase-admin');

const getCountriesListFromFirebase = async () => {
    try {
        const countryList = await (await admin.firestore().collection('greenhouse').orderBy('country_or_area').get()).docs;
        let returnableList = [];
        countryList.forEach((e) => {
            returnableList.push({
                ...e.data(),
                'id': e.id
            })
        })
        return returnableList;
    } catch (error) {
        throw error
    }
}

const getfilterCountryFromFirebase = async (nameToSearch) => {
    try {
        const countryList = await (await admin.firestore().collection('greenhouse').where('country_or_area', '==' , nameToSearch).orderBy('year').get()).docs;
        let returnableList = [];
        countryList.forEach((e) => {
            returnableList.push({
                ...e.data(),
                'id': e.id
            })
        })
        return returnableList;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getCountriesListFromFirebase,
    getfilterCountryFromFirebase
}