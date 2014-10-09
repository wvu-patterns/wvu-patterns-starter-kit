'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    inject = require("gulp-inject"),
    del = require("del"),
    runSequence = require('run-sequence'),
    scsslint = require('gulp-scss-lint');

// Replaced with node del 
// gulp.task('clean', function () {
//   return gulp.src('./build/*', { read: false })
//     .pipe(clean());
// });
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', function(cb){
  del([
    'build/**'
  ], cb);
});

gulp.task('scss-lint', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(scsslint({
      'config': '.scss-lint.yml'
    }))
    .pipe(scsslint.failReporter());
});

gulp.task('rename-scss-partial',function(){
  return gulp.src('./src/scss/_wvu-starter-kit.scss')
    .pipe(rename('wvu-starter-kit.scss'))
    .pipe(gulp.dest('./build/scss/'));
});

gulp.task('compile-css', ['rename-scss-partial'], function(){
  return gulp.src('./build/scss/*.scss')
    .pipe(sass({
      includePaths: ['scss'],
      outputStyle: 'expanded'
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7", { cascade: true }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('copy-test-html',function(){
  return gulp.src('./src/test/index.html')
    .pipe(gulp.dest('./build/'))
})

gulp.task('inject-src', ['scss-lint','copy-test-html','compile-css'], function () {
  var target = gulp.src('./build/index.html');
  target.pipe(inject(gulp.src(['./build/css/*.css'], {read: false}), {relative: true}))
    .pipe(gulp.dest('./build/'));
    
    target.pipe(inject(gulp.src(['./src/html/*.html']), {
      starttag: '<!-- inject:html -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    
    // WVU Masthead
    target.pipe(inject(gulp.src(['./bower_components/wvu-patterns-masthead/src/html/*.html']), {
      starttag: '<!-- inject:wvu-masthead:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    target.pipe(inject(gulp.src(['./bower_components/wvu-patterns-masthead-logo/src/html/*.html']), {
      starttag: '<!-- inject:wvu-masthead__logo:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    target.pipe(inject(gulp.src(['./bower_components/wvu-patterns-masthead-links/src/html/*.html']), {
      starttag: '<!-- inject:wvu-masthead__links:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    
    // WVU Footer
    target.pipe(inject(gulp.src(['./bower_components/wvu-patterns-footer/src/html/*.html']), {
      starttag: '<!-- inject:wvu-footer:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    target.pipe(inject(gulp.src(['./bower_components/wvu-patterns-footer-credits/src/html/*.html']), {
      starttag: '<!-- inject:wvu-footer__credits:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    target.pipe(inject(gulp.src(['./bower_components/wvu-patterns-footer-links/src/html/*.html']), {
      starttag: '<!-- inject:wvu-footer__links:{{ext}} -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    
    .pipe(gulp.dest('./build/'))
});

gulp.task('build',function(){
  runSequence('clean','inject-src');
});

gulp.task('test',['build']);
gulp.task('ci',['scss-lint']);