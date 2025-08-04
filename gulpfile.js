// استدعاء المكاتب
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

// مسارات الملفات
const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/css/"
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/"
  }
};

// مهمة: تحويل Sass → CSS وضغطه
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("main.min.css"))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// مهمة: دمج وضغط JavaScript
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// مهمة: مراقبة الملفات وتشغيل خادم محلي
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch("*.html").on("change", browserSync.reload);
}

// تصدير المهام
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = gulp.series(styles, scripts, watch);
