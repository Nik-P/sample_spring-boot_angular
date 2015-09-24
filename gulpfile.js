var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    browserify = require('browserify'),
    /*browserify = require('gulp-browserify'),*/
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gUtils = require('gulp-util'),
    runSequence = require('run-sequence'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');

gulp.task('styles', function() {
  return sass('front_end_src/main/scss/main.scss', { style: 'expanded' , onError: function(e) { console.log(e); }})
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('src/main/resources/static/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('src/main/resources/static/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('hint', function() {
  return gulp.src('front_end_src/main/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'hint task complete' }));

    /*--- Without Browserify ---*/
    /*.pipe(concat('main.js'))
    .pipe(gulp.dest('src/main/resources/static/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('src/main/resources/static/js'))
    .pipe(notify({ message: 'hint task complete' }));*/
});

gulp.task('browserify', function() {
  return browserify({
      entries: './front_end_src/main/js/main.js',
      debug: true,
      // defining transforms here will avoid crashing your stream
      //transform: [reactify]
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer(sourcemaps.init({loadMaps: true})))
    .pipe(uglify())
    .pipe(size())
    .on('error', gUtils.log)
    .pipe(gulp.dest('src/main/resources/static/js'))
    .pipe(notify({ message: 'Browserify task complete' }));
});

gulp.task('images', function() {
  return gulp.src('front_end_src/main/images/**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('src/main/resources/static/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
   return  del(['src/main/resources/static/css/*', 'src/main/resources/static/js/*', 'src/main/resources/static/img/*'], cb);
});

gulp.task('default', ['clean'], function(cb) {
  runSequence(
    'styles',
    ['hint', 'browserify', 'images'],
    cb
  );
});

gulp.task('watch', ['default'], function() {
  // Watch .scss files
  gulp.watch('front_end_src/main/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('front_end_src/main/js/**/*.js', ['hint','browserify']);

  // Watch image files
  gulp.watch('front_end_src/main/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['src/main/resources/**']).on('change', livereload.changed);
});