/// <binding BeforeBuild='build' Clean='clean' />

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    gutil = require('gulp-util'),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    wrap = require("gulp-wrap"),
    watch = require("gulp-watch"),
    del = require("del"),
    fs = require("fs");

//eval("var project = " + fs.readFileSync("./project.json"));

var dest = './wwwroot/dist';
gulp.task("clean", function (cb) {
    del(dest + '/*', cb);
});

gulp.task("watch", ["build"], function () {
    var browserSync = require('browser-sync').create();
    browserSync.init({
        proxy: "localhost:5000"
    });
    gulp.watch("./wwwroot/templates/**/*.html", browserSync.reload);
    gulp.watch("./Views/**/*.cshtml", browserSync.reload);
    gulp.watch("./app/**/*.js", ["build"])
    .on('change', browserSync.reload);
})

gulp.task("build", ["clean", "concat", "minify"], function () {
});

gulp.task("concat", function () {
    gulp.src("./app/**/*.js")
        .pipe(wrap(function(data) { 
            var path = data.file.relative.replace(/\\/g, '/');
            return '// ' + path + ' \n' + data.contents;
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest))
})

gulp.task("minify", function () {
    gulp.src("./app/**/*.js")
        .pipe(concat('app.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(dest));
});
