const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const gcss = require('gulp-css');
const strip = require('gulp-strip-comments');
var ngmin = require('gulp-ngmin');
var replace = require('gulp-replace');

gulp.task('css', function () {
    gulp.src(['assets/css/*.css'])
        .pipe(concat('app.min.css'))
        .pipe(gcss())
        .pipe(gulp.dest('components/dist/css/'))
});

gulp.task('concat-modules', function () {
    gulp.src(
        [
            'components/app.js',
            'components/app.libraries.js',
            'components/app.config.js',
            'components/app.routes.js',
            'components/app.constants.js',
            'components/widgets/app-widgets-module.js',
            'components/**/*.module.js',
            'components/**/**/*.module.js',
            'components/**/**/**/*.module.js',
            'components/**/*.directive.js',
            'components/**/**/*.directive.js',
            'components/**/*.factory.js',
            'components/**/**/*.factory.js',
            'components/**/**/**/*.factory.js',
            'components/**/*.routes.js',
            'components/**/**/*.routes.js',
            "components/login/login.controller.js",
            "components/home/home.controller.js",
            "components/usuario/usuario.controller.js",
            "components/asignatura/asignatura.controller.js",
            "components/asignatura/tema/tema.controller.js",
            "components/asignatura/materia/materia.controller.js",
            "components/ubicacion/ubicacion.controller.js",
            "components/ubicacion/pais/pais.controller.js",
            "components/ubicacion/departamento/departamento.controller.js",
            "components/ubicacion/ciudad/ciudad.controller.js",
            "components/misDatos/datos.controller.js",
            "components/configuracion/configuracion.controller.js",
            "components/progTema/progTema.controller.js",
            "components/misClases/misClases.controller.js",
            "components/clasesprog/clasesprog.controller.js",
            "components/clasesProfesor/clasesprofesor.controller.js"
        ]
    )
        .pipe(concat('app.min.js'))
        .pipe(strip())
        .pipe(replace(/('use strict';)/g, ''))
        .pipe(ngmin())
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('components/dist/js/'))
});


gulp.task('controller-clase', function () {
    gulp.src(
        [
            "components/clase/profesor/clase.controller.js",
            "components/clase/alumno/clase.controller.js"
        ]
    )
        .pipe(concat('clase-controller.js'))
        .pipe(strip())
        .pipe(replace(/('use strict';)/g, ''))
        .pipe(gulp.dest('components/dist/js/'))
});

gulp.task('concat-libraries-js', function () {
    gulp.src(
        [
            "node_modules/jquery/dist/jquery.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js",
            "node_modules/angular/angular.min.js",
            "bower_components/angular-i18n/angular-locale_es-co.js",
            "bower_components/angular-google-analytics/dist/angular-google-analytics.min.js",
            "node_modules/angular-translate/dist/angular-translate.min.js",
            "node_modules/angular-ui-router/release/angular-ui-router.min.js",
            "node_modules/angular-animate/angular-animate.min.js",
            "node_modules/angular-aria/angular-aria.min.js",
            "node_modules/angular-material/angular-material.min.js",
            "node_modules/angular-toastr/dist/angular-toastr.tpls.js",
            "node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js",
            "node_modules/peerjs/peer.min.js",
            "node_modules/datatables/media/js/jquery.dataTables.min.js",
            "node_modules/angular-datatables-master/demo/src/archives/dist/angular-datatables.min.js",
            "node_modules/angular-sanitize/angular-sanitize.min.js",
            "bower_components/angular-ui-select/dist/select.min.js",
        ]
    )
        .pipe(concat('libraries.js'))
        .pipe(replace(/('use strict';)/g, ''))
        .pipe(gulp.dest('components/dist/js/'))
});

gulp.task('concat-libraries-css', function () {
    gulp.src(
        [
            "node_modules/angular-material/angular-material.min.css",
            "assets/css/font-awesome.min.css",
            "bower_components/bootstrap/dist/css/bootstrap.min.css",
            "bower_components/angular-ui-select/dist/select.min.css",
            "node_modules/datatables/media/css/jquery.dataTables.min.css",
            "node_modules/angular-datatables-master/demo/src/archives/dist/css/angular-datatables.min.css",
            "node_modules/angular-toastr/dist/angular-toastr.css",
            "node_modules/selectize/dist/css/selectize.default.css"
        ]
    )
        .pipe(concat('libraries.css'))
        .pipe(gulp.dest('components/dist/css/'))
});

gulp.task('default',
    [
        'css',
        'concat-libraries-js',
        'concat-libraries-css',
        'concat-modules',
        'controller-clase',
    ]);


