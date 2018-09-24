"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var del = require("del");
var run = require("run-sequence");
var uglify = require("gulp-uglify");
var pump = require("pump");
var csscomb = require("gulp-csscomb");
var gnf = require('gulp-npm-files');
var svgstore = require("gulp-svgstore");
var cheerio = require('gulp-cheerio');
var rsync = require('gulp-rsync');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
const fileinclude = require('gulp-file-include');

const config = {
  build: "build/",
}

gulp.task("clean", function() {
  return del(config.build + "*",{force:true});
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**",
    "img/**",
    "js/**",
    "js-min/**"
  ], {
    base: "."
  })
  .pipe(gulp.dest(config.build));
});

gulp.task("copyNpmDependenciesOnly", function() {
  gulp.src(gnf(), {base:'./'})
  .pipe(gulp.dest(config.build));
});

gulp.task("svgsprite", function() {
  var sources = gulp
  .src("img/icons-svg/*.svg")
  .pipe(svgstore({
      inlineSvg: true
    }))
  .pipe(cheerio({
      run: function ($) {
          $('svg').addClass('svg-sprite');
      },
      parserOptions: { xmlMode: true }
  }))
  .pipe(rename("svg-sprite.svg"))
  .pipe(gulp.dest(config.build + "img/svg-sprite"));
});

gulp.task("images", function(){
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("compress", function(cb){
  pump([
    gulp.src("build/js/**/*.js"),
    uglify(),
    gulp.dest(config.build + "js-min")
    ],
    cb
    );
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
          }))
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(csscomb())
    .pipe(gulp.dest(config.build))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(config.build))

    .pipe(server.stream());
});

gulp.task('html:build', function() {
 gulp.src('*.html')
.pipe(fileinclude({
  prefix: '@@',
  basepath: 'includes/'
}))
.pipe(gulp.dest('build/'));
});


gulp.task('deploy', function() {
  return gulp.src(config.build + '**')
    .pipe(rsync({
      root: config.build,
      hostname: 'u0415326@maya-site.ru',
      destination: 'www/maya-site.ru/sweetcake/wp-content/themes/foo/',
      archive: false,
      recursive: true,
      links: true,
      times: true,
      silent: true,
      compress: true
      //, command: true
    }));
});

gulp.task("build", function(fn) {
  run("clean",
      "html:build",
      "copy",
      "copyNpmDependenciesOnly",
      "svgsprite",
      "style",
      "images",
      "compress",
      fn);
});


gulp.task("html:copy", function(){
  return gulp.src("*.html")
  .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:build", "html:copy"], function(done){
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

gulp.watch("sass/**/*.{scss,sass}", ["style"]);
gulp.watch("*.html", ["html:update"]);


});
