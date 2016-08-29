var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    spawn = require('child_process').spawn;

gulp.task('scripts', function() {
    return gulp.src(['./lib/jquery.min.js','./lib/bootstrap.min.js','./lib/custom.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('scripts'));
});

gulp.task('sass', function () {
    return gulp.src(['_sass/root.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssmin({
            advanced: false
        }))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('styles'));
});

gulp.task('jekyll', ['sass'], function (){
    spawn('jekyll', ['build'], {stdio: 'inherit'});
});

gulp.task('default', ['jekyll']);