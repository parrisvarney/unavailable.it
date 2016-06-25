const gulp  = require('gulp');
const babel = require('gulp-babel');
const less  = require('gulp-less');

gulp.task('babel', () => {
    return gulp
        .src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('less', () => {
    return gulp
        .src('src/main.less')
        .pipe(less({
            "paths": ['.'],
            "filename": "main.css"
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('default', ['babel', 'less']);
