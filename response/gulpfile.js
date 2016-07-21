var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var cssBase64 = require('gulp-css-base64');
var rename = require('gulp-rename');
 
//compress js file
gulp.task('uglify', function() {
  gulp.src(['js/plugin/*.js',
  	'js/main/response.js',
  	'js/func/JSlideImg.js',
  	'js/func/JResScrollSticker.js',
  	'js/func/JResOverflow.js',
  	'js/func/JResMenu.js',
  	'js/func/JResMarquee.js',
  	'js/func/JResLadderObj.js',
  	'js/func/JResFollowObj.js',
  	'js/func/JResEnlarge.js',
  	'js/func/JResDelayLoader.js',
  	'js/func/JResContentTab.js',
  	'js/func/JResContentSlider.js',
    'js/func/JResAccordion.js',
    'js/func/JResWrapper.js'
  	])
    .pipe(uglify('js/response.min.js', {
      //outSourceMap: false,
      //wrap: false
    }))
    .pipe(gulp.dest(''))
});

//build sass/minify
gulp.task('sass', function() {
    //gulp.src('sass/**/*.scss')
    gulp.src(['sass/default.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});

//build for dist
gulp.task('dist', function() {
  //rebuild the css with image inline
    gulp.src('css/default.css')
    .pipe(cssBase64({
      baseDir: "",
      maxWeightResource: 100,
      extensionsAllowed: ['.jpg', '.png']
    }))
    .pipe(rename({
      basename:'response',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));

    gulp.src(['js/response.min.js'])
    .pipe(uglify('response.min.js', {
      outSourceMap: false,
      wrap: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['uglify','sass','dist']);