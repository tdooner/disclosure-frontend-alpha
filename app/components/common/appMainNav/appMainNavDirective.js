(function() {
  'use strict';

  var template = require('./appMainNav.html');

  module.exports = function appMainNav() {
    return {
      controller: 'AppMainNavController', // Called from AppMainNavController.js
      restrict: 'EA',
      transclude: true,
      //scope: true, //test that collapse and search icon work correctly
      //scope: {},
      template: template
    };
  };
  //var appMainNav = function() {
  //  return {
  //    restrict: 'EA',
  //    //replace: true,
  //    template: template
  //    //link: function() {
  //    //
  //    //}
  //  };
  //};
  //
  //appMainNav.$inject = ['$scope'];
  //module.exports = appMainNav;
})();
