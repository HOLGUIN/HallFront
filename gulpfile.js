const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const gcss = require('gulp-css')

gulp.task('uglify', function () {
    gulp.src(['components/*.js', 'components/**/*.js', 'components/**/**/*.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});


gulp.task('css', function () {

    gulp.src(['assets/css/*.css'])
        .pipe(concat('app.css'))
        .pipe(gcss())
        .pipe(gulp.dest('dist/assest/css/'))
});


gulp.task('default', ['uglify','css']);



