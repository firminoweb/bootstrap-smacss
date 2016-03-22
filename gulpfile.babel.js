'use strict'; 

// Packages
import gulp from 'gulp';
import Q from 'q';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cssnano from 'gulp-cssnano';

// Paths
const bs = 'components/bootstrap';

const sassOpts = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

const dir = {
  src:  {
    js:  'src/js/',
    sass: 'src/sass/'
  },
  dist: {
    js:  'dist/js/',
    css: 'dist/css/'
  }
};

// Tasks
gulp.task('sync', function () {  
    var deferred = Q.defer();

    setTimeout(function () {
        deferred.resolve();
    }, 2000);
    
    return deferred.promise;
});

gulp.task('sass', () => {
  gulp.src(dir.src.sass + 'bs-smacss.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css))
});

gulp.task('cssmin', () => {
  gulp.src(dir.dist.css + 'bs-smacss.css')
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css));
});


gulp.task('default', ['sass','sync'], () => {
  gulp.start('cssmin');
});
