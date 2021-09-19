const {
    getCountriesListFromFirebase,
    getfilterCountryFromFirebase
} = require("../backend/firebase/firebase_queries");
const {
    getDataInRedis,
    setDataInRedis
} = require("../backend/reddis/reddis");

const getCountriesList = async () => {
    try {
        const data = await getDataInRedis('countries');
        if (data) {
            return {
                'servedFrom': 'Reddis',
                'countryList': JSON.parse(data)
            }
        } else {
            let countryList = await getCountriesListFromFirebase();
            setDataInRedis('countries', JSON.stringify(countryList))
            return {
                'servedFrom': 'Firestore',
                'countryList': countryList
            };
        }
    } catch (error) {
        throw error
    }
}

const getCountriesListByFilter = async (req, res, filters) => {
    try {
        const data = await getDataInRedis(`country/${filters.nameToSearch}`);
        let returnableList = [];
        let servedFrom = ''
        let {
            startYear,
            endYear,
            parameters,
            nameToSearch
        } = filters

        if (data ) {

            returnableList = JSON.parse(data);
            servedFrom = 'Reddis'
           
        } else {
            returnableList = await getfilterCountryFromFirebase(nameToSearch);
            setDataInRedis(`country/${filters.nameToSearch}`, JSON.stringify(returnableList));
            servedFrom = 'Firestore'
        }

        // ----------- filter ---------------
        if (startYear && endYear) {
            let newArr = [];
            returnableList.forEach((data) => {
                if (parseInt(data.year) > startYear && parseInt(data.year) < endYear) {
                    newArr.push({
                        ...data
                    })
                }
            })
            returnableList = newArr;
        }
        if (parameters) {
            let paramArr = [];
            if (parameters.includes(',')) {
                paramArr = parameters.split(',');
            } else {
                paramArr.push(parameters);
            }
            console.log(parameters);
            let newArr = [];
            returnableList.forEach((data) => {
                for (
                    let i = 0; i < paramArr.length; i++
                ) {
                    if (data.category.includes(paramArr[i])) {
                        newArr.push({
                            ...data
                        })
                    }
                }

            })
            returnableList = newArr;
        }
        res.send({
            'servedFrom': servedFrom,
            'countryList': returnableList
        }).status(200)
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getCountriesList,
    getCountriesListByFilter
}