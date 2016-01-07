var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    browserify = require('browserify'),
    /*ngHtml2Js = require('browserify-ng-html2js'),*/
    html2js = require('gulp-html2js'),
    ngAnnotate = require('gulp-ng-annotate'),
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

gulp.task('templates', function () {
    gulp.src('front_end_src/main/js/**/*.html')
        .pipe(html2js({
            outputModuleName: 'templates',
            useStrict: true,
        }))
        .pipe(concat('template.js'))
        .pipe(gulp.dest('src/main/resources/static/js'))
})

gulp.task('concat-js', function() {
  return gulp.src(['front_end_src/main/js/**/*module.js', 'front_end_src/main/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('front_end_src/main/temp'));
})

gulp.task('browserify', ['concat-js'], function() {
  //gulp.start('concat-js');

  return browserify({
      entries: './front_end_src/main/temp/main.js',
      debug: true,
      // defining transforms here will avoid crashing your stream
      //transform: ['browserify-ng-html2js']
    })
    /*.transform(ngHtml2Js({
      module: 'testit', // optional module name
      extension: 'html', // optionally specify what file types to look for
      baseDir: 'front_end_src/main/js', // optionally specify base directory for filename
      prefix: '', // optionally specify a prefix to be added to the filename,
      requireAngular: false // (default: false) optionally include `var angular = require('angular');` 
                            // Supported in Angular 1.3.14 and above if you bundle angular with browserify
    }))*/
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer(sourcemaps.init({loadMaps: true})))
    .pipe(ngAnnotate({ add: true }))
    //.pipe(uglify())
    .pipe(size())
    .on('error', gUtils.log)
    .pipe(gulp.dest('src/main/resources/static/js'));
    /*.pipe(notify({ message: 'Browserify task complete' }));*/
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
    ['hint', 'templates', 'browserify', 'images'],
    cb
  );
});

gulp.task('watch', ['default'], function() {
  // Watch .scss files
  gulp.watch('front_end_src/main/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('front_end_src/main/js/**/*.js', ['hint','browserify']);

  // Watch .html partials
  gulp.watch('front_end_src/main/js/**/*.html', ['templates']);

  // Watch image files
  gulp.watch('front_end_src/main/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['src/main/resources/**']).on('change', livereload.changed);
});