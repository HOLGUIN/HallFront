const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const gcss = require('gulp-css');
var ngmin = require('gulp-ngmin');

/* gulp.task('html', function(){
    return gulp.src('client/templates/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('build/html'))
  }); */

gulp.task('uglify', function () {
    return gulp.src(['components/*.js', 'components/**/*.js', 'components/**/**/*.js'])
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


gulp.task('concat-usuario', function () {
    gulp.src(['components/usuario/*.js'])
        .pipe(concat('usuario.js'))
        .pipe(ngmin({ dynamic: true }))
        //.pipe(uglify())
        .pipe(gulp.dest('components/usuario/'))
});

gulp.task('ngmin-usuario', function () {
    gulp.src(['components/usuario/usuario.js'])
        .pipe(rename({ suffix: '.ngmin' }))
        .pipe(ngmin())
        //.pipe(uglify())
        .pipe(gulp.dest('components/usuario/'))
});

gulp.task('concat-usuario-min', function () {
    gulp.src(['components/usuario/usuario.ngmin.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('components/usuario/'))
});


gulp.task('default', ['concat-usuario']);



