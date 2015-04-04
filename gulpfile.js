var gulp = require('gulp');
var livereload = require ('gulp-livereload');
var sass = require('gulp-ruby-sass');
var plumber = require ('gulp-plumber');
var uglify = require('gulp-uglify');
var gls = require('gulp-live-server');


gulp.task('scripts', function(){
	gulp.src('public/src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('public/bin/js/'))
});

gulp.task('copy-html',function(){
	gulp.src('public/src/*.html')
	.pipe(gulp.dest('public/bin/'))
});

gulp.task('copy-images',function(){
	gulp.src('public/src/img')
	.pipe(gulp.dest('public/bin/'))
})

gulp.task('copy-fonts',function(){
	gulp.src('public/src/fonts')
	.pipe(gulp.dest('public/bin/'))
});

gulp.task('styles', function(){
	gulp.src('public/src/scss/**/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest('public/bin/css/'))
});

gulp.task('watch', function() {
     var server = gls.new('app.js');
    server.start();
    //live reload changed resource(s)     
    gulp.watch('public/src/scss/*.scss',['styles']);
    gulp.watch('public/src/js/*.js',['scripts']);
    gulp.watch('public/src/*.html',['copy-html']);
    gulp.watch(['public/bin/css/*.css', 'public/bin/*.html'], server.notify);
});

gulp.task('default', ['scripts','styles','copy-html','copy-images','copy-fonts','watch']);