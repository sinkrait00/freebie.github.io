let gulp = require('gulp');


let concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let watch = require('gulp-watch');
let livereload = require('gulp-livereload');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('sass-compile',function(){
    return gulp.src('assets/sass/*.sass')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error',sass.logError))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('assets/css'))
    });

    gulp.task('watch',function(){
      
    gulp.watch('assets/sass/*.sass',gulp.series('sass-compile','con-min'));
    });

gulp.task('con-min', function () {
  return gulp.src('assets/css/*.css')
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(concatCss("assets/all.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('assets/css/importCss/'))
    .pipe(livereload({start: true}));
});




 