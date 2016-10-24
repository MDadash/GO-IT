'use strict';

var gulp = require('gulp'),
	browserSync = require("browser-sync");


var config = {
    server: {
        baseDir: "./"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "AT_M"
};

gulp.task('default', function () {
	browserSync(config);
});