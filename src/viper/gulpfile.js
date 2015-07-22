/// <binding BeforeBuild='build' Clean='clean' />

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    rimraf = require("rimraf"),
    fs = require("fs");

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    dist: "./" + project.webroot + "/dist/",
    app: "./" + project.webroot + "/app/"
};

gulp.task("clean", function (cb) {
    rimraf(paths.dist, cb);
});

gulp.task("build", ["minify", "clean"], function () {
});

gulp.task("minify", ["clean"], function () {
    gulp.src(paths.app + "**/*.js")
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(paths.dist));
});
