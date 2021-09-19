"use strict";

var _require = require("../services/countries_service"),
    getCountriesList = _require.getCountriesList,
    getCountriesListByFilter = _require.getCountriesListByFilter;

var countriesListController = function countriesListController() {
  return regeneratorRuntime.async(function countriesListController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getCountriesList());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var filterCountryController = function filterCountryController() {
  return regeneratorRuntime.async(function filterCountryController$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getCountriesListByFilter());

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  countriesListController: countriesListController,
  filterCountryController: filterCountryController
};