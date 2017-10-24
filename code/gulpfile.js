var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlPartials = require('gulp-html-partial');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var image = require('gulp-image');


gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
              }))
             .pipe(gulp.dest('build/css'))
             .pipe(connect.reload())
});

gulp.task('html', function (){
  gulp.src(['src/*.html'])
  .pipe(htmlPartials({
    basePath: 'src/partials/'
    }))
  .pipe(gulp.dest('build'))
  .pipe(connect.reload())
});

gulp.task('clean', function (){
  return gulp.src('build', {read: false})
  .pipe(clean());
  });

gulp.task('connect', function () {
  connect.server ({
    root: 'build',
    livereload: true,
    port: 1337
    });
  });

gulp.task('watch', function () {
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);
  gulp.watch(['./src/**/*.html'], ['html']);
});

gulp.task('images', function () {
  gulp.src(['src/images/**/*.*'])
  //.pipe(image())
  .pipe(gulp.dest('build/images'))
  .pipe(connect.reload())
});

gulp.task('js', function () {
  gulp.src(['src/js/**/*.js'])
  .pipe(gulp.dest('build/js'))
  .pipe(connect.reload())
});

gulp.task('default', ['sass', 'html', 'connect', 'images', 'watch']);
