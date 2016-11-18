/**
 * Created by Cartman on 17/11/16.
 */
/**
 * Created by RobertSabiryanov on 24.06.15.
 */
var gulp = require('gulp');
var config = require('./config/config.json');
var fs = require('fs');
var gutil = require('gulp-util');
var assign = require('lodash.assign');

var server = gutil.env.server || 'dev';


module.exports.set = function set(customConfig) {
    assign(config, customConfig);
};

module.exports.get = function get() {
    var configForEnv;
    if (server && (configForEnv = tryReadConfigFileForEnv(server))) {
        assign(config, configForEnv);
        return config;
    }
    return config;
};

function tryReadConfigFileForEnv(env) {
    var configFileName = './gulp/config/config.' + env + '.json';
    if (fs.existsSync(configFileName)) {
        return require('./config/config.' + env + '.json');
    }
    return {};
}

