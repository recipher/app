var Promise = require('bluebird')
  , initialize = require('./initializers')
  , utility = require('@recipher/utility');

var App = function(name, folder) {
  if (this instanceof App === false) return new App(name, folder);

  this.name = name;
  this.folder = path.join(folder, 'apps');
};

App.prototype.start = function(done) {
  initialize(this.name, 'subscribers', this.folder, utility.folders(this.folder));
  initialize(this.name, 'listeners', this.folder, utility.folders(this.folder));
  initialize(this.name, 'jobs', this.folder, utility.folders(this.folder));

  initialize(this.name, 'custom', path.join(this.folder, '..', 'initializers')).then(done);
};

App.prototype.stop = function(done) {
  // No op
};

module.exports = App;
