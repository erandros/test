/// <binding BeforeBuild='build' Clean='clean' />

var gulp = require("gulp"),
    concat = require("gulp-concat"),
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

gulp.task("watch", function () {
    gulp.watch("./app/**/*.js", ["build"])
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
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(dest));
});
