'use strict';

var gulp =require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var run = require('run-sequence');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require("browser-sync").create();

gulp.task('style', function(){
  gulp.src(['sass/style.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 versions'
        ]})
      ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});
gulp.task('serve', function(){
  server.init({
    server: '.'
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
gulp.task('server', function(){
  run('style', 'serve');
});
