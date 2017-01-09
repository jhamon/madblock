var gulp   = require('gulp');
var gutil  = require('gulp-util');
var del    = require('del');
var concat = require('gulp-concat');
var exec   = require('child_process').exec;
var path   = require('path');

// JavaScript plugins
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config.js');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');

// CSS plugins
var sass   = require('gulp-sass');
var minify = require('gulp-minify-css');

gulp.task('clean:build', function () {
  del(['build'])
});

gulp.task("build:js", function (callback) {
  webpack(webpackConfig
      , function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
          // output options
        }));
        callback();
      });
});

function sassify(sourceFiles, destFileName) {
  gulp.src(sourceFiles)
      .pipe(sass())
      .pipe(minify())
      .pipe(concat(destFileName))
      .pipe(gulp.dest('build/'))
}

gulp.task('build:css', function () {
  sassify(['./src/popup/html/styles.css'], 'popup.css');
  sassify(['./src/content/unpresidented.css'], 'content.css');
});

gulp.task('copy:manifest', function() {
  gulp.src(['manifest.json'])
      .pipe(gulp.dest('build/'))
});

gulp.task('copy:html', function() {
  gulp.src(['./src/popup/html/popup.html'])
      .pipe(gulp.dest('build/'))
});

gulp.task('copy:icon', function() {
  gulp.src(['./star.png'])
      .pipe(gulp.dest('build/'))
});


gulp.task('build', [
  'clean:build',
  'build:js',
  'build:css',
  'copy:html',
  'copy:icon',
  'copy:manifest'
]);

gulp.task('default', ['build']);