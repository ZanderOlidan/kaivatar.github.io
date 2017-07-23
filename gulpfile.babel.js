'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import merge from 'merge-stream';
import minify from 'gulp-minify-css';
import uglify from 'gulp-uglify';

const dirs = {
    src: 'src',
    dest: 'dist',
};

const sassPath = {
    src: `${dirs.src}/scss/main.scss`,
    dest: `${dirs.dest}/css/`
};

const jsPath = {
    src: `${dirs.src}/js/*.js`,
    dest: `${dirs.dest}/js/`
}

gulp.task('scripts', () => {
    let vendorJS = gulp.src(dirs.src + '/vendor/js/**/*.js')
        .pipe(concat('vendors.js'));

    let mainJS = gulp.src(jsPath.src)
        .pipe(concat('main.js'));
    
    return merge(vendorJS, mainJS)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsPath.dest));
});

gulp.task('style', () => {
    let sassStream =  gulp.src(sassPath.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.scss'));

    let vendorStream = gulp.src(dirs.src + '/vendor/css/**/*.css')
        .pipe(concat('vendor.css'))

    return merge(sassStream, vendorStream)
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(gulp.dest(dirs.dest + '/css'));
});

gulp.task('watchCSS', () => {
    return gulp.watch('./src/scss/**/*.scss', ['style']);
})


gulp.task('watchJS', () => {
    return gulp.watch('./src/js/**/*.js', ['scripts']);
})
