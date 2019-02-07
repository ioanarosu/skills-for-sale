const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlPartials = require('gulp-html-partial');
const webserver = require('gulp-webserver');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const image = require('gulp-image');

function sass_css(){
  return gulp.src('src/scss/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
              }))
             .pipe(gulp.dest('build/css'));
}

function html(){
  return gulp.src(['src/*.html'])
  .pipe(htmlPartials({
    basePath: 'src/partials/'
    }))
  .pipe(gulp.dest('build'))
}

function clean_code(){
  return gulp.src('build/**/*.*', {read: false}).pipe(clean());
}

function server(){
  return gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      port: 1337,
      open: true,
      fallback: 'index.html'
    }))
}

function images() {
  return gulp.src(['src/images/**/*.*'])
  //.pipe(image())
  .pipe(gulp.dest('build/images'))
}

function js() {
  return gulp.src(['src/js/**/*.js'])
  .pipe(gulp.dest('build/js'))
}

function watch() {
  gulp.watch(['./src/scss/**/*.scss'], function(){sass()});
  gulp.watch(['./src/**/*.html'], function(cb){html(); cb();});
}

function clean_docs(){
  return gulp.src('../docs/**/*.*', {read: false}).pipe(clean());
}

function copy_docs(){
  return gulp.src('build/**/*.*').pipe(gulp.dest('../docs'));
}

exports.default = gulp.series(clean_code, gulp.parallel(sass_css, js, images, html), server, watch);
exports.deploy = gulp.parallel(clean_docs, gulp.parallel(sass_css, js, images, html), copy_docs);
