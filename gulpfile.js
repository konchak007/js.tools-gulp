const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const imageMin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const babel = require('gulp-babel');

/*gulp.task('name-task',function () {
       gulp.src(source-files)
       .pipe(gulpPlagin())
       .pipe(gulp.dest('destination-directory'));
})*/

gulp.task('browserSync',function () {
       browserSync({
              server:{
                     baseDir:'src',
              },
               notify:false
       })
})

gulp.task('sass',function () {
       gulp.src('src/scss/**/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('src/css'))
       .pipe(browserSync.reload({
              stream:true
       }))
       
})
gulp.task('babel', () =>
       gulp.src('src/js/*.js')
       .pipe(babel({
              presets: ['@babel/env']
       }))
       .pipe(gulp.dest('src/ES5'))
);

gulp.task('images',function () {
       gulp.src('src/img/*')
       .pipe(imageMin())
       .pipe(cache(imageMin({
              use: [pngquant()],
              progressive: true,
              interlaced: true
       })))
       .pipe(gulp.dest('src/_img'))
       .pipe(browserSync.reload({
              stream: true
       }))
})

gulp.task('watch',['sass','browserSync','scripts','styles','images','babel'],function () {
       gulp.watch('src/scss/**/*.іcss',['sass']);
       gulp.watch('src/*.html',browserSync.reload);
       gulp.watch('src/js/**/*.js',['scripts']);
       gulp.watch('src/css/**/*.css',['styles']);
       gulp.watch('src/img/*',['images']);
       gulp.watch('src/js/*.js',['babel'] );
 
})
gulp.task('styles',function () {
       gulp.src('src/css/*.css')
       .pipe(cleanCss())
       .pipe(autoPrefixer('last 2 versions'))
       .pipe(gulp.dest('src/css'))
       .pipe(browserSync.reload({
              stream: true
       }))
})

gulp.task('scripts',function () {
       gulp.src('src/js/assest/*.js')
       .pipe(concat('main.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('src/js'))
       .pipe(browserSync.reload({
              stream: true
       }))
})

gulp.task('build',function () {
       gulp.src('src/img/*')
       .pipe(gulp.dest('dist/img/'));
       gulp.src('src/js/main.min.js')
       .pipe(gulp.dest('dist/js/'))
       gulp.src('src/css/*')
       .pipe(gulp.dest('dist/css/'))
       gulp.src('src/index.html')
       .pipe(gulp.dest('dist'))
       gulp.src('src/fonts')
       .pipe(gulp.dest('dist/fonts'))
})

gulp.task('default', ['watch'])