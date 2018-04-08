const gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglifyjs = require('gulp-uglifyjs'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

const paths = {
    html: ['source/*.html'],
    css: ['source/css/**/*.scss'],
    js: ['source/js/**/*.js'],
    fonts: ['source/fonts/**/*.*'],
    images: ['source/images/**/*.*'],
    baseDir: './dist',
};

gulp.task('browserSync', () =>
    browserSync({
        server: {
            baseDir: paths.baseDir,
        },
        port: 3000,
        open: true,
    })
);

gulp.task('html', () =>
    gulp.src(paths.html)
        .pipe(gulp.dest(paths.baseDir))
);

gulp.task('css', () =>
    gulp.src('source/css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest(paths.baseDir + '/css'))
        .pipe(notify('CSS saved'))
        .pipe(reload({ stream: true }))
);

gulp.task('js', () =>
    gulp.src(paths.js)
        .pipe(uglifyjs())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.baseDir + '/js'))
        .pipe(notify('JS saved'))
        .pipe(reload({ stream: true }))
);

gulp.task('fonts', () => 
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.baseDir + '/fonst'))
        .pipe(reload({ stream: true }))
);

gulp.task('images', () =>
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.baseDir + '/images'))
        .pipe(reload({ stream: true }))
);

gulp.task('watcher', () => {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['html', 'css', 'js', 'fonts', 'images', 'watcher', 'browserSync']);
gulp.task('build', ['html', 'css', 'js', 'fonts', 'images']);