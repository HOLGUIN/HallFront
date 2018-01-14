const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');

gulp.task('uglify', function () {
    gulp.src(['components/*.js', 'components/**/*.js', 'components/**/**/*.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
})



